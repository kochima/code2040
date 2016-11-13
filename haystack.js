//setup
var XMLHttpRequest = require('xhr2');

//function to locate index of string in array
function locate(s, array) {
  for (var i = 0; i < array.length; i++) {
      if(s.localeCompare(array[i]) == 0){
        return i;
      }
  }
}

//declare JSON dictionaries to send
//leave value for needle empty
var objectToSend = {token: "ecfba748618dfe1cf5baeef934d6fe6f"}
var objectToValidate = {token: "ecfba748618dfe1cf5baeef934d6fe6f", needle: ""}

//format http options for first http post request
var options = {
  url: "http://challenge.code2040.org/api/haystack",
  method: "POST",
  postData: objectToSend
}

//format http options for second http post request
var secondOptions = {
  url: "http://challenge.code2040.org/api/haystack/validate",
  method: "POST",
  postData: objectToValidate
}

//ceate new http request objects
var request = new XMLHttpRequest();
var validate = new XMLHttpRequest();

//function that responds after request had been answered by server
request.onload = function () {
   var status = request.status;
   var data = request.responseText;
   var parsedObject = JSON.parse(data);
   objectToValidate.needle = locate(parsedObject.needle, parsedObject.haystack);
   console.log(objectToValidate.needle); // see what we've processed

   //send answer
   validate.open(secondOptions.method, secondOptions.url, true);
   validate.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
   validate.send(JSON.stringify(secondOptions.postData));
}

//make first http request
request.open(options.method, options.url, true);
request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
request.send(JSON.stringify(options.postData));
