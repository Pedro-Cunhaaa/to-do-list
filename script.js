const entradaTarefa = document.getElementById('tarefa');
const adicionarTarefa = document.getElementById('adicionarTarefa');
const listaTarefa = document.getElementById('listaTarefa');
const botaoLimparTarefa = document.getElementById('limparTarefas');

const tarefasSalvasJSON = localStorage.getItem('tarefas'); 
const tarefasSalvas = tarefasSalvasJSON ? JSON.parse(tarefasSalvasJSON) : [];

for (const textoTarefa of tarefasSalvas) {
    adicionarTarefaLista(textoTarefa);
}

function adicionarTarefaLista(textoTarefa) {
    const li = document.createElement('li');
    
    li.textContent = textoTarefa;
    
    const deletarBotao = document.createElement('button');
    deletarBotao.textContent = 'Delete'; // Texto do botão
    deletarBotao.addEventListener('click', () => {
        listaTarefa.removeChild(li); 
        atualizarLocalStorage(); 
    });
    
    li.appendChild(deletarBotao);

    listaTarefa.appendChild(li);
    
    atualizarLocalStorage(); 
}

adicionarTarefa.addEventListener('click', () => {
    const textoTarefa = entradaTarefa.value.trim(); 
    
    if (textoTarefa !== '') {
        adicionarTarefaLista(textoTarefa); 
        entradaTarefa.value = ''; 
    }
});

botaoLimparTarefa.addEventListener('click', () => {
    listaTarefa.innerHTML = ''; 
    localStorage.removeItem('tarefas'); 
});

function atualizarLocalStorage() {
    const tarefas = []; 
    
    const elementosTarefa = listaTarefa.querySelectorAll('li');
    elementosTarefa.forEach(li => {
        tarefas.push(li.textContent);
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}