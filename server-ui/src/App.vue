<template>
  <v-app>
    <v-navigation-drawer absolute temporary v-model="sideNav">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
             <img :src="item.icon" width="24px" height="24px" />
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up "></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="a" style="cursor: pointer">
        <img :src="images.logo" width="90px" height="60px" />
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <img left :src="item.icon" width="24px" height="24px" />
          {{ item.title }}

        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false,
        images: {
          logo: require('./assets/logo.png')
        },
        menuItems: [
          {icon: require('./assets/thumbs.png'), title: 'Feedback', link: '/Incidents'},
          {icon: require('./assets/hazard.png'), title: 'Hazards', link: '/Hazards'}
        ]
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
