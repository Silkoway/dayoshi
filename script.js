(() => {
    "use strict";
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
    let bt = document.querySelector(".bossbar-text");

    let __ = (query) => document.getElementById(query);

    /** @type {["normal" | "hit" | "blocked", string, string][]} */
    let skins = [
        ["normal", "assets/yoshi.png", "Normal Yoshi"],
        ["hit", "assets/sadyoshi.png", "Sad Yoshi"],
        ["blocked", "assets/yoshiblock.png", "Blocking Yoshi"],
        ["normal", "assets/redyoshi.png", "Red Yoshi"]
    ]
    let unlocked = [...skins.slice(0, 3)]

    let curSkin = {
        normal: skins[0],
        hit: skins[1],
        blocked: skins[2]
    }
    
    let save = localStorage.getItem("save");
    if (save) {
        let p = JSON.parse(atob(save));
        count = p.count;
        death = p.death;
        unlocked = p.unlocked;
        curSkin = p.curSkin;
    } else {
        setSave()
    }


    function setSave() {
        localStorage.setItem("save", btoa(JSON.stringify({
            count: count,
            death: death,
            unlocked: unlocked,
            curSkin: curSkin
        })))
    }
    
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
            y.setAttribute("src", curSkin.blocked[1])
            y.classList.add("block")
            createAlert("Blocked!")
            h.classList.add("block")
        } else {
            y.setAttribute("src", curSkin.hit[1])
            count++;
            health--;
            createAlert("Normal Hit | +1 Hit")
            
            c.innerHTML = "You have hit yoshi " + count + " times<br>You have made yoshi faint " + death + " times"
            h.classList.add("hit");
            setSave()
        }
        
        setTimeout(() => {
            y.classList.remove("hit");
            h.classList.remove("hit")
            y.setAttribute("src", curSkin.normal[1])
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
    y.setAttribute("src", curSkin.normal[1])

    {
        let buyred = __("buy__red")

        buyred.onclick = () => {
            if (unlocked.includes(skins[3])) return;
            if (death >= 5) {
                death -= 5;
                unlocked.push(skins[3]);
                curSkin.normal = skins[3];
                setSave();
            }
            updateSkins();
        }
    }

    function updateSkins() {
        let idle = __("idle")
        let hit = __("hit")
        let block = __("block")

        idle.innerHTML = ""
        unlocked.forEach((a, i) => {
            if (a[0] === "normal") {
                idle.innerHTML += `<li class="select${i}"><button>${a[2]}</button></li>`
            }
            if (a[0] === "blocked") {
                block.innerHTML += `<li class="select${i}"><button>${a[2]}</button></li>`
            }
            if (a[0] === "hit") {
                hit.innerHTML += `<li class="select${i}"><button>${a[2]}</button></li>`
            }
        })
        unlocked.forEach((a, i) => {
            if (a[0] === "normal") {
                document.querySelector(`.select${i}`).addEventListener("click", () => {
                    curSkin.normal = a;
                })
            }
            if (a[0] === "blocked") {
                document.querySelector(`.select${i}`).addEventListener("click", () => {
                    curSkin.blocked = a;
                })
            }
            if (a[0] === "hit") {
                document.querySelector(`.select${i}`).addEventListener("click", () => {
                    curSkin.hit = a;
                })
            }
        })
    }

    updateSkins()
})();
