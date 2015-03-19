/*TMODJS:{"version":12,"md5":"6939aa6681cd35012ddb51ab3eb4a8c0"}*/
define(function(require) {
    return require("../../templates")("shop/goods/bookGoods", function($data) {
        "use strict";
        var $utils = this, list = ($utils.$helpers, $data.list), $each = $utils.$each, $escape = ($data.$value, 
        $data.$index, $utils.$escape), $out = "";
        return $out += " ", list && ($out += " ", $each(list, function($value) {
            $out += ' <li><a href="javascript:;" gid=', $out += $escape($value.pkShopProdcut), 
            $out += " unit=", $out += $escape($value.unit), $out += " capacity=", $out += $escape($value.capacity), 
            $out += " productprice=", $out += $escape($value.productprice), $out += " goods-item>", 
            $out += $escape($value.productname), $out += "</a></li> ";
        }), $out += " "), $out += " ", new String($out);
    });
});