/*TMODJS:{"version":58,"md5":"d010eeb27777e069863328b3ce02ee5f"}*/
define(function(require) {
    return require("../../templates")("shop/goods/bookAdd", ' <tr list> <td class="ba-rel"> <input class="col-12 form-control" type="text" goods-list-input> <div class="goods-list-wrap" goods-list-wrap> <ul goods-list></ul> </div> </td> <td><input class="col-12 form-control" type="text" book-num-input></td> <td></td> <td></td> <td data="unit"></td> <td data="capacity"></td> <td data="productprice"></td> <td><a class="btn btn-normal" href="javascript:;" goods-remove>删除</a></td> </tr> ');
});