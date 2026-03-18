        let config = {};
        const audio = document.getElementById('wedding-audio');

        // 1. URL Personalization
        const urlParams = new URLSearchParams(window.location.search);
        const guestName = urlParams.get('to') || "Tamu Undangan";
        document.getElementById('personalized-to').innerText = `Kepada Yth. ${guestName}`;

        // Fetch Data
        fetch('data.json')
            .then(res => res.json())
            .then(data => {
                config = data;
                initApp();
            });

        function initApp() {
            // 1. Update Nama di Landing Page & Home Section & Footer
            const shortNameElements = ['landing-names', 'home-short-name', 'footer-couple-name'];
            shortNameElements.forEach(id => {
                const el = document.getElementById(id);
                if(el) el.innerText = config.shortName;
            });
            // Setup Hero
            document.getElementById('landing').style.backgroundImage = `url(${config.coupleImage})`;
            document.getElementById('landing-names').innerText = config.coupleName;
            document.body.style.setProperty('--bg-image', `url(${config.coverImage})`);
            document.getElementById('main-content').style.backgroundImage = `url(${config.coverImage})`;
            
            // Setup Pengantin
            document.getElementById('nama-pria').innerText = config.mempelaiPria.nama;
            document.getElementById('ortu-pria').innerText = config.mempelaiPria.putraDari;
            document.getElementById('foto-pria').src = config.mempelaiPria.foto;
            document.getElementById('nama-wanita').innerText = config.mempelaiWanita.nama;
            document.getElementById('ortu-wanita').innerText = config.mempelaiWanita.putriDari;
            document.getElementById('foto-wanita').src = config.mempelaiWanita.foto;
            document.getElementById('hadis-text').innerText = config.hadis;
            
            // Setup Story
            if(config.story.enabled) {
                config.story.items.forEach(item => {
                    document.getElementById('story-container').innerHTML += `
                        <div class="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gold/10" data-aos="fade-up">
                            <img src="${item.img}" class="w-full md:w-48 h-48 object-cover rounded-xl" alt="story">
                            <div>
                                <h4 class="text-gold font-bold">${item.date}</h4>
                                <h3 class="text-2xl font-elegant my-2">${item.title}</h3>
                                <p class="text-gray-600">${item.desc}</p>
                            </div>
                        </div>
                    `;
                });
            }

            // Setup Gallery
            config.gallery.forEach(img => {
                document.getElementById('gallery-slider').innerHTML += `
                    <img src="${img}" class="h-64 md:h-80 w-auto rounded-xl snap-center" alt="gallery" data-aos="zoom-in">
                `;
            });

            // Setup Events
            config.events.forEach(ev => {
                document.getElementById('events-container').innerHTML += `
                    <div class="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border-2 border-gold/20 shadow-xl" data-aos="flip-left">
                        <h3 class="font-elegant text-2xl text-gold mb-4">${ev.type}</h3>
                        <p class="font-bold mb-1">${ev.date}</p>
                        <p class="mb-4">${ev.time}</p>
                        <p class="text-sm font-semibold">${ev.place}</p>
                        <p class="text-xs text-gray-500 mb-6 italic">Dresscode: ${ev.dresscode}</p>
                        <a href="${ev.mapsUrl}" target="_blank" class="bg-gold text-white px-6 py-2 rounded-full text-sm inline-block">Google Maps</a>
                    </div>
                `;
            });

            // Setup Gifts
            config.gifts.forEach((gift, index) => {
                document.getElementById('gifts-container').innerHTML += `
                    <div class="bg-pink-50 p-8 rounded-2xl border border-gold/10 relative" data-aos="fade-up">
                        <img src="${gift.icon}" class="h-8 mx-auto mb-4" alt="bank">
                        <p class="text-xs uppercase tracking-widest mb-1">${gift.bank}</p>
                        <p class="font-bold text-lg mb-1">${gift.no}</p>
                        <p class="text-xs text-gray-500 mb-4">A/N ${gift.an}</p>
                        <button onclick="copyToClipboard('${gift.no}', this)" class="text-gold text-xs font-bold border-b-2 border-gold/30 hover:border-gold transition-all relative">
                            Salin Rekening
                            <span class="toast">Tersalin!</span>
                        </button>
                    </div>
                `;
            });

            // Setup Footer
            document.getElementById('footer-couple-name').innerText = config.coupleName;
            document.getElementById('tiktok-link').href = config.tiktokUrl;
            
            // Audio setup
            audio.src = config.music.url;
            
            // AOS Init
            AOS.init({ duration: 1000, once: true });
        }

        // Functions
        function startInvitation() {
            document.getElementById('landing').style.transform = "translateY(-100%)";
            const main = document.getElementById('main-content');
            main.classList.remove('hidden');
            setTimeout(() => {
                main.classList.add('opacity-100');
                if(config.music.enabled) {
                    audio.play();
                }
                if(config.enableFallingHearts) {
                    startFallingHearts();
                }
            }, 100);
            startCountdown();
        }

        function toggleMusic() {
            const btn = document.getElementById('music-icon');
            if (audio.paused) {
                audio.play();
                btn.innerText = "🎵";
            } else {
                audio.pause();
                btn.innerText = "🔇";
            }
        }

        function startFallingHearts() {
            const configH = config.heartConfig;
            for(let i=0; i < configH.count; i++) {
                createHeart(configH);
            }
        }

        function createHeart(cfg) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
            heart.style.color = cfg.colors[Math.floor(Math.random() * cfg.colors.length)];
            heart.style.animationDuration = (Math.random() * (cfg.speedMax - cfg.speedMin) + cfg.speedMin) + 's';
            heart.style.opacity = Math.random();
            
            document.body.appendChild(heart);
            
            heart.addEventListener('animationend', () => {
                heart.remove();
                createHeart(cfg);
            });
        }

        function startCountdown() {
            const target = new Date(config.weddingDate).getTime();
            const interval = setInterval(() => {
                const now = new Date().getTime();
                const dist = target - now;
                
                if (dist < 0) {
                    clearInterval(interval);
                    return;
                }

                document.getElementById('days').innerText = Math.floor(dist / (1000 * 60 * 60 * 24));
                document.getElementById('hours').innerText = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                document.getElementById('minutes').innerText = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
                document.getElementById('seconds').innerText = Math.floor((dist % (1000 * 60)) / 1000);
            }, 1000);
        }

        function copyToClipboard(text, btn) {
            navigator.clipboard.writeText(text);
            const toast = btn.querySelector('.toast');
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }

        // Scroll Observer for Navbar
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        window.addEventListener('scroll', () => {
            let current = "";
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });