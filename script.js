// ELEMENTS
const nonButton = document.querySelector(".non");
const ouiButton = document.querySelector(".oui");
const heartsContainer = document.querySelector(".hearts-container");


// ===============================
// MUSIC SYSTEM
// ===============================

let music = new Audio("music.mp3");
music.loop = true;

window.addEventListener("load", () => {
    if (localStorage.getItem("musicPlaying") === "true") {
        music.play();
    }
});


// ===============================
// GLOBAL STATE
// ===============================

let hoverCount = 0;
let offsetX = 0;
let offsetY = 0;
let speedMultiplier = 1;
let ouiScale = 1;
let heartInterval = 500;
let pinkLevel = 0;


// ===============================
// NON BUTTON LOGIC
// ===============================

nonButton.addEventListener("mouseenter", (e) => {

    // SHAKE BEFORE ESCAPE
    nonButton.classList.add("shake");

    setTimeout(() => {
        nonButton.classList.remove("shake");

        const rect = nonButton.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;

        const dx = e.clientX - buttonCenterX;
        const dy = e.clientY - buttonCenterY;

        const distance = Math.sqrt(dx * dx + dy * dy) || 1;

        const baseMove = 70;
        const moveStrength = baseMove * speedMultiplier;

        const moveX = -(dx / distance) * moveStrength;
        const moveY = -(dy / distance) * moveStrength;

        offsetX += moveX;
        offsetY += moveY;

        const maxRadius = 200;
        const totalDistance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

        if (totalDistance > maxRadius) {
            offsetX *= 0.7;
            offsetY *= 0.7;
        }

        nonButton.style.transform =
            `translate(${offsetX}px, ${offsetY}px)`;


        // AFTER ESCAPE EFFECTS
        hoverCount++;
        speedMultiplier += 0.4;

        // OUI GROWS
        ouiScale += 0.12;
        ouiButton.style.transform = `scale(${ouiScale})`;

        // SCREEN ZOOM
        document.body.style.transform =
            `scale(${1 + hoverCount * 0.01})`;

        // BACKGROUND TURNS PINKER
        pinkLevel += 10;
        document.body.style.background =
            `linear-gradient(135deg,
             rgb(${11 + pinkLevel}, 31, 75),
             rgb(${42 + pinkLevel}, 82, 152))`;

        // HEARTS SPEED UP
        heartInterval = Math.max(150, heartInterval - 40);

        // TEXT STAGES
        if (hoverCount === 1) {
            nonButton.innerHTML = "hmmmm......";
        }
        else if (hoverCount === 2) {
            nonButton.innerHTML = "réfléchis encore";
        }
        else {
            nonButton.innerHTML = "💔 Ne me brise pas le coeur";
        }

    }, 180);
});


// ===============================
// FLOATING HEARTS (dynamic speed)
// ===============================

function createHeart() {

    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (Math.random() * 20 + 10) + "px";
    heart.style.animationDuration =
        (Math.random() * 4 + 4) + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 9000);
}

// dynamic interval
function startHearts() {
    createHeart();
    setTimeout(startHearts, heartInterval);
}

startHearts();


// ===============================
// CONFETTI EXPLOSION
// ===============================

function createConfetti() {

    for (let i = 0; i < 150; i++) {

        const confetti = document.createElement("div");

        confetti.style.position = "fixed";
        confetti.style.width = "8px";
        confetti.style.height = "8px";
        confetti.style.backgroundColor =
            `hsl(${Math.random() * 360}, 100%, 50%)`;

        confetti.style.left = window.innerWidth / 2 + "px";
        confetti.style.top = window.innerHeight / 2 + "px";
        confetti.style.pointerEvents = "none";
        confetti.style.zIndex = "999";

        document.body.appendChild(confetti);

        const angle = Math.random() * 2 * Math.PI;
        const velocity = Math.random() * 8 + 6;

        let x = 0;
        let y = 0;
        let gravity = 0.2;

        function animate() {
            x += Math.cos(angle) * velocity;
            y += Math.sin(angle) * velocity + gravity;

            confetti.style.transform =
                `translate(${x}px, ${y}px) rotate(${x * 15}deg)`;

            if (y < window.innerHeight) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        }

        animate();
    }
}


// ===============================
// OUI CLICK
// ===============================

ouiButton.addEventListener("click", () => {

    music.play();
    localStorage.setItem("musicPlaying", "true");

    createConfetti();

    setTimeout(() => {

        document.body.style.transition = "opacity 1s ease";
        document.body.style.opacity = 0;

        setTimeout(() => {
            window.location.href = "page2.html";
        }, 1000);

    }, 1800);
});

