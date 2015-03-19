/*TMODJS:{"version":96,"md5":"32b8c882f628f5a4efb0724047c5fec9"}*/
define(function(require) {
    return require("./templates")("index", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), nav = $data.nav, $out = "";
        return $out += '<h2>关于 RockstarCss</h2> <div id="', $out += $escape(nav[0].id), 
        $out += '" content-section> <h3> RockstarCss是什么 </h3> <p> RockstarCss是基于seajs,cmd规范为核心的样式表,以bootstrap框架为核心，提供基础，重置，网站布局,按钮，图标，表单，table, 尺寸, 背景，css3辅助类, font-icon的模块化样式表，模块化的目录结构，使开发和管理方便。一切皆为模块，我们不是builder,而是模块的组装者。 </p> <p> 目前框架只包括一套通过less合并的基础样式表，组件模块后期会加上。 </p> </div> <div id="', 
        $out += $escape(nav[1].id), $out += '" content-section> <h3> 特点 </h3> <ul> <li> 致力于提高构建页面的开发效率。 </li> <li> 做一件事只做一件事，也许我们会边写样式边切图，边写样式边写html边写样式，这样效率可能会很低，当我们拿到psd后，首先把所有的icon,button,bg,layer布局等所需要的图片切好，放入到指定的目录中。然后把button,icon这些组件当成模块，写好样式。最后我们只需把这些模块化的组件组装成一个页面即可。模块化，使目录结构更为清晰，便于管理。 <div class="ba-mt-20"> <div class="ba-red"> assets-资源目录 </div> <img src="../assets/main/index/ex1.png" width="80%"> </div> <div class="ba-mt-20"> <div class="ba-red"> assets-lib目录 </div> <img src="../assets/main/index/ex2.png" width="80%"> </div> <div class="ba-mt-20"> <div class="ba-red"> 总的less文件 </div> <img src="../assets/main/index/ex3.jpg" width="50%"> </div> <div class="ba-gray"> 也许我们可以把所有图片放一个目录，为了节约http请求次数把所有基础样式写到一起，这种维护性我们可以不用谈了。 </div> </li> <li> 以less为核心，利用grunt的less,watch事实的在本地把.less文件编译成.css文件，减小了上线前编译合并css的工作量，页面中不需要引入less.js。开发需要的grunt模块已经放入文件夹中，只需用grunt运行即可。 </li> <li> gruntfile.js包含快速搭建本地静态服务器的配置，使静态页面能快速的在服务器环境下预览，并且可以快速部署到常用的开发操作系统下。 </li> <li> 提供livereload，自动刷新功能，不强制依赖于任何编译器插件，使得开发的文件的可移植性变强。 </li> <li> 去除了bootstrap对移动端和响应式的支持，提供对ie7的支持，按照模块化的开发方式重新部署了目录结构。 </li> <li> 使用holder.js站位，我们不需要到处去找站位图片。 </li> </ul> </div> <div id="', 
        $out += $escape(nav[2].id), $out += '" content-section> <h3> 兼容性 </h3> <ul> <li> 兼容到ie7，忽略ie6, bsie6。 </li> <li> 采用样式降级的处理方式。高级浏览器会使用css3实现圆角，阴影...低级浏览器会在不影响功能和整体设计布局的情况下，省略这些效果，功能第一，ui第二。如果是特殊的活动页，有特殊的需求，就要弃用现在的ui基础样式，只使用重置和基础的样式表，less文件都是分开的我们可以根据情况去自由组合，重写我们需要的。 </li> </ul> </div> ', 
        new String($out);
    });
});