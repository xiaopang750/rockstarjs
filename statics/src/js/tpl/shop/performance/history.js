/*TMODJS:{"version":19,"md5":"3091cdf600ca15350e6c75f2a835791c"}*/
define(function(require) {
    return require("../../templates")("shop/performance/history", function($data) {
        "use strict";
        var $utils = this, list = ($utils.$helpers, $data.list), $each = $utils.$each, $escape = ($data.$value, 
        $data.$index, $utils.$escape), $out = "";
        return $out += " ", list ? ($out += " ", $each(list, function($value) {
            $out += " <tr> <td>", $out += $escape($value.orderno), $out += "</td> <td>", $out += $escape($value.ordetime), 
            $out += "</td> <td>", $out += $escape($value.ordermoney), $out += "</td> <td> ", 
            $out += "Y" == $value.iscombo ? " 套餐订单 " : " 服务订单 ", $out += " </td> <td> ", $out += $escape($value.operator), 
            $out += " </td> <td>", $out += $escape($value.fairername), $out += "</td> <td>", 
            $out += $escape($value.fairermoney), $out += "</td> </tr> ";
        }), $out += " ") : $out += ' <tr> <td colspan="7">暂无数据</td> </tr> ', new String($out);
    });
});