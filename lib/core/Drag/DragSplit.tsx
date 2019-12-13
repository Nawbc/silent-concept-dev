import React, { HTMLAttributes, FC } from 'react';
import { SilentCommonAttr, ClassValue } from '../../../lib/interfaces';
import { accordType, splitJsxProps, handleSize } from '../../../lib/helper';

interface DragSplitTempProps extends SilentCommonAttr, HTMLAttributes<any> {
	className?: any;
}

interface DragSplitProps extends DragSplitTempProps {
	className?: ClassValue;
}

const presetClassName = function(): string {
	return '';
};

const presetProps = function(props: DragSplitProps) {
	const sProps = splitJsxProps<DragSplitProps>(props, ['size', 'className', 'style']);
	sProps.customProps.size = handleSize(sProps.customProps.size!);
	return sProps;
};

/**=================================================================================================
 *			LASTMODIFY --- 2019-08-27T15:00:04.462Z
 *			DESCRIPTION --- DragSplit
 *			PROPS
 *				--- size [SizeType]
 *   =================================================================================================*/

const DragSplit: FC<DragSplitProps> = function(props) {
	const { nativeProps, customProps } = presetProps(props);
	const className = presetClassName();
	const { size, style, children } = customProps;
	const containerStyle = {
		...accordType(size, 'Object', {}),
		...style
	};

	return (
		<span {...nativeProps} style={containerStyle} className={className}>
			{children}
		</span>
	);
};

DragSplit.defaultProps = {};

export default React.memo(DragSplit);
