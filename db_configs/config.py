import os
# Statement for enabling the production environment
DEBUG = True

# Define the application directory
import os
BASE_DIR = os.path.abspath(os.path.dirname(__file__))  

SQLALCHEMY_DATABASE_URL = os.getenv('LOCALPOSTGRES')
SQLALCHEMY_CONNECT_ARGS = {'connect_timeout': 5}
DATABASE_CONNECT_OPTIONS = {'echo':True}

# Number of application threads (one for incoming requests and one for performing background operations)
THREADS_PER_PAGE = 2

# Enable protection agains *Cross-site Request Forgery (CSRF)*
CSRF_ENABLED     = True

# A secure and secret key for signing the data.

CSRF_SESSION_KEY = "secret"