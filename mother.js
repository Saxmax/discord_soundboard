const {
  Client,
  Events,
  GatewayIntentBits,
  Guild,
  ChannelType,
  ComponentAssertions,
} = require("discord.js");
const { token, sudo } = require("./auth.json");
const Voice = require("@discordjs/voice");

const fs = require("fs");
const Paths = {
  Clips: "./clips.json",
  Songs: "./songs.json",
  ClipFolder: "ljud",
  SongFolder: "songs",
};
let Clips = require(Paths.Clips);
let Songs = require(Paths.Songs);
let clipFiles = fs.readdirSync(Paths.ClipFolder);
let songFiles = fs.readdirSync(Paths.SongFolder);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

console.log("Setting up Din Mamma...");
client.once(Events.ClientReady, (c) => {
  audioPlayer = Voice.createAudioPlayer();

  console.log(`Logged in as ${c.user.tag}!`);

  // Monitor files and folders for changes.
  // fs.watchFile(Paths.ClipFolder, (a, b) => {
  // 	console.log("Change detected in Clip folder.");
  // 	delete require.cache[require.resolve(Paths.ClipFolder)];
  // 	clipFiles = fs.readdirSync(Paths.ClipFolder);
  // });
  // fs.watchFile(Paths.SongFolder, (a, b) => {
  // 	console.log("Change detected in Song folder.");
  // });
  fs.watchFile(Paths.Clips, (a, b) => {
    console.log("Change detected in Clips file.");
    delete require.cache[require.resolve(Paths.Clips)];
    Clips = require(Paths.Clips);
  });
  fs.watchFile(Paths.Songs, (a, b) => {
    console.log("Change detected in Songs file.");
    delete require.cache[require.resolve(Paths.Songs)];
    Songs = require(Paths.Songs);
  });
});

// Listen for messages from users.
client.on(Events.MessageCreate, async (msg) => {
  let content = msg.content.toLowerCase();

  // Check if we are even interested in the message.
  let commandType = getCommandType(content);
  if (commandType == CommandType.None) return;

  // Find which audio file to play.
  let desiredAudio = null;
  switch (commandType) {
    case CommandType.Random:
      desiredAudio = getRandomClip();
      break;
    case CommandType.Clip:
      desiredAudio = getSpecificClip(content);
      break;
    case CommandType.Song:
      desiredAudio = getSong(content);
      break;
    case CommandType.List:
      return showCommands(msg);
    case CommandType.Sudo:
      return handleSudo(msg, content);
    default:
      return console.log("Unknown command type: " + commandType);
  }

  if (desiredAudio == null) {
    return;
  }

  let resource = getAudioResource(desiredAudio, commandType);
  if (!resource) {
    return console.log("Could not find resource: " + resource);
  }

  // We can finally connect to the channel and play the audio.
  let channel = msg.member.voice.channel;
  let connection = connectToChannel(channel);
  connection.subscribe(audioPlayer);

  playAudioResource(connection, resource);
});

client.login(token);

// Variables.
const MessageMaxCount = 2000;
let audioPlayer;
let allClips = new Map();
let allSongs = new Map();
let allConnections = [];
const CommandType = {
  None: 0,
  Random: 1,
  Clip: 2,
  Song: 3,
  List: 4,
  Sudo: 5,
};
const Prefix = {
  Clip: "!",
  Song: "&",
  Random: "r",
  Sudo: "$",
};
const SudoCommands = {
  Exit: "exit",
  Disconnect: "dc",
};

// Functions.
const loadAudioFiles = function () {
  // Not used anymore. Better loading audio while playing.
  clipFiles.forEach((c) => {
    let name = c.slice(0, c.length - 4);
    allClips.set(name, Voice.createAudioResource(c));
  });
  songFiles.forEach((s) => {
    let name = s.slice(0, s.length - 4);
    allSongs.set(name, Voice.createAudioResource(s));
  });
  console.log("Loaded all files.");
};

const getRandomClip = function () {
  let clipName = clipFiles[Math.floor(Math.random() * clipFiles.length)];
  clipName = clipName.slice(0, clipName.length - 4);
  return clipName;
};

