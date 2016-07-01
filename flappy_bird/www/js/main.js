function FlappyBird(){
	var logo_bird = document.getElementById('logo_bird');
	var start_logo = document.getElementById('start_logo');
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
	var score_num2 = document.getElementById('score_num2');
	var game_over = document.getElementById('game_over');
	var c_ones = document.getElementById('c_ones');
	var c_decade = document.getElementById('c_decade');
	var b_ones = document.getElementById('b_ones');
	var b_decade = document.getElementById('b_decade');
	var medal = document.getElementById('medal');
	var restart = document.getElementById('restart');

	//media
	var Die = document.getElementById('Die');
	var Hit = document.getElementById('Hit');
	var Point = document.getElementById('Point');
	var Swooshing = document.getElementById('Swooshing');
	var Wing = document.getElementById('Wing');

	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
	                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

	//水管头部固定的高度
	var pipe_head = 60;
	//上下两条柱的间隙高度
	var gap = 100;
	//页面剩余高度
	var leftHeight = wrap.offsetHeight-land.offsetHeight-pipe_head*2-gap;
	//每条水管可生成的最大高度
	var single_pipe_body_height = leftHeight/2;

	var self = this;

	bird.finish = true;
	start_logo.finish = true;

	this.game_over = game_over;
	this.pipe_up = pipe_up;
	this.pipe_down = pipe_down;
	this.pipe_up_body = pipe_up_body;
	this.pipe_down_body = pipe_down_body;
	this.single_pipe_body_height = single_pipe_body_height;
	this.leftHeight = leftHeight;
	this.started = true;
	this.score_ones = 0;
	this.score_decade = 0;
	this.current_score = 0;

	land.className = 'landanim';
	if(this.getCookie('best_score') == '') {
	 	this.setCookie('best_score',0,365);
	 }

	var device = this.browserRedirect();
	var eventType = (device == 'pc') ? 'click' : 'touchstart';  
	this.eventType = eventType;

	EventUtil.addHandler(document,eventType,function(e){
		var e = e || window.event;
		var target = e.target || e.srcElement;
		switch(target.id){
			case 'start':
				self.start();
				break;
			case 'restart':
				game_over.style.display = 'none';
				self.started = true;
				bird.style.top = 267 + 'px';
				bird.style.left = 108 + 'px';
				self.changeHeight();
				score_num1.style.background = 'url(img/0.png) no-repeat';
				score_num2.style.background = '';
				self.current_score = 0;
				self.score_ones = 0;
				self.score_decade = 0;
				bird.finish = true;
				land.className = 'landanim';
				//start.click();
				self.start();
				break;
		}
	});

	this.bird_flying(logo_bird);
	this.bounce_logo(start_logo,70,50);
}

