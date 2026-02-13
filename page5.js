window.addEventListener("load", () => {
    const boxesData = [
        { text: "Tu es mon rayon de soleil", emoji: "☀️" },
        { text: "Avec toi, chaque jour est spécial", emoji: "🌟" },
        { text: "Tu me rends meilleur", emoji: "💗" },
        { text: "Je suis chanceux de t'avoir", emoji: "🥰" },
        { text: "Tu es ma personne préféré", emoji: "💖✨" },
        { text: "Mon coeur t'appartient", emoji: "❤️‍🔥" }
    ];

    const boxesContainer = document.querySelector(".boxes-container");
    const heartBtn = document.querySelector(".heart-btn");
    const finalText = document.querySelector(".final-text");

    let currentIndex = 0;

    // Petal effect
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

    // Floating hearts in background
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

    // Sparkle effect for boxes
    function createSparkle(box) {
        const sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");
        sparkle.style.width = "6px";
        sparkle.style.height = "6px";
        sparkle.style.background = "rgba(255,255,255,0.9)";
        sparkle.style.position = "absolute";
        sparkle.style.left = Math.random() * box.clientWidth + "px";
        sparkle.style.top = Math.random() * box.clientHeight + "px";
        sparkle.style.borderRadius = "50%";
        box.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1200);
    }

    // Sequential box reveal on heart button click
    heartBtn.addEventListener("click", () => {
        if (currentIndex < boxesData.length) {
            const data = boxesData[currentIndex];
            const box = document.createElement("div");
            box.classList.add("box");
            box.style.position = "relative"; // for sparkles

            box.innerHTML = `<div class="emoji">${data.emoji}</div><div class="title">${data.text}</div>`;
            boxesContainer.appendChild(box);

            // Animate box
            setTimeout(() => {
                box.classList.add("show");
                // sparkle
                createSparkle(box);
            }, 50);

            currentIndex++;

            // After last box, remove heart button and show final text
            if (currentIndex === boxesData.length) {
                setTimeout(() => {
                    heartBtn.style.display = "none";
                    finalText.style.display = "block";

                    setTimeout(() => {
                        clearInterval(petalInterval);
                        clearInterval(heartInterval);
                        document.body.style.transition = "opacity 2s ease";
                        document.body.style.opacity = 0;

                        setTimeout(() => {
                            window.location.href = "page6.html";
                        }, 2000);

                    }, 1500);
                }, 500);
            }
        }
    });
});
