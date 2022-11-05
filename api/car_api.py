import requests
import pandas as pd

#API_KEY = 'BhKrBC3dXdlTwHAsvUoR3w==BM28AgqyWcnfAKVu'

df_cars = pd.DataFrame()
df_model_and_year = pd.DataFrame()

def get_makes():
    with open('car_makes.txt') as f:
        makes_array = [make.rstrip() for make in f]
    f.close()
    return makes_array

def get_models(make):
    """ api_url = 'https://api.api-ninjas.com/v1/cars?make={}'.format(make)
    response = requests.get(api_url, headers={'X-Api-Key': API_KEY})
    if response.status_code == requests.codes.ok:
        df_cars = pd.read_json(response.text)
        models_array = df_cars['model'].to_list()
        models_array = list(set(models_array))
        return models_array, df_cars
    else:
        print("Error:", response.status_code, response.text) """
    df_cars = pd.read_csv('vehicles.csv')
    df_cars = df_cars[['comb08', 'fuelType1', 'make', 'model', 'year']]
    df_cars = df_cars.loc[df_cars['make'] == make]
    models_array = df_cars['model'].to_list()
    models_array = list(set(models_array))
    map(str, models_array)
    return models_array, df_cars

models_array, df_cars = get_models('Toyota')
print(df_cars)


def get_years(model, df_cars):
    df_model = df_cars.loc[df_cars['model'] == model]
    years_array = df_model['year'].to_list()
    years_array = list(set(years_array))
    map(int, years_array)
    return years_array, df_model

""" years_array, df_model = get_years('4Runner 4WD', df_cars)
print(years_array)  """

def get_mpg_fueltype(year, df_model):
    df_unique_year = df_model.loc[df_cars['year'] == year]
    df_unique_year.groupby('year').mean()
    mpg = df_unique_year['comb08'].iloc[0]
    fueltype = df_model['fuelType1'].iloc[0]
    return float(mpg), str(fueltype)

""" mpg, fueltype = get_mpg_fueltype(1993, df_model)
print(mpg)
print(fueltype)  """

