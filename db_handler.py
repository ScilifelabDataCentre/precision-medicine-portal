
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.exc import OperationalError
from sqlalchemy import text

#from flask import _app_ctx_stack

class DBHandler:
    def __init__(self):
        _ = declarative_base
        

    def init_app(self, app):
        self.engine = create_engine(app.config['SQLALCHEMY_DATABASE_URL'], connect_args=app.config['SQLALCHEMY_CONNECT_ARGS'])
        self.sessionmaker = sessionmaker(autocommit=False, autoflush=False, bind = self.engine)
        self.session = self.init_scoped_session()
        #self.session = scoped_session(self.sessionmaker, scopefunc=_app_ctx_stack.__ident_func__)
        app.teardown_request(self.remove_session) 
        self.test_database_connection()

    def remove_session(self, error=None):
        """Removes the current Session object associated with
        the request"""
        self.session.remove()
        # this is necessary for teardown functions
        if error:
            # Log the error
            print("logging error", str(error))
            #TODO: Log the error
    
    def init_scoped_session(self):
        "Create empty scoped session registry upon app startup"
        return scoped_session(self.sessionmaker)
    
    def test_database_connection(self):
        print('Testing database....')

        try:
        # Explicitly mark the SQL command as text for execution
            with self.engine.connect() as connection:
                result = connection.execute(text("SELECT version();"))
                db_version = result.fetchone()
                print(f"Successfully connected to the database. Version: {db_version}")
        except OperationalError as e:
            print(f"Database connection failed: {e}")
        # Handle the error appropriately
            print('Done testing database')