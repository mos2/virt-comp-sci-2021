import requests

jsonBody = {'username': 'thomas', 'password': 'password1234'}

r = requests.post('http://localhost:3000/users', params=jsonBody)
# r.headers['Authorization'] = 'Bearer XYZ'

print(r)
