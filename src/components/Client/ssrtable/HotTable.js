"use client";
// sync back
import { useRef, useState, useEffect, forwardRef } from "react";

// eslint-disable-next-line react/display-name
const HotTable = forwardRef((props, ref) => {
	const [loading, setLoading] = useState(true);
	const DynamicComponent = useRef(null);

	useEffect(() => {
		if (loading) {
			Promise.all([
				import("@handsontable/react"),
				// import language you need
				//import("handsontable/languages/ko-KR"),
			]).then(([module]) => {
				//console.log(module.HotTable);
				DynamicComponent.current = module.HotTable;
				setLoading(false);
			});
		}
	}, [loading, setLoading]);

	if (loading || !DynamicComponent.current) return <div />;

	return <DynamicComponent.current {...props} ref={ref} />;
});

export default HotTable;
