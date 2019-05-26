function addTodo(){
    // console.log("Gorev ekleniyor.");
    const todoName = document.querySelector('#todoName').value;
    const todoDay = document.querySelector('#todoDay').value;
    const todoList = document.querySelector('#todo-list');

    const newTodo = document.createElement('div');
    newTodo.className = 'col-lg-3 card-col';
    newTodo.innerHTML += '<div class="card" style="width: 18rem;"><div class="card-img-top card-top">' + todoDay +
    '<div class="card-body"><p class="card-text card-main">'+ todoName +'</p></div></div>';
    newTodo.id = "todo" + todoList.childElementCount;
    todoList.appendChild(newTodo);

    addTodoToLocal(todoName, todoDay);
    
}

function getTodos() {
    console.log("Gorevler cekiliyor.");
    let todos;
    const todoList = document.querySelector('#todo-list');
    todos = JSON.parse(localStorage.getItem("todos"));

    if(todos != null){
        console.log(todos);
        for (let i = 0; i < todos.length;i++){
            const newTodo = document.createElement('div');
            newTodo.className = 'col-lg-3 card-col';
            newTodo.innerHTML += '<div class="card" style="width: 18rem;"><div class="card-img-top card-top">' + todos[i].todo_day +
            '<div class="card-body"><p class="card-text card-main">'+ todos[i].todo_name +'</p></div></div>';
            newTodo.id = "todo" + todoList.childElementCount;
            todoList.appendChild(newTodo);
        }
    }
}

function addTodoToLocal(todoName, todoDay){
    let todos;

    if (localStorage.getItem("todos") == null) {
        todos = [];
        
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
       
    }

    var newObj = {
        todo_name : todoName,
        todo_day : todoDay
    }

    todos.push(newObj);

    localStorage.setItem("todos", JSON.stringify(todos));
}
