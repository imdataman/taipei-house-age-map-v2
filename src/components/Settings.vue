<template lang="pug">
#Settings.pa2.mb3.bg-light-blue
    h4 Welcome to TinyMap. 
    p To create your own map, just choose these two parameters.
    .list.pl0.measure.center
        template(v-for="item in listItem")
            a.db.link.pv3.ba.br1.bg-white.mb1.tc.pointer.hover-orange(@click="chooseDataset(item)"
            :class="{active: item==choosed}") {{ item }}
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
            if(item != this.choosed) {
                this.choosed = item;
                console.log(`Item ${item} clicked`);
            }
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