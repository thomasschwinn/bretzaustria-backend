export default function Pagination({ totalRows, range, page, setPage }) {
	const result = Math.round(totalRows / range);

	const buttonArr = [];
	for (let index = 1; index < result + 1; index++) {
		buttonArr.push(index);
	}

	function handleClick(el) {
		setPage(el);
	}

	return (
		<>
			{buttonArr.map((el, i) => {
				const disabled = page == el ? true : false;

				return (
					<button
						key={i}
						className="btn"
						disabled={disabled}
						onClick={() => {
							setPage(el);
						}}
					>
						{el}
					</button>
				);
			})}
		</>
	);
}
