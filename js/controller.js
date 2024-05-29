import * as view from './view.js'
//DOM
const form = document.querySelector('#form');
const title = document.querySelector('#title');
const type = document.querySelector('#type');
const value = document.querySelector('#value');

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

    const summaryBudget = {
        totalInc: totalInc,
        totalExp: totalExp,
        totalBudget: totalBudget,
        expencePercents: expencePercents,
    }

    view.calculateBudget(summaryBudget);
}

function displayMonth(){

    const now = new Date();
    const year = now.getFullYear();
    const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
        month: 'long'
    })

    const month = timeFormatter.format(now);

    timeFormatter.format(now);

    view.yearAndMonth({year, month});
}
displayMonth();



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

    const dataForm = view.getFormData();

    //Создание обьекта 
    let recodr = {
        id: id,
        type: dataForm.type,
        title: dataForm.title,
        value: dataForm.value, 
    }

    //Добавления данных в массив budget
    budget.push(recodr);

    view.renderExpendetureAndIncoms(recodr);

    view.clearForm();
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