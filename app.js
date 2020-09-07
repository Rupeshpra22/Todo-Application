//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//Functions


addTodo = (event, todo) => {
    //Prevent form from submitting
    event.preventDefault();

    //Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create li
    const newTodo = document.createElement('li');
    if (todoInput.value != "" || todo) {
        newTodo.innerText = todo ? todo : todoInput.value;
        newTodo.title = todo ? todo : todoInput.value;
        //ways of giving text to a element
        //newTodo.innerHTML="hey"
        //newTodo.append(document.createTextNode('hey'))
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //Add Todo to localStorage
        if (todo === undefined) {
            saveLocalTodos(todoInput.value);
        }

        //Check mark button
        const completedButton = document.createElement('button');
        //this will add text to button
        //completedButton.innerText="Completed"
        //This is how we can also add an element inside a element
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('completed-btn');
        todoDiv.appendChild(completedButton);

        //Check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        //Appending todoDiv to ul
        todoList.appendChild(todoDiv);
        todoInput.value = ""
    }
}

deleteCheck = (event) => {
    // event.target will give what exactly we are clicking on
    const item = event.target;
    //DELETE TODO
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        // with the below code, it looks the fall css
        // will apply and then it will get removed but actually
        // it doesnot behave like this, it just remove the list 
        // and the css animation is hardly visible
        // todo.classList.add('fall');
        // todo.remove();

        //with the css we have for fall though it looks we are
        //deleting the todo items but actually the element is still present
        //we just sets the opacity to 0
        //todo.classList.add('fall');
        todo.classList.add('fall');
        removeLocalStorageTodos(todo);
        //so we have to remove the todo list as soon as the transition
        //ends, for that we have special eventListener called
        //transitionend(for transition), we also have animationend(for animation)
        // so the below function will run just after the transition gets completed
        todo.addEventListener('transitionend', () => {
            todo.remove(); //to remove an element
        })


    }

    //CHECKMARK
    if (item.classList[0] === 'completed-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }
}

filterTodo = (event) => {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "Completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none'
                }
                break;
            case "Uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none'
                }
                break;
        }
    })
}

getTodosFromLocalStorage = () => {
    let todoList;
    if(localStorage.getItem('todos') === null){
        todoList = [];
        localStorage.setItem('todos', JSON.stringify(todoList));
        return todoList;
    } else {
        //if todo is already present get the todos from localStorage
        todoList = JSON.parse(localStorage.getItem('todos'));
        return todoList;
    }
}
//Storing Todolist in LocalStorage
saveLocalTodos = (todo) => {
    let todos = [];
    todos = getTodosFromLocalStorage();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}


getTodos = () => {
    let todos = getTodosFromLocalStorage();
    if(todos.length>0){
        todos.forEach((todo) => {
            addTodo(event, todo);
        })
    }
}

removeLocalStorageTodos = (todo) =>{
    let todos = getTodosFromLocalStorage();
    let todoName = todo.children[0].innerText;
    let indexOfTodo = todos.indexOf(todoName);
    todos.splice(indexOfTodo,1);
    localStorage.setItem('todos',JSON.stringify(todos));


}
//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
document.addEventListener('DOMContentLoaded', getTodos)


