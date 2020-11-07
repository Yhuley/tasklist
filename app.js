// DEFINE UI VARIABLES
const form = document.querySelector('.taskForm')
const taskList = document.querySelector('.collection')
const removeButton = document.querySelector('.removeTasks')
const filter = document.querySelector('.filterTasks')
const taskInput = document.querySelector('.taskInput')

// Add task
addTask = (event) => {
    if (taskInput.value.trim().length == 0) {
        alert("The field can`t be empty")
    } else {
        // Create li
        const li = document.createElement('li')
        // Add class
        li.className = 'collectionItem'
        // Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value.trim()))

        // Create removing item
        const remove = document.createElement('a')
        // Add class
        remove.className = 'deleteItem'
        // Add wastebasket icon
        remove.innerHTML = '\t&#128465;'

        // Append remove to item
        li.appendChild(remove)

        //Append li to ul
        taskList.appendChild(li)

        taskInput.value = ''
    }

    event.preventDefault()
}
// Remove task
removeTask = (event) => {
    if (event.target.className === 'deleteItem') {
        if (confirm('Are you sure?')) {
            event.target.parentElement.remove();
        }
    }
}
// Clear tasks
clearTasks = (event) => {
    if (taskList.childElementCount > 0){
        if (confirm('Are you really want to clear your task list?')) {
            while (taskList.firstChild) {
                taskList.firstChild.remove()
            }
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
            if(item.toLowerCase().indexOf(text) != -1){
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
})()