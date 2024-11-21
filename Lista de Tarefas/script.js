const tasks = [
	{taskInfo: "Limpar casa", check: true}
]

const ul = document.getElementsByTagName("ul")[0]
const input = document.getElementById("taskInput")

const addTask = function(){
	if (input.value.trim() != ""){
		tasks.push({taskInfo: input.value, check: false})
		input.value = ""
		renderTasks()
	}
	else{
		input.placeholder = "Insira uma tarefa"
	}
}

const renderTasks = function(){
	ul.innerHTML = ""
	for (const tsk of tasks){
		const {taskInfo, check} = tsk
		createLi(taskInfo, check)
	}
	updateProgressbar()
}

const createLi = function(taskInfo, check){
	const li = document.createElement("li")
	const checkbox = document.createElement("input")
	checkbox.type = "checkbox"
	checkbox.checked = check
		checkbox.addEventListener("change", function(){checkHandle(taskInfo, checkbox)})
	
	li.appendChild(checkbox)
	li.appendChild(document.createTextNode(taskInfo))
	
	ul.appendChild(li)
}

const updateProgressbar = function(){
	const pBar = document.getElementsByTagName("progress")[0]
	
	const totalTasks = tasks.length
	const doneTasks = tasks.filter(task => task.check).length
	
	pBar.value = (doneTasks / totalTasks) * 100
}

const checkHandle = function(taskInfo, checkbox){
	const task = tasks.find(t => t.taskInfo == taskInfo)
	if (task){
		task.check = checkbox.checked
	}
	renderTasks()
}

updateProgressbar()
renderTasks()