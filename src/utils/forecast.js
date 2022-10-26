const request = require('request');

const forecast = (latitude , longitude , callback) => {
    const url = "http://api.weatherstack.com/current?access_key=1a9ff14a442421c038e431fa29c64d09&query=" +latitude+","+longitude+  "&units=m";
    request({url:url,json:true}, (error , { body }) => {
        if(error){
            callback({error : "Unable to connect to the location" }, undefined);
        }else if(body.error){
            callback({error: "Can't find the coordinates"}, undefined);
        }else{
            
            callback(undefined,{
                weather : body.current.weather_descriptions[0],
                temperature : body.current.temperature,
                cloudy : body.current.cloudcover,   
                humidity : body.current.humidity,
                wind : body.current.wind_speed,
                rain : body.current.precip
            });
        }

    })
}

module.exports = forecast;