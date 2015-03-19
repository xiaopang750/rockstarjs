/*
 *description:分页
 *author:fanwei
 *date:2014/04/10
 */

/*
	@param 
	url:请求后台地址;
	oTpl:数据模板对象;
	param: 提交到服务器的参数;
	callBack: 渲染数据后的回调函数;
	btnStr: 分页按钮dom字符串;
	oWrap: 渲染数据的容器;
	setModel: 修改后台返回的model;
	maxBtn:定义显示的最大页数,默认为5条;

	backbone强制依赖underscore请不要删除underscore;
*/
				
 define(function(require, exports, module){
 		
 	require('../../lib/underscore/underscore');
	require('../../lib/backbone/backbone');
 	
	function Fenye(url, oTpl, param, pName, callBack, btnStr, oWrap, setModel, maxBtn, oFenyeWrap) {
		
		param = param || {};

		pName = pName || 'curpage';

		this.param = param;

		this.url = url;

		this.tpl = oTpl;

		this.cb = callBack || null;

		oWrap = oWrap || $('[data-ele = data-wrap]');

		oFenyeWrap = oFenyeWrap || $('[sc = fenye-wrap]');

		this.firstLoad = true;

		var that = this;

		var maxBtn = maxBtn || 6;

		var firstPage = true;

		this.btnClass = 'active';

		btnStr = btnStr || '<a href="#" class="btn btn-default" sc="pagebtn"></a>';

		oFenyeWrap.hide();

		/* m */
		var Model = Backbone.Model.extend({
			url:this.url,
			/*row:row,*/
			initialize: function() {

				var _this = this;

				this.on('change:p', function(model, page){
					
					_this.getData(page, that.param);

				});

				this.on('change:rnd', function(model, param, b){
					
					_this.getData(1, b);
					
				});

			},
			getData: function(page, param) {

				param[ pName ] = page;

				this.save(null, {

					data: param

				});

			}
		});

		/* v */
		var View = Backbone.View.extend({

			el: $(document),
			oWrap: oWrap,
			oView: $('[sc = num]'),
			max: 0,
			page: window.location.hash.split('#')[1] || 1,
			first: true,
			events: {
				'click [sc = page-prev]': 'prev',
				'click [sc = page-next]': 'next',
				'click [sc = first]': 'home',
				'click [sc = last]': 'last',
				'click [sc = pagebtn]': 'clickBtn'
			},
			initialize: function() {

				this.listenTo(this.model, 'change:data', this.show);
				this.oPrev = $('[sc = page-prev]');
				this.oFirst = $('[sc = first]');
				this.oNext = $('[sc = page-next]');
				this.oLast = $('[sc = last]');

			},
			show: function() {

				var model;

				model = this.model.toJSON();

				model = model.data;

				if(!model) {
					return;
				}

				if( setModel ) {
					
					model = setModel( model );

				}

				this.max = Math.ceil( model.total/that.param.pagesize );

				this.render( model );

				this.showPage(this.page , this.max );

				oFenyeWrap.show();

				if(!this.max) {

					oFenyeWrap.hide();
				}

				that.cb && that.cb( model );
			},
			showPage: function(now, max) {

				this.oBtnWrap = $('[sc = num]');

				var i,
					num,
					oBtn,
					lastBtn,
					limitUp,
					limitDown,
					oDot,
					averge,
					lastCanShow;

				num = max;	

				averge = Math.floor(maxBtn/2);

				this.oBtnWrap.html('');

				if ( max <= maxBtn ) {

					for (i=0; i<num; i++) {

						oBtn = $(btnStr);
						
						oBtn.html(i+1);

						if ( i+1 == now ) {

							oBtn.addClass(that.btnClass);

						}

						this.oBtnWrap.append(oBtn);

					}	

				} else {

					//上限
					limitUp = parseInt(now) + averge >= max ? max : parseInt(now) + averge;

					//下限
					limitDown = parseInt(now) - averge <=1  ? 1 : parseInt(now) - averge;

					//最后一个是否能显示
					lastCanShow = parseInt(now) + averge;

					for ( i=limitDown; i<now; i++ ) {

						oBtn = $(btnStr);

						oBtn.html(i);

						this.oBtnWrap.append(oBtn);

					}

					for (i=now; i<=limitUp; i++) {

						oBtn = $(btnStr);

						oBtn.html(i);

						if ( i == now ) {

							oBtn.addClass(that.btnClass);

						}

						this.oBtnWrap.append(oBtn);

					}

					if( lastCanShow < max ) {

						oDot = $('<span>......</span>');
						lastBtn = $(btnStr);
						lastBtn.html( max );
						this.oBtnWrap.append(oDot);
						this.oBtnWrap.append(lastBtn);	

					}


				}
				
				//判断首尾
				if(now == 1) {
					this.oPrev.addClass('end');
					this.oFirst.addClass('end');
				} else {
					this.oPrev.removeClass('end');
					this.oFirst.removeClass('end');
				}

				if(now == max) {
					this.oNext.addClass('end');
					this.oLast.addClass('end');
				} else {
					this.oNext.removeClass('end');
					this.oLast.removeClass('end');
				}

			},
			render: function( data ) {
				
				if(that.firstLoad) {
					that.firstLoad = false;
					oFenyeWrap.show();
				}
	
				var sNewHtml = that.tpl(data);
				
				this.oWrap.html(sNewHtml);

			},
			changeParam: function( param ) {

				var rnd = Math.random();

				this.model.set('rnd', rnd, param);

				//this.showPage(1 , this.max );

			},
			change: function( page ) {
				
				this.model.set('p', page);

				//this.showPage(page , this.max );
			},
			home: function() {

				this.change( 1 );

				this.page = 1;

				R.navigate( this.page.toString() );

			},
			last: function() {

				this.change( this.max );

				this.page = this.max;

				R.navigate( this.page.toString() );

			},
			prev: function(e) {

				this.page --;

				if ( this.page < 1 ) {

					this.page = 1;

					return;

				}else {

					this.change( this.page );

				}

				R.navigate( this.page.toString() );

			},
			next: function() {

				this.page ++ ;

				if ( this.page > this.max ) {

					this.page = this.max;

					return;

				}else {

					this.change( this.page );

				}

				R.navigate( this.page.toString() );
			},
			clickBtn: function(e) {

				var oThis,
					now;

				oThis = $(e.target);
				now = oThis.html();

				this.change( now );

				this.page = now;

				R.navigate( this.page.toString() );

			}
		});

		/* r */
		var Wrokspace = Backbone.Router.extend({

			routes: {

				"": "index",
				":p": "page"
			},
			index: function() {

				V.change(1);

			},
			page: function(p) {

				V.page = p;

				V.change(p);

			}

		});

		var M = new Model();
		var V = new View({model: M});
		V.change(1);
		var R = new Wrokspace;

		//Backbone.history.start();

		this.V = V;
		this.M = M;
		this.R = R;
	}

	Fenye.prototype = {

		refresh: function(param, url, tpl) {

			this.param = param;

			if(url) this.url = url;
			if(tpl) this.tpl = tpl;
			this.M.url = this.url;

			this.V.changeParam( param );

			this.R.navigate( "1" );

			this.V.page = 1;

			this.V.home();

		}

	}

	module.exports = Fenye;
 });