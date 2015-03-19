/*
 *description:focus
 *author:fanwei
 *date:2014/2/19
 */
define(function(require, exports, module){
	
	require('../../lib/touch/hammer');
	require('../../lib/underscore/underscore');

	function Focus( opts ) {

		opts = opts || {};
		this.oWrap = opts.oWrap || null;
		this.oDataWrap = this.oWrap.find('[widget-role = focus-data-wrap]') || null;
		this.oDotWrap = this.oWrap.find('[widget-role = focus-dot-wrap]') || null;
		this.requestType = opts.requestType || 'post';
		this.speed = opts.speed || 500;
		this.auto = opts.auto ? true : false;
		this.cycle = opts.cycle == undefined ? true : opts.cycle;
		this.roudTime = opts.roudTime || 5000;
		this.url = opts.url || '';
		this.param = opts.param || null;
		this.type = opts.type || 'get';
		this.compailed = opts.compailed || '<%_.each(data, function(focus){%><li><img src="<%=focus.slide_pic%>" link="<%=focus.slide_url%>"/></li><%})%>';
		this.orgWidth = this.oWrap.attr('widget-width') == '100%' ? document.documentElement.clientWidth : this.oWrap.attr('widget-width');
		this.orgHeight = this.oWrap.attr('widget-height') == '100%'? document.documentElement.clientHeight : this.oWrap.attr('widget-height');
		this.scale = this.oWrap.attr('widget-scale');
		this.sensity = opts.sensity || 50;
		this._start = 0;
		this._iNow = 0;
		this._wrapWidth = 0;
		this.timer = null;
		this.timer2 = null;
		this.roundTimer = null;
		this._ORIENT_DELAY = 500;
		this._ORGDOTBG = "#fff";
		this._ACTDOTBG = "#f14c76";
		this.lock = false;

		this.onClickPic = this.onClickPic || null;
		this.onReady = this.onReady || null;
	}

	Focus.prototype = {

		init: function() {
			
			this.load();
		},
		addEvent: function() {
			
			var _this = this;

			this.oWrap.hammer().on('panstart panleft panright panend tap', function(e){
			
				if ( _this.lock ) return;

				switch( e.type ) {

					case 'panstart' :
						clearInterval( _this.roundTimer );
						//_this.startJudge(e.gesture.direction);
					break;

					case 'panleft' :
						e.preventDefault();
						_this.dragmove(_this.oDataWrap, e, 'left');
					break;

					case 'panright' :
						e.preventDefault();
						_this.dragmove(_this.oDataWrap, e, 'right');
					break;

					case 'panend' :
							_this.lock = true;

							var ev,
								delta,
								dir;

							ev = e.gesture;
							delta = ev.deltaX;
							dir = ev.direction;	

							_this.judge(delta, dir);
							if( _this.auto ) _this.autoPlay();	
						
					break;

					case 'tap' :

						if( e.srcElement ) {

							var url = e.srcElement.getAttribute('link');						
							if ( url ) {

								_this.onClickPic && _this.onClickPic(url);
							}	

						}
						 
					break;
				}

			});

			window.onorientationchange = function(){

				clearTimeout(_this.timer);

				_this.timer = setTimeout(function(){

					_this.setStyle(_this.num);

					_this.setDotWrap();

					_this.css3(_this.oDataWrap, {
						'transition': 'none',
						'transform': 'translateX(0) translateZ(0)'
					});

					if( _this.auto ) _this.autoPlay();

				}, _this._ORIENT_DELAY);
				
			};
		},
		startJudge: function(dir) {

			var max;
			max = this._wrapWidth * this.num;

			if(this._iNow == this.num && dir == 2) {

				this.css3(this.oDataWrap, {
					transition : 'none',
					transform: 'translateX('+ -this._wrapWidth +'px) translateZ(0)'
				});

				this.nowPostion = -this._wrapWidth;
				this._iNow = 0;

			} else if( this._iNow == -1 && dir == 4 ) {

				this.css3(this.oDataWrap, {
					transition : 'none',
					transform: 'translateX('+ -max +'px) translateZ(0)'
				});

				this.nowPostion = - max;
				this._iNow = this.num - 1;

			}

			this._aDot.eq( this._iNow  ).css('background', this._ACTDOTBG).siblings().css('background', this._ORGDOTBG);

		},
		dragmove: function(obj, event, dir) {
			
			if( !this.cycle ) {

				if( dir == 'left' && this._iNow >= this.num - 1 ) {
					this.lock = false;
					return;

				} else if( dir == 'right' && this._iNow == 0 ) {
					this.lock = false;
					return;

				}

			}

			var dis,
			delta;

			delta = event.gesture.deltaX;
			dis = delta + this.nowPostion;

			this.css3(obj, {
				transition : 'none',
				transform: 'translateX('+ dis +'px) translateZ(0)'
			});
			
		},
		autoPlay: function() {

			var _this = this;

			clearInterval( this.roundTimer );

			this.roundTimer = setInterval(function(){

				_this.judge( _this.sensity + 1, 2 );

			}, this.roudTime);

		},
		judge: function(delta, dir) {

			if( !this.cycle ) {

				if( dir == 2 && this._iNow >= this.num - 1  ) {
					this.lock = false;
					return;

				} else if( dir == 4 && this._iNow == 0) {
					this.lock = false;
					return;
				}

			}

			if( Math.abs(delta) > this.sensity ) {
				
				//left
				if ( dir == 2 ) {

					this._iNow ++;

					this.animate( this.nowPostion - this._wrapWidth, 2 );

				} else if(dir == 4) {

					//right
					this._iNow --;

					this.animate( this.nowPostion + this._wrapWidth, 4 );

				} else {

					this.animate( this.nowPostion );
				}
			} else {

				this.animate( this.nowPostion );

			}

		},
		animate: function(dis, dir){



			var _this = this;

			_this.css3(this.oDataWrap, {

				transition : _this.speed + 'ms',
				transform: 'translateX('+ dis + 'px) translateZ(0)'

			});

			clearTimeout(this.timer2);
			this.timer2 = setTimeout(function(){

				if (dis == -0) dis = 0;

				_this.nowPostion = dis;

				if(dir) _this.startJudge(dir);

				_this.lock = false;

			},this.speed);

		},
		copyFirstLast: function(oFirst, oLast, oDataWrap) {

			// 额外增加一个节点,最后一个节点是第一张图
			var oCloneFirst = oFirst.clone();
			oDataWrap.append(oCloneFirst);

			//额外增加一个节点,第一个节点是最后一张图
			var oCloneLast = oLast.clone();
			oDataWrap.prepend(oCloneLast);

		},
		setStyle: function(num) {

			var wrapData,
				wrapWidth,
				wrapHeight;

			wrapData = this.calc();	
			wrapWidth = wrapData.w;
			wrapHeight = wrapData.h;
			this._wrapWidth = wrapWidth;
			this._aLi = this.oDataWrap.children();

			this.oWrap.css({
				width: wrapWidth,
				height: wrapHeight,
				position: 'relative',
				overflow: 'hidden'
			});

			this._aLi.css({
				width: wrapWidth + 'px',
				height: wrapHeight + 'px',
				float: 'left'
			});

			this.oDataWrap.find('img').css({
				width: '100%',
				height: '100%'
			});

			this.css3(this.oDataWrap, {
				transition : 'none',
				transform: 'translateX('+ -this._wrapWidth +'px) translateZ(0)'
			});

			this.oDataWrap.css({
				position: 'relative',
				width: this._wrapWidth * (num + 2)
			});

			
			this._iNow = 0;
			this.nowPostion = -this._wrapWidth;

			if ( num == 1 ) return;
		},
		calc: function() {

			var deviceWidth,
				wrapHeight;

			deviceWidth = document.documentElement.clientWidth * this.scale;

			wrapHeight = deviceWidth/this.orgWidth * this.orgHeight;

			return {w:deviceWidth, h:wrapHeight};

		},
		load: function() {
			
			var _this = this;

			if( this.url ) {

				$.ajax({

					url: this.url,

					dataType: 'text',

					type: this.type,

					data: this.param,

					success: function(data) {

						var data = eval('(' + data + ')');

						//need modify

						_this.num = data.data.length;

						_this.setStyle(_this.num);

						_this.createDomList(data);						

						if ( _this.num == 1 ) return;

						_this.createDot();

						_this.addEvent();

						_this.auto ? _this.autoPlay() : null;	
						
					}

				});

			} else {

				var aList = _this.oDataWrap.children();
				var oFirstList = aList.eq(0);
				var oLastList = aList.last();

				_this.copyFirstLast(oFirstList, oLastList, _this.oDataWrap);

				_this.num = aList.length;

				_this.setStyle(_this.num);

				if ( _this.num == 1 ) return;

				_this.createDot();

				_this.addEvent();

				_this.auto ? _this.autoPlay() : null;

			}

		},
		createDomList:function(data) {
		
			var html = _.template(this.compailed, data);

			this.oDataWrap.html(html);
		},
		createDot: function() {

			var i;

			this.setDotWrap();

			for (i=0; i<this.num; i++) {

				var oA = $('<a href="javascript:;"></a>');

				oA.css({
					width: '0.2rem',
					height: '0.2rem',
					display: 'inline-block',
					background: this._ORGDOTBG,
					margin: '0.1rem',
					borderRadius: '100%'
				});

				this.oDotWrap.append(oA);
			}

			this._aDot = this.oDotWrap.children();

			this._aDot.eq(0).css('background', this._ACTDOTBG);	

		},
		setDotWrap: function() {

			this.oDotWrap.css({
				textAlign: 'center',
				position: 'absolute',
				bottom: 0,
				width: this._wrapWidth
			});	
		},
		css3: function(obj, json) {

			obj = obj.get(0);

			for (var name in json) {

		      var bigName = name.charAt(0).toUpperCase()+name.substring(1);
		      
		      obj.style['Webkit'+bigName] = json[name];
		      obj.style['Moz'+bigName] = json[name];
		      obj.style['ms'+bigName] = json[name];
		      obj.style['O'+bigName] = json[name];
		      obj.style[name] = json[name];

		    }

		}

	}

	module.exports = Focus;

});
