# makecyclesafer
Hackathon "Make cycling safer"
http://localhost:3000/api/incidents/

## Deploy on IBM Bluemix
https://console.bluemix.net/apps/256babd8-3dac-4871-920e-1e998f3e561a?paneId=startcoding&env_id=ibm:yp:us-south


``` bash
cd server-ui
bluemix api https://api.ng.bluemix.net
bluemix login -u cycle.safer.nz@gmail.com -o cycle.safer.nz@gmail.com -s dev
bluemix app push CycleSaferUi
```
