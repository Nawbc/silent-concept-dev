/**=================================================================================================
 *			AUTHOR --- Han Wang
 *			LICENSE --- Apache-2.0
 *			LASTMODIFY --- 2019-08-23T13:12:35.627Z
 *			DESCRIPTION --- 提供一些工具函数
 *			REPOSITORY --- https://github.com/sewerganger/silent-concept
 *=================================================================================================*/

import { SizeType } from '../interfaces';
import { accordType } from './dash';

/**=================================================================================================
 *			LASTMODIFY --- 2019-08-23T07:35:50.430Z
 *			DESCRIPTION --- 处理size 属性大小 把数组转化成 CSSProperties 默认单位为px
 *			EXAMPLE --- 处理接收的size属性 ["1px", "1px"] or [1, 1] or [1] or 'normal' or
 *                            {fonSize:'10px'} or {width:'10px'}
 * =================================================================================================*/

/* eslint-disable @typescript-eslint/indent*/
export const handleSize = (size: SizeType): SizeType =>
	Array.isArray(size)
		? 1 === size.length
			? { width: accordType(size[0], 'String', size![0] + 'px') }
			: {
					width: accordType(size[0], 'String', size[0] + 'px'),
					height: accordType(size[1], 'String', size[1] + 'px')
			  }
		: size;
/**=================================================================================================
 *			LASTMODIFY --- 2019-08-23T07:45:13.469Z
 *			DESCRIPTION ---  把html 和 react 原有属性 和 组件 要使用的属性分开 深度拷贝props
 * =================================================================================================*/

export interface AfterSplitJsxProps<T> {
	nativeProps: React.Props<any>;
	customProps: T;
}

export type PartialArray<T> = (keyof T)[];

export const splitJsxProps = function<Type>(
	receiveProps: React.Props<any>,
	useProps: PartialArray<Type>
): AfterSplitJsxProps<Type> {
	const nativeProps: React.Props<any> = {};
	const customProps: Type = {} as Type;

	for (const prop in receiveProps) {
		useProps.indexOf(prop as keyof Type) >= 0
			? (customProps[prop] = receiveProps[prop])
			: (nativeProps[prop] = receiveProps[prop]);
	}

	return { nativeProps, customProps };
};

/**=================================================================================================
 *			LASTMODIFY --- 2019-11-12T11:08:26.084Z
 *			DESCRIPTION --- 十六进制转 rgb
 *=================================================================================================*/

export const hexToRgb = function(str: string) {
	const literal = str.replace('#', '');
	return literal.length === 3
		? literal.match(/./g)!.map(val => parseInt(val, 16) ** 2)
		: literal.match(/../g)!.map(val => parseInt(val, 16));
};

/**=================================================================================================
 *			LASTMODIFY --- 2019-11-12T11:09:28.556Z
 *			DESCRIPTION --- rgb 转 十六进制
 *=================================================================================================*/
export const rgbToHex = function(a: number, b: number, c: number) {
	const hex = [a.toString(16), b.toString(16), c.toString(16)];
	for (let i = 0; i < 3; i++) if (hex[i].length == 1) hex[i] = '0' + hex[i];
	return '#' + hex.join('');
};

/**=================================================================================================
 *			LASTMODIFY --- 2019-11-12T11:10:25.493Z
 *			DESCRIPTION ---  颜色变深
 *=================================================================================================*/

export const makeColorDarker = function(color: string, level: number) {
	return (
		'rgb(' +
		color
			.slice(4, color.length - 1)
			.split(',')
			.map(v => Math.ceil(parseInt(v) * level))
			.join(',') +
		')'
	);
};
/**=================================================================================================
 *			LASTMODIFY --- 2019-11-12T11:10:52.832Z
 *			DESCRIPTION --- 颜色变浅
 *=================================================================================================*/

export const makeColorLighter = function(color: string, level: number) {
	return (
		'rgb(' +
		color
			.slice(4, color.length - 1)
			.split(',')
			.map(v => Math.ceil((255 - parseInt(v)) * level + parseInt(v)))
			.join(',') +
		')'
	);
};
