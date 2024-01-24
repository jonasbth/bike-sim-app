/* global L */

import "./leaflet.js";

//const baseURL = "http://server:1337/api/v1"; // If run via Docker compose
const baseURL = "http://localhost:1337/api/v1";

const map = L.map('map', {
    wheelDebounceTime: 100,
    wheelPxPerZoomLevel: 300
}).setView([56.193, 15.628], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 5,
    maxZoom: 17,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const bikeMarkers = [];
const bikeTracks = [];

async function updateBikes(cityId) {
    const response = await fetch(`${baseURL}/bikes/city/${cityId}`);
    const bikesData = await response.json();

    bikesData.forEach((bike) => {
        const popupContent = `
            Bike ${bike.id}<br>
            User ${bike.user_id}, Status ${bike.status_id}<br>
            Speed ${bike.speed} m/s, Battery ${bike.battery} %
        `;

        const bikePos = [bike.lat, bike.lon];
        let bikeClass;

        switch (bike.status_id) {
            case 0:
                bikeClass = "green-bike-icon";

                if (bike.battery < 15) {
                    bikeClass = "orange-bike-icon";
                }
                break;
            case 1:
                bikeClass = "blue-bike-icon";

                if (bike.battery < 15) {
                    bikeClass = "violet-bike-icon";
                }
                break;
        }

        if (bike.battery === 0) {
            bikeClass = "red-bike-icon";
        }

        if (bikeMarkers[bike.id]) {
            // Update marker
            const marker = bikeMarkers[bike.id];
            const track = bikeTracks[bike.id];

            marker.setLatLng(bikePos);
            marker.setTooltipContent(popupContent);
//            marker.setPopupContent(popupContent);

            if (marker.getIcon().className !== bikeClass) {
                const bikeIcon = L.divIcon({
                    className: bikeClass,
                    iconSize: [13, 13]
                });

                marker.setIcon(bikeIcon);
            }

            track.addLatLng(bikePos);
        } else {
            // Create a new marker and popup
            const bikeIcon = L.divIcon({
                className: bikeClass,
                iconSize: [13, 13]
            });

            const marker = L.marker(bikePos, {
                icon: bikeIcon
            }).bindTooltip(popupContent, {
                className: 'tooltip-text',
                opacity: 0.85
            }).addTo(map);
//            }).bindPopup(popupContent).addTo(map);

            const track = L.polyline([bikePos], {
                color: '#777',
                opacity: 0.5,
                dashArray: "5"
            }).addTo(map);

            bikeMarkers[bike.id] = marker;
            bikeTracks[bike.id] = track;
        }
    });
}

function startUpdateTimer(cityId) {
    setInterval(updateBikes, 2130, cityId);
    cityId++;

//    if (cityId <= cities.length) {
//        setTimeout(startUpdateTimer, 710, cityId);
//    }
}

startUpdateTimer(1);
//updateBikes(1);

