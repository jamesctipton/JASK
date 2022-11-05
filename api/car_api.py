import requests
import pandas as pd

API_KEY = 'BhKrBC3dXdlTwHAsvUoR3w==BM28AgqyWcnfAKVu'

df_cars = pd.DataFrame()
df_model_and_year = pd.DataFrame()

def get_makes():
    with open('car_makes.txt') as f:
        makes_array = [make.rstrip() for make in f]
    f.close()
    return makes_array

def get_models(make):
    api_url = 'https://api.api-ninjas.com/v1/cars?make={}'.format(make)
    response = requests.get(api_url, headers={'X-Api-Key': API_KEY})
    if response.status_code == requests.codes.ok:
        df_cars = pd.read_json(response.text)
        models_array = df_cars['model'].to_list()
        models_array = list(set(models_array))
        return models_array, df_cars
    else:
        print("Error:", response.status_code, response.text)

models_array, df_cars = get_models('Toyota')

def get_years(model, df_cars):
    df_model_and_year = df_cars.groupby(by=["model"]).mean()
    #df_model_and_year= df_model_and_year.loc[df_cars['model'] == model]
    year_array = df_model_and_year['year'].to_list()
    year_array = list(set(year_array))
    for y in year_array:
        int(y)
    return year_array, df_model_and_year

years, df_model_and_year = get_years('corolla', df_cars)
print(years)
print(df_model_and_year)

def get_mpg_fueltype(year, df_model_and_year):
    df_model_and_year #= df_model_and_year.loc[df_cars['year'] == year]
    print(df_model_and_year)
    #mpg = df_model_and_year['combination_mpg'].iloc[0]
    #fueltype = df_model_and_year['fuel_type'].iloc[0]
    #return mpg, fueltype

#get_mpg_fueltype(1993, df_model_and_year)
'''
mpg, fueltype = get_mpg_fueltype(1993, df_model_and_year)
print("MPG" + mpg)
print("Fuel type" + fueltype)
'''