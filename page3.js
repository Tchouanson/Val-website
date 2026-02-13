const boxes = document.querySelectorAll(".activity-box");
const chooseText = document.querySelector(".choose-text");
const startBtn = document.querySelector(".start-btn");

let firstSelection = false;

boxes.forEach(box => {
    box.addEventListener("click", () => {

        box.classList.toggle("selected");

        // Floating hearts when selected
        if (box.classList.contains("selected")) {
            for (let i = 0; i < 5; i++) {
                const heart = document.createElement("div");
                heart.classList.add("floating-heart");
                heart.innerHTML = "❤️";
                document.body.appendChild(heart);

                const rect = box.getBoundingClientRect();
                heart.style.left = rect.left + rect.width / 2 + (Math.random()*20-10) + "px";
                heart.style.top = rect.top + "px";

                const duration = 2000 + Math.random()*1000;
                heart.style.transition = `all ${duration}ms ease-out`;
                setTimeout(() => {
                    heart.style.transform = `translateY(-100px) translateX(${Math.random()*40-20}px) scale(0.5)`;
                    heart.style.opacity = 0;
                }, 50);

                setTimeout(() => heart.remove(), duration + 50);
            }
        }

        if (!firstSelection) {
            firstSelection = true;
            chooseText.style.display = "none";
            startBtn.style.display = "inline-block";
            setTimeout(() => {
                startBtn.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 100);
        }
    });
});

// When clicking the "C'est parti" button
startBtn.addEventListener("click", () => {
    // Store selected titles in localStorage
    const selectedTitles = [];
    boxes.forEach(box => {
        if (box.classList.contains("selected")) {
            const title = box.querySelector(".title").textContent.trim();
            selectedTitles.push(title);
        }
    });
    localStorage.setItem("selectedActivities", JSON.stringify(selectedTitles));

    // Fade out and go to next page
    document.body.style.transition = "opacity 1.5s ease";
    document.body.style.opacity = 0;

    setTimeout(() => {
        window.location.href = "page4.html"; // next page
    }, 1500);
});
