export function build_usable_json(text) {
	const jsonData = JSON.parse(text.substring(47).slice(0, -2)); // only extract the json data

	//console.log(jsonData);
	const cols = []; // build something like ['term_id', 'term_name', 'term_slug', 'last_change',...]
	//achtung, aufpassen, dass keine Formel oder kein script in der ersten Zeile arbeitet, sonst geht die api nicht
	jsonData.table.cols.forEach((heading) => {
		if (heading.label) {
			let column = heading.label;
			cols.push(column);
		}
	});
	//console.log(cols);

	const data = []; // build something like [{term_id: 333, term_name: 'Balaao', term_slug: 'balaao',...],...}

	jsonData.table.rows.forEach((rowData) => {
		const row = {};
		cols.forEach((ele, ind) => {
			row[ele] = rowData.c[ind] != null ? rowData.c[ind].v : "";
		});
		data.push(row);
	});

	//console.log(data);

	return data;
}
