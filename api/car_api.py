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
    df_model = df_cars.loc[df_cars['model'] == model]
    df_model.groupby(by=["year"]).mean()
    return df_model

def get_mpg(year, df_model):
    df = df_model.loc[df_cars['year'] == year]
    #print(df)
    mpg = df['combination_mpg'].iloc[0]
    #print(mpg)
    return mpg


# df_cars = get_models('Toyota')
# df_model = get_years('corolla', df_cars)
# get_mpg(1993, df_model)
#print(get_mpg('1993', df_model))
