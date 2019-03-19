function btn_onClick(){
  var strCookie=document.cookie;
  var arrCookie=strCookie.split("; ");
  var userId;
  var choosen_id;
  var date = new Date();
  var user_name;
  for(var i=0;i<arrCookie.length;i++){
           var arr=arrCookie[i].split("=");
           //找到名称为userId的cookie，并返回它的值
           if("user"==arr[0]){
                  userId=arr[1];

           }
           if("choosen_id"==arr[0]){
             choosen_id=arr[1];
           }
  }

fetch(`http://127.0.0.1:5000/user/`,{method:'GET',headers: {'Authorization': `Token ${userId}`},}
  ).then(function(response){
    // if(response.ok){
    //   window.location.href='http://127.0.0.1:8080';
    // }
    return response.json();
  }).then(function(resule){
    user_name=resule.username;

  }

);
var text = document.getElementById('comment_text').value;
var data = {"author": username,"published": "1539476785.0","comment": text};

fetch(`http://127.0.0.1:5000/post/comment?id=${choosen_id}`,{method:'PUT',body:JSON.stringify(data),headers: {'Authorization': `Token ${userId}`,'Content-Type':'application/json'},
}
).then(function(response){
  // if(response.ok){
  //   window.location.href='http://127.0.0.1:8080';
  // }
  return response.json();
}).then(function(resule){
  console.log(resule);
});

}
