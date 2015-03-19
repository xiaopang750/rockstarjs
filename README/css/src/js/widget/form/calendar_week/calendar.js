/**
 *description:title
 *author:fanwei
 *date:2014/10/15
 */	
define(function(require, exports, module){
	
	require('../../../../css/widget/form/calendar_week/calendar.css');

	/*dialog*/
	var dialog = require('../../dom/dialog');
	var boxHmtl = 
	'<div class="nr-box calendar-week-box">'+
		'<a href="javascript:;" class="close" sc="close">×</a>'+
		'<div class="inner-wrap">'+
			'<div class="mb-10">'+
				'<p>标题：</p>'+
				'<input class="form-control" calendar-name>'+
			'</div>'+
			'<div class="mb-10">'+
				'<p>内容：</p>'+
				'<textarea class="form-control h-sm" calendar-content></textarea>'+
			'</div>'+
			'<div>'+
				'<a class="btn btn-primary" href="javascript:;" calendar-btn>确定</a>'+
			'</div>'+
		'</div>'+
	'</div>';
	var oWriteBox = new dialog({
		boxStr: boxHmtl
	});

	/* --------common------------- */
	function goto(url){
		window.location.href=url;
	}
	//添加事件
	function addEvents(obj,eventName,funName){
		if(window.addEventListener){
			obj.addEventListener(eventName,funName,false);
		}else{	
			obj.attachEvent('on'+eventName,funName);
		}
	}

	var isIE=function(){
		if (window.XMLHttpRequest&&!window.ActiveXObject) { 
			return false;
		}
		return true;
	}
	function getOffsetY(event){
		if (isIE()){
			return event.offsetY;
		}else{
			return event.layerY;	
		}
	}
	function getOffsetX(event){
		if (isIE()){
			return event.offsetX;
		}else{
			return event.layerX;	
		}
	}
	function getEventObj(event){
		if (isIE()){
			return event.srcElement;
		}else{
			return event.target;
		}
	}
	function getWinWidth(){
		this.winWidth;
		if(window.innerWidth){
			this.winWidth=window.innerWidth;
		}else if((document.body)&&(document.body.clientWidth)){
			this.winWidth=document.body.clientWidth;
		}
		
		if(document.documentElement && document.documentElement.clientWidth){
			this.winWidth=document.documentElement.clientWidth;
		}
		return this.winWidth;
	}

	function getWinHeight(){
		this.winHeight;
		if(window.innerHeight){
			this.winHeight=window.innerHeight;
		}else if((document.body)&&(document.body.clientHeight)){
			this.winHeight=document.body.clientHeight;
		}
		
		if(document.documentElement && document.documentElement.clientHeight){
			this.winHeight=document.documentElement.clientHeight;
		}
		return this.winHeight;
	}
	//格式化日期
	Date.prototype.format=function(fmt){
		var o={
				"M+":this.getMonth()+1,
				"d+":this.getDate(),
				"h+":this.getHours(),
				"m+":this.getMinutes(),
				"s+":this.getSeconds(),
				"q+":Math.floor( (this.getMonth()+3)/3 ),  //季度
				"s+":this.getMilliseconds() //毫秒
			};
		if(/(y+)/.test(fmt))
		fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));
		for(var k in o){
			if(new RegExp("("+k+")").test(fmt))
			fmt=fmt.replace(RegExp.$1,(RegExp.$1.length==1)?(o[k]):(("00"+o[k]).substr((""+o[k]).length)));	
		}		
		return fmt;
	}
	Date.prototype.addDays=function(d){
		this.setDate(this.getDate()+d);	
	}
	function addDays(date,d){
		var newdate=new Date(date.format("MM/dd/yyyy"))
		newdate.setDate(newdate.getDate()+d);
		return newdate;	
	}
	Date.prototype.addWeeks=function(w){
		this.addDays(w*7);	
	}
	Date.prototype.addMonths=function(m){
		var d=this.getDate();
		this.setMonth(this.getMonth()+m);
		if(this.getDate()<d){
			this.setDate(0); // 取上个月的最后一天	
		}
	}
	Date.prototype.addYears=function(y){
		var m=this.getMonth();
		this.setFullYear(this.getFullYear()+y);
		if(m<this.getMonth()){
			this.setDate(0);  // 取上个月的最后一天	
		}	
	}
	//ID选择器
	function _(id){
		this.domObj=document.getElementById(id);
		if(!this.domObj) return;
		this.domObj.addClass = function(className){
			var elementClassName = this.className;
			if (elementClassName.length == 0)
			{
				this.className = elementClassName;
				return;
			}
			if (elementClassName == className || elementClassName.match(new RegExp("(^|\\s)" + className + "(\\s|$)")))
				return;
			this.className = elementClassName + " " + className;
		}
		this.domObj.removeClass = function(className)
		{
			var elementClassName = this.className;
			if (elementClassName.length == 0) return;
			if(elementClassName == className)
			{
				this.className = "";
				return;
			}
			if (elementClassName.match(new RegExp("(^|\\s)" + className + "(\\s|$)")))
				this.className = elementClassName.replace((new RegExp("(^|\\s)" + className + "(\\s|$)"))," ");
		}
		this.domObj.hasClass = function(className)
		{
			var elementClassName = this.className;
			if (elementClassName.length == 0) return false;
			//用正则表达式判断多个class之间是否存在真正的class（前后空格的处理）
			if (elementClassName == className || elementClassName.match(new RegExp("(^|\\s)" + className + "(\\s|$)")))
			  return true;
			return false;
		}
		return this.domObj;
	}
	function _n(name){
		return document.getElementsByTagName(name);
	}

	function _c(object, tag, className) {
		var o = object.getElementsByTagName(tag);
		for ( var i = 0, n = o.length, ret = []; i < n; i++)
			if (o[i].className == className) ret.push(o[i]);
		if (ret.length == 1) ret = ret[0];
		return ret;
	}
	function _create(tag){
		return document.createElement(tag);	
	}
	function isArray(v) { 
	  return Object.prototype.toString.apply(v) === '[object Array]'; 
	} 
	function isObject(v) { 
	  return Object.prototype.toString.apply(v) === '[object Object]'; 
	} 
	/* --------------common--------------- */


	/* ----------------lang---------------- */

	var Language=function(language){
	
		if(language=='chinese') this.language=chinese;
		else this.language=english;
		this.language.timeArray= new Array(12,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11);
		this.language.time12hm=new Array('12:00 am','12:30 am','1:00 am','1:30 am','2:00 am','2:30 am',
										 '3:00 am','3:30 am','4:00 am','4:30 am','5:00 am','5:30 am',
										 '6:00 am','6:30 am','7:00 am','7:30 am','8:00 am','8:30 am',
										 '9:00 am','9:30 am','10:00 am','10:30 am','11:00 am','11:30 am',
										 '12:00 pm','12:30 pm','1:00 pm','1:30 pm','2:00 pm','2:30 pm',
										 '3:00 pm','3:30 pm','4:00 pm', '4:30 pm','5:00 pm','5:30 pm',
										 '6:00 pm','6:30 pm','7:00 pm','7:30 pm','8:00 pm','8:30 pm',
										 '9:00 pm','9:30 pm','10:00 pm','10:30 pm','11:00 pm','11:30 pm','12:00 pm','12:30 pm');
		return this.language;	 
	}
	var chinese={
				'type':'chinese',
				'weekArray':new Array("星期日","星期一", "星期二", "星期三", "星期四", "星期五", "星期六"),
				'week':'周',
				'year':'年',
				'month':'月',
				'day':'日',
				'date':'日期',
				'title':'标题',
				'content':'内容',
				'event':'事件',
				'create_action':'创建事件',
				'edit_detail':'编辑活动详细信息',
				'today':'今天'
			};
		var english={
				'type':'english',
				'weekArray':new Array('Sunday', 'Monday','Tuesday','Wednesday', 'Thursday', 'Friday','Saturday'),
				'monthArray':new Array('January','February','March','April','May','June','July','August','September','October','November','December'),
				'week':'Week',
				'year':'Year',
				'month':'Month',
				'day':'Day',
				'date':'Date',
				'title':'Title',
				'content':'Content',
				'event':'Event',
				'create_action':'Create Event',
				'edit_detail':'Edit Detail',
				'today':'Today'
						  
			};
	var Time_hm=new Array('12:00 am','12:30 am','1:00 am','1:30 am','2:00 am','2:30 am','3:00 am','3:30 am','4:00 am','4:30 am','5:00 am',
						  '5:30 am','6:00 am','6:30 am','7:00 am','7:30 am','8:00 am','8:30 am','9:00 am','9:30 am','10:00 am','10:30 am',
						  '11:00 am','11:30 am','12:00 pm','12:30 pm','1:00 pm','1:30 pm','2:00 pm','2:30 pm','3:00 pm','3:30 pm','4:00 pm',
						  '4:30 pm','5:00 pm','5:30 pm','6:00 pm','6:30 pm','7:00 pm','7:30 pm','8:00 pm','8:30 pm','9:00 pm','9:30 pm',
						  '10:00 pm','10:30 pm','11:00 pm','11:30 pm','12:00 pm','12:30 pm');


	/* -----------------lang---------------- */




	/* main */
	function cal_config(op){

		op.wrap.html('<div id="main"><div id="tool"></div><div id="calendar"></div><div id="append" ></div></div>');

		/*document.writeln('<div id="main"><div id="tool"></div><div id="calendar"></div><div id="append" ></div></div>');*/
		try{

			var cr=new Calendar();
				//cr.wrap = op.wrap;

				//cr.wrap.html('<div id="main"><div id="tool"></div><div id="calendar"></div><div id="append" ></div></div>');

				cr.date=op.date;
				cr.mode=op.mode;
				cr.dialog = oWriteBox;

				cr.language=new Language(op.language);

				cr.load();
				cr.tool();

		}catch(e){
			alert('抱歉，出现异常：'+e);	
		}

		return cr;
	}

	//日历对象
	var Calendar=function(){
		this.date;
		this.language;
		
		this.toolBar=_('tool');
		this.content=_('calendar');
		this.content.innerHTML='';
		this.mode;
	}
	//加载日历
	Calendar.prototype.load=function(){
		this.header();
		this.list();
		this.status();
	}
	//日历工具栏面板
	Calendar.prototype.tool=function(){
		this.c_tl_tb=_create('table');	
		this.c_tl_tbody=_create('tbody');
		this.c_tl_tb_tr=_create('tr');
		this.c_tl_tb_td_1=_create('td');
		this.c_tl_tb_td_2=_create('td');
		this.year_a=_create('a');
		this.month_a=_create('a');
		this.week_a=_create('a');
		this.day_a=_create('a');

		

		this.prevMonth_div=_create('div');
		this.nextMonth_div=_create('div');
		this.prevMonth_div.className='prevMonth';
		this.nextMonth_div.className='nextMonth';
		
		this.language_input=_create('input');
		this.language_input.type='hidden';
		this.language_input.id='hidden_language';
		this.language_input.value=this.language.type;
		
		this.tab_input=_create('input');
		this.tab_input.type='hidden';
		this.tab_input.id='tab_input';
		this.tab_input.value=this.mode;
		
		this.c_tl_tb.className='Calendar';
		this.c_tl_tb_tr.className='CalendarOtherMonthDay';
		this.c_tl_tb_td_1.width='200';
		this.c_tl_tb_td_1.style.padding='3px';

		/*
			modify-by-fanwei
		*/
		this.c_tl_tb_td_1.style.display = 'none';

		this.c_tl_tb_td_1.style.textAlign='left';
		this.c_tl_tb_td_2.style.padding='3px';
		this.c_tl_tb_td_2.style.textAlign='left';
		
		addEvents(this.prevMonth_div,'click',Prev);
		addEvents(this.nextMonth_div,'click',Next);
		/*if(this.mode=='year'){
			this.year_a.className='selectTab';
		}else if(this.mode=='month'){
			this.month_a.className='selectTab';
		}else if(this.mode=='week'){
			this.week_a.className='selectTab';
		}else if(this.mode=='day'){
			this.day_a.className='selectTab';
		}*/
		
		/*this.year_a.innerHTML=this.language.year;
		this.month_a.innerHTML=this.language.month;
		this.week_a.innerHTML=this.language.week;
		this.day_a.innerHTML=this.language.day;
		
		this.year_a.href='year.html';
		this.month_a.href='month.html';
		this.week_a.href='week.html';
		this.day_a.href='day.html';*/
		
		this.c_tl_tb_td_1.appendChild(this.year_a);
		this.c_tl_tb_td_1.appendChild(this.month_a);
		this.c_tl_tb_td_1.appendChild(this.week_a);
		this.c_tl_tb_td_1.appendChild(this.day_a);
		this.c_tl_tb_td_2.appendChild(this.prevMonth_div);
		this.c_tl_tb_td_2.appendChild(this.nextMonth_div);
		this.c_tl_tb_td_2.appendChild(this.language_input);
		this.c_tl_tb_td_2.appendChild(this.tab_input);
		this.c_tl_tb_tr.appendChild(this.c_tl_tb_td_1);
		this.c_tl_tb_tr.appendChild(this.c_tl_tb_td_2);
		this.c_tl_tbody.appendChild(this.c_tl_tb_tr);
		this.c_tl_tb.appendChild(this.c_tl_tbody);
		
		this.toolBar.appendChild(this.c_tl_tb);	
	}

	//状态栏
	Calendar.prototype.status=function(){
		this.status=_create('div');
		this.status.className='CalendarNavigator';
		this.status.id='grid_bottom';
		this.status.colspan='1';
		this.status.style.textAlign="left";
		addEvents(this.status,'mouseover',function(){setScrollTop("down")});
		addEvents(this.status,'mouseout',function(){clearTimeout(timer)})
		this.content.appendChild(this.status);
	}
					  
	var isToday=function(date){
		var currentDate= new Date();
		if(typeof(date)=='string'){
			date=new Date(date);
		}
		if(currentDate.format("yyyyMMdd")==date.format("yyyyMMdd")){
			return true;
		}
		return false;
	}

	var isCurrentMonth=function(month){
		var currentDate= new Date();
		
		if(currentDate.format("MM")==month){
			return true;
		}
		return false;
	}						  
						  
	//设置日历格子里的值
	function setEventValue(dt,where){
		
		var w='';
		if(where){
			w=where;
		}
		var year=dt.getFullYear();//年
		var month=dt.getMonth()+1;//月
		var datenum=getDayNumByYearMonth(year,dt.getMonth());              //天数
	    var url='?do=subject.base_find_list&year='+year+'&month='+month+'&date='+datenum+w;
		//getEventsByJson(url);
	}


	//根据年月得到一个月的天数
	function getDayNumByYearMonth(year,month){
		var daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		if(month==1){
			var days=((0==year%4)&&(0!=(year%100)))||(0==year%400)?29:28;
		}else{
			var days=daysInMonth[month];
		}
		return days;
	}

	function getMdyDateAddMonth(date,addMonth){
		var year=date.getFullYear();
		var month=date.getMonth()+1+addMonth;
		var day=date.getDate();
		
		if(month<1){
			month=12;
			year--;		
		}
		if(month>12){
			month=1;
			year++;	
		}
		var mdy=month+"/"+day+"/"+year;
		return mdy;
	}
	function getMdyDateAddDay(date,addDay){
		
		var year=date.getFullYear();
		var month=date.getMonth()+1;
		var day=date.getDate()+addDay;
		
		var dayNum=getDayNumByYearMonth(year,month);
		if(day>dayNum){
			day=day-dayNum;	
			month++;
		}
		if(day<1){
			day=dayNum+day;
			month--;	
		}
		if(month<1){
			month=12;
			year--;		
		}
		if(month>12){
			month=1;
			year++;	
		}
		
		var mdy=month+"/"+day+"/"+year;
		return mdy;
	}


	/* ---------------calendar----------------- */


	/* ---------------month----------------- */

	Calendar.prototype.header=function(){
		this.c_h_tb=_create('table');
		this.c_h_tbody=_create('tbody');
		this.c_h_tb_tr=_create('tr');
		this.c_h_tb_td_l=_create('td');
		this.c_h_tb_th=_create('th');
		this.c_h_tb_td_c=_create('td');
		this.c_h_tb_td_r=_create('td');
		this.c_h_tb_td_img=_create('img');
		this.c_h_tb_td_img2=_create('img');
		this.c_h_tb.className='Header';	
		this.c_h_tb.cellspacing='0';
		this.c_h_tb.cellpadding='0';
		this.c_h_tb.border='0';
		this.c_h_tb_td_l.className='HeaderLeft';
		this.c_h_tb_td_r.className='HeaderRight';
		//this.c_h_tb_td_img.src='images/Spacer.gif';
		//this.c_h_tb_td_img2.src='images/Spacer.gif';
		this.c_h_tb_td_c.className='tbg';
		
		this.hid=_create('input');
		this.hid_rday=_create('input');
		this.hid_rday.type='hidden';
		this.hid_rday.id='rday';
		this.hid.type='hidden';
		this.hid.value=this.date.format("MM/dd/yyyy");
		this.hid.id='date';
		
		if(this.language.type=='chinese'){
			this.c_h_tb_th.innerHTML='<a class="br10" >'+(this.date.getFullYear())+'</a> '+this.language.year
									+' <a class="br10">'+(this.date.getMonth()+1)+'</a> '+this.language.month;
		}else{
			this.c_h_tb_th.innerHTML=(this.date.getFullYear())+' '+this.language.monthArray[this.date.getMonth()];
		}
		
		this.c_h_tb_td_l.appendChild(this.c_h_tb_td_img);
		this.c_h_tb_td_r.appendChild(this.c_h_tb_td_img2);
		
		this.c_h_tb_sz=_create('a');
		this.c_h_tb_sz.className='c_sz';
		this.c_h_tb_td_c.appendChild(this.c_h_tb_sz);
		this.c_h_tb_td_c.appendChild(this.hid);
		this.c_h_tb_td_c.appendChild(this.hid_rday);
		this.c_h_tb_tr.appendChild(this.c_h_tb_td_l); 
		this.c_h_tb_tr.appendChild(this.c_h_tb_th); 
		this.c_h_tb_tr.appendChild(this.c_h_tb_td_c); 
		this.c_h_tb_tr.appendChild(this.c_h_tb_td_r); 
		this.c_h_tbody.appendChild(this.c_h_tb_tr);
		this.c_h_tb.appendChild(this.c_h_tbody);
		
		this.content.appendChild(this.c_h_tb);
	}

	Calendar.prototype.list=function(){
		this.c_h_tb=_create('table');
		this.c_h_tbody=_create('tbody');
		this.c_h_tb_tr_top=_create('tr');
		this.c_h_tb_td_top=_create('td');
		this.c_h_tb_td_top.valign='top';
		
		this.c_h_tb.className='Calendar';
		this.grid=new GridList(this.date,this.language);
		this.c_h_tb_td_top.appendChild(this.grid);
		this.c_h_tb_tr_top.appendChild(this.c_h_tb_td_top);
		this.c_h_tbody.appendChild(this.c_h_tb_tr_top);
		this.c_h_tb.appendChild(this.c_h_tbody);
		
		this.content.appendChild(this.c_h_tb);
	}



	//日历 单元格子天的集合
	var GridList=function(date,language){
		this.c_g_tb=_create('table');
		this.c_g_tbody=_create('tbody');
		this.c_g_tb.className='Grid';
				
		//5行
		this.day=0;  //1-31天
			
		this.date=new Date(date.format("MM/01/yyyy")); 
		this.w=this.date.getDay();
		this.year=this.date.getFullYear();
		this.month=this.date.getMonth();
		this.days=0;
		this.days=getDayNumByYearMonth(this.year,this.month);
		this.week = language.weekArray;
		this.ndate=new Date();
		
		var H=parseInt(400)/5;
		
		for(var i=0;i<6;i++){
			this.c_g_tr=_create('tr');
			
			if(i==0){
				//7列
				for(var j=0;j<7;j++){
					this.c_g_td=_create('td');
					this.c_g_td.className='CalendarWeekendName';
					this.c_g_td.style.width='14.29%';
					this.c_g_td.innerHTML=this.week[j];
					this.c_g_td.style.background='#eee'; 
					this.c_g_tr.appendChild(this.c_g_td);
				}
			}else{
				this.c_g_tr.className="grid-tr";	
				this.c_g_tr.style.height=(getWinHeight()-95)/5+'px';
				for(var j=0;j<7;j++){
					
					var gtd=new Grid_td(language,this.year,this.month,this.day,this.date,this.ndate,i,j,this.w,this.days);
					this.day=gtd.day;
					this.c_g_tr.appendChild(gtd.c_g_td);
					
				}
			}
			this.c_g_tbody.appendChild(this.c_g_tr);
		}
		this.c_g_tb.appendChild(this.c_g_tbody);
		return this.c_g_tb;	
	}
	var Grid_td=function(language,year,month,day,date,ndate,i,j,w,days){
		this.c_g_td=_create('td');
		this.c_g_td.className='CalendarWeekend';
		this.c_g_td.style.verticalAlign='top';
		this.c_g_td.style.textAlign='left';
		
		this.day; 
		
		var g='';
		
		if(i==1&&j>=w){
			day++;
			var lunarhtml='';
			if(language.type=='chinese'){

				var nowTime = (month+1)+'/'+day+'/'+year;
				var lunar=lunarday((month+1)+'//'+day+'//'+year);
				var lunarhtml="  <font color='#777' style='font-size:8px'>"+lunar+"</font>";
			}
			this.c_g_td.id='day_'+day;
			this.c_g_td.setAttribute('nowTime', nowTime);
			var g="<div class='day_d' ><a class='day_num'>"+day+"</a>"+lunarhtml+
			"</font><a class='add_event'  id='add_"+day+"'><img src='../statics/assets/lib/widget/calendar_week/add.gif' calendar-plane="+ date.format('MM/'+day+'/yyyy') +"><a/></div>";
		}else if(i>1&&day<days){
			
			day++;
			var lunarhtml='';
			if(language.type=='chinese'){
				var lunar=lunarday((month+1)+'//'+day+'//'+year);
				var nowTime = (month+1)+'/'+day+'/'+year;
				var lunarhtml="&nbsp;&nbsp;<font color='#777' style='font-size:8px'>"+lunar+"</font>";
			}
			this.c_g_td.id='day_'+day;
			this.c_g_td.setAttribute('nowTime', nowTime);
			var g="<div class='day_d' ><a class='day_num'>"+day+"</a>"+lunarhtml+
			"</font><a class='add_event'  id='add_"+day+
			"'><img src='../statics/assets/lib/widget/calendar_week/add.gif' calendar-plane="+ date.format('MM/'+day+'/yyyy') +"><a/></div>";
		}else{

			var g=" "
			this.c_g_td.style.background='#eeeeee'; 
		}
		
		addEvents(this.c_g_td,'click',function(){get_day(day)});
		this.day=day;
		
		this.c_g_td.innerHTML=g;
		if(isToday(date.format('MM/'+day+'/yyyy'))){
			this.c_g_td.className+=" today"; 
		}
		return this;
	}

	$(document).on('click', '[calendar-plane]', function(){

		var date = $(this).attr('calendar-plane');

		showModalDialog(date,18,34, $(this));

		return false;

	});


	//
	function addevent(day){

		var url='?do=subject.view&op=add';
		var d=_('date');
		var date=new Date(d.value);
		var d_day=day>9?day:'0'+day; 
		var d_month=(date.getMonth()+1)>9?(date.getMonth()+1):'0'+(date.getMonth()+1);
		var time='&sdate='+date.getFullYear()+'-'+d_month+'-'+d_day;
		//alert(time);
		//showdialog('添加课程',url+time);
		goto(url+time);

	}
	function get_day(day){
		
		if(!_('day_'+day)) return;
		
		_('day_'+day).addClass('day_pc');
		var rday=_("rday");
		var d=rday.value;
		_("add_"+day).style.display='block';
		
		//clickDay(d_a[1]);
		
		var da=_('date');
		var date=new Date(da.value);
		var month= date.getMonth()+1;
		var year=date.getFullYear();
		
		if(d){
			
			if(d!=('day_'+day)){
				_(d).removeClass('day_pc');
				var d_a_l=d.split("_");
				_("add_"+d_a_l[1]).style.display='none';
				_("rday").value='day_'+day;
			}
		}else{
			_("rday").value='day_'+day;		
		}
		
		// 通过url得到 一天的事件
		//var url='?do=subject.getDay&year='+year+'&month='+month+'&date='+d_a[1];
		//getDayEventsByJson(url);
	}


	//显示点击的一天课程
	clickDay=function(day){
		var t=_("eventbyDay");
		var d=_('date');
		var date=new Date(d.value);
		
		t.innerHTML=(date.getMonth()+1)+"月"+day+"日";
	}

	//下一个月
	Next=function(){
			var d=_('date');
			var date=new Date(d.value);
				date.addMonths(1);
			gotoMonth(date);
	}
	//上一个月
	Prev=function(){
		var d=_('date');
		var date=new Date(d.value);
			date.addMonths(-1);
		gotoMonth(date);	
		
	}

	//跳转到某月
	var gotoMonth=function(date){
		
		var lang='english';
		var languageobj=_('hidden_language');
		if(languageobj){ lang=languageobj.value;}
		
		try{
			var cr=new Calendar();
				cr.date=date;
				cr.language=new Language(lang);

				cr.load();
				window.__onRender && window.__onRender();
			
		}catch(e){
			alert(e);	
		}
	}

	/* ---------------month----------------- */


	/* ---------------event----------------- */

	var down=false; //判断鼠标是否处于down状态
	var y=0;//对象top坐标
	var t=0;//时间坐标
	var h=0;//对象的height 高度
	var w=0;//方向0向下1向下
	var m=0;//移动的值

	var current_obj, is_current_obj=false; //选择的对象
	var current_date; //选择的时间
	var resize_obj, resize_down=false; //改动大小的对象
	var state_obj=false;
	 
	var timer;  //定时器

	//鼠标按下事件
	function downEvent(day,event){
				
			state_obj=false;  
			down=true;       
			current_date=day;
			
			var isdownObj=false;  //是否是按下的对象
			  
				
			this.event_div=_create('div');
			this.event_time_div=_create('div');
			this.event_content_div=_create('div');
			this.resize_div=_create('div');
			
			this.event_div.className='wc-cal-event ui-corner-all br4';			   
			this.event_time_div.className='wc-time ui-corner-all br4';
			this.resize_div.className='ui-resizable-handle ui-resizable-s';	
			
			
			
			m=getOffsetY(event);
			
			y=parseInt(getOffsetY(event)/20)*20;
			t=parseInt(getOffsetY(event)/20)+1;
			current_obj=getEventObj(event);
			if(getEventObj(event)==_(day+'_week')){
				isdownObj=true;
				is_current_obj=true;
			}
			
			if(isdownObj){
		
				this.event_div.style.top=y+'px';
				var date=new Date(day);
				var d=new Date();
				
				var ndate=new Date((d.getMonth()+1)+'/'+d.getDate()+'/'+d.getFullYear());
				if(!(date>=ndate)){
					this.event_div.style.backgroundColor ='#aaa';
				}
				
				this.event_div.id=day+''+y+'_event_div';
				this.event_time_div.id=day+''+y+'_event_time';
				this.event_content_div.id=day+''+y+'_event_content';
				this.event_div.appendChild(this.event_time_div);
				this.event_div.appendChild(this.event_content_div);
					addEvents(this.resize_div,'mousedown',function(event){resize_downEvent(day,event); });
				this.event_div.appendChild(this.resize_div);
				
				_(day+'_week').appendChild(this.event_div);
			}
	}
	//鼠标在日历上拖动事件
	function moveEvent(day,event){
		var child_y=0;       //event 触发到子对象的时候的 y坐标值
		var child_h=0;       //event 触发到子对象的时候的 height值
		var isdownObj=false; //判断触发是对象是否是当前操作的对象 
		document.body.style.cursor="pointer";
		if(down){
			h=getOffsetY(event)-y;
			isdownObj=true;
			is_current_obj=true;
			
			//如果鼠标上的对象是_(day+''+y+'_event_div')
			if(getEventObj(event)==_(day+''+y+'_event_div')){
				 h=getOffsetY(event);
			}
			if(current_obj!=_(day+'_week')){
				is_current_obj=false;
			}
			if("wc-time-slot"==getEventObj(event).className){
				is_current_obj=false;
			}
			
			if(isdownObj){
				h=h<=0?0:Math.ceil(h/20)*20;
				child_y=Math.ceil(child_y/20)*20;
				
				if(getOffsetY(event)-5<=h+y){
					h-=20;
				}
				if(_(current_date+''+y+'_event_div')){
				   _(current_date+''+y+'_event_div').style.height=(h+child_y)+'px';
				}
			}
			t=(h+y)/20;
			m=getOffsetY(event);
			
			
		}
		
		
		//判断从底部拖动改变大小
		if(resize_down){
				is_current_obj=true;
				if(resize_obj.parentNode==_(day+'_week')){
					 y=parseInt(resize_obj.style.top);
					 h=getOffsetY(event)-y;
					 h=h<=0?0:Math.ceil(h/20)*20;
					 
					
					 if(getOffsetY(event)-5<=h+y) h-=20;
					 t=(h+y)/20;
					 
					 resize_obj.style.height=h+'px';
				}
				
				
		}
		
	}

	//鼠标松开事件
	function upEvent(day,event){
		
		
		if(!is_current_obj){
			del_current_obj();	
			return ;
		}
		
		if(_(current_date+''+y+'_event_time')){
			_(current_date+''+y+'_event_time').innerHTML=Time_hm[y/20]+' to '+Time_hm[t];
		}
		if(_(current_date+''+y+'_event_div')){
			
			if(parseInt(_(current_date+''+y+'_event_div').style.height)<1){
				del_current_obj();	
				return ;
			}
			showModalDialog(current_date,y/20,t);
			state_obj=true;
		}
		
		down=false;
		resize_down=false;
		y=0;
	}

	function setScrollTop(op){
		
		if(!down) return 
		var grid=_c(document,"div","wc-scrollable-grid");
		if(op=="up"){
			grid.scrollTop-=10;
		}else if(op=="down"){
			grid.scrollTop+=10;
			//alert('ddddddddd');
		}
		//_("tool").innerHTML=grid.scrollBottom;
		timer=setTimeout("setScrollTop('"+op+"')",100)	
	}

	//删除未创建完成的对象
	function del_current_obj(){
		if(_(current_date+''+y+'_event_div')){
			_(current_date+''+y+'_event_div').parentNode.removeChild(_(current_date+''+y+'_event_div'));
		}
	}

	function resize_downEvent(day,event){	
		resize_down=true;
		resize_obj=getEventObj(event).parentNode;
	}

	//窗体上鼠标点击释放触发事件
	window.onmouseup=function(){
		down=false;
		if(!state_obj)
		del_current_obj();
	}

	var wc_scrollable_grid=false;
	var grid_tr=false;
	//窗体大小改变触发事件
	window.onresize=function(){
		if(!wc_scrollable_grid)
			wc_scrollable_grid=_c(document,"div",'wc-scrollable-grid');
		if(!grid_tr)
			grid_tr=_c(document,"tr","grid-tr");
		
		if(_("tab_input").value=="month"){
			for(var i=0 ;i<grid_tr.length; i++ )
			{
				grid_tr[i].style.height=(getWinHeight()-95)/5+'px';
			}
		}else if(_("tab_input").value=="week"){
			wc_scrollable_grid.style.height=(getWinHeight()-95)+'px';
		}else if(_("tab_input").value=="day"){
			wc_scrollable_grid.style.height=(getWinHeight()-69)+'px';
		}
	}

	function showModalDialog(day,beginTime,endTime, oNow){

		oWriteBox.show();
		//need-modify
		window.__nowTime = day;

		window.__calendarOnShow && window.__calendarOnShow(day, oNow);

		/*createBlackBg();
		this.dialog=_create('div');	
		this.dialog.className='dialog bs br10';
		this.header=_create('div');
		this.closeimg=_create('div');
		this.bar=_create('div');
		
		var lang=new Language(_('hidden_language').value);
			
		this.dialog.style.top=(getWinHeight()/2-120)+'px';
		this.dialog.style.left=(getWinWidth()/2-200)+'px';
		this.closeimg.className='close';
		this.closeimg.innerHTML='<a href="javascript:;" class="close" sc="close">×</a>';
		this.bar.className='bar';
		this.bar.innerHTML=lang.event;
		this.form=_create('form');
		this.time=_create('div');
		this.title=_create('div');
		this.content=_create('div');
		this.btu=_create('div');
		var date=new Date(day);
		
		this.time.innerHTML=lang.date+' '+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+" ("
							+lang.weekArray[date.getDay()]+"),  "+Time_hm[beginTime]+" – "+Time_hm[endTime];
		this.title.innerHTML="<p>"+lang.title+":</p> <input type='text'>";
		this.content.innerHTML="<p>"+lang.content+":</p> <textarea></textarea> <hr />";
		this.btu.innerHTML="<input type='button' value='"+lang.create_action
						   +"' onclick='closeModalDialog()' /> <a>"+lang.edit_detail+"</a>";
						   
			 
		this.dialog.appendChild(this.bar);
		this.dialog.appendChild(this.closeimg);
		this.form.appendChild(this.time);
		this.form.appendChild(this.title);
		this.form.appendChild(this.content);
		this.form.appendChild(this.btu);
		this.dialog.appendChild(this.form);
		_('append').appendChild(this.dialog);*/
	}

	function closeModalDialog(){
		_('append').innerHTML='';	
	}
	function createBlackBg(){
		this.bg=_create('div');	
		this.bg.className='blackBg';
		_('append').appendChild(this.bg);
	}


	/* ---------------event----------------- */


	/* ---------------lunar----------------- */

	var lunarinfo=new Array(
		0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
		0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
		0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
		0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
		0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
		0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
		0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
		0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
		0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
		0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
		0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
		0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
		0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
		0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
		0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0);
		//==== 传回农历 y年的总天数
		function lyeardays(y) {
		var i, sum = 348
		for(i=0x8000; i>0x8; i>>=1) sum += (lunarinfo[y-1900] & i)? 1: 0
		return(sum+leapdays(y))
		}
		//==== 传回农历 y年闰月的天数
		function leapdays(y) {
		if(leapmonth(y))  return((lunarinfo[y-1900] & 0x10000)? 30: 29)
		else return(0)
		}
		//==== 传回农历 y年闰哪个月 1-12 , 没闰传回 0
		function leapmonth(y) { return(lunarinfo[y-1900] & 0xf)}
		//====================================== 传回农历 y年m月的总天数
		function monthdays(y,m) { return( (lunarinfo[y-1900] & (0x10000>>m))? 30: 29 )}
		//==== 算出农历, 传入日期物件, 传回农历日期物件
		//     该物件属性有 .year .month .day .isleap .yearcyl .daycyl .moncyl
		function lunar(objdate) {
			var i, leap=0, temp=0;
			var basedate = new Date(1900,0,31);
			var offset   = (objdate - basedate)/86400000;
			this.daycyl = offset + 40;
			this.moncyl = 14;
			for(i=1900; i<2050 && offset>0; i++) {
			temp = lyeardays(i);
			offset -= temp;
			this.moncyl += 12;
			}
			if(offset<0) {
			offset += temp;
			i--;
			this.moncyl -= 12;
			}
			this.year = i;
			this.yearcyl = i-1864;
			leap = leapmonth(i); //闰哪个月
			this.isleap = false
			for(i=1; i<13 && offset>0; i++) {
			//闰月
			if(leap>0 && i==(leap+1) && this.isleap==false)
			{ --i; this.isleap = true; temp = leapdays(this.year); }
			else
			{ temp = monthdays(this.year, i); }
			//解除闰月
			if(this.isleap==true && i==(leap+1)) this.isleap = false
			offset -= temp
			if(this.isleap == false) this.moncyl ++
			}
			if(offset==0 && leap>0 && i==leap+1)
			if(this.isleap)
			{ this.isleap = false; }
			else
			{ this.isleap = true; --i; --this.moncyl;}
			if(offset<0){ offset += temp; --i; --this.moncyl; }
			this.month = i
			this.day = offset + 1
		}
		function cday(m,d){
			var nstr1 = new Array('日','一','二','三','四','五','六','七','八','九','十');
			var nstr2 = new Array('初','十','廿','卅','　');
			var s;
			if (m>10){s = '十'+nstr1[m-10]} else {s = nstr1[m]} s += '月'
			if (s=="十二月") s = "腊月";
			if (s=="一月") s = "正月";
			switch (d) {
			case 10:s += '初十'; break;
			case 20:s += '二十'; break;
			case 30:s += '三十'; break;
			default:s += nstr2[Math.floor(d/10)]; s += nstr1[d%10];
		}
			return(s);
		}
		function lunarday(d){
			var date=new Date(d);
			var sdobj = new Date(date.getFullYear(),date.getMonth(),date.getDate());
			var ldobj = new lunar(sdobj);
			var cl = ''; 
			//农历bb'+(cld[d].isleap?'闰 ':' ')+cld[d].lmonth+' 月 '+cld[d].lday+' 日
			var tt = cday(ldobj.month,ldobj.day);
			return tt;
		}

	/* ---------------lunar----------------- */


	module.exports = cal_config;
	
});

