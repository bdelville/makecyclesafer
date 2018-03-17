<template>
  <div id="incident-map"></div>
</template>

<script>
  import axios from 'axios'
  let auckland
  const apiUrl = 'http://localhost:8081/api/incidents'

  let mymap
  // let crashIcon

  export default {
    name: 'map-incidents',
    L: function () { return window.L },
    mounted: function () {
      window.L = L; // eslint-disable-line

      // Init once we get L
      auckland = window.L.latLng(-36.84968761883941, 174.75575570185242)

      // const crashIcon = window.L.icon({
      //   iconUrl: 'leaf-green.png',
      //   // shadowUrl: 'leaf-shadow.png',
      //   iconSize: [38, 95], // size of the icon
      //   shadowSize: [50, 64], // size of the shadow
      //   iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      //   shadowAnchor: [4, 62],  // the same for the shadow
      //   popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
      // })

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
          console.log(`Add marker ${data.location.latitude}, ${data.location.longitude}`)
          window.L.marker([data.location.latitude, data.location.longitude]).addTo(mymap)
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
  #incident-map { height: 400px; }
</style>
