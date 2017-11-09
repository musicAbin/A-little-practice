function mTween(obj, attrs, duration, fx, callback) {
//  clearInterval(obj.timer);
    
//  for(var attr in attrs){
//  	clearInterval(attrs[attr].timer);  
//  }

    var startTime = new Date().getTime();
    var d = duration;
    var attrs = {};
    
    for(var attr in attrs){
    	if(!attrs){
	    	attrs[attr].b = parseFloat(getStyle(obj,attr));
	    	attrs[attr].c = attrs[attr] - b;
	    }
    }
    
    obj.timer = setInterval(function() {
		
		for(var attr in attrs){
	        var t = new Date().getTime() - startTime;
			
	        if ( t >= d ) {
	            t = d;
	        }
			
	        var value = Tween[fx](t,attrs[attr].b,attrs[attr].c, d);
		
			if(attr == 'opacity'){
				obj.style[attr] = value;
			}else{
				obj.style[attr] = value + 'px';
			}
			
			if(t == d){
				clearInterval(obj.timer);
				if(typeof callback == 'function'){
					callback();
				}
			}
		}
    }, 10);
}

function getStyle(obj,attr)
{
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}

function toTwo(n){
	return n<'10'?'0'+n:''+n;
}

