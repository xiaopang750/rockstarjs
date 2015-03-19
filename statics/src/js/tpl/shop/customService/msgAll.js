/*TMODJS:{"version":43,"md5":"70a9ac42fd5518c0d9ddd4e987fb14ad"}*/
define(function(require) {
    return require("../../templates")("shop/customService/msgAll", function($data) {
        "use strict";
        var $utils = this, customer = ($utils.$helpers, $data.customer), $escape = $utils.$escape, $each = $utils.$each, fairer = ($data.$value, 
        $data.$index, $data.fairer), $out = "";
        return $out += " ", customer.length && ($out += ' <li class="group" group="001"> <span class="group-head ba-pointer"> <span class="fa fa-caret-right"></span> <span class="fa fa-caret-down"></span> 消费者(', 
        $out += $escape(customer.length), $out += ') </span> <ul class="user-wrap"> ', $each(customer, function($value) {
            $out += ' <li cancelBubble="true"> <input type="checkbox" id="group', $out += $escape($value.pkUser), 
            $out += '" msgUid="', $out += $escape($value.pkUser), $out += '" cancelBubble="true"> <label uid="', 
            $out += $escape($value.pkUser), $out += '" for="group', $out += $escape($value.pkUser), 
            $out += '" class="ba-pointer" cancelBubble="true">', $out += $escape($value.customername), 
            $out += "</label> </li> ";
        }), $out += " </ul> </li> "), $out += " ", fairer.length && ($out += ' <li class="group" group="002"> <span class="group-head ba-pointer"> <span class="fa fa-caret-right"></span> <span class="fa fa-caret-down"></span> 理发师(', 
        $out += $escape(fairer.length), $out += ') </span> <ul class="user-wrap"> ', $each(fairer, function($value) {
            $out += ' <li user-list="true" cancelBubble="true"> <input type="checkbox" id="group', 
            $out += $escape($value.pkUser), $out += '" msgUid="', $out += $escape($value.pkUser), 
            $out += '" cancelBubble="true"> <label uid="', $out += $escape($value.pkUser), $out += '" for="group', 
            $out += $escape($value.pkUser), $out += '" class="ba-pointer" cancelBubble="true">', 
            $out += $escape($value.fairername), $out += "</label> </li> ";
        }), $out += " </ul> </li> "), new String($out);
    });
});