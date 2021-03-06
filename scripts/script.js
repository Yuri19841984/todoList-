' use strict ';
//jshint esversion:6

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = [];
console.log(todoData);
todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        comleted: false
    };

    if(headerInput.value !== ''){
        todoData.push(newTodo);
        headerInput.value = '';
    }
    render();
});

const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';

    if( todoData !== null){
        
        todoData.forEach(function(item){
                
            const li = document.createElement('li');
            li.classList.add('todo-item');

            li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' + 
            '</div>';

            todoRemove = li.querySelector('.todo-remove');
            todoRemove.addEventListener('click', function(){
                let index = todoData.indexOf(item);
                li.closest('ul').removeChild(li);
                todoData.splice(index , 1);
                render();
            }) ;

            if( item.comleted){
                todoCompleted.append(li);
            }else{
                todoList.append(li);
            }

            const btnTodoCompleted = li.querySelector('.todo-complete');
            btnTodoCompleted.addEventListener('click', function(){
                item.comleted = !item.comleted;
             render();
                
            });
        });
    }       
    
    

    localStorage.setItem('todoData', JSON.stringify(todoData));
    
};
const showTodoData = function(){
        let a = localStorage.getItem('todoData');

        if( a !== null){
        todoData = JSON.parse(a);
        render();
        }
    
};
showTodoData();

render();