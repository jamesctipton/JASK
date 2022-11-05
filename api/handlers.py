from tornado.web import RequestHandler
from tornado_sqlalchemy import SessionMixin, as_future
from models import Car, Trip
from car_api import makes_array

class CarMakeHandler(SessionMixin, RequestHandler):
    def get(self):
        self.write({
            "makes" : [
                {{makes_array}}
            ]
        })
    async def post(self):
        with self.make_session() as session:
            return

class CarTypeHandler(SessionMixin, RequestHandler):
    def get(self):
        self.write({
            'resultStatus': 'SUCCESS',
            'message': "hit car type handler"
        })
    async def post(self):
        with self.make_session() as session:
            make = self.get_argument("make")
            model = self.get_argument("model")
            fueltype = self.get_argument("fueltype")
            mpg = self.get_argument("mpg")

            car = Car(make = make, model = model, fueltype = fueltype, mpg = mpg)
            await as_future(session.add(car))
            await as_future(session.commit())

class TripHandler(SessionMixin, RequestHandler):
    def get(self):
        self.write({
            'resultStatus': 'SUCCESS',
            'message': "hit trip handler"
        })
    async def post(self):
        with self.make_session() as session:
            tripname = self.get_argument("tripname")
            distance = self.get_argument("distance") # miles 
            gasUsed = self.get_argument("gasUsed") # gallons
            emissions = self.get_argument("emissions") # tons 
            gasCost = self.get_argument("gasCost")

            trip = Trip(tripname = tripname, distance = distance, gasUsed = gasUsed,
                        emissions = emissions, gasCost = gasCost)
            await as_future(session.add(trip))
            await as_future(session.commit())