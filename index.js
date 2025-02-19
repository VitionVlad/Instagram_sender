const { IgApiClient } = require("instagram-private-api");
const fs = require('node:fs');
const { exit } = require("node:process");

async function snd(ig, usr, msg) {
    try {    
        const userId = await ig.user.getIdByUsername(usr);
        const thread = ig.entity.directThread([userId.toString()]);
    
        await thread.broadcastText(msg);
        return true;
    } catch (err) {
      return err;
    }
}

var spl;

async function afterrrd(){
    console.log(spl);

    const username = spl[0];
    const password = spl[1];
    const ig = new IgApiClient();
    ig.state.generateDevice(username);
    await ig.account.login(username, password);

    for(var i = 2; i < spl.length; i+=1){
        var nm = 0;
        if(spl[i] == "$nm$"){
            nm = Number(spl[i+1]);
        }
        var usrlst = [];
        for(var j = 0; j < nm; j+=1){
            usrlst.push(spl[i+2+j]);
        }
        var str = "";
        for(var j = i+2+nm; j < spl.length; j+=1){
            if(spl[j] != "$nm$"){
                str += spl[j] + " ";
            }else{
                break;
            }
        }
        if(usrlst.length > 0){
            console.log(usrlst); 
            console.log(str); 
            for(var j = 0; j != usrlst.length; j+=1){
                await snd(ig, usrlst[j], str);
            }
        }
    }
}

fs.readFile('data.txt', 'utf8', (err, data) => {
    if(err){
        console.log("ceva nu e cum trebuie, poate nu exista data.txt???");
        exit(0);
    }
    spl = data.split(" ");
    afterrrd();
});

//snd();