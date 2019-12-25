<template lang="pug">
#Legend.tc
    template(v-for="(color, index) in legend.palette")
        div.flex.pl5-l.pr3-l.pl3.center
            div.mb2(:style="{ backgroundColor: color}" class="legend")
            p.flex-auto.mv2.tl.ml3.f7 {{legend.breaks[index].toString() + " - " + legend.breaks[index + 1].toString() + "年"}}
</template>
<script>
export default {
    name: "Legend",
    data: () => ({
    }),
    props: {
        legend: Object
    },
}
</script>
<style scoped>
@media (min-width: 800px) {
    .legend {
        width: 30px;
        height: 30px;
    }
}
@media only screen and (max-width: 800px) {
    .legend {
        width: 20px;
        height: 20px;
    }
}
</style>