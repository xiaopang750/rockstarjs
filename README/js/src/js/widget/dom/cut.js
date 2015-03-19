/**
 *description:裁切
 *author:fanwei
 *date:2013/08/01
 */

/*  
   如果觉得不方便请使用 Jcrop.js http://hi.baidu.com/zwfec/item/feaa7ece8df24c3299b49897
   裁切: 

   该裁切不需要上传后返回缩小后的图;故width,height参数为缩略图的比例,并且需要配合update.js自适应区域的模块使用;

   @param: 
   oWrap: 需要裁切的区域;
   oImage: 被裁切的图片;
   oView: 预览的小图区域;
   width: 缩略图宽度;
   height: 缩略图高度;
   oldWidth: 图片原始宽度;
   oldHeight: 图片原始高度;
   left: 裁切框在中心区域的偏移默认为0，在中心位置;
   top: 同上
   scaleWidth: 宽度比例
   scaleHeight: 高度比例,scaleWidth/ scaleHeight == 1则说明为正方形;
   fnDo: 点击确定裁切的回调函数,会返回一个data参数里面有左上角坐标的信息,以及比例,裁切宽高;
  
   调用请参考sub目录下cut/cut.js

  cutImage({
        oWrap: this.oCutWrap,
        oImage:$('[script-role = cut_image]').get(0),
        oView:this.oView,
        oSubmintBtn:this.oSave,
        width:data[0].width,
        height:data[0].height,
        oldWidth:data[0].oldWidth,
        oldHeight:data[0].oldHeight,
        left:data[0].left,
        top:data[0].top,
        scaleWidth: this.scaleWidth,
        scaleHeight: this.scaleHeight,
        fnDo:function(info)
        {   
          param.x = info.x;
          param.y = info.y;
          param.cutwidth = info.cutwidth;
          param.cutheight = info.cutheight;
          param.source = info.tmpimg;

          $.post(_this.cutUrl, param, function(data){

            if( !data.err ) {

              _this.cutInit();
              oCutBox.close();

              _this.oNowView.attr('src', data.data +'?'+ rnd(9999,1));
              _this.oNowInput.attr('iamgeurl', data.data);
              _this.oNowInput.attr('iamgename', data.data);
              _this.onconfirm && _this.onconfirm(_this.oForm, data.data);

            } else {

              alert(data.msg);
            }

          }, 'json');
          
          
        }

    });

*/

