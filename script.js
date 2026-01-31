function opanFeature(){
    var allElem = document.querySelectorAll(".elem");
var fullelem = document.querySelectorAll(".fullelem");
var backs = document.querySelectorAll(".back"); 

allElem.forEach((elem) => {
    elem.addEventListener("click", () => {
        fullelem[elem.id].style.display = "block";
        document.body.style.overflow = "hidden";
    });
});

backs.forEach((btn) => {
    btn.addEventListener("click", () => {
        fullelem[btn.id].style.display = "none";
        location.reload();
        
    });
});

}
opanFeature();

function TodoList(){
    let todoBtn = document.querySelector(".addtask form");
let taskInput  = document.querySelector('.addtask input');
let taskDetails = document.querySelector('.addtask textarea');
let imp = document.querySelector('.todo-con .addtask form input[type="checkbox"]')
var CurrentTask = []

if(localStorage.getItem('CurrentTask')){
   CurrentTask = JSON.parse(localStorage.getItem('CurrentTask'))

    
}
else{
    
    console.log('empty');
    
}
todoBtn.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    CurrentTask.push({
        task:taskInput.value,
        details:taskDetails.value,
        imp:imp.checked
    })
    
    
    renderTask()
    taskInput.value = ''
    taskDetails.value = ''
    imp.checked = false
    
})

function renderTask(){
    
    let allTask = document.querySelector('.alltask')
let sum = '';
CurrentTask.forEach(function(elem , idx){
    
    sum += `
<div class="task">
    <h5>
        ${elem.task}
        ${elem.imp ? `<span class="imp">imp</span>` : ``}
    </h5>
    <button id = ${idx}>Mark as completed</button>
</div>
`
localStorage.setItem('CurrentTask' ,    JSON.stringify(CurrentTask))
    
})
allTask.innerHTML = sum;


}
renderTask();


document.querySelector('.alltask').addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const id = e.target.id;
        CurrentTask.splice(id, 1);
        localStorage.setItem('CurrentTask', JSON.stringify(CurrentTask));
        renderTask();
    }
});

renderTask();

    
}
TodoList();
function DailyPlanner(){
    
var hours = Array.from({length: 18},function(itrm , idx){
    return `${6+idx}:00 - ${7+idx}:00`
})
var WholeSum = ''
var DataObject = JSON.parse(localStorage.getItem('DataObject'))||{}
hours.forEach((item , idx)=>{
    WholeSum = WholeSum + `<div id="${idx}" class="Day-planner-time">
                    <p>${item}</p>
                    <input type="text"placeholder="..." value="${DataObject[idx]||''}">
                </div>`
})

var DayPlanner = document.querySelector('.daily-fullPage .Day-planner')
DayPlanner.innerHTML = WholeSum

var dayPlannerInput = document.querySelectorAll('.daily-fullPage .Day-planner input')
dayPlannerInput.forEach((item , idx)=>{
    item.addEventListener('input',function(){
        
        DataObject[idx] = item.value
        localStorage.setItem('DataObject' , JSON.stringify(DataObject))
        console.log(DataObject);
        
        
    })
    
})

}
DailyPlanner();

function quateMotivation(){
    let quot = document.querySelector('.Motivation-fullPage .mot-con .mot .motwrap .mot2 h4')
let auther = document.querySelector('.Motivation-fullPage .mot-con .mot .motwrap .mot3 h4')
async function loadMotivation(){
    let motivation = await fetch('https://api.quotable.io/random').then((res)=>res.json())
    quot.innerText = motivation.content
    auther.innerText = motivation.author
}
loadMotivation()
}
quateMotivation();