const getSpecificClip = function (msg) {
  let clipName = msg.slice(1);
  return Clips[clipName] !== undefined ? clipName : null;
};

const getSong = function (msg) {
  let songName = msg.slice(1);
  return Songs[songName] !== undefined ? songName : null;
};

const getAudioResource = function (name, type) {
  let fileName;
  let data;
  if (type == CommandType.Random) {
    data = name;
  } else {
    data =
      type == CommandType.Song
        ? Songs[name.toString()]
        : Clips[name.toString()];
  }
  if (Array.isArray(data)) {
    fileName = data[Math.floor(Math.random() * data.length)];
  } else {
    fileName = data;
  }

  let path = getAudioPath(fileName, type == CommandType.Song);
  return Voice.createAudioResource(path);
};

const getAudioPath = function (fileName, isSong) {
  return (
    __dirname +
    "/" +
    (isSong ? Paths.SongFolder : Paths.ClipFolder) +
    "/" +
    fileName +
    ".mp3"
  );
};

const playAudioResource = function (connection, resource) {
  audioPlayer.play(resource);
  connection.subscribe(audioPlayer);
};

const showCommands = function (msg) {
  let keys = Object.keys(Clips);
  let initial =
    "These clips are available, using '!_clipname_' to play them:\n";
  let messages = [];
  let s = "";
  for (let i = 0; i < keys.length; i++) {
    if (i == 0) {
      s = initial;
    }
    let desired = keys[i] + ", ";
    if ((s + desired).length >= MessageMaxCount) {
      messages.push(s);
      s = "";
    } else {
      s += desired;
    }
  }
  s = s.slice(0, s.length - 2);
  messages.push(s);
  for (let m = 0; m < messages.length; m++) {
    msg.author.send(messages[m]);
  }
};

const connectToChannel = function (channel) {
  const connection = Voice.joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
    selfDeaf: false,
  });
  if (!allConnections.includes(connection)) {
    allConnections.push(connection);
  }
  return connection;
};

const getCommandType = function (msg) {
  switch (msg[0]) {
    case Prefix.Clip:
      if (msg.length <= 1) {
        return CommandType.None;
      }
      return msg.slice(1, 5) == "list" ? CommandType.List : CommandType.Clip;
    case Prefix.Song:
      return msg.length > 1 ? CommandType.Song : CommandType.None;
    case Prefix.Random:
      return msg.length == 1 ? CommandType.Random : CommandType.None;
    case Prefix.Sudo:
      return msg.length > 1 ? CommandType.Sudo : CommandType.None;
    default:
      return CommandType.None;
  }
};

const handleSudo = function (msg, content) {
  const isSudoUser = verifySudo(msg.author);
  console.log(msg);

  if (!isSudoUser) {
    console.log(`User ${msg.author.username} attempted sudo commands.`);
    return;
  }

  const command = getSudoCommand(content);
  if (!command) return;

  performSudo(command);
};

const verifySudo = function (author) {
  if (!sudo || !Array.isArray(sudo) || !sudo.length) return;

  const username = author.username;
  const userId = author.id;

  for (let i = 0; i < sudo.length; i++) {
    const sudoUser = sudo[i];
    if (sudoUser.id == userId && sudoUser.username == username) {
      return true;
    }
  }

  return false;
};

const getSudoCommand = function (msg) {
  const command = msg.slice(1);
  values = Object.values(SudoCommands);
  for (let v = 0; v < values.length; v++) {
    if (values[v] == command) {
      return command;
    }
  }
  return false;
};

const performSudo = function (command) {
  switch (command) {
    case SudoCommands.Exit:
      sudoExit();
      break;
    case SudoCommands.Disconnect:
      sudoDisconnect();
      break;
  }
};

const sudoExit = function () {
  disconnectVoiceChannels();
  process.exit(0);
};

const sudoDisconnect = function () {
  disconnectVoiceChannels();
};

const disconnectVoiceChannels = function () {
  if (allConnections.length) {
    for (let i = 0; i < allConnections.length; i++) {
      allConnections[i].destroy();
    }
  }
};
