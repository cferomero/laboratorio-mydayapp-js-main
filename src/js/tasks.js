// storage
export function localStorageFn(){
    const tasks = listTask.querySelectorAll('li')
    console.log(tasks)
    if(!tasks.length){
      console.warn('No tasks elements found in the list tasks')
      return
    }
    const dataTask = []
    tasks.forEach(item => {
      const content = item.textContent.trim()
      const completed = item.classList.contains('completed')
      if(content){
        dataTask.push(...[content, completed])
      }
    })
    try{
      localStorage.setItem('Tasks', JSON.stringify(dataTask))
      localStorage.getItem('Tasks')
    console.log(dataTask)
    }catch (error){
      console.error('Error to storaging tasks', error)
    }
    console.log(tasks)
  }

localStorageFn()
