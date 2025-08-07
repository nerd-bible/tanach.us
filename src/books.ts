/** TODO: https://www.biblegateway.com/learn/bible-101/who-wrote-the-bible/ */
export type BookDetail = {
	/** Approximate date book author started writing book. */
	from?: string;
	/** Approximate date book author finished writing book. */
	to?: string;
};

/**
 * All supported books in a popular canon.
 *
 * https://www.biblegateway.com/learn/bible-101/about-the-bible/when-was-the-bible-written/
 */
export const bookDetails = {
	gen: { from: "-1446", to: "-1406" } as BookDetail,
	exo: { from: "-1446", to: "-1406" } as BookDetail,
	lev: { from: "-1446", to: "-1406" } as BookDetail,
	num: { from: "-1446", to: "-1406" } as BookDetail,
	deu: { from: "-1446", to: "-1406" } as BookDetail,
	jos: { from: "-1400", to: "-1370" } as BookDetail,
	jdg: { from: "-1045", to: "-1000" } as BookDetail,
	rut: { from: "-1011", to: "-931" } as BookDetail,
	"1sa": { from: "-930", to: "-722" } as BookDetail,
	"2sa": { from: "-930", to: "-722" } as BookDetail,
	"1ki": { from: "-560", to: "-540" } as BookDetail,
	"2ki": { from: "-560", to: "-540" } as BookDetail,
	"1ch": { from: "-450", to: "-425" } as BookDetail,
	"2ch": { from: "-450", to: "-425" } as BookDetail,
	ezr: { from: "-440", to: "-430" } as BookDetail,
	neh: { from: "-430", to: "-400" } as BookDetail,
	est: { from: "-400" } as BookDetail,
	job: { from: "-1000", to: "-500" } as BookDetail,
	psa: { from: "-1400", to: "-500" } as BookDetail,
	pro: { from: "-950", to: "-700" } as BookDetail,
	ecc: { from: "-935" } as BookDetail,
	sng: { from: "-960", to: "-931" } as BookDetail,
	isa: { from: "-700", to: "-681" } as BookDetail,
	jer: { from: "-626", to: "-585" } as BookDetail,
	lam: { from: "-586" } as BookDetail,
	ezk: { from: "-593", to: "-571" } as BookDetail,
	dan: { from: "-530" } as BookDetail,
	hos: { from: "-750", to: "-715" } as BookDetail,
	jol: { from: "-500", to: "-450" } as BookDetail,
	amo: { from: "-760", to: "-750" } as BookDetail,
	oba: { from: "-580", to: "-560" } as BookDetail,
	jon: { from: "-790", to: "-760" } as BookDetail,
	mic: { from: "-735", to: "-700" } as BookDetail,
	nam: { from: "-663", to: "-612" } as BookDetail,
	hab: { from: "-612", to: "-589" } as BookDetail,
	zep: { from: "-640", to: "-609" } as BookDetail,
	hag: { from: "-520" } as BookDetail,
	zec: { from: "-520", to: "-480" } as BookDetail,
	mal: { from: "-440", to: "-430" } as BookDetail,
	mat: { from: "70" } as BookDetail,
	mrk: { from: "64", to: "70" } as BookDetail,
	luk: { from: "62", to: "90" } as BookDetail,
	jhn: { from: "90", to: "110" } as BookDetail,
	act: { from: "62", to: "90" } as BookDetail,
	rom: { from: "56", to: "57" } as BookDetail,
	"1co": { from: "53", to: "54" } as BookDetail,
	"2co": { from: "55", to: "56" } as BookDetail,
	gal: { from: "50", to: "56" } as BookDetail,
	eph: { from: "60", to: "62" } as BookDetail,
	php: { from: "54", to: "62" } as BookDetail,
	col: { from: "57", to: "62" } as BookDetail,
	"1th": { from: "50", to: "51" } as BookDetail,
	"2th": { from: "51", to: "52" } as BookDetail,
	"1ti": { from: "62", to: "64" } as BookDetail,
	"2ti": { from: "64", to: "67" } as BookDetail,
	tit: { from: "62", to: "64" } as BookDetail,
	phm: { from: "54", to: "62" } as BookDetail,
	heb: { from: "60", to: "95" } as BookDetail,
	jas: { from: "45", to: "62" } as BookDetail,
	"1pe": { from: "60", to: "65" } as BookDetail,
	"2pe": { from: "65", to: "68" } as BookDetail,
	"1jn": { from: "85", to: "100" } as BookDetail,
	"2jn": { from: "85", to: "100" } as BookDetail,
	"3jn": { from: "85", to: "100" } as BookDetail,
	jud: { from: "65", to: "80" } as BookDetail,
	rev: { from: "64", to: "65" } as BookDetail,
	// Here lie the not so popular canons...
	tob: {} as BookDetail,
	jdt: {} as BookDetail,
	esg: {} as BookDetail,
	wis: {} as BookDetail,
	sir: {} as BookDetail,
	bar: {} as BookDetail,
	lje: {} as BookDetail,
	s3y: {} as BookDetail,
	sus: {} as BookDetail,
	bel: {} as BookDetail,
	"1ma": {} as BookDetail,
	"2ma": {} as BookDetail,
	"3ma": {} as BookDetail,
	"4ma": {} as BookDetail,
	"1es": {} as BookDetail,
	"2es": {} as BookDetail,
	man: {} as BookDetail,
	ps2: {} as BookDetail,
	oda: {} as BookDetail,
	pss: {} as BookDetail,
	eza: {} as BookDetail,
	"5ez": {} as BookDetail,
	"6ez": {} as BookDetail,
	dag: {} as BookDetail,
	ps3: {} as BookDetail,
	"2ba": {} as BookDetail,
	lba: {} as BookDetail,
	jub: {} as BookDetail,
	eno: {} as BookDetail,
	"1mq": {} as BookDetail,
	"2mq": {} as BookDetail,
	"3mq": {} as BookDetail,
	rep: {} as BookDetail,
	"4ba": {} as BookDetail,
	lao: {} as BookDetail,
} as const;

