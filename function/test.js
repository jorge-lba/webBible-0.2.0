const bible = require("./index")

const dataDefault = {
    dataDefault: {
        language: 'pt-br',
        version: 'NVI',
        book: ' amos',
        chapter: '1',
        verse: '10',
        random: {
            chapter: {
                use: false,
                min: null,
                max: null
            },
            verse: {
                use: 1,
                min: null,
                max: null
            }
        }
    },
    call: ['random-verse']
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

console.log( bible(dataDefault))