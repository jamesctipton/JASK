from tornado.web import RequestHandler
from tornado_sqlalchemy import SessionMixin, as_future
from models import Car, Trip
from car_api import get_makes, get_models
import json

make = ""
model = ""

class CarMakeHandler(SessionMixin, RequestHandler):
    def get(self):
        makes_array = get_makes()
        self.write(
            json.dumps(makes_array)
        )
    async def post(self):
        if not make:
            error_response = {
                'resultStatus': 'FAILURE', 
                'message': 'Car make not provided.'
            }
            self.write(error_response)
        make = self.get_argument("make")

class CarModelHandler(SessionMixin, RequestHandler):
    def get(self):
        models_array = get_models(make)
        
        self.write(
            json.dumps(models_array)
        )
    async def post(self):
        with self.make_session() as session:
            if not make:
                error_response = {
                    'resultStatus': 'FAILURE', 
                    'message': 'Car model not provided.'
                }
            self.write(error_response)
        model = self.get_argument("model")

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