function pomodoroTimer(){
    let totalSeconds = 25 * 60
let timer = document.querySelector('.Pomodoro-fullPage .pomo-timer h2')
let start = document.querySelector('.Pomodoro-fullPage .pomo-timer  .start')
let pause = document.querySelector('.Pomodoro-fullPage .pomo-timer  .stop')
let reset = document.querySelector('.Pomodoro-fullPage .pomo-timer  .reset')
let TimerInterval = null;
let workSession = true;
let Session  = document.querySelector('.Pomodoro-fullPage h4')
function Timer(){
    let min = Math.floor(totalSeconds  / 60);
    let sec = totalSeconds % 60;
    timer.innerText = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
}
start.addEventListener('click', ()=>{
    clearInterval(TimerInterval)
    if(workSession){
       

         TimerInterval = setInterval(()=>{
    if(totalSeconds > 0){
        totalSeconds--

    }
    else{
        clearInterval(TimerInterval)    
        workSession = false;
        totalSeconds = 5 * 60
         Session.innerText = 'Break Time!';
        Session.style.backgroundColor = 'var(--blue)';

    }
    Timer()
},1000)
    }
    else{
       

         TimerInterval = setInterval(()=>{
    if(totalSeconds > 0){ 
        totalSeconds--
        
    }
    else{
        
        clearInterval(TimerInterval)    
        workSession = true;
         totalSeconds = 25 * 60
         Session.innerText = 'Work Time!';
         Session.style.backgroundColor = 'var(--green)'
    }
    Timer()
},1000)
    }
   
})
pause.addEventListener('click', ()=>{
    clearInterval(TimerInterval)
})
reset.addEventListener('click', ()=>{
    clearInterval(TimerInterval)
    totalSeconds = 25 * 60
    Timer()
})
}
pomodoroTimer();
function dailygoals(){
    
let goal = document.querySelector('.dailyGoals-fullPage .daily .input form')
let goalInput = document.querySelector('.dailyGoals-fullPage .daily .input input')
let goalList = document.querySelector('.dailyGoals-fullPage .daily .list')
let goalsArray = JSON.parse(localStorage.getItem('goalsArray')) || []
let show = document.querySelector('.dailyGoals-fullPage .daily .show .goals-list .inc')
let percent = 0
let count = 0
let text = document.querySelector('.dailyGoals-fullPage .daily .show .goals-list h4')
goal.addEventListener('submit', (e)=>{
    e.preventDefault()
    console.log('hellow');
    goalsArray.push(goalInput.value)
    localStorage.setItem('goalsArray' , JSON.stringify(goalsArray))
    goalInput.value = ''
    renderGoals()

    
})
function renderGoals(){
    let sum = ''
    goalsArray.forEach((item , idx)=>{
        sum += `
        <div class="goal">
            <h5>${item}</h5>
            <button id = ${idx}>Done</button>
        </div>
        `
        localStorage.setItem('goalsArray' , JSON.stringify(goalsArray))
    })
    goalList.innerHTML = sum
}
renderGoals()



goalList.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;

    const total = count + goalsArray.length; // capture total first

    count++; // increment first

    const percent = (count / total) * 100;
    show.style.width = percent + '%';
    text.innerText = `${Math.round(percent)}%`;

    const id = Number(e.target.id); // important
    goalsArray.splice(id, 1);
    if(goalsArray.length === 0){
        setTimeout(()=>{
            count = 0;
        show.style.width = '0%';
        text.innerText = `0%`;
        } , 2000)
    }
    localStorage.setItem('goalsArray', JSON.stringify(goalsArray));
    renderGoals();
});

