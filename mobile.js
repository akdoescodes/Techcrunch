document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');

    // ✅ Prevent errors if elements are missing
    if (!menuToggle || !navLinks || !menuOverlay) {
        console.warn("Menu elements missing. Check HTML structure.");
        return;
    }

    function toggleMenu(event) {
        event.preventDefault(); // ✅ Prevent unwanted swipe behaviors
        event.stopPropagation(); // ✅ Stop event from bubbling

        const isActive = menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active', isActive);
        menuOverlay.classList.toggle('active', isActive);
        document.body.style.overflow = isActive ? 'hidden' : ''; // ✅ Prevent scrolling when menu is open
    }

    menuToggle.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    // ✅ Touch event fixes
    menuToggle.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent accidental gestures
        toggleMenu(e);
    }, { passive: false });

    menuOverlay.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent touch scrolling from closing menu
        toggleMenu(e);
    }, { passive: false });

    // ✅ Prevent swipe gestures from interfering
    navLinks.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
});
