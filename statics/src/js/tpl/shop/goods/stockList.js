/*TMODJS:{"version":26,"md5":"2ee9dcb72d99f035d75960c4c56bdb18"}*/
define(function(require) {
    return require("../../templates")("shop/goods/stockList", function($data) {
        "use strict";
        var $utils = this, list = ($utils.$helpers, $data.list), $each = $utils.$each, $escape = ($data.$value, 
        $data.$index, $utils.$escape), $out = "";
        return $out += " ", list ? ($out += " ", $each(list, function($value) {
            $out += " <tr list> <td>", $out += $escape($value.brand), $out += "</td> <td>", 
            $out += $escape($value.series), $out += "</td> <td>", $out += $escape($value.itemno), 
            $out += "</td> <td>", $out += $escape($value.capacity), $out += "</td> <td>", $out += $escape($value.productname), 
            $out += "</td> <td>", $out += $escape($value.productnum), $out += "</td> <td>", 
            $out += $escape($value.unit), $out += "</td> <td>", $out += $escape($value.productprice), 
            $out += '</td> <td edit="shopprice">', $out += $escape($value.shopprice), $out += '</td> <td><a class="btn btn-normal" href="javascript:;" aid="', 
            $out += $escape($value.pkShopProdcut), $out += '" modify>修改</a></td> </tr> ';
        }), $out += " ") : $out += ' <tr> <td colspan="8">暂无数据</td> </tr> ', new String($out);
    });
});