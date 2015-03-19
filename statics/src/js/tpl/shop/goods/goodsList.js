/*TMODJS:{"version":9,"md5":"b363f1511295ded3da75bc0ef8a4e60e"}*/
define(function(require) {
    return require("../../templates")("shop/goods/goodsList", function($data) {
        "use strict";
        var $utils = this, $helpers = $utils.$helpers, list = $data.list, $each = $utils.$each, $escape = ($data.$value, 
        $data.$index, $utils.$escape), $string = $utils.$string, getRoute = $helpers.getRoute, $out = "";
        return $out += " ", list ? ($out += " ", $each(list, function($value) {
            $out += " <tr list> <td>", $out += $escape($value.comboname), $out += "</td> <td> ", 
            $out += 1 == $value.fitgroup ? " 男士 " : 2 == $value.fitgroup ? " 女士 " : " 不限 ", 
            $out += " </td> <td>", $out += $escape($value.standardmoney), $out += '</td> <td edit="shopmoney">', 
            $out += $escape($value.shopmoney), $out += '</td> <td edit="shopmoney">', $out += $escape($value.currentmoney), 
            $out += '</td> <td edit="fairermoney">', $out += $escape(100 * $value.fairermoney), 
            $out += '%</td> <td edit="combonote">', $out += $escape($value.combonote), $out += '</td> <td> <p class="ba-mb-10"> <a class="btn btn-normal" href="javascript:;" aid="', 
            $out += $escape($value.pkShopCombo), $out += '" modify>修改</a> </p> <p class="ba-mb-10"> <a class="btn btn-normal" href="', 
            $out += $string(getRoute([ "goods/detail" ])), $out += "?gid=", $out += $escape($value.pkShopCombo), 
            $out += '">修改详情</a> </p> <p> <a class="btn btn-normal" href="', $out += $string(getRoute([ "content/addEdit" ])), 
            $out += "?pkType=", $out += $escape($value.pkShopCombo), $out += '&contenttype=combo">内容维护</a> </p> </td> </tr> ';
        }), $out += " ") : $out += ' <tr> <td colspan="8">暂无数据</td> </tr> ', new String($out);
    });
});