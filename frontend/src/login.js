// const url = 'http://localhost:8080/data/users.json';
//
// document.getElementById('sign_in').onclick = function(){
//   fetch(url)
//       .then(res => res.json())
//       .catch(err => console.warn(`API_ERROR: ${err.message}`));
//
// };

if(document.getElementById('log_in')){
document.getElementById('log_in').onclick = function(){
  document.getElementById('worng_outcom').innerHTML="";
  var username = document.getElementById('inputUsername').value;
  var password = document.getElementById('inputPassword').value;
  if(username =="" || password ==""){
document.getElementById('worng_outcom').innerHTML="please fill in all the blank";
    return false
  }
var data = {"username": username,"password": password};
fetch("http://127.0.0.1:5000/auth/login",
{method:'POST',
body:JSON.stringify(data),
headers: new Headers({'Content-Type':'application/json'})}
).then(function(response){
  if(response.ok){
    response.json().then(function(result){
      document.cookie = "user="+result.token;
      document.cookie = "userName="+username;
      window.location.href='http://127.0.0.1:8080/mainpage';
    });

  }
  else{
    document.getElementById('worng_outcom').innerHTML="invalid password or username";
    return false
  }


});
};
}

if(document.getElementById('sign_up')){
document.getElementById('sign_up').onclick = function(){

  var username = document.getElementById('inputUsername').value;
  var password = document.getElementById('inputPassword').value;
  var email = document.getElementById('inputEmail').value;
  var name = document.getElementById('inputName').value;
if(username==""||password==""||email==""||name==""){
  document.getElementById('worng_outcom').innerHTML="please fill in all the blank";

  return false
}
var data = {"username": username,"password": password,"email": email,"name": name};
fetch("http://127.0.0.1:5000/auth/signup",
{method:'POST',
body:JSON.stringify(data),
headers: new Headers({'Content-Type':'application/json'})}
).then(function(response){
  if(response.ok){
    response.json().then(function (result){
      document.cookie = "userName="+username;
      document.cookie = "user="+result.token;
      window.location.href='http://127.0.0.1:8080/mainpage';
    });
  }
  else{
    document.getElementById('worng_outcom').innerHTML="username has been Taken";
  }

})
};
}
