/*TMODJS:{"version":19,"md5":"649b838330984cd8f09f20e364c54f04"}*/
define(function(require) {
    return require("../../templates")("shop/performance/hairList", function($data) {
        "use strict";
        var $utils = this, list = ($utils.$helpers, $data.list), $each = $utils.$each, $escape = ($data.$value, 
        $data.$index, $utils.$escape), $out = "";
        return $out += " ", list ? ($out += " <ul> ", $each(list, function($value, $index) {
            $out += ' <li> <div class="ba-mb-10">  </div> <table cellpadding="0" cellspacing="0" border="0" width="100%"> <tr> <td>姓名：</td> <td>', 
            $out += $escape($value.fairername), $out += "</td> </tr> <tr> <td>排名：</td> <td>", 
            $out += $escape($index + 1), $out += '</td> </tr> <tr> <td width="100">服务业绩：</td> <td>', 
            $out += $escape($value.servicemoney), $out += '元</td> </tr> <tr> <td width="100">服务次数：</td> <td>', 
            $out += $escape($value.accountnum), $out += "</td> </tr> <tr> <td>提成金额：</td> <td>", 
            $out += $escape($value.accountmoney), $out += "元</td> </tr> </table> </li> ";
        }), $out += " </ul> ") : $out += ' <div class="tc">暂无数据</div> ', new String($out);
    });
});