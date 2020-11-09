// DEFINE UI VARIABLES
const form = document.querySelector('.taskForm')
const taskList = document.querySelector('.collection')
const removeButton = document.querySelector('.removeTasks')
const filter = document.querySelector('.filterTasks')
const taskInput = document.querySelector('.taskInput')

// Store task to local storage
storeTaskToLocalStorage = (task) => {
    let tasks
    if (localStorage.getItem('tasks') === null){
        tasks = []
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks))
}
// Remove task from local storage
removeTaskFromLocalStorage = (taskItem) => {
    let tasks
    if (localStorage.getItem('tasks') === null){
        tasks = []
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach((task) => {
            if (taskItem.textContent === task){
                tasks.splice(0, 1)
            }
        })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
// Get tasks from local storage
getTasks = () => {
    let tasks
    if (localStorage.getItem('tasks') === null){
        tasks = []
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(
        (task) => {
            // Create li
            const li = document.createElement('li')
            // Add class
            li.className = 'collectionItem'
            // Create text node and append to li
            li.appendChild(document.createTextNode(task.trim()))

            // Create removing item
            const remove = document.createElement('input')
            // Add class
            remove.className = 'deleteItem'
            // Add delete button
            remove.setAttribute('value','delete')

            // Append remove to item
            li.appendChild(remove)

            //Append li to ul
            taskList.appendChild(li)
        }
    )
}
// Clear tasks from local storage
clearTasksFromLocalStorage = () => {
    localStorage.clear()
}

// Add task
addTask = (event) => {
    if (taskInput.value.trim().length === 0) {
        alert("The field can`t be empty")
    } else {
        // Create li
        const li = document.createElement('li')
        // Add class
        li.className = 'collectionItem'
        // Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value.trim()))

        // Create removing item
        const remove = document.createElement('input')
        // Add class
        remove.className = 'deleteItem'
        // Add delete button
        remove.setAttribute('value','delete')

        // Append remove to item
        li.appendChild(remove)

        //Append li to ul
        taskList.appendChild(li)

        // Store to local storage
        storeTaskToLocalStorage(taskInput.value)

        taskInput.value = ''
    }

    event.preventDefault()
}
// Remove task
removeTask = (event) => {
    if (event.target.className === 'deleteItem') {
        if (confirm('Are you sure?')) {
            event.target.parentElement.remove();
            // Remove task from local storage
            removeTaskFromLocalStorage(event.target.parentElement)
        }
    }
}
// Clear tasks
clearTasks = () => {
    if (taskList.childElementCount > 0){
        if (confirm('Are you really want to clear your task list?')) {
            while (taskList.firstChild) {
                taskList.firstChild.remove()
            }
            clearTasksFromLocalStorage()
        }
    }else {
        alert('Nothing to delete')
    }
}
// Filter tasks
filterTasks = (event) => {
    const text = event.target.value.toLowerCase()

    document.querySelectorAll('.collectionItem').forEach(
        (task) => {
            const item = task.firstChild.textContent
            console.log(item)
            if(item.toLowerCase().indexOf(text) !== -1){
                task.style.display = 'block'
            }else{
                task.style.display = 'none'
            }
        }
    )
}
// Load all event listeners
(() => {
    form.addEventListener('submit', addTask)
    taskList.addEventListener('click', removeTask)
    removeButton.addEventListener('click', clearTasks)
    filter.addEventListener('keyup', filterTasks)
    document.addEventListener('DOMContentLoaded', getTasks)
})()