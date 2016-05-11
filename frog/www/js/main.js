function Frog(){
	var time = document.getElementById('time');
	var box = document.getElementById('box');
	var restart = document.getElementById('restart');
	var win_info = document.getElementById('win_info');
	var frog_sound = document.getElementById('frog_sound');
	var share = document.getElementById('share');
	var share_pic = document.getElementById('share_pic');
	var share_box = document.getElementById('share_box');
	var dock = box.children;
	var self = this;

	time.sec = 0;
	time.timer = null;
	self.time = time;
	self.win_info = win_info;
	self.box = box;
	self.restart();

	EventUtil.addHandler(document,'click',function(event){
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		switch(target.id) {
			case 'restart':
				self.restart();
				break;
			case 'share':
				share_box.style.display = 'block';
				break;
			case 'share_pic':
				share_box.style.display = 'none';
				break;
		}

		switch(target.className) {
			case 'qw':
				if(time.sec == 0){
					clearInterval(time.timer);
					time.style.display = 'block';
					time.innerText = "用时： 0秒";
					time.timer = setInterval(self.timing, 1000);
				}
				[].forEach.call(dock,function(dock){
					dock.firstElementChild.className = 'qw';
				});
				for(var i=0; i < dock.length; i++) {
					if(dock[i].className == 'dock') {
						var num = dock[i].index - target.parentNode.index;
						if(target.parentNode.className == 'dock leftqw') {
							if(num == 1 || num == 2) {
								frog_sound.play();
								dock[i].className = target.parentNode.className;
								target.parentNode.className = 'dock';
								if(num==1) {
									dock[i].children[0].className = 'qw leftanim1';
								} else {
									dock[i].children[0].className = 'qw leftanim2';
								}
								break;
							}
						} else if(target.parentNode.className == 'dock rightqw') {
							if(num == -1 || num == -2) {
								frog_sound.play();
								dock[i].className = target.parentNode.className;
								target.parentNode.className = 'dock';
								if(num==-1) {
									dock[i].children[0].className = 'qw rightanim1';
								} else {
									dock[i].children[0].className = 'qw rightanim2';
								}
								break;
							}
						}
					}
				}
				var count = 0;
				for(var i=0; i < 4; i++) {
					if(dock[i].className == 'dock rightqw') {
						count +=1;
					}
				}
				if(dock[i-1].className == 'dock') {
					count +=1;
				}
				if(count == 4) {
					win_info.innerHTML = '哇!你用了<span style="color:#f30">'+(time.sec-1)+'</span>秒通过了游戏,赶快分享到朋友圈，和朋友们PK一下吧！'
					win_info.style.display = 'block';
					clearInterval(time.timer);
				}
				break;
		}
	});
}

Frog.prototype = {
	timing: function(){
		var time = this.time;
		time.innerText = "用时： "+time.sec+"秒";
		time.sec += 1;
	},
	restart: function(){
		var time = this.time;
		var win_info = this.win_info;
		var box = this.box;
		clearInterval(time.timer);
		time.sec = 0;
		time.style.display = 'none';
		win_info.style.display = 'none';

		box.innerHTML = "";
		
		for(var i=0; i < 7; i++){
			var div = document.createElement('div');
			var qw = document.createElement('div');
			qw.className = 'qw';
			div.appendChild(qw);
			div.index = i+1;
			if(i < 3) {
				div.className = 'dock leftqw';
				box.appendChild(div);;
			} else if(i == 3) {
				div.className = 'dock';
				box.appendChild(div);;
			} else {
				div.className = 'dock rightqw';
				box.appendChild(div);;
			}
		}
	}
}
