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
                break;
         }
         if("choosen_id"==arr[0]){
           choosen_id=arr[1];
         }
}

   var image = '';
   var canvas;
   var base64;//将canvas压缩为base64格式
   function selectImg(file){
	   if(!file.files || !file.files[0]){
		  return;
	   }
	   var reader = new FileReader();//读取文件
	   reader.onload = function(event){//文件读取完成的回调函数
		  image = document.getElementById('showImg');
		  image.src = event.target.result;//读入文件的base64数据(可直接作为src属性来显示图片)
		  //alert(event.target.result);
		  //图片读取完成的回调函数（必须加上否则数据读入不完整导致出错！）
		  image.onload = function(){
			  canvas = convertImageToCanvas(image); //图片转canvas
			  base64 = canvas.toDataURL('image/png').replace(/data:image\/.*;base64,/,''); //将图片数据转为base64.

         //alert(base64);
			  //  $.post(
				// "/server_interface_url/", //服务器接口(返回图片路径)
				// {data:base64},
				// function(data) {
				// 	alert(data.target);
				// 	//alert(eval(data));
				// 	//修改上传文件的路径名字(图片完整路径)
				// 	$('#img').val('http://path/'+data.target);
				// }, "json");

		  }
	   }
	   //将文件已Data URL的形式读入页面
	   reader.readAsDataURL(file.files[0]);
   }
	// 把image 转换为 canvas对象
	function convertImageToCanvas(image) {
		// 创建canvas DOM元素，并设置其宽高和图片一样
		var canvas = document.createElement("canvas");
		canvas.width = image.width;
		canvas.height = image.height;
		// 坐标(0,0) 表示从此处开始绘制，相当于偏移。
		canvas.getContext("2d").drawImage(image, 0, 0);

		return canvas;

}


function Submit(){
  var description_text = document.getElementById('new_content_description').value;
  var data = {"description_text": description_text,"src": base64};
  fetch("http://127.0.0.1:5000/post/",
  {method:'POST',
  body:JSON.stringify(data),
  headers: {'Content-Type':'application/json','Authorization': `Token ${userId}`}}
  ).then(function(response){
    if(response.ok){
console.log("ok");


    }
    else{
      // document.getElementById('worng_outcom').innerHTML="invalid password or username";
      // return false
    }


  })
}
