/*TMODJS:{"version":9,"md5":"128cb3021940837a0ab16bd868af5c08"}*/
define(function(require) {
    return require("../../templates")("shop/content/contentList", function($data) {
        "use strict";
        var $utils = this, $helpers = $utils.$helpers, list = $data.list, $each = $utils.$each, $escape = ($data.$value, 
        $data.$index, $utils.$escape), $string = $utils.$string, getRoute = $helpers.getRoute, $out = "";
        return $out += " ", list ? ($out += " ", $each(list, function($value) {
            $out += " <tr data-list> <td>", $out += $escape($value.contenttopic), $out += '</td> <td class="ba-tl"> <a class="btn btn-normal ba-mr-5" href="', 
            $out += $string(getRoute([ "content/addEdit" ])), $out += "?cid=", $out += $escape($value.pkContent), 
            $out += '" edit ', "001" == $value.contentstatus && ($out += 'style="display:none"'), 
            $out += '> 编辑 </a> <a class="btn btn-normal ba-mr-5" href="', $out += $string(getRoute([ "content/addEdit" ])), 
            $out += "?lid=", $out += $escape($value.pkContent), $out += '">详情</a> <a class="btn btn-normal ba-mr-5" href="javascript:;" remove cid="', 
            $out += $escape($value.pkContent), $out += '" isCanceled="', $out += $escape($value.contentstatus), 
            $out += '"> ', $out += "001" == $value.contentstatus ? " 取消发布 " : " 发布 ", $out += " </a> </td> </tr> ";
        }), $out += " ") : $out += ' <tr> <td colspan="2">暂无数据</td> </tr> ', $out += " ", 
        new String($out);
    });
});