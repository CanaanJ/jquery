define([
	/**
	 * 引用：
	 * 返回：{}
	 */
	"./class2type"
], function (class2type) {
	"use strict";
	//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
	//toString() 返回一个代表这个对象的字符串
	//例子
	/**
	 * var a={};
	 * console.log(a.toString());//"[object Object]"
	 */
	return class2type.toString;
});
