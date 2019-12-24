<template lang="pug">
#Legend.ph2.pt3.pb2.b--black.ba.pa2.bg-white.ma2
    template(v-for="(color, index) in legend.palette")
        div.flex.pl4-l
            div.ba.br1.mb2(:style="{ backgroundColor: color, width: '30px' , height: '30px'}")
            p.flex-auto.mv2.tl.ml3 {{legend.breaks[index].toString() + " - " + legend.breaks[index + 1].toString() + "年"}}
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
</style>