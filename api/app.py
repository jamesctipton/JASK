import asyncio 
import nest_asyncio 
nest_asyncio.apply()

from tornado.web import Application
import tornado.ioloop
from tornado_sqlalchemy import SQLAlchemy
from handlers import CarFullHandler, TripHandler, CarMakeHandler, CarModelHandler, CarYearHandler

database_url = 'mysql+pymysql://jask:Emissions123!@jaskdb.mysql.database.azure.com/jask'

def make_app():
    return Application([
        (r"/car/make", CarMakeHandler),
        (r"/car/model", CarModelHandler),
        (r"/car/year", CarYearHandler),
        (r"/car/full", CarFullHandler),
        (r"/trip", TripHandler)
    ], db=SQLAlchemy(database_url))

async def main():
    app = make_app()
    print("Tornado API is running on http://localhost:8888/")
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()

if __name__ == "__main__":
    asyncio.run(main())
