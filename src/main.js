import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import router from './router'
import store from './store'

import CardInfo from './components/CardInfo.vue'
import CardInfoPanel from './components/CardInfoPanel.vue'
import CardInfoProgress from './components/CardInfoProgress.vue'


const app = createApp(App)

app.use(store)
app.use(router)
app.use(Antd)

app.component('card-info', CardInfo)
app.component('card-info-panel', CardInfoPanel)
app.component('card-info-progress', CardInfoProgress)


app.mount('#app')
