/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
	var y = dat.getFullYear();
	var m = dat.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	var d = dat.getDate();
	d = d < 10 ? '0' + d : d;
	return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
	var returnData = {};
	var dat = new Date("2016-01-01");
	var datStr = ''
	for (var i = 1; i < 92; i++) {
		datStr = getDateStr(dat);
		returnData[datStr] = Math.ceil(Math.random() * seed);
		dat.setDate(dat.getDate() + 1);
	}
	return returnData;
}

var aqiSourceData = {
	"北京": randomBuildData(500),
	"上海": randomBuildData(300),
	"广州": randomBuildData(200),
	"深圳": randomBuildData(100),
	"成都": randomBuildData(300),
	"西安": randomBuildData(500),
	"福州": randomBuildData(100),
	"厦门": randomBuildData(100),
	"沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
	nowSelectCity: '北京',
	nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
	var nowCity = pageState.nowSelectCity,
		objLeng = 0,
		cDataLength=0,
		color = ['#ccffff', '#ffffcc', '#0066cc', '#99cc66', '#ffcccc', '#99cc66', '#cc3333', '#ffff66', '#666666', '#996699'];
	for (var attr in aqiSourceData) {
		if (attr == nowCity) {
			chartData = aqiSourceData[attr];
		}
	}
	/*算chartData的length*/
for (var attr in chartData) {
		cDataLength++;
	}
	var chart = document.getElementById("aqi-chart-wrap"),
		addEle = "",radioVal=0;
		var ip = document.getElementsByName("gra-time");
	for (var i = 0, len = ip.length; i < len; i++) {
		if (ip[i].checked == true) {
			// 设置对应数据
			radioVal = ip[i].value;
		}
	}
	switch (radioVal) {
		case "day":
			for (var attr in chartData) {
				var rand = Math.floor(color.length * Math.random());
				addEle += '<div title="'
							+attr+
							'Aqi:'
							+chartData[attr]+ 
							'" class="eachData" style="width:1%;height:'
							+ chartData[attr] 
							+ 'px;"><div class="inside" style="width:100%;height:100%;background:'+color[rand]+'"></div></div>';
			}
			chart.innerHTML = addEle;
			break;
		case "week":
			var numArr = [],
				add = 0;
			for (var attr in chartData) {
				objLeng++;

				if (objLeng % 7 == 0) {
					numArr.push(add/7);
					add = 0;
				} else {
					add += chartData[attr];
				}
			}
			for (var i = 0, len = numArr.length; i < len; i++) {
				var rand = Math.floor(color.length * Math.random());
				addEle += '<div title="第'
							+(i+1)+
							'周  Aqi'
							+ numArr[i]+'" class="eachData" style="width:'
							+ 100 / (objLeng / 7) 
							+ '%;height:' + numArr[i] 
							+ 'px;"><div class="inside" style="width:100%;height:100%;background:'
							+color[rand]
							+'"></div></div>';
			}
			chart.innerHTML = addEle;
			break;
		case "month":
		console.log(cDataLength);
			var current = "01",
				numArr = [],
				add = 0,
				counter = 0;
			for (var attr in chartData) {
				counter++;
				var month = attr.split("-")[1];
				if (month == current) {
					add += chartData[attr];
					if(counter==cDataLength){
						numArr.push(add/31);
					}
				} else if(month!=current ){
					current = month;
					numArr.push(add/31);
					add = 0;
				}
				
			}
			
			for (var i = 0, len = numArr.length; i < len; i++) {
				var rand = Math.floor(color.length * Math.random());
				addEle += '<div title="第'
							+(i+1)+
							'月  Aqi：'+numArr[i]
							+ '" class="eachData" style="width:'
							+ 100 / (counter / 31)
							+ '%;height:'
							+ numArr[i]
							+ 'px;"><div class="inside" style="width:100%;height:100%;background:'
							+color[rand]
							+'"></div></div>'
			}
			chart.innerHTML = addEle;
			break;
	}
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
	// 确定是否选项发生了变化 
	var ip = document.getElementsByName("gra-time");
	for (var i = 0, len = ip.length; i < len; i++) {
		if (ip[i].checked == true) {
			// 设置对应数据
			pageState.nowGraTime = ip[i].value;
		}
	}
	// 调用图表渲染函数
	renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
	// 确定是否选项发生了变化 
	var citySele = document.getElementById("city-select");
	// 设置对应数据
	pageState.nowSelectCity = citySele.value;
	// 调用图表渲染函数
	renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	var ip = document.getElementById("form-gra-time");
	ip.onchange = function(e) {
		delegrate(e, 'input', graTimeChange());
	}

}
/**
 * 事件代理
 * @param {Object} e
 * @param {String} tag
 * @param {Function} handler
 */
function delegrate(e, tag, handler) {
	var evt = e || window.event;
	var tg = evt.target || evt.srcElement;
	if (tg.nodeName == tag) {
		handler;
	}
}
/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
	var seleCity = document.getElementById("city-select");
	// 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	seleCity.innerHTML = "";
	for (var attr in aqiSourceData) {
		var op = document.createElement('option');
		op.value = attr;
		op.innerHTML = attr;
		seleCity.appendChild(op);
	}
	// 给select设置事件，当选项发生变化时调用函数citySelectChange
	seleCity.onchange = citySelectChange;
}
/**
 * 获取class
 */
function getClassName(str) {
	if (document.getClassName)
		return document.getElementsByClassName(str);
	else {
		var all = document.getElementsByTagName('*'),
			rst = [],
			reg = new RegExp('\\b' + str + '\\b');
		for (var i = 0, len = all.length; i < len; i++) {
			if (all[i].className.match(reg)) {
				rst.push(all[i]);
			}
		}
		return rst;
	}

}
/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
	// 将原始的源数据处理成图表需要的数据格式
	// 处理好的数据存到 chartData 中

}

/**
 * 初始化函数
 */
function init() {
	renderChart();
	initGraTimeForm()
	initCitySelector();
	initAqiChartData();
}

init();