renderGoals();
}
dailygoals();
function WeatherData(){
   
const api = '7454e633eb5a40fd95684404263001'

let weather = document.querySelector('.weather header .header-2 h2')
let desc = document.querySelector('.weather header .header-2 #weather')
let Precipitation = document.querySelector('.weather header .header-2 #Precipitation')
let Humidity = document.querySelector('.weather header .header-2 #Humidity')
let Wind = document.querySelector('.weather header .header-2 #wind')

async function weatherApi() {

  if (!("geolocation" in navigator)) {
    alert("Geolocation not supported");
    return;
  }

  // 🔍 Check permission state FIRST
  const permission = await navigator.permissions.query({ name: "geolocation" });

  if (permission.state === "denied") {
    console.log("Geolocation permanently denied");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${api}&q=${lat},${lon}`
      );

      const data = await res.json();

      weather.innerHTML = `${Math.floor(data.current.temp_c)} °C`;
      desc.innerHTML = data.current.condition.text;
      Wind.innerHTML = `Wind ${data.current.wind_kph} km/h`;
      Humidity.innerHTML = `Humidity ${data.current.humidity}%`;
      Precipitation.innerHTML = `Heat Index ${data.current.heatindex_c} °C`;
    },
    (error) => {
      console.error("Geolocation error:", error.code, error.message);
    }
  );
}
console.log(location.protocol);
console.log(window.isSecureContext);

window.onload = weatherApi;
var h1 = document.querySelector('.weather header .header-1 h1')
var GetDate = document.querySelector('.weather header .header-1 h2')

let dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let MonthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
function newDate(){
    let date = new Date();

    let DayOfWeek = dayArray[date.getDay()]
    var Hours = date.getHours()
    let Minutes = date.getMinutes()
    let Seconds = date.getSeconds()
    let Getday = date.getDate()
    let Getmonth = date.getMonth()
    let Getyear = date.getFullYear()
    
    GetDate.innerHTML = `${Getday} ${MonthArray[Getmonth]} ${Getyear}`
        
    if(Hours>12){
         h1.innerHTML = `${DayOfWeek}, ${Hours-12}:${String(Minutes).padStart(2, '0')}:${String(Seconds).padStart(2, '0')} PM`

        
    }
    else{
        h1.innerHTML = `${DayOfWeek}, ${Hours}:${String(Minutes).padStart(2, '0')}:${String(Seconds).padStart(2, '0')} AM`
        
    }
}
function BackGround(){
    let background = document.querySelector('#main section')
    let Oneto3 = 'https://i.pinimg.com/736x/96/30/da/9630dafa254d997a2753c231c2c77195.jpg'
    let Fourto5 = 'https://i.pinimg.com/1200x/e8/0e/6c/e80e6c15f87d9b1611de6cbe159f9e86.jpg'
    let sixto9 = 'https://i.pinimg.com/1200x/e8/0e/6c/e80e6c15f87d9b1611de6cbe159f9e86.jpg'
    let tento12 = 'https://i.pinimg.com/1200x/df/58/4d/df584d4de740b7ca8de60311b31daae2.jpg'
    let thirtinto15 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTreQgGx4-lvZldMM4sepN3kDdio9Ljp8C3_w&s'
    let sixteento18 = 'https://i.pinimg.com/1200x/83/3f/1a/833f1a3adaac4eec58fa83a1f167c8e1.jpg'
    let eighteento21 = 'https://i.pinimg.com/1200x/83/3f/1a/833f1a3adaac4eec58fa83a1f167c8e1.jpg'
    let nineto21 = 'https://i.pinimg.com/736x/6a/77/7e/6a777e2bc5f129144565a02059c7409d.jpg'
    let twentyto24 = 'https://i.pinimg.com/736x/f6/4b/59/f64b59baa8085af0f5aab1abec6df919.jpg'
    let D = new Date()
    let Hours = D.getHours()
    if(Hours>=1 && Hours<=3){
        background.style.backgroundImage = `url(${Oneto3})`
    }
    else if(Hours>=4 && Hours<=5){
        background.style.backgroundImage = `url(${Fourto5})`
        
    }
    else if(Hours>=6 && Hours<=9){
        background.style.backgroundImage = `url(${sixto9})`
        
    }
    else if(Hours>=10 && Hours<=12){
        background.style.backgroundImage = `url(${tento12})`
        
    }
    else if(Hours>=13 && Hours<=15){
        background.style.backgroundImage = `url(${thirtinto15})`
        
    }
    else if(Hours>=16 && Hours<=18){
        background.style.backgroundImage = `url(${sixteento18})`
        
    }
    else if(Hours>=19 && Hours<=21){
        background.style.backgroundImage = `url(${eighteento21})`
        
    }
    else if(Hours>=22 && Hours<=24){
        background.style.backgroundImage = `url(${nineto21})`
        
    }
    else{
        background.style.backgroundImage = `url(${twentyto24})`
        
    }   
}

setInterval(()=>{
    newDate();
    BackGround();
},1000)

}

WeatherData();

function themeData(){
    var theme = document.querySelector('nav .theme');
var RootElement = document.documentElement;
var flag = localStorage.getItem("themeFlag")
  ? Number(localStorage.getItem("themeFlag"))
  : 0;


applyTheme(flag);

theme.addEventListener('click', () => {
  flag = (flag + 1) % 4; 
  localStorage.setItem("themeFlag", flag);
  applyTheme(flag);
});

function applyTheme(flag) {
  if (flag === 0) {
    RootElement.style.setProperty('--tri', '#212121');
    RootElement.style.setProperty('--sec', '#616161');
    RootElement.style.setProperty('--pri', '#757575');
    RootElement.style.setProperty('--tri1', '#9E9E9E');
  } 
  else if (flag === 1) {
    RootElement.style.setProperty('--tri', '#11212D');
    RootElement.style.setProperty('--sec', '#4A5C6A');
    RootElement.style.setProperty('--pri', '#9BA8AB');
    RootElement.style.setProperty('--tri1', '#CCD0CF');
  } 
  else if (flag === 2) {
    RootElement.style.setProperty('--tri', '#052659');
    RootElement.style.setProperty('--sec', '#5483B3');
    RootElement.style.setProperty('--pri', '#7DA0CA');
    RootElement.style.setProperty('--tri1', '#C1E8FF');
  } 
  else if (flag === 3) {
    RootElement.style.setProperty('--tri', '#355534');
    RootElement.style.setProperty('--sec', '#6B9071');
    RootElement.style.setProperty('--pri', '#AEC3B0');
    RootElement.style.setProperty('--tri1', '#E3EED4');
  }
}


}
themeData();
