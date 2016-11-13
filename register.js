//setup
var XMLHttpRequest = require('xhr2');

//create request object
var request = new XMLHttpRequest();

//create dictionary
var objectToSend = {
  token: "ecfba748618dfe1cf5baeef934d6fe6f",
  github: "https://github.com/kochima/code2040"
}

//set http options
var options = {
  url: "http://challenge.code2040.org/api/register",
  method: "POST",
  postData: objectToSend
}

//function to respond after server has responded
request.onload = function () {
   console.log(request.status);
}

//send request
request.open(options.method, options.url, true);
request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
request.send(JSON.stringify(options.postData));
