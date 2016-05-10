function Frog(){
	var time = document.getElementById('time');
	var box = document.getElementById('box');
	var restart = document.getElementById('restart');
	var wrap = document.getElementById('wrap');
	var dock = box.children;
	var self = this;
	time.sec = 0;
	time.timer = null;
	self.time = time;
	self.box = box;
	self.restart();
	EventUtil.addHandler(wrap,'click',function(event){
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);

		switch(target.id) {
			case 'restart':
				self.restart();
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
				for(var i=0; i < dock.length; i++) {
					if(dock[i].className == 'dock') {
						var num = dock[i].index - target.parentNode.index;
						if(target.parentNode.className == 'dock leftqw') {
							if(num == 1 || num == 2) {
								dock[i].className = target.parentNode.className;
								target.parentNode.className = 'dock';
								break;
							}
						} else if(target.parentNode.className == 'dock rightqw') {
							if(num == -1 || num == -2) {
								dock[i].className = target.parentNode.className;
								target.parentNode.className = 'dock';
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
				if(count >=4) {
					alert(time.innerText);
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
		var box = this.box;
		clearInterval(time.timer);
		time.sec = 0;
		time.style.display = 'none';

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

new Frog()