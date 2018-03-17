<template>
 <v-flex xs12 class="text-xs-center" >
      <v-layout row wrap class="mt-2">
      <v-flex xs4 sm2 md1>
        <v-avatar
        size="24px"
        slot="activator"
        width="24px"
      >
        <img
          :src="images.incident"
          alt="incident"
          >
          <span>incidents</span>
      </v-avatar>

      </v-flex>,
      <v-flex xs4 sm2 md2>
        <v-avatar
        size="24px"
        slot="activator"
        width="24px"
      >
        <img
          :src="images.nearmisses"
          alt="nearmisses"
          >
          <span>near-misses</span>
      </v-avatar>
      </v-flex>,
      <v-flex xs3 sm2 md1>
        <v-avatar
        size="24px"
        slot="activator"
        width="24px">
        <img :src="images.hazard"  alt="hazards" >
        <span>hazards</span>
      </v-avatar>
      </v-flex>
      </v-layout>
</v-flex>
</template>
<script>
  export default {
    data () {
      return {
        images: {
          incident: require('../assets/accident.png'),
          hazard: require('../assets/hazard.png'),
          nearmisses: require('../assets/thumbs.png')
        }
      }
    }
  }
  </script>