define(function(require, exports, module) {
	
	function setStyle(obj,json) {

	    for (var i in json)
	    {
	        obj.style[i]=json[i];
	    }
	}

	function getStyle(obj,attr) {

	    if(obj.currentStyle) {

	        return obj.currentStyle[attr];
	    }
	    else {

	        return getComputedStyle(obj,false)[attr];
	    }
	}

  function addEvent(obj, sEv, fn) {

    if(obj.attachEvent) {

      obj.attachEvent('on'+sEv, fn);

    } else {

      obj.addEventListener(sEv, fn, false);

    }

  }

  function offset(obj){

    var x = 0;
    var y = 0;

    while(obj) {

      x+=obj.offsetLeft;
      y+=obj.offsetTop;
      obj = obj.offsetParent;

    }

    return {left:x,top:y};

  }	

	function cut_image(options) {

      var oShadow=document.createElement('div');
      var oCover=document.createElement('div');
      var oImage=options.oImage||null;
      var oView=options.oView||null;
      var oViewWidth=0;
      var oSubmintBtn=options.oSubmintBtn||null;
      var oCoverImage=null;
      var oViewImage=null;
      var aDragDiv=null;
      
      var src=oImage.src;
      var fnDo=options.fnDo||null;
      var width=options.width||0;
      var height=options.height||0;
      var oldWidth=options.oldWidth||0;
      var oldHeight=options.oldHeight||0;
      var left=options.left||0;
      var top=options.top||0;
      var scaleWidth = parseInt(options.scaleWidth) || '';
      var scaleHeight = parseInt(options.scaleHeight) || '';
      var coverWidth=Math.floor(width*scaleWidth/100);
      var coverHeight=Math.floor(width*scaleHeight/100);
      var coverLeft=Math.floor((width-coverWidth)/2)+left;
      var coverTop=Math.floor((height-coverHeight)/2)+top;
      
      var dotWidth=options.dotWidth||6;
      var dowHeight=options.dotHeight||6;
      var dotIndex=options.dotIndex||6;
      var lineWidth=options.lineWidth||2;
      var lineHeight=options.lineHeight||2;
      var lineIndex=options.lineIndex||5;
      var lineUrl=options.lineUrl||'/static/images/lib/global/line.gif';
      var cutScale = options.cutScale || (scaleHeight/scaleWidth); //以横坐标来算

      //progress:1.设置移动层  2.设置移动层内的图片 3.设置遮罩层 4.设置可预览层 5.拖动 6.获取信息
      set_oCover();

      set_oCoverImage();

      set_oShadow();

      oViewWidth=set_oView();

      setView(oCover.offsetWidth,oCover.offsetLeft,oCover.offsetTop);

      aDragDiv=createChangeDiv();

      change_oCover(aDragDiv);

      getInfo();

      //初始化拖动层
      function set_oCover() {

          oCover.innerHTML='<img src='+src+'>';
          oCover.id='cover_added';
          oCoverImage=oCover.children[0];
          oCoverImage.width=width;
          oCoverImage.height=height;

          setStyle(oCover,{
            position:'fixed',
            zIndex:12002,
            cursor:'move',
            left:coverLeft+'px',
            top:coverTop+'px',
            width:coverWidth+'px',
            height:coverHeight+'px',
            background:'#fff',
            overflow:'hidden'
          });

          var oAdded=document.getElementById('cover_added');

          if(oAdded)document.body.removeChild(oAdded);

          document.body.appendChild(oCover);
      }

      //初始化拖动层内的img
      function set_oCoverImage() {

        setStyle(oCoverImage,{
          position:'absolute',
          left:-(coverLeft-left)+'px',
          top:-(coverTop-top)+'px'
        });
      }

      //初始化背景层(制造阴影)
      function set_oShadow() {

          oShadow.id='shadow_added';

          setStyle(oShadow,{
            width:width+'px',
            height:height+'px',
            left:left+'px',
            top:top+'px',
            position:'fixed',
            zIndex:12001,
            background:'#000',
            opacity:0.6,
            filter:'alpha(opacity=60)'
          });

          var oAdded=document.getElementById('shadow_added');

          if(oAdded)document.body.removeChild(oAdded);

          document.body.appendChild(oShadow);

          addEvent(window, 'resize', function(e){

              var l,
                  t;

              l = $(oImage).offset().left;//offset(oImage).left;
              t = $(oImage).offset().top;//offset(oImage).top;    

              setStyle(oShadow,{
                left:l+'px',
                top:t+'px'
              });

              coverLeft=Math.floor((width-coverWidth)/2)+l;
              coverTop=Math.floor((height-coverHeight)/2)+t;

              setStyle(oCover,{
                left:coverLeft+'px',
                top:coverTop+'px'
              });

              setStyle(oCoverImage,{
                left:-(coverLeft-l)+'px',
                top:-(coverTop-t)+'px'
              });

              left = l;
              top = t;

          });
      }


      //初始化预览区域
      function set_oView() {

          oView.style.overflow='hidden';
          oView.style.position='relative';
          oView.innerHTML='<img src='+src+'>';
          oViewImage=oView.children[0];
          oViewImage.style.position='absolute';

          var oViewWidth=oView.offsetWidth+parseInt(getStyle(oView,'borderLeftWidth'))+parseInt(getStyle(oView,'borderLeftWidth'));

          return oViewWidth;
      }


      //创建可拖动的div
      function createChangeDiv() {

        var arr=['lt','lb','rt','rb','l','r','t','b','c'];

        var aDiv=[];

        var num=arr.length;
        
        var info=[

         {width:dotWidth+'px',height:dowHeight+'px',position:'absolute',zIndex:dotIndex,cursor:'nw-resize',overflow:'hidden',background:'#000',left:0,top:0,border:'1px solid #fff'},

         {width:dotWidth+'px',height:dowHeight+'px',position:'absolute',zIndex:dotIndex,cursor:'sw-resize',overflow:'hidden',background:'#000',left:0,bottom:0,border:'1px solid #fff'},

         {width:dotWidth+'px',height:dowHeight+'px',position:'absolute',zIndex:dotIndex,cursor:'ne-resize',overflow:'hidden',background:'#000',right:0,top:0,border:'1px solid #fff'},

         {width:dotWidth+'px',height:dowHeight+'px',position:'absolute',zIndex:dotIndex,cursor:'se-resize',overflow:'hidden',background:'#000',right:0,bottom:0,border:'1px solid #fff'},

         {width:lineWidth+'px',height:'100%',position:'absolute',zIndex:lineIndex,cursor:'w-resize',overflow:'hidden',background:'url('+lineUrl+') repeat-y',left:0,top:0},

         {width:lineWidth+'px',height:'100%',position:'absolute',zIndex:lineIndex,cursor:'e-resize',overflow:'hidden',background:'url('+lineUrl+') repeat-y',right:0,top:0},

         {width:'100%',height:lineHeight+'px',position:'absolute',zIndex:lineIndex,cursor:'n-resize',overflow:'hidden',background:'url('+lineUrl+') repeat-x',left:0,top:0},

         {width:'100%',height:lineHeight+'px',position:'absolute',zIndex:lineIndex,cursor:'s-resize',overflow:'hidden',background:'url('+lineUrl+') repeat-x',left:0,bottom:0},

         {width:'95%',height:'95%',position:'absolute',zIndex:lineIndex,cursor:'move',overflow:'hidden',background:'#000',left:'2.5%',top:'2.5%',opacity:'0',filter:'alpha(opacity=0)'}

        ]
        
        for (var i=0;i<num;i++) {

          var oChangeDiv=document.createElement('div');

          oChangeDiv.className=arr[i];

          setStyle(oChangeDiv,info[i]);

          aDiv.push(oChangeDiv);

          oCover.appendChild(oChangeDiv);
        }

        return aDiv;
      }

      //改变拖动层
      function change_oCover(aEle) {

         var num=aEle.length;

         for (var i=0;i<num;i++)
         {
            Dir_drag(aEle[i]);
         }
      }

      //改变拖动层的方法
      function Dir_drag(obj) {
        //width ,height ,left ,top(图像初始化信息)
        var oParent=obj.parentNode;
        var minWidth=27;
        var minHeight=37;

        obj.onmousedown = function(ev) {
          
          var oEvent=ev||event;
          var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
          var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;

          //left
          if(obj.className.indexOf('l')!=-1) {

            var downX=oEvent.clientX;
            var downWidth=oParent.offsetWidth;
            var downLeft=oParent.offsetLeft;
          }

          //right
          if(obj.className.indexOf('r')!=-1) {

            var disX=oEvent.clientX-this.offsetLeft-scrollLeft;
          }

          //top
          if(obj.className.indexOf('t')!=-1) {

            var downY=oEvent.clientY;
            var downHeight=oParent.offsetHeight;
            var downTop=oParent.offsetTop;
          }

          //bottom
          if(obj.className.indexOf('b')!=-1) {

            //var disY=oEvent.clientY-this.offsetTop-scrollTop;
            var disY=oEvent.clientY-this.offsetTop;
          }

          //center
          if(obj.className.indexOf('c')!=-1) {
            
             var disX=oEvent.clientX-oParent.offsetLeft-scrollLeft;
             var disY=oEvent.clientY-oParent.offsetTop-scrollTop;
          }

          if(obj.setCapture) {

            obj.onmousemove=fnMove;
            obj.onmouseup=fnUp;
            obj.setCapture();
          }
          else {
            document.onmousemove=fnMove;
            document.onmouseup=fnUp;
          }

          return false;
          
          function fnMove(ev) {

            var oEvent=ev||event;
            var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
            var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;

            //left
            if(obj.className.indexOf('l')!=-1) {

              var _downX=oEvent.clientX-downX;

              if(_downX>=downWidth-minWidth)_downX=downWidth-minWidth;
              if(_downX<=left-downLeft)_downX=left-downLeft;
              if(_downX*(cutScale)<=downWidth*cutScale+oParent.offsetTop-height-top)_downX=(downWidth*cutScale+oParent.offsetTop-height-top)*(1/cutScale);

              var _width=downWidth-_downX;
              var _left=downLeft+_downX;
              var imageLeft=-(_left-left);

              oParent.style.width=_width+'px';
              oParent.style.height=_width*cutScale+'px';

              oParent.style.left=_left+'px';
              oCoverImage.style.left=imageLeft+'px';
            }

            //right
            if(obj.className=='r') {

              var x=oEvent.clientX-disX+obj.offsetWidth;

              if(x<minWidth)x=minWidth;
              if(x>=width-(oParent.offsetLeft-left))x=width-(oParent.offsetLeft-left);
              if(cutScale*x>=height-(oParent.offsetTop-top)) x=(height-(oParent.offsetTop-top))*(1/cutScale);

              oParent.style.width=x+'px';
              oParent.style.height=cutScale*x+'px';
            }

            //top
            if(obj.className.indexOf('t')!=-1) {

              var _downY=oEvent.clientY-downY;

              if(_downY>=downHeight-minHeight)_downY=downHeight-minHeight;
              if(_downY<=top-downTop)_downY=top-downTop;
              if(_downY*(1/cutScale)<=oParent.offsetLeft+downHeight*(1/cutScale)-left-width) {

              	_downY=(oParent.offsetLeft+downHeight*(1/cutScale)-left-width)*cutScale;
              } 
              	
              var _height=downHeight-_downY;
              var _top=downTop+_downY;
              var imageTop=-(_top-top);

              oParent.style.height=_height+'px';
              oParent.style.width=_height*(1/cutScale)+'px';
              oParent.style.top=_top+'px';

              oCoverImage.style.top=imageTop+'px';
            }

            //bottom
            if(obj.className.indexOf('b')!=-1) {

              var y=oEvent.clientY-disY+obj.offsetHeight;

              if(y<=minHeight)y=minHeight;
              if(y>=height-(oParent.offsetTop-top))y=height-(oParent.offsetTop-top);
              if(y*(1/cutScale)>=width-(oParent.offsetLeft-left))y=(width-(oParent.offsetLeft-left))*cutScale;

              oParent.style.height=y+'px';
              oParent.style.width=y*(1/cutScale)+'px';
            }

            //left_top
            if(obj.className=='lt') {

              var _downX=oEvent.clientX-downX;

              if(_downX>=downWidth-minWidth)_downX=downWidth-minWidth;
              if(_downX<=left-downLeft)_downX=left-downLeft;
              if(_downX<=top-downTop)_downX=(top-downTop);
              if(-(_downX/cutScale/2)>(height-((downTop)-top+downHeight))) {
              	_downX = -(height-((downTop)-top+downHeight))*2*cutScale;
              }

              //console.log((_downX) + ',' + (top-downTop));
              var _width=downWidth-_downX;
              var _left=downLeft+_downX;
              var imageLeft=-(_left-left);

              var _height=downHeight-_downX;
              var _top=downTop+_downX;
              var imageTop=-(_top-top);

              oParent.style.width=_width+'px';
              oParent.style.height=_width * cutScale +'px';

              oParent.style.left=_left+'px';
              oParent.style.top=_top+'px';

              oCoverImage.style.left=imageLeft+'px';
              oCoverImage.style.top=imageTop+'px';
            }

            //left_bottom 
            if(obj.className=='lb') {

              var _downX=oEvent.clientX-downX;

              if(_downX>=downWidth-minWidth)_downX=downWidth-minWidth;
              if(_downX<=left-downLeft)_downX=left-downLeft;
              if(_downX*(cutScale)<=downWidth*cutScale+oParent.offsetTop-height-top)_downX=(downWidth*cutScale+oParent.offsetTop-height-top)*(1/cutScale);

              var _width=downWidth-_downX;
              var _left=downLeft+_downX;
              var imageLeft=-(_left-left);

              oParent.style.width=_width+'px';
              oParent.style.height=_width*cutScale+'px';

              oParent.style.left=_left+'px';

              oCoverImage.style.left=imageLeft+'px';
            }

            //center
            if(obj.className.indexOf('c')!=-1) {

              var x=oEvent.clientX-disX-scrollLeft;
              var y=oEvent.clientY-disY-scrollTop;
              var minLeft=left;
              var maxLeft=left+width-oParent.offsetWidth;
              var minTop=top;
              var maxTop=top+height-oParent.offsetHeight;

              if(x<minLeft)x=minLeft;
              if(x>maxLeft)x=maxLeft;
              if(y<minTop)y=minTop;
              if(y>maxTop)y=maxTop;

              var imageLeft=-(x-left);
              var imagetTop=-(y-top);

              oCoverImage.style.left=imageLeft+'px';
              oCoverImage.style.top=imagetTop+'px';
              obj.parentNode.style.left=x+'px';
              obj.parentNode.style.top=y+'px';
            }

            setView(oParent.offsetWidth,oCover.offsetLeft,oCover.offsetTop);

          }

          function fnUp() {

            this.onmouseup=null;
            this.onmousemove=null;
            if(this.releaseCapture)
            {
              this.releaseCapture();
            }
          }
        }
      }

      function getInfo() {

        var reOrgPic = new RegExp('http://'+window.location.host,'gi');

        oSubmintBtn.onclick=function() {

          var info={};

          /* 户型图上传要重新计算一次比例 旋转是temp图 保存是原图 */
          /*if(this.getAttribute('page-role') == 'upload_lay_pic') {

              var oldWidth = parseInt(this.getAttribute('img_width'));
              var oldHeight = parseInt(this.getAttribute('img_height')); 
          }*/

          info.scale=oldWidth>oldHeight?height/oldHeight:width/oldWidth;
          info.tmpimg = oImage.src.split('?')[0].replace(reOrgPic, '');
          info.x=(oCover.offsetLeft-left)/info.scale;
          info.y=(oCover.offsetTop-top)/info.scale;

          info.cutwidth=oCover.offsetWidth/info.scale;
          info.cutheight=info.cutwidth * cutScale;
          info.oldWidth = oldWidth;

          if(fnDo)fnDo(info);
        };
      }

      //设置预览图像区域图片的样式
      function setView(nowWidth,nowLeft,nowTop) {
       
        var _left=nowLeft-left; 
        var _top=nowTop-top;

        var scale=width/(nowWidth-lineWidth*2); 
        var scale2=width/oViewWidth;

        var viewImageWidth=width*scale/scale2;
        var viewImageLeft=-_left*scale/scale2;
        var viewImageTop=-_top*scale/scale2

        oViewImage.width=viewImageWidth;
        oViewImage.style.left=viewImageLeft+'px';
        oViewImage.style.top=viewImageTop+'px';
      }

    }  

	return  cut_image; 

});