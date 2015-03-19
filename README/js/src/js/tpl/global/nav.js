/*TMODJS:{"version":4,"md5":"2d2a42852074c0f15af8a71bedd266da"}*/
define(function(require) {
    return require("../templates")("global/nav", function($data) {
        "use strict";
        var $utils = this, $each = ($utils.$helpers, $utils.$each), data = $data.data, $escape = ($data.$value, 
        $data.$index, $utils.$escape), $out = "";
        return $out += ' <div class="inner"> <ul class="ba-clearfix ba-pt-20"> ', $each(data, function($value, $index) {
            $out += ' <li> <a href="', $out += $escape($value.link), $out += '"> ', 0 == $index && ($out += ' <span class="fa fa-home ba-font-18"></span> '), 
            $out += " ", $out += $escape($value.name), $out += " </a> </li> ";
        }), $out += " </ul> </div>", new String($out);
    });
});