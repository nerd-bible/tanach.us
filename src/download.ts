import { unlink, writeFile } from "node:fs/promises";
import { Open } from "unzipper";

const url = "https://www.tanach.us/Books/Tanach.xml.zip";
export const downloadDir = "downloads";
const downloadPath = "Tanach.xml.zip";

async function downloadAndUnzip() {
	const resp = await fetch(url);
	const body = await resp.bytes();
	await writeFile(downloadPath, body);
	const directory = await Open.file(downloadPath);
	await directory.extract({ path: downloadDir });
	await unlink(downloadPath);
}

if (import.meta.main) await downloadAndUnzip();
