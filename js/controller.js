import * as view from './view.js'
//DOM
const form = document.querySelector('#form');
const title = document.querySelector('#title');
const type = document.querySelector('#type');
const value = document.querySelector('#value');
const incomesList = document.querySelector('#incomes-list');
const expensesList = document.querySelector('#expenses-list');

const totalIncomeEl = document.querySelector('#total-income');
const totalExpenseEl = document.querySelector('#total-expense');
const budgetEl = document.querySelector('#budget');
const percentWrapper = document.querySelector('#expense-percents-wrapper');

const monthEl = document.querySelector('#month');
const yearEl = document.querySelector('#year');

//Main Data
const budget = [];

//function
function calcBudget(){
    let totalInc = budget.reduce(function(acc, item){
        if(item.type === 'inc'){
            return acc + item.value;
        }else{
            return acc;
        }
    }, 0);

    let totalExp = budget.reduce(function(acc, item){
        if(item.type === 'exp'){
            return acc + item.value;
        }else{
            return acc;
        }
    }, 0);

    
    const totalBudget = totalInc - totalExp;
    let expencePercents = Math.floor((totalExp * 100) / totalInc);
    
    if(expencePercents > 0){
        const html = `<div class="badge">% ${expencePercents}</div>`;
        percentWrapper.innerHTML = html;
    }else{
        percentWrapper.innerHTML = "";
    }

    budgetEl.innerHTML = view.priceFormatter.format(totalBudget);
    totalIncomeEl.innerHTML = '+ ' + view.priceFormatter.format(totalInc);
    totalExpenseEl.innerHTML = '+ ' + view.priceFormatter.format(totalExp);
}

function displayMonth(){

    const now = new Date();
    const year = now.getFullYear();
    const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
        month: 'long'
    })

    const month = timeFormatter.format(now);

    timeFormatter.format(now);

    console.log(year);
    console.log(month);

    monthEl.innerHTML = month;
    yearEl.innerHTML = year;

}
displayMonth();

// clear form 
function clearForm(){
    form.reset();
}

//action
form.addEventListener('submit', function(e){
    e.preventDefault();

    const resultOfEmptyFields = view.checkEmptyFields();
    if(!resultOfEmptyFields){
        return;
    }

    //Расчет id в массиве
    let id = 1;

    if(budget.length > 0){
        //Получаем последний элемент в массиве 
        const lastElem = budget[budget.length - 1];
        //ID последнего элемента
        const idLastElem = lastElem.id;
        // Формируем новый id
        id = idLastElem + 1;
    }


    //Создание обьекта 
    let recodr = {
        id: id,
        type: type.value,
        title: title.value,
        value: parseInt(value.value), 
    }

    //Добавления данных в массив budget
    budget.push(recodr);

    view.renderExpendetureAndIncoms(recodr);

    clearForm();
    calcBudget();
})

//Удаление записей доходов и расходов со страницы
document.body.addEventListener('click', function(e){
    if(e.target.closest('button.item__remove')){
        const parentElem = e.target.closest('li.budget-list__item');
        const id = parentElem.dataset;

        const idxElem = budget.findIndex(function(elem){
            if(id === elem.id){
                return true;
            }
        })

        budget.splice(idxElem, 1);

        parentElem.remove();
        calcBudget();
    }
})