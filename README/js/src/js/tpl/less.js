/*TMODJS:{"version":9,"md5":"8e45df5ad120634e5306ec580d90b98e"}*/
define(function(require) {
    return require("./templates")("less", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), nav = $data.nav, $out = "";
        return $out += '<h2>关于 Less</h2> <div id="', $out += $escape(nav[0].id), $out += '" content-section> <h3> Less是什么 </h3> <p> less顾名思义，write less do more, </p> </div>', 
        new String($out);
    });
});