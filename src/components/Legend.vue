<template lang="pug">
#Legend
    template(v-for="(color, index) in legend.palette")
        div.flex.pl4(class='legendWrapper')
            div.mv2(:style="{ backgroundColor: color}" class="legend")
            p.flex-auto.tl.f7.f5-l.ml2.ml3-l(class='legendText') {{legend.breaks[index].toString() + " - " + legend.breaks[index + 1].toString() + "年"}}
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
        width: 2em;
        height: 2em;
    }
    .legendText {
        margin-top: 1em;
        margin-bottom: 1em;
    }
    .legendWrapper {
        padding-left: 5.7rem;
    }
}
@media only screen and (max-width: 800px) {
    .legend {
        width: 1.25em;
        height: 1.25em;
    }
}
</style>