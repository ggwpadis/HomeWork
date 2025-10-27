// Проверка Gmail
const gmailInput = document.getElementById('gmail_input');
const gmailButton = document.getElementById('gmail_button');
const gmailResult = document.getElementById('gmail_result');
const gmailRegExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

gmailButton.addEventListener('click', () => {
    const value = gmailInput.value.trim();
    if (gmailRegExp.test(value)) {
        gmailResult.textContent = 'Почта верна';
        gmailResult.style.color = 'green';
    } else {
        gmailResult.textContent = 'Почта не верна';
        gmailResult.style.color = 'red';
    }
});

// Проверка ИНН РФ
const innInput = document.getElementById('inn_input');
const innButton = document.getElementById('inn_button');
const innResult = document.getElementById('inn_result');
const innRegExp = /^\d{10}$|^\d{12}$/; 

innButton.addEventListener('click', () => {
    const value = innInput.value.trim();
    if (innRegExp.test(value)) {
        innResult.textContent = 'ИНН верен';
        innResult.style.color = 'green';
    } else {
        innResult.textContent = 'ИНН не верен';
        innResult.style.color = 'red';
    }
});
