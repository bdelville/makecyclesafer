import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
        id: 'afajfjadfaadfa323',
        title: 'Incident reported in auckland',
        date: '2017-07-17'
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
        id: 'aadsfhbkhlk1241',
        title: 'Incident reported in hamilton',
        date: '2017-07-19'
      }
    ],
    loadedHazards: [
      {
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRitP3DcqfwnF45Q0KaiQjVWUFdh-dRcV2VDNYyio2HIauF9K6l',
        id: 'afajfjadfaadfa323',
        title: 'Hazard reported in auckland',
        date: '2017-07-17'
      },
      {
        imageUrl: 'data:image/jpeg;base64,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',
        id: 'aadsfhbkhlk1241',
        title: 'Hazard reported in hamilton',
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
