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
		"大吉": "img/daikiti_ooyorokobi.png",
		"吉": "img/kiti.png",
		"中吉": "img/chukichi.png",
		"小吉": "img/shokichi.png",
		"末吉": "img/suekiti.png",
		"凶": "img/kyou.png"
	}

	static unseiList = [
		"大吉",
		"吉",
		"中吉",
		"小吉",
		"末吉",
		"凶",
	]

	static explanationDictionary = {
		"大吉": ["GitHub Sponsors を通じて太っ腹なスポンサーがつきます。これであなたの OSS 開発は安泰です!!", "リリースしたソフトウェアにバグが見つかりますが、再現性が低いためユーザーも上司も誰ひとり気付かないでしょう。見なかったことにするのが吉。"],
		"吉":["リファクタリングに成功してプログラムが爆速に!!サクサク動いて気持ちいいーーー!!", "リリースしたソフトウェアにバグが見つかりますが、幸いユーザー企業のお偉方は極度のITオンチです。仕様で押し通すのが吉。"],
		"中吉":["リリースしたソフトウェアに深刻なバグが見つかりますが、口八丁な営業のお陰で事無きを得るでしょう。ただし、後日それを理由に無茶振りされるおそれがあるので油断は禁物です。", "git でコンフリクトが発生します!! が、今回は上手く解消できるでしょう。今回は・・"],
		"小吉":["開発の要件定義が綿飴のようにふわっふわです。手遅れにならないうちに手を打っておくのが吉。", "リリース前のソフトウェアにバグが見つかります。貴方のお勤め先が上流の企業ならばそれほど大きな問題にはなりませんが、三次請けよりも下流の場合はご愁傷様でございます。"],
		"末吉": ["関わっているプロジェクトから何だか香ばしい匂いがします。炎上する前になんとか逃げるのが吉。", "リリース直前に致命的なバグが見つかるでしょう。お泊まりの準備をして出社するのが吉。"],
		"凶": ["リリースしたソフトウェアに致命的な欠陥が見つかり、それが原因で顧客の機密情報が派手に流出します。仕様で押し通すにはいささか無理がありますので、潔く腹をくくりましょう。", "前任者から引き継いだコードがスパゲティ状態です。残念ながらあなたの力ではどうにもならないので、せめて自分はこんなコードを書かないように今後の糧にしましょう。"]
	}

	static luckyLanguageList = [
		"C",
		"C++",
		"C♯",
		"Java",
		"JavaScript",
		"PHP",
		"Python",
		"Ruby",
		"TypeScript"
	]
	
	static luckyDatabaseList = [
		"MySQL",
		"Oracle Database",
		"PostgreSQL"
	]
	
	static luckyEditorList = [
		"Atom",
		"Emacs",
		"nano",
		"Vim",
		"Visual Studio Code"
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

const omikujiList = God.generateOmikuji(30);

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

class Cookie {

	static getElement(element) {	
		let cookies = document.cookie;
		let cookiesArray = cookies.split("; ");	
		for (let cookie of cookiesArray) {
			let cookieArray = cookie.split('=');
			if (cookieArray[0] == element) {
				return cookieArray[1];
			}
		}
		return ""
	}

	static deleteElement(element) {
		document.cookie = element + '=; max-age=0;';
	}

	static addElement(element, value) {
		document.cookie = element + "=" + value;
	}
}

const sleep = ms => new Promise(res => setTimeout(res, ms));

async function buttonOnClick() {
	let userName = Cookie.getElement("userName");
	if (userName == "") userName = document.getElementById("inputUserName").value;
	if (userName == "") window.alert("名前を入力してください");
	else {
		screen = new Screen();
		if(screen.isDisplayedInitScreen()){
			screen.toLoadingScreen();
			Worshiper.drawOmikuji();
			const unsei = document.getElementById("unsei").innerHTML;
			Cookie.addElement("userName", userName);
			Cookie.addElement("unsei", unsei);
			await sleep(3000);
			screen.toResultScreen();
		} else {
			let nameForm = document.getElementById("nameForm");
			let displayUserName = document.getElementById("displayUserName");

			nameForm.classList.add("d-none");
			unsei = Cookie.getElement("unsei");
			displayUserName.innerHTML = "前回の" + userName + "さんの運勢 : " + unsei;
			screen.resetScreen();
			screen.toInitialScreen();
		}
	}
}

const startButton = document.getElementById('start');
startButton.addEventListener("click", buttonOnClick);

const restartButton = document.getElementById('restart');
restartButton.addEventListener("click", buttonOnClick);

let cookies = document.cookie;
// console.log(cookies);
userName = Cookie.getElement("userName");
unsei = Cookie.getElement("unsei");
if (userName != "" && unsei != "") {
	let nameForm = document.getElementById("nameForm");
	let displayUserName = document.getElementById("displayUserName");
	nameForm.classList.add("d-none");
	displayUserName.innerHTML = "前回の" + userName + "さんの運勢 : " + unsei;
}

// Cookie.deleteElement("userName");
// Cookie.deleteElement("unsei");