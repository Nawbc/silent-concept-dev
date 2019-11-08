import computedStyle from 'computed-style';

export const is = {
	type(obj: unknown, str: string): boolean {
		return Object.prototype.toString.call(obj) === `[object ${str}]`;
	},
	string(obj: unknown): obj is string {
		return this.type(obj, 'String');
	},
	object(obj: unknown): obj is object {
		return this.type(obj, 'Object');
	},
	function(obj: unknown): obj is Function {
		return this.type(obj, 'Function');
	},
	null(obj: unknown): obj is null {
		return this.type(obj, 'Null');
	},
	undefined(obj: unknown): obj is undefined {
		return this.type(obj, 'Undefined');
	},
	number(obj: unknown): obj is number {
		return this.type(obj, 'Number');
	}
};

/**=================================================================================================
 *			LASTMODIFY --- 2019-08-26T05:48:13.163Z
 *			DESCRIPTION --- 如果是符合b类型 就返回a , 否则返回c
 *=================================================================================================*/
export const accordType = (a: any, b: string, c: any) => (is.type(a, b) ? a : c);

/**=================================================================================================
 *			LASTMODIFY --- 2019-09-12T01:15:00.363Z
 *			DESCRIPTION --- 随机数
 *=================================================================================================*/

export const randomNumber = (min: number, max: number): number =>
	min + Math.floor(Math.random() * (max - min)) + 1;

/**=================================================================================================
 *			LASTMODIFY --- 2019-09-07T07:01:05.769Z
 *			DESCRIPTION --- 随机生成字母
 *=================================================================================================*/
export const randomAlphabet = (from: number, to: number): string =>
	String.fromCharCode(randomNumber(from, to));

/**=================================================================================================
 *			LASTMODIFY --- 2019-09-07T07:02:16.386Z
 *			DESCRIPTION --- 随机产生选取数组中的渐变色
 *=================================================================================================*/
export const randomGradients = (arr: string[]): string => arr[randomNumber(0, arr.length - 1)];

export const generateToken = () =>
	(Math.round(Math.random() * 0x1000000000) + new Date().getTime()).toString(36);

/**=================================================================================================
 *			LASTMODIFY --- 2019-11-01T06:44:30.264Z
 *			DESCRIPTION ---  转换工具
 *=================================================================================================*/

export const cv = {
	style2int(ele: HTMLElement, prop: string): number {
		return parseInt(computedStyle(ele, prop));
	}
};
