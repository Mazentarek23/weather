var arr=[]
var arr1=[]
var arr3=[]
var arr4=[]

var search =document.getElementById("search")

function k() {
    var g=search.value

    mazen(g)
}




function mazen(y) {
    var x= new XMLHttpRequest()
    x.open("get",`https://api.weatherapi.com/v1/forecast.json?key=fd6c3fced7db4675b74143900240301&q=${y}&aqi=yes&days=7`)
    x.send()
    x.addEventListener("readystatechange",function (){
        if (x.readyState==4&&x.status==200){
            arr=JSON.parse(x.response).forecast.forecastday
            arr1=JSON.parse(x.response).location
            arr3=JSON.parse(x.response).current
            arr4 =JSON.parse(x.response).forecast.forecastday[0].hour
             
            
            information()
           
        }
    })
     
}

  
function information() {
    document.getElementById("Humidity").innerHTML=`<span>${arr[0].day.avghumidity}%</span>`
    document.getElementById("chance_of_rain").innerHTML=`<span>${arr[0].day.daily_chance_of_rain}%</span>`
    document.getElementById("wind").innerHTML=`<span>${arr[0].day.avgvis_km}Km/h</span>`
    document.getElementById("UV_index").innerHTML=`<span>${arr[0].day.uv}%</span>`
    document.getElementById("temp").innerHTML=`${Math.floor(arr3.temp_c)}°`
    document.getElementById("icon").innerHTML=` <img src="http:${arr3.condition.icon}" class="w-100" >`
    document.getElementById("city").innerHTML=` ${arr1.name} `
    document.getElementById("country").innerHTML=` ${arr1.country} `



     let temp =``
     var days =["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
     var hour =["12:00 am","1:00 am","2:00 am","3:00 am","4:00 am","5:00 am","6:00 am","7:00 am","8:00 am","9:00 am","10:00 am","11:00 am","12:00 pm","1:00 pm","2:00 pm","3:00 pm","4:00 pm","5:00 am","6:00 pm","7:00 pm","8:00 pm","9:00 pm","10:00 pm","11:00 pm"]
     for(let i=0;i<arr.length;i++){
        temp += ` 
        <div class="ps-2 pe-2 pt-2 d-flex justify-content-between align-items-center y position-relative" >
        <span>${days[new Date(arr[i].date).getDay()]}</span>
        <div>
            <img src="http:${arr[i].day.condition.icon}" >
            <span>sunny</span>
        </div>
        <span>${Math.floor(arr[i].day.maxtemp_c)}/${Math.floor(arr[i].day.mintemp_c)}</span>
        </div>
        `
     }
    document.getElementById("forecast").innerHTML=temp
      

    
    
    var today = new Date();
    var time = today.getHours() 
    let demo=``
    for(let j=time;j<arr4.length;j++){
     demo +=` 
     <div class="x col-2 mt-3 d-flex  align-items-center  mb-3 position-relative  ">
     <div class="  d-flex  align-items-center justify-content-center flex-column w-100 ">
         <span>${hour[new Date(arr4[j].time).getHours()]}</span>
     <img src="http:${arr4[j].condition.icon}" class="w-50">
     <span>${Math.floor(arr4[j].temp_c)}° </span>
     </div>
  </div>
     `
    }
    document.getElementById("forecast_hour").innerHTML=demo
 
   
    

  
}



