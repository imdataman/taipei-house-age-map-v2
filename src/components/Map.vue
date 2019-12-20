<template lang="pug">
#map.absolute.absolute--fill
</template>

<script>
import mapboxgl from 'mapbox-gl';

import { EventBus } from './EventBus';
import { getFeatures, layer } from './sharedMapApi';
import boundingBox from 'geojson-bounding-box';
export default {
    data: () => ({
        points: undefined,
        selectedId: undefined,
        mode: "",
    }),
    mounted() {
        // replace this Mapbox access token with your own
        mapboxgl.accessToken = 'pk.eyJ1IjoiaW1hbmR5bGluMiIsImEiOiJhYzg1YzcyNDNiYWE3MTFiY2QxN2JmNTg1ODQzOTIyZCJ9.5ZxE4iFh-Myp-eKwHk0qwg';
        const map = new mapboxgl.Map({
            container: 'map',
            center: [144.96, -37.81],
            zoom: 14,
            style: 'mapbox://styles/mapbox/light-v9',
        });
        window.map = map;

        map.on("load", async () => {
            map.addSource('points', {
                type: 'geojson',
                data: { type: 'FeatureCollection', features: [] }
            });
            map.addLayer({
                'id': 'points-circles',
                'type': 'circle',
                'source': 'points',
                'paint': {
                    'circle-stroke-color': 'hsl(330,100%,40%)',
                    'circle-stroke-width': ['case',
                        ['to-boolean', ["feature-state", "selected"]], 8, 3],

                    'circle-radius': { 'stops': [[10,3], [12, 10]] },
                    'circle-color': 'hsl(330,100%,70%)'
                }
            });
            map.addLayer({
                'id': 'points-labels',
                'type': 'symbol',
                'source': 'points',
                'layout': {
                    'text-field': ['get', 'name'],
                    'text-anchor': 'left',
                    'text-offset': [1,0]
                },
                'paint': {
                    'text-color': 'hsl(330,100%,30%)',
                }
            });
            map.addSource('new-point', {
                type: 'geojson',
                data: { type: 'FeatureCollection', features: [] }
            });
            map.addLayer({
                'id': 'new-point-circle',
                'type': 'circle',
                'source': 'new-point',
                'paint': {
                    'circle-stroke-color': 'hsl(120,80%,30%)',
                    'circle-stroke-width': 5,
                    'circle-radius': { 'stops': [[10,3], [12, 10]] },
                    'circle-color': 'transparent'
                }
            });
            
            map.on('mouseenter', 'points-circles', () => map.getCanvas().style.cursor = 'pointer' ); 
            map.on('mouseleave', 'points-circles', () => map.getCanvas().style.cursor = '' ); 
            map.on('click', 'points-circles', e => {
                if (this.mode === '') {
                    EventBus.$emit('circle-clicked', e.features[0]);
                }
            });
            map.on('click', e => {
                if (this.mode === 'locating') {
                    EventBus.$emit('Map-clickLocate', e.lngLat);
                    map.getSource('new-point').setData({
                        type: 'Point',
                        coordinates: [e.lngLat.lng, e.lngLat.lat]
                    });
                }
            });

            EventBus.$on('NewFeature-mode', mode => {
                this.mode = mode;
                if (mode === 'locating') {
                    map.getCanvas().style.cursor = 'crosshair'

                } else if (mode === '') {
                    map.getCanvas().style.cursor = ''

                    map.getSource('new-point').setData({ type: 'FeatureCollection', features: []});
                } else {
                    map.getCanvas().style.cursor = ''
                }
            });
            EventBus.$on('NewFeature-saved', newFeature => {
                this.points.features.push(newFeature);
                map.getSource('points').setData(this.points);
            });
            EventBus.$on('delete-feature', id => {
                this.points.features = this.points.features.filter(f => f.id !== id);
                map.getSource('points').setData(this.points);
            });        
            EventBus.$on('update-feature', feature => {
                Object.assign(this.points.features.find(f => f.id === feature._id), feature);
                map.getSource('points').setData(this.points);
            });        
            EventBus.$on('select-feature', feature => {
                if (this.selectedId) {
                    map.setFeatureState({ source: 'points', id: this.selectedId }, { selected: false });
                }
                this.selectedId = feature.id;

                map.setFeatureState({ source: 'points', id: feature.id }, { selected: true });
            });        

            if (layer) {
                this.points = await getFeatures();

                if (this.points) {
                    map.fitBounds(boundingBox(this.points), { padding: 60 });
                }
                map.getSource('points').setData(this.points);
            }
        });

    },
}
import 'mapbox-gl/dist/mapbox-gl.css';

</script>

<style scoped>
</style>