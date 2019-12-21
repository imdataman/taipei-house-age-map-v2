<template lang="pug">
#Settings.pa2.mb3
    h4.tc.mv3.f3-l 請選擇資料
    .list.pl0.measure.center
        template(v-for="item in listItem")
            a.db.link.pv3.ba.br1.bg-white.mb1.tc.pointer.hover-orange.f3-l(@click="chooseTheme(item)"
            :class="{active: item.name==choosed.name}") {{ item.name }}
</template>

<script>
import { EventBus } from './EventBus';

export default {
    name: "Settings",
    data: () => ({
        listItem: [{
                name: '人口密度',
                type: 'P_DEN'
            },
            {
                name: '性別比例',
                type: 'M_F_RAT'
            },
            {
                name: '家戶平均人口',
                type: 'P_H_CNT'
            },
            {
                name: '老化指數',
                type: 'FLD4'
            }
        ],
        choosed: {
            name: '人口密度',
            type: 'P_DEN'
        },
    }),
    methods: {
        chooseTheme(item) {
            if(item.type != this.choosed.type) {
                this.choosed = item;
                EventBus.$emit('change-theme', item);
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