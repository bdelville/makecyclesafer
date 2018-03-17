import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Incidents from '@/components/Incident/Incidents'
import ReportIncident from '@/components/Incident/ReportIncident'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Incident from '@/components/Incident/Incident'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Incidents',
      name: 'Incidents',
      component: Incidents
    },
    {
      path: '/Incident/new',
      name: 'ReportIncident',
      component: ReportIncident
    },
    {
      path: '/Incidents/:id',
      name: 'Incident',
      props: true,
      component: Incident
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ],
  mode: 'history'
})
