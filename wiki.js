document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll(".menu-link");
    const cornerIcon = document.querySelector(".menu-corner-icon");

    // 1. ПЛАВНЫЙ СКРОЛЛ К РАЗДЕЛАМ СТАТЕЙ
    menuLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            if (!targetId || !targetId.startsWith('#')) return;
            
            const targetBlock = document.querySelector(targetId);
            if (targetBlock) {
                targetBlock.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        });
    });

    // 2. ФИЗИКА ПРЫЖКА С ПОДСВЕТКОЙ ДЛЯ ЗНАЧКА RIP.PNG
    if (cornerIcon) {
        cornerIcon.addEventListener("click", () => {
            cornerIcon.classList.remove("jump-active");
            void cornerIcon.offsetWidth; // Мгновенный сброс анимации для частых кликов
            cornerIcon.classList.add("jump-active");
        });
    }

    // 3. НЕЗАВИСИМЫЙ ДОГОНЯЮЩИЙ ПАРАЛЛАКС ДЛЯ МОНСТРОВ 14.PNG
    let currentY = 0; 
    let targetY = 0;  
    const speed = 0.2; 
    const ease = 0.1;  

    window.addEventListener("scroll", () => {
        targetY = window.scrollY * speed;
    });

    function animateBackground() {
        currentY += (targetY - currentY) * ease;
        document.body.style.setProperty('--scroll-y', `${currentY}px`);
        requestAnimationFrame(animateBackground);
    }
    animateBackground();
});
