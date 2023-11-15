let currencyFrom = document.querySelector('.currencyFrom');
let currencyTo = document.querySelector('.currencyTo');
document.addEventListener("DOMContentLoaded", function () {
    let defaultCurrency = document.querySelector(".currency .selected");
    let handleCurrencyClick = (event) => {
        document.querySelectorAll(".currency button").forEach((button) => {
            button.classList.remove("selected");
        });
        event.target.classList.add("selected");
    };
    document.querySelectorAll(".currency button").forEach((button) => {
        button.addEventListener("click", handleCurrencyClick);
    });
    defaultCurrency.click();
});

document.addEventListener("DOMContentLoaded", function () {
    let defaultCurrencyButton = document.querySelector(".currency2 button:nth-child(2)");
    defaultCurrencyButton.classList.add("selected");

    // Valyuta düymələrinə klik hadisəsi əlavə edirik
    let currencyButtons = document.querySelectorAll(".currency2 button");

    currencyButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            // Seçilmiş düymənin üstündəki effekti silirik
            defaultCurrencyButton.classList.remove("selected");

            // Yeni seçilmiş düymənin üstündə seçilmiş effekti əlavə edirik
            button.classList.add("selected");

            // Yeni seçilmiş düyməni əsas düymə kimi təyin edirik
            defaultCurrencyButton = button;
        });
    });
});

let from = 'RUB'
let to = 'USD'
const apiKey = '4766e7989eab647f05dbfaa00850d3af'
let input1 = document.querySelector('.amount1')
let input2 = document.querySelector('.amount2')
async function Converter(type) {

    let apiUrl
    if(type == "input1"){
        amount = +input1.value
        apiUrl = `http://api.exchangerate.host/convert?access_key=${apiKey}&from=${from}&to=${to}&amount=${amount}`
    }
    else if(type == "input2"){
        amount = +input2.value
        apiUrl = `http://api.exchangerate.host/convert?access_key=${apiKey}&from=${to}&to=${from}&amount=${amount}`
    }
    const response = await fetch(apiUrl);
    const data = await response.json();
    if(type == "input1"){
        input2.value = data.result
    }
    else if(type == "input2"){
        input1.value = data.result
    }
    console.log(data.result)
    console.log(data)
    
    let apiUrl2 = `http://api.exchangerate.host/convert?access_key=${apiKey}&from=${from}&to=${to}&amount=1`
    const response2 = await fetch(apiUrl2);
    const data2 = await response2.json();
    currencyFrom.innerText = "1 "+from+" = "+data2.result+" "+to;               

    let apiUrl3 = `http://api.exchangerate.host/convert?access_key=${apiKey}&from=${to}&to=${from}&amount=1`
    const response3 = await fetch(apiUrl3);
    const data3 = await response3.json();
    currencyTo.innerText = "1 "+to+" = "+data3.result+" "+from;
}

input1.addEventListener('input', () => {
    Converter("input1")
})
input2.addEventListener('input', () => {
    Converter("input2")
})
function fromBtn(e) {
    from = e.target.id
    console.log(from)
    Converter("input")
}
function toBtn(e) {
    to = e.target.id
    console.log(to)
    Converter("input")

}
let btns = document.querySelectorAll('button')
btns.forEach(btn => {
    if ((btn.classList == 'from')||(btn.classList == 'from selected')) {
        btn.addEventListener('click', fromBtn)
    }
    else {
        btn.addEventListener('click',toBtn)
}
})