import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

/* click outside event */
Vue.directive('click-outside', {
  priority: 700,
  bind () {
    const self = this
    this.event = function (event) { 
      console.log('emitting event')
      self.vm.$emit(self.expression, event) 
    }
    this.el.addEventListener('click', this.stopProp)
    document.body.addEventListener('click', this.event)
  },
  unbind () {
    console.log('unbind')
    this.el.removeEventListener('click', this.stopProp)
    document.body.removeEventListener('click', this.event)
  },
  stopProp (event) { event.stopPropagation() }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
