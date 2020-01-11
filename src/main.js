import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = true;
// Vue.prototype.$myModule = null; // Will hold the module's instance when loaded the first time

// const { PeerServer } = require('peer');
// const server = PeerServer({port: 9000, path: '/myapp'});



new Vue({
    render: h => h(App)
}).$mount('#app');
