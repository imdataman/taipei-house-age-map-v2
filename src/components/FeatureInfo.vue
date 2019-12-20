<template lang="pug">
#FeatureInfo.ph2.pb3.b--black.ba.pa2.bg-white.ma2(v-show="feature")
    h3.f4 {{ p.name || '(Unnamed item)' }}
    p {{ p.description || '(No description)'}}
    button.tr.mv2.mr2.f7.link.dim.ph3.pv2.mb2.white.bg-purple.ml-auto(@click="clickEdit" v-show="canEdit()") Edit
    button.tr.mv2.mr2.f7.link.dim.ph3.pv2.mb2.white.bg-blue.ml-auto(@click="clickDelete" v-show="canEdit()") Delete
    
</template>

<script>
import { EventBus } from './EventBus';
import { deleteFeature } from './sharedMapApi';
import { canEdit } from './sharedMapApi';
export default {
    name: "FeatureInfo",
    data: () => ({
        feature: undefined,
    }),
    computed: {
        p() {
            return this.feature && this.feature.properties || {};
        },
    },
    created() {
        EventBus.$on('NewFeature-mode', () => {
            this.feature = undefined
        });
        EventBus.$on('circle-clicked', (feature) => {
            EventBus.$emit('select-feature', feature);
            this.feature = feature;
        });
    },
    methods: {
        canEdit,
        async clickEdit() {
            EventBus.$emit('edit-feature', this.feature);
        },
        async clickDelete() {
            await deleteFeature(this.feature);
            EventBus.$emit('delete-feature', this.feature.id);
            this.feature = undefined;
        }
    }
}
</script>

<style scoped>
#FeatureInfo th {
    text-align:  right;
}

.image {
    width: 100%;
}

</style>