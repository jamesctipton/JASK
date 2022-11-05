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

        df_cars = pd.read_csv('vehicles.csv', low_memory=False)
        df_cars = df_cars[['comb08', 'fuelType1', 'make', 'model', 'year']]
        df_cars = df_cars.loc[df_cars['make'] == str(make)]
        models_array = df_cars['model'].to_list()
        models_array = list(set(models_array))
        map(str, models_array)
        #models_array = get_models(make)
        self.write(json.dumps(models_array))
        

class CarYearHandler(SessionMixin, RequestHandler):
    async def post(self):
        data = json.loads(self.request.body)
        print(data)
        model = data['model']
        print(model)

        years_array = get_years(model)
        self.write(json.dumps(years_array))

class CarFullHandler(SessionMixin, RequestHandler):
    async def post(self):
        with self.make_session() as session:
            data = json.loads(self.request.body)
            print(data)
            year = data['year']
            print(year)
            mpg, fueltype = get_mpg_fueltype(int(year), model)

            car = Car(make = make, model = model, year = year, fueltype = fueltype, mpg = mpg)
            await as_future(session.add(car))
            await as_future(session.commit())
        self.write({
            'response': 'SUCCESS'
        })

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