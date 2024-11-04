document.addEventListener('focusin', (event) => {
    if (event.target.type === 'password') {
        let icon = document.createElement('button');
        icon.textContent = '🔑';
        icon.style.position = 'absolute';
        icon.style.right = '10px';
        icon.style.top = event.target.offsetTop + 'px';
        icon.style.cursor = 'pointer';

        icon.onclick = () => {
            chrome.runtime.sendMessage({ action: 'open_password_generator' });
        };

        event.target.parentElement.appendChild(icon);
        event.target.addEventListener('focusout', () => icon.remove());
    }
});
