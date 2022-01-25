import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import router from './router'
import store from './store'

import CardInfo from './components/CardInfo.vue'
import CardInfoPanel from './components/CardInfoPanel.vue'
import CardInfoProgress from './components/CardInfoProgress.vue'

import DashboardCard from './components/DashboardCard.vue'
import DashboardCell from './components/DashboardCell.vue'

import DashboardTJMap from './components/DashboardTJMap.vue'


const app = createApp(App)

app.use(store)
app.use(router)
app.use(Antd)

app.component('CardInfo', CardInfo)
app.component('CardInfoPanel', CardInfoPanel)
app.component('CardInfoProgress', CardInfoProgress)

app.component('DashboardCard', DashboardCard)
app.component('DashboardCell', DashboardCell)

app.component('DashboardTJMap', DashboardTJMap)


app.mount('#app')
