/*TMODJS:{"version":7,"md5":"fd7d1de046b18092b33e9dc344126e08"}*/
define(function(require) {
    return require("../templates")("global/left-nav", function($data) {
        "use strict";
        var $utils = this, $each = ($utils.$helpers, $utils.$each), nav = $data.nav, $escape = ($data.$value, 
        $data.$index, $utils.$escape), $out = "";
        return $out += " ", $each(nav, function($value) {
            $out += ' <li> <a href="#', $out += $escape($value.id), $out += '"> ', $out += $escape($value.name), 
            $out += " </a> </li> ";
        }), new String($out);
    });
});