const request = require('request');

const geocode = (location , callback) => {
    const baseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(location)+".json?limit=1&access_token=pk.eyJ1Ijoic2lkMTcyMDAxIiwiYSI6ImNsNzNtMHptdDB0MXM0MHJ6bHE2d3IzM3IifQ.mZPszyb5_5q5vyC-dDO0gw"
    request({uri:baseUrl,json:true},(error,{body}) => {
        if(error){
            callback("Some error occured",undefined);
        }else{
            callback(undefined,{
                lat : body.features[0].center[1],
                lon : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;