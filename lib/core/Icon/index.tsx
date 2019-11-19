/**=================================================================================================
 *			AUTHOR --- Han Wang
 *			LICENSE --- Apache-2.0
 *			LASTMODIFY --- 2019-09-13T14:32:49.491Z
 *			REPOSITORY --- https://github.com/sewerganger/silent-concept
 *=================================================================================================*/

import React, { ReactElement, useRef, useLayoutEffect, HTMLAttributes, FC } from 'react';
import { SilentCommonAttr, EffectType, SizeType, ClassValue, DefaultColor } from '../../interfaces';
import { accordType, splitJsxProps, handleSize } from '../../helper';
import { comptStyle as componentStyle } from 'component-style';
import * as DefaultSvg from '../../assets/svg';
import Picture from '../../core/Picture';
import classNames from 'classnames';
import './style/icon.scss';

const prefix = 's-icon';

interface IconTempProps extends SilentCommonAttr, HTMLAttributes<any> {
	src?: string;
	beforeLoad?: string | ReactElement;
	lazy?: boolean;
	type?: string;
	effect?: EffectType;
	pigment?: DefaultColor;
	size?: SizeType;
	className?: any;
	iconNotRotate?: boolean;
	comptStyle?: Record<string, string | object>;
}

export interface IconProps extends IconTempProps {
	className?: ClassValue;
}

const presetClassName = function(cProps: IconProps): string {
	const { size, effect, className } = cProps;
	return classNames(prefix, className, {
		[`${prefix}-${size}`]: accordType(size, 'String', false),
		[`${prefix}-${effect}`]: !!effect
	});
};

const presetProps = function(props: IconProps) {
	const sProps = splitJsxProps<IconProps>(props, [
		'src',
		'type',
		'size',
		'beforeLoad',
		'className',
		'comptStyle',
		'pigment',
		'style',
		'lazy',
		'effect',
		'iconNotRotate'
	]);
	sProps.customProps.size = handleSize(sProps.customProps.size!);
	return sProps;
};

export interface IconFunction {
	(props: IconProps): ReactElement;
}

/**=================================================================================================
 *			AUTHOR --- Han Wang
 *			DESCRIPTION --- icon 组件
 * =================================================================================================*/

const Icon: FC<IconProps> = function(props) {
	const { nativeProps, customProps } = presetProps(props);
	const className = presetClassName(customProps);
	const { src, lazy, type, pigment, size, style, comptStyle } = customProps;
	const DefaultIcon = DefaultSvg[type!];
	const refEle = useRef(null);
	const customStyle = {
		...accordType(size, 'Object', {}),
		...style
	};

	useLayoutEffect(() => {
		const container = (refEle.current as unknown) as HTMLElement;
		const firstEle = container.firstChild as SVGAnimateElement;
		comptStyle && componentStyle(`#${prefix}`, comptStyle);
		if (firstEle && firstEle.tagName === 'svg') {
			firstEle.style.fill = `${pigment}`;
		}
	}, [comptStyle, pigment]);

	return (
		<i {...nativeProps} className={className} style={customStyle} ref={refEle}>
			{!!type ? (
				<DefaultIcon />
			) : !!props.children ? (
				props.children
			) : (
				<Picture size={['100%', '100%']} src={src} lazy={lazy} />
			)}
		</i>
	);
};

Icon.defaultProps = {
	size: 'normal',
	lazy: false
};

export default React.memo(Icon);
