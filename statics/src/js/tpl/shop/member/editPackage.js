/*TMODJS:{"version":202,"md5":"d0e09ad7107a6db975e772bc412bdd00"}*/
define(function(require) {
    return require("../../templates")("shop/member/editPackage", function($data) {
        "use strict";
        var $utils = this, nowWay = ($utils.$helpers, $data.nowWay), $escape = $utils.$escape, comboname = $data.comboname, totalcount = $data.totalcount, combobegintime = $data.combobegintime, comboendtime = $data.comboendtime, fairername = $data.fairername, discount = $data.discount, combomoney = $data.combomoney, pkShopCombo = $data.pkShopCombo, commissionpeople = $data.commissionpeople, pkCustomerCombo = $data.pkCustomerCombo, $out = "";
        return $out += ' <div class="edit-box" script-bound="package-wrap"> <table class="no-border table ba-tl" width="100%"> <tr> <td width="100"> 选择套餐名称： </td> <td colspan="3" width="300"> <div script-role="check-wrap"> <input type="text" class="form-control col-8 ', 
        "edit" == nowWay && ($out += "noInput"), $out += '" form_check="sys" ischeck="true" name="comboname" tip="此项为必填" wrong="此项为必填" re="(.+)" comboname readonly="readonly" value="', 
        $out += $escape(comboname), $out += '" ', "edit" == nowWay && ($out += 'infoDisabled="infoDisabled"'), 
        $out += '> </div> </td> </tr> <tr> <td width="100"> 套餐次数： </td> <td colspan="3"> <input type="text" class="form-control col-8 ', 
        "edit" == nowWay && ($out += "noInput"), $out += '" value="', $out += $escape(totalcount), 
        $out += '" disabled="disabled" pack-count> </td> </tr> <tr> <td width="100"> 套餐开始时间： </td> <td> <div script-role="check-wrap"> <input type="text" class="form-control" box-start calendar form_check="sys" ischeck="true" name="combobegintime" tip="此项为必填" wrong="此项为必填" re="(.+)" readonly="readonly" value="', 
        $out += $escape(combobegintime), $out += '"> </div> </td> <td width="100"> 套餐结束时间： </td> <td> <div script-role="check-wrap"> <input type="text" class="form-control" box-end calendar form_check="sys" ischeck="true" name="comboendtime" tip="此项为必填" wrong="此项为必填" re="(.+)" readonly="readonly" value="', 
        $out += $escape(comboendtime), $out += '"> </div> </td> </tr> <tr> <td width="100"> 提成人： </td> <td colspan="3"> <div script-role="check-wrap"> <input type="text" class="form-control col-8 ', 
        "edit" == nowWay && ($out += "noInput"), $out += '" form_check="sys" ischeck="true" name="fairername" tip="此项为必填" wrong="此项为必填" re="(.+)" fairer readonly="readonly" value="', 
        $out += $escape(fairername), $out += '" ', "edit" == nowWay && ($out += 'infoDisabled="infoDisabled"'), 
        $out += '> </div> </td> </tr> <tr> <td width="100"> 优惠金额： </td> <td colspan="3"> <div script-role="check-wrap"> <input type="text" class="form-control col-6 ', 
        "edit" == nowWay && ($out += "noInput"), $out += '" sale form_check="sys" ischeck="free" name="discount" tip="此项为必填" wrong="优惠金额格式不正确" re="((\\d|\\.)+)" value="', 
        $out += $escape(discount), $out += '" ', "edit" == nowWay && ($out += 'disabled="disabled"'), 
        $out += '> </div> </td> </tr> <tr> <td width="100"> 合计： </td> <td colspan="3"> <span sum> ', 
        combomoney ? ($out += " ", $out += $escape(combomoney - discount), $out += " ") : $out += " 0 ", 
        $out += ' </span>元 </td> </tr> </table> <div class="ba-tc"> <a href="javascript:;" class="btn btn-primary" script-role="package-btn" money="', 
        $out += $escape(combomoney), $out += '" pkShopCombo="', $out += $escape(pkShopCombo), 
        $out += '" fairerStr="', $out += $escape(commissionpeople), $out += '" pkCustomerCombo="', 
        $out += $escape(pkCustomerCombo), $out += '"> 确定 </a> <a href="javascript:;" class="btn btn-danger" sc="close">取消</a> </div> </div> ', 
        new String($out);
    });
});