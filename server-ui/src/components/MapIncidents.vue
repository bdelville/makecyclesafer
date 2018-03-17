<template>
  <div id="incident-map"></div>
</template>

<script>
  import axios from 'axios'
  let auckland
  const apiUrl = 'http://localhost:8081/api/incidents'

  let mymap
  let accidentIcon, hazardIcon, thumbIcon, nztaIcon

  export default {
    name: 'map-incidents',
    L: function () { return window.L },
    mounted: function () {
      window.L = L; // eslint-disable-line

      // Init once we get L
      auckland = window.L.latLng(-36.84968761883941, 174.75575570185242)

      accidentIcon = window.L.icon({
        iconUrl: '../../static/accident.png',
        iconSize: [35, 35],
        shadowSize: [40, 40],
        iconAnchor: [18, 18],
        shadowAnchor: [4, 62],
        popupAnchor: [0, -20]
      })
      hazardIcon = window.L.icon({
        iconUrl: '../../static/hazard.png',
        iconSize: [35, 35],
        shadowSize: [40, 40],
        iconAnchor: [18, 18],
        shadowAnchor: [4, 62],
        popupAnchor: [0, -20]
      })
      thumbIcon = window.L.icon({
        iconUrl: '../../static/thumbs.png',
        // shadowUrl: 'leaf-shadow.png',
        iconSize: [35, 35],
        shadowSize: [40, 40],
        iconAnchor: [18, 18],
        shadowAnchor: [4, 62],
        popupAnchor: [0, -20]
      })
      nztaIcon = window.L.icon({
        iconUrl: '../../static/thumbs.png',
        // shadowUrl: 'leaf-shadow.png',
        iconSize: [35, 35],
        shadowSize: [40, 40],
        iconAnchor: [18, 18],
        shadowAnchor: [4, 62],
        popupAnchor: [0, -20]
      })

      initMap()
    }
  }

  function loadData () {
    const center = auckland
    const maxDistance = 10000
    axios
      .get(`${apiUrl}/around?latitude=${center.lat}&longitude=${center.lng}&maxDistance=${maxDistance}`)
      .then(function (response) {
        // console.log(response)
        for (let data of response.data) {
          // console.log(`Add marker ${data}`)
          let icon = accidentIcon

          if (data.source === 'NZTA') {
            icon = nztaIcon
            break
          } else {
            switch (data.reportType) {
              case 'accident' :
                icon = accidentIcon
                break
              case 'hazard' :
                icon = hazardIcon
                break
              case 'thumbup' :
                icon = thumbIcon
                break
            }
          }

          const marker = window.L.marker([data.location.latitude, data.location.longitude], {icon}).addTo(mymap)
          const year = data.whenOccurred.substring(0, 4)
          const incident = data.incident ? `${data.incident.type}` : ''
          marker.bindPopup(`<b>${data.reportType}</b> occurred in ${year}<br/>${incident}</br>Source: ${data.source}`)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function initMap () {
    mymap = window.L.map('incident-map')
    mymap.setView(auckland, 13)
    mymap.whenReady(loadData)

    const openCycleMap = window.L.tileLayer('https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey={apikey}', {
      attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      apikey: '76f9f67845d24a74a849fb2af9e859ec',
      maxZoom: 22
    })
    openCycleMap.addTo(mymap)
  }
</script>

<style scoped>
  #incident-map { height: 600px; }
</style>
