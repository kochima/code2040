//setup
var XMLHttpRequest = require('xhr2');

//function to format newly calculated time
function formatTime(newTime){
  year = newTime.getFullYear();
  month = newTime.getMonth()+1;
  date = newTime.getDate();
  hours = newTime.getHours();
  minutes = newTime.getMinutes();
  seconds = newTime.getSeconds();
  if(month < 10){month = "0"+month;}
  if(date < 10){date = "0"+date;}
  if(hours < 10){hours = "0"+hours;}
  if(minutes < 10){minutes = "0"+minutes;}
  if(seconds < 10){seconds = "0"+seconds;}
  newTimeStamp = year+"-"+month+"-"+date+"T"+hours+":"+minutes+":"+seconds+"Z";
  return newTimeStamp;
}

//fuction to add seconds to given time
function addSeconds(timestamp, seconds) {
  var day = timestamp.substring(0, 10);
  var time = timestamp.substring(11, 19);
  originalTime = new Date(day+" "+time);
  newTime = new Date(originalTime.getTime() + (seconds*1000));

  console.log(formatTime(newTime));
  return formatTime(newTime);
}

//declare JSON dictionaries to send
//leave value for returning datastamp empty
var objectToSend = {token: "ecfba748618dfe1cf5baeef934d6fe6f"}
var objectToValidate = {token: "ecfba748618dfe1cf5baeef934d6fe6f", datestamp: ""}


//format http options for first http post request
var options = {
  url: "http://challenge.code2040.org/api/dating",
  method: "POST",
  postData: objectToSend
}

//format http options for second http post request
var secondOptions = {
  url: "http://challenge.code2040.org/api/dating/validate",
  method: "POST",
  postData: objectToValidate
}

//ceat new http request objects
var request = new XMLHttpRequest();
var validate = new XMLHttpRequest();

//function that responds after request had been answered by server
request.onload = function () {
   var status = request.status;
   var data = request.responseText;
   var parsedObject = JSON.parse(data);

   //view the data on the command line -- for debugging purposes
   console.log(parsedObject.datestamp);
   console.log(parsedObject.interval);

   //perform operation
   objectToValidate.datestamp = addSeconds(parsedObject.datestamp, parsedObject.interval);

   //send validation request
   validate.open(secondOptions.method, secondOptions.url, true);
   validate.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
   validate.send(JSON.stringify(secondOptions.postData));
}

//function that responds after validation request had been answered by server
validate.onload = function () {
  console.log(validate.status);
  console.log(validate.responseText);
}

//make first request to server
request.open(options.method, options.url, true);
request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
request.send(JSON.stringify(options.postData));
