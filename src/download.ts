import { unlink, writeFile } from "node:fs/promises";
import { Open } from "unzipper";

const url = new URL("https://www.tanach.us/Books/Tanach.xml.zip");
const fname = url.pathname.split("/").pop()!;
export const downloadDir = "downloads";

async function downloadAndUnzip() {
	const resp = await fetch(url);
	const body = await resp.bytes();
	await writeFile(fname, body);
	const directory = await Open.file(fname);
	await directory.extract({ path: downloadDir });
	await unlink(fname);
}

if (import.meta.main) await downloadAndUnzip();
