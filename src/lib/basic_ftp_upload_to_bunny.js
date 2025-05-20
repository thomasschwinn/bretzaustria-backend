const ftp = require("basic-ftp");

async function uploadFileToFTP(localFile, remotePath) {
	const client = new ftp.Client();

	try {
		await client.access({
			host: "<YOUR_FTP_HOST>",
			user: "<YOUR_FTP_USER_USERNAME>",
			password: "<YOUR_FTP_USER_PASSWORD>",
			secure: false,
		});

		// upload the local file located in localFile
		// to remotePath
		await client.uploadFrom(localFile, remotePath);
	} catch (err) {}
	client.close();
}

// upload the local file "report.xlxs" to
// the remote path "reports/report.xlsx"
uploadFileToFTP("report.xlsx", "reports/report.xlsx");
