define([
	/**
	 * 引用：
	 * 返回：{}
	 */
	"./class2type"
], function (class2type) {
	"use strict";
	//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
	//hasOwnProperty() 方法会返回一个布尔值，指示对象是否具有指定的属性作为自身（不继承）属性。
	/**
	 * o = new Object();
	 * o.prop = 'exists';
	 * function changeO() {
	 *   o.newprop = o.prop;
	 *   delete o.prop;
	 * }
	 * o.hasOwnProperty('prop');   // 返回 true
	 * changeO();
	 * o.hasOwnProperty('prop');   // 返回 false
	 */
	return class2type.hasOwnProperty;
});
