/**
 *description:图片自适应容器
 *author:fanwei
 *date:2013/06/01
 */

/*
    aEle: img dom arr，img dom数组

*/

define(function(require, exports, module) {
	
	function updateImg(options,fn) {

        var webkitDelay=100;
     	var height=0;
     	var width=0;    	
     	var maxHeight=parseInt(options.wrapHeight)||0;
     	var maxWidth=parseInt(options.wrapWidth)||0;
        var info=[];
        var count=0;
     	var aImg=options.aEle||null;
     	var scale=parseInt(maxHeight)/parseInt(maxWidth);
     	var num=aImg.length;
        var inCss="position:static;*position:absolute;top:50%;";
        var outCss="width:"+maxWidth+"px;height:"+maxHeight+"px;position: relative;display: table-cell;vertical-align:middle;text-align:center";
        var imgCss="position:static;*position:relative;top:-50%;left:-50%;";
        var _src=options.loading;
        var count=0;

     	for (var i=0;i<num;i++) {

            var tmp=aImg[i].src;
            aImg[i].oldWidth=aImg[i].width;
            aImg[i].oldHeight=aImg[i].height;
            aImg[i].parentNode.style.cssText="overflow:hidden;width:"+maxWidth+"px;height:"+maxHeight+"px";
            aImg[i].setAttribute('_src',tmp);
            //aImg[i].src=_src; 
            wrap(aImg[i],'<div class="middle-out"><div class="middle-in"></div></div>'); 
            aImg[i].parentNode.style.cssText=inCss;
            aImg[i].parentNode.parentNode.style.cssText=outCss;
            aImg[i].style.cssText=imgCss;
            
     		var oImage=new Image();

     		(function(index){

		     	oImage.onload=function() {

                  count++; 

                  aImg[index].src=aImg[index].getAttribute('_src');

		          height=this.height; 

		          width=this.width;  
                                 
		          judge(aImg[index],width,height,function(data){

                    info.push(data);

                    if(fn) {

                        fn(info)
                    }

                  });
		     	};

	     	})(i);

	     	oImage.src=tmp;
     	}

     	function judge(obj,oldWidth,oldHeight,fn) { 
            
     	  var scaleNow=height/width;

     	  if(scaleNow>scale) {

     	  	if(height>maxHeight) {

     	  		obj.height=maxHeight;
     	  	}
     	  }
     	  else {

     	  	if(width>maxWidth) {

     	  		obj.width=maxWidth;
     	  	}
     	  }
          //解决chorome图片高度的问题

          if(/webkit/gi.test(window.navigator.userAgent)) {

            setTimeout(function(){
                if(fn)fn({left:getXY(obj).left,top:getXY(obj).top,width:obj.width,height:obj.height,oldWidth:oldWidth,oldHeight:oldHeight});
            },webkitDelay);
          }
          else {    
               if(fn)fn({left:getXY(obj).left,top:getXY(obj).top,width:obj.width,height:obj.height,oldWidth:oldWidth,oldHeight:oldHeight});    
          }
          
	    }
     	
    }

    function wrap(obj,str) {
	    var oParent=obj.parentNode;

	    var re=/<+/g;

	    var max=parseInt(str.match(re).length/2);

	    var count=0;

	    var tmp=null;

	    oParent.innerHTML=str;
	  
	    findChild(oParent);

	    tmp.appendChild(obj);

	    function findChild(oParent) {

	        count++;

	        oParent=oParent.children[0];

	        if(count==max)
	        { 
	            tmp=oParent;
	            
	            return;
	        }

	        findChild(oParent);
	    }

	}
	
	function getXY(obj) {

	    var x=0;
	    var y=0;

	    while(obj) {

	        x+=obj.offsetLeft;
	        y+=obj.offsetTop;
	        obj=obj.offsetParent;
	    }

	    return {left:x,top:y};
	}	
	
    return updateImg;

});