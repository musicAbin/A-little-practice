function $(v)
{
	if(typeof v == "function")
	{
		window.onload = v;
	}
	else if(typeof v == "string")
	{
		return document.getElementById(v);
	}
	else if(typeof v == "object")
	{
		return v;
	}
	
}

function getStyle(obj,attr)
{
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}

function doMove(obj,attr,step,target,frequency,endFn)
{
	step = parseInt(getStyle(obj,attr))<target?step:-step;
	
	clearInterval(obj.moveTimer);
	
	obj.moveTimer = setInterval(function()
	{
		speed = parseInt(getStyle(obj,attr))+step;
		if(speed <= target && step<0 || speed >= target && step>0)
		{
			speed = target;
		}
		obj.style[attr] = speed+"px";	
		if(speed == target)
		{
			clearInterval(obj.moveTimer);
			endFn&&endFn();
		}
		
	},frequency);
}


function shake(obj,attr,endFn)
{
	var arr = [];
	var num = 0;
	var pos = parseInt(getStyle(obj,attr));
	
	if(obj.onOff)
	{
		return;
	}
	obj.onOff = true;
	for(var i=30;i>0;i--)
	{
		arr.push(i,-i);
	}
	arr.push(0);
	clearInterval(obj.shakeTimer);
	obj.shakeTimer = setInterval(function()
	{
		obj.style[attr] = pos+arr[num]+"px";
		num++;
		if(num === arr.length)
		{
			clearInterval(obj.shakeTimer);
			endFn&&endFn();
			obj.onOff = false;
		}
	},50);
}
	
function toTwo(n)
{
	return n<10?"0"+n:""+n;
}


function opacity(obj,step,target,frequency,endFn)
{
	var currentOpacity = getStyle(obj,"opacity")*100;
	step = currentOpacity<target?step:-step;
	
	clearInterval(obj.alpha);
	
	obj.alpha = setInterval(function()
	{
		currentOpacity = getStyle(obj,"opacity")*100;
		var nextOpacity = currentOpacity+step;
		if(nextOpacity > target && step>0 || nextOpacity <target && step<0)
		{
			nextOpacity = target;
		}
		
		obj.style.opacity = nextOpacity/100;
		obj.style.filter = "alpha(opacity:"+nextOpacity+")";
		
		if(nextOpacity == target)
		{
			clearInterval(obj.alpha);
			endFn&&endFn();
		}
	},frequency);
	
}