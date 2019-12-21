<template lang="pug">
    #app.flex.flex-column.vh-100.avenir
        #top.bb.b--gray.bg-lightest-blue.pa1
            img.logo.fl.ma2(src="image/logo.jpg")
            h1.f1.ma2
                | 台灣人口指標地圖
        #middle.flex.flex-auto
            #sidebar.br.b--light-gray.overflow-auto.shadow-4.z-1.bg-light-blue(:class="{ collapsed: !sidebarOpen}")
                #mobile-header.bg-lightest-blue.ma0.pa1
                    img.logo.f5.mh1.mv2.fl(src="image/logo.jpg")
                    h1.f3.mv2 人口指標地圖

                Settings
                FeatureInfo.pa2(:selectedLegend = "selectedLegend")
                Legend.pa2(:selectedLegend = "selectedLegend")
            #sidebar-rim.relative.br.bg-light-gray.b--gray.shadow-4.z-1(v-show="!sidebarOpen"  style="width:20px" @click="sidebarOpen = true")
            #map-container.relative.flex-auto
                Map(:selectedLegend = "selectedLegend")
                img.absolute(class="loading" src="image/loading.gif" v-show="!loading")
                #sidebarToggle.absolute.bg-light-gray.f3.br.bt.bb.br--right.br-100.b--dark-gray.bw1.mt3.magenta.pointer.grow.pa1.z-1(@click="sidebarOpen = !sidebarOpen")
                  span(v-if="!sidebarOpen")
                    .icono-caretRight.ml0
                  span(v-if="sidebarOpen") 
                    .icono-caretLeft.ml0
        #bottom.bt.b--light-gray.flex-none.lh-solid.ph2.pt3.pb1bg-washed-blue.tc(v-show="sidebarOpen")
            p.ma0
                b 資料來源: 
                | 社會經濟資料庫，2019年10月
            p 製作 
                a(href="https://twitter.com/stevage1") 林佳賢
                | .  
                a(href="https://github.com/imdataman/vue-mapbox-map") Github.
</template>

<script>
import Map from './components/Map.vue'
import FeatureInfo from './components/FeatureInfo.vue'
import Settings from './components/Settings.vue'
import Legend from './components/Legend.vue'
import { EventBus } from './components/EventBus';

export default {
    name: 'app',
    components: {
      Map,
      FeatureInfo,
      Settings,
      Legend
    },
    data: () => ({
      sidebarOpen: true,
      loading: false,
      theme: "P_DEN",
      legend: [{
                breaks: [0, 100, 250, 500, 1000, 2500, 5000, 10000, ""],
                palette: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#084594"],
                type: 'P_DEN',
                unit: "人／km²",
            },
            {
                breaks: [0, 85, 90, 95, 100, 105, 110, 115, ""],
                palette: ["#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837"],
                type: 'M_F_RAT',
                unit: "男／100女",
            },
            {
                breaks: [0, 2, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, ""],
                palette: ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#005a32"],
                type: 'P_H_CNT',
                unit: "人／家戶",
            },
            {
                breaks: [0, 80, 100, 120, 140, 160, 180, 200, ""],
                palette: ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#99000d"],
                type: 'FLD4',
                unit: "",
            }
        ]
    }),
    computed: {
        selectedLegend() {
            return this.legend.find( l => l.type == this.theme);
        }
    },
    watch: {
      sidebarOpen() {
        this.$nextTick(() => window.map.resize())
      }
    }, 
    created() {
        EventBus.$on('select-feature', () => this.sidebarOpen = true);
        EventBus.$on('change-theme', theme => this.theme = theme.type);
        EventBus.$on('loading-finished', () => this.loading = true);
    }

}

require('tachyons/css/tachyons.min.css');
</script>

<style>
html, body {
  height: 100vh;
  width: 100%;
  margin:0;
  padding:0;
}

@media (min-width: 800px) {

    #sidebar {
        width: 20rem;
    }
    #mobile-header {
        display:none;
    }
}
@media only screen and (max-width: 800px) {
    #sidebar {
        width: 12rem;
    }
    #top {
        display:none;
    }
    #mobile-header .logo {
        height: 25px;
    }
    #bottom {
        font-size:75%;
    }

}

.logo {
    height: 50px;
}

#sidebar.collapsed {
  position: absolute;
  animation-duration: 0.5s;
  animation-name: slideout;
  pointer-events:none;
  animation-fill-mode: forwards;
}

#sidebarToggle:hover {
  background: #ff8f47;
}

.collapsed * {
    display: none;
    /* margin-left: -100px; */
}

#sidebarToggle {
    margin-left:-1px;
}

.loading {
    width: 50px;
    height: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
