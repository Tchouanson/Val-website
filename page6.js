window.addEventListener("load", () => {

    const boxesContainer = document.querySelector(".boxes-container");
    const futureTitle = document.querySelector(".future-title");
    const futureText = document.querySelector(".future-text");
    const endingAnimation = document.querySelector(".ending-animation");

    const storyData = [
        { title: "Le jour où je t'ai remarqué", text: "Quelque chose a changé en moi", emoji: "🌟" },
        { title: "Le jour où j'ai compris que tu comptais", text: "Plus que je ne l'imaginais", emoji: "💖" },
        { title: "Aujourd'hui", text: "Où je te demande d'être ma Valentine", emoji: "💌", pinkTitle: true }
    ];

    // Sparkle effect
    function createSparkle(box) {
        const sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");
        sparkle.style.width = "6px";
        sparkle.style.height = "6px";
        sparkle.style.background = "rgba(255,255,255,0.9)";
        sparkle.style.position = "absolute";
        sparkle.style.left = Math.random() * box.clientWidth + "px";
        sparkle.style.top = Math.random() * box.clientHeight + "px";
        box.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1200);
    }

    // Floating hearts
    function createFloatingHeart() {
        const heart = document.createElement("div");
        heart.classList.add("floating-heart");
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * window.innerWidth + "px";
        heart.style.fontSize = (Math.random() * 20 + 15) + "px";
        document.body.appendChild(heart);
        const duration = 3000 + Math.random()*2000;
        heart.style.transition = `all ${duration}ms linear`;
        setTimeout(() => {
            heart.style.transform = `translateY(-150px) translateX(${Math.random()*40-20}px) scale(0.5)`;
            heart.style.opacity = 0;
        }, 50);
        setTimeout(() => heart.remove(), duration + 50);
    }

    const heartInterval = setInterval(createFloatingHeart, 600);

    // Petals
    function createPetal() {
        const petal = document.createElement("div");
        petal.classList.add("petal");
        petal.innerHTML = "🌸";
        petal.style.left = Math.random() * window.innerWidth + "px";
        petal.style.fontSize = (Math.random() * 20 + 15) + "px";
        petal.style.animationDuration = (Math.random() * 4 + 4) + "s";
        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), 8000);
    }
    const petalInterval = setInterval(createPetal, 400);

    // Animate boxes one by one
    storyData.forEach((item, index) => {
        const box = document.createElement("div");
        box.classList.add("story-box");
        if (item.pinkTitle) {
            box.innerHTML = `<div class="emoji">${item.emoji}</div><div class="title pink">${item.title}</div><div class="text">${item.text}</div>`;
        } else {
            box.innerHTML = `<div class="emoji">${item.emoji}</div><div class="title">${item.title}</div><div class="text">${item.text}</div>`;
        }
        boxesContainer.appendChild(box);

        setTimeout(() => {
            box.classList.add("show");
            createSparkle(box);
        }, index * 1500);
    });

    // After last box, show future texts one after the other
    setTimeout(() => {
        futureTitle.style.opacity = 1;
        setTimeout(() => {
            futureText.style.opacity = 1;
        }, 1500);
    }, storyData.length * 1500 + 500);

    // After a delay, show ending animation
    setTimeout(() => {
        clearInterval(heartInterval);
        clearInterval(petalInterval);

        const endingDiv = document.createElement("div");
        endingDiv.style.position = "absolute";
        endingDiv.style.top = "50%";
        endingDiv.style.left = "50%";
        endingDiv.style.transform = "translate(-50%, -50%)";
        endingDiv.style.fontSize = "80px";
        endingDiv.innerHTML = "💖🌹✨";
        endingAnimation.appendChild(endingDiv);

        // Optional: slowly rotate and fade
        endingDiv.style.transition = "transform 5s ease, opacity 5s ease";
        setTimeout(() => {
            endingDiv.style.transform += " rotate(360deg) scale(1.5)";
            endingDiv.style.opacity = 0;
        }, 50);

    }, storyData.length * 1500 + 500 + 3000); // wait 5–6s after last text
});
