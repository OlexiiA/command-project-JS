const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
};

const bodyRef = document.querySelector('body');
const tollbar = document.querySelector('.toolbar')
const switcherRef = document.querySelector('.theme-switch__toggle');

function defaultTheme() {
    const defaultTheme = localStorage['Theme'];
    if (defaultTheme === Theme.DARK) {
        bodyRef.classList.add(Theme.DARK);
        switcherRef.checked = true;
    }
}

defaultTheme();

tollbar.addEventListener('change', onThemeChange);

function onThemeChange(e) {
    if (e.target.checked) {
        bodyRef.classList.remove(Theme.LIGHT);
        bodyRef.classList.add(Theme.DARK);
        localStorage.setItem('Theme', Theme.DARK);
    }
    else {
       bodyRef.classList.remove(Theme.DARK);
        bodyRef.classList.add(Theme.LIGHT);
        localStorage.setItem('Theme', Theme.LIGHT);
    }
}