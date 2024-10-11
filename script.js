window.addEventListener('load', () => {
    const intro = document.getElementById('intro');
    const catalog = document.getElementById('catalog');

    intro.classList.add('visible');

    setTimeout(() => {
        intro.classList.remove('visible');
        intro.classList.add('hidden');

        setTimeout(() => {
            intro.style.display = 'none'
            catalog.classList.add('visible');
        }, 1000);
    }, 3000);
});