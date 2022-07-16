"use static";
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Path for express configuration
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

//Setup handlebars engines and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Set static location for server
app.use(express.static(publicDirectoryPath));

//index
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    author: "Ayush Ranjan",
  });
});

//about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    author: "Ayush Ranjan",
  });
});

//help
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    discription: "How to use this app",
    author: "Ayush Ranjan",
  });
});

//Route to Weather page
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("Please pass the address");
  }
  geocode.geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send(error);
    } else {
      const thatData = data;
      forecast.forecast(data.latitude, data.longitude, (error, data) => {
        if (error) {
          return res.send(error);
        } else if (data.error) {
          res.send(data);
        } else {
          res.send({
            forecast: `${data.weatherDescription}. The temperature is ${data.temperature} degree but feels like ${data.feelslike} degree.`,
            location: thatData.location,
            address: req.query.address,
          });
        }
      });
    }
  });
});

//Help related page
app.get("/help/*", (req, res) => {
  res.render("help_no_article", {
    title: "No article found",
    author: "Ayush Ranjan",
  });
});

//404 page not found page
app.get("*", (req, res) => {
  res.render("404page", {
    title: "Page not found",
    author: "Ayush Ranjan",
  });
});

app.listen(3000, () => {
  console.log("Server is up on localhost port:3000");
});
