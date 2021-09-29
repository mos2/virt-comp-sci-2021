import requests
import json

url = "http://169.51.203.121:32141/users"
headers = {'Accept': 'application/json'}

response = requests.get(url, headers)

users = response.json()

print(json.dumps(users))
