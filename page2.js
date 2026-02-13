// KEEP MUSIC PLAYING
let music = new Audio("music.mp3");
music.loop = true;

window.addEventListener("load", () => {
    if (localStorage.getItem("musicPlaying") === "true") {
        music.play();
    }

    // ===============================
    // ROSE GARDEN
    // ===============================
    const garden = document.querySelector(".rose-garden");

    function createRose() {
        const rose = document.createElement("div");
        rose.classList.add("rose");
        rose.innerHTML = "🌹";

        rose.style.left = Math.random() * 100 + "vw";
        rose.style.fontSize = (Math.random() * 20 + 20) + "px";
        rose.style.animationDuration = (Math.random() * 6 + 6) + "s";

        garden.appendChild(rose);

        setTimeout(() => rose.remove(), 12000);
    }

    setInterval(createRose, 600);

    // ===============================
    // REASON BOXES ANIMATION
    // ===============================
    const boxes = document.querySelectorAll(".reason-box");

    boxes.forEach((box, index) => {

        setTimeout(() => {
            box.style.transition = "all 1.5s ease"; // slower
            box.style.opacity = "1";
            box.style.transform = "translateY(0)";

            // Add sparkles for all boxes
            for (let i = 0; i < 5; i++) {
                const sparkle = document.createElement("div");
                sparkle.classList.add("sparkle");
                sparkle.style.left = Math.random() * box.clientWidth + "px";
                sparkle.style.top = Math.random() * box.clientHeight + "px";
                box.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 1200);
            }

            // If last box, add cinematic sparkle + focus effect
            if (index === boxes.length - 1) {
    // focus/zoom effect
    box.classList.add("focus-last-box");

    // sparkle particles inside last box
    const shineInterval = setInterval(() => {
        const shine = document.createElement("div");
        shine.classList.add("sparkle");
        shine.style.width = Math.random() * 10 + 4 + "px";
        shine.style.height = shine.style.width;
        shine.style.left = Math.random() * box.clientWidth + "px";
        shine.style.top = Math.random() * box.clientHeight + "px";
        shine.style.background = "rgba(255,255,255,0.9)";
        box.appendChild(shine);
        setTimeout(() => shine.remove(), 1200);
    }, 150);

    // Falling petals
    const petalInterval = setInterval(() => {
        const petal = document.createElement("div");
        petal.classList.add("petal");
        petal.innerHTML = "🌸"; // soft flower emoji
        petal.style.left = Math.random() * window.innerWidth + "px";
        petal.style.fontSize = (Math.random() * 20 + 15) + "px";
        petal.style.animationDuration = (Math.random() * 4 + 4) + "s";
        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), 8000);
    }, 200);

    // wait a little and then fade to next page
    setTimeout(() => {
        clearInterval(shineInterval);
        clearInterval(petalInterval);

        // Smooth fade-out
        document.body.style.transition = "opacity 2s ease";
        document.body.style.opacity = 0;

        setTimeout(() => {
            window.location.href = "page3.html"; // next page
        }, 2000);

    }, 2500); // duration of focus + sparkle + petals
}


        }, 1000 + index * 1200); // staggered appearance
    });
});
