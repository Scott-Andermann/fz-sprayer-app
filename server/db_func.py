from mysql.connector import connect, Error
import os
from nanoid import generate
import json
import math
import time
from dotenv import load_dotenv

def get_password():
    load_dotenv()
    return os.environ['SQL_PASSWORD']

def add_job(job_info, user_id):
    # print(type(user_id))
    try:
        with connect(
            host='localhost',
            user='root',
            password=get_password(),
            database='flowzone_app'
        ) as connection:
            add_job_query = """INSERT INTO jobs
                (jobID, uploadTime, userID, jobData) 
                VALUES (%s, %s, %s, %s)"""
            val_tuple = (generate(), round(time.time()), user_id, json.dumps(job_info))
            with connection.cursor() as cursor:
                cursor.execute(add_job_query, val_tuple)
                connection.commit()
            return 'job added successfully'
    except Error as e:
        print(e)

def convert_to_mins(seconds):
    minutes = math.floor(seconds / 60)
    seconds_string = math.floor(seconds) % 60
    if seconds_string < 10:
        seconds_string = f'0{seconds_string}'
    # print(minutes)
    return f'{minutes}:{seconds_string}'

def db_query(page, num_results, connection):
    get_job_query = """SELECT * FROM jobs WHERE userID = %s ORDER BY uploadTime DESC LIMIT %s, %s;"""
    val_tuple = ('user1', page * 3, num_results)
    print(val_tuple)
    with connection.cursor() as cursor:
        cursor.execute(get_job_query, val_tuple)
        result = cursor.fetchall()
        # print(result[0][2])
        # print(result)
    raw_job_data = []
    times = []
    for item in result:
        print(item)
        raw_job_data.append(item[3])
        times.append(item[1])
        # raw_job_data = [result[0][3], result[1][3]]
    processed_job_data = []
    for job in raw_job_data:
        info = json.loads(job)
        n = len(info['time'])
        number_samples = 20
        sampling_rate = math.floor(n / number_samples)
        if (sampling_rate == 0): sampling_rate = 1
        start_time = info['time'][0]
        time_data = []
        flow_data = []

        for count, i in enumerate(range(0, n, sampling_rate)):
            if count % 2 == 0:
                time_data.append(convert_to_mins((info['time'][i] - start_time) / 1000))
            else: time_data.append('')
            flow_data.append(info['totalFlow'][i])
        if (len(time_data) != 20):
            time_data.append('')
        else: 
            time_data.append(convert_to_mins((info['time'][n-1] - start_time) / 1000))
        flow_data.append(info['totalFlow'][n-1])
        # print(time_data)
        # print(flow_data)
        processed_job_data.append({'startTime': start_time, 'description': info['description'], 'time': time_data, 'totalFlow': flow_data, 'totalTime': convert_to_mins((info['time'][n-1] - start_time) / 1000)})
    # print(json.dumps(processed_job_data))
    return json.dumps(processed_job_data)

def get_jobs_from_db(page):
    try:
        with connect(
            host='localhost',
            user='root',
            password=get_password(),
            database='flowzone_app'
        ) as connection:
            return db_query(page, 3, connection)
    except IndexError:
        try:
            print('try with 1')
            return db_query(page, 1, connection)
        except IndexError:
            print('return none')
            return json.dumps('none')
        except Error as e:
            print(e)
    except Error as e:
        print(e)


if __name__ == '__main__':
    print(get_password())