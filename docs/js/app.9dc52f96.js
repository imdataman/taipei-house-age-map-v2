(function(e){function t(t){for(var a,i,l=t[0],s=t[1],c=t[2],u=0,p=[];u<l.length;u++)i=l[u],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&p.push(r[i][0]),r[i]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a]);d&&d(t);while(p.length)p.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,l=1;l<n.length;l++){var s=n[l];0!==r[s]&&(a=!1)}a&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var a={},r={app:0},o=[];function i(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var d=s;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var a=n("64a9"),r=n.n(a);r.a},"32a4":function(e,t,n){"use strict";var a=n("3677"),r=n.n(a);r.a},3677:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"flex flex-column vh-100",attrs:{id:"app"}},[n("div",{staticClass:"flex flex-auto",attrs:{id:"middle"}},[n("div",{staticClass:"overflow-auto bg-dark-blue tc",class:{collapsed:!e.sidebarOpen},attrs:{id:"sidebar"}},[e._m(0),n("AgeInfo",{staticClass:"pb2 pt1 pb5-l pt3-l",attrs:{legend:e.legend}}),n("Legend",{staticClass:"pa2",attrs:{legend:e.legend}})],1),n("div",{staticClass:"relative flex-auto",attrs:{id:"map-container"}},[n("Map",{attrs:{legend:e.legend}}),n("img",{directives:[{name:"show",rawName:"v-show",value:!e.loading,expression:"!loading"}],staticClass:"absolute loading",attrs:{src:"image/loading.gif"}}),n("div",{staticClass:"absolute bg-black f5 br bt bb br--right br-100 b--black bw1 mt2 magenta pointer grow pa1-l pl1",attrs:{id:"sidebarToggle"},on:{click:function(t){e.sidebarOpen=!e.sidebarOpen}}},[e.sidebarOpen?e._e():n("span",[n("div",{staticClass:"icono-caretRight ml0"})]),e.sidebarOpen?n("span",[n("div",{staticClass:"icono-caretLeft ml0"})]):e._e()])],1)]),n("div",{directives:[{name:"show",rawName:"v-show",value:e.sidebarOpen,expression:"sidebarOpen"}],staticClass:"flex-none lh-solid ph2 pt3 pb1 bg-near-white tc black",attrs:{id:"bottom"}},[n("p",{staticClass:"ma0"},[e._v("資料來源: 台北市開放資料網站，2017年1月")]),e._m(1)])])},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"pt4 pb3-l pt5-l",attrs:{id:"mobile-header"}},[n("p",{staticClass:"f2-l f3"},[e._v("台北屋齡地圖")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("製作 "),n("a",{attrs:{href:"https://twitter.com/imandylin2"}},[e._v("林佳賢")]),e._v(".  "),n("a",{attrs:{href:"https://github.com/imdataman/taipei-house-age-map-v2"}},[e._v("Github.")])])}],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"absolute absolute--fill",attrs:{id:"map"}})},l=[],s=(n("6762"),n("2fdb"),n("5df3"),n("1c4c"),n("96cf"),n("3b8d")),c=n("e192"),d=n.n(c),u=n("b2e9"),p=new a["a"],f=n("32ef"),g=n.n(f),b=n("409f"),m=n.n(b),v=n("8f76"),h=n.n(v),y=(n("ac6d"),{data:function(){return{}},props:{legend:Object},mounted:function(){var e=this,t={version:8,name:"Blank",center:[0,0],zoom:0,sources:{},layers:[{id:"background",type:"background",paint:{"background-color":"white"}}],id:"blank",glyphs:"http://fonts.openmaptiles.org/{fontstack}/{range}.pbf"},n=[121.5561,25.07337],a=.5,r={steps:36,units:"kilometers"},o=new d.a.Map({container:"map",style:t,center:n,zoom:11.5,maxZoom:15,minZoom:11.5});window.map=o,o.on("load",Object(s["a"])(regeneratorRuntime.mark((function t(){var n,i,l,s,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n={type:"FeatureCollection"},t.next=3,u["a"]("data/housing_age.csv").then((function(e){n.features=e.map((function(e){return{type:"Feature",geometry:{type:"Point",coordinates:[+e.long,+e.lat]},properties:{age:+e.age}}}))}));case 3:o.addSource("road",{type:"geojson",data:"data/road.geojson"}),o.addLayer({id:"roadLine",source:"road",type:"line",layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"#ccc","line-width":["case",["==",["get","highway"],"primary"],2,["==",["get","highway"],"secondary"],1,.5]}}),o.addSource("circle",{type:"geojson",data:{type:"FeatureCollection",features:[]}}),o.addLayer({id:"circlePolygon",type:"line",source:"circle",layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"black","line-width":2}}),o.addSource("points",{type:"geojson",data:{type:"FeatureCollection",features:[]},buffer:0}),o.addLayer({id:"allPoints",type:"circle",source:"points",paint:{"circle-radius":{stops:[[11.5,.8],[15,2.5]]},"circle-color":["step",["get","age"],e.legend.palette[0],e.legend.breaks[1],e.legend.palette[1],e.legend.breaks[2],e.legend.palette[2],e.legend.breaks[3],e.legend.palette[3],e.legend.breaks[4],e.legend.palette[4],e.legend.breaks[5],e.legend.palette[5],e.legend.breaks[6],e.legend.palette[6],e.legend.breaks[7],e.legend.palette[7]]}}),o.addSource("townLabel",{type:"geojson",data:"data/town-label.geojson"}),o.addLayer({id:"townText",source:"townLabel",type:"symbol",layout:{"symbol-placement":"point","text-field":"{TOWNNAME}","text-size":{stops:[[11.5,16],[15,48]]}},paint:{"text-opacity":{stops:[[11.5,.8],[15,0]]}}}),o.getSource("points").setData(n),o.once("styledata",(function(){p.$emit("loading-finished")})),i=Array.from({length:1e4},(function(){return Math.floor(Math.random()*n.features.length)})),l=n.features.filter((function(e,t){return i.includes(t)})),s=[],c=function(e,t){return e.filter((function(e){return h()(e,t,{units:"kilometers"})<a}))},o.on("mousemove",(function(e){var t=[e.lngLat.lng,e.lngLat.lat],n=g()(t,a,r);o.getSource("circle").setData(n);var i=m()(n);s=l.filter((function(e){return e.geometry.coordinates[0]>i[0]&&e.geometry.coordinates[0]<i[2]&&e.geometry.coordinates[1]>i[1]&&e.geometry.coordinates[1]<i[3]}));var d=c(s,t);p.$emit("select-feature",d)}));case 18:case"end":return t.stop()}}),t)}))))}}),w=y,_=n("2877"),k=Object(_["a"])(w,i,l,!1,null,"efe592e8",null),x=k.exports,O=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"Settings"}},[n("p",{staticClass:"tc f3-l f5 pt2"},[e._v(e._s("平均屋齡："+(e.mean||" - ")+" 年"))])])},j=[],C={name:"Settings",data:function(){return{selectedData:[]}},props:{legend:Object},computed:{mean:function(){var e=this.selectedData.reduce((function(e,t){return e+t.properties.age}),0),t=e/this.selectedData.length;return Math.round(t)}},created:function(){var e=this;p.$on("select-feature",(function(t){e.selectedData=t}))}},S=C,L=Object(_["a"])(S,O,j,!1,null,"5199ae38",null),$=L.exports,M=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"Legend"}},[e._l(e.legend.palette,(function(t,a){return[n("div",{staticClass:"flex pl4 legendWrapper"},[n("div",{staticClass:"mv2 legend",style:{backgroundColor:t}}),n("p",{staticClass:"flex-auto tl f7 f5-l ml2 ml3-l legendText"},[e._v(e._s(e.legend.breaks[a].toString()+" - "+e.legend.breaks[a+1].toString()+"年"))])])]}))],2)},D=[],E={name:"Legend",data:function(){return{}},props:{legend:Object}},P=E,A=(n("32a4"),Object(_["a"])(P,M,D,!1,null,"57662c16",null)),F=A.exports,T={name:"app",components:{Map:x,AgeInfo:$,Legend:F},data:function(){return{sidebarOpen:!0,loading:!1,legend:{breaks:[0,10,20,25,30,35,40,50,""],palette:["#440154","#46337E","#365C8D","#277F8E","#1FA187","#4AC16D","#9FDA3A","#FDE725"]}}},watch:{sidebarOpen:function(){this.$nextTick((function(){return window.map.resize()}))}},created:function(){var e=this;p.$on("loading-finished",(function(){return e.loading=!0}))}};n("948e");var z=T,N=(n("034f"),Object(_["a"])(z,r,o,!1,null,null,null)),R=N.exports;a["a"].config.productionTip=!1,new a["a"]({render:function(e){return e(R)}}).$mount("#app")},"64a9":function(e,t,n){}});
//# sourceMappingURL=app.9dc52f96.js.map