/**
 * [Lowercase Paratext ID](https://ubsicap.github.io/usfm/identification/books.html)
 */
export const bookIds = [
	"frt",
	"bak",
	"oth",
	"int",
	"cnc",
	"glo",
	"tdx",
	"ndx",
	...(Object.keys(bookDetails) as (keyof typeof bookDetails)[]),
] as const;
export type BookId = (typeof bookIds)[number];

/**
 * Eagerly match an English book name to an ID.
 *
 * @param eng English book name
 */
export function bookFromEnglish(eng: string): BookId {
	eng = eng.toLowerCase();
	const numeric = eng.replace(/\b(the|book|letter|of|Paul|to)\b|-/g, "");
	const norm = numeric
		.replace(
			/[0-9]|\b(ii|iii|iv|v|vi|first|second|third|fourth|fifth|sixth)\b/g,
			"",
		)
		.replace(/\s+/g, "");

	const found = (Object.keys(bookDetails) as BookId[]).find(
		(b) => b === numeric,
	);
	if (found) return found;

	if (norm.startsWith("gen")) return "gen";
	if (norm.startsWith("exo")) return "exo";
	if (norm.startsWith("lev")) return "lev";
	if (norm.startsWith("num")) return "num";
	if (norm.startsWith("deu")) return "deu";
	if (norm.startsWith("jos")) return "jos";
	if (norm.startsWith("judg")) return "jdg";
	if (norm.startsWith("rut")) return "rut";
	if (norm.startsWith("sa")) {
		if (includesNumber(numeric, 2)) return "2sa";
		return "1sa";
	}
	if (norm.startsWith("ki") || norm.startsWith("kg")) {
		if (includesNumber(numeric, 4)) return "2ch";
		if (includesNumber(numeric, 3)) return "1ch";
		if (includesNumber(numeric, 2)) return "2ki";
		return "1ki";
	}
	if (norm.startsWith("ch")) {
		if (includesNumber(numeric, 2)) return "2ch";
		return "1ch";
	}
	if (norm.startsWith("ezr")) return "ezr";
	if (norm.startsWith("neh")) return "neh";
	if (norm.startsWith("est")) return "est";
	if (norm.startsWith("job")) return "job";
	if (norm.startsWith("ps") && !norm.includes("solo")) {
		if (includesNumber(numeric, 3)) return "ps2";
		if (includesNumber(numeric, 2)) return "ps3";
		return "psa";
	}
	if (norm.startsWith("pr")) return "pro";
	if (norm.startsWith("ecc") || norm.startsWith("qoh")) return "ecc";
	if (
		(norm.startsWith("song") || norm.startsWith("cant")) &&
		!norm.includes("young")
	)
		return "sng";
	if (norm.startsWith("isa")) return "isa";
	if (norm.startsWith("jer") && !eng.includes("letter")) return "jer";
	if (norm.startsWith("lam")) return "lam";
	if (norm.startsWith("eze")) return "ezk";
	if (norm.startsWith("dan")) {
		if (norm.includes("g")) return "dag"; // daniel greek
		return "dan";
	}
	if (norm.startsWith("hos")) return "hos";
	if (norm.startsWith("joe")) return "jol";
	if (norm.startsWith("am")) return "amo";
	if (norm.startsWith("oba")) return "oba";
	if (norm.startsWith("jon")) return "jon";
	if (norm.startsWith("mic")) return "mic";
	if (norm.startsWith("na")) return "nam";
	if (norm.startsWith("hab")) return "hab";
	if (norm.startsWith("zep")) return "zep";
	if (norm.startsWith("hag")) return "hag";
	if (norm.startsWith("zec")) return "zec";
	if (norm.startsWith("mal")) return "mal";
	if (norm.startsWith("mat")) return "mat";
	if (norm.startsWith("mar")) return "mrk";
	if (norm.startsWith("luk")) return "luk";
	if (norm.startsWith("act")) return "act";
	if (norm.startsWith("rom")) return "rom";
	if (norm.startsWith("co")) {
		if (includesNumber(numeric, 2)) return "2co";
		if (includesNumber(numeric, 1)) return "1co";
	}
	if (norm.startsWith("gal")) return "gal";
	if (norm.startsWith("eph")) return "eph";
	if (norm.startsWith("philip")) return "php";
	if (norm.startsWith("co")) return "col";
	if (norm.startsWith("th")) {
		if (includesNumber(numeric, 2)) return "2th";
		return "1th";
	}
	if (norm.startsWith("tit")) return "tit";
	if (norm.startsWith("ti")) {
		if (includesNumber(numeric, 2)) return "2ti";
		return "1ti";
	}
	if (norm.startsWith("phile") || norm === "phlm") return "phm";
	if (norm.startsWith("heb")) return "heb";
	if (norm.startsWith("ja")) return "jas";
	if (norm.startsWith("pe")) {
		if (includesNumber(numeric, 2)) return "2pe";
		return "1pe";
	}
	if (norm.startsWith("jo") || norm.startsWith("jn") || norm.startsWith("jh")) {
		if (includesNumber(numeric, 3)) return "3jn";
		if (includesNumber(numeric, 2)) return "2jn";
		if (includesNumber(numeric, 1)) return "1jn";
		return "jhn";
	}
	if (norm.startsWith("jud")) return "jud";
	if (norm.startsWith("rev")) return "rev";
	// deuterocanonicals
	if (norm.startsWith("tob")) return "tob"; // tobit
	if (norm.startsWith("jdt") || norm.startsWith("judi")) return "jdt"; // judith
	if (norm.startsWith("est")) return "esg"; // esther greek
	if (norm.startsWith("wis")) return "wis"; // wisdom of solomon
	if (norm.startsWith("sir")) return "sir"; // sirach
	if (norm.includes("bar")) {
		if (includesNumber(numeric, 4)) return "4ba";
		if (includesNumber(numeric, 2)) return "2ba";
		if (eng.includes("letter")) return "lba"; // letter of baruch
		return "bar"; // baruch
	}
	if (norm.startsWith("jer")) return "lje"; // letter of jeremiah
	if (norm.startsWith("song")) return "s3y"; // Song of the 3 Young Men
	if (norm.startsWith("sus")) return "sus"; // Susanna
	if (norm.startsWith("bel")) return "bel"; // Bel and the Dragon
	if (norm.startsWith("ma")) {
		if (includesNumber(numeric, 4)) return "4ma"; // Maccabees
		if (includesNumber(numeric, 3)) return "3ma"; // Maccabees
		if (includesNumber(numeric, 2)) return "2ma"; // Maccabees
		return "1ma";
	}
	if (norm.startsWith("es")) {
		if (includesNumber(numeric, 2)) return "2es"; // Esdras (Greek)
		return "1es";
	}
	if (norm.startsWith("man")) return "man"; // Prayer of Manasseh
	if (norm.startsWith("oda") || norm.startsWith("ode")) return "oda"; // Odae/Odes
	if (norm.startsWith("ps")) return "pss"; // Psalms of Solomon
	if (norm.startsWith("ez")) {
		if (includesNumber(numeric, 6)) return "6ez";
		if (includesNumber(numeric, 5)) return "5ez";
		return "eza"; // Ezra Apocalypse
	}
	if (norm.startsWith("jub")) return "jub"; // Jubilees
	if (norm.startsWith("eno")) return "eno"; // Enoch
	if (norm.startsWith("me") || norm.startsWith("mq")) {
		if (includesNumber(numeric, 3)) return "3mq";
		if (includesNumber(numeric, 2)) return "2mq";
		return "1mq"; // Meqabyan/Mekabis
	}
	if (norm.startsWith("rep")) return "rep"; // Reproof
	if (norm.startsWith("lao")) return "lao"; // Letter to the Laodiceans

	throw Error(`Unknown book ${norm}`);
}

