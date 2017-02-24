/*
*任务描述
*1. 编写一个判断给定数字是否为手机号码的正则表达式，测试用例参照但不限于：
 18812011232  // 测试结果应该为 true
 18812312     // false
 12345678909  // false

 2. 编写一个判断输入的字符串是否有相邻重复单词，测试用例可以参考但不限于：

 foo foo bar       // true
 foo bar foo       // false  有重复单词但是不相邻
 foo  barbar bar   // false
*
* */

var phoneReg = /^1[3578]\d{9}$/;

document.write('18812011232 is valid? ' + phoneReg.test('18812011232') + '</br>') ;
document.write('18812312 is valid? ' + phoneReg.test('18812312') + '</br>');
document.write('12345678909 is valid? ' + phoneReg.test('12345678909') + '</br>');

var nearRepeatReg = /\b([a-zA-Z]+)\b\s+\1\b/;

document.write('foo foo bar is valid? ' + nearRepeatReg.test('foo foo bar') + '</br>');
document.write('foo bar foo is valid? ' + nearRepeatReg.test('foo bar foo') + '</br>');
document.write('foo  barbar bar is valid? ' + nearRepeatReg.test('foo  barbar bar') + '</br>');