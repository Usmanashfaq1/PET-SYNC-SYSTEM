import pandas as pd
from sklearn.linear_model import LinearRegression
import json
import sys

# Read data from Excel file in the same directory
file_path = 'nutrition_extended.xlsx'

# Read data from the default sheet
nutrition_data = pd.read_excel(file_path)

# Fit linear regression models
model = LinearRegression().fit(nutrition_data[['weight_lbs']], nutrition_data['normal_weight_gramsperday'])

# Define function to calculate food quantities
def calculate_food_quantities(age, weight, diet_type):
    result = {}

    if diet_type == 'dry only':
        result['dryFoodAmount'] = dry_only(age, weight)
        result['recommendedFood'] = {
            'brand': 'Purina',  # Example brand
            'type': 'Dry',
            'nutritionalDetails': {
                'proteins': 25,  # Example value, replace with actual nutritional data
                'fibers': 3,     # Example value, replace with actual nutritional data
                # Add more nutritional details as needed
            }
        }
    elif diet_type == 'wet only':
        result['wetFoodAmount'] = wet_only(age, weight)
        result['recommendedFood'] = {
            'brand': 'Purina',  # Example brand
            'type': 'Wet',
            'nutritionalDetails': {
                'proteins': 30,  # Example value, replace with actual nutritional data
                'fibers': 2,     # Example value, replace with actual nutritional data
                # Add more nutritional details as needed
            }
        }

    return result

def dry_only(age, weight):
    return round(((0.75 + 1) / 2) / 15 * weight * age, 1)

def wet_only(age, weight):
    return round(((0.75 + 1) / 2) / 15 * weight * age, 1)

# Receive input from command line arguments
age = int(sys.argv[1])
weight = float(sys.argv[2])
diet_type = sys.argv[3]

# Calculate food quantities
result = calculate_food_quantities(age, weight, diet_type)

# Output the result as JSON
print(json.dumps(result))
