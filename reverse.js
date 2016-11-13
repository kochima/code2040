//setup
var XMLHttpRequest = require('xhr2');

//function to reverse string
function reverse(s) {
  return s.split('').reverse().join('');
}

//create dictionaries to send
//leave string empty for processing
var objectToSend = {token: "ecfba748618dfe1cf5baeef934d6fe6f"}
var objectToValidate = {token: "ecfba748618dfe1cf5baeef934d6fe6f", string: ""}

//set options for each http post request
var options = {
  url: "http://challenge.code2040.org/api/reverse",
  method: "POST",
  postData: objectToSend
}

var secondOptions = {
  url: "http://challenge.code2040.org/api/reverse/validate",
  method: "POST",
  postData: objectToValidate
}

//create new http requests
var request = new XMLHttpRequest();
var validate = new XMLHttpRequest();

//funtion that responds when server responds
request.onload = function () {
   var status = request.status;
   var data = request.responseText;

   //get reversed string
   objectToValidate.string = reverse(data);
   console.log(objectToValidate.string);

   //send answer for validation
   validate.open(secondOptions.method, secondOptions.url, true);
   validate.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
   validate.send(JSON.stringify(secondOptions.postData));
}

//send first request
request.open(options.method, options.url, true);
request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
request.send(JSON.stringify(options.postData));
