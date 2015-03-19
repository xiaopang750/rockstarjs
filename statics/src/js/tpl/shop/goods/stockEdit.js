/*TMODJS:{"version":31,"md5":"d78672b52aaf2c172f22e7f7e71e5f45"}*/
define(function(require) {
    return require("../../templates")("shop/goods/stockEdit", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), shopprice = $data.shopprice, $out = "";
        return $out += ' <div class="edit-box" script-bound="form-check"> <div class="ba-mb-40"> <span class="text">输入本店价格：</span> <div script-role="check-wrap"> <input type="text" class="form-control" now-price value="', 
        $out += $escape(shopprice), $out += '" form_check="sys" ischeck="true" name="shopprice" tip="此项为必填" wrong="请填写数字" re="(\\d+)"> </div> </div> <div class="ba-tc"> <a href="javascript:;" class="btn btn-primary" sc="confirm" script-role="confirm-btn">确定</a> <a href="javascript:;" class="btn btn-danger" sc="close">取消</a> </div> </div>', 
        new String($out);
    });
});