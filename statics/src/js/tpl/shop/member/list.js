/*TMODJS:{"version":10,"md5":"795ba25c9e9818903b92db115ad71fa4"}*/
define(function(require) {
    return require("../../templates")("shop/member/list", function($data) {
        "use strict";
        var $utils = this, $helpers = $utils.$helpers, list = $data.list, $each = $utils.$each, $escape = ($data.$value, 
        $data.$index, $utils.$escape), $string = $utils.$string, getRoute = $helpers.getRoute, $out = "";
        return $out += " ", list ? ($out += " ", $each(list, function($value) {
            $out += " <tr> <td> </td> <td> ", $out += $escape($value.customername), $out += " </td> <td> ", 
            $out += $escape($value.cellphone), $out += ' </td> <td class="ba-tl"> <a class="btn btn-normal ba-mr-5" href="', 
            $out += $string(getRoute([ "user/add" ])), $out += "?uid=", $out += $escape($value.pkCustomer), 
            $out += '" class="ba-mr-10">详情</a> ', 0 == $value.pkUser ? ($out += ' <a class="btn btn-normal ba-mr-5" href="javascript:;" regist-app aid="', 
            $out += $escape($value.pkCustomer), $out += '">注册App</a> ') : $out += " <span>已注册App</span> ", 
            $out += " </td> </tr> ";
        }), $out += " ") : $out += ' <tr> <td colspan="4">暂无数据</td> </tr> ', new String($out);
    });
});