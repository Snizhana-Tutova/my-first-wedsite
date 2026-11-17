document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM повністю завантажено. JavaScript працює.");

    // 1. Інтерактивна навігація: підсвічування активного посилання в меню
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.style.color = 'var(--text-primary)';
            link.style.borderBottom = '1px solid var(--accent)';
        }
    });

    // 2. Перший інтерактивний компонент: Згортання / розгортання відгуку на сторінках книг
    const reviewBox = document.querySelector('.review-box');
    if (reviewBox) {
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = 'Сховати / показати відгук';
        toggleBtn.className = 'btn btn-secondary';
        toggleBtn.style.marginTop = '12px';
        toggleBtn.style.cursor = 'pointer';

        let isHidden = false;
        toggleBtn.addEventListener('click', () => {
            isHidden = !isHidden;
            reviewBox.style.display = isHidden ? 'none' : 'block';
            toggleBtn.textContent = isHidden ? 'Показати відгук автора' : 'Сховати відгук автора';
        });

        const actionButtons = document.querySelector('.action-buttons');
        if (actionButtons) {
            actionButtons.appendChild(toggleBtn);
        }
    }

    // 3. Другий інтерактивний компонент: Динамічний лічильник часу перебування на сторінці у футері
    let seconds = 0;
    const footerText = document.querySelector('.site-footer p');
    if (footerText) {
        const timerSpan = document.createElement('span');
        timerSpan.style.display = 'block';
        timerSpan.style.fontSize = '0.8rem';
        timerSpan.style.marginTop = '4px';
        footerText.appendChild(timerSpan);

        setInterval(() => {
            seconds++;
            timerSpan.textContent = `Час на сторінці: ${seconds} сек.`;
        }, 1000);
    }
});

// Додаємо взаємодію з REST API за допомогою Fetch, async/await
async function fetchBooks() {
    try {
        const response = await fetch('http://localhost:3000/api/books');
        if (!response.ok) throw new Error('Помилка завантаження даних');
        
        const booksData = await response.json();
        console.log("Дані з бази:", booksData);
        // Тут ми могли б динамічно рендерити картки, 
        // але для простоти лише виводимо отримані дані у консоль, 
        // підтверджуючи зв'язок клієнт-сервер.
    } catch (error) {
        console.error('Сталася помилка при отриманні книг:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Викликаємо функцію при завантаженні
    fetchBooks();
});