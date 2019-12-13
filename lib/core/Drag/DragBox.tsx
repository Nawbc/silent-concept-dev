import React, { HTMLAttributes, FC } from 'react';
import { SilentCommonAttr, ClassValue } from '../../../lib/interfaces';
import { accordType, splitJsxProps, handleSize } from '../../../lib/helper';

interface DragBoxTempProps extends SilentCommonAttr, HTMLAttributes<any> {
	className?: any;
}

interface DragBoxProps extends DragBoxTempProps {
	className?: ClassValue;
}

const presetClassName = function(): string {
	return '';
};

const presetProps = function(props: DragBoxProps) {
	const sProps = splitJsxProps<DragBoxProps>(props, ['size', 'className', 'style']);
	sProps.customProps.size = handleSize(sProps.customProps.size!);
	return sProps;
};

/**=================================================================================================
 *			LASTMODIFY --- 2019-08-27T15:00:04.462Z
 *			DESCRIPTION --- DragBox
 *			PROPS
 *				--- size [SizeType]
 *   =================================================================================================*/

const DragBox: FC<DragBoxProps> = function(props) {
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

DragBox.defaultProps = {};

export default React.memo(DragBox);
