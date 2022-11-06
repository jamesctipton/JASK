import pandas as pd

df_cars = pd.DataFrame()
df_model = pd.DataFrame()

def get_makes():
    with open('car_makes.txt') as f:
        makes_array = [make.rstrip() for make in f]
        f.close()
    return makes_array

def create_df_cars():
    return pd.read_csv('vehicles.csv', low_memory=False)

def get_models(make):
    df_cars = create_df_cars()
    df_cars = df_cars[['comb08', 'fuelType1', 'make', 'model', 'year']]
    df_cars = df_cars.loc[df_cars['make'] == make]
    models_array = df_cars['model'].to_list()
    models_array = list(set(models_array))
    map(str, models_array)
    return models_array

def get_years(model):
    df_cars = create_df_cars()
    df_model = df_cars.loc[df_cars['model'] == model]
    years_array = df_model['year'].to_list()
    years_array = list(set(years_array))
    map(str, years_array)
    return years_array

def get_mpg_fueltype(year, model):
    df_cars = create_df_cars()
    df_cars = df_cars[['comb08', 'fuelType1', 'make', 'model', 'year']]
    df_model = df_cars.loc[df_cars['model'] == model]
    df_unique_year = df_model.loc[df_cars['year'] == year]
    fueltype = df_model['fuelType1'].iloc[0]
    df_unique_year = df_unique_year.groupby('year').mean()
    mpg = df_unique_year['comb08'].iloc[0]
    return float(mpg), str(fueltype)




