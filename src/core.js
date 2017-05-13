/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module

define([
	/**
	 * 引用：
	 * 返回：[]
	 */
	"./var/arr",
	/**
	 * 引用：
	 * 返回：window.document
	 */
	"./var/document",
	/**
	 * 引用：
	 * 返回：Object.getPrototypeOf;//返回的是一个函数
	 */
	"./var/getProto",
	/**
	 * 引用：
	 * 		./var/arr
	 * 返回：Array.prototype.slice;//返回的是一个函数
	 */
	"./var/slice",
	/**
	 * 引用：
	 * 		./var/arr
	 * 返回：Array.prototype.concat;//返回的是一个函数
	 */
	"./var/concat",
	/**
	 * 引用：
	 * 		./var/arr
	 * 返回：Array.prototype.push;//返回的是一个函数
	 */
	"./var/push",
	/**
	 * 引用：
	 * 		./var/arr
	 * 返回：Array.prototype.indexOf;//返回的是一个函数
	 */
	"./var/indexOf",
	/**
	 * 引用：
	 * 返回：{}
	 */
	"./var/class2type",
	/**
	 * 引用：
	 * 		./var/class2type
	 * 返回：Object.prototype.toString;//返回的是一个函数
	 */
	"./var/toString",
	/**
	 * 引用：
	 * 		./var/class2type
	 * 返回：Object.prototype.hasOwn;//返回的是一个函数
	 */
	"./var/hasOwn",
	/**
	 * 引用：
	 * 		./var/class2type
	 * 返回：Function.prototype.toString;//返回的是一个函数
	 */
	"./var/fnToString",
	/**
	 * 引用：
	 * 		./var/fnToString
	 * 返回：Object.prototype.toString.call(Object);//返回的字符串"[object Function]"
	 */
	"./var/ObjectFunctionString",
	/**
	 * 引用：
	 * 返回：{}
	 */
	"./var/support",
	/**
	 * 引用：
	 * 		./var/document
	 * 返回：DOMEval//返回的是一个方法 方法是执行一段脚本(append到DOM中执行完毕之后再删除)
	 */
	"./core/DOMEval"
], function (arr, document, getProto, slice, concat, push, indexOf,
	class2type, toString, hasOwn, fnToString, ObjectFunctionString,
	support, DOMEval) {

	"use strict";
	//声明一些变量

	//版本 这里使用@VERSION 在编译的时候会替换成真正的版本
	var version = "@VERSION";
	// Define a local copy of jQuery
	/**
	 * 创建一个本地jQuery的副本
	 *
	 * @param {any} selector
	 * @param {any} context
	 * @returns
	 */
	var jQuery = function (selector, context) {

		// The jQuery object is actually just the init constructor 'enhanced'
		//jQuery是jQuer.fn.init的增强
		// Need init if jQuery is called (just allow error to be thrown if not included)
		//jQuer被调用的话需要初始化
		return new jQuery.fn.init(selector, context);
	};
	// Support: Android <=4.0 only
	//支持 小于大鱼4.0 版本的安卓
	// Make sure we trim BOM and NBSP
	//这里是用于："".trim();的时候用的正则表达式
	var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

	// Matches dashed string for camelizing
	//这里用于："".camelCase() 的时候用的正则表达式
	//参考：http://www.cnblogs.com/1000/archive/2011/09/04/2166618.html
	//将形如background-color转化为驼峰表示法：backgroundColor。
	var rmsPrefix = /^-ms-/;
	//同上的工能
	var rdashAlpha = /-([a-z])/g;

	// Used by jQuery.camelCase as callback to replace()
	/**
	 * "".camelCase 用的回调
	 *
	 * @param {any} all
	 * @param {any} letter
	 * @returns
	 */
	var fcamelCase = function (all, letter) {
		return letter.toUpperCase();
	};
	//注册 jQuery的原始方法
	//jQuery.fn和jQuery.prototype内容相等
	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		//jQuery的值是方法
		jquery: version,
		//构造函数
		constructor: jQuery,

		// The default length of a jQuery object is 0
		length: 0,
		/**
		 * $(selector).toArray();
		 * 根据选择器选择出来的元素转换成数组
		 *
		 * @returns
		 */
		toArray: function () {
			//执行Array.prototype.slice
			return slice.call(this);
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		/**
		 * $(selector).get();
		 * $(selector).get(0);
		 *
		 * @param {any} num 如果没有这个参数则获取数组 如果有则获取相对应的下标的内容
		 * @returns
		 */
		get: function (num) {

			// Return all the elements in a clean array
			//如果参数是null 就返回一个新的数组
			if (num == null) {
				return slice.call(this);
			}

			// Return just the one element from the set
			//这里如果是负数的话 表示 从后向前数
			//如果不是的话则正常取
			return num < 0 ? this[num + this.length] : this[num];
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		/**
		 * 用于将一个DOM元素集合加入到jQuery栈。
		 * 参考：http://www.jb51.net/article/29648.htm
		 * 		http://blog.csdn.net/qiqingjin/article/details/50756763
		 * 		http://www.jb51.net/article/60686.htm
		 * 通过改变一个jQuery对象的prevObject属性来"跟踪"链式调用中前一个方法返回的DOM结果集
		 * 其实就是做链式排序的
		 *
		 * @param {any} elems
		 * @returns 返回的是一个数组
		 */
		pushStack: function (elems) {

			// Build a new jQuery matched element set
			//this.constructor 就是jQuery的构造函数init，所以this.constructor()返回一个jQuery对象.
			var ret = jQuery.merge(this.constructor(), elems);

			// Add the old object onto the stack (as a reference)
			//设置preObject是当前对象
			ret.prevObject = this;

			// Return the newly-formed element set
			//返回当前的子对象
			return ret;
		},

		// Execute a callback for every element in the matched set.
		/**
		 * jQuery对象的each
		 *
		 * @param {any} callback 回调$().eact(callback)
		 * @returns
		 */
		each: function (callback) {
			//调用jQuery的each方法
			return jQuery.each(this, callback);
		},

		/**
		 * map一个数组
		 *
		 * @param {any} callback
		 * @returns
		 */
		map: function (callback) {
			//将map返回的新数组添加到jQuery栈中
			return this.pushStack(jQuery.map(this, function (elem, i) {
				return callback.call(elem, i, elem);
			}));
		},

		/**
		 * 把匹配元素集合缩减为指定的指数范围的子集。
		 * http://www.w3school.com.cn/jquery/traversing_slice.asp
		 *
		 * @returns
		 */
		slice: function () {
			//arguments
			//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments
			//arguments 是一个类似数组的对象, 对应于传递给函数的参数。
			//arguments 是当前方法获取的参数的集合
			//调用 Array.prototype.slice
			/**
			 * function aaa(){
			 * 	console.log(arguments);
			 * }
			 * aaa(1,2,3);//查看log
			 */
			return this.pushStack(slice.apply(this, arguments));
		},

		/**
		 * 获取匹配元素集合的第一个
		 *
		 * @returns
		 */
		first: function () {
			//调用eq方法
			return this.eq(0);
		},

		/**
		 * 获取匹配元素集合的最后一个
		 *
		 * @returns
		 */
		last: function () {
			//调用eq方法  负数就是从后往前数
			return this.eq(-1);
		},

		/**
		 * 选择数组的第i个元素
		 *
		 * @param {any} i
		 * @returns
		 */
		eq: function (i) {
			//数组总长度
			var len = this.length,
				//通过计算 获取对应的索引
				//+i 强制转换i为数字
				j = +i + (i < 0 ? len : 0);
			//
			//根据一些判断 选择传入的参数 如果j超出数组范围则返回空
			//返回的数组的prevObject 等于当前的对象：this
			return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
		},

		/**
		 * 获取原型链上最后一个prevObject
		 * 也就是当前对象的prevObject但是如果不存在的话则放回当前
		 *
		 * @returns
		 */
		end: function () {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		//绑定方法是Array.prototype.push
		push: push,
		//绑定方法是Array.prototype.sort
		sort: arr.sort,
		//绑定的方法是Array.prototype.splice
		splice: arr.splice
	};

	/**
	 * jQuery 的延伸(扩展) 方法
	 * 处理延伸的对象
	 *
	 * @returns
	 */
	jQuery.extend = jQuery.fn.extend = function () {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;

			// Skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if (typeof target !== "object" && !jQuery.isFunction(target)) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {

			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {

				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (jQuery.isPlainObject(copy) ||
							(copyIsArray = Array.isArray(copy)))) {

						if (copyIsArray) {
							copyIsArray = false;
							clone = src && Array.isArray(src) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = jQuery.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	//条用延伸方法 添加延伸(扩展)
	jQuery.extend({

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function (msg) {
			throw new Error(msg);
		},

		noop: function () {},

		/**
		 * 判断对象是否是一个方法
		 *
		 * @param {any} obj
		 * @returns
		 */
		isFunction: function (obj) {

			// Support: Chrome <=57, Firefox <=52
			// In some browsers, typeof returns "function" for HTML <object> elements
			// (i.e., `typeof document.createElement( "object" ) === "function"`).
			// We don't want to classify *any* DOM node as a function.
			return typeof obj === "function" && typeof obj.nodeType !== "number";
		},

		/**
		 * 判断对象是不是window对象
		 *
		 * @param {any} obj
		 * @returns
		 */
		isWindow: function (obj) {
			//这里obj===obj.window
			//window对象是有window的对象的 并且相等
			return obj != null && obj === obj.window;
		},

		isNumeric: function (obj) {

			// As of jQuery 3.0, isNumeric is limited to
			// strings and numbers (primitives or objects)
			// that can be coerced to finite numbers (gh-2662)
			var type = jQuery.type(obj);
			return (type === "number" || type === "string") &&

				// parseFloat NaNs numeric-cast false positives ("")
				// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
				// subtraction forces infinities to NaN
				!isNaN(obj - parseFloat(obj));
		},

		isPlainObject: function (obj) {
			var proto, Ctor;

			// Detect obvious negatives
			// Use toString instead of jQuery.type to catch host objects
			if (!obj || toString.call(obj) !== "[object Object]") {
				return false;
			}

			proto = getProto(obj);

			// Objects with no prototype (e.g., `Object.create( null )`) are plain
			if (!proto) {
				return true;
			}

			// Objects with prototype are plain iff they were constructed by a global Object function
			Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
			return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
		},

		isEmptyObject: function (obj) {

			/* eslint-disable no-unused-vars */
			// See https://github.com/eslint/eslint/issues/6125
			var name;

			for (name in obj) {
				return false;
			}
			return true;
		},

		/**
		 * 获取一个对象的类型
		 *
		 * @param {any} obj
		 * @returns
		 */
		type: function (obj) {
			//如果obj等于null的话返回:"null";
			if (obj == null) {
				return obj + "";
			}

			// Support: Android <=2.3 only (functionish RegExp)
			//通过计算返回对象类型
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[toString.call(obj)] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function (code) {
			DOMEval(code);
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE <=9 - 11, Edge 12 - 13
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function (string) {
			return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
		},

		/**
		 * each方法
		 *
		 * @param {any} obj 集合
		 * @param {any} callback 回调
		 * @returns
		 */
		each: function (obj, callback) {
			//初始化变量
			var length, i = 0;
			//判断对象是不是一个数组
			if (isArrayLike(obj)) {
				length = obj.length;
				//如果是数组的话就用forr循环的方式来做
				for (; i < length; i++) {
					//调用回调并且传参如果回调函数返回false的话则跳出for循环
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			} else {
				//如果这里不是一个数组的话则用forin来对对象做循环
				for (i in obj) {
					//调用回调并且传参如果回调函数返回false的话则跳出for循环
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android <=4.0 only
		trim: function (text) {
			return text == null ?
				"" :
				(text + "").replace(rtrim, "");
		},

		// results is for internal usage only
		makeArray: function (arr, results) {
			var ret = results || [];

			if (arr != null) {
				if (isArrayLike(Object(arr))) {
					jQuery.merge(ret,
						typeof arr === "string" ? [arr] : arr
					);
				} else {
					push.call(ret, arr);
				}
			}

			return ret;
		},

		inArray: function (elem, arr, i) {
			return arr == null ? -1 : indexOf.call(arr, elem, i);
		},

		// Support: Android <=4.0 only, PhantomJS 1 only
		// push.apply(_, arraylike) throws on ancient WebKit
		/**
		 *用来合并对象, 设计思路是在第一个对象的基础上，把第二个对象的属性(0至n)附加上去,
		 *
		 * @param {any} first
		 * @param {any} second
		 * @returns
		 */
		merge: function (first, second) {
			//这里的 + 是对secound.length做一个强制转换
			var len = +second.length,
				j = 0,
				i = first.length;

			for (; j < len; j++) {
				first[i++] = second[j];
			}

			first.length = i;

			return first;
		},

		grep: function (elems, callback, invert) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for (; i < length; i++) {
				callbackInverse = !callback(elems[i], i);
				if (callbackInverse !== callbackExpect) {
					matches.push(elems[i]);
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function (elems, callback, arg) {
			var length, value,
				i = 0,
				ret = [];

			// Go through the array, translating each of the items to their new values
			//判断是不是数组
			if (isArrayLike(elems)) {
				//是数组就用forr来做循环
				length = elems.length;
				for (; i < length; i++) {
					value = callback(elems[i], i, arg);
					//判断回调返回的参数不等于null的话则将这一项push到新数组中
					if (value != null) {
						ret.push(value);
					}
				}

				// Go through every key on the object,
			} else {
				//不是数组就是对象 用forin来做循环
				for (i in elems) {
					value = callback(elems[i], i, arg);
					//判断回调返回的参数不等于null的话则将这一项push到新数组中
					if (value != null) {
						ret.push(value);
					}
				}
			}

			// Flatten any nested arrays/
			//将ret新数组合并到一个空数组中
			return concat.apply([], ret);
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function (fn, context) {
			var tmp, args, proxy;

			if (typeof context === "string") {
				tmp = fn[context];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if (!jQuery.isFunction(fn)) {
				return undefined;
			}

			// Simulated bind
			args = slice.call(arguments, 2);
			proxy = function () {
				return fn.apply(context || this, args.concat(slice.call(arguments)));
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});

	if (typeof Symbol === "function") {
		jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
	}

	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
		function (i, name) {
			class2type["[object " + name + "]"] = name.toLowerCase();
		});

	/**
	 * 判断是不是一个数组
	 *
	 * @param {any} obj 要判断的对象
	 * @returns boolean
	 */
	function isArrayLike(obj) {

		// Support: real iOS 8.2 only (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		/**
		 * !!obj
		 * 这里的 !!obj 是在判断obj是否存在
		 * 先!取反强制转换成boolean
		 * 然后再!取反获取应有的值
		 */
		/**
		 * "length" in obj
		 * 判断在obj对象中是否存在 length属性
		 */
		/**
		 * https://msdn.microsoft.com/library/719e8e30
		 * && 运算符的左右两边，如果有假值，就返回假值，没有假值，返回右边的那个真值
		 * true&&true&&1//1;
		 * (true&&true)&&1
		 *
		 */
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type(obj);
		//如果对象是方法或者是window对象则返回false
		if (jQuery.isFunction(obj) || jQuery.isWindow(obj)) {
			return false;
		}
		//通过判断返回truefalse
		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && (length - 1) in obj;
	}

	return jQuery;
});
