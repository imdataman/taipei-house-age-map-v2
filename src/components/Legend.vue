<template lang="pug">
#Legend.ph2.pt3.pb2.b--black.ba.pa2.bg-white.ma2(v-show="feature")
    template(v-for="(color, index) in selectedLegend.palette")
        div.flex.pl4-l
            div.ba.br1.mb2(:style="{ backgroundColor: color, width: '30px' , height: '30px'}")
            p.flex-auto.mv2.tl.ml3 {{selectedLegend.breaks[index].toString() + " - " + selectedLegend.breaks[index + 1].toString()}}
</template>

<script>
import { EventBus } from './EventBus';
export default {
    name: "Legend",
    data: () => ({
        feature: undefined,
        theme: "P_DEN"
    }),
    props: {
        selectedLegend: Object
    },
    computed: {
        p() {
            return this.feature && this.feature.properties || {};
        },

    },
    created() {
        EventBus.$on('feature-clicked', feature => {
            EventBus.$emit('select-feature', feature);
            this.feature = feature;
        });

        EventBus.$on('change-theme', theme => {
                this.theme = theme.type;
        });
    }
}
</script>

<style scoped>
#FeatureInfo th {
    text-align:  right;
}
</style>