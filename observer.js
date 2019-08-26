/* 
    Remind Bot
   --------------
    ~ since Remind doesn't have an api for reciveing messages I had to make all of this. Thank you Remind very cool.
    ~ Takes an annoucement and sends it to discord. pretty simple.
*/


//required modules
var chalk = require('chalk');
const puppeteer = require('puppeteer');
var Discord = require('discord.js');
const token = process.env.SECRET;
const client = new Discord.Client();
let annon = undefined;

(observer = async () => {
    client.login(token);

    client.on('ready', async () => {

        console.log(chalk.blue('[INFO] Observer starting...'));

        let browser = await puppeteer.launch({
            headless: true,
            slowMo: 00
        });

        let page = await browser.newPage();

        await page.goto(`https://www.remind.com/log_in`);
        console.log(chalk.green('[SUCCESS] Observer Active!'));

        let LatestDM = undefined;
        let preAnnon = undefined;

        setInterval(async () => {

            latestDM = await page.evaluate(async () => {
                if (document.getElementById('id-9') !== null) document.getElementById('id-9').value = "synthHusk@gmail.com";
                if (document.getElementById('id-10') !== null) document.getElementById('id-10').value = "dndbeyond";

                getCircularReplacer = () => {
                    const seen = new WeakSet();
                    return (key, value) => {
                        if (typeof value === "object" && value !== null) {
                            if (seen.has(value)) return;
                            seen.add(value);
                        }
                        return value;
                    };
                };

                if (document.getElementById('id-9') !== null) {
                    setTimeout(() => {
                        document.body.getElementsByClassName("Button SignInForm-submit Button--primary Button--small Button--full")[0].click();
                    }, 1000)
                }

                if (document.body.getElementsByClassName("Row Row--small") !== null) {
                    setTimeout(() => {
                        obj = { jsfy: undefined };
                        current = undefined;
                        previous = undefined;
                        setInterval(() => {
                            current = document.body.getElementsByClassName("Row Row--small")[0].children[0].children[0].children[0].children[1].children[1].children[0].firstChild.wholeText;

                            if (current !== previous && current.startsWith(`Annou`)) {
                                obj.jsfy = current;
                            }
                            previous = current;
                        }, 500)
                    }, 7000);
                    if (typeof obj !== "undefined") return JSON.stringify(obj.jsfy, getCircularReplacer());
                }
            })
            if(typeof latestDM !== "undefined" && latestDM.startsWith(`"Annou`)) {
                annon = latestDM;
            }
        }, 1000);

        setInterval(() => {
            if (typeof annon !== "undefined") {
                if (annon !== preAnnon) {
                    client.channels.find(x => x.name === 'testing').send("@everyone" + "```" + annon.split("Announcement:")[1].split('"')[0] + "```");
                    console.log(chalk.blue('[INFO] Announcement Sent'));
                }
                preAnnon = annon;
            }

        }, 100);
    })
})();
