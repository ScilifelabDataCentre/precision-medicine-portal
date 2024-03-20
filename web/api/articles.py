import web.utilities.constants as constants
from flask import Blueprint, jsonify, request
from web.utilities.helpers import payload_is_valid, is_valid_secret_in_request
import web.utilities.http_errors as http_errors
import json
import time
from web.models.articles.article import Article
import uuid
from web import db
from web.api import mapper
from web.utilities import config
from werkzeug.exceptions import Unauthorized


article_blueprint = Blueprint('article', __name__)

@article_blueprint.route('/ping', methods=['GET'])
def pong():
    return 'pong', 200

@article_blueprint.route('/<article_id>', methods = ['GET'])
def get_article_with_id(article_id):
    try:
        article: Article = (db.session.query(Article).filter(Article.url_prefix == article_id).one_or_none())
        if article is None:
            return 'Article not found', 404
        return f'{article.markdown_text}', 200
    except:
        raise http_errors.ArticleNotFoundError
    
@article_blueprint.route('/<article_id>', methods = ['PATCH'])
def update_markdown_of_article_with_id(article_id):
    payload = json.loads(request.data)
    if not is_valid_secret_in_request(request):
        if config.DEBUG:
            return jsonify({'error': 'Unauthorized access'}), 401
        raise Unauthorized('Unauthorized access')
    
    if not payload_is_valid(payload, [constants.ARTICLE_MARKDOWN]):
        if config.DEBUG:
            return jsonify({'error': 'invalid argument'}), 400
        raise AttributeError
    new_article_markdown = payload[constants.ARTICLE_MARKDOWN]
    try:
        updated_article: Article = (db.session.query(Article).filter(Article.url_prefix == article_id).one_or_none())
        if updated_article is None:
            return 'Article not found', 404
    except:
        raise http_errors.ArticleNotFoundError
    
    updated_article.markdown_text = new_article_markdown
    try:
        db.session.add(updated_article)
        db.session.commit()
    except:
        db.session.rollback()
        raise http_errors.ArticleCreationError
    return {'success': 'updated article'}

@article_blueprint.route('', methods=['GET']) 
def get_all_articles():
    try:
        articles = (db.session.query(Article).filter(Article.is_available == True).all()  # type: ignore
            )
        if articles is None:
            return [], 200
    except:
        raise http_errors.ArticleNotFoundError
    articles_json = mapper.articles_to_headers_json(articles)
    return articles_json, 200

@article_blueprint.route('/', methods=['POST'])
def post_new_article():
    payload = json.loads(request.data)
    if is_valid_secret_in_request(request):
        if config.DEBUG:
            return jsonify({'error': 'Unauthorized access'}), 401
        raise Unauthorized('Unauthorized access')
    if not payload_is_valid(payload, [constants.ARTICLE_TITLE, constants.ARTICLE_MARKDOWN]):
        if config.DEBUG:
            return jsonify({'error': 'invalid argument'}), 400
        raise AttributeError
    article_title = payload[constants.ARTICLE_TITLE]
    article_markdown = payload[constants.ARTICLE_MARKDOWN]

    new_article = Article(str(uuid.uuid4()), article_title, article_markdown)
    try:
        db.session.add(new_article)
        db.session.commit()
    except:
        db.session.rollback()
        raise http_errors.ArticleCreationError
    return jsonify({constants.ARTICLE_TITLE: f'{article_title}', constants.ARTICLE_MARKDOWN: f'{article_markdown}', constants.ARTICLE_URL: f'{new_article.url_prefix}'}), 200
