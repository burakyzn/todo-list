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
