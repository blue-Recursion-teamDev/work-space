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

function sleep(waitSec, callbackFunc) {
    var spanedSec = 0;
    var id = setInterval(function () {
        spanedSec++;
        if (spanedSec >= waitSec) {
            clearInterval(id);
            if (callbackFunc) callbackFunc();
        }
    }, 1000);
}

function to_result_screen(){
    let init = document.getElementById('init');
    let loading = document.getElementById('loading');
    let result = document.getElementById('result');
    init.classList.add("d-none");
    loading.classList.remove("d-none")

    Worshiper.drawOmikuji();

    sleep(3, function(){
        loading.classList.add("d-none");
        result.classList.remove("d-none")  
    })
}

function to_initial_screen(){
    let init = document.getElementById('init');
    let result = document.getElementById('result');
    init.classList.remove("d-none");
    result.classList.add("d-none")
}

let start_button = document.getElementById('start');
start_button.onclick = to_result_screen;

let restart_button = document.getElementById('restart');
restart_button.onclick = to_initial_screen;
