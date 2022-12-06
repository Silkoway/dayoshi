const fs = require('fs');
let i = fs.readFileSync("input", 'utf8')
let p = i.split("\r\n").map(a => [a.slice(0, a.length/2), a.slice(a.length/2)]);

function roblox(txt) {
    let splited = txt.split("");
    let a = {};
    splited.forEach((l) => {
        if (a[l] === undefined) a[l] = 0;
        a[l] += 1;
    })

    return a;
}

p.forEach(a => {
    let _1 = roblox(a[0]);
    let _2 = roblox(a[1]);

    let q = new Map();
    Object.keys(_1).forEach(l => q.set(l, 0));
    Object.keys(_2).forEach(l => q.set(l, 0));
    q.forEach(a => {
        if (Object.keys(_1).includes(a) && Object.keys(_2).includes(a)) {
            
        }
    })
})