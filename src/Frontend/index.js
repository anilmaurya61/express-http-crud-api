async function fetchTodos() {
  const response = await fetch('/todos');
  const data = await response.json();
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';

  data.todos.forEach((todo) => {
    const listItem = document.createElement('li');
    let status = todo.isCompleted ? 'Completed' : 'Not Completed';
    listItem.innerHTML = `
            <span>${todo.text} <br> Status: ${status}</span>
            <button onclick="updateTodo(${todo.id})">Update</button>
            <button onclick="deleteTodo(${todo.id})">Delete</button>
        `;
    todoList.appendChild(listItem);
  });
}

// Function to create a new todo
async function createTodo() {
  const todoText = document.getElementById('todoText').value;
  const isCompleted = document.querySelector(
    'input[name="isCompleted"]:checked',
  ).value;
  if (!todoText) {
    alert('Todo text cannot be empty');
    return;
  }

  const response = await fetch('/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: todoText, isCompleted: isCompleted }, null, 2),
  });

  if (response.status === 201) {
    document.getElementById('addTodoForm').reset();
    fetchTodos();
  } else {
    alert('Failed to create a todo');
  }
}

// Function to update a todo
async function updateTodo(id) {
  const response = await fetch('/todos/' + id);
  const todo = await response.json();

  if (todo) {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';

    // Populate the input fields with the current todo information
    const updateTodoText = document.getElementById('updateTodoText');
    updateTodoText.value = todo.text;
    const updateIsCompletedYes = document.getElementById(
      'updateIsCompletedYes',
    );
    const updateIsCompletedNo = document.getElementById('updateIsCompletedNo');
    if (todo.iscompleted) {
      updateIsCompletedYes.checked = true;
    } else {
      updateIsCompletedNo.checked = true;
    }

    // Add an event listener to save the update
    const saveUpdate = document.getElementById('saveUpdate');
    saveUpdate.addEventListener('click', async () => {
      const updatedText = updateTodoText.value;
      const isCompleted = document.querySelector(
        'input[name="updateIsCompleted"]:checked',
      ).value;

      // Make an API call to update the todo
      const response = await fetch('/todos/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: updatedText, isCompleted: isCompleted }),
      });

      if (response.status === 200) {
        popup.style.display = 'none';
        fetchTodos();
        location.reload();
      } else {
        alert('Failed to update the todo');
      }
    });

    // Add an event listener to close the popup
    const closePopup = document.getElementById('closePopup');
    closePopup.addEventListener('click', function () {
      popup.style.display = 'none';
    });
  }
}

// Function to delete a todo
async function deleteTodo(id) {
  const response = fetch('/todos/' + id, {
    method: 'DELETE',
  });
  location.reload();
}

fetchTodos();
document.getElementById('addTodoForm').addEventListener('submit', function (e) {
  e.preventDefault();
  createTodo();
  location.reload();
});
