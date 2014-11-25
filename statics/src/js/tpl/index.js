/*TMODJS:{"version":10,"md5":"1f9398f4e0e84d7538f8b606672c5ffa"}*/
define(function(require) {
    return require("./templates")("index", function($data) {
        "use strict";
        var $utils = this, $each = ($utils.$helpers, $utils.$each), data = $data.data, $escape = ($data.$value, 
        $data.$index, $utils.$escape), $out = "";
        return $out += "<div> <ul> ", $each(data, function($value) {
            $out += " <li>", $out += $escape($value), $out += "</li> ";
        }), $out += " </ul> </div> ", new String($out);
    });
});