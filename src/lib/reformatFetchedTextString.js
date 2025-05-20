export function reformatAll(str) {
	const jsonStr = formatFetchTextString(str);
	//console.log(jsonStr);

	const columns = formatColumns(jsonStr.table.cols, "label");
	//console.log(columns);

	const rows = formatRows(jsonStr.table.rows);

	const arrObj = formatArr(columns, rows);

	return arrObj;
}

export function formatColumns(cols, key) {
	const columns = [];
	cols.map((row, i) => {
		//console.log(row);
		if (row) {
			//console.log(row);
			columns.push(row[key]);
		} else {
			columns.push(undefined);
		}
	});
	return columns;
}

export function formatRows(rows) {
	const allrows = [];
	const cols = [];

	rows.map((row, i) => {
		//console.log(row.c);
		const col = formatColumns(row.c, "v");
		//console.log(col);
		if (col) {
			allrows.push(col);
		} else {
			allrows.push(undefined);
		}
	});
	//console.log(allrows);
	return allrows;
}

export function formatArr(columns, rows) {
	const data = [];

	rows.map((row, i) => {
		const rowdata = {};
		row.map((col, e) => {
			if (col) {
				const column = columns[e];

				rowdata[column] = col;
			}
		});
		data.push(rowdata);
	});
	// function to sort the object by keys
	const sortObject = (obj) =>
		Object.keys(obj)
			.sort()
			.reduce((res, key) => ((res[key] = obj[key]), res), {});
	let result = sortObject(data[0]);

	//console.log(data);
	return data;
}

export function formatFetchTextString(str) {
	let tojson = str
		.replace("/*O_o*/\ngoogle.visualization.Query.setResponse(", "")
		.replace(");", "");

	// parse the string to json

	const result = JSON.parse(tojson);

	return result;
}
