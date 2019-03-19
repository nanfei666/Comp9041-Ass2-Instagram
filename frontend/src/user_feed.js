var strCookie=document.cookie;
var arrCookie=strCookie.split("; ");
var userId="";
var username;
var date = new Date();
for(var i=0;i<arrCookie.length;i++){
         var arr=arrCookie[i].split("=");
         //找到名称为userId的cookie，并返回它的值
         if("user"==arr[0]){
                userId=arr[1];
                break;
         }
}
for(var i=0;i<arrCookie.length;i++){
         var arr=arrCookie[i].split("=");
         //找到名称为userId的cookie，并返回它的值
         if("userName"==arr[0]){
                username=arr[1];
                break;
         }
}
if(userId==""){
  var no_log_in_html = `<div class="row d-flex justify-content-center">
    <div class="menu-content pb-70 col-lg-8">
      <div class="title text-center">
        <h1 class="mb-10">You haven't log in yet!</h1>
        <p>starrt you instacram by log in</p>
      </div>
    </div>
  </div>`;

  document.getElementById('feed_container').innerHTML=no_log_in_html;

}



// fetch("http://127.0.0.1:5000/user/feed",{method:'GET',headers: {'Authorization': `Token ${userId}`},}
// ).then(function(response){
//   // if(response.ok){
//   //   window.location.href='http://127.0.0.1:8080';
//   // }
//   return response.json();
// }).then(function(resule){
//   console.log(resule);
// });
var p = 0;
var n =10;
fetch(`http://127.0.0.1:5000/user/feed?p=${p}&n=${n}`,{method:'GET',headers: {'Authorization': `Token ${userId}`},}
).then(function(response){
  // if(response.ok){
  //   window.location.href='http://127.0.0.1:8080';
  // }
  return response.json();
}).then(function(resule){
  var html = `<div class="row d-flex justify-content-center">
    <div class="menu-content pb-70 col-lg-8">
      <div class="title text-center">
        <h1 class="mb-10">You haven't follow anyone yet!</h1>
        <p>starrt you instacram by follow someone</p>
      </div>
    </div>
  </div>`;
  if(resule.posts.length==0){
  document.getElementById('feed_container').innerHTML=html;
}

if(username){
  var user_infor_html = `  <div class="user-meta">
      <h4 class="text-white">${username}</h4>
      <p class="text-white">${date}</p>
    </div>`;
    document.getElementById('main_page_user_infor').innerHTML=user_infor_html;
}
  var new_div = document.createElement("div");
  new_div.setAttribute("class","row");
  new_div.id="new_DIV";
  document.getElementById('feed_container').appendChild(new_div);

for(var i=0;i<resule.posts.length;i++){
var post_id = resule.posts[i].id;
var author = resule.posts[i].meta.author;
var description_text = resule.posts[i].meta.description_text;
var published = resule.posts[i].meta.published;
var likes = resule.posts[i].meta.likes;
var num_likes=resule.posts[i].meta.likes.length;
var thumbnail = resule.posts[i].thumbnail;
var src = resule.posts[i].src;
  var comments_comment=[];
  var comments_author=[];
  var comments_published=[];
if(resule.posts[i].comments.length==0){
   // comments_comment.push("no comments");
}
else{
  for(var k=0;k<resule.posts[i].comments.length;k++){
comments_author.push(resule.posts[i].comments[k].author);
comments_published.push(resule.posts[i].comments[k].published);
 comments_comment.push(resule.posts[i].comments[k].comment);
}
}

var comment_string="";
var comment_length =comments_comment.length;
for(var l=0;l<comments_comment.length;l++){
   comment_string+=comments_comment[l];
}


var html_2=`<div class="card h-100">
  <div class="single-post post-style-1">

    <div><img style="max-width=300px" src="data:img/png;base64,${thumbnail}" alt="Blog Image"></div>

    <a class="avatar"><img src="img/about.jpg" alt="Profile Image"></a>

    <div style="width: 100%; height: 100%; position: relative; padding: 10px; padding-bottom: 60px;">

      <h4 class="title"><a href="http://127.0.0.1:8080/content"><b>${description_text}</b></a></h4>

      <ul class="post-footer">
        <li><button onclick=onClick(${post_id})><i class="ion-heart"></i>${num_likes}</button></li>
        <li><button onclick=onCommentClick(${post_id}) ><i class="ion-chatbubble"></i>${comment_length}</button></li>

      </ul>

    </div><!-- blog-info -->
  </div><!-- single-post -->
</div><!-- card -->`




  var conten_div = document.createElement("div");
  // conten_div.class="col-lg-3 col-md-6 single-fashion";
  conten_div.setAttribute("class","col-lg-4 col-md-6");
  conten_div.innerHTML=html_2;
  document.getElementById('new_DIV').appendChild(conten_div);

}
});
//  得到了 feed 的数据;

// var html = `<div class="row d-flex justify-content-center">
//   <div class="menu-content pb-70 col-lg-8">
//     <div class="title text-center">
//       <h1 class="mb-10">Fashion News This Week</h1>
//       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore  et dolore magna aliqua.</p>
//     </div>
//   </div>
// </div>`;
function overShow(likes,index) {
 var showDiv = document.getElementById("showDiv"+index);
 showDiv.style.left = event.clientX;
 showDiv.style.top = event.clientY;
 showDiv.style.display = 'block';
showDiv.innerHTML =likes+" have liked this";
}

function outHide(index) {
 var showDiv = document.getElementById("showDiv"+index);
 showDiv.style.display = 'none';
 showDiv.innerHTML = '';
}
function onClick(choosen_post_id){
  fetch(`http://127.0.0.1:5000/post/like?id=${choosen_post_id}`,{method:'PUT',headers: {'Authorization': `Token ${userId}`},}
  ).then(function(response){
    // if(response.ok){
    //   window.location.href='http://127.0.0.1:8080';
    // }
    return response.json();
  }).then(function(resule){
    console.log(resule);
  });


}

function onCommentClick(postID){
  document.cookie = "choosen_id="+postID;
  window.location.href="http://127.0.0.1:8080/content";

}
