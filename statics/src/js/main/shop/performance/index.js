/**
 *description:业绩管理首页
 *author:fanwei
 *date:2015/1/25
 */
define(function(require, exports, module) {
	
	var global = require("../../../driver/global");
	var Calendar = require('../../../widget/form/calendar');
	var oTplList = require('../../../tpl/shop/performance/allList');
	var fenye = require('../../../widget/dom/fenye');
	require('../../../lib/underscore/underscore');

	var Index = R.Class.create(R.util, {

		initialize: function() {
			
			this.oWrap = $('[search-wrap]');
			this.allWay = $('[conditionBtn]');
			this.oListWrap = $('[data-ele = data-wrap]');
			this.nowWay = '';
			this.showCalendar();
			this.events();
			this.nowCondition = {
				pagesize: 10,
				begintime: '',
				endtime: '',
				type: '1'
			};
			//this.search();
		},
		showCalendar: function() {

			var _this = this;

			var oCalendar = new Calendar({
				ele: '[calendar]',
				onSetDate: function(nowTime, b) {
					
					var oInput = $(this.inpE);
					var condition = oInput.attr('search');
					_this.nowCondition[condition] = nowTime;
					//_this.search();

				}
			});

		},
		events: function() {
			
			var _this = this;

			this.oWrap.on('click', '[conditionBtn]', function(){

				var nowWay = $(this).attr('conditionBtn');
				_this.selectTimeWay(nowWay);

			});

			this.oWrap.on('click', '[search-btn]', function(){

				_this.search();

			});

			/*this.oWrap.on('click', '[sort]', function(){

				_this.sort($(this));

			});*/

		},
		sort: function(oThis) {

			var oPoint = oThis.find('[point]');
			var sortName = oPoint.attr('point');
			var isActive = oPoint.hasClass('fa-angle-down');
			var newData;

			if(isActive) {
				//从大到小
				oPoint.addClass('fa-angle-up');
				oPoint.removeClass('fa-angle-down');
				newData = _.sortBy(this.nowList, sortName);
				this.renderTable(newData);

			} else {
				//从小到大
				oPoint.addClass('fa-angle-down');
				oPoint.removeClass('fa-angle-up');
				newData = _.sortBy(this.nowList, sortName).reverse();
				this.renderTable(newData);
			}

		},
		selectTimeWay: function(way) {

			var _this = this;
			var nowWay;

			this.allWay.removeClass('active');
			this.allWay.each(function(i){

				nowWay = _this.allWay.eq(i);
				if(way == nowWay.attr('conditionBtn')) {
					nowWay.addClass('active');
					_this.nowWay = way;
					_this.nowCondition.type = way;
					_this.search();
				}

			});

		},
		search: function() {

			var _this = this;

			if(!this.oPage) {

				this.oPage = new fenye(R.interfaces.performance.getAllList, oTplList, this.nowCondition);

			} else {

				this.oPage.refresh(this.nowCondition);

			}

		}


	});

	var oIndex = new Index();

});