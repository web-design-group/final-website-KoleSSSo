//то, с чего мы начинаем
let currentIndex = 1;
showSlides(currentIndex);

function showSlides(n) {
    let slides = document.querySelectorAll('.slide');
    let dots = document.querySelectorAll('.dot');
    let slider = document.querySelector('.slider');
    
    if (n > slides.length) {
        currentIndex = 1;
    }
    if (n < 1) {
        currentIndex = slides.length;
    }
    

    //для передвижения элементов
    let translateValue = -(currentIndex - 1) * 100 + '%';
    slider.style.transform = 'translateX(' + translateValue + ')';

    //активная точка
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex - 1].classList.add('active');
    
}

function currentSlide(n) {
    showSlides(currentIndex = n);
}

//ожидание действие на кнопках
document.querySelector('.slider-btn.prev').addEventListener('click', () => {
    showSlides(currentIndex -= 1);
});

//ожидание действие на кнопках
document.querySelector('.slider-btn.next').addEventListener('click', () => {
    showSlides(currentIndex += 1);
});

//перелистывание по времени
let autoSlideInterval = setInterval(() => {
    currentIndex++;
    showSlides(currentIndex);
  }, 7000); // Перелистывание каждые 7 секунд