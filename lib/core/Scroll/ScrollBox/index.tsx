import React, { HTMLAttributes, FC, useRef, useLayoutEffect, ReactNode, useState } from 'react';
import { SilentCommonAttr, ClassValue } from '../../../../lib/interfaces';
import { accordType, splitJsxProps, handleSize, cv, is } from '../../../../lib/helper';
import { scrollSliderWidth } from '../constant';
import classNames from 'classnames';
import ScrollBar from '../ScrollBar';
// import computedStyle from 'computed-style';
import './style/index.scss';

const prefix = 's-scrollBox';

interface ScrollBoxTempProps extends SilentCommonAttr, HTMLAttributes<any> {
	className?: any;
	hoverDisplayScrollSlider?: boolean;
	compStyle?: any;
	forceX?: boolean;
	forceY?: boolean;
	withScrollBar?: boolean | ReactNode;
}

interface ScrollBoxProps extends ScrollBoxTempProps {
	className?: ClassValue;
}

const presetClassName = function(cProps: ScrollBoxProps) {
	const { className } = cProps;

	return {
		containerCN: classNames(prefix, className),
		scrollCN: classNames('scroll', {})
	};
};

const presetProps = function(props: ScrollBoxProps) {
	const sProps = splitJsxProps<ScrollBoxProps>(props, [
		'size',
		'className',
		'style',
		'children',
		'hoverDisplayScrollSlider',
		'withScrollBar',
		'onScroll',
		'compStyle'
	]);
	sProps.customProps.size = handleSize(sProps.customProps.size);
	return sProps;
};

/**=================================================================================================
 *			LASTMODIFY --- 2019-08-27T15:00:04.462Z
 *			DESCRIPTION --- ScrollBox
 *			PROPS
 *				--- size [SizeType]
 *   =================================================================================================*/

const ScrollBox: FC<ScrollBoxProps> = function(props) {
	const { nativeProps, customProps } = presetProps(props);
	const { containerCN, scrollCN } = presetClassName(customProps);
	const { size, style, children, withScrollBar, onScroll } = customProps;
	const [contentHeight, setContentHeight] = useState(0);
	const [isHiddenBar, setHiddenBar] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);
	const barRef = useRef<HTMLDivElement>(null);

	const containerStyle = {
		...accordType(size, 'Object', {}),
		...style
	};

	const scrollBar = !!withScrollBar ? (
		React.isValidElement(withScrollBar) ? (
			// 使用自定义的的ScrollBar
			React.cloneElement(withScrollBar, { ref: barRef, contentHeight: contentHeight })
		) : (
			// 使用默认的ScrollBar
			<ScrollBar ref={barRef} contentHeight={contentHeight} />
		)
	) : null;

	useLayoutEffect(() => {
		const contentEle = contentRef.current!;
		const containerEle = containerRef.current!;
		const scrollEle = scrollRef.current!;
		const contentHeight = cv.style2int(contentEle, 'height');
		const containerHeight = cv.style2int(containerEle, 'height');
		const containerWidth = cv.style2int(containerEle, 'width');
		const isDisplayBar = contentHeight > containerHeight; // 内容小于不显示侧边

		if (!isDisplayBar) {
			setHiddenBar(!isHiddenBar);
		}

		const widthThatDisplayBar = isDisplayBar ? scrollSliderWidth : 0;

		// 更新内容撑起的高度
		setContentHeight(cv.style2int(contentEle, 'height'));

		scrollEle.style.width = cv.style2int(containerEle, 'width') + widthThatDisplayBar + 'px';
		scrollEle.style.height = containerHeight + widthThatDisplayBar + 'px';
		scrollEle.onscroll = function(e) {
			const ev: any = window.event || e;
			const targetEle = ev.target as HTMLElement;
			if (!!barRef.current) {
				const { updateSliderTop } = barRef.current as any;
				updateSliderTop(targetEle.scrollTop);
			}
			is.function(onScroll) && onScroll(ev);
		};
		contentEle.style.width = containerWidth - widthThatDisplayBar + 'px';
		// 待实现  container的通过mutationObserver改变  更新contentEle的height
	}, [onScroll, isHiddenBar]);

	return (
		<div ref={containerRef} {...nativeProps} style={containerStyle} className={containerCN}>
			<div className={scrollCN} ref={scrollRef}>
				<div ref={contentRef}>{children}</div>
			</div>
			{isHiddenBar ? null : scrollBar}
		</div>
	);
};

ScrollBox.defaultProps = {
	size: ['100%', '100%'],
	withScrollBar: true
};

export default ScrollBox;
