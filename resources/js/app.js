const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const years = [];
const todoMonthSelect = document.querySelector('#todoMonth');
const todoYearSelect = document.querySelector('#todoYear');
const todoDaySelect = document.querySelector('#todoDay');
const todoName = document.querySelector('#todoName');
const todoList = document.querySelector('#todo-list');

setup();

function addTodo(){
    let day = calculateTime(todoDaySelect.value, todoMonthSelect.value, todoYearSelect.value);

    let newTodo = document.createElement('div');
    newTodo.className = 'col-lg-3 card-col';
    newTodo.innerHTML += '<div class="card" style="width: 18rem;"><div class="card-img-top card-top">' + day + ' Day' +
    '<div class="card-body"><p class="card-text card-main">'+ todoName.value +'</p><input type="button" id="btnDelete" class="btn btn-primary" value="Delete"></div></div>';
    newTodo.id = "todo" + todoList.childElementCount;
    todoList.appendChild(newTodo);

    addTodoToLocal(todoName.value, todoDay.value, todoMonthSelect.value, todoYearSelect.value);
}

function getTodos() {
    let todos;
    todos = JSON.parse(localStorage.getItem("todos"));

    if(todos != null){
        for (let i = 0; i < todos.length;i++){

            let day = calculateTime(todos[i].todo_day,todos[i].todo_month,todos[i].todo_year);

            let newTodo = document.createElement('div');
            newTodo.className = 'col-lg-3 card-col';
            newTodo.innerHTML += '<div class="card" style="width: 18rem;"><div class="card-img-top card-top">' + day + ' Day' +
            '<div class="card-body"><p class="card-text card-main">'+ todos[i].todo_name +'</p><input type="button" id="btnDelete" class="btn btn-primary" value="Delete"></div></div>';
            newTodo.id = "todo" + todoList.childElementCount;
            todoList.appendChild(newTodo);
        }
    }
}

function addTodoToLocal(todoName, todoDay, todoMonth, todoYear){
    let todos;

    if (localStorage.getItem("todos") == null) {
        todos = [];
        
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push({
        todo_name : todoName,
        todo_day : todoDay,
        todo_month : todoMonth,
        todo_year : todoYear
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

function calculateTime(day,month,year){
    let date_today = new Date();
    let date_todo = new Date(year, month, day, 0, 0, 0, 0);

    let second = Math.floor((date_todo - date_today) / 1000);
    let minute = Math.floor(second / 60);
    let hour = Math.floor(minute / 60); 

    return Math.floor(hour / 24);
}

todoList.addEventListener("click", function(event){

    if(event.target.id= 'btnDelete' && event.target.className != 'card-text card-main'){
        todoList.removeChild(event.target.parentElement.parentElement.parentElement.parentElement);

        if (localStorage.getItem("todos") != null) {
            let todos = JSON.parse(localStorage.getItem("todos"));
            localStorage.clear();

            for (let i = 0 ; i < todos.length; i++){
                if(todos[i].todo_name == event.target.parentElement.firstChild.textContent){
                    todos.splice(i,1);
                    break;
                }
            }

            if (todos.length == 0)
                 localStorage.clear();

            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }
})

todoYearSelect.addEventListener('change',function(){
    todoMonthSelect.innerHTML = "";
    let this_year = new Date().getFullYear();

    if(this.value > this_year){
        for(let i = 0; i<months.length; i++){
            let newTempMonth = document.createElement('option');
            newTempMonth.value = i;
            newTempMonth.innerHTML = months[i];
            todoMonthSelect.appendChild(newTempMonth);
        }
    } else {
        let this_month = new Date().getMonth();
        for(let i = this_month; i<months.length; i++){
        let newTempMonth = document.createElement('option');
        newTempMonth.value = i;
        newTempMonth.innerHTML = months[i];
        todoMonthSelect.appendChild(newTempMonth);
        }
    }
})

function setup(){
    let this_year = new Date().getFullYear();

    for(let i = this_year; i<(this_year+5);i++){
        years.push(i);
    }

    let this_month = new Date().getMonth();
    for(let i = this_month; i<months.length; i++){
        let newTempMonth = document.createElement('option');
        newTempMonth.value = i;
        newTempMonth.innerHTML = months[i];
        todoMonthSelect.appendChild(newTempMonth);
    }
    
    for(let i = 0; i<years.length; i++){
        let newTempYear = document.createElement('option');
        newTempYear.value = years[i];
        newTempYear.innerHTML = years[i];
        todoYearSelect.appendChild(newTempYear);
    }
    
    for(let i = 0; i<31; i++){
        let newTempDay = document.createElement('option');
        newTempDay.value = i+1;
        newTempDay.innerHTML = i+1;
        todoDaySelect.appendChild(newTempDay);
    }

    getTodos();
}