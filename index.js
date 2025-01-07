const container = document.querySelector(".container");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const button = document.querySelector("#addButton");
const list = document.querySelector("#list");
const message = document.querySelector("#message");


const loadTodos = () =>{
    const todos = localStorage.getItem("mytodos")?JSON.parse(localStorage.getItem("mytodos")):[];
    todos.map((todo)=>{
        const todoElement = document.createElement("li");
        todoElement.id = todo.todoId;
        todoElement.classList.add("list-style");
        todoElement.innerHTML=
        `<span>${todo.todoValue}</span>
         <span><button class="btn" id="deleteButton"><i class="fa fa-trash"></i></button></span>
        `;
        list.appendChild(todoElement);

        todoElement.querySelector("#deleteButton").addEventListener("click",(event)=>{
            const selectedToDo = event.target.parentElement.parentElement.parentElement;
            list.removeChild(selectedToDo);
            message.textContent = "ToDo has been removed";
            message.classList.add("bg-success");
            setTimeout(()=>{
                message.textContent="";
                message.classList.remove("bg-success");
            },
                1000);
            let todos=localStorage.getItem("mytodos")?JSON.parse(localStorage.getItem("mytodos")):[];
            todos=todos.filter((todo)=>todo.todoId!=selectedToDo.id);
            localStorage.setItem("mytodos",JSON.stringify(todos));
        })
    })
}
window.addEventListener("DOMContentLoaded",loadTodos);

todoForm.addEventListener("submit",()=>{
    event.preventDefault();

    const todoValue = todoInput.value;
    
    const todoId=Date.now().toString();
    const todoElement = document.createElement("li");
    todoElement.id=todoId;
    todoElement.classList.add("list-style");
    todoElement.innerHTML=
    `<span>${todoInput.value}</span>
     <span><button class="btn" id="deleteButton"><i class="fa fa-trash"></i></button></span>
    `;

    list.appendChild(todoElement);

    message.textContent = "ToDo has been added";
    message.classList.add("bg-success");

    setTimeout(()=>{
        message.textContent="";
        message.classList.remove("bg-success");
    },
        1000);

    //adding to do to local storage
    const todos = localStorage.getItem("mytodos")?JSON.parse(localStorage.getItem("mytodos")):[];
    todos.push({todoId,todoValue});
    localStorage.setItem("mytodos",JSON.stringify(todos));
    todoInput.value="";
    //

    todoElement.querySelector("#deleteButton").addEventListener("click",(event)=>{
        const selectedToDo = event.target.parentElement.parentElement.parentElement;
        list.removeChild(selectedToDo);
        message.textContent = "ToDo has been removed";
        message.classList.add("bg-success");
        setTimeout(()=>{
            message.textContent="";
            message.classList.remove("bg-success");
        },
            1000);
        let todos=localStorage.getItem("mytodos")?JSON.parse(localStorage.getItem("mytodos")):[];
        todos=todos.filter((todo)=>todo.todoId!=selectedToDo.id);
        localStorage.setItem("mytodos",JSON.stringify(todos));
    })
})
