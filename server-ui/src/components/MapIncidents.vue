<template>
  <div id="incident-map"></div>
</template>

<script>
  import axios from 'axios'
  import debounce from 'lodash.debounce'
  let auckland
  const apiUrl = 'http://localhost:8081/api/incidents'

  let mymap, markerGroup
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
        iconUrl: '../../static/nzta.png',
        // shadowUrl: 'leaf-shadow.png',
        iconSize: [15, 15],
        shadowSize: [40, 40],
        iconAnchor: [10, 10],
        shadowAnchor: [4, 62],
        popupAnchor: [0, -20]
      })

      initMap()
    }
  }

  const loadData = debounce(function () {
    const center = mymap.getCenter()
    const maxDistance = 10000
    axios
      .get(`${apiUrl}/around?latitude=${center.lat}&longitude=${center.lng}&maxDistance=${maxDistance}`)
      .then(function (response) {
        // console.log(response)
        markerGroup.clearLayers()
        let zIndexOffset = 1
        for (let data of response.data) {
          // console.log(`Add marker ${data}`)
          let icon = accidentIcon
          let subtitle

          if (data.source === 'NZTA') {
            icon = nztaIcon
            subtitle = `${data.incident.type}`
            zIndexOffset = 10
          } else {
            switch (data.reportType) {
              case 'accident' :
              case 'incident':
                icon = accidentIcon
                subtitle = `${data.incident.type}`
                zIndexOffset = 700000
                break
              case 'hazard' :
                icon = hazardIcon
                subtitle = `${data.hazard.type}`
                zIndexOffset = 700000
                break
              case 'thumbup' :
                icon = thumbIcon
                subtitle = `${data.thumbup.description}`
                zIndexOffset = 700000
                break
            }
          }

          const marker = window.L.marker([data.location.latitude, data.location.longitude], {icon, zIndexOffset}).addTo(markerGroup)
          marker.setZIndexOffset(zIndexOffset)
          const year = data.whenOccurred.substring(0, 4)
          marker.bindPopup(`<b>${data.reportType}</b> occurred in ${year}<br/>${subtitle}</br>Source: ${data.source}`)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }, 1500, { leading: true, trailing: true })

  function initMap () {
    mymap = window.L.map('incident-map')
    mymap.setView(auckland, 13)
    markerGroup = window.L.layerGroup().addTo(mymap)
    mymap.whenReady(loadData)

    const openCycleMap = window.L.tileLayer('https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey={apikey}', {
      attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      apikey: '76f9f67845d24a74a849fb2af9e859ec',
      maxZoom: 22
    })
    openCycleMap.addTo(mymap)

    mymap.on('moveend', function (event) {
      console.log('moveend')
      loadData()
    })
  }
</script>

<style scoped>
  #incident-map { height: 600px; }
</style>
