let todolistesi = document.querySelector('#todo-listem');

todolistesi.addEventListener("click", function(event){

    if(event.originalTarget.className == 'fa fa-remove'){
        console.log('dogru');
        console.log(event.target.parentElement.parentElement);

            todolistesi.removeChild(event.target.parentElement.parentElement);
        
        let todolar;

        if(localStorage.getItem("todolar") != null){
            todolar = JSON.parse(localStorage.getItem("todolar"));

            localStorage.clear();

            let index = todolar.indexOf(event.target.parentElement.parentElement.textContent);
            if (index !== -1)
            todolar.splice(index, 1);
            
            if(todolar.length == 0)
            localStorage.clear();
        
            localStorage.setItem("todolar", JSON.stringify(todolar));
        }      
    }

})


let todolariCek = function () {
    console.log("Gorevler cekiliyor.");
    let todolar;

    const todoList = document.querySelector('#todo-listem');

    todolar = JSON.parse(localStorage.getItem("todolar"));

    if(todolar != null){
        console.log(todolar);
        for (let i = 0; i < todolar.length;i++){
            const yeniTodo = document.createElement('li');
            yeniTodo.className = 'list-group-item d-flex justify-content-between todos';
            yeniTodo.appendChild(document.createTextNode(todolar[i]));
            yeniTodo.innerHTML += '<a href = "#" class ="delete-item"><i class="fa fa-remove"></i></a>';
            yeniTodo.id = "todo" + todoList.childElementCount;
            todoList.appendChild(yeniTodo);
        }
    }
}

let todoEkle = function(){
    console.log("Gorev ekleniyor.");

    let todolar;

    const todoAd = document.querySelector('#todoName').value;
    const todoList = document.querySelector('#todo-listem');

    const yeniTodo = document.createElement('li');
    yeniTodo.className = 'list-group-item d-flex justify-content-between todos';
    yeniTodo.appendChild(document.createTextNode(todoAd));
    yeniTodo.innerHTML += '<a href = "#" class ="delete-item"><i class="fa fa-remove"></i></a>';
    yeniTodo.id = "todo" + todoList.childElementCount;
    todoList.appendChild(yeniTodo);

    if(localStorage.getItem("todolar") == null){
        todolar = [];
    } else {
        todolar = JSON.parse(localStorage.getItem("todolar"));
    }

    todolar.push(yeniTodo.textContent);

    localStorage.setItem("todolar", JSON.stringify(todolar));
}

