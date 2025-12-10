document.addEventListener("DOMContentLoaded", function() {
    var calendarWrapper = document.querySelector(".custom-calendar-wrapper");
    var calendarInput = calendarWrapper.querySelector("input");
    var calendarPopup = calendarWrapper.querySelector(".custom-calendar");
    var grid = calendarPopup.querySelector(".calendar-grid");
    var monthName = calendarPopup.querySelector(".month-name");
    var prevBtn = calendarPopup.querySelector(".prev-month");
    var nextBtn = calendarPopup.querySelector(".next-month");

    var today = new Date();
    var currentMonth = today.getMonth();
    var currentYear = today.getFullYear();

    function renderCalendar(year, month){
        grid.innerHTML = "";
        monthName.textContent = new Date(year, month).toLocaleString('ru', {month: 'long', year: 'numeric'});

        // Первый день месяца (понедельник = 1)
        var firstDay = new Date(year, month, 1).getDay();
        if(firstDay === 0) firstDay = 7;

        var daysInMonth = new Date(year, month+1, 0).getDate();
        var prevMonthDays = new Date(year, month, 0).getDate();

        // Дни предыдущего месяца, чтобы заполнить первую неделю
        for(var i = firstDay-2; i >=0; i--){
            var day = document.createElement("div");
            day.textContent = prevMonthDays - i;
            day.className = "inactive";
            grid.appendChild(day);
        }

        // Дни текущего месяца
        for(var i = 1; i <= daysInMonth; i++){
            var day = document.createElement("div");
            day.textContent = i;
            day.className = "active";
            grid.appendChild(day);
        }

        // Дни следующего месяца, чтобы заполнить последнюю неделю
        var cellsInLastWeek = grid.children.length % 7;
        if(cellsInLastWeek !== 0){
            var nextMonthDays = 7 - cellsInLastWeek;
            for(var i = 1; i <= nextMonthDays; i++){
                var day = document.createElement("div");
                day.textContent = i;
                day.className = "inactive";
                grid.appendChild(day);
            }
        }
    }

    renderCalendar(currentYear, currentMonth);

    // Листание месяцев
    prevBtn.addEventListener("click", function(e){
        e.preventDefault();
        currentMonth--;
        if(currentMonth < 0){ currentMonth = 11; currentYear--; }
        renderCalendar(currentYear, currentMonth);
    });

    nextBtn.addEventListener("click", function(e){
        e.preventDefault();
        currentMonth++;
        if(currentMonth > 11){ currentMonth = 0; currentYear++; }
        renderCalendar(currentYear, currentMonth);
    });

    // Открытие/закрытие календаря
    calendarWrapper.addEventListener("click", function(e){
    if(!e.target.closest(".calendar-grid") && e.target.tagName.toLowerCase() !== "button"){
        var opened = calendarPopup.style.display === "block";
        calendarPopup.style.display = opened ? "none" : "block";
        calendarWrapper.classList.toggle("opened", !opened);
    }
    });

    grid.addEventListener("click", function(e){
    if(e.target.tagName.toLowerCase() === "div"){  // любой день
        var day = e.target.textContent;
        var month = currentMonth + 1;
        var year = currentYear;

        if(day.length < 2) day = '0' + day;
        if(month < 10) month = '0' + month;

        calendarInput.value = day + '.' + month + '.' + year;
        calendarPopup.style.display = "none";
        calendarWrapper.classList.remove("opened");

        e.stopPropagation(); // предотвращаем всплытие
    }
});

    // Закрытие при клике вне
    document.addEventListener("click", function(e){
        if(!calendarWrapper.contains(e.target)){
            calendarPopup.style.display = "none";
            calendarWrapper.classList.remove("opened");
        }
    });
});
// Модальное окно бронирования
var bookingBtn = document.querySelector(".rent-btn");
var modal = document.getElementById("bookingModal");
var modalMessage = document.getElementById("modalMessage");
var closeModal = modal.querySelector(".close");

bookingBtn.addEventListener("click", function(e){
    e.preventDefault();

    var surname = document.getElementById("surname").value.trim();
    var name = document.getElementById("name").value.trim();
    var room = document.getElementById("roomField").value.trim();
    var date = document.getElementById("dateField").value.trim();
    var phone = document.getElementById("phone").value.trim();

    // Очистим предыдущие классы
    modalMessage.className = "";

    if(surname && name && room && date && phone && room !== " " && date !== "ДД.ММ.ГГ"){
        // Успех
        modalMessage.classList.add("modal-success");
        modalMessage.innerHTML = "Бронирование успешно:)";
    } else {
        // Ошибка
        modalMessage.classList.add("modal-error-title");
        modalMessage.innerHTML = "Бронирование не прошло:(<br><br><span class='modal-error-text'>Пожалуйста, проверьте введённые данные</span>";
    }

    modal.style.display = "block";
});

// Закрытие при клике на крестик
closeModal.addEventListener("click", function(){
    modal.style.display = "none";
});

// Закрытие при клике вне модального окна
window.addEventListener("click", function(e){
    if(e.target === modal){
        modal.style.display = "none";
    }
});