
        // === CORAZONES FLOTANTES ===
        const heartsContainer = document.getElementById('floatingHearts');
        const heartEmojis = ['💕', '💖', '💗', '💝', '❤️', '💓'];

        function createHeart() {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heartsContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 7000);
        }

        setInterval(createHeart, 800);

        // === CARRUSEL ===
        const track = document.getElementById('carouselTrack');
        const slides = document.querySelectorAll('.carousel-slide');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const indicatorsContainer = document.getElementById('indicators');

        let currentSlide = 0;
        const totalSlides = slides.length;

        // Crear indicadores
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });

        const indicators = document.querySelectorAll('.indicator');

        function updateCarousel() {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateCarousel();
        }

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Auto-avance del carrusel
        let autoPlay = setInterval(nextSlide, 5000);

        // Pausar auto-avance al interactuar
        [prevBtn, nextBtn].forEach(btn => {
            btn.addEventListener('click', () => {
                clearInterval(autoPlay);
                autoPlay = setInterval(nextSlide, 5000);
            });
        });

        // === CONTROL DE AUDIO ===
        const audio = document.getElementById('backgroundMusic');
        const audioBtn = document.getElementById('audioBtn');
        let isPlaying = false;

        audioBtn.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                audioBtn.textContent = '🎵';
                audioBtn.classList.remove('playing');
            } else {
                audio.play();
                audioBtn.textContent = '🎶';
                audioBtn.classList.add('playing');
            }
            isPlaying = !isPlaying;
        });

        // Intentar reproducir automáticamente (algunos navegadores lo bloquean)
        window.addEventListener('load', () => {
            audio.play().then(() => {
                isPlaying = true;
                audioBtn.textContent = '🎶';
                audioBtn.classList.add('playing');
            }).catch(() => {
                // Si falla la reproducción automática, esperar clic del usuario
                console.log('Haz clic en el botón de música para activar el audio');
            });
        });