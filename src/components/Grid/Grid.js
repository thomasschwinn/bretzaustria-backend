export default function Grid({ cols, rows, children, tagname }) {
	// just to tell tailwind to load the classes, we give 'em some classnames
	// grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4
	// grid-rows-1 grid-rows-2 grid-rows-3 grid-rows-4
	const Dyntagname = tagname == "" || tagname == undefined ? "div" : tagname;

	return (
		<Dyntagname className={`grid grid-cols-${cols} grid-rows-${rows}`}>
			{children}
		</Dyntagname>
	);
}
