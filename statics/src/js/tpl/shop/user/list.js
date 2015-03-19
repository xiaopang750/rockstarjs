/*TMODJS:{"version":70,"md5":"574df0c0a1c04576752e1e84b14a11d8"}*/
define(function(require) {
    return require("../../templates")("shop/user/list", function($data) {
        "use strict";
        var $utils = this, iscombo = ($utils.$helpers, $data.iscombo), $escape = $utils.$escape, customername = $data.customername, cellphone = $data.cellphone, comboname = $data.comboname, servicemoney = $data.servicemoney, ordermoney = $data.ordermoney, fairername = $data.fairername, $each = $utils.$each, addition = $data.addition, pkOrder = ($data.value2, 
        $data.index2, $data.pkOrder), $out = "";
        return $out += ' <li sum-list class="ba-rel"> <span class="packType"> ', $out += iscombo ? ' <span class="ba-red"> 套餐订单 </span> ' : ' <span class="ba-qing"> 普通订单 </span> ', 
        $out += ' </span> <div> <table cellpadding="0" cellspacing="0" border="0" class="ba-mb-5"> <tr> <td width="65"> 姓名: </td> <td> ', 
        $out += $escape(customername), $out += " </td> </tr> <tr> <td> 电话号码: </td> <td> ", 
        $out += $escape(cellphone), $out += " </td> </tr> <tr> <td> 套餐: </td> <td> ", $out += $escape(comboname), 
        $out += " </td> </tr> <tr> ", servicemoney ? ($out += ' <td width="65"> 服务金额: </td> <td base> ', 
        $out += $escape(servicemoney), $out += " </td> ") : ($out += ' <td width="65"> 套餐金额: </td> <td base> ', 
        $out += $escape(ordermoney), $out += " </td> "), $out += " </tr> <tr> <td> 理发师: </td> <td> ", 
        $out += $escape(fairername), $out += ' </td> </tr> </table> <table cellpadding="0" cellspacing="0" border="0"> ', 
        $each(addition, function(value2) {
            $out += ' <tr> <td width="100"> ', $out += $escape(value2.additionname), $out += ': </td> <td> <input type="text" class="form-control" sum-item value="', 
            $out += $escape(value2.additionmoney), $out += '" pkDetail="', $out += $escape(value2.pkDetail), 
            $out += '" pkAddition="', $out += $escape(value2.pkAddition), $out += '" additionname="', 
            $out += $escape(value2.additionname), $out += '"> </td> <td width="65"> <span class="ba-ml-5"> 提成人： </span> </td> <td> <input type="text" class="form-control" readonly="readonly" fairername value="', 
            $out += $escape(value2.fairername), $out += '"> </td> </tr> ';
        }), $out += ' </table> <div class="ba-clearfix"> <span class="ba-fl ba-mt-5"> 总计: <span sum-all org="', 
        $out += $escape(ordermoney), $out += '"> ', $out += $escape(ordermoney), $out += ' </span> 元 </span> </div> </div> <a href="javascript:;" class="btn btn-primary sum-btn" sum-btn aid="', 
        $out += $escape(pkOrder), $out += '"> 结算 </a> </li>', new String($out);
    });
});