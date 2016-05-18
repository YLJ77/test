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
	var score_num = document.getElementById('score_num');
	var score_num1 = document.getElementById('score_num1');
	var score_num2 = document.getElementById('score_num2');game_over
	var game_over = document.getElementById('game_over');
	var c_ones = document.getElementById('c_ones');
	var c_decade = document.getElementById('c_decade');
	var b_ones = document.getElementById('b_ones');
	var b_decade = document.getElementById('b_decade');
	var medal = document.getElementById('medal');
	var restart = document.getElementById('restart');
	var self = this;

	this.logo_bird = logo_bird;
	this.start_logo = start_logo;
	this.pipe_up = pipe_up;
	this.pipe_down = pipe_down;
	this.pipe_up_body = pipe_up_body;
	this.pipe_down_body = pipe_down_body;
	this.bird = bird;
	this.land = land;
	this.score_num = score_num;
	this.score_num1 = score_num1;
	this.score_num2 = score_num2;
	this.game_over = game_over;
	this.c_ones = c_ones;
	this.c_decade = c_decade;
	this.b_ones = b_ones;
	this.b_decade = b_decade;
	this.medal = medal;
	this.started = true;
	this.score_ones = 0;
	this.score_decade = 0;
	this.current_score = 0;

	land.className = 'landanim';
	if(this.getCookie('best_score') == '') {
		alert('no cookie');
		this.setCookie('best_score',0,365);
	}

	EventUtil.addHandler(document,'click',function(e){
		var e = e || window.event;
		var target = e.target || e.srcElement;
		switch(target.id){
			case 'start':
				start_logo.style.display = 'none';
				clearInterval(self.bounce_logo.timer);
				btn.style.display = 'none';
				get_ready_view.style.display = 'block';
				bird.style.display = 'block';
				score_num.style.display = 'block';
				bird_flying_timer = setInterval(function(){
					self.bird_flying(bird);
				},80);
				EventUtil.addHandler(wrap,'click',function updown(){
					get_ready_view.style.display = 'none';
					clearInterval(bird_flying_timer);
					clearInterval(bird.timer);
					bird.className = 'bird_up';
					effect.animate(bird,{'top':bird.offsetTop - 40},{'tween_type':'Quad','ease_type':'easeOut','duration':10},function(){
						bird.className = 'bird_down';
						effect.animate(bird,{'top':495},{'tween_type':'Quad','ease_type':'easeIn','duration':80},function(){
							bird.className = '';
						});
					});
					if(self.started) {
						self.changeHeight();
						self.changeLeft.timer = setInterval(function(){
							self.changeLeft(updown);
						},10);
						self.started = false;
					}
				});
				break;
			case 'restart':
				game_over.style.display = 'none';
				self.started = true;
				bird.style.top = 267 + 'px';
				bird.style.left = 108 + 'px';
				self.changeHeight();
				score_num1.style.background = 'url(../img/0.png) no-repeat';
				score_num2.style.background = '';
				self.current_score = 0;
				self.score_ones = 0;
				self.score_decade = 0;
				start.click();
				break;
		}
	});

	logo_bird.timer = setInterval(function(){
		self.bird_flying(logo_bird);
	},80)
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
			left +=170;
		}
	},
	changeLeft:function(handler){
		var pipe_down = this.pipe_down;
		var pipe_up = this.pipe_up;
		var pipe_up_body = this.pipe_up_body;
		var pipe_down_body = this.pipe_down_body;
		var bird = this.bird;
		var land = this.land;
		var self = this;
		for(var i=0; i<pipe_down.length; i++) {
			var left = pipe_down[i].offsetLeft - 1;
			if(pipe_down[i].offsetLeft <= -60) {
				var pipe_up_height = this.randomHeight(50,150);
				var pipe_down_height = 300 - pipe_up_height;
				pipe_up_body[i].style.height = pipe_up_height + 'px';
				pipe_down_body[i].style.height = pipe_down_height + 'px';
				left = 550;
			}
			pipe_down[i].style.left = left + 'px';
			pipe_up[i].style.left = left + 'px';
			if(this.interact(bird,pipe_up[i]) || this.interact(bird,pipe_down[i]) || this.interact(bird,land)){
				clearTimeout(this.bird_flying.timer);
				clearInterval(this.changeLeft.timer);
				land.className = '';
				EventUtil.removeHandler(wrap,'click',handler);
				this.score_num.style.display = 'none';
				this.game_over.style.display = 'block';
				this.c_ones.src = 'img/'+this.score_ones+'.png';
				this.c_decade.src = 'img/'+this.score_decade+'.png';
				var best_score = parseInt(this.getCookie('best_score'));
				if(best_score < this.current_score) {
					this.setCookie('best_score',this.current_score,356);
					this.b_ones.src = 'img/'+this.score_ones+'.png';
					this.b_decade.src = 'img/'+this.score_decade+'.png';
				} else {
					var score = this.getCookie('best_score');
					var ones = score.substring(0,1);
					if(score.length > 1) {
						var decade = score.substring(1,2);
						this.b_ones.src = 'img/'+ones+'.png';
						this.b_decade.src = 'img/'+decade+'.png';
					} else {
						this.b_ones.src = 'img/'+ones+'.png';
						this.b_decade.src = 'img/'+this.score_decade+'.png';
					}
				}

				if(this.current_score > 2) {
					this.medal.src = 'img/medals_0.png';
				} else if (this.current_score > 5) {
					this.medal.src = 'img/medals_3.png';
				} else if (this.current_score > 8) {
					this.medal.src = 'img/medals_2.png';
				} else if (this.current_score > 11) {
					this.medal.src = 'img/medals_1.png';
				}
				break;
			}
			if(bird,pipe_up[i].offsetLeft == 108){
				this.current_score += 1;
				if(this.score_ones < 9) {
					this.score_num1.style.background = 'url(../img/'+(this.score_ones+1)+'.png) no-repeat';
					this.score_ones += 1;
				} else {
					if(this.score_ones % 9 == 0) {
						this.score_ones = 0;
						this.score_decade += 1;
						alert('eq 9');
					}
					this.score_num1.style.background = 'url(../img/'+this.score_decade+'.png) no-repeat';
					this.score_num2.style.background = 'url(../img/'+this.score_ones+'.png) no-repeat';
					this.score_ones += 1;
				}
			}
		}
	},
	randomHeight:function(m,n){
		return Math.ceil(Math.random()*(n-m)+m);
		// [0,1) * (n-m) + m
		// [0,n-m) + m
		// [m,n)
	},
	setCookie:function(c_name,value,expiredays){
		var exdate=new Date()
		exdate.setDate(exdate.getDate()+expiredays)
		document.cookie=c_name+ "=" +escape(value)+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
	},
	getCookie:function(c_name){
		if (document.cookie.length>0)
		  {
		  c_start=document.cookie.indexOf(c_name + "=")
		  if (c_start!=-1)
		    { 
		    c_start=c_start + c_name.length+1 
		    c_end=document.cookie.indexOf(";",c_start)
		    if (c_end==-1) c_end=document.cookie.length
		    return unescape(document.cookie.substring(c_start,c_end))
		    } 
		  }
		return ""
	}
}

