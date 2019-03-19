var strCookie=document.cookie;
var arrCookie=strCookie.split("; ");
var userId="";
for(var i=0;i<arrCookie.length;i++){
         var arr=arrCookie[i].split("=");
         //找到名称为userId的cookie，并返回它的值
         if("user"==arr[0]){
                userId=arr[1];
                break;
         }
       }
if(userId==""){
document.getElementById('depends').innerHTML=`<a href="http://127.0.0.1:8080/login">login</a>`;
}
else{
document.getElementById('depends').innerHTML=`<button type="button" class="btn btn-primary" style="text-transform: uppercase;
    font-weight: 600;
    color: #222;
    padding: 20px;
    background-color: transparent;
    border: aliceblue;"
    data-toggle="modal" data-target="#profile_Modal">Profile</button>`;




    fetch(`http://127.0.0.1:5000/user/`,{method:'GET',headers: {'Authorization': `Token ${userId}`},}
      ).then(function(response){
        // if(response.ok){
        //   window.location.href='http://127.0.0.1:8080';
        // }
        return response.json();
      }).then(function(resule){
        user_name=resule.username;
        name = resule.name;
        id = resule.id;
        email = resule.email;
        follwing = resule.following;
        followed_num = resule.followed_num;
        post = resule.posts

var profile_html=`<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">User Profile</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">


    <form >
  <div class="form-group">
    <label for="exampleFormControlInput1">User name</label>
    <input class="form-control" readonly="readonly" id="profile_user_name" value="${user_name}">
  </div>

  <div class="form-group">
    <label for="exampleFormControlInput1">User id</label>
    <input class="form-control" id="profile_id" readonly="readonly" placeholder="${id}">
  </div>


  <div class="form-group">
    <label for="exampleFormControlInput1">Name</label>
    <input class="form-control" id="profile_name" value="${name}">
  </div>



  <div class="form-group">
    <label for="exampleFormControlInput1">Email</label>
    <input type="email" class="form-control" id="profile_email" value="${email}">
  </div>

  <div class="form-group">
    <label for="exampleFormControlInput1">Password</label>
    <input type="email" class="form-control" id="profile_password" placeholder="change your password here">
  </div>

<div class="form-group" id="profile_form">
<label for="exampleFormControlInput1">Following</label>
</div>


</form>
    </div>
    <div class="modal-footer">
    <p class="text-danger" id="worng_outcom"></p>
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      <button type="submit" data-dismiss="modal" id="submit_new_content" onclick="Submit_change()" class="btn btn-primary">Change</button>
    </div>
  </div>
</div>`



document.getElementById('profile_Modal').innerHTML=profile_html;
if(follwing.length==0){
  var form_div = document.createElement("div");
  form_div.innerHTML=`<h1>not follow anyone yet</h1>`;
  document.getElementById('profile_form').appendChild(form_div);
}
else{
for(var s=0;s<follwing.length;s++){

  fetch(`http://127.0.0.1:5000/user/?id=${follwing[s]}`,{method:'GET',headers: {'Authorization': `Token ${userId}`},}
    ).then(function(response){
      // if(response.ok){
      //   window.location.href='http://127.0.0.1:8080';
      // }
      return response.json();
    }).then(function(resule){
      user_NAME=resule.username;
      var form_div = document.createElement("div");
      form_div.setAttribute("class","form-check")
      form_div.innerHTML=`<input class="form-check-input" type="checkbox" value=${user_NAME} name="defaultCheck1" checked>
      <label class="form-check-label" for="defaultCheck1"> ${user_NAME}</label>`
      document.getElementById('profile_form').appendChild(form_div);

    }

  );


}}
      }

    );









document.getElementById('log_out').innerHTML=`<button onclick="log_OUT()" type="button" class="btn btn-primary" style="text-transform: uppercase;
    font-weight: 600;
    color: #222;
    padding: 20px;
    background-color: transparent;
    border: aliceblue;">log out</button>`;
document.getElementById('new_content').innerHTML=`<button type="button" class="btn btn-primary" style="text-transform: uppercase;
    font-weight: 600;
    color: #222;
    padding: 20px;
    background-color: transparent;
    border: aliceblue;"
    data-toggle="modal" data-target="#exampleModal">Post</button>`;


}
function log_OUT(){
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href="http://127.0.0.1:8080/mainpage"
}

function Submit_change(){
  var USERNAME = document.getElementById('profile_name').value;
  var EMAIL = document.getElementById('profile_email').value;
  var PASSWORD = document.getElementById('profile_password').value;
  var data;
  if(USERNAME!='' && EMAIL!='' && PASSWORD!=''){
   data = {"email": EMAIL,"name": USERNAME,"password":PASSWORD};
   console.log(data)

}
if(USERNAME!='' && EMAIL!='' && PASSWORD==''){
 data = {"email": EMAIL,"name": USERNAME};
}
  fetch("http://127.0.0.1:5000/user/",
  {method:'PUT',
  body:JSON.stringify(data),
    headers: {'Content-Type':'application/json','Authorization': `Token ${userId}`}}
  ).then(function(response){
    if(response.ok){
      console.log("ok")
    }
    else{
      document.getElementById('worng_outcom').innerHTML="invalid information";
      return false
    }


  });



var a = document.getElementsByName("defaultCheck1");
for(var i=0;i<a.length;i++){
  if(a[i].checked){}
  else{
    var follow_name = a[i].defaultValue;
    fetch(`http://127.0.0.1:5000/user/unfollow?username=${follow_name}`,
    {method:'PUT',
    body:JSON.stringify(data),
      headers: {'Content-Type':'application/json','Authorization': `Token ${userId}`}}
    ).then(function(response){
      if(response.ok){
        console.log("ok")
      }
    });

  }
}

}
