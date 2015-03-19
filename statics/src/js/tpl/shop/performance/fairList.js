/*TMODJS:{"version":4,"md5":"5075faeaecb93e64359272b9a6799789"}*/
define(function(require) {
    return require("../../templates")("shop/performance/fairList", function($data) {
        "use strict";
        var $utils = this, $each = ($utils.$helpers, $utils.$each), pageInfo = $data.pageInfo, $escape = ($data.$value, 
        $data.$index, $utils.$escape), views = $data.views, $out = "";
        return $out += " ", $each(pageInfo.fairerList, function($value) {
            $out += " <tr> <td>", $out += $escape($value.fairername), $out += "</td> <td>", 
            $out += $escape($value.nickname), $out += "</td> <td>", $out += $escape($value.cellphone), 
            $out += '</td> <td> <a class="btn btn-normal ba-mr-5" href="', $out += $escape(views["service/addEdit"].url), 
            $out += "?cid=", $out += $escape($value.pkFairer), $out += '">编辑</a> <a class="btn btn-normal ba-mr-5" href="', 
            $out += $escape(views["service/addEdit"].url), $out += "?lid=", $out += $escape($value.pkFairer), 
            $out += '">详情</a> ', 0 == $value.pkUser ? ($out += ' <a class="btn btn-normal ba-mr-5" href="javascript:;" reguid="', 
            $out += $escape($value.pkFairer), $out += '">注册app账号</a> ') : $out += " <span>已注册app账号</span> ", 
            $out += " </td> </tr> ";
        }), new String($out);
    });
});