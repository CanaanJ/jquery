define([
	/**
	 * 引用：
	 * 		./class2type
	 * 返回：Function.prototype.toString;//返回的是一个函数
	 */
	"./fnToString"
], function (fnToString) {
	"use strict";
	//不知到去哪里找相关的文章
	//这里Object是一个window下的一个构造函数属性
	/**
	 * console.log(Object.prototype.toString.call(Object));//"[object Function]"
	 */

	return fnToString.call(Object);
});
