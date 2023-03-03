// This JavaScript code is for a Digital Alarm Clock project. The code has several functions that perform different actions on the webpage.


// This line of code gets the HTML element with the ID of "clock" and assigns it to a variable named "display
const display = document.getElementById('clock');

// set audio for alarm
//This line of code sets the audio file that will play when the alarm goes off.
const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
audio.loop = true;

//This line of code initializes a variable to null. It will be used to store the time of the alarm.
let alarmTime = null;
//This line of code initializes a variable to null. It will be used to store the timeout for the alarm.
let alarmTimeout = null;

//This line of code gets the unordered list element with the ID of "myList" and assigns it to a variable named "myList".This is used to store 
//the alarm that is set
const myList = document.querySelector('#myList');

//This line of code gets the form element with the class of "setAlarm" and assigns it to a variable named "addAlarm
const addAlarm = document.querySelector('.setAlarm')


const alarmList = [];  // Stores all the alarms being set 
// let count =1;


// Plays the alarm audio at correct time
//It plays the alarm sound and displays an alert with the current time.
function ringing(now){
    audio.play();
    alert(`Hey! it is ${now}`)
}


// updates time every second
//This function is called every second and updates the current time on the webpage. 
//It also checks if any alarms have been set for the current time and if so, calls the ringing() function to play the alarm sound 
function updateTime() {
    //Creates a new Date object and gets the current hour, minute,
     //and second using the getHours(), getMinutes(), and getSeconds() methods, respectively.
    var today = new Date(); 
    const hour = formatTime(today.getHours());
    const minutes = formatTime(today.getMinutes());
     const seconds = formatTime(today.getSeconds());

     //checks if hour is greater than twelve then takes PM otherwise AM
     const ampm =  hour >= 12 ? 'PM' : 'AM';

     //sets the curretime in the format hour-min-sec-am/pm
     const now = `${hour}:${minutes}:${seconds}:${ampm}`;
    display.innerText=`${hour}:${minutes}:${seconds} ${ampm}`;

    //checks if time format is in AM changes the background color to different shade
    if(ampm=='AM')
    {
      document.body.style.background ='linear-gradient(to top, #99ccff 0%, #ffff99 100%) no-repeat ';
        
    }
    //checks if time format is in PM changes the background color to different shade
    else{
       document. body.style.background = 'linear-gradient(to top , black 0%, darkgrey 100%) no-repeat ';
       document.getElementById("firstContainer").classList.add("customStyle");
       
    }
    
    
    //This code checks if the current time (represented by the variable "now") is included in an array called "alarmList". 
    //If it is, the function "ringing()" is called, presumably to sound an alarm.
    if(alarmList.includes(now) ){
        ringing(now);
    } 
}

// set the correct format of time
//This function takes a time value and formats it with leading zeros if necessary. For example, it converts "1:2:3" to "01:02:03"
function formatTime(time) {
    if ( time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}


// function to clear/stop the currently playing alarm
//It cancels any previously set timeout that was used to trigger the alarm by calling the "clearTimeout()" function,
// passing in a variable called "alarmTimeout" as an argument. If "alarmTimeout" is truthy (meaning it has a value that is not null, 
//undefined, 0, or false), then the "clearTimeout()" function is called to cancel the timeout.
//After cancelling the timeout, the function displays an alert message to let the user know that the alarm has been cleared.
function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}      


// removes an alarm from the unordered list and the webpage when "Delete Alarm" is clicked
//So, essentially, this code allows the user to click on an element in the "myList" list and remove it from the page 

myList.addEventListener('click', e=> {
    console.log("removing element")
    if(e.target.classList.contains("deleteAlarm")){
        e.target.parentElement.remove();
    }    
})


// removes an alarm from the array when "Delete Alarm" is clicked
//The function first creates a new array called "newList" using the Array.prototype.filter() method.
// This method returns a new array that includes all elements from the original array except for
// those that don't meet a certain condition
remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    //The function then clears the contents of the "alarmList" array by setting its length to 0. 
    //This is done so that the "alarmList" array can be updated with the new list of times.
    alarmList.length = 0;  
    //The function then adds the contents of "newList" to the "alarmList" array using the Array.prototype.push.apply() method                
    alarmList.push.apply(alarmList, newList);
    
    console.log("newList", newList);
    console.log("alarmList", alarmList);
}

//The function creates a new string of HTML using template literals. The HTML string includes a list item element with a class of "time-list"
// Adds newAlarm to the unordered list as a new list item on webpage
//The function then appends the newly created HTML string to an unordered list element on the page with the ID of "myList"
function showNewAlarm(newAlarm){
    const html =`
    <li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
    </li>`
    myList.innerHTML += html
};

//This is a JavaScript code snippet that adds an event listener to a form element with the ID of "addAlarm" and calls a
 //function when the form is submitted. The code also includes a call to the "setInterval" function
 // to update the time on the page every second
// event to set a new alarm whenever the form is submitted 
addAlarm.addEventListener('submit', e=> {
    e.preventDefault();
    // const newAlarm = addAlarm.alarmTime.value;
    //The next few lines of code extract the hour, minute, second, and AM/PM values from the form input
    //fields and format them as two-digit strings using a helper function called 
    //"formatTime". The formatted values are then concatenated into a single string
    //called "newAlarm" with a colon separator between each value.
    let new_h=formatTime(addAlarm.a_hour.value);
    if(new_h === '0'){
        new_h = '00'
    }
    let new_m=formatTime(addAlarm.a_min.value);
    if(new_m === '0'){
        new_m = '00'
    }
    let new_s=formatTime(addAlarm.a_sec.value);
    if(new_s === '0'){
        new_s = '00'
    }
    let new_ampm=addAlarm.ampm.value;
    
    
    const newAlarm = `${new_h}:${new_m}:${new_s}:${new_ampm}`

//     add newAlarm to alarmList
    if(isNaN(newAlarm)){
        if(!alarmList.includes(newAlarm)){
            alarmList.push(newAlarm);
            console.log(alarmList);
            console.log(alarmList.length);
            showNewAlarm(newAlarm);
            addAlarm.reset();
        } else{
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else{
        alert("Invalid Time Entered")
    }        
})


// calls updateTime() every second
setInterval(updateTime, 1000);
