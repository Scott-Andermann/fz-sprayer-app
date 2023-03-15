from flask import Flask, request, Response
from flask_cors import cross_origin
import json
import boto3
from db_func import add_job, get_jobs_from_db, check_login

app = Flask(__name__)

@app.route('/')
@cross_origin()
def home():
    response_body = {
        "name": "Scott Andermann",
        "about": "It's working so far! need to set up env variables"
    }
    return response_body

@app.route('/add_data', methods = ['POST'])
@cross_origin()
def add_data():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        json = request.json
        # print(json['data'])
        add_job(json['data'], json['userID'])
    else:
        print('content type not supported')
    response_body = {
        "status": "Successfully added data",
    }
    return response_body

@app.route('/get_jobs')
@cross_origin()
def get_jobs():
    args = request.args
    print(args.get('page'))
    result = get_jobs_from_db(int(args.get('page')))        
    return result

@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    if request.method == 'POST':
        data = json.loads(request.data)
        print(data)
        email = data['email']
        password = data['password']
        result = check_login(email, password)
        if result == False:
            response_body = {
                "status": "Failed",
            }
            # print('failed')
            # print(email, password)
        else:
            response_body = {
                "status": "Successful",
                'userInfo': result
            }
    return response_body