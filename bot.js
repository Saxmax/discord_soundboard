console.log("Setting up Din Mamma...");

const auth = require('./auth.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
// Sound clips.
// const soundDirLocal = '//192.168.13.21/www/html/ljud/';
const soundDirLocal = 'ljud/';
const soundDir = 'https://odi-audio.s3-eu-west-1.amazonaws.com/audio/';
var files = fs.readdirSync(soundDirLocal);
// Songs.
const songDirLocal = 'songs/';
const songDir = '//192.168.13.21/www/html/songs/';
var songs = fs.readdirSync(songDirLocal);

const specifics = {
	'32' : 'trettitvå',
	'33' : 'trettitre',
	'40': '40kmiljarder',
	'44': '44',
	'100': 'hundraprocent',
	'1337': '1337',
	'2000': '2000yearslater',
	'aa': 'aaa',
	'aaa': 'aadebra',
	'abc': 'alphabet',
	'achtung': 'achtung',
	'anyway': 'howsyoursexlife',
	'arg': 'ärduarg',
	'aznee': 'aznee',
	'badum': 'badumtsss',
	'bajl': 'bajl',
	'banjo' : 'banjo',
	'barnbacke': 'barnbacke',
	'betray': 'betrayme',
	'blais': 'blais',
	'blais2': 'blais2',
	'blajse': 'blajse',
	'bilen': 'bilenihövve',
	'boner': 'bonerblood',
	'boo': 'booyousuck',
	'borlänge': 'borlänge',
	'brb': 'illbeback',
	'brek': 'brekfucht',
	'brek2': 'brekfust',
	'britt': 'brittmarie',
	'britt2': 'komigenfan',
	'britt3': 'komigenmattson',
	'brown': 'codebrown',
	'brown2': 'codebrown2',
	'bye': 'bye',
	'bäver': 'dinjävlabäver',
	'can': 'opencan',
	'car': 'carkurage',
	'cares': 'whocares',
	'check': 'checkthestatistacs',
	'chewie': 'chewbaccaroar',
	'chicken': 'chicken',
	'chilla': 'chilla',
	'chilla2': 'chilla2',
	'china': 'china',
	'chip': 'chipchip',
	'chip1': 'chipchip1',
	'chip2': 'chipchip2',
	'chip3': 'chipchip3',
	'choklad': 'lilleshokoladegosse',
	'clap': 'golfclap',
	'coat': 'coated',
	'comments': 'stupidcomments',
	'creative': 'creative',
	'crickets' : 'crickets',
	'cry': 'cry',
	'deaf': 'deaf1',
	'deaf2': 'deaf2',
	'deez': 'deez-nuts',
	'didnot': 'ididnot',
	'didnot2': 'ididnothither',
	'dinmor': 'devadinmor',
	'done': 'done',
	'dontthink': 'noidonttinkså',
	'donttouch': 'donttouchmemf',
	'doin': 'howyoudoin',
	'dragon': 'dragonhawks',
	'druckit': 'druckitbärs',
	'dåligt': 'dåligt',
	'mamma': 'dinmamma',
	'matte': 'mattsonbrudda',
	'eh': 'ehhh',
	'eshg': 'eshg',
	'eshag': 'esh...ag',
	'exempel': 'exempel',
	'fam': 'internationalfam',
	'fantastic': 'fantastic',
	'feature': 'itsafeature',
	'fed': 'fedup',
	'fed2': 'ifedup',
	'few': 'inafewminutes',
	'finns': 'finnsdetkaffe',
	'fitt': 'fittigrille',
	'flytta': 'flyttapåbilfan',
	'flär': 'flarie',
	'friday': 'itsfriday',
	'friday2': 'itsfriday2',
	'fråga': 'vadskavidåfråga',
	'fuck': 'fuckoff',
	'första': 'första',
	'förstod': 'förstodinte',
	'förstod2': 'förstodinte2',
	'gandy': 'gandy',
	'gay': 'gaygaygay',
	'gayy': 'hagaay',
	'getting': 'imgetting',
	'ghetto': 'intheghetto',
	'ghetto2': 'intheghetto2',
	'gobble': 'gobble',
	'godis': 'geodis',
	'go': 'goaway',
	'gomorron': 'gomorrooon',
	'got': 'hagotemmm',
	'gott': 'detkanskelåtergott',
	'gotyour': 'gotyourmom',
	'gracias': 'gracias',
	'gott': 'gått',
	'haha': 'hahaha',
	'haha2': 'ahaha',
	'harfråga': 'harenfråga',
	'harm': 'harmonica',
	'harm2': 'harmonicaFull',
	'have': 'havesomecandy',
	'hej': 'hejsanmammaåpappa',
	'hello': 'hello',
	'help': 'help',
	'here': 'herewego',
	'heter': 'heterjagelnour',
	'hm': 'hm',
	'hi': 'hidoggie',
	'hihi': 'hihihi',
	'hoe': 'yourmomsahoe',
	'hot': 'hotfood',
	'hrrm': 'throat',
	'här': 'härkanmanva',
	'imorron': 'imrgonärdetfredag',
	'isak': 'isakadams',
	'ja': 'jadetkanhända',
	'jaja': 'jajaoscar',
	'jaja2': 'jajaoscar2',
	'jajamen': 'jajamensan',
	'japp': 'japp',
	'jelly': 'jellybeans',
	'jelly2': 'jellybeansoscar',
	'jerk': 'jerk',
	'job': 'givemejob',
	'katt': 'lillekatt',
	'katt2': 'lilleeeeeekaaaaatt',
	'keft': 'hållsåkeft',
	'keft2': 'hållsåkeftoscar',
	'keft3': 'hållsåkeftgråskinka',
	'kgandy': 'kgandy',
	'kill': 'killya',
	'kiosk': 'kioscar',
	'kossa': 'jävlakossa',
	'kul': 'jattekul',
	'kult': 'hadetsåkult',
	'kom': 'komhit',
	'kön': 'könsorgan',
	'kör': 'jagkör',
	'köra': 'körabil',
	'laugh': 'goofylaugh',
	'leet': 'leet',
	'letsgo': 'letsgoman',
	'listening': 'wasntlistening',
	'lol': 'laugh',
	'love': 'iloveyou',
	'look': 'lookatme',
	'luder': 'luder',
	'läget': 'laeget',
	'madafaka': 'madafaka',
	'matt': 'lillemattson',
	'matt2': 'lilleeeemattsoooon',
	'me': 'thatsme',
	'million': 'millionposes',
	'mkay': 'mkay',
	'mkt': 'väldigtmycketpengar',
	'more': 'morework',
	'mum': 'mum',
	'naej': 'naej',
	'naj': 'najjnajjnajj',
	'name': 'thisnamechristoffer',
	'name2' : 'thisnameoscar',
	'nasty': 'nasty',
	'ne': 'nee',
	'nej': 'nej',
	'nice': 'nice',
	'nä': 'nää',
	'nnä': 'nädededede',
	'no': 'no',
	'noo': 'nonono',
	'no!': 'isaidno',
	'not': 'nooot',
	'notgood': 'younotgood',
	'nothot': 'mansnothot',
	'och': 'och',
	'off': 'offigothen',
	'oh': 'himark',
	'oj': 'ojojoj',
	'ok': 'ok',
	'okay': 'ok1',
	'okej': 'mattsonokej',
	'omg': 'ohmygod',
	'ord': 'ingaord',
	'åkej': 'åååkej',
	'oscars': 'oscarsmamma',
	'penis': 'mypenis',
	'penis2': 'itsmypenis',
	'phew': 'pheeeeeeew',
	'phony': 'phony',
	'quick': 'quickmafs',
	'rain': 'isgonrain',
	'ready': 'readytowork',
	'rim': 'goodnightrimjob',
	'ringer': 'ringerdet',
	'ris': 'osåliteris',
	'run': 'corona_run',
	'röge': 'rökergott',
	'sa': 'saflickan',
	'sheeet': 'sheeet',
	'shopping': 'shopping',
	'skaur': 'skaurcream',
	'skriv': 'skrivpoe',
	'skrr': 'skrrpoppop',
	'sluta': 'slutauppmeddetdär',
	'sorry': 'sorry',
	'ssch': 'sschoscar',
	'staven': 'staveniröven',
	'sure': 'sure',
	'sygytt': 'sygytt',
	'then': 'andthen',
	'time': 'timemachine',
	'tjena': 'mattsontjena',
	'tjäna': 'tjaenna',
	'trevlig': 'trevligbradag',
	'trorinte': 'trorfaktisktintedet',
	'uckers': 'uckers',
	'vafan': 'vafantrordu',
	'vem': 'vemkör',
	'what': 'whatisit',
	'who': 'whosaidthat',
	'wiggle': 'wiggle',
	'winning': 'winning',
	'words': 'wordsmouth',
	'wow': 'wow',
	'yes': 'yes',
	'yippee': 'yippee',
	'ägd': 'dublevägd',
	'ägd2': 'ägd',
	// ------
	'jobbar': 'vadjobbardumed',
	'story': 'whatastorymark',
	'money': 'wheresthemoney',
	'vadnu': 'vadgörvinu',
	'vadsen': 'vadgörvisen',
	'woap': 'woap',
	'mother': 'youandyourmom',
	'yeah': 'yeahh',
	'youpo': 'youpornehhh'
};
const specificSong = {
	'banjo': 'duelingbanjos',
	'love': 'christofferloveyou',
	'jurassic': 'jurassic',
	'titanic': 'titanic'
};
const commands = {
	'stop': 'Stops the current clip or song from playing.'
};
var activeChannels = [];

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
////	client.setInterval(function(){ // Set interval for checking
//		var date = new Date(); // Create a Date object to find out what time it is
//			console.log("Checking time.. It's " + date.getHours().toString() + ":" + date.getMinutes().toString());
//			console.log(activeChannels);
//			if(date.getHours().toString() == "10" && date.getMinutes().toString() == "29"){ // Check the time
//				console.log("It IS 1337!");
//				for (var i = 0; i < activeChannels.length; i++) {
//					console.log(activeChannels[i]);
//					//activeChannels[i].play(soundDir + 'leet.mp3');
//				}
//				//const bc = client.voice.createBroadcast();
//				//bc.play(soundDir + 'leet.mp3');
//			}
//	}, 60000); // Repeat every 60000 milliseconds (1 minute)

	client.user.setActivity('your mom..', { type: 'WATCHING' });
});

