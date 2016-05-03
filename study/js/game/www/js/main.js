

function Beat(){
	var src_bad = ["h0","h1","h2","h3","h4","h5","h6","h7","h8","h9"];
	var src_kind = ["x0","x1","x2","x3","x4","x5","x6","x7","x8","x9"];
	var wolf = document.getElementById("wolf");
	var time = document.getElementById('time');
	var self = this;
	this.index = 0;
	this.src_bad = src_bad;
	this.src_kind = src_kind;
	this.src = src_bad;
	this.wolf = wolf;
	this.score = 0;
	this.time = time;
	this.clicked = true;

	wolf.onclick = function(){
		var score = self.score;
		var src = self.src;
		var src_bad = self.src_bad;
		var src_kind = self.src_kind;
		var box = document.getElementById('score');
		var clicked = self.clicked;
		
		if(clicked) {
			clearTimeout(self.timer);
			clearInterval(self.timer2);
			self.timer2 = setInterval(function(){self.hited()}, 50)
			src == src_bad ? score += 10 : score -= 10;
			box.innerText = score;
			self.score = score;
		}
	}

	this.clock(this);
	this.timer3 = setInterval(function(){self.counter(self);},333);
}
Beat.prototype = {
	clock : function(obj){
		var self = this;
		clearTimeout(self.timer);
		clearInterval(self.timer2);
		setTimeout(function(){			
			obj.timer = setTimeout(arguments.callee,50);
			self.show(self);
		},50);

	},
	show : function(obj){
		var index = this.index;
		var wolf = this.wolf;
		var src_bad = this.src_bad;
		var src_kind = this.src_kind;
		var hole = this.hole;
		var src = this.src;
		if(index == 0 ) {
			var num1 = ~~(Math.random() * 9);
			var hole_sel = hole["hole_"+num1];
			wolf.style.top = hole_sel["top"];
			wolf.style.left = hole_sel["left"];
			var num2 = ~~(Math.random() * 2);
			src = num2 ? src_bad : src_kind;
			this.src = src;
		}
		wolf.src = "img/" + src[index] + ".png";
		if(index > 4) hit = true;
		if(index == 0) {
			hit = false;
			this.clicked = true;
		}
		hit ? index-- : index++;
		this.index = index;
	},
	hited : function(obj){
		var index = this.index;
		var src = this.src;
		var wolf = this.wolf;
		this.clicked = false;
		index++;
		this.clicked = false;
		if(index >= src.length - 1) {
			clearInterval(this.timer2);
			this.clock(this);
		}
		wolf.src = "img/" + src[index] + ".png";
		this.index = index;

	},
	counter : function(obj){
		var time = this.time;
		var wolf = this.wolf;
		width = time.currentStyle ? time.currentStyle['width'] : getComputedStyle(time,false)['width'];
		width = parseInt(width);
		if(width == 0) {
			clearInterval(obj.timer3);
			clearInterval(obj.timer2);
			clearTimeout(obj.timer);
			wolf.style.display = "none";
		} else {
			width--
		}
		time.style['width'] = width + 'px';
	},
	stop : function(obj){
		clearTimeout(obj.timer);
	},
	hole:{
		hole_0:{
			top: "115px",
			left: "95px"
		},
		hole_1:{
			top: "159px",
			left: "17px"
		},
		hole_2:{
			top: "141px",
			left: "187px"
		},
		hole_3:{
			top: "191px",
			left: "102px"
		},
		hole_4:{
			top: "220px",
			left: "15px"
		},
		hole_5:{
			top: "211px",
			left: "199px"
		},
		hole_6:{
			top: "274px",
			left: "119px"
		},
		hole_7:{
			top: "293px",
			left: "28px"
		},
		hole_8:{
			top: "295px",
			left: "205px"
		}
	}
}

new Beat()