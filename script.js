let y = document.getElementById("yoshi")
let h = document.getElementById("hand");
let count = 0;
let c = document.getElementById("count");
let sin = 0;
let ypos = 0;
let xpos = 0;

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
        y.setAttribute("src", "sadyoshi.webp")
        count++;
        createAlert("Normal Hit | +1 Hit")
        
        c.textContent = "You have hit yoshi " + count + " times"
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
    sin+=0.05;
    h.style.top = (ypos + Math.sin(sin)*4) + "px"
}, 1)