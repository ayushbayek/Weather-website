"use strict";
const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=97d3ffdf334dd8bddf05f9083e2ac0fe&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude);
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (response.body.error) {
      callback(undefined, { error: "No such location available" });
    } else {
      callback(undefined, {
        temperature: response.body.current.temperature,
        feelslike: response.body.current.feelslike,
        weatherDescription: response.body.current.weather_descriptions[0],
      });
    }
  });
};

module.exports = { forecast: forecast };
