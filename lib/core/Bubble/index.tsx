/**=================================================================================================
 *			LICENSE --- Apache-2.0
 *			LASTMODIFY --- 2019-10-09T13:59:54.538Z
 *			REPOSITORY --- https://github.com/sewerganger/silent-concept
 *=================================================================================================*/

import React, { HTMLAttributes, FC, ReactNode } from 'react';
import { SilentCommonAttr, ClassValue } from '../../interfaces';
import { accordType, splitJsxProps, handleSize } from '../../helper';
// import classNames from 'classnames';

export const prefix = 's-bubble';

interface BubbleTempProps extends SilentCommonAttr, HTMLAttributes<Element> {
	className?: any;
	target?: ReactNode;
	fillet?: string;
	mode?: string;
	duration?: number;
}

interface BubbleProps extends BubbleTempProps {
	className?: ClassValue;
}

interface ClassNameEx {
	containerCN: string;
	headlineCN: string;
	innerCN: string;
	iconCN: string;
}

// const presetClassName = function(cProps): ClassNameEx {
// 	// const { className } = cProps;
// 	// return {
// 	// };
// };

const presetProps = function(props: BubbleProps) {
	const sProps = splitJsxProps<BubbleProps>(props, [
		'style',
		'className',
		'size',
		'effect',
		// 'place',
		'duration',
		'mode',
		// 'content',
		'children',
		'display',
		'fillet',
		'target'
	]);
	sProps.customProps.size = handleSize(sProps.customProps.size!);
	return sProps;
};

/**=================================================================================================
 *			LASTMODIFY --- 2019-10-09T13:59:33.841Z
 *			DESCRIPTION --- Bubble
 *			PROPS
 *				--- size [SizeType]
 *   =================================================================================================*/

const Bubble: FC<BubbleProps> = function(props) {
	const { nativeProps, customProps } = presetProps(props);

	const { size, style } = customProps;
	// const {} = presetClassName(customProps);
	const containerStyle = {
		...accordType(size, 'Object', {}),
		...style
	};

	return <div {...nativeProps} className={'rule'} style={containerStyle} />;
};

Bubble.defaultProps = {
	effect: false
};

export default Bubble;
