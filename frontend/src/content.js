var strCookie=document.cookie;
var arrCookie=strCookie.split("; ");
var userId;
var username;
var choosen_id;
var date = new Date();
for(var i=0;i<arrCookie.length;i++){
         var arr=arrCookie[i].split("=");
         //找到名称为userId的cookie，并返回它的值
         if("user"==arr[0]){
                userId=arr[1];
                // break;
         }
         if("choosen_id"==arr[0]){
           choosen_id=arr[1];
         }
}


var p = 0;
var n =10;
fetch(`http://127.0.0.1:5000/user/feed?p=${p}&n=${n}`,{method:'GET',headers: {'Authorization': `Token ${userId}`},}
).then(function(response){
  // if(response.ok){
  //   window.location.href='http://127.0.0.1:8081';
  // }
  return response.json();
}).then(function(resule){
//   var user_infor_html = `  <div class="user-meta">
//       <h4 class="text-white">${username}</h4>
//       <p class="text-white">${date}</p>
//     </div>`;
//     document.getElementById('main_page_user_infor').innerHTML=user_infor_html;
// }

  // var new_div = document.createElement("div");
  // new_div.setAttribute("class","row align-items-center justify-content-between");
  // new_div.id="new_DIV";


for(var i=0;i<resule.posts.length;i++){
var post_id = resule.posts[i].id;
var author = resule.posts[i].meta.author;
var description_text = resule.posts[i].meta.description_text;
var published = resule.posts[i].meta.published;
var likes = resule.posts[i].meta.likes;
var num_likes=resule.posts[i].meta.likes.length;
var thumbnail = resule.posts[i].thumbnail;
var src = resule.posts[i].src;
  var comments_comment;
  var comments_author;
  var comments_published;

  if(post_id==choosen_id){
    console.log('asdas');
    // var html_1 =`<div class="row align-items-center justify-content-between">
    //
    //     <div class="col-lg-6 col-md-12 col-sm-12 about-left">
    //         <img class="img-fluid" src="data:img/png;base64,${src}" alt="">
    //     </div>
    //     <div class="col-lg-6 col-md-12 col-sm-12 about-right">
    //       <span class="lnr lnr-sun"></span>
    //
    //       <p>${description_text}</p>
    //
    //     </div>
    //
    //   </div>`;

    var html_1=`  <div class="row align-items-center justify-content-between">

        <div class="col-lg-6 col-md-12 col-sm-12 about-left">
            <img class="img-fluid" src="data:img/png;base64,${src}" alt style="width: -webkit-fill-available;">
        </div>
        <div class="col-lg-6 col-md-12 col-sm-12 about-right">

          <h1 class="text-uppercase">
          ${description_text}

          </h1>
          <hr style="FILTER: alpha(opacity=100,finishopacity=0,style=1)" width="100%" color=#69b4fd SIZE=3>
          <div id="like_content">
          </div>

        </div>

      </div>`;

    document.getElementById('feed_container').innerHTML=html_1;
if(likes.length==0){
  var a = document.createElement("a");
  a.innerHTML="no one likes now";
  document.getElementById('like_content').appendChild(a);
}
else{
    for(var s=0;s<likes.length;s++){
      fetch(`http://127.0.0.1:5000/user/?id=${likes[s]}`,{method:'GET',headers: {'Authorization': `Token ${userId}`},}
        ).then(function(response){
          // if(response.ok){
          //   window.location.href='http://127.0.0.1:8081';
          // }
          return response.json();
        }).then(function(resule){
          user_name=resule.username;
          var b = document.createElement("a");
          b.innerHTML=`${user_name}<br> `;

          document.getElementById('like_content').appendChild(b);
        }

      );


    }
    var end = document.createElement("a");
    end.innerHTML=`have liked this <br>`;
    document.getElementById('like_content').appendChild(end);
  }
    var html_2 = `
          <div class="panel panel-white post panel-shadow" style="width: -webkit-fill-available;">
              <div class="post-heading">
                  <div class="pull-left image">
                      <img src="http://bootdey.com/img/Content/user_1.jpg" class="img-circle avatar" alt="user profile image">
                  </div>
                  <div class="pull-left meta">
                      <div class="title h5">
                          <a><b>Ryan Haywood</b></a>
                          made a post.
                      </div>
                      <h6 class="text-muted time">1 minute ago</h6>
                  </div>
              </div>
              <div class="post-description">
                  <p>Bootdey is a gallery of free snippets resources templates and utilities for bootstrap css hmtl js framework. Codes for developers and web designers</p>

              </div>
          </div>
      `;
if(resule.posts[i].comments.length==0){
   // 显示no comment 洁面
   console.log('asdasda =0');
   var comment_div = document.createElement("div");
   comment_div.setAttribute("style","style=width: -webkit-fill-available");
   comment_div.innerHTML=html_2;
}
else{


  for(var k=0;k<resule.posts[i].comments.length;k++){
    // 显示comment 洁面
console.log('asdas');
comments_author=resule.posts[i].comments[k].author;
comments_published = resule.posts[i].comments[k].published;
 comments_comment = resule.posts[i].comments[k].comment;
console.log(comments_published);
var date = new Date(parseFloat(comments_published)*1000);
var Y = date.getFullYear() + '-';
var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
var D = date.getDate() + ' ';
var h = date.getHours() + ':';
var m = date.getMinutes() + ':';
var sc = date.getSeconds();
var time = Y+M+D+h+m+sc;
 var html_3 = `
       <div class="panel panel-white post panel-shadow" >
           <div class="post-heading">
               <div class="pull-left image">
                   <img src="http://bootdey.com/img/Content/user_1.jpg" class="img-circle avatar" alt="user profile image">
               </div>
               <div class="pull-left meta">
                   <div class="title h5">
                       <a><b>${comments_author}</b></a>
                       made a post.
                   </div>
                   <h6 class="text-muted time">published in ${time}</h6>
               </div>
           </div>
           <div class="post-description">
               <p>${comments_comment}</p>

           </div>
       </div>
   `;
var comment_div_2 = document.createElement("div");
comment_div_2.setAttribute("style","width: -webkit-fill-available")
 comment_div_2.innerHTML= html_3;
 document.getElementById('commment_row').appendChild(comment_div_2);
}
}



}
}
})
