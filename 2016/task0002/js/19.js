var $ = function(obj) {
    if (/^#/.test(obj)) {
        return document.querySelector(obj);
    } else {
        return document.querySelectorAll(obj);
    }
}
var searchStr = function(obj, str) {
    [].map.call(obj,function(ele) {
        var content = ele.innerHTML;
        //先清除
        var afterStr = content.replace(/<.+>/,'');
        ele.innerHTML = afterStr.replace(str, "<span style='color:red'>" + str + "</span>");
    });
}
$('#Linsert').onclick = function() {
    var addData = render();
    for (var i = 0, leng = addData.length; i < leng; i++) {
        var num = $('.num'),
            newElement = document.createElement('span');
        newElement.setAttribute('class', 'num');
        newElement.innerHTML = addData[i];
        if (num.length == 0) {
            $('#result').appendChild(newElement);
        } else {
            $("#result").insertBefore(newElement, num[0]);
        }
    }
};
$('#Rinsert').onclick = function() {
    var addData = render();
    for (var i = 0, len = addData.length; i < len; i++) {
        var newElement = document.createElement('span');
        newElement.setAttribute('class', 'num');
        newElement.innerHTML = addData[i];
        $('#result').appendChild(newElement);
    }
};
$("#LOut").onclick = function () {
    var numFirst = $(".num"),
        leng = numFirst.length;
    if(leng>0){
        numFirst[0].remove();
    }
}
$("#ROut").onclick = function () {
    var numFirst = $(".num"),
        leng = numFirst.length;
    if(leng>0){
        numFirst[leng-1].remove();
    }
}
$("#search").onclick = function() {
    searchStr($(".num"), $("#searchInput").value);
}
$("#result").onclick = function (e) {
    var event = e || window.event;
    var tg = event.target || event.srcElement;
    if(tg.tagName.toLocaleLowerCase()=='span'){
        tg.remove();
    }
}
function render() {
    var val = $(".textInput")[0].value;
    var arrData = val.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(ele) {
        if (ele.length == 0 || ele == null) {
            return false;
        } else {
            return true;
        }
    });
    return arrData;
}