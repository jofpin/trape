from flask import Flask
from core.trape import Trape
from core.db import Database

trape = Trape()
db = Database()
app = Flask(__name__, template_folder='../templates', static_folder='../static')
