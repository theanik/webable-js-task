import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Shipments from '@/components/Shipments'
import ShipmentView from '@/components/ShipmentView'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path :'/shipments',
      name:'shipments',
      component: Shipments
    },
    {
      path: '/shipments/:id',
      name: 'ShipmentView',
      component: ShipmentView
    }
  ]
})
