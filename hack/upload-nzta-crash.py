import sys, getopt, os, os.path, time
import requests, shutil
import json
import random
import csv

# Parse a file from Crash_Analysis_System_CAS_data NZTA

dataPath = "../../Crash_Analysis_System_CAS_data.csv"
uriPath = "http://localhost:8081/api/incidents"
headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}

#0 X,Y,OBJECTID,crashYear,crashFinancialYear,crashSeverity,fatalCount,seriousInjuryCount,minorInjuryCount,multiVehicle,
#10 holiday,regionDesc,tlaID,tlaName,areaUnitID,meshblockID,easting,northing,crashLocation1,crashLocation2,
#20 outdatedLocationDescription,crashRSRP,intersection,junctionType,cornerRoadSideRoad,crashDirectionDescription,crashDistance,crashRPDirectionDescription,directionRoleDescription,
#30 crashRPDescription,crashSHDescription,crashRPSH,crashRPNewsDescription,intersectionMidblock,flatHill,roadCharacter,roadCurvature,roadLane,roadMarkings,
#40 roadSurface,roadWet,numberOfLanes,trafficControl,speedLimit,advisorySpeed,temporarySpeedLimit,urban,darkLight,light,
#50 streetLight,weatherA,weatherB,postOrPole,guardRail,waterRiver,cliffBank,ditch,fence,tree,
#60 kerb,trafficIsland,parkedVehicle,trafficSign,vehicle,bridge,overBank,animals,strayAnimal,objectThrownOrDropped,
#70 debris,houseBuilding,train,phoneBoxEtc,slipFlood,roadworks

# cyclist only, cyclist and pedestrian, cyclist and motor vehicle

def filter(row) :
    if getCyclingType(row) and (row[3] == '2017' or row[3] == '2016'):
        return True
    return False

def getCyclingType(row) :
    if "Cyclists only" in row[9]:
        return 'cyclistOnly'
    if "Vehicle(s)+Cyclist(s)" in row[9]:
        return 'cyclistVehicle'
    if "Cyclist(s)+Pedestrian(s)" in row[9]:
        return 'cyclistPedestrian'
    return None

def description(row) :
    descr = row[6] + ' fatal, ' + row[7] + ' seriousInjury, ' + row[8] + ' minorInjury\n'
    descr = descr + row[30] + ', ' + row[31] + ', ' + row[33]
    return descr

def weather(row) :
    if 'Rain' in row[51] or 'Rain' in row[52]:
        return 'rainy'
    if 'Sun' in row[51] or 'Sun' in row[52]:
        return 'sunny'
    return ''

def descriptionLoc(row) :
    return row[18] + ', ' + row[19]

def csvToJsonApi(row):
    data = {
        '_id': row[2],
        'source': 'NZTA',
        'reportType': 'incident',
        'whenOccurred': row[3] + '-02-01T00:00:00.000+1200',
        'weather': weather(row),
        'location': {"latitude": float(row[1]), "longitude": float(row[0]), "description": descriptionLoc(row)},
        'incident': {'type' : getCyclingType(row), 'criticality': 'crash', 'description': description(row)}
    }
    return data # json.dumps(data);

def postData(dataJson):
    dataJson = json.dumps(dataJson)
    print('post ' + str(dataJson))
    r = requests.post(uriPath, data=dataJson, headers=headers)
    if not r.status_code == 200 and not r.status_code == 201:
        print(r.status_code, r.reason)
        raise ValueError(str(r.status_code) + ' ' + r.reason)

#Start to load data
totalCount = 0
count = 0

try:
    print ('Start loading the data')
    with open(dataPath, 'rb') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        for row in reader:
            totalCount = totalCount + 1
            try:
                if not filter(row): continue
                jsonData = csvToJsonApi(row)
                postData(jsonData)
                count = count + 1
            except Exception as e:
                print ('Error for line: ' + str(e))
    print ('Filled the database with ' + str(count) + ' valid on ' + str(totalCount) + ' data')

except Exception as e:
    print('Exception: after ' + str(totalCount) + ' success : ' + str(e))
    raise