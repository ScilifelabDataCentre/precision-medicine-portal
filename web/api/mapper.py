from web.models.articles.article import Article
import web.utilities.constants as constants
from flask import jsonify
def articles_to_headers_json(articles: list[Article]):
    articles_list = []
    for article in articles:
        article: Article
        article_dict = {}
        article_dict[constants.ARTICLE_TITLE] = article.title
        article_dict[constants.ARTICLE_URL] = article.url_prefix
        articles_list.append(article_dict)
    
    return jsonify(articles_list)