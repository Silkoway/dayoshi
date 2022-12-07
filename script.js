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

    /** @type {["normal" | "hit" | "blocked", string, string, number][]} */
    let skins = [
        ["normal", "assets/yoshi.png", "Normal Yoshi", -1],
        ["hit", "assets/sadyoshi.png", "Sad Yoshi", -1],
        ["blocked", "assets/yoshiblock.png", "Blocking Yoshi", -1],
        ["normal", "assets/redyoshi.png", "Red Yoshi", 5],
        ["hit", "assets/cryingyoshi.png", "Crying Yoshi", 15],
        ["hit", "assets/hit/tearyoshi.png", "Tear Yoshi", 20]
    ]
    let unlocked = new Set([...skins.slice(0, 3)])
    
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
        unlocked = new Set(p.unlocked.map(a => skins[a]));
        curSkin = p.curSkin;
    } else {
        setSave()
    }


    function setSave() {
        localStorage.setItem("save", btoa(JSON.stringify({
            count: count,
            death: death,
            unlocked: Array.from(unlocked.values()).map(a => skins.indexOf(a)),
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
    
    function resetSave() {
        setTimeout(() => {
            localStorage.removeItem('save')
            location.reload();
        })
        
    }

    window._reset = resetSave

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
            let chance = Math.random() < 0.1
            if (chance) {
                count += 5;
                health -= 5;
                createAlert("Critical Hit | +5 Hits")
            }   
            else {
                count++;
                health--;
                createAlert("Normal Hit | +1 Hit")
            }
            
            c.innerHTML = "You have hit yoshi " + count + " times<br>You have made yoshi faint " + death + " times"
            h.classList.add("hit");
            setSave()
        }
        
        setTimeout(() => {
            h.classList.remove("hit")
        }, 100)
        setTimeout(() => {
            y.setAttribute("src", curSkin.normal[1])
            y.classList.remove("hit");
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
        //console.log(unlocked)
    }, 1)
    y.setAttribute("src", curSkin.normal[1])

    function updateSkins() {
        let idle = __("idle")
        let hit = __("hit")
        let block = __("block")

        idle.innerHTML  = ""
        hit.innerHTML   = ""
        block.innerHTML = ""
        var i = 0;
        unlocked.forEach((a) => {
            if (a[0] === "normal") {
                idle.innerHTML += `<li class="select${i}"><button>${a[2]}</button></li>`
            }
            if (a[0] === "blocked") {
                block.innerHTML += `<li class="select${i}"><button>${a[2]}</button></li>`
            }
            if (a[0] === "hit") {
                hit.innerHTML += `<li class="select${i}"><button>${a[2]}</button></li>`
            }
            i++;
        })
        var i = 0;
        unlocked.forEach((a) => {
            if (a[0] === "normal") {
                document.querySelector(`.select${i} > button`).addEventListener("click", () => {
                    curSkin.normal = a;
                })
            }
            if (a[0] === "blocked") {
                document.querySelector(`.select${i} > button`).addEventListener("click", () => {
                    curSkin.blocked = a;
                })
            }
            if (a[0] === "hit") {
                document.querySelector(`.select${i} > button`).addEventListener("click", () => {
                    curSkin.hit = a;
                })
            }

            i++;
        })
    }

    updateSkins()

    skins.forEach(a => {
        if (a[3] === -1) return;
        let buybut = document.createElement("button")
        buybut.textContent = `Buy ${a[2]} - ${a[3]} faints`
        
        __("shop").appendChild(buybut)
        buybut.addEventListener("click", () => {
            if (unlocked.has(a)) return;
            if (death >= a[3]) {
                death -= a[3]
                unlocked.add(a);
                setSave();
                updateSkins();
            }
        })
        __("shop").appendChild(document.createElement("br"))
        console.log(unlocked, curSkin)
    })
})();
