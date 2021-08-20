import requests
import json

url = "http://169.51.203.121:32141/user"
headers = {'Content-Type': 'application/json'}

name = input("What is your name?")
user_id = input("What is your User ID?")

user = {'id': int(user_id), 'username': name}

response = requests.put(url, data = json.dumps(user), headers = headers)

response_message = response.text

print(response_message)
