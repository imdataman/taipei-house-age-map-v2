<template lang="pug">
#map.absolute.absolute--fill
</template>

<script>
import mapboxgl from 'mapbox-gl';
import * as request from 'd3-fetch';
import * as topojson from "topojson-client";
import { EventBus } from './EventBus';
export default {
    data: () => ({
        selectedId: undefined,
        theme: "P_DEN",
        map: {},
    }),
    props: {
        selectedLegend: Object
    },
    async mounted() {
        const zoomThreshold = [9, 12];
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
        const map = new mapboxgl.Map({
            container: 'map',
            center: [120.973882, 23.57565],
            zoom: 6.5,
            style: blankStyle,
        });
        window.map = map;
        this.map = map;

        map.on("load", async () => {
            const county = await request.json('data/county.json');
            const town = await request.json('data/town.json');
            const village = await request.json('data/village.json');

            const countyBoundary = topojson.feature(county, county.objects.county);
            const townBoundary = topojson.feature(town, town.objects.town);
            const villageBoundary = topojson.feature(village, village.objects.village);

            map.addSource('county', {
                'type': 'geojson',
                'data': countyBoundary
            });

            map.addLayer({
                'id': 'countyPolygon',
                'source': 'county',
                'maxzoom': zoomThreshold[0],
                'type': 'fill',
                'paint': {
                    'fill-color': [
                        'step',
                        ['get', this.theme],
                        this.selectedLegend.palette[0], this.selectedLegend.breaks[1], this.selectedLegend.palette[1], this.selectedLegend.breaks[2], this.selectedLegend.palette[2], this.selectedLegend.breaks[3], this.selectedLegend.palette[3], this.selectedLegend.breaks[4], this.selectedLegend.palette[4], this.selectedLegend.breaks[5], this.selectedLegend.palette[5], this.selectedLegend.breaks[6], this.selectedLegend.palette[6], this.selectedLegend.breaks[7], this.selectedLegend.palette[7]
                    ],
                    'fill-opacity': 0.8,
                    'fill-outline-color': [
                        'case',
                        ['boolean',
                            ['feature-state', 'selected'],
                            false
                        ],
                        'rgba(0, 0, 0, 1)',
                        'rgba(0, 0, 0, 0)'
                    ],
                }
            });
            
            map.addSource('town', {
                'type': 'geojson',
                'data': townBoundary
            });

            map.addLayer({
                'id': 'townPolygon',
                'source': 'town',
                'minzoom': zoomThreshold[0],
                'maxzoom': zoomThreshold[1],
                'type': 'fill',
                'paint': {
                    'fill-color': [
                        'step',
                        ['get', 'P_DEN'],
                        "#bdbdbd", 1, "#f7fbff", 250, "#deebf7", 500, "#c6dbef", 1000, "#9ecae1", 2500, "#6baed6", 5000, "#4292c6", 10000, "#2171b5", 25000, "#084594"
                    ],
                    'fill-opacity': 0.8,
                    'fill-outline-color': [
                        'case',
                        ['boolean',
                            ['feature-state', 'selected'],
                            false
                        ],
                        'rgba(0, 0, 0, 1)',
                        'rgba(0, 0, 0, 0)'
                    ],
                }
            });

            map.addSource('village', {
                'type': 'geojson',
                'data': villageBoundary
            });

            map.addLayer({
                'id': 'villagePolygon',
                'source': 'village',
                'minzoom': zoomThreshold[1],
                'type': 'fill',
                'paint': {
                    'fill-color': [
                        'step',
                        ['get', 'P_DEN'],
                        "#bdbdbd", 1, "#f7fbff", 500, "#deebf7", 1000, "#c6dbef", 2500, "#9ecae1", 5000, "#6baed6", 10000, "#4292c6", 25000, "#2171b5", 50000, "#084594"
                    ],
                    'fill-opacity': 0.8,
                    'fill-outline-color': [
                        'case',
                        ['boolean',
                            ['feature-state', 'selected'],
                            false
                        ],
                        'rgba(0, 0, 0, 1)',
                        'rgba(0, 0, 0, 0)'
                    ],
                }
            });

            EventBus.$emit('loading-finished');

            map.on('click', 'countyPolygon', e => {
                EventBus.$emit('feature-clicked', e.features[0]);
            });

            map.on('click', 'townPolygon', e => {
                EventBus.$emit('feature-clicked', e.features[0]);
            });

            map.on('click', 'villagePolygon', e => {
                EventBus.$emit('feature-clicked', e.features[0]);
            });

            EventBus.$on('change-theme', theme => {
                this.theme = theme.type;
            });

            map.on('mousemove', "countyPolygon", () => map.getCanvas().style.cursor = 'pointer' );
            map.on('mousemove', "townPolygon", () => map.getCanvas().style.cursor = 'pointer' );
            map.on('mousemove', "villagePolygon", () => map.getCanvas().style.cursor = 'pointer' );
            map.on('mouseleave', "countyPolygon", () => map.getCanvas().style.cursor = '' );
            map.on('mouseleave', "townPolygon", () => map.getCanvas().style.cursor = '' );
            map.on('mouseleave', "villagePolygon", () => map.getCanvas().style.cursor = '' );
        });

    },
    watch: {
        selectedLegend() {
            this.map.setPaintProperty(
                'countyPolygon',
                'fill-color',
                ['step',['get', this.selectedLegend.type],
                this.selectedLegend.palette[0], this.selectedLegend.breaks[1], this.selectedLegend.palette[1], this.selectedLegend.breaks[2], this.selectedLegend.palette[2], this.selectedLegend.breaks[3], this.selectedLegend.palette[3], this.selectedLegend.breaks[4], this.selectedLegend.palette[4], this.selectedLegend.breaks[5], this.selectedLegend.palette[5], this.selectedLegend.breaks[6], this.selectedLegend.palette[6], this.selectedLegend.breaks[7], this.selectedLegend.palette[7]
                ]
            );
            this.map.setPaintProperty(
                'townPolygon',
                'fill-color',
                ['step',['get', this.selectedLegend.type],
                this.selectedLegend.palette[0], this.selectedLegend.breaks[1], this.selectedLegend.palette[1], this.selectedLegend.breaks[2], this.selectedLegend.palette[2], this.selectedLegend.breaks[3], this.selectedLegend.palette[3], this.selectedLegend.breaks[4], this.selectedLegend.palette[4], this.selectedLegend.breaks[5], this.selectedLegend.palette[5], this.selectedLegend.breaks[6], this.selectedLegend.palette[6], this.selectedLegend.breaks[7], this.selectedLegend.palette[7]
                ]
            );
            this.map.setPaintProperty(
                'villagePolygon',
                'fill-color',
                ['step',['get', this.selectedLegend.type],
                this.selectedLegend.palette[0], this.selectedLegend.breaks[1], this.selectedLegend.palette[1], this.selectedLegend.breaks[2], this.selectedLegend.palette[2], this.selectedLegend.breaks[3], this.selectedLegend.palette[3], this.selectedLegend.breaks[4], this.selectedLegend.palette[4], this.selectedLegend.breaks[5], this.selectedLegend.palette[5], this.selectedLegend.breaks[6], this.selectedLegend.palette[6], this.selectedLegend.breaks[7], this.selectedLegend.palette[7]
                ]
            );
        }
    }
}
import 'mapbox-gl/dist/mapbox-gl.css';

</script>

<style scoped>
</style>