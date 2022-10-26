const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { dirname } = require('path');
const geocode = require('../src/utils/geocode.js');
const forecast = require('../src/utils/forecast.js');
const app = express();

const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath  = path.join(__dirname,'../templates/partials');

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectoryPath));   // Tells the express server to look into the 'publicDirectoryPath' directory which is the public folder


app.get('',(req,res) => {
    res.render('index',{
        name: "by Sidharth"
    });
})



app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send("No location Provided");
    }else{
        geocode(req.query.address, (error , {lat,lon,location} ={} ) => {
            if(error){
                return res.send(error);
            }else{
                forecast(lat,lon, (error , response) => {
                    if(error){
                        return  res.send(error);
                    }else{
                        return res.send({
                            location : location,
                            response : response
                        });
                    }
                })
            }
        })
    }
});

app.get('*', (req,res) => {
    res.send("404 Error brother , Try the right url");
})

app.listen(3000, () => {
    console.log("Listenting at port 3000");
})