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
		this.auto = opts.auto ? true : false || true;
		this.roudTime = opts.roudTime || 5000;
		this.url = opts.url || '';
		this.param = opts.param || null;
		this.compailed = opts.compailed || '<%_.each(data, function(focus){%><li><img src="<%=focus.slide_pic%>" link="<%=focus.slide_url%>"/></li><%})%>';
		this.orgWidth = this.oWrap.attr('widget-width');
		this.orgHeight = this.oWrap.attr('widget-height');
		this.scale = this.oWrap.attr('widget-scale');
		this.sensity = opts.sensity || 50;
		this._start = 0;
		this._iNow = 0;
		this._wrapWidth = 0;
		this.timer = null;
		this.roundTimer = null;
		this._lock = false;
		this._ORIENT_DELAY = 500;
		this._ORGDOTBG = "#fff";
		this._ACTDOTBG = "#ff5000";
		this.lock = false;

	}

	Focus.prototype = {

		init: function() {
			
			this.load();

			this.auto ? this.autoPlay() : null;
		},
		addEvent: function() {
			
			var _this = this;

			this.oWrap.hammer().on('touch dragleft dragright dragend tap', function(e){

				switch( e.type ) {

					case 'touch' :

						clearInterval( _this.roundTimer );

						$.css3(_this.oDataWrap, {

							transition: 'none'

						});

					break;

					case 'dragleft' :


						e.gesture.preventDefault();
						_this.dragmove(_this.oDataWrap, e);
					break;

					case 'dragright' :
						e.gesture.preventDefault();
						_this.dragmove(_this.oDataWrap, e);
					break;

					case 'dragend' :

							var ev,
								delta,
								dir;

							ev = e.gesture;
							delta = ev.deltaX;
							dir = ev.direction;	

							_this.judge(delta, dir);
							_this.autoPlay();	
						
					break;

					case 'tap' :

						var url = e.srcElement.getAttribute('link');

						if ( url ) {

							window.location = url;	

						}
						 
					break;
				}

			});

			window.onorientationchange = function(){

				clearTimeout(_this.timer);

				_this.timer = setTimeout(function(){

					_this.setStyle(_this.num);

					_this.setDotWrap();

					$.css3(_this.oDataWrap, {
						'transition': 'none',
						'transform': 'translateX(0)'

					});

					_this.autoPlay();

				}, _this._ORIENT_DELAY);
				
			};
		},
		dragmove: function(obj, event) {

			var dis,
			delta;

			delta = event.gesture.deltaX;
			dis = delta;

			$.css3(obj, {

				transform: 'translateX('+ dis +'px)'

			});
			
		},
		autoPlay: function() {

			var _this = this;

			clearInterval( this.roundTimer );

			this.roundTimer = setInterval(function(){

				_this.judge( _this.sensity+1, 'left' );

			}, this.roudTime);

		},
		judge: function(delta, dir) {

			if( Math.abs(delta) > this.sensity ) {

				if ( dir=="left" ) {

					this._iNow ++;

					if( this._iNow == this._aLi.length ) {

						this._iNow = 0;

					}

					this.animate( -this._wrapWidth );

				} else {

					this._iNow --;

					if( this._iNow == -1 ) {

						this._iNow = this._aLi.length-1
					}

					this.animate( this._wrapWidth );

				} 
			} else {

				this.animate( 0 );

			}

		},
		animate: function(dis){

			var _this = this;

			$.css3(this.oDataWrap, {

				transition : this.speed + 'ms',
				transform: 'translateX('+ dis + 'px)'

			});

			setTimeout(function(){

				_this._aDot.eq( _this._iNow ).css('background', _this._ACTDOTBG).siblings().css('background', _this._ORGDOTBG);

				_this.postion( _this._aLi );

			},this.speed);

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
				width: wrapWidth + 'px',
				height: wrapHeight + 'px',
				position: 'relative',
				overflow: 'hidden'
			});

			this._aLi.css({
				width: wrapWidth + 'px',
				height: wrapHeight + 'px',
				position: 'absolute',
				top: 0
			});

			this.oDataWrap.find('img').css({
				width: '100%',
				height: '100%',
				display: 'block'
			});

			this.oDataWrap.css({
				position: 'relative'
			});

			this.postion( this._aLi );
		},
		postion: function(aLi) {

			$.css3(this.oDataWrap, {

				transition : 'none',
				transform: 'translateX(0)'

			});

			aLi.hide();

			aLi.eq(this._iNow%aLi.length).show();
			aLi.eq(this._iNow%aLi.length).css({
				left: 0
			});

			this.getPrev(aLi).css({
				left: -this._wrapWidth + 'px',
				display: 'block'
			});

			this.getNext(aLi).css({
				left: this._wrapWidth + 'px',
				display: 'block'
			});
		},
		getPrev: function(aLi) {

			return aLi.eq( (this._iNow + aLi.length - 1) % aLi.length ) ;

		},
		getNext: function(aLi) {

			return aLi.eq( (this._iNow + 1) % aLi.length );

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

			$.ajax({

				url: this.url,

				dataType: 'text',

				success: function(data) {

					var data = eval('(' + data + ')');

					_this.createDomList(data);

					_this.num = data.data.length;

					_this.setStyle(_this.num);

					_this.createDot();

					_this.addEvent();	
					
				}

			})

		},
		createDomList:function(data) {

			/*var compailed = 
			'<%_.each(data.pic_list, function(focus){%>
				<li><img src="<%=focus.slide_pic%>" link="<%=focus.slide_url%>"/></li>
			<%})%>';*/
		
			var html = _.template(this.compailed, data);

			this.oDataWrap.html(html);
		},
		createDot: function() {

			var i,
				num;

			num = this._aLi.length;

			this.setDotWrap();

			for (i=0; i<num; i++) {

				var oA = $('<a href="javascript:;"></a>');

				oA.css({
					width: '0.5rem',
					height: '0.5rem',
					display: 'inline-block',
					background: this._ORGDOTBG,
					margin: '0.3rem',
					borderRadius: '0.5rem'
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
		}

	}

	module.exports = Focus;

});