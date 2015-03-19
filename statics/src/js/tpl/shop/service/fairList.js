/*TMODJS:{"version":16,"md5":"1d1a2ecbc9a083a79f424cc69b9b18b2"}*/
define(function(require) {
    return require("../../templates")("shop/service/fairList", function($data) {
        "use strict";
        var $utils = this, $helpers = $utils.$helpers, list = $data.list, $each = $utils.$each, $escape = ($data.$value, 
        $data.$index, $utils.$escape), $string = $utils.$string, getRoute = $helpers.getRoute, $out = "";
        return $out += " ", list ? ($out += " ", $each(list, function($value) {
            $out += " <tr> <td>", $out += $escape($value.fairername), $out += "</td> <td>", 
            $out += $escape($value.nickname), $out += "</td> <td>", $out += $escape($value.cellphone), 
            $out += '</td> <td class="ba-tl"> <a class="btn btn-normal ba-mr-5" href="', $out += $string(getRoute("service/addEdit")), 
            $out += "?cid=", $out += $escape($value.pkFairer), $out += '">编辑</a> <a class="btn btn-normal ba-mr-5" href="', 
            $out += $string(getRoute("service/addEdit")), $out += "?lid=", $out += $escape($value.pkFairer), 
            $out += '">详情</a> ', 0 == $value.pkUser ? ($out += ' <a class="btn btn-normal ba-mr-5" href="javascript:;" reguid="', 
            $out += $escape($value.pkFairer), $out += '">注册App</a> ') : $out += " <span>已注册App</span> ", 
            $out += " </td> </tr> ";
        }), $out += " ") : $out += ' <tr> <td colspan="4">暂无数据</td> </tr> ', new String($out);
    });
});