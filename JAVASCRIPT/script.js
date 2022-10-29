let nome;

function pedirNome(){
    nome = prompt("Digite o seu nome:");

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",
    {name: nome});

    promise.then(nomeSucesso);
    promise.catch(nomeFalha);
}
pedirNome();

function nomeSucesso(){
    const mandandoNome = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", 
    {name: nome});
}
setInterval(nomeSucesso, 5000);

function nomeFalha(erro){
    const statusCode = erro.response.status;

    if(statusCode === 400){
        alert("Nome já está sendo utilizado!");
        pedirNome();
    }
}

function pegarDados(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(dadosSucesso);
    promise.catch(dadosFalha);
}
pegarDados();

function dadosSucesso(resposta){
    const elemento = document.querySelector("main");
    const elementoAparacer = document.querySelector(".caixaMensagem");
    elemento.innerHTML = "";

    if(nome !== ""){
        elemento.classList.remove("escondido");
    }

    for(let i = 0; i < resposta.data.length; i++){
        let item = `
        <div class="${resposta.data[i].type} caixaMensagem">
            <div class="notificacao">
                <p class="tempo">(${resposta.data[i].time})</p> <p><bold>${resposta.data[i].from}</bold> ${resposta.data[i].to}: ${resposta.data[i].text}</p>
            </div>
        </div>`

        elemento.innerHTML += item;
        elementoAparacer.scrollIntoView();
    }
}
setInterval(pegarDados, 3000);

function dadosFalha(erro){
    const statusCode = erro.response.status;

    if(statusCode === 301){
        alert("O recurso que você está tentando acessar foi movido pra outra URL");
    }
    else if(statusCode === 401){
        alert("Você não tem acesso a esse recurso");
    }
    else if(statusCode === 404){
        alert("O recurso pedido não existe");
    }
    else if(statusCode === 409){
        alert("O recurso que você está tentando inserir já foi inserido");
    }
    else if(statusCode === 422){
        alert("A requisição enviada não está no formato esperado");
    }
    else if(statusCode === 500){
        alert("Ocorreu algum erro desconhecido no servidor");
    }
}

function enviar(){
    let mensagem = document.querySelector("input");
    const mandar = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",{
        from: nome,
        to: "Todos",
        text: mensagem.value,
        type: "message",
    });
    mandar.then(pegarDados);
    mandar.catch(atualizarSala);
    mensagem.value = "";
}

function atualizarSala(){
    alert("Usuário desconectado!A página será atualizada.");
    window.location.reload();
}