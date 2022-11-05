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

class CarModelHandler(SessionMixin, RequestHandler):
    async def post(self):
        data = json.loads(self.request.body)
        make = data['make']
        print(make)

        models_array = get_models(make)
        print(models_array)
        self.write(json.dumps(models_array))
        

class CarYearHandler(SessionMixin, RequestHandler):
    async def post(self):
        data = json.loads(self.request.body)
        model = data['model']

        years_array = get_years(model)
        self.write(json.dumps(years_array))

class CarFullHandler(SessionMixin, RequestHandler):
    async def post(self):
        with self.make_session() as session:
            data = json.loads(self.request.body)
            year = data['year']
            mpg, fueltype = get_mpg_fueltype(int(year), model)

            car = Car(make = make, model = model, year = year, fueltype = fueltype, mpg = mpg)
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
            data = json.loads(self.request.body)
            tripname = data["tripname"]
            distance = data["distance"] 
            gasUsed = data["gasUsed"]# gallons
            emissions = data["emissions"] # tons 
            gasCost = data["gasCost"] # in dollars

            trip = Trip(tripname = tripname, distance = distance, gasUsed = gasUsed,
                        emissions = emissions, gasCost = gasCost)
            await as_future(session.add(trip))
            await as_future(session.commit())