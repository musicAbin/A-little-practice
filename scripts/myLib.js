//运动函数
function mTween(obj, attrs, duration, fx, callback) {

    clearInterval(obj.timer);

    var startTime = new Date().getTime();

    //因为要运动多个属性，并且多个属性的起始和结束的值并不一样，所有b的和c的值就不能共用，我们要根据属性的属性的不同，分别去存放b和c的值，同时存的值也要方便下面定时循环不同属性的过程中，很方便的就能找到
    //所以，我们可以定义一个对象，然后根据不同的属性存放不同的b和c
    var j = {};
    //遍历attrs，然后根据里面的值，生成不同的b和c
    for (var attr in attrs) {
        j[attr] = {}
        j[attr].b = parseFloat(getComputedStyle(obj)[attr]);
        j[attr].c = attrs[attr] - j[attr].b;
    }

    var d = duration;

    obj.timer = setInterval(function() {

        var t = new Date().getTime() - startTime;

        if ( t >= d ) {
            t = d;
        }

        //根据传入进来的属性，通过遍历的方式把所有要运动的属性都计算一次
        for (var attr in attrs) {
            var b = j[attr].b;
            var c = j[attr].c;
            var value = Tween[fx](t, b, c, d);

            if ( attr == 'opacity' ) {
                obj.style[attr] = value;
            } else {
                obj.style[attr] = value + 'px';
            }
        }

        if ( t == d ) {
            clearInterval(obj.timer);
            if (typeof callback == 'function') {
                callback();
            }
        }

    }, 30);
}

//添加class
function addClass(obj, classname) {
    //如果元素原来没有class，则直接添加
    if ( obj.className == '' ) {
        obj.className = classname;
    } else {
        //如果元素有class，则把class获取出来，然后通过空格拆分成数组
        var classArr = obj.className.split(' ');
        //判断要添加的class是否在数组存在，如果不存在则添加
        if ( classArr.indexOf(classname) == -1 ) {
            obj.className += ' ' + classname;
        }
    }
}

//删除class
function removeClass(obj, classname) {
    //把原有的class获取出来拆分成数组
    var classArr = obj.className.split(' ');
    //判断要删除的className在classArr中是否存在
    var _index = classArr.indexOf(classname);
    //如果要删除的class存在
    if ( _index != -1 ) {
        classArr.splice(_index, 1);
        obj.className = classArr.join(' ');
    }
}

//替换class
function replaceClass(obj, newClassName, oldClassName) {
    removeClass(obj, oldClassName);
    addClass(obj, newClassName);
}

//切换class
function toggleClass(obj, classname) {
    var classArr = obj.className.split(' ');

    if (classArr.indexOf(classname) != -1) {
        //存在则删除
        removeClass(obj, classname);
    } else {
        //不存在则添加
        addClass(obj, classname);
    }
}

//设置样式
function css(obj,name,value) {
    if (arguments.length == 1) {
        //传进来一个参数，表示获取
        if (obj.currentStyle) {
            return obj.currentStyle;
        } else {
            return getComputedStyle(obj);
        }
    }
    if (arguments.length == 3) {
        obj.style[name] = value;
    }
}

//传入一个数字，如果小于10，前面加0
function  addZero(n){
    return n < 10 ? '0' + n : '' + n;
}

//添加事件处理函数，文档加载后执行
function addLoadEvent(fun){
    var oldonload = window.onload;

    if(typeof window.onload != 'function'){
        window.onload = fun;
    }else{
        window.onload = function () {
            oldonload();
            fun();
        }
    }
}

//新元素插入到目标元素后面
function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;

    if(parent.lastElementChild == targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextElementSibling);
    }
}

//鼠标滚轮
function MouseScroll(obj, callback) {
    obj.onmousewheel = fn;
    obj.addEventListener('DOMMouseScroll', fn);

    function fn(e) {
        var e = e || event;
        var dir = true;

        if (e.wheelDelta) {
            dir = e.wheelDelta > 0 ? true : false;
        } else {
            dir = e.detail < 0 ? true : false;
        }

        e.dir = dir;

        callback(e);

        e.preventDefault();
        return false;
    }
}

//深度克隆
function deepinCopy(obj) {
    //不同的对象使用不同的方式去初始化temp
    var temp = obj.constructor == Array ? [] : {};

    for (var attr in obj) {
        if ( typeof obj[attr] == 'object' && obj[attr] != null ) {
            temp[attr] = deepinCopy(obj[attr]);
        } else {
            temp[attr] = obj[attr];
        }
    }

    return temp;
};
