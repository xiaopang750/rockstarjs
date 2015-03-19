/* 获取全局url */

template.helper('getUrl', function(content){
       
    return __url__data[content];

});


/* 模板内图片路径前缀 */
template.helper('basePath', function(content){

    if(!content) {
       return R.uri.assets;  
    } else {
        return R.uri.assets + content;
    }
});

template.helper('cut', function(content, num){

    var len;

    if( typeof content !== 'string' ) {
        return content;
    } else {
        
        len = content.length;

        if( len <= num ) {

            return content;

        } else {

            return content.substring(0, num) + '...';

        }

    }

});

template.helper('rnd', function(content, m, n){

    return parseInt(Math.random()*((m+1)-n)+n);

});

template.helper('filter', function(content, arr){

    var i,
        j,
        len,
        num,
        arrContent,
        sum,
        result,
        str,
        isAllow;

    arrContent = content.split('');
    len = arrContent.length; 
    sum = '';
    result = [];
    str = arr.join(',');
    str = str.replace(/\,/gi, '');
    result = str.split('');
    num = result.length;

    for (i=0; i<len; i++) {

        isAllow = true;

        for (j=0; j<num; j++) {

            if(arrContent[i] == result[j]) {

                isAllow = false;
            }
        }

        if(!isAllow) {

            sum += '<span style="padding:2px 5px;background:#f00;border-radius:5px;">'+ arrContent[i] +'</span>';

        } else {

            sum += '<span>'+ arrContent[i] +'</span>';
        }

    }

    return sum;

});


template.helper('filter2', function(content, arr){

    var i,
        j,
        len,
        num,
        arrContent,
        sum,
        result,
        str,
        isAllow;

    arrContent = content.split('');
    len = arrContent.length; 
    sum = '';
    result = [];
    str = arr.join(',');
    str = str.replace(/\,/gi, '');
    result = str.split('');
    num = result.length;

    for (i=0; i<len; i++) {

        isAllow = true;

        for (j=0; j<num; j++) {

            if(arrContent[i] == result[j]) {

                isAllow = false;
            }
        }

        if(isAllow) {

            sum += arrContent[i];

        }

    }

    return sum;

});

template.helper('changeIndex', function(content){

    var data = {
        "0": "一",
        "1": "二",
        "2": "三",
        "3": "四",
        "4": "五",
        "5": "六"
    }

    return data[content];

});

template.helper('cutDomain', function(content){

    var num = content.length;
    var re = /http\:\S+\d+\//gi;
    var org = content.match(re)[0];
   
    return org;

}); 


template.helper('cutDomainName', function(content){

    var num = content.length;
    var re = /http\:\S+\d+\//gi;
    var org = content.match(re)[0];
    var len = org.length;
    var target = content.substring(len);
    target = target.replace(/\.html/, ''); 
   
    return target;

});


template.helper('nowTime', function(content){

    var oDate,
        y,
        m,
        d,
        h,
        m,
        s,
        time;

    oDate = new Date();
    y = oDate.getFullYear();
    month = oDate.getMonth() + 1;
    d = oDate.getDate();
    h = oDate.getHours();
    m = oDate.getMinutes();
    s = oDate.getSeconds(); 
    time = y + '-' + toDouble(month) + '-' + toDouble(d) + ' ' + toDouble(h) + ':' + toDouble(m) + ':' + toDouble(s);
   
    return time;

    function toDouble(num) {

        if(num < 10) {
            return '0' + num;
        } else {
            return num;
        }

    }

});  


template.helper('toDouble', function(content){ 

    if(content < 10) {
        return '0' + content
    } else {
        return content;
    }

}); 

template.helper('xss', function(content){ 

    content = content.replace("script", '');

    return content;

});   


