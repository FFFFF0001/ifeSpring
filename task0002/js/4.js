/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

function trim(str) {
	return str.replace(/\s/g, '');
}
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = trim(document.getElementById("aqi-city-input").value),
		vl = trim(document.getElementById("aqi-value-input").value);
	cityReg = /^[\u4e00-\u9fa5a-zA-Z]*$/,
		valReg = /^[\d]*$/;
	if (city.length == 0 || vl.length == 0) {
		alert("任意一项不能为空");
		return false;
	} else if (!cityReg.test(city)) {
		alert("城市名称输入错误");
		return false;
	} else if (!valReg.test(vl)) {
		alert("空气质量指数输入错误");
		return false;
	} else {
		aqiData[city] = vl;
		return true;
	}
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var tb = document.getElementById("aqi-table");
	var item = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for (var attr in aqiData) {
		item += "<tr><td>" + attr + "</td><td>" + aqiData[attr] + "</td><td><button>删除</button></td></tr>"
	}
	tb.innerHTML = item;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	if (addAqiData())
		renderAqiList();

}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(key) {
	// do sth.
	delete aqiData[key];
	renderAqiList();
}

function init() {
	//	var e = e||window.event,
	//		target = e.target||e.srcElement;
	var add = document.getElementById("add-btn"),
		del = document.getElementById("aqi-table");
	// 在这下面给add-btn绑定一个点击事件，点击时触发点击时触发addBtnHandle函数函数
	add.onclick = addBtnHandle;
	// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	del.onclick = function(e) {
		delegate(e);
	}
}
/**
 * 事件代理
 * @param {Object} e
 */
function delegate(e) {
	var e = e || window.event,
		target = e.target || e.srcElement;
	if (target.tagName.toLowerCase() == "button") {
		delBtnHandle.call(null, target.parentNode.parentNode.firstChild.innerHTML);
	}
}
init();