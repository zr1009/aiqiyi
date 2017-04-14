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
	
	
	//banner
	var oControl = document.getElementById('control');
	var oVideoBox = document.getElementById('videoBox');
	var oVideo = document.getElementById('video');
	var oPause = document.getElementById('pause');
	var oLose = document.getElementById('lose');
	var oAmount = document.getElementById('amount');
	var oRange = document.getElementById('range');
	var oRangeGo = document.getElementById('rangeGo');
	var oDot = document.getElementById('dot');
	var oFull = document.getElementById('full');
	
	
	var onOff = false
	iNow = 0
	setTimeout(function() {
		oAmount.innerHTML = parseInt(oVideo.duration / 3600) + ':' + toDub(parseInt((oVideo.duration % 3600) / 60)) + ':' + toDub(parseInt(oVideo.duration % 60))
		oAmount.style.color="#fff"
	}, 200)

	// 暂停播放
	var t = null
	oPause.addEventListener('touchend', function() {
		onOff = !onOff;
		if(onOff) {
			oVideo.play();
			oPause.style.backgroundImage = 'url(img/pause.png)';
			t = setTimeout(function() {
				oPause.style.display = 'none'
				oControl.style.bottom = '-1.7rem'
			}, 1000)
		} else {
			clearTimeout(t)
			oVideo.pause();
			oPause.style.backgroundImage = 'url(img/play.png)';
		}
	}, false)

	oVideo.addEventListener('touchend', function() {
		onOff = false;
		oVideo.pause();
		oPause.style.display = 'block'
		oControl.style.bottom = '0rem'
		clearTimeout(t);
		oPause.style.backgroundImage = 'url(img/play.png)';
	}, false)

	//	播放事件
	var maxRange = oRange.offsetWidth
	var maxDot = maxRange - 5
	oVideo.addEventListener('timeupdate', function() {
		oVideo.volume = 0.5;
		oLose.innerHTML = toDub(parseInt(oVideo.currentTime / 60)) + ':' + toDub(parseInt(oVideo.currentTime % 60));
		oLose.style.color="#fff";
		oRangeGo.style.width = maxRange * oVideo.currentTime / oVideo.duration + 'px'
		var left = left >= maxDot ? maxDot : oRangeGo.offsetWidth - 5
		oDot.style.left = left + 'px'
	}, false)

	// 拖动滑块调节进度
	var l = 0
	oDot.addEventListener('touchstart', function(e) {
		if(onOff) {
			oVideo.pause()
			oPause.style.backgroundImage = 'url(img/play.png)';
		}
	}, false)

	var width, left = 0

	oDot.addEventListener('touchmove', function(e) {
		width = e.touches[0].clientX - oRange.offsetLeft
		width = width >= maxRange ? maxRange : width
		width = width <= 0 ? 0 : width
		oRangeGo.style.width = width + 'px'
		left = oRangeGo.offsetWidth - 5
		left = left >= maxRange - 5 ? maxRange - 5 : left
		left <= -5 ? -5 : left
		oDot.style.left = left + 'px'
		oVideo.currentTime = (oRangeGo.offsetWidth / maxRange) * oVideo.duration
		oLose.innerHTML = toDub(parseInt(oVideo.currentTime / 60)) + ':' + toDub(parseInt(oVideo.currentTime % 60));
		oLose.style.color="#fff";
	}, false)

	oDot.addEventListener('touchend', function(e) {
		if(onOff) {
			oVideo.play()
			oPause.style.backgroundImage = 'url(img/pause.png)';
		}
	}, false)

	//	全屏

	oFull.addEventListener('touchend', function() {
		oVideo.webkitEnterFullscreen()
	})
	
	function toDub(n) {
		return n > 9 ? '' + n : '0' + n;
	}
	
}