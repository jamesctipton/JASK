from sqlalchemy import Column, Integer, String, Numeric
from tornado_sqlalchemy import SQLAlchemy

database_url = 'mysql+pymysql://jask:Emissions123!@jaskdb.mysql.database.azure.com/jask'
db = SQLAlchemy(url=database_url)

class Car(db.Model):
    __tablename__ = "cars"
    id = Column(Integer, primary_key=True, unique=True)
    make = Column(String(128))
    model = Column(String(128))
    fueltype = Column(String(64))
    mpg = Column(Numeric(precision=10, scale=2)) # miles per gallon 

class Trip(db.Model):
    __tablename__ = "trips"
    id = Column(Integer, primary_key=True, unique=True)
    tripname = Column(String(256))
    distance = Column(Numeric(precision=10, scale=2)) # miles 
    gasUsed = Column(Numeric(precision=10, scale=2)) # gallons
    emissions = Column(Numeric(precision=10, scale=2)) # tons 
    gasCost = Column(Numeric(precision=10, scale=2)) # total cost of gas in dollars
    avgSpeed = Column(Numeric(precision=10, scale=2))

db.create_all()