var http = require("http"); 
const port = 8000;

let textLang = ["yanchun mian or qing tang mian", "阳春面 or 清汤面", "陽春面 or 清湯麵"]; // language options for text stored in array
let textLangI = 0; // textLang index

http.createServer(function(req, res) { 
    let url = req.url;
    let lang = req.headers["accept-language"];

    // console.log(req); // very long dump
    console.log("url: " + url);
    console.log("method: " + req.method);
    console.log("IP: " + req.socket.remoteAddress); // could be used to find user's region for language
    console.log("header, user-agent: " + req.headers["user-agent"]); // shows user's browsers
    console.log("header, accept-language: " + lang); // shows user's preferred language settings
    // retrieve information from the http request

    let langZHCN = lang.includes("zh-CN"); // check for simplified chinese lang. pref.
    let langZHTW = lang.includes("zh-TW"); // check for traditional chinese lang. pref.

    if(langZHCN == true && langZHTW == true) {
        textLangI = 0
        console.log("loaded pinyin text") // hopefully a fair solution for someone who may prefer either simpl. or trad.
    } else if(langZHCN == true) {
        textLangI = 1;
        console.log("loaded simplified chinese text")
    } else if(langZHTW == true) {
        textLangI = 2;
        console.log("loaded traditional chinese text") 
    } else {
        textLangI = 0
        console.log("loaded pinyin text") // more legible to non-chinese speakers
    }
    // if() statements switching pinyin text for chinese characters if a user's accpeted languages include simpl. or trad. chinese

    res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"}); 
    // changed content-type from text/plain to include HTML

    res.end(
        `<!DOCTYPE html>
        <html lang="en">
        <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title> MyPage </title>
           <style>
              body {
                background-color: #92aa86ff;
                color: #ffd6f7ff;
                margin: 33px;
                <!-- font-family: "Lucida Console", "Courier New", monospace; -->
              }
           </style>
        </head>
        <body>
          <h1> MyPage - hello, i'm yew! :) </h1>
          <h2> nice to meet you! who am I? what do I like? </h2>
          <p> 
           mint chocolate? strawberry flavour? cookies and cream? ice cream?! <br>
           sometimes, but i don't really like sugary or sweet things very often!
          </p>
          <p> 
           i was born on the 12th of october 1998, which means i am about to turn 27 years old <br>
           (i should probably get out the habit of rounding my age up in the next few years)... <br><br>
           some of my favourite things are walks in nature, music, evening light and my cat flo. <br>
           my go to recipe atm is ${textLang[textLangI]} - spring noodles or clear noodle soup. <br>
           it's very light, simple and goes nicely with steamed vegetables and soft tofu.
           <br><br>
           :)
          </p>
        </body>
        </html>`
    );
    // HTML doc to be sent as responce to HTTP request
    // langauge option implemented in the html body

}).listen(port, function() { 
    console.log(`Node server is running on port ${port}...`); 
});