client.on('message', async msg => {
	var con = msg.content.toLowerCase();

	// Sound clips.
	if(con.substr(0, 1) === "!") {
		var k = Object.keys(specifics);
		var wantedClip = con.substr(1, con.length - 1);

		// List all available clips.
		if(wantedClip == "list") {
			var _string = "\n";
			for(i = 0; i < k.length; i++) {
				_string += "!" + k[i] + "\n";
			}
			msg.reply(_string);
		}

		// Specific clip.
		if(specifics.hasOwnProperty(wantedClip)) {
			var finalClip = specifics[wantedClip];
			if(finalClip == 'throat') {
				finalClip += (msg.content.substr(1, 1) == "H") ? (Math.ceil(Math.random() * 2) + 7).toString() : weightedRandomThroat().toString();
				//finalClip += weightedRandomThroat().toString();
			}
			else if(finalClip == 'chipchip') {
				finalClip += (Math.floor(Math.random() * 3) + 1).toString();
			}
			else if(finalClip == 'och') {
				finalClip += (Math.floor(Math.random() * 4) + 1).toString();
			}
			else if(finalClip == 'laugh') {
				finalClip += (Math.floor(Math.random() * 3) + 1).toString();
			}
			else if(finalClip == 'cry') {
				finalClip += (Math.floor(Math.random() * 4) + 1).toString();
			}
			else if(finalClip == 'china') {
				finalClip += (Math.floor(Math.random() * 12) + 1).toString();
			}
			else if(finalClip == 'no') {
				finalClip += (Math.floor(Math.random() * 8) + 1).toString();
			}
			else if(finalClip == 'ok') {
				finalClip += (Math.floor(Math.random() * 3) + 1).toString();
			}
			else if(finalClip == 'mkay') {
				finalClip += (Math.floor(Math.random() * 6) + 1).toString();
			}
			else if(finalClip == 'madafaka') {
				finalClip += (Math.floor(Math.random() * 3) + 1).toString();
			}
			else if(finalClip == 'wow') {
				finalClip += (Math.floor(Math.random() * 5) + 1).toString();
			}
			else if(finalClip == 'sheeet') {
				finalClip += (Math.floor(Math.random() * 5) + 1).toString();
			}
			else if(finalClip == 'vemkör') {
				finalClip += (Math.floor(Math.random() * 2) + 1).toString();
			}
			else if(finalClip == 'nej') {
				finalClip += (Math.floor(Math.random() * 5) + 1).toString();
			}
			else if(finalClip == 'winning') {
				finalClip += (Math.floor(Math.random() * 6) + 1).toString();
			}
			else if(finalClip == 'exempel') {
				finalClip += (Math.floor(Math.random() * 2) + 1).toString();
			}
			if (msg.member.voice.channel) {
				const connection = await msg.member.voice.channel.join();
				connection.play(soundDirLocal + finalClip + '.mp3');
				if(!activeChannels.includes(msg.member.voice.channel.guild)) {
					activeChannels.push(msg.member.voice.channel.guild);
				}
			}
		}
	}
	else if(con.substr(0, 1) === "&") {
		var k = Object.keys(specificSong);
		var wantedClip = con.substr(1, con.length - 1);

		// List all available clips.
		if(wantedClip == "list") {
			var _string = "\n";
			for(i = 0; i < k.length; i++) {
				_string += "&" + k[i] + "\n";
			}
			msg.reply(_string);
		}

		// Specific song.
		if(specificSong.hasOwnProperty(wantedClip)) {
			var finalClip = specificSong[wantedClip];
			if (msg.member.voice.channel) {
				const connection = await msg.member.voice.channel.join();
				connection.play(songDirLocal + finalClip + '.mp3', { volume: 0.4 });
				if(!activeChannels.includes(msg.member.voice.channel.guild)) {
					activeChannels.push(msg.member.voice.channel.guild);
				}
			}
		}
	}
	else if(con.substr(0, 1) === ".") {
		var k = Object.keys(commands);
		var kv = Object.values(commands);
		var wantedCommand = con.substr(1, con.length - 1);

		// List all available commands.
		if(wantedCommand == "list") {
			var _string = "\n";
			for(i = 0; i < k.length; i++) {
				_string += "." + k[i] + " -> " + kv[i] + "\n";
			}
			msg.reply(_string);
		}

		// Specific command.
		if(commands.hasOwnProperty(wantedCommand)) {
			var _com = commands[wantedCommand];
			if(_com == 'stop') {
				if(msg.member.voice.channel) {
					const connection = await msg.member.voice.channel.join();
					connection.dispatcher.pause();
				}
			}
		}
	}
	// Randomize clip from ALL.
	else if(con === 'r' || con === 'random' || con === 'rand' || con === '!r') {
		if (msg.member.voice.channel) {
			const connection = await msg.member.voice.channel.join();
			let chosenFile = files[Math.floor(Math.random() * files.length)];
			const dispatcher = connection.play(soundDirLocal + chosenFile);
		}
	}
});

//var throatChance = {
	//1: 30,
	//2: 30,
	//3: 30,
	//4: 20,
	//5: 20,
	//6: 20,
	//7: 10,
	//8: 10,
	//9: 10
//};
var throatChance = [30, 30, 30, 20, 20, 20, 10, 10, 10];
function weightedRandomThroat() {
	// Let's first find our maximum cumulative value.
	var maxValue = 0;
	for(var t = 0; t < throatChance.length; t++) {
		maxValue += throatChance[t];
	}
	//for(var p in throatChance) {
		//maxValue += throatChance[p];
	//}

	// Now let's get a pseudo-random number.
	var rnd = Math.floor(Math.random() * maxValue);
	var cumulative = 0;
	for(var i = 1; i <= throatChance.length; i++) {
		cumulative += throatChance[i - 1];
		if(rnd < cumulative) {
			return Math.min(i, throatChance.length);
		}
	}
	return throatChance.length;
	//var i = 1;
	//for(var p in throatChance) {
		//cumulative += throatChance[p];
		//if(rnd < cumulative) {
			//return Math.min(i, throatChance.length);
		//} else {
			//i++;
		//}
	//}
};

client.login(auth.token);