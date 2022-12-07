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
function blox(txt) {
    let a = {};
    txt.forEach((l) => {
        if (a[l] === undefined) a[l] = 0;
        a[l] += 1;
    })
    let c = []
    Object.keys(a).forEach(b => {
        for (let i = 0; i < a[b]; i++) {
            if (c.filter(p => p[0] === b).length === 0) c.push([b, 0]);
            c.filter(p => p[0] === b)[1]++
        }
    })
    return c;
}
let points = 0;
p.forEach(a => {
    let _1 = roblox(a[0]);
    let _2 = roblox(a[1]);

    let q = new Map();
    Object.keys(_1).forEach(l => q.set(l, 0));
    Object.keys(_2).forEach(l => q.set(l, 0));

    let letters1 = [];
    Object.keys(_1).forEach(a => {
        for (let i = 0; i < _1[a]; i++) {
            letters1.push(a)
        }
    })
    let letters2 = [];
    Object.keys(_2).forEach(a => {
        for (let i = 0; i < _2[a]; i++) {
            letters2.push(a)
        }
    })

    let ccc = blox(intersection_destructive(letters1, letters2)).sort((a, b) => b[1]-a[1]);
    
    ccc.forEach(popo => {
        popo.forEach(l => points += getPoint(l))
    })
    
})
console.log(points)

function getPoint(a) {
    let p = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    return p.indexOf(a)+1
}

function intersection_destructive(a, b)
{
  var result = [];
  while( a.length > 0 && b.length > 0 )
  {  
     if      (a[0] < b[0] ){ a.shift(); }
     else if (a[0] > b[0] ){ b.shift(); }
     else /* they're equal */
     {
       result.push(a.shift());
       b.shift();
     }
  }

  return result;
}