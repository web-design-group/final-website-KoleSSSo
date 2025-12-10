document.addEventListener("DOMContentLoaded", function() {
    var selectWrapper = document.querySelector(".custom-select-wrapper");
    var input = selectWrapper.querySelector("input");
    var dropdown = selectWrapper.querySelector(".custom-select-dropdown");
    var arrow = selectWrapper.querySelector(".select-arrow");
    var headerArrow = selectWrapper.querySelector(".header-arrow");
    var items = selectWrapper.querySelectorAll("li");

    selectWrapper.addEventListener("click", function(e){
    e.stopPropagation();
    var opened = dropdown.style.display === "block";
    dropdown.style.display = opened ? "none" : "block";
    selectWrapper.classList.toggle("opened", !opened);

    // Поворот стрелки и смена цвета
    arrow.style.transform = opened ? "rotate(0deg)" : "rotate(180deg)";
    arrow.style.filter = opened ? "invert(0)" : "invert(1)"; // <-- белая стрелка при открытии
    });

    // выбор элемента
    items.forEach(function(item){
        item.addEventListener("click", function(e){
            input.value = item.textContent;
            dropdown.style.display = "none";
            selectWrapper.classList.remove("opened");
            arrow.style.transform = "rotate(0deg)";
            e.stopPropagation(); // чтобы клик не закрыл что-то ещё
        });
    });

    // закрытие при клике вне
    document.addEventListener("click", function(){
        dropdown.style.display = "none";
        selectWrapper.classList.remove("opened");
        arrow.style.transform = "rotate(0deg)";
    });
});