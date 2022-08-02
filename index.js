const http=require('http')
const fs=require('fs')
const requests=require('requests')
const home=fs.readFileSync('home.html',"utf-8")

const replaceval=(tempval,orgval)=>{
    let temperature=tempval.replace("{%tempval%}",orgval.main.temp)
    temperature=temperature.replace("{%tempmin%}",orgval.main.temp_min)
    temperature=temperature.replace("{%tempmax%}",orgval.main.temp_max)
    temperature=temperature.replace("{%location%}",orgval.name)
    temperature=temperature.replace("{%country%}",orgval.sys.country)
    temperature=temperature.replace("{%tempstatus%}",orgval.weather[0].main)
    
    return temperature
}
const server=http.createServer((req,res)=>{
    if(req.url=='/')
    {
        requests("https://api.openweathermap.org/data/2.5/weather?q=bangalore&appid=e9c8e3c85e1875faea4df9cb5f3bb1dd")
.on('data', function (chunk) {
    const objdata=JSON.parse(chunk)
    const arrdata=[objdata]
  //console.log(arrdata[0].main.temp-273.15)
  const realTimedata=arrdata.map((val)=>replaceval(home,val)).join("")
//    console.log(realTimedata)
  res.write(realTimedata)

})
.on('end', function (err) {
  if (err) return console.log('connection closed due to errors', err);
 
  res.end();
});
    }
})
server.listen(4000,'127.0.0.1')
