/**
 * 复习一下事件委托
 * @param {Object} e 事件对象，根据要根据事件对象来判断是哪个元素触发的
 * @param {String} element 触发元素标签，如<button>
 * @param {Function} handler 需要触发的回调函数名称
 */
function EventDelegate(e, element, handler) {
	var evt = e || window.event,
		target = e.target || e.srcElement;

	if (target.tagName.toLowerCase() == element) {
		handler(target);
	}
}
/**
 * 检验input框是否为空，不为空时返回输入框的值
 */
function ipIsNull() {
	var queueIp = document.getElementById("queueIp");
	var reg = queueIp.value.match(/^\d$/g);
	if (reg == null) {

		showError("请输入合法的数字");

		return false;
	} else {
		return queueIp.value;
	}
}

function showError(content) {
	//检测是否有错误信息，没有则提示
	if (document.getElementsByClassName('error-msg').length == 0) {
		var p = document.createElement('p');
		p.innerHTML = content;
		p.setAttribute("class", 'error-msg');
		p.setAttribute("style", "font-size:15px;color:#BD2C00");
		var content = document.getElementById("queue-content");
		document.body.insertBefore(p, content.nextSibling);
	}
	return false;
}
/**
 * 动态创建元素
 * @param {Number} 需要创建的数字
 */
function createEle(num) {
	var sp = document.createElement('span');
	sp.setAttribute("class", 'num');
	sp.innerHTML = num;
	return sp;
}


function leftInHandler(obj) {

	var ipv = ipIsNull();
	var msg = document.getElementsByClassName('error-msg');
	if (ipv != false) {
		//可以侧入时，清除错误信息
		msg.length != 0 && msg[0].remove();
		var sp = createEle(ipv); //创建了一个sp
		if (obj.innerHTML == "") { //当里面没有元素时，直接appendchild，不分左右
			obj.appendChild(sp);
		} else {
			var fChild = obj.firstChild; //第一个孩子
			obj.insertBefore(sp, fChild);
		}
	}
}

function rightInHandler(obj) {
	var ipv = ipIsNull();
	var msg = document.getElementsByClassName('error-msg');
	if (ipv != false) {
		//可以侧入时，清除错误信息
		msg.length != 0 && msg[0].remove();
		var sp = createEle(ipv);
		if (obj.innerHTML == "") { //当里面没有元素时，直接appendchild，不分左右
			obj.appendChild(sp);
		} else {
			var lChild = obj.lastChild;
			obj.insertBefore(sp, lChild.nextSibling);
		}
	}
}

function leftOutHandler(obj) {
	var tag = obj.getElementsByTagName('span');
	if (tag.length != 0) {
		var fc = tag[0];
		alert("即将删除的数字是" + fc.innerHTML);
		obj.removeChild(fc);
	} else {
		showError("已经没有元素了，请加入后侧出")
	}

}

function rightOutHandler(obj) {
	var tag = obj.getElementsByTagName('span');
	if (tag.length != 0) {
		var lc = tag[tag.length - 1];

		alert("即将删除的数字是" + lc.innerHTML);
		obj.removeChild(lc);
	}else{
		showError("已经没有元素了，请加入后侧出");
	}

}

function init() {
	var BtnLeftIn = document.getElementById("leftIn"),
		BtnRightIn = document.getElementById("rightIn")
	BtnLeftOut = document.getElementById("leftOut"),
		BtnRightOut = document.getElementById("rightOut"),
		queue = document.getElementById("queue-content");
	//左侧进
	BtnLeftIn.onclick = function() {
			leftInHandler(queue);
		}
		//右侧进
	BtnRightIn.onclick = function() {
			rightInHandler(queue);
		}
		//左侧出
	BtnLeftOut.onclick = function() {
			leftOutHandler(queue);
		}
		//右侧出
	BtnRightOut.onclick = function() {
		rightOutHandler(queue);
	}
	
	queue.onclick = function (e) {
		EventDelegate(e,'span',function (target) {
			target.remove();
		})
	}
	
}

init();


/**
 * 
 * 
 */