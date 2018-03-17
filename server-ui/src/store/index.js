import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'http://www.tenerifenews.com/wp-content/uploads/2014/02/PAGE-8-NEAR-1024x576.jpg',
        id: 'afajfjadfaadfa323',
        title: 'Incident reported Ngamatea',
        date: '2017-07-17',
        type: 'near-misses'
      },
      {
        imageUrl: 'http://road.cc/sites/default/files/styles/main_width/public/images/%5Bparent-node-gallery-title%5D/London%20bus%20and%20cyclist.jpg?itok=xhigOFgX',
        id: 'aadsfhbkhlk1241',
        title: 'Incident reported 123 symonds street',
        date: '2017-07-19',
        type: 'hazards'
      }
    ],
    loadedHazards: [
      {
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRitP3DcqfwnF45Q0KaiQjVWUFdh-dRcV2VDNYyio2HIauF9K6l',
        id: 'afajfjadfaadfa323',
        title: 'Hazard reported 123 Tete lane Takanini',
        date: '2017-07-17'
      },
      {
        imageUrl: 'http://www.bamacyclist.com/articles/suckerlane1.jpg',
        id: 'aadsfhbkhlk1241',
        title: 'Hazard reported 68 symonds street',
        date: '2017-07-19'
      }
    ],
    user: {
      id: 'ajaldslfalsk12',
      registeredMeetups: ['aadsfhbkhlk1241']
    }
  },
  mutations: {
    createIncident (state, payload) {
      state.loadedMeetups.push(payload)
    }
  },
  actions: {
    createIncident ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString()
      }
      const key = '88888'
      commit('createIncident', {
        ...meetup,
        id: key
      })
      // Reach out to firebase and store it
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    loadedHazards (state) {
      return state.loadedHazards.sort((hazardA, hazardB) => {
        return hazardA.date > hazardA.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    loadedHazard (state) {
      return (hazardId) => {
        return state.loadedHazards.find((hazard) => {
          return hazard.id === hazardId
        })
      }
    }
  }
})
