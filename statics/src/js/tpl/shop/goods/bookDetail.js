/*TMODJS:{"version":17,"md5":"1ee15a22e3a44afd7b84353c0ca69253"}*/
define(function(require) {
    return require("../../templates")("shop/goods/bookDetail", function($data) {
        "use strict";
        var $utils = this, $each = ($utils.$helpers, $utils.$each), list = $data.list, $escape = ($data.$value, 
        $data.$index, $utils.$escape), $out = "";
        return $out += " ", $each(list, function($value) {
            $out += " <tr list pkProductBookB=", $out += $escape($value.pkProductBookB), $out += "> <td>", 
            $out += $escape($value.productname), $out += "</td> <td>", $out += $escape($value.productnum), 
            $out += '</td> <td data="approvenum">', $out += $escape($value.approvenum), $out += '</td> <td data="realnum">', 
            $out += $escape($value.realnum), $out += "</td> <td>", $out += $escape($value.productunit), 
            $out += "</td> <td>", $out += $escape($value.productcapacity), $out += '</td> <td data="productprice">', 
            $out += $escape($value.productprice), $out += '</td> <td> <a class="btn btn-normal" href="javascript:;" modify-real>修改实收</a> </td> </tr> ';
        }), $out += " ", new String($out);
    });
});