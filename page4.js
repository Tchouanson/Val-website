window.addEventListener("load", () => {
    const container = document.querySelector(".selected-container");

    // Retrieve selected activities from Page 3
    const selected = JSON.parse(localStorage.getItem("selectedActivities")) || [];

    // Mapping titles to emojis and description
    const activitiesData = {
        "Diner romantique": { emojis: "🍷🍴", description: "Une sortie aux chandelles, rien que nous deux." },
        "Soirée cinéma": { emojis: "🎬🍿", description: "Blottis sous une couverture devant un film" },
        "Petit-déjeuner au lit": { emojis: "☕🍵", description: "Croissants, café et câlins matinaux" },
        "Danser ensemble": { emojis: "💃🎵", description: "Dans le salon juste toi et moi" },
        "Regarder les étoiles": { emojis: "⭐🌙", description: "Compter les étoiles en pensant à nous" },
        "Surprends-moi !": { emojis: "🎁🎉", description: "Je te fais confiance pour me surprendre" }
    };

    // Function to create floating hearts
    function createFloatingHeart(x, y) {
        const heart = document.createElement("div");
        heart.classList.add("floating-heart");
        heart.innerHTML = "❤️";
        heart.style.left = x + "px";
        heart.style.top = y + "px";
        document.body.appendChild(heart);

        const duration = 2000 + Math.random() * 1000;
        heart.style.transition = `all ${duration}ms ease-out`;
        setTimeout(() => {
            heart.style.transform = `translateY(-100px) translateX(${Math.random()*40-20}px) scale(0.5)`;
            heart.style.opacity = 0;
        }, 50);

        setTimeout(() => heart.remove(), duration + 50);
    }

    // Function to create falling petals
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

    const petalInterval = setInterval(createPetal, 400); // continuous petals

    // Display selected boxes with animation
    selected.forEach((title, index) => {
        const data = activitiesData[title];
        const box = document.createElement("div");
        box.classList.add("selected-box");

        box.innerHTML = `
            <div class="emojis">${data.emojis}</div>
            <div class="title">${title}</div>
            <div class="description">${data.description}</div>
        `;

        container.appendChild(box);

        // Animate each box with delay
        setTimeout(() => {
            box.classList.add("fade-up");

            // Floating hearts around box
            const rect = box.getBoundingClientRect();
            for (let i = 0; i < 5; i++) {
                const x = rect.left + rect.width / 2 + (Math.random()*40-20);
                const y = rect.top + (Math.random()*20);
                createFloatingHeart(x, y);
            }

        }, index * 1200);
    });

    // After last box animation, wait a little and transition to next page
    setTimeout(() => {
        clearInterval(petalInterval); // stop petals

        document.body.style.transition = "opacity 2s ease";
        document.body.style.opacity = 0;

        setTimeout(() => {
            window.location.href = "page5.html"; // next page
        }, 2000);
    }, selected.length * 1200 + 2500);
});
