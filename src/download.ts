import { unlink } from "node:fs/promises";
import { Open } from "unzipper";
import { download } from "@nerd-bible/core";

const url = "https://www.tanach.us/Books/Tanach.xml.zip";
export const downloadDir = "downloads";
const downloadPath = "Tanach.xml.zip";

async function downloadAndUnzip() {
	await download.file(url, downloadPath);
	const directory = await Open.file(downloadPath);
	await directory.extract({ path: downloadDir });
	await unlink(downloadPath);
}

if (import.meta.main) await downloadAndUnzip();
