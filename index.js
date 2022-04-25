const Discord = require("discord.js");
const config = require("./config.json");
const editJsonFile = require("edit-json-file");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const moment = require('moment');
const fs = require("fs");
const TOKEN = config.token;
const prefix = config.prefix;
const doc = new GoogleSpreadsheet(`19Cj5BDGIBh620ttwgO5_918zEEAoJkMSgSQ3JuQ8QPc`);
var poly = new Discord.Client;
const events = require("./scheduled_events.json");
const reg = "POLYGON Clans";
const orange = "#FFA833";
const statSheet = "[STATS](https://docs.google.com/spreadsheets/d/19Cj5BDGIBh620ttwgO5_918zEEAoJkMSgSQ3JuQ8QPc/edit#gid=0)";
doc.useApiKey(`AIzaSyCOzt3jPH6iL1mBF829ENPEE4-dBzqrIGc`);
poly.deaths = require("./deaths.json");
poly.kills = require("./kills.json");
poly.kd = require("./kd.json");
poly.score = require("./score.json");
poly.sEvents = require("./scheduled_events.json");
const xp = require("./database.json");
const mysql = require("mysql");
const arraySort = require("array-sort");
const table = require("table");
var connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "POLY420",
    database: "POLYGON_EVENTS"
});

//connection.connect(function(err) {
   // if (err) throw err;
//})

/* UPCOMING COMMANDS
leaderboard {
  most kills, highest death, etc.
}

*/
const getAllDirFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllDirFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(file)
    }
  })

  return arrayOfFiles
}
var v = "";
let inTeams = false;
let tN = "";
let status = false
async function isID(input) {
  if (input.length === 22 && input.includes("<@!")) type = "fullAT";
  else if (input.includes("#") && input.substring(input.length-4, input.length)) type = "tag";
  else if (input.length === 18) type = "plainID";
}
async function checkTeams(input) {
  let teamFolder = "./teams/";
      var files = getAllDirFiles(teamFolder);
      //console.log(files);
      for (i = 0; i < files.length; i++)
      {
        var f = JSON.parse(fs.readFileSync(`./teams/${files[i]}`, "utf8"));
        //console.log(f);
        if (f.Name.toLowerCase().includes(input.toLowerCase()))
        {
           inTeams = true;
           v = `./teams/${files[i]}`;
           //console.log(v);
           tN =  f.Name;
           //if (inTeams === true) console.log(`TEAM: ${f.Name}`);
        }
      }




  status = true;


  await status;
}

var inList = false;
var listName = "";
var stat = false;
async function checkList(input) {

    var teamList = "./teams.json";
    var f = JSON.parse(fs.readFileSync(teamList, "utf8"));
    for (i = 0; i < f.Teams.length; i++)
    {
      if (f.Teams[i].toLowerCase().includes(input.toLowerCase()))
      {
        inList = true;
        listName = f.Teams[i];
      }
    }
    stat = true;
    await stat;
  }

var adminArray = [];
function findAdmins(guild) {
  var mArray = guild.members.cache.array();
  for (var i = 0; i < mArray.length; i++) {
    if (mArray[i].hasPermission("ADMINISTRATOR")) adminArray.push(mArray[i]);
  }
}


async function load() {
    await doc.loadInfo();
    console.log("114+"+doc.title);
    console.log("114+COMMANDS");
    //console.log("114+TOP3");
}
function sendFailEmbed(err) {
    var fail = new Discord.MessageEmbed()
    .setTitle("SENDING FAILED")
    .setDescription("The sending of the embed failed!")
    .addField("ERROR", err)
    .setColor("#FF3F3F")
    .setFooter(reg, poly.user.avatarURL())
    .setTimestamp()
    .setThumbnail(poly.user.avatarURL());
    message.channel.send(fail);
};

function updateXP(plr, xpAM) {

};

poly.on("ready", function() {
    poly.user.setPresence({ activity: {name: `$commands | ${poly.guilds.cache.get("948687152227700776").memberCount} members`}, status: `online`});
    console.log("LAUNCHED @POLYGON_EVENTS");
    load();

});


poly.on("guildMemberAdd", member => {
    //member.roles.add(`698598958909358223`);
    poly.user.setPresence({ activity: {name: `Monitoring ${member.guild.memberCount-1} people !commands`}, status: `online`});

});

