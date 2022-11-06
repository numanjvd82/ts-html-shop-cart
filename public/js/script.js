"use strict";
// Get html elements
const sections = document.getElementById('sections');
const todoInput = document.getElementById('todo-input');
const submitBtn = document.getElementById('btn-submit');
const formContainer = document.getElementById('form-container');
const fruitsAndVegs = document.getElementById('fruits-and-vegetables');
const grocery = document.getElementById('grocery');
const others = document.getElementById('others');
const fruitsAndVegsTodos = [];
const groceryTodos = [];
const othersTodos = [];
formContainer.addEventListener('submit', (e) => {
    e.preventDefault();
});
document.addEventListener('click', (e) => {
    var _a, _b, _c;
    const target = e.target;
    if (target.id === 'delete-btn') {
        const parentElementId = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.dataset.id;
        const section = (_c = (_b = target.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.id;
        switch (section) {
            case 'fruits-and-vegetables':
                fruitsAndVegsTodos.splice(fruitsAndVegsTodos.findIndex((todo) => todo.id === parentElementId), 1);
                break;
            case 'grocery':
                groceryTodos.splice(groceryTodos.findIndex((todo) => todo.id === parentElementId), 1);
                break;
            case 'others':
                othersTodos.splice(othersTodos.findIndex((todo) => todo.id === parentElementId), 1);
                break;
        }
        renderTodos();
    }
});
function todoTemplate(todo) {
    return `<li data-id=${todo.id} class="flex items-center justify-between m-2">
    <span id="todo-value" class="text-2xl">${todo.text}</span>
    <span
      class="self-center px-2 py-1 mt-1 text-xl text-white bg-black rounded-md cursor-pointer"
      id="delete-btn"
      >X</span
    >
  </li>`;
}
submitBtn.addEventListener('click', () => {
    const todo = todoInput.value.trim();
    const section = sections.value;
    if (todo.length === 0) {
        alert('Please enter a todo');
        return;
    }
    if (section === 'none') {
        alert('Please select a section');
        return;
    }
    const todoObj = {
        id: Date.now().toString(),
        text: todo,
        section,
    };
    if (section === 'fruits-and-vegetables') {
        fruitsAndVegsTodos.push(todoObj);
    }
    else if (section === 'grocery') {
        groceryTodos.push(todoObj);
    }
    else {
        othersTodos.push(todoObj);
    }
    renderTodos();
    todoInput.value = '';
    sections.value = 'none';
});
function renderTodos() {
    fruitsAndVegs.innerHTML = `
  ${fruitsAndVegsTodos.map((todo) => todoTemplate(todo)).join('')}
  `;
    grocery.innerHTML = `
  ${groceryTodos.map((todo) => todoTemplate(todo)).join('')}
  `;
    others.innerHTML = `
  ${othersTodos.map((todo) => todoTemplate(todo)).join('')}
  `;
}
console.log(fruitsAndVegsTodos, groceryTodos, othersTodos);
