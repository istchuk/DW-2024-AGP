const tasks = [
	{taskInfo: "Criar um documento HTML", check: true},
	{taskInfo: "Estilizar pelo css", check: true},
	{taskInfo: "Funcionalizar via javascript", check: true},
	{taskInfo: "Apresentar pro professor Liberty", check: false}
]

const ul = document.getElementsByTagName("ul")[0]
const input = document.getElementById("taskInput")

let diff = 1

const addTask = () => {
	if (input.value.trim() != ""){
		tasks.push({taskInfo: input.value, check: false})
		input.value = ""
	}
	else{
		tasks.push({taskInfo: `Nova tarefa ${diff}`, check: false})
		diff++
	}
	renderTasks()
}

const editLi = (taskInfo, span) => {
	const task = tasks.find(t => t.taskInfo == taskInfo)
	span.contentEditable = true

	span.focus()

	span.addEventListener("blur", () => {
		task.taskInfo = span.textContent.trim()
		renderTasks()
	})
}

const delLi = (taskInfo) => {
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
	
	del.addEventListener("click", ()=>{delLi(taskInfo)})
	edit.addEventListener("click", ()=>{editLi(taskInfo, span)})
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
	
	pBar.value = (doneTasks / totalTasks) * 100
}

updateProgressbar()
renderTasks()