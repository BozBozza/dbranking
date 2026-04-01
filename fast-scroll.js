(function() {
    let targetPos = window.scrollY; // Where we want to go
    let currentPos = window.scrollY; // Where we are right now
    let isMoving = false;

    // --- SETTINGS ---
    const speedMultiplier = 4.0; // How far you travel (higher = faster)
    const smoothness = 0.2;     // How "heavy" the glide feels (0.01 to 0.2)
    // ----------------

    window.addEventListener('wheel', (e) => {
        // Prevent the "spring back" clash with the browser
        e.preventDefault();

        // Update the target destination based on scroll direction
        targetPos += e.deltaY * speedMultiplier;

        // Keep the target within the page boundaries
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        targetPos = Math.max(0, Math.min(targetPos, maxScroll));

        if (!isMoving) {
            update();
        }
    }, { passive: false });

    function update() {
        isMoving = true;

        // Linear Interpolation (Lerp)
        // We move a small percentage of the distance toward the target every frame
        const diff = targetPos - currentPos;
        currentPos += diff * smoothness;

        window.scrollTo(0, currentPos);

        // If we are close enough to the target, stop the loop
        if (Math.abs(diff) > 0.5) {
            requestAnimationFrame(update);
        } else {
            isMoving = false;
        }
    }
})();