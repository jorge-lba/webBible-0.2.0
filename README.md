# webBible-0.2.0

## Teste a API

Para testar, faça uma req do tipo post neste link ->   https://us-central1-webbible-kll.cloudfunctions.net/api/bible
Passando um JSON na seguinte forma:

    {
        "dataDefault": {
            "language": "pt-br",
            "version": "",
            "book": "genesis",
            "chapter": 1,
            "verse": 1,
            "random": {
                "chapter": {
                    "min": "",
                    "max": ""
                },
                "verse": {
                    "min": "",
                    "max": ""
                }
            }
        },
        "call": ["random-verse", "random-verse" ]
    }

> Opções disponiveis para call: [
>     'languages',-----------------| Retorna os idiomas e versoes disponiveis
>     'full' ----------------------| Retorna a Biblia Completa
>     'titles', -------------------| Retorna Os Livros Disponiveis
>     'book', ---------------------| Retorna o livro solicitado 
>     'chapter', ------------------| Retorna o captulo solicitado
>     'verse', --------------------| Retorna o versiculo solicitado
>     'random-chapter', -----------| Retorna um captulo aleatorio
>     'random-verse',  ------------| Retorna um versiculo aleatorio
> ]

> Os reultado retona um objeto dentro de um array na mesma sequencias que foi feita a chamada no dataDefault.call