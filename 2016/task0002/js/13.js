(function () {
    /*
     在注释下方写下代码
     给按钮button绑定一个点击事件
     在事件处理函数中
     获取aqi-input输入的值，并显示在aqi-display中
     */
    var ip = document.getElementById("aqi-input"),
        btn = document.getElementById("button"),
        ad = document.getElementById("aqi-display");
    btn.onclick = function () {
        ad.innerHTML = ip.value;
    }
})();