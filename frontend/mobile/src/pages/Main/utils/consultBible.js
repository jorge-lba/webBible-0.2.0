const bible = require( '../../../content/bible/index' )

export function optionsBook(){
    return bible( { call:[ 'titles' ] } )
  }
  
  export function getTitleBooks(){
    const [books] = optionsBook()
    return books.map( ( book, index ) => {
      return {
        id: index+1,
        title: book,
        value: book
      }
    } )
  }
  
  export function getChapters( book ){
  
    const chapters = bible({
      dataDefault:{
        book: book
      },
      call:['chapter']
    })[0].validOptions
  
    chapters.pop()
  
    return chapters.map( (item, index )=> {
      return{
        id: `${index}`,
        title:item,
        value: item
      }
    }
  )}
  
  export function getVerses( book, chapter ){
    const chapters = bible({
      dataDefault:{
        book: book,
        chapter: chapter
      },
      call:['chapter']
    })[0].content
  
    const contentChapter = Object.entries(chapters)
    return contentChapter.map( ( content ) =>{
      return{
        id: content[0],
        title: content[1]
      }
    } )
  }
