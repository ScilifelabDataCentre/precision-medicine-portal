from web.models.models import Base
from uuid import uuid4
import re
from sqlalchemy import Column, Integer, String, Table, ForeignKey, DateTime, Boolean
from web.utilities import constants, http_errors

DEBUG = False


class Article(Base):
    """
    Article is a piece of content that will be in markdown format together with this
    database class that will include meta-data, including the link to the content in storage.
    """
    __tablename__ = 'article'
    id = Column(String, primary_key=True)
    title = Column(String, nullable = False)
    url_prefix = Column(String, nullable = False)
    is_available = Column(Boolean)
    markdown_text = Column(String, nullable = False)

    def __init__(self, id: str, title: str, markdown_text: str):
        self.id = id
        self.title = title
        try:
            self.url_prefix = self.generate_url_path_from_title(title)
        except:
            raise http_errors.InvalidArticleNameError
        self.is_available = True
        self.markdown_text = markdown_text #TODO: Validate markdown before setting it
    
    def __str__(self) -> str:
        return f"#############\nid: {self.id}#############\n"
    
    def generate_url_path_from_title(self, title: str) -> str:
        if len(title) < 1:
            raise NameError
        white_space_cleaned_string = ' '.join(title.split()).replace(' ', '-')
        special_character_cleaned_string = re.sub('[^A-Za-z0-9_.\\-~]', '-', white_space_cleaned_string)[:constants.MAX_URL_PATH_LEN]
        trailing_dashes_cleaned = re.sub('-+\\Z', '', special_character_cleaned_string)
        leading_dashes_cleaned = re.sub('\\A-+', '', trailing_dashes_cleaned)
        return leading_dashes_cleaned
    

