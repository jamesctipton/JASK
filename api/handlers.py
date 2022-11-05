from tornado.web import RequestHandler
from tornado_sqlalchemy import SessionMixin, as_future
from models import Car, Trip
from car_api import *
import json

make = ""
model = ""
year = ""

class CarMakeHandler(SessionMixin, RequestHandler):
    def get(self):
        makes_array = get_makes()
        self.write(
            json.dumps(makes_array)
        )
<<<<<<< HEAD

class CarModelHandler(SessionMixin, RequestHandler):
    async def post(self):
        make = self.get_argument("make")
        #model = self.get_argument("model")
        models_array = get_models(make)
        self.write(
            json.dumps(models_array)
        )

class CarYearHandler(SessionMixin, RequestHandler):
    def get(self):
        years_array = get_years(model)
        
        self.write(
            json.dumps(years_array)
        )
    async def post(self):
        with self.make_session() as session:
            year = self.get_argument("year")
            if not year:
                error_response = {
                    'resultStatus': 'FAILURE', 
                    'message': 'Car year not received.'
                }
                self.write(error_response)
                return
            mpg, fueltype = get_mpg_fueltype(int(year))
            car = Car(make = make, model = model, year = year, fueltype = fueltype, mpg = mpg)
=======

class CarModelHandler(SessionMixin, RequestHandler):
    async def post(self):
        data = json.loads(self.request.body)
        make = data['make']
        print(make)

        models_array = get_models(make)
        print(models_array)
        self.write(json.dumps(models_array))
        

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
>>>>>>> dd854df29780c81d490bf94a51f2f7a2333e7576
            await as_future(session.add(car))
            await as_future(session.commit())
            self.write({
                'resultStatus': 'SUCCESS',
                'message': "Car DB object created"
            })

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