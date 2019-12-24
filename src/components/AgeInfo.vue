<template lang="pug">
#Settings.pa2.mb3
    h2.tc.mb3.mt4.f2-l {{"平均屋齡：" + (mean || " - ") + "年" }}
</template>

<script>
import { EventBus } from './EventBus';

export default {
    name: "Settings",
    data: () => ({
        selectedData: []
    }),
    props: {
        legend: Object
    },
    computed: {
        mean() {
            const sum = this.selectedData.reduce((acc, obj) => { return acc + obj.properties.age; }, 0);
            const average = sum / this.selectedData.length;

            return Math.round(average);
        }
    },
    created() {
        EventBus.$on('select-feature', selectedData => {
            this.selectedData = selectedData;
        });
    }
}
</script>

<style scoped>
</style>