poly.on("message", async message => {
  /*
    let levelChannel = message.guild.channels.cache.find(ch => ch.name === `general`);
    let newXp = Math.floor(Math.random() * 10)+50;
    console.log(`${message.author.id} : ${newXp}`);
    if (!xp[message.author.id]) {
        xp[message.author.id] = {
            xp: 0,
            level: 1
        }
    }
    else
    {
    let currentXp = xp[message.author.id].xp;
    let currentLevel = xp[message.author.id].level;

    currentXp += newXp;

    let nextLevel = 5000 * Math.round(currentLevel * (currentLevel+1) /2);

    if (nextLevel <= xp[message.author.id].xp) {
        xp[message.author.id].level += 1;

        levelChannel.send(`${message.author} advanced to ${currentLevel}, good stuff!`);
    }

    xp[message.author.id] = {
        xp: currentXp,
        level: currentLevel
    };
    }

    fs.writeFile("./database.json", JSON.stringify(xp[message.author.id], null, 2), (err) => {
        if (err) throw (err);
    });
*/


    //if (message.content == "river") message.reply(" oh, Mr. moderator :space_invader:");
    //if (message.content == "pardon") message.channel.send("?????????????");
    //if (message.content == "gay") message.reply(" no River is");
    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");
    var postTo = poly.channels.cache.get("965792007886897192");
    switch (args[0].toLowerCase()) {
        /*case "level":
            var target = null;
            var isDiff = false;
            if (message.mentions.members.first() != null)
            {
                target = message.mentions.members.first().user;
                isDiff = true;

            }
            else
            {
                target = message.author;
            }
            var levelEmbed = new Discord.MessageEmbed()
            .setThumbnail(target.avatarURL())
            .setTitle(`${target.username}'s Level Data`)
            .setFooter(reg, target.avatarURL())
            .addField("LEVEL", currentLevel)
            .addField("XP", currentXp)
            .addField("XP UNTIL LEVEL UP", (currentLevel*561) - currentXp)
            .setTimestamp()
            .setColor(orange);
            message.channel.send(levelEmbed);
            break;*/
        /*case "kills":
            const sheet = doc.sheetsByIndex[0];
            doc.loadCells();
            sheet.loadCells();
            var num = 0;
            if (args[1] == "bohmear")
            {
                num = 2;
                message.reply("bohmear has "+sheet.getCell(2, 2)+" kills");
            }
            break;*/
        case "botoperator":
          var botEmbed = new Discord.MessageEmbed()
          .setTitle("Full Shortened CMD Explanations")
          .setColor(orange)
          .setTimestamp()
          .addField("purge", "$purge <messages to delete>")
          .addField("poll", "$poll <emoji1> <choice1> <emoji2> <choice2>")
          .addField("seriesdisplay", "$seriesdisplay <best of number> | Displays the games of a series")
          .setFooter("* - new command; use with caution.")
          .addField("seriesmatch", "$seriesmatch <game #> <Winner> <loser> <map> <winner score> <loser score> <ruleset> <scoreboard> <mvp> | Adds a new game to the series list")
          .addField("seriesclear", "$seriesclear | Clears all games in the series.")
          .addField("matchcomplete", "$matchcomplete <winner> <loser> <winner score> <loser score> <map> <ruleset> <scoreboard link>");
          message.channel.send(botEmbed);
          break;
        case "commands":
            var cmdEmbed = new Discord.MessageEmbed()
                .setTitle("POLYGON Clans Commands")
                .setColor("#AFFF33")
                .setFooter(reg, message.author.avatarURL())
                .setDescription("userinfo\nserverinfo\ninvites\ninfo")

            message.channel.send(cmdEmbed);
            break;
      /*  case "stats":
            var statEmbed = new Discord.MessageEmbed()
                .setTitle("POLYGON COMP STATS")
                .setDescription("[Click here for the full stats](https://docs.google.com/spreadsheets/d/19Cj5BDGIBh620ttwgO5_918zEEAoJkMSgSQ3JuQ8QPc/edit?usp=sharing)")
                .setColor(orange)
                .setThumbnail(poly.user.avatarURL())
                .setFooter(reg)
                .setTimestamp();
                message.delete();
                message.channel.send(statEmbed);
                break;
        case "nd":
            //admin
            message.delete();
            if (message.member.hasPermission("BAN_MEMBERS"))
            {
                message.channel.send("**__NEW DAY OF COMPETITIVE STATS UPDATED__**");
                message.channel.send("!stats");
            }

            break;*/
        case "info":
        var conf = JSON.parse(fs.readFileSync("./config.json", "utf8"));
        var infoEmbed = new Discord.MessageEmbed()
          .setTitle("POLYGON Clans Info")
          .setDescription(config.desc)
          .addField("Version", "`"+conf.majorV+"."+conf.midV+"."+conf.minorV+"`")
          .addField("Developer", config.developer)
          //.addField("Commands Ran", "`"+conf.numRuns+"`")
          .setFooter(reg)
          .setTimestamp()
          .setThumbnail(poly.user.avatarURL())
          .setColor(orange);
          message.channel.send(infoEmbed);
                break;
      /*  case "b":
            //admin
            if (message.member.hasPermission("BAN_MEMBERS"))
            {
                message.delete();
                message.channel.send(args[1]+" bruh get yo goof ass outta here");

            }
            else message.delete();
                break;
        case "ett":
            //admin
            message.delete();
            if (message.member.hasPermission("BAN_MEMBERS"))
            {

                message.channel.send("@everyone **__EVENT TODAY AT "+args[1].toUpperCase()+" "+args[2].toUpperCase()+"__**. 👍 if you plan on playing!")
                .then(function (message) {
                    message.react("👍")
                });

            }
            break;
        case "et":
            //admin
            message.delete();
            if (message.member.hasPermission("BAN_MEMBERS"))
            {

                message.channel.send("@everyone **__EVENT TOMORROW AT "+args[1].toUpperCase()+" "+args[2].toUpperCase()+"__**. 👍 if you plan on playing!")
                .then(function (message) {
                    message.react("👍")
                });

            }
            else message.delete();
            break;
        case "eo":
            //admin
            message.delete();
            if (message.member.hasPermission("BAN_MEMBERS"))
            {
              message.channel.send(`**FINAL SCORE:** ${args[1]} ${args[3]} - ${args[2]} ${args[4]}`);

            }
            break;*/
        case "matchcomplete":
        message.delete();
            //admin
            if (message.member.hasPermission("BAN_MEMBERS"))
            {


              var teamW = args[1];
              if (args[4] > args[3]) teamW = args[2];
                var evEmbed = new Discord.MessageEmbed()
                    .setTitle("Match Completed")
                    .addField(`Winner`, `${args[1]}\n${args[3]}`, true)
                    .addField(`Loser`, `${args[2]}\n${args[4]}`, true)
                    .addField("MAP", args[5], true)
                    .addField("Ruleset", "`"+args[6]+"`", true)
                    .addField("MVP", args[7], true)
                    .setImage(args[8])
                    .setTimestamp()
                    .setFooter(reg)
                    .setColor(orange)
                    .setThumbnail(poly.user.avatarURL());
                    var msg = await message.channel.send(evEmbed);
                      msg.react('✅')
                      var msg1 = await message.reply("Is this correct?")
                    const filter = (reaction, user) => reaction.emoji.name === "✅" && user.id === message.author.id;

                    let collector = msg.createReactionCollector(filter, { time: 10000 });
                    collector.on('collect', (reaction, collector) => {
                    	//postTo.send(evEmbed);
                      msg1.delete()
                      msg.delete();

                    });
                    collector.on('end', collected => {
                      if (msg1.channel.deleted === false) {
                        console.log(msg1)
                        msg.delete()
                        return msg1.delete();
                      }
                    });



}
            break;
        case "seriesdisplay":
          var matchFolder = JSON.parse(fs.readFileSync("./matches.json", "utf8"));
          if (matchFolder.length === 0){
            var ssE = new Discord.MessageEmbed()
              .setTitle("Error")
              .setDescription("No games to display")
              .setFooter(reg, message.author.avatarURL())
              .setColor("##ff000d")
              .setTimestamp()
              .setFooter(reg, message.author.avatarURL());
              message.channel.send(ssE);
          }
          for (i = 0; i < matchFolder.length; i++)
          {
            var evEmbed = new Discord.MessageEmbed()
                .setAuthor("Series")
                .setTitle(`Game ${matchFolder[i].ID}/${args[1]}`)
                .addField(`Winner`, `${matchFolder[i].Team1}\n${matchFolder[i].Score1}`, true)
                .addField(`Loser`, `${matchFolder[i].Team2}\n${matchFolder[i].Score2}`, true)
                .addField("MAP", matchFolder[i].Map, true)
                .addField("Ruleset", "`"+matchFolder[i].Ruleset+"`", true)
                .addField("MVP", matchFolder[i].MVP, true)
                .setImage(matchFolder[i].Scoreboard)
                .setTimestamp()
                .setFooter(reg)
                .setColor(orange)
                .setThumbnail(poly.user.avatarURL());
                message.channel.send(evEmbed);
          }
          break;
        case "seriesclear":
        //admin
        message.delete();
        if (message.member.hasPermission("BAN_MEMBERS")){
          var matchFolder = JSON.parse(fs.readFileSync("./matches.json", "utf8"));
          var clear = [];
          for (i = 0; i < matchFolder.length; i++){
            matchFolder.splice(i);
          }
          fs.writeFile(`matches.json`, JSON.stringify(matchFolder, null, 2), err => {
            if (err) console.log(err);
          });
          var ssE = new Discord.MessageEmbed()
            .setTitle("Cleared Series Information")

            .setFooter(reg, message.author.avatarURL())
            .setColor("#0dff00")
            .setTimestamp()
            .setFooter(reg, message.author.avatarURL());
            message.channel.send(ssE);
        }
          break;
        case "seriesmatch":
        //admin
        message.delete();
        if (message.member.hasPermission("BAN_MEMBERS"))
        {
          var matchFolder = JSON.parse(fs.readFileSync("./matches.json", "utf8"));
                        var contents = {
                          "ID": args[1],
                          "Date": moment(message.createdAt).format(`MM/DD/YY`),
                          "Team1": args[2],
                          "Team2": args[3],
                          "Map": args[4],
                          "Score1": args[5],
                          "Score2": args[6],
                          "Ruleset": args[7],
                          "Scoreboard": args[8],
                          "MVP": args[9]
                        };

                          matchFolder.push(contents);
                        fs.writeFile(`matches.json`, JSON.stringify(matchFolder, null, 2), err => {
                          if (err) console.log(err);
                        });

                        var ssE = new Discord.MessageEmbed()
                          .setTitle("Logged a new match")
                          .addField("Date", moment(message.createdAt).format(`MM/DD/YY`))
                          .addField("Teams", `${args[2]} vs. ${args[3]}`, true)
                          .addField("Score", `${args[5]} - ${args[6]}`, true)
                          .addField("MVP", args[9], true)
                          .setFooter(reg, message.author.avatarURL())
                          .setColor("#0dff00")
                          .setTimestamp()
                          .setFooter(reg);
                          message.channel.send(ssE);
        }
          break;
        /*case "on":
            //admin
            message.delete();
            poly.user.setPresence({ activity: {name: `Running COMP`}, status: `online`});
            break;
        case "off":
            //admin
            message.delete();

            poly.user.setPresence({ activity: {name: `Monitoring ${message.guild.memberCount-1} people !commands`}, status: `online`});
            break;*/
        case "purge":
            //admin
            message.delete();
            if (message.member.hasPermission("BAN_MEMBERS"))
            {
            const deleteCount = parseInt(args[1]);
             message.channel.bulkDelete(deleteCount)
                .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
            }
            break;
        case "acmd":
            //admin
            message.delete();
            if (message.member.hasPermission("BAN_MEMBERS"))
            {
                var adminEmbed = new Discord.MessageEmbed()
                .setTitle("POLYGON Clans Admin Panel")
                .addField("Commands", "purge\nmatchcomplete\npoll")
                .setDescription("Do $botoperator for commands with use and explanations")
                .setFooter(reg, message.member.user.avatarURL())
                .setTimestamp()
                .setThumbnail(poly.user.avatarURL())
                .setColor(orange);
                message.channel.send(adminEmbed);
            }
            break;
        case "help":
            //admin
            if (message.member.hasPermission("BAN_MEMBERS"))
            {
            }
            break;
        case "invites":
          var invites = await message.guild.fetchInvites().catch(error => {
            return;
          })
          invites = invites.array();
          arraySort(invites, "uses", { reverse: true});
          var possibleInvites = [["User", "Invites"]];
          invites.forEach(function(invite) {
            possibleInvites.push([invite.inviter.username, invite.uses]);
          })
          var invLeader = new Discord.MessageEmbed()
          .setTitle("Invite Leaderboard")
          .setTimestamp()
          .setFooter(reg)
          .setColor(orange)
          .addField("Leaderboard", `\`\`\`${table.table(possibleInvites)}\`\`\``);
          message.channel.send(invLeader);
            break;
        /*case "schedule":
            message.delete();
            var data = [];
            if (message.member.hasPermission("BAN_MEMBERS"))
            {
                for (var i = 0; i < args[1]; i++)
                {
                    poly.sEvents = {
                        date: args[2],
                        time: args[3],
                        status: "UPCOMING"
                    };
                }

                var schedEmbed = new Discord.MessageEmbed()
                .setThumbnail(poly.user.avatarURL())
                .setTimestamp()
                .setFooter(reg, poly.user.avatarURL())
                .setTitle("EVENT SCHEDULED")
                .setColor("#3FFF85")
                .addField("GAMES", args[1])
                .addField("DATE", args[2])
                .addField("TIME", args[3])
                .addField("STATUS", "UPCOMING");


                fs.writeFile("./scheduled_events.json", JSON.stringify(poly.sEvents, null, 2), err => {
                    if (err) throw (err);
                    message.channel.send(schedEmbed);
                });
            }
            break;
        case "setTop":
            message.delete();
            if (message.member.hasPermission("BAN_MEMBERS"))
            {
                message.channel.setTopic
            }
            break;
        case "t-":
            message.delete();
            if (message.member.hasPermission("BAN_MEMBERS"))
            {
                message.channel.send("T-"+args[1]+" "+args[2].toUpperCase())+" until the event starts!";
            }
            break;
        case "recap":
            message.delete();
            if (message.member.hasPermission("BAN_MEMBERS"))
            {
                message.channel.send("**--------------------------------------------------**");
                var recapEmbed = new Discord.MessageEmbed()
                    .setThumbnail(poly.user.avatarURL())
                    .setTimestamp()
                    .setDescription("[STATS](https://docs.google.com/spreadsheets/d/19Cj5BDGIBh620ttwgO5_918zEEAoJkMSgSQ3JuQ8QPc/edit#gid=0)")
                    .setTitle("WEEK "+args[1]+" STATS RECAP")
                    .addField("K/D LEADER", args[2]+" - `"+args[3]+"`")
                    .addField("MOST TOTAL KILLS", args[4]+" - `"+args[5]+"`")
                    .addField("MOST AVG KILLS", args[6]+" - `"+args[7]+"`")
                    .addField("MOST TOTAL SCORE", args[8]+" - `"+args[9]+"`")
                    .addField("MOST AVG SCORE", args[10]+" - `"+args[11]+"`")
                    .addField("MOST WINS", args[12]+" - `"+args[13]+"`")
                    .setFooter(`${reg}, (MINIMUM OF 1/3 GAMES PLAYED)`)
                    .setColor(orange);
                    message.channel.send(recapEmbed);
            }
            break;
        case "top3":

            if (args[1] == "deaths")
            {

                var deathEmbed = new Discord.MessageEmbed()
                    .setTitle("WEEK 1 DEATH LEADERS")
                    .setDescription(statSheet)
                    .addField("LEADERS", "1. "+poly.deaths["1"].name+" - "+poly.deaths["1"].deaths+"\n2. "+poly.deaths["2"].name+" - "+poly.deaths["2"].deaths+"\n3. "+poly.deaths["3"].name+" - "+poly.deaths["3"].deaths+"\n")
                    .setColor(orange)
                    .setFooter(reg)
                    .setTimestamp();
                    message.channel.send(deathEmbed);
            }
            else if (args[1] == "kills")
            {
                var killEmbed = new Discord.MessageEmbed()
                    .setTitle("WEEK 1 KILL LEADERS")
                    .setDescription(statSheet)
                    .addField("LEADERS", "1. "+poly.kills["1"].name+" - "+poly.kills["1"].kills+"\n2. "+poly.kills["2"].name+" - "+poly.kills["2"].kills+"\n3. "+poly.kills["3"].name+" - "+poly.kills["3"].kills+"\n")
                    .setColor(orange)
                    .setFooter(reg)
                    .setTimestamp();
                    message.channel.send(killEmbed);
            }
            else if (args[1] == "k/d")
            {
                var kdEmbed = new Discord.MessageEmbed()
                    .setTitle("WEEK 1 K/D LEADERS")
                    .setDescription(statSheet)
                    .addField("LEADERS", "1. "+poly.kd["1"].name+" - "+poly.kd["1"].kd+"\n2. "+poly.kd["2"].name+" - "+poly.kd["2"].kd+"\n3. "+poly.kd["3"].name+" - "+poly.kd["3"].kd+"\n")
                    .setColor(orange)
                    .setFooter(reg)
                    .setTimestamp();
                    message.channel.send(kdEmbed);
            }
            else if (args[1] == "score")
            {
                var scoreEmbed = new Discord.MessageEmbed()
                    .setTitle("WEEK 1 SCORE LEADERS")
                    .setDescription(statSheet)
                    .addField("LEADERS", "1. "+poly.score["1"].name+" - "+poly.score["1"].score+"\n2. "+poly.score["2"].name+" - "+poly.score["2"].score+"\n3. "+poly.score["3"].name+" - "+poly.score["3"].score+"\n")
                    .setColor(orange)
                    .setFooter(reg)
                    .setTimestamp();
                    message.channel.send(scoreEmbed);
            }
            break;
        case "add":
            message.delete();
            if (message.member.hasPermission("BAN_MEMBERS"))
            {
                if (args[1] == "deaths")
                {
                    poly.deaths[args[2]] = {
                        name: args[3],
                        deaths: args[4]
                    }
                    fs.writeFile("./deaths.json", JSON.stringify(poly.deaths, null, 2), err => {
                        if (err) throw err;
                        message.reply("Added "+args[3]+" to Top3 Deaths with "+args[4]);
                    });
                }
                else if (args[1] == "kills")
                {
                    poly.kills[args[2]] = {
                        name: args[3],
                        kills: args[4]
                    }
                    fs.writeFile("./kills.json", JSON.stringify(poly.kills, null, 2), err => {
                        if (err) throw err;
                        message.reply("Added "+args[3]+" to Top3 Kills with "+args[4]);
                    });
                }
                else if (args[1] == "k/d")
                {
                    poly.kd[args[2]] = {
                        name: args[3],
                        kd: args[4]
                    }
                    fs.writeFile("./kd.json", JSON.stringify(poly.kd, null, 2), err => {
                        if (err) throw err;
                        message.reply("Added "+args[3]+" to Top3 K/D with "+args[4]);
                    });
                }
                else if (args[1] == "score")
                {
                    poly.score[args[2]] = {
                        name: args[3],
                        score: args[4]
                    }
                    fs.writeFile("./score.json", JSON.stringify(poly.score, null, 2), err => {
                        if (err) throw err;
                        message.reply("Added "+args[3]+" to Top3 SCORE with "+args[4]);
                    });
                }

            }
            break;
        case "tyydhdh":

            fs.readFile("./scheduled_events.json", err => {
                if (err) throw err;
            });
            let eventFile = [poly.sEvents];
            eventFile.forEach(obj => {
                Object.entries(obj).forEach(([key, value]) => {
                    console.log(`${key} ${value}`);
                });
                console.log('-------------------');
            });
            var eventEmbed = new Discord.MessageEmbed()
            .setTitle("POLYGON COMPETITIVE EVENT SCHEDULE")
            .setColor(orange)
            .setTimestamp()
            .setFooter(reg)
            .setThumbnail(poly.user.avatarURL());

            message.channel.send(eventEmbed);
            break;
        case "say":
            //admin
            let content = args.slice(1).join(" ");
            message.delete();
            if (message.member.hasPermission("BAN_MEMBERS"))
            {
                message.channel.send(content);
            }
            break;
        case "void":
            //admin
            message.delete();
            if (message.member.hasPermission("BAN_MEMBERS"))
            {
            var vEmbed = new Discord.MessageEmbed()
            .setTitle("GAME "+args[1]+" VOIDED")
            .setColor(orange)
            .setFooter(reg)
            .setThumbnail(poly.user.avatarURL())
            .setTimestamp
            .setDescription("GAME "+args[1]+" VOIDED", poly.user.avatarURL());
            message.channel.send(vEmbed);
            }

            break;*/
        case "userinfo":
        var target = null;
        var isDiff = false;
        if (message.mentions.members.first() != null){
            target = message.mentions.members.first().user;
            isDiff = true;
        }
        else{
            target = message.author;
        }
        var member = message.guild.member(target);
        var userEmbed = new Discord.MessageEmbed()
            .setTitle(target.username+"'s Info")
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(target.tag, target.avatarURL())
            .setThumbnail(target.avatarURL())
            .addField("USERNAME", target.tag)
            .addField("USER", target)
            .addField("ID", target.id)
            .addField("Roles", `<@&${message.guild.member(message.author)._roles.join('> <@&')}>`)
            .addField("JOINED SERVER", member.joinedAt)
            .addField("ACCOUNT CREATED", target.createdAt);
            message.channel.send(userEmbed);
            //updateRuns();
            break;
        case "serverinfo":
            var guild = poly.guilds.cache.get("948687152227700776");
            var channelCount = guild.channels.cache.array();
            findAdmins(guild);
            var sE = new Discord.MessageEmbed()
                .setTitle(`${guild.name} Info`)
                //.setDescription(`Owner: ${poly.users.fetch("171411763919585280")}`)
                .addField("Total Members", message.guild.memberCount)
                .addField("Date Created", `<t:${parseInt(guild.createdTimestamp/1000)}:R>`)
                .addField("Number of channels", channelCount.length)
                .addField("Roles", message.guild.roles.cache.array().join(" "))
                //.addField("Admins", adminArray.join(" "))
                .setTimestamp()
                .setThumbnail(guild.iconURL(), true)
                .setFooter("WPG", message.author.avatarURL())
                .setColor("RANDOM");
                message.channel.send(sE);
              break;
      /*  case "set":
            //admin
            message.delete();
            if (message.member.hasPermission("BAN_MEMBERS"))
            {
                if (args[1] == "deaths")
                {
                    poly.deaths[args[2]] = {
                        name: args[3],
                        deaths: args[4]
                    }
                    fs.writeFile("./deaths.json", JSON.stringify(poly.deaths, null, 2), err => {
                        if (err) throw err;
                        message.reply("Set  Top3 ("+args[1]+") #"+args[2]+": **"+args[3]+"** - `"+args[4]+"`.").then(function (message) {
                            message.delete(5000);
                        });
                    });
                }
                else if (args[1] == "kills")
                {
                    poly.kills[args[2]] = {
                        name: args[3],
                        kills: args[4]
                    }
                    fs.writeFile("./kills.json", JSON.stringify(poly.kills, null, 2), err => {
                        if (err) throw err;
                        message.reply("Set  Top3 ("+args[1]+") #"+args[2]+": **"+args[3]+"** - `"+args[4]+"`.").then(function (message) {
                            message.delete(5000);
                        });
                    });
                }
                else if (args[1] == "k/d")
                {
                    poly.kd[args[2]] = {
                        name: args[3],
                        kd: args[4]
                    }
                    fs.writeFile("./kd.json", JSON.stringify(poly.kd, null, 2), err => {
                        if (err) throw err;
                        message.reply("Set  Top3 ("+args[1]+") #"+args[2]+": **"+args[3]+"** - `"+args[4]+"`.").then(function (message) {
                            message.delete(5000);
                        });
                    });
                }
                else if (args[1] == "score")
                {

                    poly.score[args[2]] = {
                        name: args[3],
                        score: args[4]
                    }
                    fs.writeFile("./score.json", JSON.stringify(poly.score, null, 2), err => {
                        if (err) throw err;
                        message.reply("Set  Top3 ("+args[1]+") #"+args[2]+": **"+args[3]+"** - `"+args[4]+"`.").then(function (message) {
                            message.delete(5000);
                        });
                    });
                }
            }
            break;
        case "eventremove":
            //admin
            message.delete();
            if (message.member.hasPermission("BAN_MEMBERS"))
            {
                let eventFile = poly.sEvents;
                eventFile[args[1]] = {
                    status: "OVER"
                }
                message.reply(`Successfully removed Game #${args[1]} from the scheduled events`);
            }
            break;
        case "uptime":
            ms = poly.uptime;
            var uptimedEmbed = new Discord.MessageEmbed()
            .setTitle("BOT UPTIME")
            .setTimestamp()
            .setFooter(reg, poly.user.avatarURL())
            .setColor(orange)
            .setThumbnail(poly.user.avatarURL())
            .addField("DAYS", Math.floor((ms/ (1000 *60 *60 *24)) % 60))
            .addField("HOURS", Math.floor((ms/ (1000 *60 *60)) % 60).toString())
            .addField("MINUTES", Math.floor((ms/ (1000 *60)) % 60).toString())
            .addField("SECONDS", Math.floor((ms/ 1000) % 60).toString());
            message.channel.send(uptimedEmbed);
            break;
        case "react":
            //admin
            message.delete();
            if (message.member.hasPermission("BAN_MEMBERS"))
            {

                message.channel.send(`@everyone **REACT WITH A ${args[1]} if you would like to recieve notifications for events!**`)
                .then(function(message) {
                    message.react(args[1]);
                });

            }
            break;
        case "avatarlink":
            var target = null;
            var isDiff = false;
            if (message.mentions.members.first() != null)
            {
                target = message.mentions.members.first().user;
                isDiff = true;

            }
            else
            {
                target = message.author;
            }
            var aEmbed = new Discord.MessageEmbed()
            .setAuthor(target.username, target.avatarURL())
            .setDescription(`[AVATAR LINK](${target.avatarURL()})`)
            .setTimestamp()
            .setColor(orange);
            message.channel.send(aEmbed);
            break;*/
        case "poll":
            message.delete();
            if (message.member.hasPermission("BAN_MEMBERS"))
            {
                var pollEmbed = new Discord.MessageEmbed()
                .setTitle("NEW POLL")
                .setColor(orange)
                .setFooter(reg, message.author.avatarURL())
                .addField(args[1], `**${args[2].toUpperCase()}**`)
                .addField(args[3], `**${args[4].toUpperCase()}**`)
                .setTimestamp();
                message.channel.send(pollEmbed)
                .then(function(message) {
                    message.react(args[1]);
                    message.react(args[3]);
                });
            }
            break;
        case "apply":
            message.member.createDM()
            break;
        case "ver":
          message.delete();
          if (message.member.id=== "232309522092261378")
          {
              if (args[1] === null || args[1] === undefined) return;
              var conf = JSON.parse(fs.readFileSync("./config.json", "utf8"));
              conf.minorV += parseInt(args[1]);
              if (conf.minorV >= 10)
              {
                conf.minorV = conf.minorV - 10;
                conf.midV += 1;
              }
              if (conf.midV >= 10)
              {
                conf.midV = 0;
                conf.minorV = 0;
                conf.majorV += 1;
              }

              fs.writeFile("./config.json", JSON.stringify(conf, null, 2), err => {
                  if (err) throw err;

                });
                var sE = new Discord.MessageEmbed()
                  .setDescription("Version updated: `"+conf.majorV+"."+conf.midV+"."+conf.minorV+"`");
                  message.channel.send(sE).then(msg => msg.delete({timeout: 5000})).catch(console.error);
            }
            //updateRuns();
            break;
      /*  case "matches":
          var matchFolder = JSON.parse(fs.readFileSync("./matches.json", "utf8"));
            var mE = new Discord.MessageEmbed()
              .setTitle("Match History")
              .setDescription("Previous/Current 5 matches")
              .setThumbnail("https://cdn.discordapp.com/attachments/790385954875506701/791197132618072084/VML.png")
              .setFooter(reg)
              .setColor(orange)
              .setTimestamp();
              for (i = 0; i < matchFolder.length; i++)
              {
                //console.log(i);
                if (matchFolder[i].Status === "Incomplete") mE.addField(`ID: ${matchFolder[i].ID} | ${matchFolder[i].Status}`, `${matchFolder[i].Team1} vs. ${matchFolder[i].Team2}`)
                else if (matchFolder[i].Status === "Complete" && matchFolder[i].Winner === matchFolder[i].Team1 )mE.addField(`ID: ${matchFolder[i].ID} | ${matchFolder[i].Status}`, `**${matchFolder[i].Team1}** vs. ${matchFolder[i].Team2}\n${matchFolder[i].Score}\n**Map**: ${matchFolder[i].Map}\n**MVP**: ${matchFolder[i].MVP}`)
                else if (matchFolder[i].Status === "Complete" && matchFolder[i].Winner === matchFolder[i].Team2 )mE.addField(`ID: ${matchFolder[i].ID} | ${matchFolder[i].Status}`, `${matchFolder[i].Team1} vs. **${matchFolder[i].Team2}**\n${matchFolder[i].Score}\n**Map**: ${matchFolder[i].Map}\n**MVP**: ${matchFolder[i].MVP}`)

              }
              message.channel.send(mE);
          break;

        case "newmatch":
            message.delete();
            var matchFolder = JSON.parse(fs.readFileSync("./matches.json", "utf8"));
            var mID = 0;
            var content1 = "";
            var team1 = "";
            var team2 = "";
            var authorID = "";
            var Author = message.author;
            var Authorid = Author.id;
            var sE = new Discord.MessageEmbed()
              .setColor(message.member.displayHexColor)
              .setDescription(`Please specify a date`);
              message.channel.send(sE).then(msg => msg.delete({timeout: 4000})).catch(console.error);
              message.channel.awaitMessages(m=> m.author.id == message.author.id, {max:1, time: 30000}).then(collected => {
                //message.delete();
                content1 = collected.first().content;
                authorID = message.author.id;
                var tE = new Discord.MessageEmbed()
                  .setColor(message.member.displayHexColor)
                  .setDescription(`Please specify a team`);
                  message.channel.send(tE).then(msg => msg.delete({timeout: 4000})).catch(console.error);


                  const filter1 = response1 => {
                  return response1.author.id === Authorid;
                  }
                  //t1
                  message.channel.awaitMessages(filter1, {max:1, time: 60000}).then(collected1 => {
                    message.delete();
                    team1 = collected1.first().content;
                    checkList(team1);
                    console.log(`inList: ${inList} | status: ${stat} | listName: ${listName}`);
                    if (!inList && stat)
                    {
                      var sE = new Discord.MessageEmbed()
                        .setColor("#fc0303")
                        .setDescription("Error team: `"+team1+"` does not exist");
                        return message.channel.send(sE).then(msg => msg.delete({timeout: 2000})).catch(console.error);
                    }
                    team1 = listName;
                     var tE2 = new Discord.MessageEmbed()
                       .setColor(message.member.displayHexColor)
                       .setDescription(`Please specify the second team`);
                       message.channel.send(tE2).then(msg => msg.delete({timeout: 4000})).catch(console.error);
                       //t1


                 const filter2 = response2 => {
                 return response2.author.id === Authorid;
                 }
                  //t2
                    message.channel.awaitMessages(filter2, {max:1, time: 30000}).then(collected2 => {
                      //message.delete();
                        team2 = collected2.first().content;
                        checkList(team2);
                        //console.log(`inList: ${inList} | status: ${stat} | listName: ${listName}`);

                        if (!inList && stat)
                        {
                          var sE = new Discord.MessageEmbed()
                            .setColor("#fc0303")
                            .setDescription("Error team: `"+team2+"` does not exist");
                            console.log("LL");
                            return message.channel.send(sE).then(msg => msg.delete({timeout: 2000})).catch(console.error);
                        }
                        else if (inList && stat){
                          team2 = listName;
                          for (i = 0; i < matchFolder.length; i++)
                          {
                            mID++;

                          }

                          var contents = {
                              "ID": mID,
                              "Date": content1,
                              "Team1": team1,
                              "Team2": team2,
                              "Status": "Incomplete",
                              "Map": "",
                              "Ruleset": "",
                              "MVP": "",
                              "Score": "",
                              "Winner": "N/A"
                          };

                            matchFolder.push(contents);
                          fs.writeFile(`matches.json`, JSON.stringify(matchFolder, null, 2), err => {
                            if (err) console.log(err);
                          });

                          var ssE = new Discord.MessageEmbed()
                            .setTitle("Scheduled new match!")
                            .addField("Date", content1)
                            .addField("Teams", `${team1} vs. ${team2}`)
                            .setColor("#0dff00")
                            .setTimestamp()
                            .setFooter(reg);
                          return message.channel.send(ssE).then(msg => msg.delete({timeout: 5000})).catch(console.error);

                        }
                        //t2
                }).catch((err) => {
                    console.log(err);
                    return message.reply("No answer after 30 seconds, please try again.").then(msg => msg.delete({timeout: 1500})).catch(console.error);
                  });
                }).catch((err) => {
                  console.log(err);
                  return message.reply("No answer after 30 seconds, please try again.").then(msg => msg.delete({timeout: 1500})).catch(console.error);
                });
              }).catch((err) => {
                console.log(err);
                return message.reply("No answer after 30 seconds, please try again.").then(msg => msg.delete({timeout: 1500})).catch(console.error);
                });
            break;*/
    }
});
poly.login(TOKEN);
