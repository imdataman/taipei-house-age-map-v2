<template lang="pug">
#map.absolute.absolute--fill
</template>

<script>
import mapboxgl from 'mapbox-gl';
import * as request from 'd3-fetch';
import { EventBus } from './EventBus';
import circle from '@turf/circle';
import bbox from '@turf/bbox';
import distance from '@turf/distance';
export default {
    data: () => ({
    }),
    props: {
        legend: Object
    },
    mounted() {
        const blankStyle = {
            "version": 8,
            "name": "Blank",
            "center": [0, 0],
            "zoom": 0,
            "sources": {},
            "layers": [{
                "id": "background",
                "type": "background",
                "paint": {
                    "background-color": "white"
                }
            }],
            "id": "blank",
            "glyphs": "http://fonts.openmaptiles.org/{fontstack}/{range}.pbf"
        };
        const center = [121.5561, 25.07337];

        const radius = 0.5;
        const options = { steps: 36, units: 'kilometers' };

        const map = new mapboxgl.Map({
            container: 'map',
            style: blankStyle,
            center: center,
            zoom: 11.5,
            maxZoom: 15,
            minZoom: 11.5,
        });
        window.map = map;

        map.on("load", async () => {
            let points = {
                type: "FeatureCollection"
            };

            await request.csv("data/housing_age.csv").then(data => {
                points.features = data.map(d => {
                    return {
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [+d.long, +d.lat]
                        },
                        properties: {
                            age: +d.age
                        }
                    };
                })
            });

            map.addSource('road', {
                'type': 'geojson',
                'data': 'data/road.geojson'
            });

            map.addLayer({
                'id': 'roadLine',
                'source': 'road',
                'type': 'line',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#ccc',
                    'line-width': [
                        "case", 
                        ['==', ['get', "highway"], "primary"], 1, 
                        ['==', ['get', "highway"], "secondary"], 0.75,
                        0.5
                    ]
                }
            });

            map.addSource('circle', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: []
                }
            });

            map.addLayer({
                id: 'circlePolygon',
                'type': 'line',
                'source': 'circle',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': 'black',
                    'line-width': 2
                }
            });

            map.addSource('points', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: []
                },
                buffer: 0,
            });

            map.addLayer({
                id: 'allPoints',
                'type': 'circle',
                'source': 'points',
                'paint': {
                    'circle-radius': {
                        stops: [
                            [11.5, 0.5],
                            [15, 2]
                        ]
                    },
                    'circle-color': [
                        'step',
                        ['get', 'age'],
                        this.legend.palette[0], this.legend.breaks[1], this.legend.palette[1], this.legend.breaks[2], this.legend.palette[2], this.legend.breaks[3], this.legend.palette[3], this.legend.breaks[4], this.legend.palette[4], this.legend.breaks[5], this.legend.palette[5], this.legend.breaks[6], this.legend.palette[6], this.legend.breaks[7], this.legend.palette[7]
                    ],
                }
            });

            map.addSource('townLabel', {
                'type': 'geojson',
                'data': 'data/town-label.geojson'
            });

            map.addLayer({
                'id': 'townText',
                'source': 'townLabel',
                'type': 'symbol',
                "layout": {
                    "symbol-placement": "point",
                    "text-field": "{TOWNNAME}",
                    "text-size": {
                        stops: [
                            [11.5, 16],
                            [15, 48]
                        ]
                    },
                },
                "paint": {
                    "text-opacity": {
                        stops: [
                            [11.5, 0.8],
                            [15, 0]
                        ]
                    },
                }
            });

            map.getSource("points").setData(points);

            map.once('styledata', () => {
                EventBus.$emit('loading-finished');
            });

            const randomArray = Array.from({length: 10000}, () => Math.floor(Math.random() * points.features.length));

            const visibleFeatures = points.features.filter((f, i) => {
                return randomArray.includes(i);
            })

            let selectedFeatures = [];

            const pointsDistacne = (pointsArray, point) => pointsArray.filter((p) => distance(p, point, { units: 'kilometers' }) < radius);

            map.on('mousemove', e => {
                const center = [e.lngLat.lng, e.lngLat.lat]
                const circlePolygon = circle(center, radius, options);
                map.getSource("circle").setData(circlePolygon);

                const bboxPolygon = bbox(circlePolygon);

                selectedFeatures = visibleFeatures.filter(p => p.geometry.coordinates[0] > bboxPolygon[0] && p.geometry.coordinates[0] < bboxPolygon[2] && p.geometry.coordinates[1] > bboxPolygon[1] && p.geometry.coordinates[1] < bboxPolygon[3]);

                const ptsWithin = pointsDistacne(selectedFeatures, center);

                EventBus.$emit('select-feature', ptsWithin);
            });
        });

    }
}

import 'mapbox-gl/dist/mapbox-gl.css';

</script>

<style scoped>
</style>