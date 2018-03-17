<template>
  <div id="incident-map"></div>
</template>

<script>
  export default {
    name: 'map-incidents',
    L: function () { return window.L },
    mounted: function () {
      window.L = L; // eslint-disable-line
      initMap()
    }
  }

  function initMap () {
    const auckland = window.L.latLng(-36.84968761883941, 174.75575570185242)
    const mymap = window.L.map('incident-map').setView(auckland, 13)

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
