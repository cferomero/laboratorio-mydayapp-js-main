const mainSection = document.getElementsByClassName('main')
const footerSection = document.querySelector('footer')
const listTask = document.querySelector('ul');
const textBarTasks = document.getElementById('new-todo')

// Handle Events
function setupEventListeners(){
  listTask.addEventListener('click', handleTasksClick)
  listTask.addEventListener('dblclick', handleDblTasksClick)
  footerSection.addEventListener('click', handleClickFooter)
}

function handleTasksClick(event){
  if(event.target.nodeName === 'BUTTON' && event.target.classList.contains('destroy')){
    removeTasks(event.target)
  }else if(event.target.nodeName === 'INPUT' && event.target.type === 'checkbox'){
    inputChecked(event.target)
  }
}

function handleDblTasksClick(evento){
  if(evento.target.nodeName === 'LABEL'){
    editTask(evento.target)
  }
}

function handleClickFooter(event){
  if(event.target.nodeName === 'BUTTON' && event.target.classList.contains('clear-completed')){
    clearComplete(event.target)
  }
}

function addTasks(event){
  const itemListTask = document.createElement('li')
  const subItemListTask = document.createElement('div')
  const inputTask = document.createElement('input')
  const labelTask = document.createElement('label')
  const buttonTask = document.createElement('button')
  const editButton = document.createElement('input')
  editButton.type = 'text'
  editButton.className = 'edit'

  if(event.key === 'Enter' && textBarTasks.value.trim() !== ''){
    subItemListTask.className = 'view'
    inputTask.type = 'checkbox'
    inputTask.className = 'toggle'
    buttonTask.className = 'destroy'
    labelTask.textContent = textBarTasks.value
    textBarTasks.value = ''
    subItemListTask.append(inputTask,labelTask,buttonTask)
    itemListTask.append(subItemListTask, editButton)
    listTask.appendChild(itemListTask)

    updateCounter('increment')
  }
}

function inputChecked(checkTask){
  const taskCheckedComplete = checkTask.parentElement.parentElement
  if(checkTask.checked){
    taskCheckedComplete.classList.add('completed')
    updateCounter('decrement')
  }else{
    taskCheckedComplete.classList.remove('completed')
    updateCounter('increment')
  }
}

function editTask(editTasks){
  const editTaskParentNode = editTasks.parentElement.parentElement
  const editTaskChildNode = editTasks.parentElement.parentElement.childNodes[1]
  editTaskParentNode.classList.add('editing')
  editTaskChildNode.value = editTasks.textContent

  editTaskChildNode.addEventListener('keyup', (event) => {
    if(event.key === 'Escape'){
      editTaskParentNode.classList.remove('editing')
    }else if(event.key === 'Enter'){
      editTaskParentNode.classList.remove('editing')
      editTasks.textContent = editTaskChildNode.value
    }
  })
}

function removeTasks(removeTask){
  if(!removeTask.parentElement.parentElement.classList.length){
    updateCounter('decrement')
  }
  listTask.removeChild(removeTask.parentElement.parentElement)
}


const filterTasksElement = document.querySelector('.filters')
filterTasksElement.addEventListener('click', (event) => {
  const targetElement = event.target
  if(targetElement.tagName === 'A'){
    filterTasks(targetElement.getAttribute('href'))
  }
})
function filterTasks(tasksFiltered){
  const tasks = listTask.querySelectorAll('li')
  tasks.forEach(item => {
    const tasksCompleted = item.classList.contains('completed')
    switch(tasksFiltered){
      case '#/pending':
        item.style.display = tasksCompleted ? 'none' : 'block'
        break
      case '#/completed':
        item.style.display = tasksCompleted ? 'block' : 'none'
        break
      default:
        item.style.display = 'block'
    }
  })
}

/**
 * delete tasks completed
 */
function clearComplete(){
  listTask.childNodes.forEach(item => {
    if(item.className === 'completed'){
      console.log('completados',item.childNodes[0].childNodes[1].textContent)
      console.log('completados',item.className)
      item.remove()
    }
  })
}

// increment and decrement the counter
function updateCounter(action){
  let taskLength = listTask.childNodes.length
  if(taskLength > 0){
    const counterSpan = document.getElementById('spanCounter')
    const counterTask = document.querySelector('strong')
    if(action === 'increment'){
      counterTask.textContent++
    }else if(action === 'decrement'){
      counterTask.textContent--
    }
    counterTask.textContent > 1 ? counterSpan.textContent = 'items left' : counterSpan.textContent = 'item left'  
  }
}

textBarTasks.addEventListener('keyup', addTasks)
setupEventListeners()
filterTasks()
