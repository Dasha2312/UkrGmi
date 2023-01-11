<template lang="">
    <div>
        <h2 class="title">Map</h2>
        <div id="mapContainer"></div>
    </div>
</template>
<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  name: "vMap",
  data() {
    return {
      map: null,
      markers: [],
      popup:  null,
    };
  },
    mounted() {
        this.mapActions();
        this.getMarkers();
    },
    beforeDestroy() {
        if (this.map) {
            this.map.remove();
        }
    },
    methods: {
        mapActions() {
            this.map = L.map("mapContainer").setView([48, 31], 6);
            L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);
            // this.map.addLayer(layer).
            this.map.on('click', this.onMapClick);
            window.addEventListener("click", (event) => {
                if(event.target.id === 'save-marker') {
                    let marker = {
                        title: document.getElementById('marker-name').value,
                        lat: document.getElementById('lat').value,
                        lng: document.getElementById('lng').value
                    }

                    this.popup.close(); 

                    if(marker != null) {
                        this.addMarker(marker);
                    }
                }
            })
        },
        onMapClick(e) {
            this.popup = L.popup();
            let coords = e.latlng;
            let setLat = coords.lat.toString();
            let setLng = coords.lng.toString();
            this.popup.setLatLng(coords);
            this.popup.setContent(`
            <div><input type="text" placeholder="Name marker" id="marker-name"></div>
            <div>Lat: <input type="text" value="${setLat}" id="lat"></div>
            <div>Lng: <input type="text" value="${setLng}" id="lng"></div>
            <button type="button" id="save-marker">Save</button>`);

            // this.popup.openOn(this.map); 
            this.map.openPopup(this.popup)
        },
        addMarker(marker) {
            this.markers.push(marker);
            console.log(this.markers)
            localStorage.setItem('items', JSON.stringify(this.markers));
            this.addMarkerToMap(marker);  
        },
        addMarkerToMap(marker) {
            var layerGroup = L.layerGroup().addTo(this.map);
            let marker_map = L.marker([marker.lat, marker.lng], {
                title: marker.title,
                riseOnHover: true
            });
            layerGroup.addLayer(marker_map);
        },
        getMarkers() {
            this.markers = JSON.parse(localStorage.getItem('items'));

            if(this.markers !== null) {
                for(let i = 0; i < this.markers.length; i++) {
                    this.addMarkerToMap(this.markers[i]);
                }
            } else {
                this.markers = [];
            }
        },        
    },
    
};
    
</script>
<style lang="scss" scoped>
    #mapContainer {
        width: 100%;
        height: 800px;
    }
</style>