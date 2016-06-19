/**
 * Created by Kiamkiet on 14/05/2016.
 */
function getStyle(obj,attr){
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}
function move(obj,json,fn){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var speed=0;
        var cur=0;
        var bstop=true;
        for (var key in json){
            if (key==='opacity') {
                cur=Math.round(parseFloat(getStyle(obj,key))*100);
            }else{
                cur=parseInt(getStyle(obj,key));
            }
            speed=(json[key]-cur)/6;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            if (json[key]!==cur) {bstop=false}
            if (key==='opacity') {
                obj.style[key]=(cur+speed)/100;
                obj.style.filter='alpha(opacity'+(cur+speed)+')';
            }else{
                obj.style[key]=cur+speed+'px';
            }
        }
        if (bstop) {
            clearInterval(obj.timer);
            if (fn) {fn();}
        }
    },30);
}