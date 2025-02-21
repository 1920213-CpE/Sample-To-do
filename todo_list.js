document.addEventListener('DOMContentLoaded', () => {
    // Get references to the input field, add button, and task list
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    const loadTasks = () => {
        // Retrieve tasks from local storage and parse them as JSON
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        // Add each task to the DOM
        tasks.forEach(task => addTaskToDOM(task));
    };

    // Save tasks to local storage
    const saveTasks = () => {
        // Create an array to hold the tasks [ito yung mag hohold ng na add na values]
        const tasks = [];
        // Loop through each task item in the task list
        document.querySelectorAll('#taskList li').forEach(taskItem => {
            // Add the text content of each task to the array [add ng mga values sa added task]
            tasks.push(taskItem.querySelector('.task-text').textContent);
        });
        // Save the tasks array to local storage as a JSON string
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add task to the DOM
    const addTaskToDOM = (task) => {
        // Create a new list item element for the task
        const taskItem = document.createElement('li');
        
        // Create a span element for the task text
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task;
        // Append the task text to the list item
        taskItem.appendChild(taskText);

        // Create an edit button for the task
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-button';
        // Append the edit button to the list item
        taskItem.appendChild(editButton);

        // Create a delete button for the task
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        // Append the delete button to the list item
        taskItem.appendChild(deleteButton);

        // Append the list item to the task list
        taskList.appendChild(taskItem);

        // Add event listener to edit task
        editButton.addEventListener('click', () => {
            // Prompt the user to update the task text
            const newTask = prompt('Update the task:', taskText.textContent);
            if (newTask) {
                // Update the task text with the new value
                taskText.textContent = newTask;
                // Save the updated tasks to local storage
                saveTasks();
                // Show notification that the task has been edited
                showNotification('Task has been successfully edited!');
            }
        });

        // Add event listener to delete task
        deleteButton.addEventListener('click', () => {
            // Remove the task item from the DOM
            taskItem.remove();
            // Save the updated tasks to local storage
            saveTasks();
            // Show notification that the task has been deleted
            showNotification('Task has been successfully deleted!');
        });
    };

    // Show notification in an alert box
    const showNotification = (message) => {
        // Display an alert box with the provided message
        alert(message);
    };

    // Add task button event listener
    addTaskButton.addEventListener('click', () => {
        // Get the trimmed value of the task input field
        const task = taskInput.value.trim();
        if (task) {
            // Add the task to the DOM
            addTaskToDOM(task);
            // Save the updated tasks to local storage
            saveTasks();
            // Clear the input field
            taskInput.value = '';
            // Show notification that the task has been added
            showNotification('Task has been successfully added!');
        }
    });

    // Load tasks on page load
    loadTasks();
});