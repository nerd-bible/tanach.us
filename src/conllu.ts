import { WriteStream } from "node:fs";

export const defaultColumns = [
	"ID",
	"FORM",
	"LEMMA",
	"UPOS",
	"XPOS",
	"FEATS",
	"HEAD",
	"DEPREL",
	"DEPS",
	"MISC",
] as const;

export type Column = (typeof defaultColumns)[number] | string;

export type Word = {
	ID: string;
	FORM: string;
	LEMMA?: string;
	UPOS?: string;
	XPOS?: string;
	FEATS?: { [key: string]: string };
	HEAD?: string;
	DEPREL?: string;
	DEPS?: { [key: string]: string };
	MISC?: { [key: string]: string };
};

export class Sentence {
	id: string;
	comments: { [key: string]: string } = {};
	words: Word[] = [];

	clone(): Sentence {
		const res = new Sentence();
		res.comments = structuredClone(this.comments);
		res.words = this.words.slice();
		return res;
	}
}

export class ConlluWriter {
	constructor(
		public stream: WriteStream,
		public columns: readonly Column[] = defaultColumns,
	) {
		if (!columns.every((c, i) => c === defaultColumns[i])) {
			// conllup format
			this.stream.write(`# global.columns = ${columns.join(" ")}\n`);
		}
	}

	write(sentence: Sentence) {
		this.stream.write(`# sent_id = ${sentence.id}\n`);
		let text = "";
		for (const w of sentence.words) {
			text += w["FORM"];
			if (w["MISC"]?.["SpaceAfter"]?.toLowerCase() !== "no") text += " ";
		}

		this.stream.write(`# text = ${text}\n`);

		for (const [k, v] of Object.entries(sentence.comments))
			this.stream.write(`# ${k} = ${v}\n`);

		for (const w of sentence.words) {
			const row = this.columns.map((c) => {
				let joiner = "";
				if (c === "FEATS" || c === "MISC") joiner = "=";
				else if (c === "DEPS") joiner = ":";

				if (joiner)
					return Object.entries(w[c] ?? {})
						.map(([k, v]) => `${k}${joiner}${v}`)
						.join("|");

				return w[c];
			});
			this.stream.write(row.map((v) => (v ? v : "_")).join("\t"));
			this.stream.write("\n");
		}

		this.stream.write("\n");
	}
}
