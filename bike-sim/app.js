/**
 * Bike rental system simulation.
 * © Jonas B., Vteam 2023 Group 8.
 */
"use strict";

const numUsers = require("./config.js").numUsers;
const numBikesCity = require("./config.js").numBikesCity;
const setupAll = require("./src/setup.js").all;
const rides = require("./src/rides.js");
const cities = require('./src/db_data.js').cities;

setupAll(numUsers, numBikesCity);

function startUpdateTimer(cityId) {
    setInterval(rides.updateCity, 2100, cityId);
    cityId++;

    if (cityId <= cities.length) {
        setTimeout(startUpdateTimer, 700, cityId);
    }
}

startUpdateTimer(1);

