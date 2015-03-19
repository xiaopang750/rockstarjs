define(function(require, exports, module) {

	function autoComplete(options)
	{
		var obj = options.ele || null;
		var zIndex = options.zIndex || 1;
		var sClass = options.sClass || '';
		var moveLeft = options.moveLeft || 0;
		var moveTop = options.moveTop || 5;
		var borderColor = options.borderColor || '#000';
		var data = options.data || [];
		var maxLength = options.maxLength || 32;

		var aListNum = data.length;
		var iNow = -1;
		var aShow = [];
		var aHide = [];
		var innerWidth = obj.innerWidth();
		var borderWidth = parseInt(obj.css('borderLeftWidth'));
		var borderColor = obj.css('borderLeftColor');
		var height = obj.outerHeight();
		var left = obj.position().left+moveLeft;
		var top = obj.position().top+height+moveTop;
		var oParent = obj.parent();
		var oAutoWrap = $('<div script-role="autoTipWrap"></div>');

		var oUl = null;

		creatDom();
		setDom();
		over();
		clickChoose();
		blurer();
		keyBordChoose();

		/* 创建dom */
		function creatDom()
		{
			oParent.append(oAutoWrap);
			oUl = $('<ul></ul>');
			oAutoWrap.append(oUl);

			for (var i=0; i<aListNum; i++)
			{	
				var oLi = $('<li></li>');

				oLi.css({
					width: innerWidth,
					overflow: 'hidden'
				});

				oLi.html(data[i]);

				oUl.append(oLi);
			}	
		}

		/* 设置dom */
		function setDom()
		{	
			oAutoWrap.addClass(sClass);

			oAutoWrap.css({
				zIndex: zIndex,
				display: 'none',
				position: 'absolute',
				left: left+'px',
				top: top+'px',
				border: borderWidth+'px solid '+borderColor
			});

			oUl.css({
				width: innerWidth+'px'
			});
		}


		function keyBordChoose()
		{	
			obj.keyup(function(e){
				
				var code = e.keyCode;

				if(code === 38)
				{	
					if(aShow.length)up(aShow);			
				}
				else if(code === 40)
				{	
					if(aShow.length) down(aShow);
				}
				else if(code === 13)
				{	
					if(aShow.length) showValue(aShow[iNow]);
				}
				else
				{	
					var str = obj.val();
				
					judge(str);
				}
				
			});	

			obj.keydown(function(e){

			 	var code = e.keyCode;

			 	if(code === 9)
			 	{
			 		wrapHide();
			 	}
			});
				
		}

		function judge(str)
		{	
			var n = str.indexOf('@');

			if(n != -1)
			{	
				var matchStr = str.substring(n+1);
				var beforeStr = str.substring(0,n+1);

				wrapShow();

				matchList(matchStr,beforeStr);
			}
			else if(!str)
			{
				wrapHide();
			}
			else
			{	
				wrapShow();

				for (var i=0; i<aListNum; i++)
				{	
					listShow(oUl.children().eq(i),str+'@', i);
				}

			}
		}

		function matchList(matchStr, beforeStr)
		{	
			aShow = [];

			var wrongCount = 0;

			for (var i=0; i<aListNum; i++)
			{	
				if(data[i].indexOf(matchStr) != -1)
				{	
					listShow(oUl.children().eq(i), beforeStr, i);
				}
				else
				{	
					wrongCount++;

					if(wrongCount === aListNum)
					{
						wrapHide();
					}
					else
					{
						wrapShow();
						listHide(oUl.children().eq(i));
					}
					
				}
			}
		}

		function wrapShow()
		{	
			oAutoWrap.show();
		}

		function wrapHide()
		{
			oAutoWrap.hide();

			oUl.children().removeClass('acter');

			iNow = -1;

			aShow = [];
		}

		function listShow(oList, beforeStr, i)
		{	
			var newStr = beforeStr.length > maxLength ? beforeStr.substring(0, maxLength) + '...@' : beforeStr;

			oList.attr('realData', beforeStr + data[i]);

			iNow = -1;

			oList.show();

			oList.html('<span>' + newStr + data[i] +'</span>');

			aShow.push(oList);
		}

		function listHide(oList)
		{
			oList.hide();
		}

		function over()
		{ 	
			oUl.children().mouseover(function(){

				var index = oUl.children().index(this);

				iNow = index;

				tab(oUl.children().eq(index));
			})
		}

		function blurer()
		{	
			$(document).click(function(){

				wrapHide();
			});
		}

		function clickChoose()
		{	

			oUl.children().click(function(){

				showValue($(this));

				wrapHide();

				obj.trigger('focus');

				obj.trigger('blur');

				return false;
			});
		}

		function showValue(oThis)
		{	
			if(oThis)
			{
				obj.val(oThis.attr('realData'));

				wrapHide();
			}
			
		}

		function tab(oThis)
		{	
			oThis.addClass('acter').siblings().removeClass('acter');
		}

		function up(aShow)
		{	
			var num = aShow.length;

			iNow--;

			if(iNow<0)
			{
				iNow = num-1;
			}

			tab(aShow[iNow]);
		}

		function down(aShow)
		{	
			var num = aShow.length;

			iNow++;	

			if(iNow > num-1)
			{
				iNow = 0;
			}

			tab(aShow[iNow]);			
			
		}

	}

	return autoComplete;

});