"use strict";
const request = require("request");

const geocode = (address, callback) => {
  const url =
    "http://api.positionstack.com/v1/forward?access_key=7338c4862d25ae78543bd47103e88f0c&query=" +
    encodeURIComponent(address);

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location service", undefined);
    } else if (response.body.error || response.body.data.length === 0) {
      callback(undefined, { error: ["No such location present"] });
    } else {
      callback(undefined, {
        latitude: response.body.data[0].latitude,
        longitude: response.body.data[0].longitude,
        location: response.body.data[0].label,
      });
    }
  });
};

// geocode("New York", (error, data) => {
//   console.log(error);
//   console.log(data);
// });

module.exports = {
  geocode: geocode,
};
