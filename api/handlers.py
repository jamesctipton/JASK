from tornado.web import RequestHandler
from tornado_sqlalchemy import SessionMixin, as_future
from models import Car, Trip
from car_api import *
import json

make = ""
model = ""
year = ""
df_cars = pd.DataFrame()
df_model = pd.DataFrame()

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

        models_array, df_cars = get_models(make)
        print(models_array)
        self.write(json.dumps(models_array))
        

class CarYearHandler(SessionMixin, RequestHandler):
    async def post(self):
        data = json.loads(self.request.body)
        model = data['model']

        years_array, df_model = get_years(model, df_cars)
        self.write(json.dumps(years_array))
            

class CarFullHandler(SessionMixin, RequestHandler):
    async def post(self):
        with self.make_session() as session:
            data = json.loads(self.request.body)
            year = data['year']
            mpg, fueltype = get_mpg_fueltype(int(year), df_model)

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
            tripname = self.get_argument("tripname")
            distance = self.get_argument("distance") # miles 
            gasUsed = self.get_argument("gasUsed") # gallons
            emissions = self.get_argument("emissions") # tons 
            gasCost = self.get_argument("gasCost")

            trip = Trip(tripname = tripname, distance = distance, gasUsed = gasUsed,
                        emissions = emissions, gasCost = gasCost)
            await as_future(session.add(trip))
            await as_future(session.commit())