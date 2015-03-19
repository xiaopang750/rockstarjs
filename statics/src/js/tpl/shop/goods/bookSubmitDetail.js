/*TMODJS:{"version":4,"md5":"2d7ac3612d8eca71c94d5259cb08b76f"}*/
define(function(require) {
    return require("../../templates")("shop/goods/bookSubmitDetail", function($data) {
        "use strict";
        var $utils = this, $each = ($utils.$helpers, $utils.$each), list = $data.list, $escape = ($data.$value, 
        $data.$index, $utils.$escape), $out = "";
        return $out += " ", $each(list, function($value) {
            $out += " <tr list pkProductBookB=", $out += $escape($value.pkProductBookB), $out += "> <td>", 
            $out += $escape($value.productname), $out += "</td> <td>", $out += $escape($value.productnum), 
            $out += '</td> <td data="approvenum">', $out += $escape($value.approvenum), $out += '</td> <td data="realnum">', 
            $out += $escape($value.realnum), $out += "</td> <td>", $out += $escape($value.productunit), 
            $out += "</td> <td>", $out += $escape($value.productcapacity), $out += '</td> <td data="productprice">', 
            $out += $escape($value.productprice), $out += "</td> <td></td> </tr> ";
        }), $out += " ", new String($out);
    });
});