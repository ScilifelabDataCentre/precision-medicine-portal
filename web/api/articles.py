import web.utilities.constants as constants
from flask import Blueprint, jsonify, request
from web.utilities.helpers import payload_is_valid
import web.utilities.http_errors as http_errors
import json
import time
from web.models.articles.article import Article
import uuid
from web import db
from web.api import mapper

DEBUG = True
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



#################### 
# External use
####################

@article_blueprint.route('/', methods=['POST'])
def post_new_article():
    payload = json.loads(request.data)
    print(payload)
    if not payload_is_valid(payload, [constants.ARTICLE_TITLE, constants.ARTICLE_MARKDOWN]):
        if DEBUG:
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

def write_to_db(article_title, article_url):
    with open('dummy_files/database.json', 'r') as db:
        stored_articles = json.load(db)
        stored_articles[article_title] = article_url
        with open('dummy_files/database.json', 'w') as file:
            json.dump(stored_articles, file, indent=4)
            file.close()
    db.close()


def upload_markdown_to_storage() -> bool:
    # Generate an upload link for the user to submit the file to the storage service directly. Will only be for internal use.
    upload_link = generate_upload_link()
    return False


#################### 
# Placeholders for S3 functions
####################

def generate_upload_link():
    return "upload_link.com"

def get_markdown_file_from_server(md_file_path):
    # Either send the markdown as text or send a link to the markdown hosted on the storage service.
    with open(md_file_path) as md:
        file_as_string = md.read()
        time.sleep(2)
        md.close()
        return file_as_string
    