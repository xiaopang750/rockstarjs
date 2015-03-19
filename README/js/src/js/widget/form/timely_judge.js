/**
 *description:及时验证某个输入框，比如验证重名
 *author:fanwei
 *date:2014/10/22
 */
define(function(require, exports, module){
	
	var TimelyJudge = R.Class.create(R.until, {

		initialize: function(opts) {
			
			this.oTarget = opts.ele || null;
			this.eventsType = opts.eventsType || 'keyup';
			this.param = opts.param || {};
			this.checkUrl = opts.checkUrl || '';
			this.onSuc = opts.onSuc || null;
			this.onFail = opts.onFail || null;
			this.onDo = opts.onDo || null;
			this.firstLoad = false;

		},
		start: function() {

			this.events();

		},
		events: function() {

			if(!this.firstLoad) {

				//avoid repeat bind
				this.firstLoad = true;

				var _this = this;

				this.oTarget.on(this.eventsType, function(){

					_this.onDo && _this.onDo();
					_this.check();

				});

				this.oTarget.on('blur', function(){

					_this.onDo && _this.onDo();
					_this.check();

				});

			}
		},
		check: function() {

			var _this = this;

			if(this.checkUrl) {

				this.reqUrl = this.checkUrl;
				this.reqParam = this.param;
				this.req(function(data){

					_this.onSuc && _this.onSuc(data);

				}, function(data){

					_this.onFail && _this.onFail(data);

				});

			}
		}

	});

	module.exports = TimelyJudge;

});