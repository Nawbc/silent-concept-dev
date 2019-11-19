import MutationObserver from 'resize-observer-polyfill';
import { useRef, useState, useEffect, RefObject } from 'react';

/**=================================================================================================
 *			LASTMODIFY --- 2019-11-12T11:27:31.476Z
 *			DESCRIPTION --- 监听元素属性变化
 *=================================================================================================*/

const initRect = {
	bottom: 0,
	height: 0,
	left: 0,
	right: 0,
	top: 0,
	width: 0,
	x: 0,
	y: 0
};

export const useMutation = function(): [RefObject<any>, typeof initRect] {
	const ref = useRef();
	const [bounds, setBounds] = useState(initRect);

	const ob = new MutationObserver(([entry]) => setBounds(entry.contentRect));

	useEffect(() => {
		const currentEle = (ref.current as unknown) as HTMLElement;
		if (!!currentEle) {
			ob.observe(currentEle);
			return () => {
				ob.disconnect();
			};
		}
		/* eslint-disable react-hooks/exhaustive-deps */
	}, []);
	return [ref, bounds];
};
