function FlappyBird(){
	var logo_bird = document.getElementById('logo_bird');
	var start_logo = document.getElementById('start_logo');
	var btn = document.getElementById('btn');
	var start = document.getElementById('start');
	var get_ready_view = document.getElementById('get_ready_view');
	var bird = document.getElementById('bird');
	var wrap = document.getElementById('wrap');
	var land = document.getElementById('land');
	var pipe_up = document.getElementsByClassName('pipe_up');
	var pipe_down = document.getElementsByClassName('pipe_down');
	var pipe_up_body = document.getElementsByClassName('pipe_up_body');
	var pipe_down_body = document.getElementsByClassName('pipe_down_body');
	var self = this;

	this.logo_bird = logo_bird;
	this.start_logo = start_logo;
	this.pipe_up = pipe_up;
	this.pipe_down = pipe_down;
	this.pipe_up_body = pipe_up_body;
	this.pipe_down_body = pipe_down_body;
	this.bird = bird;
	this.land = land;
	this.started = true;

	land.className = 'landanim';

	EventUtil.addHandler(wrap,'click',function(e){
		var e = e || window.event;
		var target = e.target || e.srcElement;
		switch(target.id){
			case 'start':
				start_logo.style.display = 'none';
				clearInterval(self.bounce_logo.timer);
				btn.style.display = 'none';
				get_ready_view.style.display = 'block';
				bird.style.display = 'block';
				self.bird_flying(bird);
				EventUtil.addHandler(wrap,'click',function(){
					get_ready_view.style.display = 'none';
					clearTimeout(bird.timer);
					clearInterval(bird.down_timer);
					bird.className = 'bird_up';
					bird.style.left = 150+'px';
					effect.animate(bird,{'top':bird.offsetTop - 30},{'tween_type':'Quad','ease_type':'easeOut','duration':10},function(){
						bird.className = 'bird_down';
						bird.down_timer = setInterval(function(){
							var landed = self.interact(bird,land);
							if(landed) {
								clearInterval(bird.down_timer);
								clearTimeout(bird.timer);
								clearInterval(self.changeLeft.timer);
								land.className = '';
								bird.className = '';
							}
							bird.style.top = bird.offsetTop + 4 + 'px';
						},30);
					});
					if(self.started) {
						self.changeHeight();
						self.changeLeft.timer = setInterval(function(){
							self.changeLeft();
						},30);
						self.started = false;
					}
				});
				break;
		}
	});

	this.bird_flying(logo_bird);
	this.bounce_logo();
}

FlappyBird.prototype = {
	bounce_logo_finish:true,
	bird_flying: function(obj){
		var logo_bird_src = this.logo_bird_src;
			if(obj.src == 1){
				obj.style.backgroundImage = 'url(../img/bird0.png)';
				obj.src = 2;
			} else {
				obj.style.backgroundImage = 'url(../img/bird1.png)';
				obj.src = 1;
			}

			obj.timer = setTimeout(arguments.callee,80,obj);
	},
	bounce_logo: function(){
		var start_logo = this.start_logo;
		var self = this;
		function move(){
			if(self.bounce_logo_finish){
				effect.animate(start_logo,{'top':70},{'tween_type':'Circ','ease_type':'easeIn','duration':20},function(){
					self.bounce_logo_finish = false;
					effect.animate(start_logo,{'top':50},{'tween_type':'Circ','ease_type':'easeIn','duration':20},function(){
						self.bounce_logo_finish = true;
					});
				});
			}
		}
		this.bounce_logo.timer = setInterval(move,300);
	},
	interact:function(obj_1,obj_2){
		var a_x_w = Math.abs((obj_1.offsetLeft+obj_1.offsetWidth/2) - (obj_2.offsetLeft+obj_2.offsetWidth/2));
	    var b_w_w = Math.abs((obj_1.offsetWidth+obj_2.offsetWidth)/2);
	    var a_y_h = Math.abs((obj_1.offsetTop+obj_1.offsetHeight/2) - (obj_2.offsetTop+obj_2.offsetHeight/2)); 
	    var b_h_h = Math.abs((obj_1.offsetHeight+obj_2.offsetHeight)/2);
	    if( a_x_w < b_w_w && a_y_h < b_h_h ) return true;
	    else return false;
	},
	changeHeight:function(){
		var left = 500;
		var pipe_down = this.pipe_down;
		var pipe_up = this.pipe_up;
		var pipe_up_body = this.pipe_up_body;
		var pipe_down_body = this.pipe_down_body;
		for(var i=0; i<pipe_up_body.length; i++) {
			var pipe_up_height = this.randomHeight(50,150);
			var pipe_down_height = 300 - pipe_up_height;
			pipe_up_body[i].style.height = pipe_up_height + 'px';
			pipe_down_body[i].style.height = pipe_down_height + 'px';
			pipe_up[i].style.left = left + 'px';
			pipe_down[i].style.left = left + 'px';
			pipe_up[i].className = 'pipe_up display';
			pipe_down[i].className = 'pipe_down display';
			left +=150;
		}
	},
	changeLeft:function(){
		var pipe_down = this.pipe_down;
		var pipe_up = this.pipe_up;
		var pipe_up_body = this.pipe_up_body;
		var pipe_down_body = this.pipe_down_body;
		var bird = this.bird;
		var land = this.land;
		var self = this;
		for(var i=0; i<pipe_down.length; i++) {
			var left = pipe_down[i].offsetLeft - 3;
			if(pipe_down[i].offsetLeft <= -60) {
				var pipe_up_height = this.randomHeight(50,150);
				var pipe_down_height = 300 - pipe_up_height;
				pipe_up_body[i].style.height = pipe_up_height + 'px';
				pipe_down_body[i].style.height = pipe_down_height + 'px';
				left = 550
			}
			pipe_down[i].style.left = left + 'px';
			pipe_up[i].style.left = left + 'px';
			if(this.interact(bird,pipe_up[i]) || this.interact(bird,pipe_down[i]) || this.interact(bird,land)){
				clearTimeout(bird.timer);
				clearInterval(this.changeLeft.timer);
				land.className = '';
				bird.className = '';
				bird.down_timer = setInterval(function(){
					var landed = self.interact(bird,land);
					bird.style.top = bird.offsetTop + 5 + 'px';
					if(landed) {
						clearInterval(bird.down_timer);
					}
				},30);
			}
		}
	},
	randomHeight:function(m,n){
		return Math.ceil(Math.random()*(n-m)+m);
		// [0,1) * (n-m) + m
		// [0,n-m) + m
		// [m,n)
	}
}

