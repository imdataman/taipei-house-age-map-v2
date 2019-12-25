<template lang="pug">
    #app.flex.flex-column.vh-100
        #middle.flex.flex-auto
            #sidebar.overflow-auto.bg-dark-blue.tc(:class="{ collapsed: !sidebarOpen}")
                #mobile-header.pt4.pb3-l.pt5-l
                    p.f2-l.f3 台北屋齡地圖
                AgeInfo.pb3.pt1.pb5-l.pt3-l(:legend = 'legend')
                Legend.pa2(:legend = 'legend')
            #map-container.relative.flex-auto
                Map(:legend = 'legend')
                img.absolute(class="loading" src="image/loading.gif" v-show="!loading")
                #sidebarToggle.absolute.bg-black.f5.br.bt.bb.br--right.br-100.b--black.bw1.mt2.magenta.pointer.grow.pa1-l.pl1(@click="sidebarOpen = !sidebarOpen")
                  span(v-if="!sidebarOpen")
                    .icono-caretRight.ml0
                  span(v-if="sidebarOpen") 
                    .icono-caretLeft.ml0
        #bottom.flex-none.lh-solid.ph2.pt3.pb1.bg-near-white.tc.black(v-show="sidebarOpen")
            p.ma0 資料來源: 
                | 台北市開放資料網站，2017年1月
            p 製作 
                a(href="https://twitter.com/imandylin2") 林佳賢
                | .  
                a(href="https://github.com/imdataman/taipei-house-age-map-v2") Github.
</template>

<script>
import Map from './components/Map.vue'
import AgeInfo from './components/AgeInfo.vue'
import Legend from './components/Legend.vue'
import { EventBus } from './components/EventBus';

export default {
    name: 'app',
    components: {
      Map,
      AgeInfo,
      Legend
    },
    data: () => ({
      sidebarOpen: true,
      loading: false,
      legend: {
            breaks: [0, 10, 20, 25, 30, 35, 40, 50, ""],
            palette: ["#440154", "#46337E", "#365C8D", "#277F8E", "#1FA187", "#4AC16D", "#9FDA3A", "#FDE725"],
        },
    }),
    watch: {
      sidebarOpen() {
        this.$nextTick(() => window.map.resize())
      }
    }, 
    created() {
        EventBus.$on('loading-finished', () => this.loading = true);
    }

}

require('tachyons/css/tachyons.min.css');
</script>

<style>
/* @import url(//fonts.googleapis.com/earlyaccess/notosanstc.css); */

html, body {
  height: 100vh;
  width: 100%;
  margin:0;
  padding:0;
  color: white;
  font-family: PingFangTC-Ultralight, SimHei, sans-serif;
}

@media (min-width: 800px) {
    #sidebar {
        width: 20em;
    }
}
@media only screen and (max-width: 800px) {
    #sidebar {
        width: 10em;
    }
    
    #mobile-header .logo {
        height: 25px;
    }
    #bottom {
        font-size:75%;
    }

}

.logo {
    height: 40px;
}

#sidebar.collapsed {
  position: absolute;
  animation-duration: 0.5s;
  animation-name: slideout;
  pointer-events:none;
  animation-fill-mode: forwards;
}

.collapsed * {
    display: none;
    /* margin-left: -100px; */
}

.loading {
    width: 50px;
    height: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
