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
    elemento.innerHTML = "";
    elemento.classList.remove("escondido");

    for(let i = 0; i < resposta.data.length; i++){
        let item = `
        <div class="${resposta.data[i].type} caixaMensagem">
            <div class="notificacao">
                <p class="tempo">(${resposta.data[i].time})</p> <p><bold>${resposta.data[i].from}</bold> ${resposta.data[i].to}: ${resposta.data[i].text}</p>
            </div>
        </div>`

        elemento.innerHTML += item;
        elemento.scrollIntoView();
    }
}
setInterval(pegarDados, 3000);

function dadosFalha(erro){
    alert("deu ruim");
}