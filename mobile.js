document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');

    // ✅ Prevent errors if elements are missing
    if (!menuToggle || !navLinks || !menuOverlay) {
        console.warn("Menu elements missing. Check HTML structure.");
        return;
    }

    function toggleMenu() {
        const isActive = menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active', isActive);
        menuOverlay.classList.toggle('active', isActive);
        document.body.style.overflow = isActive ? 'hidden' : ''; // ✅ Prevent scrolling when menu is open
    }

    menuToggle.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    // ✅ Support touch events for iOS Safari
    menuToggle.addEventListener('touchstart', toggleMenu);
    menuOverlay.addEventListener('touchstart', toggleMenu);
});
