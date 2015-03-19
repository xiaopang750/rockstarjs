/*TMODJS:{"version":21,"md5":"fe16f1c05fc1cd4cd00c6968e49fd2b2"}*/
define(function(require) {
    return require("../../templates")("shop/performance/allList", function($data) {
        "use strict";
        var $utils = this, list = ($utils.$helpers, $data.list), $each = $utils.$each, $escape = ($data.$value, 
        $data.$index, $utils.$escape), $out = "";
        return $out += " ", list ? ($out += " ", $each(list, function($value) {
            $out += " <tr> <td>", $out += $escape($value.curdate), $out += "</td> <td>", $out += $escape($value.combomoney), 
            $out += "</td> <td>", $out += $escape($value.servicemoney), $out += "</td> <td>", 
            $out += $escape($value.fairermoney), $out += "</td> <td>", $out += $escape($value.combomoney + $value.servicemoney), 
            $out += "</td> <td>", $out += $escape($value.fairermoney), $out += "</td> <td>", 
            $out += $escape($value.combomoney + $value.servicemoney - $value.fairermoney), $out += "</td> </tr> ";
        }), $out += " ") : $out += ' <tr> <td colspan="7">暂无数据</td> </tr> ', new String($out);
    });
});