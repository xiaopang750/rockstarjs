(function(){

	function getXY(obj)
	{
	  var x=0;
	  var y=0;
	  
	  while(obj)
	  {
	    x+=obj.offsetLeft;
		y+=obj.offsetTop;
		obj=obj.offsetParent;
	  }
	  
	  return {left:x,top:y};
	}

	function setStyle(obj,json)
	{
	  for (var i in json)
	  {
	    obj.style[i]=json[i];
	  }
	}

	function addEvent(obj,sEv,fn)
	{
	  if(obj.attachEvent)
	  {
	    obj.attachEvent('on'+sEv,fn);
	  }
	  else
	  {
	    obj.addEventListener(sEv,fn,false);
	  }
	}

	function AutoComplete(obj,sourse)
	{
	  var _this=this;
	  
	  this.iNow = -1;

	  this.obj = obj;

	  this.paddingLeft = parseInt($(this.obj).css('paddingLeft'));
	  
	  this.left=/*getXY(this.obj).left;*/ $(this.obj).offset().left - 8;
	  
	  this.top=getXY(this.obj).top+this.obj.offsetHeight+5;
	  
	  this.value=this.obj.value;
	  
	  this.oDiv=document.createElement("div");
	  
	  this.oDiv.className='auto';
	  
	  this.oDiv.innerHTML=
	  '<ul></ul>'
	  
	  this.oUl=this.oDiv.children[0];
	  
	  this.arr=sourse;
	  
	  //初始化方法
	  this._set();
	  
	  this._create();

	  this._search();
	  
	  this._key();
	  
	  this._over();
	  
	  this._out();
	  
	  addEvent(document,'click',function(){
	  
	    _this._hide();
		
	  })
	  
	  document.body.appendChild(this.oDiv);
	}
	//设置样式
	AutoComplete.prototype._set=function()
	{	
	  setStyle(this.oDiv,{left:this.left+'px',top:this.top+'px',position:'absolute',display:'none'});
	}

	//创建元素
	AutoComplete.prototype._create=function()
	{
	  for (var i=0;i<this.arr.length;i++)
	  {
	     var oLi=document.createElement("li");
		 
		 oLi.innerHTML=this.arr[i];
		 
		 this.oUl.appendChild(oLi); 
	  }
	}

	//显示
	AutoComplete.prototype._show=function()
	{	

	   this.oDiv.style.display='block';
	}

	//隐藏
	AutoComplete.prototype._hide=function()
	{
	   this.oDiv.style.display='none';
	}

	//匹配
	AutoComplete.prototype._search=function()
	{
	  var _this=this;

	  this.obj.onkeyup=function(ev)
	  {
	     var oEvent=ev||event;
		 
		 var code=oEvent.keyCode;
		 
		 if(code==13)
		 {  
		   _this.oDiv.style.display='none';
		 }
		 else if(code<37||code>40)
		 {   
		     _this.value=_this.obj.value;
			 
			_this.iNow=0;
			
			for (var i=0;i<_this.oUl.children.length;i++)
			{  
			  _this.oUl.children[i].className='';
			}
			
			_this._keyup(_this.value);
		 }
		  
	  }
	}

	//按键
	AutoComplete.prototype._keyup=function(sValue)
	{
	     var _this=this;

	     var count=0;
		 
		 for (var i=0;i<this.oUl.children.length;i++)
		 {
		   this.oUl.children[i].style.display='none';
		   
		   if((this.oUl.children[i].innerHTML.toLowerCase()).indexOf(sValue.toLowerCase())!=-1&&sValue!='')
		   {  
		     this.oDiv.style.display='block';
		     this.oUl.children[i].style.display='block';
			 
			 this.oUl.children[i].onclick=function(ev)
			 {  
			    _this._onclick(ev,this) 
			 }
		   }
		   else
		   {
		      count++;
		   }
		 }
	     
		 if(count==this.oUl.children.length)
		 {
		    this.oDiv.style.display='none';
		 }
	}

	//点击选择
	AutoComplete.prototype._onclick=function(ev,oThis)
	{	
	    var oEvent=ev||event;		
		this.obj.value=oThis.innerHTML;
		this.oDiv.style.display='none';
		oEvent.cancelBubble=true;

		this.afterClick && this.afterClick(oThis.innerHTML);
	}

	//上下选择
	AutoComplete.prototype._key=function()
	{
	   var _this=this;

	   this.aLi=[];

	   this.obj.onkeydown=function(ev)
	   {     
	     var oEvent=ev||event;
		 
		 var code=oEvent.keyCode;
		 
		 _this.aLi=[];
		 
		 if(code==38)
		 {
		    _this.iNow--;
		    
		    _this._tab();
		 }
		 
		 else if(code==40)
		 {
		    _this.iNow++;
		    
		    _this._tab();
		 }
		 
		 else if(code==13)
		 {	
		    _this.oDiv.style.display='none';
		    _this.afterClick && _this.afterClick(_this.obj.value);
		 }
	   }
	}

	//切换
	AutoComplete.prototype._tab=function()
	{   
	    for (var i=0;i<this.oUl.children.length;i++)
		{
			if(this.oUl.children[i].style.display=='block')
			{
			   this.aLi.push(this.oUl.children[i]);
			}
		}
		
		var oLi=document.createElement('li');
		
		oLi.innerHTML=this.value;
		
		this.aLi.unshift(oLi);
		
		if(this.iNow==this.aLi.length)
		{ 
		  this.iNow=0;
		}
		
		if(this.iNow<0)
		{
		  this.iNow=this.aLi.length-1;
		}
		
		if(this.aLi.length)
		{
			for (var i=0;i<this.aLi.length;i++)
			{
				this.aLi[i].className='';
			}
		
			this.aLi[this.iNow].className='active';
			this.obj.value=this.aLi[this.iNow].innerHTML; 
		}
	}

	//移入
	AutoComplete.prototype._over=function()
	{
	   var _this=this;

	   for (var i=0;i<this.oUl.children.length;i++)
	   {
	      this.oUl.children[i].onmouseover=function()
		  {
		      for (var i=0;i<_this.oUl.children.length;i++)
			  {
			     _this.oUl.children[i].className='';
			  }
			  
			  this.className='active';
		  } 
	   }
	}

	//移出
	AutoComplete.prototype._out=function()
	{
	   var _this=this;

	   for (var i=0;i<this.oUl.children.length;i++)
	   {
	      this.oUl.children[i].onmouseout=function()
		  {
		      for (var i=0;i<_this.oUl.children.length;i++)
			  {
			     _this.iNow=0;
			     _this.oUl.children[i].className='';
			  }
		  } 
	   }
	}

	window.AutoComplete = AutoComplete;

})();