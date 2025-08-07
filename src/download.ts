import { createWriteStream } from "node:fs";
import { mkdir, unlink } from "node:fs/promises";
import { dirname } from "node:path";
import ProgressBar from "progress";
import { Open } from "unzipper";

const url = "https://www.tanach.us/Books/Tanach.xml.zip";
export const downloadDir = "downloads";
const downloadPath = "Tanach.xml.zip";

/**
 * Download a url to a path with a progress bar.
 */
export async function downloadFile(url: string, path: string) {
	console.log(url, "->", path);
	const resp = await fetch(url);

	const contentLength = resp.headers.get("content-length");
	if (!contentLength) throw `${url} missing content-length`;

	const total = Number.parseInt(contentLength);
	const progress = new ProgressBar(":bar :percent (:eta remaining)", {
		total,
		width: url.length,
	});
	if (!resp.body) throw `${url} missing body`;

	const reader = resp.body.getReader();

	await mkdir(dirname(path), { recursive: true });
	const file = createWriteStream(path);

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		progress.tick(value.length);
		file.write(value);
	}
	file.end();
	file.close();
}

async function downloadAndUnzip() {
	await downloadFile(url, downloadPath);
	const directory = await Open.file(downloadPath);
	await directory.extract({ path: downloadDir });
	await unlink(downloadPath);
}

if (import.meta.main) await downloadAndUnzip();
