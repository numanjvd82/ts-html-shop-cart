// Get html elements
const sections = document.getElementById('sections') as HTMLSelectElement;
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const submitBtn = document.getElementById('btn-submit') as HTMLButtonElement;
const formContainer = document.getElementById(
  'form-container'
) as HTMLFormElement;

const fruitsAndVegs = document.getElementById(
  'fruits-and-vegetables'
) as HTMLDivElement;
const grocery = document.getElementById('grocery') as HTMLDivElement;
const others = document.getElementById('others') as HTMLDivElement;

// Types
type Sections = 'fruits-and-vegetables' | 'grocery' | 'others' | 'none';
type Todo = {
  id: string;
  text: string;
  section: Sections;
};

const fruitsAndVegsTodos: Todo[] = [];
const groceryTodos: Todo[] = [];
const othersTodos: Todo[] = [];

formContainer.addEventListener('submit', (e: Event) => {
  e.preventDefault();
});

document.addEventListener('click', (e: Event) => {
  const target = e.target as HTMLSpanElement;
  if (target.id === 'delete-btn') {
    const parentElementId = target.parentElement?.dataset.id;
    const section: Sections = target.parentElement?.parentElement
      ?.id as Sections;

    switch (section) {
      case 'fruits-and-vegetables':
        fruitsAndVegsTodos.splice(
          fruitsAndVegsTodos.findIndex((todo) => todo.id === parentElementId),
          1
        );
        break;
      case 'grocery':
        groceryTodos.splice(
          groceryTodos.findIndex((todo) => todo.id === parentElementId),
          1
        );
        break;
      case 'others':
        othersTodos.splice(
          othersTodos.findIndex((todo) => todo.id === parentElementId),
          1
        );
        break;
    }
    renderTodos();
  }
});

function todoTemplate(todo: Todo): string {
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
  const section = sections.value as Sections;

  if (todo.length === 0) {
    alert('Please enter a todo');
    return;
  }
  if (section === 'none') {
    alert('Please select a section');
    return;
  }

  const todoObj: Todo = {
    id: Date.now().toString(),
    text: todo,
    section,
  };

  if (section === 'fruits-and-vegetables') {
    fruitsAndVegsTodos.push(todoObj);
  } else if (section === 'grocery') {
    groceryTodos.push(todoObj);
  } else {
    othersTodos.push(todoObj);
  }

  renderTodos();

  todoInput.value = '';
  sections.value = 'none';
});

function renderTodos() {
  fruitsAndVegs.innerHTML = `
  ${fruitsAndVegsTodos.map((todo: Todo) => todoTemplate(todo)).join('')}
  `;

  grocery.innerHTML = `
  ${groceryTodos.map((todo: Todo) => todoTemplate(todo)).join('')}
  `;

  others.innerHTML = `
  ${othersTodos.map((todo: Todo) => todoTemplate(todo)).join('')}
  `;
}

console.log(fruitsAndVegsTodos, groceryTodos, othersTodos);
