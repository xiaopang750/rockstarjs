/*TMODJS:{"version":5,"md5":"4ef31a7cad9fbd59949abb893b296df0"}*/
define(function(require) {
    return require("../../templates")("shop/customService/msg", function($data) {
        "use strict";
        var $utils = this, $each = ($utils.$helpers, $utils.$each), data = $data.data, $escape = ($data.$value, 
        $data.$index, $utils.$escape), $out = "";
        return $out += " ", $each(data, function($value) {
            $out += ' <li> <p class="ba-mb-10"> <span>', $out += $escape($value.ts), $out += '</span> </p> <p class="ba-ml-10"> ', 
            $out += $escape($value.lastmessage), $out += " </p> </li> ";
        }), new String($out);
    });
});