const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const soundDir = '//192.168.13.21/www/html/ljud/';
var files = fs.readdirSync(soundDir);

const specifics = {
	'1337': '1337',
	'40': '40kmiljarder',
	'aa': 'aaa',
	'aaa': 'aadebra',
	'anyway': 'howsyoursexlife',
	'badum': 'badumtsss',
	'bajl': 'bajl',
	'blais': 'blais',
	'bilen': 'bilenihövve',
	'boo': 'booyousuck',
	'brek': 'brekfucht',
	'britt': 'brittmarie',
	'bye': 'bye',
	'car': 'carkurage',
	'clap': 'golfclap',
	'cry': 'cry',
	'deez': 'deez-nuts',
	'donttouch': 'donttouchmemf',
	'dåligt': 'dåligt',
	'mamma': 'dinmamma',
	'eshg': 'eshg',
	'eshag': 'esh...ag',
	'fantastic': 'fantastic',
	'few': 'inafewminutes',
	'flär': 'flarie',
	'friday': 'itsfriday',
	'fråga': 'vadskavidåfråga',
	'gandy': 'gandy',
	'gay': 'hagaay',
	'godis': 'geodis',
	'go': 'goaway',
	'gott': 'detkanskelåtergott',
	'gracias': 'gracias',
	'hakult': 'hadetsåkult',
	'haha': 'hahaha',
	'harm': 'harmonica',
	'harm2': 'harmonicaFull',
	'have': 'havesomecandy',
	'hej': 'hejsanmammaåpappa',
	'hello': 'hello',
	'heter': 'heterjagelnour',
	'hi': 'hidoggie',
	'hoe': 'yourmomsahoe',
	'hrrm': 'throat',
	'isak': 'isakadams',
	'japp': 'japp',
	'job': 'givemejob',
	'kgandy': 'kgandy',
	'kul': 'jattekul',
	'kom': 'komhit',
	'leet': 'leet',
	'love': 'iloveyou',
	'läget': 'laeget',
	'katt': 'lillekatt',
	'katt2': 'lilleeeeeekaaaaatt',
	'kill': 'killya',
	'me': 'thatsme',
	'mkt': 'väldigtmycketpengar',
	'naj': 'najjnajjnajj',
	'name': 'thisnamechristoffer',
	'ne': 'nee',
	'nä': 'nää',
	'nnä': 'nädededede',
	'no': 'noidonttinkså',
	'not': 'nooot',
	'oj': 'ojojoj',
	'oscars': 'oscarsmamma',
	'phew': 'pheeeeeeew',
	'rain': 'isgonrain',
	'ris': 'osåliteris',
	'run': 'corona_run',
	'sa': 'saflickan',
	'skriv': 'skrivpoe',
	'sluta': 'slutauppmeddetdär',
	'sorry': 'sorry',
	'sygytt': 'sygytt',
	'tjena': 'tjaenna',
	'trevlig': 'trevligbradag',
	'trorinte': 'trorfaktisktintedet',
	'jobbar': 'vadjobbardumed',
	'story': 'whatastorymark',
	'money': 'wheresthemoney',
	'vadnu': 'vadgörvinu',
	'vadsen': 'vadgörvisen',
	'woap': 'woap',
	'mother': 'youandyourmom',
	'youpo': 'youpornehhh'
};

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.setInterval(function(){ // Set interval for checking
		var date = new Date(); // Create a Date object to find out what time it is
			if(date.getHours() === 13 && date.getMinutes() === 37){ // Check the time
				const bc = client.voice.createBroadcast();
				bc.play(soundDir + 'leet.mp3');
			}
	}, 60000); // Repeat every 60000 milliseconds (1 minute)

	client.user.setActivity('your mom..', { type: 'WATCHING' });
});

client.on('message', async msg => {
	var con = msg.content.toLowerCase();
	if(con.substr(0, 1) === "!") {
		var k = Object.keys(specifics);

		// List all available clips.
		if(con == "!list") {
			var _string = "\n";
			for(i = 0; i < k.length; i++) {
				_string += "!" + k[i] + "\n";
			}
			msg.reply(_string);
		}

		// Specific clip.
		var wantedClip = con.substr(1, con.length - 1);
		if(specifics.hasOwnProperty(wantedClip)) {
			var finalClip = specifics[wantedClip];
			if(finalClip == 'throat') {
				finalClip += weightedRandomThroat().toString();
				//finalClip += (Math.floor(Math.random() * 9) + 1).toString();
			}
			if (msg.member.voice.channel) {
				const connection = await msg.member.voice.channel.join();
				connection.play(soundDir + finalClip + '.mp3');
			}
		}
	}
	// Randomize clip from ALL.
	else if(con === 'r' || con === 'random' || con === 'rand') {
		if (msg.member.voice.channel) {
			const connection = await msg.member.voice.channel.join();
			let chosenFile = files[Math.floor(Math.random() * files.length)];
			const dispatcher = connection.play(soundDir + chosenFile);
		}
	}
});

var throatChance = [30, 30, 30, 20, 20, 20, 10, 10, 10];
function weightedRandomThroat() {
	// Let's first find our maximum cumulative value.
	var maxValue = 0;
	for(var t = 0; t < throatChance.length; t++) {
		maxValue += throatChance[t];
	}

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
};

client.login('insert_token_here');