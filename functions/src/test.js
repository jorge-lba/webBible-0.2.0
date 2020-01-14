const bible = require("./index")
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

const dataDefault = {
    dataDefault: {
        language: 'pt-br',
        version: 'NVI',
        book: ' amos',
        chapter: '1',
        verse: '10',
        random: {
            chapter: {
                min: null,
                max: null
            },
            verse: {
                min: null,
                max: null
            }
        }
    },
    call: ['random-verse', 'random-verse', 'verse']}

const data = JSON.stringify( dataDefault )
var ajax = new XMLHttpRequest();

// Seta tipo de requisição: Post e a URL da API
ajax.open("POST", "https://us-central1-webbible-kll.cloudfunctions.net/api/bible");
ajax.setRequestHeader("Content-Type", "application/json");

// Seta paramêtros da requisição e envia a requisição
ajax.send(data);

// Cria um evento para receber o retorno.
ajax.onreadystatechange = function() {
  // Caso o state seja 4 e o http.status for 200, é porque a requisiçõe deu certo.
	if (ajax.readyState == 4 && ajax.status == 200) {
    
		const data = JSON.parse(ajax.responseText)
		
    // Retorno do Ajax
        console.log(data.results[0])
        console.log(data.results[1])
        console.log(data.results[2].content)
	}
}


// Opções disponiveis para call: [
//     'languages',-----------------| Retorna os idiomas e versoes disponiveis
//     'full' ----------------------| Retorna a Biblia Completa
//     'titles', -------------------| Retorna Os Livros Disponiveis
//     'book', ---------------------| Retorna o livro solicitado 
//     'chapter', ------------------| Retorna o captulo solicitado
//     'verse', --------------------| Retorna o versiculo solicitado
//     'random-chapter', -----------| Retorna um captulo aleatorio
//     'random-verse',  ------------| Retorna um versiculo aleatorio
// ]

// Os reultado retona um objeto dentro de um array na mesma sequencias que foi feita a chamada no dataDefault.call

// console.log( bible(dataDefault))