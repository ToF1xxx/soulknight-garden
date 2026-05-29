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

    // 2. ФИЗИКА ПРЫЖКА С ПОДСВЕТКОЙ И ЭПИЧЕСКАЯ ПАСХАЛКА
    if (cornerIcon) {
        let ripClicks = 0;
        let ledTimeout = null;

        cornerIcon.addEventListener("click", () => {
            // Мгновенно активируем прыжок и подсветку
            cornerIcon.classList.remove("jump-active");
            cornerIcon.classList.remove("fade-light");
            void cornerIcon.offsetWidth; 
            cornerIcon.classList.add("jump-active");

            // Очищаем старый таймер гашения при частых кликах
            if (ledTimeout) clearTimeout(ledTimeout);

            // Подсветка гаснет ровно через 0.5 секунд (полсекунды)
            ledTimeout = setTimeout(() => {
                cornerIcon.classList.add("fade-light");
            }, 500);

            ripClicks++;
            if (ripClicks === 6) {
                if (ledTimeout) clearTimeout(ledTimeout);
                activateDarkScreamer();
                ripClicks = 0; 
            }
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

    // ==========================================================================
    // ЛОГИКА ДИАЛОГОВ И СЦЕНАРИЙ ПАСХАЛКИ
    // ==========================================================================

    const darkPhrases = [
        "???: .",
        "???: ..",
        "???: ..."
    ];

    const humanPhrases = [
        "???: Оу",
        "???: Ты пробудил древнюю силу",
        "???: А древняя сила - это я",
        "???: За то что ты достал меня из заточения",
        "???: .",
        "???: ..",
        "???: ...",
        "???: Держи это: "
    ];

    const soulKnightCodes = ["100000", "SKGIFT", "SKNIGHT", "SUPER5", "DUOSHOU", "DRUID", "SKBACK"];

    let currentPhraseIdx = 0;
    let dialogBox = null;
    let isSecondDialog = false;
    let currentCodeText = "";

    function activateDarkScreamer() {
        window.scrollTo(0, 0);
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        
        // Включаем жесткую тряску сайта
        document.body.classList.add('screamer-active');

        if (cornerIcon) {
            cornerIcon.src = 'dark.png';
            cornerIcon.classList.add('amulet-corrupted');
        }

        setTimeout(() => {
            if (cornerIcon) {
                cornerIcon.src = 'rip.png';
                cornerIcon.classList.remove('amulet-corrupted');
                cornerIcon.classList.remove('jump-active');
                cornerIcon.classList.remove('fade-light');
            }
            
            // Добавляем только черный экран, тряска продолжается
            document.body.classList.add('screen-blackout');

            setTimeout(() => {
                startFirstDialog();
            }, 1000);
        }, 4000);
    }

    // Функция для обновления текста внутри окна. Разметка Путника вкладывается прямо внутрь!
    function updateDialogText(text) {
        if (!dialogBox) return;
        
        // Если идет второй диалог, добавляем тег img внутрь самого окна
        const avatarHtml = isSecondDialog ? `<img src="human.png" class="human-avatar-image" alt="traveler">` : '';
        
        dialogBox.innerHTML = `
            ${avatarHtml}
            <span class="dialog-main-text">${text}</span>
            <div class="dialog-hint-text">нажмите в любом месте чтобы продолжить</div>
        `;
    }

    // Запуск первой части (Диалог Бездны в темноте с тряской)
    function startFirstDialog() {
        currentPhraseIdx = 0;
        isSecondDialog = false;

        dialogBox = document.createElement('div');
        dialogBox.className = 'game-dialog-box';
        document.body.appendChild(dialogBox);
        
        updateDialogText(darkPhrases[currentPhraseIdx]);

        document.addEventListener('click', advanceDialog);
    }

    // Запуск второй части (Белый экран + Путник)
    function startSecondDialog() {
        isSecondDialog = true;
        currentPhraseIdx = 0;

        // ЭКРАН БЕЛЕЕТ -> ОТКЛЮЧАЕМ ТРЯСКУ БЕЗДНЫ
        document.body.classList.remove('screamer-active');
        document.body.classList.remove('screen-blackout');
        document.body.classList.add('screen-whiteout');

        const randomCode = soulKnightCodes[Math.floor(Math.random() * soulKnightCodes.length)];
        currentCodeText = "???: Держи это: " + randomCode;

        // Создаем окно диалога (без классов смещения, строго по центру экрана)
        dialogBox = document.createElement('div');
        dialogBox.className = 'game-dialog-box';
        document.body.appendChild(dialogBox);
        
        updateDialogText(humanPhrases[currentPhraseIdx]);

        setTimeout(() => {
            document.addEventListener('click', advanceDialog);
        }, 100);
    }

    // Переключение фраз по клику в любое место экрана
    function advanceDialog(e) {
        if (!dialogBox) return;

        currentPhraseIdx++;

        if (!isSecondDialog) {
            // Листаем первый диалог
            if (currentPhraseIdx < darkPhrases.length) {
                updateDialogText(darkPhrases[currentPhraseIdx]);
            } else {
                document.removeEventListener('click', advanceDialog);
                dialogBox.remove();
                dialogBox = null;
                startSecondDialog();
            }
        } else {
            // Листаем второй диалог (с Путником)
            if (currentPhraseIdx < humanPhrases.length) {
                if (currentPhraseIdx === humanPhrases.length - 1) {
                    updateDialogText(currentCodeText);
                } else {
                    updateDialogText(humanPhrases[currentPhraseIdx]);
                }
            } else {
                // ИГРОК КЛИКНУЛ НА ПОСЛЕДНЕЙ ФРАЗЕ С КОДОМ -> ЗАПУСКАЕМ КОСМИЧЕСКИЙ ПОРТАЛ
                document.removeEventListener('click', advanceDialog);
                
                dialogBox.style.pointerEvents = "none";

                const transitionCurtain = document.createElement('div');
                transitionCurtain.className = 'transition-curtain';
                document.body.appendChild(transitionCurtain);

                setTimeout(() => {
                    if (dialogBox) { dialogBox.remove(); dialogBox = null; }
                    
                    document.body.classList.remove('screen-whiteout');
                    
                    const iconInMenu = document.querySelector(".menu-corner-icon");
                    if (iconInMenu) {
                        iconInMenu.remove();
                    }

                    document.body.style.overflow = "";
                    document.documentElement.style.overflow = "";

                    setTimeout(() => {
                        transitionCurtain.classList.add('curtain-open');
                        setTimeout(() => {
                            transitionCurtain.remove();
                        }, 600);
                    }, 600);

                }, 600);
            }
        }
    }
});
