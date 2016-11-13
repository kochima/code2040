//setup
var XMLHttpRequest = require('xhr2');

//function to create new array of strings
function ifPrefix(s, array) {
  var newarray = [];
  for (var i = 0; i < array.length; i++) {
      if(!array[i].startsWith(s)){
        newarray.push(array[i]);
      }
  }
  return newarray;
}

//declare JSON dictionaries to send
//leave value for new empty
var objectToSend = {token: "ecfba748618dfe1cf5baeef934d6fe6f"}
var objectToValidate = {token: "ecfba748618dfe1cf5baeef934d6fe6f", array: ""}

//format http options for first http post request
var options = {
  url: "http://challenge.code2040.org/api/prefix",
  method: "POST",
  postData: objectToSend
}

//format http options for second http post request
var secondOptions = {
  url: "http://challenge.code2040.org/api/prefix/validate",
  method: "POST",
  postData: objectToValidate
}

//create new rquest objects
var request = new XMLHttpRequest();
var validate = new XMLHttpRequest();

//function that responds after request had been answered by server
request.onload = function () {
   var status = request.status;
   var data = request.responseText;
   console.log(data);
   var parsedObject = JSON.parse(data);
   objectToValidate.array = ifPrefix(parsedObject.prefix, parsedObject.array);
   console.log(objectToValidate.array);

  //send answer for validation
   validate.open(secondOptions.method, secondOptions.url, true);
   validate.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
   validate.send(JSON.stringify(secondOptions.postData));
}

//display message
validate.onload = function () {
  console.log(validate.status);
  console.log(validate.responseText);
}

//send request
request.open(options.method, options.url, true);
request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
request.send(JSON.stringify(options.postData));
