export default function GridElement({ col, row, hor, ver, children }) {
	// col-span-1 col-span-2 col-span-3 col-span-4
	// row-span-1 row-span-2 row-span-3 row-span-4
	// justify-self-start justify-self-end jsutify-self-center self-start self-end self-center

	const colwidth = col == undefined ? "" : col;
	const rowwidth = row == undefined ? "" : col;
	return (
		<div
			className={` col-span-${colwidth}  row-span-${rowwidth} justify-self-${hor} self-${ver}`}
		>
			{children}
		</div>
	);
}
