var attribute={
    get:function(obj,attr){
	    var val;
	    if(obj.currentStyle){
		    val=obj.currentStyle[attr];
		}else{
		    val=getComputedStyle(obj,false)[attr];
		}
		if(attr==="opacity"){
		    val=val*100;
		}
		return val;
	},
	
	set:function(obj,attr,val){
	    if(attr=="opacity"){
		    obj.style.filter='alpha(opacity='+(val)+')';
			obj.style.opacity=(val)/100;
		}else{
		    obj.style[attr]=val+"px";
		}
	}
}



var effect={

    animate:function(obj,json,fn){
	    clearTimeout(obj.timer);
		setTimeout(function(){
		    effect.change(obj,json,fn);
		    obj.timer = setTimeout(arguments.callee,30);
		},30);
	},

    stop:function(obj){
	    clearTimeout(obj.timer);
	},
	
    change:function(obj,json,fn){
	    var complete=false;
		var iCur=0;
		var attr = null;
		var iSpeed = 0;
		for(var attr in json){
		    iCur=parseInt(parseFloat(attribute.get(obj,attr))) || 0;
			if(json[attr]==iCur){
			    complete=true;
			    break;
			}
			iSpeed=(json[attr]-iCur)/8;
			iSpeed=(iSpeed>0)?Math.ceil(iSpeed):Math.floor(iSpeed);
			iCur+=iSpeed;
			attribute.set(obj,attr,iCur);
		}
		if(complete){
		    effect.stop(obj);
			if(fn) fn();
		}
	}
}