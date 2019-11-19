import React, { HTMLAttributes, FC, useRef, useLayoutEffect, ReactNode, useState } from 'react';
import { SilentCommonAttr, ClassValue } from '../../../../lib/interfaces';
import { accordType, splitJsxProps, handleSize, cv, is } from '../../../../lib/helper';
import classNames from 'classnames';
import ScrollBar, { scrollBarWidth } from '../ScrollBar';
// import computedStyle from 'computed-style';
import './style/index.scss';
import { useWindowResize, useMutation } from '../../Tools/hooks';

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
	// const [isDisplayBar, setDisplayBar] = useState(false);
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
			React.cloneElement(withScrollBar, { ref: barRef, _contentHeight: contentHeight })
		) : (
			<ScrollBar ref={barRef} _contentHeight={contentHeight} />
		)
	) : null;

	useLayoutEffect(() => {
		const contentEle = contentRef.current!;
		const containerEle = containerRef.current!;
		const scrollEle = scrollRef.current!;
		const contentHeight = cv.style2int(contentEle, 'height');
		const containerHeight = cv.style2int(containerEle, 'height');
		const containerWidth = cv.style2int(containerEle, 'width');
		const isDisplayBar = contentHeight > containerHeight;
		scrollEle.style.width = cv.style2int(containerEle, 'width') + scrollBarWidth + 'px';
		scrollEle.style.height = containerHeight + scrollBarWidth + 'px';
		scrollEle.onscroll = function(e) {
			const ev = window.event || e;
			const targetEle = ev.target as HTMLElement;
			const { updateSliderTop } = barRef.current as any;
			updateSliderTop(targetEle.scrollTop);
			is.function(onScroll) && onScroll(ev as any);
		};
		contentEle.style.width =
			containerWidth - (!!withScrollBar && isDisplayBar ? scrollBarWidth : 0) + 'px';
		// 待实现  container的通过mutationObserver改变  更新contentEle的height
		setContentHeight(cv.style2int(contentEle, 'height'));
	}, [withScrollBar, onScroll]);

	return (
		<div ref={containerRef} {...nativeProps} style={containerStyle} className={containerCN}>
			<div className={scrollCN} ref={scrollRef}>
				<div ref={contentRef}>{children}</div>
			</div>
			{scrollBar}
		</div>
	);
};

ScrollBox.defaultProps = {
	size: ['100%', '100%'],
	withScrollBar: true
};

export default ScrollBox;
