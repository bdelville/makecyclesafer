<template>
  <v-container >
    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <map-incidents></map-incidents>
      </v-flex>
    </v-layout>
    <v-layout row wrap  class="mt-2">
      <side-card> </side-card>
    </v-layout>
  </v-container>
</template>


<script>
  import MapIncidents from './MapIncidents.vue'
  import SideCard from './SideCard.vue'

  export default {
    computed: {
      meetups () {
        return this.$store.getters.featuredMeetups
      }
    },
    methods: {
      onLoadMeetup (id) {
        this.$router.push('/incidents/' + id)
      }
    },
    components: {
      MapIncidents,
      SideCard
    }
  }
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
</style>
