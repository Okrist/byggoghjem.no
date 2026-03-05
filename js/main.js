document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = mobileBtn.querySelector('i');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Toggle icon between menu and X
        if (navLinks.classList.contains('active')) {
            menuIcon.setAttribute('data-lucide', 'x');
        } else {
            menuIcon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });

    // Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // DATO OG KLOKKESLETT
    const dagenavn = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'];
    const maanednavn = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'];

    function oppdaterDatoTid() {
        const naa = new Date();
        const dag = dagenavn[naa.getDay()];
        const dato = naa.getDate();
        const maaned = maanednavn[naa.getMonth()];
        const aar = naa.getFullYear();
        const timer = String(naa.getHours()).padStart(2, '0');
        const minutter = String(naa.getMinutes()).padStart(2, '0');
        const sekunder = String(naa.getSeconds()).padStart(2, '0');

        const dtElement = document.getElementById('datetime');
        if (dtElement) {
            dtElement.textContent = `${dag} ${dato}. ${maaned} ${aar} Kl. ${timer}:${minutter}:${sekunder}`;
        }
    }

    oppdaterDatoTid();
    setInterval(oppdaterDatoTid, 1000);

    // SESONGMELDING KAPASITET
    function oppdaterSesongmelding() {
        const naa = new Date();
        const maaned = naa.getMonth() + 1;
        const aar = naa.getFullYear();
        const container = document.getElementById('seasonalMessage');

        if (container) {
            container.innerHTML = `Per ${maanednavn[maaned - 1]} ${aar} har vi ledig kapasitet. Ta kontakt for en uforpliktende prat!`;
        }
    }
    oppdaterSesongmelding();

    // LIGHTBOX GALLERY
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-overlay h3').innerText;

            lightboxImg.src = img.src;
            lightboxCaption.innerText = caption;

            lightbox.classList.add('show');
            lucide.createIcons(); // refresh icons in case
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('show');
    });

    // Close when clicking outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('show');
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('show')) {
            lightbox.classList.remove('show');
        }
    });
});
