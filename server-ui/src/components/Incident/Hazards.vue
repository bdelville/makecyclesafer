<template>
  <v-container>
    <v-layout row wrap v-for="hazard in hazards" :key="hazard.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                  :src="hazard.imageUrl"
                  height="130px"
                ></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text mb-0">{{ hazard.title }}</h5>
                    <div>{{ hazard.date }}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="'/hazards/' + hazard.id">
                     <img :src="images.hazard"  alt="hazards" width='24px' height='24px' >
                    View hazard
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        images: {
          hazard: require('../../assets/hazard.png')
        }
      }
    },
    computed: {
      hazards () {
        return this.$store.getters.loadedHazards
      }
    }
  }
</script>
