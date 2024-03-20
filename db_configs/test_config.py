# Statement for enabling the development environment
DEBUG = True

# Define the application directory
import os
BASE_DIR = os.path.abspath(os.path.dirname(__file__))  

#SQLALCHEMY_DATABASE_URL = os.getenv('LOCALPOSTGRES')
#SQLALCHEMY_DATABASE_USERNAME = os.getenv('DB_USERNAME')
#SQLALCHEMY_DATABASE_PASSWORD = os.getenv('DB_PASSWORD')
#SQLALCHEMY_DATABASE_HOST = os.getenv('DATABASE_HOST')
####
SQLALCHEMY_DATABASE_USERNAME = os.getenv('DB_USERNAME', 'test_username')
SQLALCHEMY_DATABASE_PASSWORD = os.getenv('DB_PASSWORD', 'test_pw')
SQLALCHEMY_DATABASE_NAME = os.getenv('DB_NAME', 'test_db_name')
SQLALCHEMY_DATABASE_HOST = os.getenv('DB_HOST', 'test_host')
SQLALCHEMY_DATABASE_PORT = os.getenv('DB_PORT', '5432')  # Defaulting to 5432 if not set.
###
print(f"DB_USERNAME: {SQLALCHEMY_DATABASE_USERNAME}")
print(f"DB_PASSWORD: {SQLALCHEMY_DATABASE_PASSWORD}")
print(f"DB_NAME: {SQLALCHEMY_DATABASE_NAME}")
print(f"DB_HOST: {SQLALCHEMY_DATABASE_HOST}")
print(f"DB_PORT: {SQLALCHEMY_DATABASE_PORT}")
# Construct the SQLAlchemy URL
SQLALCHEMY_DATABASE_URL = f"postgresql://{SQLALCHEMY_DATABASE_USERNAME}:{SQLALCHEMY_DATABASE_PASSWORD}@{SQLALCHEMY_DATABASE_HOST}:{SQLALCHEMY_DATABASE_PORT}/{SQLALCHEMY_DATABASE_NAME}"


# Saman: how to structure it for local (clusterless) development?

SQLALCHEMY_CONNECT_ARGS = {'connect_timeout': 5}
DATABASE_CONNECT_OPTIONS = {'echo':True}

# Number of application threads (one for incoming requests and one for performing background operations)
THREADS_PER_PAGE = 2

# Enable protection agains *Cross-site Request Forgery (CSRF)*
CSRF_ENABLED     = True

# A secure and secret key for signing the data.

CSRF_SESSION_KEY = "secret"