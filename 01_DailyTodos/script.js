document.addEventListener("DOMContentLoaded", () => {
  const todosKeys = 'todo-list';
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById('todo-input');
  const categorySelect = document.getElementById('category-select');
  const prioritySelect = document.getElementById('priority-select');
  const completedInput = document.getElementById('completed-input');
  const todoList = document.getElementById('todo-list');
  const categoryFilter = document.getElementById('category-filter');
  const priorityFilter = document.getElementById('priority-filter');

  let todos = JSON.parse(localStorage.getItem(todosKeys)) || [];

  function saveTodos() {
    localStorage.setItem(todosKeys, JSON.stringify(todos));
  }

  function renderTodos() {
    todoList.innerHTML = '';
    const filteredTodos = todos.filter(todo =>
      (categoryFilter.value === 'all' || todo.category === categoryFilter.value) &&
      (priorityFilter.value === 'all' || todo.priority === priorityFilter.value)
    );
    filteredTodos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.className = `todo-item ${todo.category} ${todo.priority}  ${todo.completed ? 'completed' : ''}`
      li.innerHTML = `
       <input type="checkbox" onchange="toggleCompleted(${index})" ${todo.completed ? 'checked' : ''}>
       <span>${todo.text}</span>
       <button onclick="deleteTodo(${index})">Delete</button>
      `
      todoList.appendChild(li);
    })
  }

  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText) {
      todos.push({
        text: todoText,
        category: categorySelect.value,
        priority: prioritySelect.value,
        completed: completedInput.checked
      })
      saveTodos();
      todoInput.value = '';
      completedInput.checked = false;
      renderTodos();
    }
  })


  window.toggleCompleted = (index) => {
    todos[index].completed =!todos[index].completed;
    saveTodos();
    renderTodos();
  }

  window.deleteTodo = (index) => {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
  }

  categoryFilter.addEventListener('change', renderTodos);
  priorityFilter.addEventListener('change', renderTodos);
  renderTodos();
})