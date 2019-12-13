import React, { HTMLAttributes, FC } from 'react';
import { SilentCommonAttr, ClassValue } from '../../../lib/interfaces';
import { accordType, splitJsxProps, handleSize } from '../../../lib/helper';

interface DragIntoTempProps extends SilentCommonAttr, HTMLAttributes<any> {
	className?: any;
}

interface DragIntoProps extends DragIntoTempProps {
	className?: ClassValue;
}

const presetClassName = function(): string {
	return '';
};

const presetProps = function(props: DragIntoProps) {
	const sProps = splitJsxProps<DragIntoProps>(props, ['size', 'className', 'style']);
	sProps.customProps.size = handleSize(sProps.customProps.size!);
	return sProps;
};

/**=================================================================================================
 *			LASTMODIFY --- 2019-08-27T15:00:04.462Z
 *			DESCRIPTION --- DragInto
 *			PROPS
 *				--- size [SizeType]
 *   =================================================================================================*/

const DragInto: FC<DragIntoProps> = function(props) {
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

DragInto.defaultProps = {};

export default React.memo(DragInto);
