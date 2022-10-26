const weatherForm = document.querySelector('form');

const moreloc = document.querySelector('.morelocations');

moreloc.addEventListener('click',(e) => {
    e.preventDefault();
    document.querySelector('#location').value = moreloc.textContent;
    weatherForm.dispatchEvent(new Event('submit', { 'bubbles': true }));
})

const moreloc2 = document.querySelector('.morelocations2');

moreloc2.addEventListener('click',(e) => {
    e.preventDefault();
    document.querySelector('#location').value = moreloc2.textContent;
    weatherForm.dispatchEvent(new Event('submit', { 'bubbles': true }));
})

const moreloc3 = document.querySelector('.morelocations3');

moreloc3.addEventListener('click',(e) => {
    e.preventDefault();
    document.querySelector('#location').value = moreloc3.textContent;
    weatherForm.dispatchEvent(new Event('submit', { 'bubbles': true }));
})

const moreloc4 = document.querySelector('.morelocations4');

moreloc4.addEventListener('click',(e) => {
    e.preventDefault();
    document.querySelector('#location').value = moreloc4.textContent;
    weatherForm.dispatchEvent(new Event('submit', { 'bubbles': true }));
})

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const searchVal  = document.querySelector('#location').value;
    document.querySelector("#location").value = "Loading";
    fetch('/weather?address=' + searchVal).then((response) => {
        response.json().then((res) => {
            if(res.error){
                console.log("Soemthing went wrong");
            }else{

                const loc = document.querySelector("#loc");
                loc.textContent = searchVal;
                document.querySelector("#location").value = "";
                const overall = document.querySelector("#overall");
                overall.textContent = res.response.weather;
                const possiblities = ["rain", "sunny","mist","snow","clear","cloudy"];
                let str = res.response.weather;
                let tempStr = "";

                for(let i=0;i<str.length;i++){
                    if(str[i] === ' '){
                        if(possiblities.includes(tempStr.toLowerCase()) == true){
                            i = str.length+1;
                            break;
                        }else{
                            tempStr = "";
                        }
                    }else{
                        tempStr = tempStr + str[i];
                    }
                }
                const main = document.querySelector(".main");
                console.log(tempStr);
                main.style.backgroundImage = "url('../img/"+tempStr+".jpg')";
                const mainh = document.querySelector(".second .details");
                if(tempStr === "Overcast"){
                    mainh.setAttribute('style','color:white !important;');
                }else{
                    mainh.setAttribute('style','color:black !important;');
                }
                // chaning iamges for the small icon nearby the big temperature 
                const smallimg = document.querySelector("#icons");
                smallimg.src = "/img/000"+tempStr+".png";

                const temperature = document.querySelector("#temp span");
                temperature.textContent = res.response.temperature;
                const temperature2 = document.querySelector("#tempNumber span");
                temperature2.textContent = res.response.temperature;
                const cloudy = document.querySelector("#cloudy");
                cloudy.textContent = res.response.cloudy;
                const humidity = document.querySelector("#humidity")
                humidity.textContent = res.response.humidity + "%";
                const wind = document.querySelector("#wind");
                wind.textContent = res.response.wind+"%";
                const rain = document.querySelector("#rain");
                rain.textContent =  res.response.rain+"%";

                
            }
        })
    })
});