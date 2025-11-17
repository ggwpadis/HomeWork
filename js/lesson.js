//проверка номера
const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneSpan = document.querySelector('#phone_result');


//+996550644772
const reqExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.addEventListener('click', ()=>{
    if (reqExp.test(phoneInput.value)){
        phoneSpan.innerHTML = 'Этот номер существует';
        phoneSpan.style.color = 'green';
    }else {
        phoneSpan.innerHTML = 'Этот номер не существует';
        phoneSpan.style.color = 'red';
    }
})

const phoneInputRU = document.querySelector('#phone_input_ru');
const phoneButtonRU = document.querySelector('#phone_button_ru');
const phoneSpanRU = document.querySelector('#phone_result_ru');

const reqExpRU = /^\+7 9\d{2} \d{3}-\d{2}-\d{2}$/;

phoneButtonRU.addEventListener('click', () => {
    if (reqExpRU.test(phoneInputRU.value)) {
        phoneSpanRU.innerHTML = 'Этот номер существует';
        phoneSpanRU.style.color = 'green';
    } else {
        phoneSpanRU.innerHTML = 'Этот номер не существует';
        phoneSpanRU.style.color = 'red';
    }
});


//TAB SLIDER
const tabsContentCards = document.querySelectorAll('.tab_content_block');
const tabsItems = document.querySelectorAll('.tab_content_item');
const tabsItemsParents =  document.querySelector('.tab_content_items');


const hightTabsContentCards = () =>{
    tabsContentCards.forEach((tabsContentCard)=>{
        tabsContentCard.style.display = 'none'
    })
    tabsItems.forEach((tabItem)=>{
        tabItem.classList.remove('tab_content_item_active')
    })
}

const showTabsContentCards = (indexElement = 0)=>{
    tabsContentCards[indexElement].style.display = 'block';
    tabsItems[indexElement].classList.add('tab_content_item_active')
}

hightTabsContentCards();
showTabsContentCards();


tabsItemsParents.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')){
        tabsItems.forEach((tabItem, tabItemIndex)=>{
            if(event.target === tabItem){
                hightTabsContentCards()
                showTabsContentCards(tabItemIndex)
            }
        })
    }
}

let curretIndex = 0; // Первая вкладка
let intervalId; //Переменная для хранения интервала

//Ф-ция для автоматического переключения

const startAuthoSlider = ()=>{
    intervalId = setInterval(()=>{
        hightTabsContentCards();
        showTabsContentCards(curretIndex);
        curretIndex = (curretIndex +1) % tabsItems.length;
    }, 2000); // 2сек
}
//Запуск автослайдера
startAuthoSlider();

//Остановка слайдера при клике на вкладку

tabsItemsParents.onclick = (event) => {
    clearInterval(intervalId);
    if (event.target.classList.contains('tab_content_item')){
        tabsItems.forEach((tabItem, tabItemIndex) =>{
            if(event.target === tabItem){
                hightTabsContentCards();
                showTabsContentCards(tabItemIndex);
                curretIndex = tabItemIndex;
                startAuthoSlider();
            }
        })
    }
}

const somInput = document.getElementById("som");
const usdInput = document.getElementById("usd");
const eurInput = document.getElementById("eur");

// Курсы
const usdRate = 87;
const eurRate = 95;

function fromSom() {
    const som = parseFloat(somInput.value) || 0;
    usdInput.value = (som / usdRate).toFixed(2);
    eurInput.value = (som / eurRate).toFixed(2);
}

function fromUsd() {
    const usd = parseFloat(usdInput.value) || 0;
    somInput.value = (usd * usdRate).toFixed(2);
    eurInput.value = ((usd * usdRate) / eurRate).toFixed(2);
}

function fromEur() {
    const eur = parseFloat(eurInput.value) || 0;
    somInput.value = (eur * eurRate).toFixed(2);
    usdInput.value = ((eur * eurRate) / usdRate).toFixed(2);
}

// События
somInput.addEventListener("input", fromSom);
usdInput.addEventListener("input", fromUsd);
eurInput.addEventListener("input", fromEur);

const cars = [
    { img: "https://i.pinimg.com/736x/98/77/ef/9877ef9ba36e12396dd79c537355796b.jpg", text: "BMW sports car", number: 1 },
    { img: "https://i.pinimg.com/1200x/75/c4/c8/75c4c8a9bbba5a1dae4c1ae0b689ef26.jpg", text: "BMW luxury sedan", number: 2 },
    { img: "https://i.pinimg.com/736x/55/f4/03/55f4035ca1b10924e850dc3cccde0cc9.jpg", text: "Mersedes GT 63", number: 3 },
    { img: "https://i.pinimg.com/736x/c4/5f/ab/c45fabc32e3ca218ae36baef313d8c34.jpg", text: "Mersedes One", number: 4 }
];

let currentIndex = 0;

const cardImg = document.getElementById("card-img");
const cardText = document.getElementById("card-text");
const cardNumber = document.getElementById("card-number");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

function updateCard() {
    cardImg.src = cars[currentIndex].img;
    cardText.textContent = cars[currentIndex].text;
    cardNumber.textContent = cars[currentIndex].number;
}

btnPrev.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + cars.length) % cars.length;
    updateCard();
});

btnNext.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % cars.length;
    updateCard();
});

// Инициализация
updateCard();

const input = document.querySelector(".cityName");
const citySpan = document.querySelector(".city");
const tempSpan = document.querySelector(".temp");

const apiKey = "037ddd1608c2da91b90b21f91372e031";

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        const city = input.value.trim();
        if (!city) return;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error("Город не найден");
                return response.json();
            })
            .then(data => {
                citySpan.textContent = `Город: ${data.name}, ${data.sys.country}`;
                tempSpan.textContent = `Температура: ${data.main.temp.toFixed(1)}°C, ${data.weather[0].description}`;
            })
            .catch(err => {
                citySpan.textContent = "Ошибка!";
                tempSpan.textContent = err.message;
            });
    }
});
