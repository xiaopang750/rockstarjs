/*TMODJS:{"version":102,"md5":"a10503545a370f1bcd60bf5d5b32bc94"}*/
define(function(require) {
    return require("../../templates")("shop/member/package", function($data) {
        "use strict";
        var $utils = this, $helpers = $utils.$helpers, list = $data.list, $each = $utils.$each, $escape = ($data.$value, 
        $data.$index, $utils.$escape), timeLeft = $helpers.timeLeft, $out = "";
        return $out += " ", list ? ($out += " ", $each(list, function($value) {
            $out += " <tr list-info> <td packname>", $out += $escape($value.comboname), $out += "</td> <td>", 
            $out += $escape($value.leftcount), $out += "</td> <td timeLeft>", $out += $escape(timeLeft($value.comboendtime, $value.combobegintime)), 
            $out += '天</td> <td class="ba-tl"> <p class="ba-mb-5">理发师:', $out += $escape($value.lastfairername), 
            $out += '</p> <p class="ba-mb-5">金额:', $out += $escape($value.lastmoney), $out += "</p> <p>时间:", 
            $out += $escape($value.lastusetime), $out += "</p> </td> <td money>", $out += $escape($value.combomoney - $value.discount), 
            $out += '</td> <td> <a class="btn btn-normal" href="', $out += $escape($value.orderUrl), 
            $out += "&spid=", $out += $escape($value.pkShopCombo), $out += "&comboid=", $out += $escape($value.pkCustomerCombo), 
            $out += '" order>下单</a> <a class="btn btn-normal" href="javascript:;" aid="', $out += $escape($value.pkCustomerCombo), 
            $out += '" ', 0 == $value.pkCustomerCombo && ($out += 'class="ba-hidden"'), $out += " edit>编辑</a> </td> </tr> ";
        }), $out += " ") : $out += ' <tr> <td colspan="6">暂无数据</td> </tr> ', new String($out);
    });
});