window.onload=function(){
	//回到顶部
	window.onscroll = function() {
		var needTop = document.body.scrollTop
		if(needTop >= 400) {
			fhdb.style.display = 'block'
		} else {
			fhdb.style.display = 'none'
		}
	}
	//搜索	
	Imgb.addEventListener('touchend', function() {
		ycsou.style.display = 'block';
	}, false)
//	search.addEventListener('touchend', function() {
//		ycsou.style.display = 'block';
//	}, false)	
	quxiao.addEventListener('touchend', function() {
		ycsou.style.display = 'none';
	}, false)
	Ipt.oninput = function() {
		if(Ipt.value != '') {
		quxiao.innerHTML = '搜索';
		quxiao.style.background = '#01C000';
		quxiao.style.color = '#fff';
		qx.style.display = 'block';
	} else {
		quxiao.style.background = '#ededed';
		quxiao.style.color = '#000';
		quxiao.innerHTML = '取消';
		qx.style.display = 'none';
		}
	}
	qx.addEventListener('touchend', function() {
		quxiao.style.background = '#ededed';
		quxiao.style.color = '#000';
		qx.style.display = 'none';
		quxiao.innerHTML = '取消';
		Ipt.value = '';
		Ipt.focus();
	}, false)

	//导航拖动
	var Oa = nava.getElementsByTagName('a');	
	var Wid = 0
	for(var i = 0; i < Oa.length; i++) {
		Wid += Oa[i].offsetWidth
	}
	nava.style.width = Wid + 'px'

	for(var i = 0; i < Oa.length; i++) {
		Oa[i].onclick = function() {
			for(var i = 0; i < Oa.length; i++) {
				Oa[i].style.color = '#333333';
				Oa[i].style.borderBottom = 'none';
			}
			this.style.color = '#20bc22';
			this.style.borderBottom = '0.05rem solid #20bc22';
		}
	}
	var Oldl = 0;
	nava.addEventListener('touchstart', function(e) {
		Oldl = e.touches[0].clientX;
	}, false)

	var newl = 0;
	var newl1 = 0;
	var now = 0;
	nava.addEventListener('touchmove', function(e) {
		newl = e.touches[0].clientX;
		newl1 = newl - Oldl;
		nava.style.transition = '0s';
		nava.style.left = now + newl1 + 'px';
	}, false)

	var left = 0;
	setTimeout(function() {
		left = nav.offsetWidth - nava.offsetWidth;
	}, 500)

	var now = 0;
	nava.addEventListener('touchend', function(e) {
		now = e.changedTouches[0].clientX
		now = nava.offsetLeft;
		nava.style.transition = 'all 0.5s ease';
		if(now >= 0) {
			now = 0;
			nava.style.left = '0px';
		}
		if(now <= left) {
			now = left;
			nava.style.left = left + 'px';
		}
	}, false)
	
	

}