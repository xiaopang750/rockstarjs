window.writeNav = function(oWrap, arr) {

	var i,
		num,
		strList,
		sin,
		oLi,
		oUl;

	strList = '';
	num = arr.length;
	oUl = document.createElement('ul');

	for (i = 0; i < num; i++) {

		sin = arr[i];

		if(sin.root) {

			oLi = document.createElement('li');
			oLi.innerHTML = '<span root>'+ sin.root +'<em class="fa fa-angle-left"></em></span>';

		} else {

			oLi = document.createElement('li');
			oLi.innerHTML = '<a href='+ sin.link +' onclick="return false;" onfocus="this.blur()" linker>'+ sin.fileName +'</a>';
		}

		oUl.appendChild(oLi);

		if(arr[i].children.length) {

			writeNav(oLi, arr[i].children);

		}

	}

	oWrap.appendChild(oUl);
}