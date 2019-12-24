<template lang="pug">
    #app.flex.flex-column.vh-100.avenir
        #top.bb.b--gray.bg-washed-green.pa1
            img.logo.fl.ma2(src="image/logo.jpg")
            h1.f1.ma2
                | 台北屋齡地圖
        #middle.flex.flex-auto
            #sidebar.br.b--light-gray.overflow-auto.shadow-4.z-1.bg-washed-blue(:class="{ collapsed: !sidebarOpen}")
                #mobile-header.bg-washed-yellow.ma0.pa1
                    img.logo.f5.mh1.mv2.fl(src="image/logo.jpg")
                    h1.f3.mv2 台北屋齡地圖
                AgeInfo(:legend = 'legend')
                Legend.pa2(:legend = 'legend')
            #sidebar-rim.relative.br.bg-light-gray.b--gray.shadow-4.z-1(v-show="!sidebarOpen"  style="width:20px" @click="sidebarOpen = true")
            #map-container.relative.flex-auto
                Map(:legend = 'legend')
                img.absolute(class="loading" src="image/loading.gif" v-show="!loading")
                #sidebarToggle.absolute.bg-light-yellow.f3.br.bt.bb.br--right.br-100.b--dark-gray.bw1.mt3.magenta.pointer.grow.pa1.z-1(@click="sidebarOpen = !sidebarOpen")
                  span(v-if="!sidebarOpen")
                    .icono-caretRight.ml0
                  span(v-if="sidebarOpen") 
                    .icono-caretLeft.ml0
        #bottom.bt.b--light-gray.flex-none.lh-solid.ph2.pt3.pb1.bg-near-white.tc(v-show="sidebarOpen")
            p.ma0
                b 資料來源: 
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
