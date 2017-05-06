define(function () {
	"use strict";
	//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf
	//Object.getPrototypeOf 是一个函数
	//执行的话会返回对象的原型
	//例子
	/**
	 * 	var proto = {};
		var obj = Object.create(proto);
		Object.getPrototypeOf(obj) === proto; // true
	 */
	return Object.getPrototypeOf;
});
