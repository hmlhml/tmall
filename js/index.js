window.onload=function(){
	window.onresize=function(){
		//右侧栏
		var sildetab=getClass("sildetab")[0];
		var h=document.documentElement.clientHeight;
		sildetab.style.height=h+"px";
	}
	
	//搜索框
	var input=getClass("search");
	for(var i=0;i<input.length;i++){
		input[i].onfocus=function(){
			this.style.color="#ccc";
		}
		input[i].onblur=function(){
			if(this.value==""){
				this.value="百搭T恤 女神衣橱必备";
			}
			this.style.color="#000"
		}
	}
	
	//轮播图
		//图片轮播
	var bannerBox=getClass("bannerBox")[0];
	var imgs=getClass("imgbg",bannerBox);
	var divs=getClass("anniu")[0].getElementsByTagName('div');
	var num=0;
	function move(){
		for(var i=0;i<imgs.length;i++){
			imgs[i].style.opacity=0;
			divs[i].className="";
		}
		num++;
		if(num>=imgs.length){
			num=0;
		}
		animate(imgs[num],{opacity:1},600);
		divs[num].className="hover";
	}
	var t=setInterval(move,2000);
		//鼠标移入大盒子  轮播停止
	bannerBox.onmouseover=function(){
		clearInterval(t);
	}
	bannerBox.onmouseout=function(){
		t=setInterval(move,2000);
	}
		//点击按钮
	for (var i = 0; i < divs.length; i++) {
		divs[i].index=i;
		divs[i].onmouseover=function(){
			for (var i = 0; i < imgs.length; i++) {
				imgs[i].style.opacity=0;
				divs[i].className="";
			};
			imgs[this.index].style.opacity=1;
			this.className="hover";
			num=this.index;
		}
	}
	
	//热门品牌
	var items=getClass("item");
	var dis=getClass("dis");
	for (var i = 0; i < items.length-1; i++) {
		items[i].index=i;
		items[i].onmouseover=function(){
			dis[this.index].style.display="block";
		}
		items[i].onmouseout=function(){
			dis[this.index].style.display="none";
		}
	}
	//中间导航
	var lis=$("li",$(".subnavR")[0]);
	var as=$("a",$(".subnavR")[0]);
	var hoverpic=$(".hoverpic",$(".subnavR")[0])
	for (var i = 0; i < lis.length; i++) {
		lis[i].index=i;
		hover(lis[i],function(){
			for(var j=0;j<hoverpic.length;j++){

				hoverpic[j].style.top=0;
			}
			hoverpic[this.index].style.display="block";
			animate(hoverpic[this.index],{top:-14},200)

		},function(){
			hoverpic[this.index].style.top=0;
			hoverpic[this.index].style.display="none";


		})
		
	}
	//顶部float导航
	var floatnav=$(".floatnav")[0];	
	var floors=$(".floor");
	var jump=$(".jump")[0];
	var lifts=$(".lift",jump);
	var color=["#F7A945","#19C8A9","#F15453","#64C333","#0AA6E8","#EA5F8D","#DD2727"];
	var now=0;
	var flag=true;
	var flag2=true;

	var toptop=$(".top",$(".tabdown")[0])[0]//右侧导航条返回顶部获取;
	var floLeftTop=$(".floLeftTop",$(".sildetab")[0])[0]
	var picture=$(".pic-ture");
    document.body.scrollTop=1;
	document.onscroll=function(){
		var tops=document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;
		// document.title=tops;

		//右侧导航条返回顶部;
		if(tops>=200){
			floLeftTop.style.display="block";
			animate(toptop,{opacity:1});
			hover(toptop,function(){
				this.style.backgroundColor="#c40000";
				floLeftTop.style.display="block";
				animate(floLeftTop,{left:-90,opacity:1},300);
			
			},function(){
				this.style.backgroundColor="#000";
				floLeftTop.style.display="none";
				animate(floLeftTop,{left:-140,opacity:0},300)
				floLeftTop.style.opacity=0;
			})
		}else{
			animate(toptop,{opacity:0},200);
			floLeftTop.style.opacity=0;
			floLeftTop.style.display="none";

		}
		//顶部搜索框
		if(tops>=1100){
			if(flag2){
				animate(floatnav,{top:0},200);
				flag2=false;
				flag=true;
			}
			 
		}else{
			if(flag){
				animate(floatnav,{top:-50},200);
				flag=false;
				flag2=true;
			}
			 
		}

		
		//	楼层跳转
		if(tops>=1000){//如果滚动条到浏览器1000px
			jump.style.display="block"; //左侧栏出现  
		}else{
			jump.style.display="none";  //左侧栏消失
		}



		for(var i=0;i<floors.length;i++){   //遍历所有楼层
			if(floors[i].offsetTop<=tops+50){   //如果的对应楼层超出浏览器部分<=滚动条到浏览器+80；
				for(var j=0;j<lifts.length;j++){  //遍历所有楼梯 
					lifts[j].style.background="";  //让所有楼梯显示原色
				}
				lifts[i].style.background=color[i];//对应楼梯显示相对应的颜色
				now=i;
			}
		}


		//按需加载
		var ch=document.documentElement.clientHeight;
		for(var i=0;i<picture.length;i++){
			if(picture[i].offsetTop<=tops+ch){
				var imgs=$("img",picture[i]);
				for(var j=0;j<imgs.length;j++){
					imgs[j].src=imgs[j].getAttribute("data-src");
				}
			}
		}
		var img=$("img",picture[8])

	}
	document.onscroll();
	var obj=document.body.scrollTop?document.body:document.documentElement;//获取对象，兼容ie，ff,chrome,
	for(var i=0;i<lifts.length;i++){ //遍历所有楼梯
		lifts[i].index=i; //记下当下楼梯的下标
		lifts[i].onclick=function(){  //点击楼梯
			now=this.index;
			for(var j=0;j<lifts.length;j++){  //遍历所有楼梯
				lifts[j].style.background="";  //让所有楼梯显示原色
			}
			// obj.scrollTop=floors[this.index].offsetTop-80;
			lifts[this.index].style.background=color[this.index];  //当前楼梯显示相对应的颜色
			animate(obj,{scrollTop:floors[this.index].offsetTop-50},200)  
		}
		lifts[i].onmouseover=function(){    //鼠标移入楼梯
			for(var j=0;j<lifts.length;j++){
				if(j!=now){
					lifts[j].style.background="";
				}
				
			}
			this.style.background=color[this.index];  //当前楼梯显示相对应的颜色
		}
		lifts[i].onmouseout=function(){    //鼠标移出楼梯
			if(now!=this.index){           //如果不是现在点击过的楼梯，就让它显示原来颜色
				this.style.background="";
			}
		}
	}


	//返回顶部
	var backTop=$(".back-top")[0];
	backTop.onclick=function(){
		animate(obj,{scrollTop:0})
	}
	toptop.onclick=function(){
		animate(obj,{scrollTop:0})		
	}


	//图片左移
	function moveLeft(con){
		var conlImg=$("img",con);
		for(var j=0;j<conlImg.length;j++){
			conlImg[j].index=j;
			conlImg[j].onmouseover=function(){
				animate(conlImg[this.index],{marginRight:15},500)
			}
			conlImg[j].onmouseout=function(){
				animate(conlImg[this.index],{marginRight:0},500)
			}
		}
	}
	for(var i=0;i<6;i++){
		var conl=$(".containC");
		var conr=$(".containR");
		moveLeft(conl[[i]]);	
		moveLeft(conr[i]);	
	}	

	//右侧导航条漂浮效果
	var flobox=$(".flobox");
	console.log(flobox)
	var floLefts=$(".floLeft");
	console.log(floLefts)

	for(var i=0;i<flobox.length;i++){
		flobox[i].index=i;
		hover(flobox[i],function(){
			floLefts[this.index].style.display="block";
			animate(floLefts[this.index],{left:-90,opacity:1},300);			
		},function(){
			floLefts[this.index].style.display="none";

			animate(floLefts[this.index],{left:-140,opacity:0},300)

		})
	}


	//左侧向上滚动的广告
	var titleCtns=$(".title-ctn");
	function moveTop(obj){
		var floatTops=$(".floatTop",obj);
		for(var j=1;j<floatTops.length;j++){
			floatTops[j].style.top="30px";
		}
		var now=0;
		var next=0;
		setInterval(function(){
			next++;
			if(next>=floatTops.length){
				next=0;
			}
			floatTops[next].style.top="30px";
			animate(floatTops[now],{top:-30},300);
			animate(floatTops[next],{top:0},300);
			now=next;
		},2000)
	}

	for(var i=0;i<titleCtns.length;i++){
		moveTop(titleCtns[i]);

	}


}


	