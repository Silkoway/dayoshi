let y = document.getElementById("yoshi")
let h = document.getElementById("hand");
let count = 0;
let c = document.getElementById("count");

document.addEventListener("click", () => {
    y.classList.add("hit");
    let r = Math.random();
    let q = r < 0.1;
    if (q) {
        y.setAttribute("src", "yoshiblock.png")
    } else {
        y.setAttribute("src", "sadyoshi.webp")
        count++;
        c.textContent = "You have hit yoshi " + count + " times"
        h.classList.add("hit");
    }
    
    setTimeout(() => {
        y.classList.remove("hit");
        h.classList.remove("hit")
        
    }, 100)
    setTimeout(() => y.setAttribute("src", "yoshi.png"), 300)
})

document.addEventListener("mousemove", (e) => {
    h.style.top = e.clientY + "px"
})