class omikujiObject {
	constructor(unseiImg, unsei, explanation, luckyLanguage, luckyDatabase, luckyEditor) {
		this.unseiImg = unseiImg;
		this.unsei = unsei;
		this.explanation = explanation;
		this.luckyLanguage = luckyLanguage;
		this.luckyDatabase = luckyDatabase;
		this.luckyEditor = luckyEditor;
	}
}

class God {
	static unseiImgDictionary = {
		"大吉": "img/daikiti.png",
		"凶": "img/kyou.png"
	}

	static unseiList = [
		"大吉",
		"凶",
	]

	static explanationDictionary = {
		"大吉": ["comment1", "comment2"],
		"凶": ["comment3", "comment4"]
	}

	static luckyLanguageList = [
		"C",
		"Jave",
		"Python",
		"Ruby"
	]
	
	static luckyDatabaseList = [
		"MySQL",
		"PostgreSQL"
	]
	
	static luckyEditorList = [
		"Atom",
		"VSCode"
	]
	
	static generateOmikuji(num) {
		let omikujiList = [];

		for (let i = 0; i < num; i++) {
			let unsei = this.unseiList[getRandomInt(this.unseiList.length)];
			let unseiImg = this.unseiImgDictionary[unsei];
			let explanation = this.explanationDictionary[unsei][getRandomInt(this.explanationDictionary[unsei].length)];
			let luckyLanguage = this.luckyLanguageList[getRandomInt(this.luckyLanguageList.length)];
			let luckyDatabase = this.luckyDatabaseList[getRandomInt(this.luckyDatabaseList.length)];
			let luckyEditor = this.luckyEditorList[getRandomInt(this.luckyEditorList.length)];

			let omikuji = new omikujiObject(unseiImg, unsei, explanation, luckyLanguage, luckyDatabase, luckyEditor);
			omikujiList.push(omikuji);
		}

		return omikujiList
	}
}

const omikujiList = God.generateOmikuji(10);

class Worshiper {
	static drawOmikuji() {
		let omikuji = omikujiList[getRandomInt(omikujiList.length)];

		let unseiImg = document.getElementById("unsei_img");
		unseiImg.src = omikuji.unseiImg;

		let unnsei = document.getElementById("unsei");
		unnsei.innerHTML = omikuji.unsei;

		let explanation = document.getElementById("explanation");
		explanation.innerHTML = omikuji.explanation;

		let luckyLanguage = document.getElementById("lucky_language");
		luckyLanguage.innerHTML = omikuji.luckyLanguage;

		let luckyDatabase = document.getElementById("lucky_database");
		luckyDatabase.innerHTML = omikuji.luckyDatabase;

		let luckyEditor = document.getElementById("lucky_editor");
		luckyEditor.innerHTML = omikuji.luckyEditor;
	}
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

class Screen {
	#init;
	#loading;
	#result;

	constructor() {
		this.#init = document.getElementById('init');
		this.#loading = document.getElementById('loading');
		this.#result = document.getElementById('result');
	}

	isDisplayedInitScreen() {
		return !this.#init.classList.contains("d-none");
	}

	toLoadingScreen() {
		this.#init.classList.add("d-none");
		this.#loading.classList.remove("d-none");
	}

	toInitialScreen() {
		this.#init.classList.remove("d-none");
		this.#result.classList.add("d-none");
	}

	toResultScreen() {
		this.#loading.classList.add("d-none");
		this.#result.classList.remove("d-none");
	}

	resetScreen() {
		this.#result.scrollTop = 0;
	}
}

const sleep = ms => new Promise(res => setTimeout(res, ms));

async function buttonOnClick() {
	screen = new Screen();
	if(screen.isDisplayedInitScreen()){
		screen.toLoadingScreen();
		Worshiper.drawOmikuji();
		await sleep(3000);
		screen.toResultScreen();
	} else {
		screen.resetScreen();
		screen.toInitialScreen();
	}
}

const startButton = document.getElementById('start');
startButton.addEventListener("click", buttonOnClick);

const restartButton = document.getElementById('restart');
restartButton.addEventListener("click", buttonOnClick);
