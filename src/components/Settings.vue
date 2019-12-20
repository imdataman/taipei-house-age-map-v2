<template lang="pug">
#Settings.pa2.mb3.bg-light-blue
    h4 Welcome to TinyMap. 
    p To create your own map, just choose these two parameters.
    .list.pl0.measure.center
        template(v-for="item in listItem")
            a.db.link.pv3.ba.br1.bg-white.mb1.tc.pointer.hover-orange(@click="choosed=item"
            :class="{ active: choosed==item }") {{ item }}
    
    //-
        label.b.f5.mb0 Layer
        p.dark-gray.f7.i.mv0 A unique string identifying your map.

        button.mv2.mr2.f6.link.dim.ph3.pv2.mb2.dib.white.bg-purple(@click="clickCreate") Create My Map
        template
            p.lh-copy.f7.dark-gray Download as 
                a.underline.link.dim.black(:href="geoJSONUrl") GeoJSON
                |  or 
                a.underline.link.dim.black(:href="csvUrl") CSV
                | .

            button.mt4.mb2.mr2.f6.link.dim.ph3.pv2.dib.white.bg-blue(@click="clickNew") Start over with new map


</template>

<script>
import URI from 'urijs';
import { getPointsGeoJSONUrl, getPointsCsvUrl } from './sharedMapApi';
export default {
    name: "Settings",
    data: () => ({
        listItem: ['1', '2', '3', '4'],
        choosed: "1",
    }),
    computed:{
        readOnlyUrl: () => new URI(window.location).removeQuery('secretkey').toString(),
        collaborationUrl: () => new URI(window.location).toString(),
        csvUrl: () => getPointsCsvUrl,
        geoJSONUrl: () => getPointsGeoJSONUrl,
    },
    methods: {
        chooseDataset(item) {
            return `Item ${item} clicked`;
        }
    }
}
</script>

<style scoped>
.active {
    border-width: 4px;
    color: #ff6300;
}

</style>