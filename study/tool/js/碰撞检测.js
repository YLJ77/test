function interact(obj_1,obj_2){
	var between_width = Math.abs((obj_1.offsetLeft+obj_1.offsetWidth/2) - (obj_2.offsetLeft+obj_2.offsetWidth/2));
    var both_half_width = Math.abs((obj_1.offsetWidth+obj_2.offsetWidth)/2);
    var between_height = Math.abs((obj_1.offsetTop+obj_1.offsetHeight/2) - (obj_2.offsetTop+obj_2.offsetHeight/2)); 
    var both_half_height = Math.abs((obj_1.offsetHeight+obj_2.offsetHeight)/2);
    if( between_width < both_half_width && between_height < both_half_height ) return true;
    else return false;
}