define([
	/**
	 * 引用：
	 * 返回：window.document
	 */
	"../var/document"
], function (document) {
	"use strict";
	/**
	 * 创建一个script标签并且写上脚本然后 append到DOM中(append之后会执行)然后在移除
	 *
	 * @param {any} code 脚本字符串
	 * @param {any} doc DOM对象
	 */
	function DOMEval(code, doc) {
		doc = doc || document;

		var script = doc.createElement("script");

		script.text = code;
		doc.head.appendChild(script).parentNode.removeChild(script);
	}
	//返回一个函数
	return DOMEval;
});
