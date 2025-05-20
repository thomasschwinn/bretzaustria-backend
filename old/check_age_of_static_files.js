const Fs = require("fs");
export async function checkAgeOfStaticFiles() {
	const file = "/tmp/options.json";
	const { ctimeMs } = Fs.statSync(file); // gets the create time in miliseconds of the file with 4 decimals
	//console.log(Fs.statSync(file));
	const birthtime = Math.round(ctimeMs); // removes the decimals
	const nowTime = Date.now(); // gets the actual time in miliseconds
	const differenceMs = 120000; // miliseconds, one second has 1000 ms, one minute has 60000 ms
	if (nowTime - birthtime > differenceMs) {
		return "google";
	} else {
		return "static";
	}
}
