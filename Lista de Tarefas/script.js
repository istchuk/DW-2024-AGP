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
	del.classList.add('material-icons')
	del.appendChild(document.createTextNode('create'))
	const span = document.createElement('span')
	checkbox.type = "checkbox"
	checkbox.checked = check
	
	checkbox.addEventListener("change", function(){checkHandle(taskInfo, checkbox)})
	
	li.appendChild(checkbox)
	span.appendChild(document.createTextNode(taskInfo))
	li.appendChild(span)
	li.appendChild(del)
	li.appendChild(edit)
	
	ul.appendChild(li)
}

const editLi = () => {

}

const updateProgressbar = () => {
	const pBar = document.getElementsByTagName("progress")[0]
	
	const totalTasks = tasks.length
	const doneTasks = tasks.filter(task => task.check).length
	
	pBar.value = (doneTasks / totalTasks) * 100
}

const checkHandle = (taskInfo, checkbox) => {
	const task = tasks.find(t => t.taskInfo == taskInfo)
	if (task){
		task.check = checkbox.checked
	}
	renderTasks()
}

updateProgressbar()
renderTasks()