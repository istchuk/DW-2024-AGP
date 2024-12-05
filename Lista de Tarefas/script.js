// Seleciona elementos importantes do DOM
const ul = document.getElementsByTagName("ul")[0] // Lista de tarefas
const input = document.getElementById("taskInput") // Campo de entrada de novas tarefas
const themeToggle = document.querySelector('.tema') // Botão de alternância de tema
const body = document.body // Elemento body para mudança de tema

// Carrega tarefas do localStorage ou inicializa um array vazio
let tasks = JSON.parse(localStorage.getItem("tasks")) || []
// Contador para criar nomes de tarefas padrão
let diff = 1

// Evento de atalho de teclado para abrir contatos (Ctrl+H)
document.addEventListener('keydown', function (event) {
	if (event.ctrlKey && event.key === 'h') {
	  event.preventDefault(); // Previne a função padrão do navegador
	  showContatos(); // Abre a tela de contatos
	}
})

// Salva tarefas no localStorage antes de fechar a página
window.addEventListener("beforeunload", ()=>{
	localStorage.setItem("tasks", JSON.stringify(tasks))
})

// Alternância de tema (claro/escuro)
themeToggle.addEventListener('click', () => {
	body.classList.toggle('dark')

	// Salva preferência de tema no localStorage
	if (body.classList.contains('dark')) {
		localStorage.setItem('theme', 'dark')
	} else {
		localStorage.setItem('theme', 'light')
	}
})

// Carrega tema salvo ao carregar a página
window.addEventListener('load', () => {
	const savedTheme = localStorage.getItem('theme')
	if (savedTheme === 'dark') {
		body.classList.add('dark')
	}
})

// Salva tarefas no localStorage
const saveTasksLocalstorage = () => {
	localStorage.setItem("tasks", JSON.stringify(tasks))
}

// Adiciona nova tarefa
const addTask = () => {
	if (input.value.trim() != ""){
		// Verifica se a tarefa já existe
		if(tasks.find(t => t.taskInfo == input.value)){
			input.value = ''
			input.placeholder = 'Esta tarefa já existe!'
			return
		}
		else{
			// Adiciona nova tarefa
			tasks.push({taskInfo: input.value, check: false})
			input.value = ""
			input.placeholder = ""
		}
	}
	else{
		// Cria tarefa com nome padrão se o input estiver vazio
		tasks.push({taskInfo: `Nova tarefa ${diff}`, check: false})
		diff++
		input.placeholder = ""
	}
	renderTasks()
}

// Edita tarefa existente
const editTask = (taskInfo, span) => {
	// Encontra a tarefa a ser editada
	const task = tasks.find(t => t.taskInfo == taskInfo)
	span.contentEditable = true

	span.focus()

	// Evento de saída do foco para salvar edição
	span.addEventListener("blur", () => {
		// Impede tarefas duplicadas ou em branco
		if (tasks.find(t=>t.taskInfo == span.textContent) || span.textContent.trim() == ""){
			task.taskInfo = taskInfo
		}
		else{
			task.taskInfo = span.textContent.trim()
		}
		renderTasks()
	})
}

// Exclui tarefa
const delTask = (taskInfo) => {
	// Encontra índice da tarefa e remove
	const task = tasks.findIndex(t => t.taskInfo == taskInfo)
	if (task > -1){
		tasks.splice(task, 1)
		renderTasks()
	}
}

// Marca/desmarca tarefa como concluída
const checkHandle = (taskInfo, checkbox) => {
	// Encontra tarefa e atualiza status de conclusão
	const task = tasks.find(t => t.taskInfo == taskInfo)
	if (task){
		task.check = checkbox.checked
	}
	renderTasks()
}

// Renderiza lista de tarefas
const renderTasks = () => {
	// Limpa lista atual
	ul.innerHTML = ""
	// Recria lista com tarefas atualizadas
	for (const tsk of tasks){
		const {taskInfo, check} = tsk
		createLi(taskInfo, check)
	}
	saveTasksLocalstorage()
	updateProgressbar()
}

// Cria elemento de tarefa na lista
const createLi = (taskInfo, check) => {
	// Cria elementos para cada tarefa
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
	
	// Adiciona event listeners para interações
	del.addEventListener("click", ()=>{delTask(taskInfo)})
	edit.addEventListener("click", ()=>{editTask(taskInfo, span)})
	checkbox.addEventListener("change", ()=>{checkHandle(taskInfo, checkbox)})
	
	// Monta estrutura do elemento de tarefa
	li.appendChild(checkbox)
	span.appendChild(document.createTextNode(taskInfo))
	li.appendChild(span)
	li.appendChild(edit)
	li.appendChild(del)
	
	ul.appendChild(li)
}

// Atualiza barra de progresso
const updateProgressbar = () => {
	const pBar = document.getElementById("progress")
	const label = document.getElementById("progresslabel")
	
	// Calcula tarefas totais e concluídas
	const totalTasks = tasks.length
	const doneTasks = tasks.filter(task => task.check).length
	if (totalTasks != 0){
		// Atualiza barra de progresso e label
		pBar.value = (doneTasks / totalTasks) * 100
		label.textContent = `[${doneTasks}/${totalTasks}] tarefas concluidas`
	}
	else{
		// Reseta barra de progresso se não houver tarefas
		pBar.value = 0
		label.textContent = `Nenhuma tarefa à ser feita`
	}
}

// Mostra tela de contatos
function showContatos() {
	document.getElementById('card').style.display = "flex"
}

// Esconde tela de contatos
function hideContatos(){
	document.getElementById('card').style.display = "none"
}

// Renderiza tarefas iniciais ao carregar a página
renderTasks()