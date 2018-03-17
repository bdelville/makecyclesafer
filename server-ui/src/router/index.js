import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Incidents from '@/components/Incident/Incidents'
import Hazards from '@/components/Incident/Hazards'
import ReportIncident from '@/components/Incident/ReportIncident'
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
      path: '/Hazards',
      name: 'Hazards',
      component: Hazards
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
    }
  ],
  mode: 'history'
})
