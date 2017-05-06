define([
	/**
	 * 引用：
	 * 返回：[]
	 */
	"./arr"
], function (arr) {
	"use strict";
	//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
	//方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
	/**
	 * let arr1 = ["a", "b", "c"];
	 * let arr2 = ["d", "e", "f"];
	 *
	 * let arr3 = arr1.concat(arr2);
	 *
	 * console.log(arr3);
	 * // results in a new array
	 * // [ "a", "b", "c", "d", "e", "f" ]
	 */
	return arr.concat;
});
