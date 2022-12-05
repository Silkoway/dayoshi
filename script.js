let y = document.getElementById("yoshi")
let h = document.getElementById("hand");
let count = 0;
let death = 0;
let c = document.getElementById("count");
let sin = 0;
let ypos = 0;
let xpos = 0;
let bo = document.querySelector(".bossbar");
let bf = document.querySelector(".bossbar-filled")
let bt = document.querySelector(".bossbar-text")

let health = 100;

function createAlert(_msg) {
    let msg = document.createElement("div")
    msg.textContent = _msg
    msg.style.position = "absolute"
    msg.style.left = (xpos+(Math.random()*50-25)) + 'px';
    msg.style.top =  (ypos+(Math.random()*50-25)) + 'px';
    document.body.appendChild(msg)
    setTimeout(() => {msg.remove()}, 200)
}

document.addEventListener("click", () => {
    y.classList.add("hit");
    let r = Math.random();
    let q = r < 0.3;
    if (q) {
        y.setAttribute("src", "yoshiblock.png")
        y.classList.add("block")
        createAlert("Blocked!")
        h.classList.add("block")
    } else {
        y.setAttribute("src", "sadyoshi.png")
        count++;
        health--;
        createAlert("Normal Hit | +1 Hit")
        
        c.innerHTML = "You have hit yoshi " + count + " times<br>You have made yoshi faint " + death + " times"
        h.classList.add("hit");
    }
    
    setTimeout(() => {
        y.classList.remove("hit");
        h.classList.remove("hit")
        y.setAttribute("src", "yoshi.png")
    }, 100)
    setTimeout(() => {
        y.classList.remove("block")
        h.classList.remove("block")
    }, 300)
})

document.addEventListener("mousemove", (e) => {
    ypos = e.clientY
    xpos = e.clientX
})

setInterval(() => {
    if (health < 1) {
        health = 100;
        death++;
        c.innerHTML = "You have hit yoshi " + count + " times<br>You have made yoshi faint " + death + " times"
        document.body.style.backgroundColor = "rgba(128,255,0,1)"
        setTimeout(() => document.body.style.backgroundColor = "white", 1000)
    }
    sin+=0.05;
    h.style.top = (ypos + Math.sin(sin)*4) + "px"
    bf.style.width = health + '%'
    bt.textContent = `${health} / 100`

}, 1)