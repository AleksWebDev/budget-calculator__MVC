// DOM elements
const elements = {
    form: document.querySelector('#form'),
    title: document.querySelector('#title'),
    type: document.querySelector('#type'),
    value: document.querySelector('#value'),
    incomesList: document.querySelector('#incomes-list'),
    expensesList: document.querySelector('#expenses-list'),
    totalIncomeEl: document.querySelector('#total-income'),
    totalExpenseEl: document.querySelector('#total-expense'),
    budgetEl: document.querySelector('#budget'),
    percentWrapper: document.querySelector('#expense-percents-wrapper'),
    monthEl: document.querySelector('#month'),
    yearEl: document.querySelector('#year'),
}

// Форматирование цен в USD
const priceFormatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
})

// Functions 
//Checking empty fields 
function checkEmptyFields(){
    //Проверка полей на заполненость 
    if(title.value.trim() === ''){
        title.classList.add('form__input--error');
        return false;
    }else{
        title.classList.remove('form__input--error');
    }

    if(value.value.trim() === ''){
        value.classList.add('form__input--error');
        return false;
    }else{
        value.classList.remove('form__input--error');
    }

    return true;
}
//Rendering expendetures and incomes into the list item
function renderExpendetureAndIncoms(recodr){
    //Добавление в DOM разметку листа с доходами
    if(recodr.type === 'inc'){
        const html = `
        <li data-set="${recodr.id}" class="budget-list__item item item--income">
            <div class="item__title">${recodr.title}</div>
            <div class="item__right">
              <div class="item__amount">${priceFormatter.format(recodr.value)}</div>
              <button class="item__remove">
                <img src="./img/circle-green.svg" alt="delete" />
              </button>
            </div>
          </li>            
        `                     
        elements.incomesList.insertAdjacentHTML('afterbegin', html);
    }

    //Добавление в DOM разметку листа с рассходами
    if(recodr.type === 'exp'){
        const html = `
          <li data-set="${recodr.id}" class="budget-list__item item item--expense">
            <div class="item__title">${recodr.title}</div>
            <div class="item__right">
              <div class="item__amount">${priceFormatter.format(recodr.value)}</div>
              <button class="item__remove">
                <img src="./img/circle-red.svg" alt="delete" />
              </button>
            </div>
          </li>
        `
        elements.expensesList.insertAdjacentHTML('afterbegin', html);
    }
}

// Rendering total budget
function calculateBudget(summaryBudget){
    if(summaryBudget.expencePercents > 0){
        const html = `<div class="badge">% ${summaryBudget.expencePercents}</div>`;
        elements.percentWrapper.innerHTML = html;
    }else{
        elements.percentWrapper.innerHTML = "";
    }

    elements.budgetEl.innerHTML = priceFormatter.format(summaryBudget.totalBudget);
    elements.totalIncomeEl.innerHTML = '+ ' + priceFormatter.format(summaryBudget.totalInc);
    elements.totalExpenseEl.innerHTML = '+ ' + priceFormatter.format(summaryBudget.totalExp);
}





export {priceFormatter, elements, checkEmptyFields, renderExpendetureAndIncoms, calculateBudget};