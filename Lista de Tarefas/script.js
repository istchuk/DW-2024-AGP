let tasks
try {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [
        { taskInfo: "Criar um documento HTML", check: true },
        { taskInfo: "Estilizar pelo CSS", check: true },
        { taskInfo: "Funcionalizar via JavaScript", check: true },
    ]
} catch (e) {
    tasks = [
        { taskInfo: "Criar um documento HTML", check: true },
        { taskInfo: "Estilizar pelo CSS", check: true },
        { taskInfo: "Funcionalizar via JavaScript", check: true },
    ]
}


const ul = document.getElementsByTagName("ul")[0]
const input = document.getElementById("taskInput")

let diff = 1

const addTask = () => {
	if (input.value.trim() != ""){
		if(tasks.find(t => t.taskInfo == input.value)){
			input.value = ''
			input.placeholder = 'Esta tarefa já existe!'
			return
		}
		else{
			tasks.push({taskInfo: input.value, check: false})
			input.value = ""
			input.placeholder = ""
		}
	}
	else{
		tasks.push({taskInfo: `Nova tarefa ${diff}`, check: false})
		diff++
		input.placeholder = ""
	}
	renderTasks()
}

const editTask = (taskInfo, span) => {
	const task = tasks.find(t => t.taskInfo == taskInfo)
	span.contentEditable = true

	span.focus()

	span.addEventListener("blur", () => {
		if (tasks.find(t=>t.taskInfo == span.textContent) || span.textContent.trim() == ""){
			task.taskInfo = taskInfo
		}
		else{
			task.taskInfo = span.textContent.trim()
		}
		renderTasks()
	})
}

const delTask = (taskInfo) => {
	const task = tasks.findIndex(t => t.taskInfo == taskInfo)
	if (task > -1){
		tasks.splice(task, 1)
		renderTasks()
	}
}

const checkHandle = (taskInfo, checkbox) => {
	const task = tasks.find(t => t.taskInfo == taskInfo)
	if (task){
		task.check = checkbox.checked
	}
	renderTasks()
}

const renderTasks = () => {
	ul.innerHTML = ""
	for (const tsk of tasks){
		const {taskInfo, check} = tsk
		createLi(taskInfo, check)
	}
	updateProgressbar()
}

const createLi = (taskInfo, check) => {
	const li = document.createElement("li")
	const checkbox = document.createElement("input")
	const del = document.createElement("i")
	del.classList.add('material-icons')
	del.appendChild(document.createTextNode('delete_sweep'))
	const edit = document.createElement("i")
	edit.classList.add('material-icons')
	edit.appendChild(document.createTextNode('create'))
	const span = document.createElement('span')
	checkbox.type = "checkbox"
	checkbox.checked = check 
	if (check){
		span.classList.add("checked")
	}
	
	del.addEventListener("click", ()=>{delTask(taskInfo)})
	edit.addEventListener("click", ()=>{editTask(taskInfo, span)})
	checkbox.addEventListener("change", ()=>{checkHandle(taskInfo, checkbox)})
	
	li.appendChild(checkbox)
	span.appendChild(document.createTextNode(taskInfo))
	li.appendChild(span)
	li.appendChild(edit)
	li.appendChild(del)
	
	ul.appendChild(li)
}

const updateProgressbar = () => {
	const pBar = document.getElementsByTagName("progress")[0]
	
	const totalTasks = tasks.length
	const doneTasks = tasks.filter(task => task.check).length
	if (totalTasks != 0){
		pBar.value = (doneTasks / totalTasks) * 100
	}
	else{
		pBar.value = 0
	}
	
}

const themeToggle = document.querySelector('.tema')
const body = document.body

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark')

    if (body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark')
    } else {
        localStorage.setItem('theme', 'light')
    }
})

window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
        body.classList.add('dark')
    }
})


function showContatos() {
	document.getElementById('card').style.display = "flex"
}

function hideContatos(){
	document.getElementById('card').style.display = "none"
}

document.addEventListener('keydown', function (event) {
	if (event.ctrlKey && event.key === 'h') {
	  event.preventDefault(); // Evita a função padrão do navegador (como abrir o histórico)
	  showContatos(); // Abre a tela contatos
	}
  })

window.addEventListener("beforeunload", ()=>{
	localStorage.setItem("tasks", JSON.stringify(tasks))
})

renderTasks()