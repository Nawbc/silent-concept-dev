import React, { FC, ReactElement } from 'react';
import { is } from '../../../helper';

interface MapProps {
	data?: Record<string, string>;
	repeatCount?: number;
	children?: ReactElement | ((data) => ReactElement);
}

/**=================================================================================================
 *			LASTMODIFY --- 2019-11-18T13:40:44.242Z
 *			DESCRIPTION --- 批量渲染元素
 *			PROPS
 *						--- data 仅支持深度为一数据
 *						--- repeatCount 重复的次数
 *						--- children 子元素
 *   =================================================================================================*/

const Map: FC<MapProps> = function(props) {
	const { children, repeatCount, data } = props;
	let mapElement = null as any;
	const mapEleArray: ReactElement[] = [];

	if (is.number(repeatCount) && data === void 0) {
		for (let i = 0; i < repeatCount; i++) {
			mapEleArray.push(React.cloneElement(children as ReactElement, { key: i }));
			mapElement = mapEleArray;
		}
	} else if (repeatCount === void 0 && is.function(children)) {
		let tmpCounter = 0;
		for (const prop in data) {
			tmpCounter++;
			const clonedElement = React.cloneElement(children(data[prop]), { key: tmpCounter });
			mapEleArray.push(clonedElement as never);
			mapElement = mapEleArray;
		}
	}
	return <>{mapElement}</>;
};

export default Map;
