define([
	/**
	 * 引用：
	 * 		./class2type
	 * 返回：Object.prototype.hasOwn;//返回的是一个函数
	 */
	"./hasOwn"
], function (hasOwn) {
	"use strict";
	//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString
	//的tostring()方法返回一个字符串，表示函数的源代码。
	/**
	 * var a= function(){return 1;}
	 * console.log(a.toString())//"function (){return 1;}"
	 */
	return hasOwn.toString;
});