/** If the book is considered written after 20 AD. */
export function isNewTestament(book: BookId): boolean {
	switch (book) {
		case "mat":
		case "mrk":
		case "luk":
		case "act":
		case "rom":
		case "2co":
		case "1co":
		case "gal":
		case "eph":
		case "php":
		case "col":
		case "2th":
		case "1th":
		case "tit":
		case "2ti":
		case "1ti":
		case "phm":
		case "heb":
		case "jas":
		case "2pe":
		case "1pe":
		case "3jn":
		case "2jn":
		case "1jn":
		case "jhn":
		case "jud":
		case "rev":
			return true;
		default:
			return false;
	}
}

function romanize(n: number) {
	const lookup = {
		M: 1000,
		CM: 900,
		D: 500,
		CD: 400,
		C: 100,
		XC: 90,
		L: 50,
		XL: 40,
		X: 10,
		IX: 9,
		V: 5,
		IV: 4,
		I: 1,
	};
	let res = "";
	for (const [k, v] of Object.entries(lookup)) {
		while (n >= v) {
			res += k;
			n -= v;
		}
	}
	return res;
}

const ordinals = {
	1: "first",
	2: "second",
	3: "third",
	4: "fourth",
	5: "fifth",
	6: "sixth",
} as { [n: number]: string };

function includesNumber(s: string, n: number) {
	if (s.includes(n.toString())) return true;
	if (s.includes(romanize(n))) return true;
	if (ordinals[n] && s.includes(ordinals[n])) return true;

	return false;
}
