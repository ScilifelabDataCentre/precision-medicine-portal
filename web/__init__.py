from flask import Flask
from dotenv import load_dotenv
from db_handler import DBHandler


load_dotenv()
db = DBHandler()

def create_app(test_config = None):
    app = Flask(__name__)
    
    if test_config is None:
        app.config.from_object('db_configs.test_config') # Default config.
    else:
        app.config.from_object('db_configs/config') # TODO: Change to specific config for test.
    
    db.init_app(app)

    from web.api.articles import article_blueprint as article
    app.register_blueprint(article, url_prefix='/api/article')
    
    return app
