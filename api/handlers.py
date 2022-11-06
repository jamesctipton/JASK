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
        self.write(json.dumps(models_array))
        

class CarYearHandler(SessionMixin, RequestHandler):
    async def post(self):
        data = json.loads(self.request.body)
        model = data['model']

        years_array = get_years(model)
        self.write(json.dumps(years_array))

class CarFullHandler(SessionMixin, RequestHandler):
    async def post(self):
        data = json.loads(self.request.body)
        year = data['year']
        make = data['make']
        model = data['model']
        print(year, make, model)
        mpg, fueltype = get_mpg_fueltype(int(year), model)

        if (fueltype == "Premium Gasoline" or fueltype == "Regular Gasoline" 
            or fueltype == "Midgrade Gasoline" or fueltype == "Natural Gas"):
            fueltype = "Gasoline"
        
        car = Car(make = make, model = model, year = year, fueltype = fueltype, mpg = mpg)
        await as_future(self.session.add(car))
        await as_future(self.session.commit())
        

class TripHandler(SessionMixin, RequestHandler):
    async def post(self):
        data = json.loads(self.request.body)
        trip_name = data["trip_name"]
        distance = data["distance"] # miles
        fuel_used = data["fuel_used"]# gallons
        emissions = data["emissions"] # kg 
        fuel_cost = data["fuel_cost"] # in dollars
        trip_mpg = data["trip_mpg"]
        avg_speed = data["avg_speed"]# mph

        trip = Trip(trip_name = trip_name, distance = distance, fuel_used = fuel_used,
                    emissions = emissions, fuel_cost = fuel_cost, trip_mpg = trip_mpg, avg_speed = avg_speed)
        await as_future(self.session.add(trip))
        await as_future(self.session.commit())