import { mkdir, readdir, readFile } from "node:fs/promises";
import { XMLParser } from "fast-xml-parser";
import { BookId, bookFromEnglish } from "./books";
import { ConlluWriter, Sentence, Word } from "./conllu";
import { join } from "node:path";
import { createWriteStream } from "node:fs";
import { downloadDir } from "./download";

const outdir = "dist";

class BookWriter extends ConlluWriter {
	variants: { ketiv: Sentence; qere?: Sentence } = {
		ketiv: new Sentence(),
	};
	newpar = "";

	constructor(public book: BookId) {
		super(createWriteStream(join(outdir, `${book}.conllu`), { flags: "w" }));
	}

	writeVerse(chapter: string, verse: string) {
		for (const [v, sentence] of Object.entries(this.variants)) {
			sentence.id = "LC-tanach.us";
			sentence.id += `-${this.book}-${chapter}:${verse}`;
			if (v !== "ketiv") sentence.id += `-${v}`;
			if (this.newpar) sentence.comments["newpar class"] = this.newpar;
			this.write(sentence);
		}

		this.newpar = "";
		this.variants = { ketiv: new Sentence() };
	}

	pushVariant(v: string, word: Word) {
		const s = this.variants[v];
		word.ID = (s.words.length + 1).toString();

		let punct: Word = {
			ID: (s.words.length + 2).toString(),
			FORM: "",
			LEMMA: "",
			UPOS: "PUNCT",
			MISC: {},
		};
		if (word.FORM.match(/\p{P}$/u) && word.FORM.length > 1) {
			punct.FORM = word.FORM[word.FORM.length - 1];
			punct.LEMMA = punct.FORM;
			word.FORM = word.FORM.substring(0, word.FORM.length - 1).trimEnd();

			if (punct.FORM !== "׀") word.MISC!.SpaceAfter = "No";
			if (punct.FORM === "־") punct.MISC!.SpaceAfter = "No";
			if (word.MISC?.["weirdPunct"]) {
				punct.MISC!.Weird = "Yes";
				delete word.MISC?.weirdPunct;
			}
		}
		if (word.FORM) s.words.push(word);
		if (punct.FORM) s.words.push(punct);
	}

	pushAll(word: Word) {
		for (const k of Object.keys(this.variants))
			this.pushVariant(k, structuredClone(word));
	}
}

async function convertToConLLU() {
	const bookDir = join(downloadDir, "Books");
	const entries = await readdir(bookDir);

	await mkdir(outdir, { recursive: true });

	for (const entry of entries) {
		if (
			!entry.endsWith(".xml") ||
			entry.includes(".DH") ||
			entry.includes("Header") ||
			entry.includes("Index")
		)
			continue;

		let book: BookId;
		try {
			book = bookFromEnglish(entry);
		} catch (err) {
			console.error(entry);
			continue;
		}

		console.log(entry);

		// this parser needs too much config and sucks
		const parser = new XMLParser({
			preserveOrder: true, // WHY WOULDN'T YOU????
			ignoreAttributes: false, // WHY WOULD YOU????
			attributesGroupName: "attributes", // why isn't this the default?
			attributeNamePrefix: "", // why does this "feature" exist?
		});
		const xmlData = await readFile(join(bookDir, entry));
		const result = parser.parse(xmlData, {
			unpairedTags: ["samekh", "pe", "reversednun"], // tyyyyyy
		});

		const writer = new BookWriter(book);

		for (const c of result[1].Tanach[1].tanach[0].book) {
			if (!("c" in c)) continue;

			const chapter = c[":@"].attributes.n;

			verseIter: for (const v of c.c) {
				if (!("v" in v)) continue;

				const verse = v[":@"].attributes.n;

				for (const w of v.v) {
					if ("samekh" in w) {
						writer.newpar = "samekh";
						continue;
					}
					if ("pe" in w) {
						writer.newpar = "pe";
						continue;
					}
					if ("reversednun" in w) {
						// https://software.sil.org/ezra/ezrainfo/
						writer.pushAll({ ID: "", FORM: "׆", UPOS: "PUNCT" });
						continue;
					}
					// We might have transcription notes baked into the verse or word.
					// https://tanach.us/Supplements/Notes.xml
					if ("x" in w) {
						const tnote = w.x[0]?.["#text"].toString();
						switch (tnote) {
							// This verse does NOT occur in the Leningrad Codex.
							// Included for continuity of verse numbering.
							case "X": continue verseIter;
							// Inverted nun, but there's another <reversednun /> tag coming
							case "8": continue;
							default:
								console.error("unknown transcription verse note", tnote);
								continue;
						}
					}

					let word: Word & Required<Pick<Word, "MISC">> = {
						ID: "",
						FORM: "",
						MISC: {},
					};

					let tag = "";
					if ("w" in w) tag = "w";
					else if ("k" in w) tag = "k";
					else if ("q" in w) tag = "q";
					const obj = w.w ?? w.q ?? w.k;

					for (const m of Array.isArray(obj) ? obj : [obj]) {
						if (!m) {
							console.error(book, chapter, verse, w);
							continue;
						}

						if ("s" in m) {
							word.MISC.Fmt ??= '';
							const text = m.s[0]["#text"].normalize("NFC");
							word.MISC.Fmt += `${word.FORM.length}-${word.FORM.length + text.length}`;
							word.MISC.Fmt += `:${m[":@"].attributes.t}`;
							word.FORM += text;
						}

						if ("x" in m) {
							const tnote =  m.x[0]["#text"].toString();
							let prop = '';
							switch (tnote) {
								case 'c':
								case 'q':
									prop = "Weird";
									break;
								case 'd':
									prop = 'Tipeha-dehi';
									break;
								case 'm':
									prop = 'Meteg-merkha';
									break;
								case 't':
									prop = 'Unclear';
									break;
								case 'y':
									prop += 'Yatir';
									break;
								case '4':
									prop += 'weirdPunct';
									break;
								case '5':
								case '6':
								case '7':
									// included in "s" tag's "t" attribute
									break;
								default:
									console.error("unknown transcription word note", tnote);
									break;
							}
							if (prop) {
								if (!word.MISC[prop]) word.MISC[prop] = `${word.FORM.length}`;
								else word.MISC[prop] += `+${word.FORM.length}`;
							}
						} else if ("#text" in m) {
							word.FORM += m["#text"].normalize("NFC");
						}
					}

					if (tag === "w") writer.pushAll(word);
					else if (tag === "k") writer.pushVariant("ketiv", word);
					else if (tag === "q") {
						if (!("qere" in writer.variants)) {
							writer.variants.qere =
								writer.variants.ketiv?.clone() ?? new Sentence();
						}
						writer.pushVariant("qere", word);
					}
				}
				writer.writeVerse(chapter, verse);
			}
		}

		await new Promise((res) => writer.stream.end(res));
	}
}

if (import.meta.main) await convertToConLLU();
