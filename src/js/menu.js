document.addEventListener('DOMContentLoaded', function() {
    // Создаем меню
    const menu = document.createElement('div');
    menu.id = 'dropdown-menu';
    menu.innerHTML = `
        <div class="menu-header">
            <button id="close-menu">
                <img src="src/img/main-img/navbar.svg" alt="Закрыть меню" height="50px" width="50px">
            </button>
        </div>
        <nav class="menu-nav">
            <a href="index.html#about">О нас</a>
            <a href="rooms.html#rooms">Комнаты</a>
            <a href="index.html#tariffs">Тарифы</a>
            <a href="index.html">Правила</a>
            <a href="index.html">Контакты</a>
            <a href="rent.html">Бронирование</a>
            <a href="index.html">Пользовательское соглашение</a>
            <a href="index.html">Бонусная система</a>
        </nav>
    `;
    document.body.appendChild(menu);

    // Элементы DOM
    const navButton = document.querySelector('#nav-container button');
    const closeButton = document.getElementById('close-menu');
    const dropdownMenu = document.getElementById('dropdown-menu');

    // Функция открытия меню
    function openMenu() {
        const navRect = navButton.getBoundingClientRect();
        // Убираем расчет top, используем фиксированную позицию от верха
        dropdownMenu.style.right = (window.innerWidth - navRect.right) + 'px';
        dropdownMenu.classList.add('active');
    }

    // Функция закрытия меню
    function closeMenu() {
        dropdownMenu.classList.remove('active');
    }

    // Открытие меню по клику на кнопку
    navButton.addEventListener('click', function(e) {
        e.stopPropagation();
        openMenu();
    });

    // Закрытие меню по клику на крестик
    closeButton.addEventListener('click', function(e) {
        e.stopPropagation();
        closeMenu();
    });

    // Закрытие меню по клику вне меню
    document.addEventListener('click', function(e) {
        if (dropdownMenu.classList.contains('active') && 
            !dropdownMenu.contains(e.target) && 
            !navButton.contains(e.target)) {
            closeMenu();
        }
    });

    // Закрытие меню по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && dropdownMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Предотвращаем закрытие при клике внутри меню
    dropdownMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Обновляем позицию при ресайзе
    window.addEventListener('resize', function() {
        if (dropdownMenu.classList.contains('active')) {
            openMenu();
        }
    });
});