FlappyBird.prototype = {
	bird_flying: function (obj){
		function step(timestamp) {
			if(obj.src == 1){
				obj.style.backgroundImage = 'url(img/bird0.png)';
				obj.src = 2;
			} else {
				obj.style.backgroundImage = 'url(img/bird1.png)';
				obj.src = 1;
			}
			obj.req = requestAnimationFrame(step);
		}
		obj.req = requestAnimationFrame(step);
	},
	bounce_logo: function(obj,top_go,top_back){
		function move(){
			if(obj.finish){
				effect.animate(obj,{'top':top_go},{'tween_type':'Circ','ease_type':'easeIn','duration':20},function(){
					obj.finish = false;
					effect.animate(obj,{'top':top_back},{'tween_type':'Circ','ease_type':'easeIn','duration':20},function(){
						obj.finish = true;
					});
				});
			}
		}
		obj.clock = setInterval(move,300);
	},
	interact:function(obj_1,obj_2){
		var between_width = Math.abs((obj_1.offsetLeft+obj_1.offsetWidth/2) - (obj_2.offsetLeft+obj_2.offsetWidth/2));
	    var both_half_width = Math.abs((obj_1.offsetWidth+obj_2.offsetWidth)/2);
	    var between_height = Math.abs((obj_1.offsetTop+obj_1.offsetHeight/2) - (obj_2.offsetTop+obj_2.offsetHeight/2)); 
	    var both_half_height = Math.abs((obj_1.offsetHeight+obj_2.offsetHeight)/2);
	    if( between_width < both_half_width && between_height < both_half_height ) return true;
	    else return false;
	},
	changeHeight:function(){
		var left = 570;
		var pipe_down = this.pipe_down;
		var pipe_up = this.pipe_up;
		var pipe_up_body = this.pipe_up_body;
		var pipe_down_body = this.pipe_down_body;
		
		for(var i=0,len = pipe_up_body.length; i<len; i++) {
			var pipe_up_body_height = this.randomHeight(0,this.single_pipe_body_height);
			var pipe_down_body_height = this.leftHeight - pipe_up_body_height;
			pipe_up_body[i].style.height = pipe_up_body_height + 'px';
			pipe_down_body[i].style.height = pipe_down_body_height + 'px';
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
		var self = this;
		land.style.left = land.offsetLeft - 1 + 'px';
		if(land.offsetLeft == -(land.offsetWidth/2)){
			land.style.left = 0 + 'px';
		}

		for(var i=0,len=pipe_down.length; i<len; i++) {
			var left = pipe_down[i].offsetLeft - 1;
			if(pipe_down[i].offsetLeft <= -60) {
				var pipe_up_height = this.randomHeight(50,this.single_pipe_body_height);
				var pipe_down_height = this.leftHeight - pipe_up_height;
				pipe_up_body[i].style.height = pipe_up_height + 'px';
				pipe_down_body[i].style.height = pipe_down_height + 'px';
				left = wrap.offsetWidth + pipe_down[i].offsetWidth + 170;
			}
			pipe_down[i].style.left = left + 'px';
			pipe_up[i].style.left = left + 'px';

			if(this.interact(bird,pipe_up[i]) || this.interact(bird,pipe_down[i]) || this.interact(bird,land)){
				Hit.play();
				Die.play();
				//clearTimeout(this.bird_flying.timer);
				cancelAnimationFrame(bird.req);
				clearInterval(this.changeLeft.timer);
				land.className = '';
				EventUtil.removeHandler(wrap,this.eventType,handler);
				score_num.style.display = 'none';
				setTimeout(function(){
					self.game_over.style.display = 'block';
				},1000)
				c_ones.src = 'img/'+this.score_ones+'.png';
				c_decade.src = 'img/'+this.score_decade+'.png';
				score_num1.style.background = 'url(img/'+this.score_decade+'.png) no-repeat';
				score_num2.style.background = 'url(img/'+this.score_ones+'.png) no-repeat';
				var best_score = parseInt(this.getCookie('best_score'));
				if(best_score <= this.current_score) {
					if(this.current_score == 0) {
						b_ones.src = 'img/0.png';
						b_decade.src = 'img/0.png';
					} else {
						this.setCookie('best_score',this.current_score,356);
						b_ones.src = 'img/'+this.score_ones+'.png';
						b_decade.src = 'img/'+this.score_decade+'.png';
					}
				} else {
					var score = this.getCookie('best_score');
					if(score.length > 1) {
						var decade = score.substring(0,1);
						var ones = score.substring(1,2);
						b_ones.src = 'img/'+ones+'.png';
						b_decade.src = 'img/'+decade+'.png';
					} else {
						var ones = score.substring(0,1);
						b_ones.src = 'img/'+ones+'.png';
						b_decade.src = 'img/'+this.score_decade+'.png';
					}
				}

				if(this.current_score > 2 && this.current_score <= 5) {
					medal.src = 'img/medals_0.png';
				} else if (this.current_score > 5 && this.current_score <= 8) {
					medal.src = 'img/medals_3.png';
				} else if (this.current_score > 8  && this.current_score <= 11) {
					medal.src = 'img/medals_2.png';
				} else if (this.current_score > 11) {
					medal.src = 'img/medals_1.png';
				} else {
					medal.src = '';
				}
				break;
			}
			//得分
			if(bird,pipe_up[i].offsetLeft == 108){
				Point.play();
				this.current_score += 1;
				this.score_ones += 1;
				if(this.current_score < 10) {
					score_num1.style.background = 'url(img/'+(this.score_ones)+'.png) no-repeat';
				} else {
					if(this.current_score % 10 == 0) {
						this.score_ones = 0;
						this.score_decade += 1;
					}
					score_num1.style.background = 'url(img/'+(this.score_decade)+'.png) no-repeat';
					score_num2.style.background = 'url(img/'+(this.score_ones)+'.png) no-repeat';
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
	},
	browserRedirect: function(){
		var sUserAgent = navigator.userAgent.toLowerCase();
		var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
		var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
		var bIsMidp = sUserAgent.match(/midp/i) == "midp";
		var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
		var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
		var bIsAndroid = sUserAgent.match(/android/i) == "android";
		var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
		var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
		if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		    return 'phone';
		} else {
		    return 'pc';
		}
	},
	start:function(){
		var self = this;
		Swooshing.play();
		start_logo.style.display = 'none';
		clearInterval(start_logo.clock);
		cancelAnimationFrame(logo_bird.req);
		start.style.display = 'none';
		get_ready_view.style.display = 'block';
		bird.style.display = 'block';

		score_num.style.display = 'block';
		self.bounce_logo(bird,287,267);
		this.bird_flying(bird);
		EventUtil.addHandler(wrap,self.eventType,function updown(){
			Wing.play();
			get_ready_view.style.display = 'none';
			clearInterval(bird.timer);
			clearInterval(bird.clock);
			bird.className = 'bird_up';
			effect.animate(bird,{'top':bird.offsetTop - 40},{'tween_type':'Quad','ease_type':'easeOut','duration':10},function(){
				bird.className = 'bird_down';
				effect.animate(bird,{'top':land.offsetTop-bird.offsetHeight+5},{'tween_type':'Quad','ease_type':'easeIn','duration':110},function(){
					bird.className = '';
				});
			});
			if(self.started) {
				land.className = '';
				self.changeHeight();
				self.changeLeft.timer = setInterval(function(){
					self.changeLeft(updown);
				},10);
				self.started = false;
			}
		});
	}
}

