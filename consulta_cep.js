// preencher o formulário com os dados de retorno da API
function preencherFormulario(endereco) {
    document.getElementById("endereco").value = endereco.logradouro;
    document.getElementById("bairro").value = endereco.bairro;
    document.getElementById("cidade").value = endereco.localidade;
    document.getElementById("estado").value = endereco.uf;
    document.getElementById("ibge").value = endereco.ibge;
    document.getElementById("ddd").value = endereco.ddd;
    document.getElementById("siafi").value = endereco.siafi;
}


// verifica se o que foi digitado pelo usuário é somente números
function eNumero(numero) {
    return /^[0-9]+$/.test(numero);
}

// verifica se o cep possui tamanho 8 e só possui números
function cepValido(cep) {
    return cep.length == 8 && eNumero(cep);
}

// limpa os campos referentes ao endereço, quando o o cep digitado é inválido
function limpaEndereco() {
    const campos = ["cep","numero","bairro","cidade","estado","ibge","ddd","siafi"]; // lista com os campos
    campos.forEach(campo => {
        document.getElementById(`${campo}`).value = ""; 
    })
    document.getElementById("cep").focus(); // depois de limpar os campos, site foca no cep, para que o usuário digite novamente 
}

// função para pesquisar o CEP via API
async function pesquisarCEP() {
    
    const cep = document.getElementById("cep").value.replace("-",""); // retira o - do cep
    const url = `https://viacep.com.br/ws/${cep}/json/`; // utiliza a api com o cep digitado

    if (cepValido(cep)) {
        const dados = await fetch(url); // recebe a resposta da url
        const endereco = await dados.json() ; // salva a resposta em uma variável
        console.log(endereco); // mostra os dados no console
        
        if (endereco.hasOwnProperty("erro")) { //verifica se há erra na variável
            document.getElementById("endereco").value = "CEP não encontrado!" // altera o texto do endereço 
        } else {
            preencherFormulario(endereco); // preenche os outros campos
            document.getElementById("numero").focus();// coloca o foco para número que não é preenchido automaticamente 
        }

    } else {
        document.getElementById("endereco").value = "CEP incorreto!"; // altera o texto do endereço 
        limpaEndereco(); // chama a função para limpar os campos
    }
}

// Evento que pesquisa o cep quando o foco é tirado do campo cep
document.getElementById("cep").addEventListener("focusout", pesquisarCEP); // chama a função, quando o focoé tirado do foco

document.getElementById("btnLimpar").addEventListener("click", (e) => { // função para limpar todos os campos
    const campos = document.querySelectorAll("input"); // salva os campos em uma variável
    campos.forEach(campo => {
        campo.value = ""; // altera o valor dos campos
    });
})

document.getElementById("btnSalvar").addEventListener("click", (e) => {
    const campos = document.querySelectorAll("input"); // salva os campos em uma variável
    let texto = ""; //cria uma variável para receber os valores
    campos.forEach(campo => {
        texto += campo.id + ": " + campo.value + "; "; // salva os valores em uma variável
    })
    alert(texto); // emite o alerta com os valores
})