/*TMODJS:{"version":11,"md5":"8455e0ae949e17bd9751b6488282f842"}*/
define(function(require) {
    return require("../../templates")("shop/goods/deliveryDetail", function($data) {
        "use strict";
        var $utils = this, $each = ($utils.$helpers, $utils.$each), list = $data.list, $escape = ($data.$value, 
        $data.$index, $utils.$escape), $out = "";
        return $out += " ", $each(list, function($value) {
            $out += " <tr list gid=", $out += $escape($value.pkProduct), $out += " pkProductDeliveryB=", 
            $out += $escape($value.pkProductDeliveryB), $out += "> <td>", $out += $escape($value.productname), 
            $out += '</td> <td data="productnum">', $out += $escape($value.productnum), $out += "</td> <td>", 
            $out += $escape($value.productunit), $out += '</td> <td data="productprice">', $out += $escape($value.productprice), 
            $out += "</td> <td></td> </tr> ";
        }), $out += " ", new String($out);
    });
});