# yt-devmeetup-vue

A dev meetup application built with Vue + Vuetify + Firebase.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Deploy on IBM Bluemix
https://console.bluemix.net/apps/256babd8-3dac-4871-920e-1e998f3e561a?paneId=startcoding&env_id=ibm:yp:us-south


``` bash
cd server-ui
bluemix api https://api.ng.bluemix.net
bluemix login -u cycle.safer.nz@gmail.com -o cycle.safer.nz@gmail.com -s dev
bluemix app push CycleSaferUi
```
