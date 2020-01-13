const bible = require( './src/index.js' )

const bodyParser = require( 'body-parser' )

const functions = require('firebase-functions');
const app = require( 'express' )()
const cors = require( 'cors' )

const admin = require( 'firebase-admin' )
admin.initializeApp()

app.options( '/bible', cors() )
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( { extended: true } ) )



app.post( '/bible', ( req, res ) => {
    
    const reqDefault = req.body.dataDefault

    const data = {
        dataDefault: {
            language: reqDefault.language ? reqDefault.language : "" ,
            version: reqDefault.version ? reqDefault.version : "",
            book: reqDefault.book ? reqDefault.book : "" ,
            chapter: reqDefault.chapter ? reqDefault.chapter : "",
            verse: reqDefault.verse ? reqDefault.verse : "" ,
            random: {
                chapter: {
                    min: reqDefault.random.chapter.min ? reqDefault.random.chapter.min : "" ,
                    max: reqDefault.random.chapter.max ? reqDefault.random.chapter.max : ""
                },
                verse: {
                    min: reqDefault.random.verse.min ? reqDefault.random.verse.min : "",
                    max: reqDefault.random.verse.max ? reqDefault.random.verse.max : ""
                }
            }
        },
        call: req.body.call ? req.body.call : []
    }

    const result =  bible(data)

    res.json(  { results: result }  )

} ) 

exports.api = functions.https.onRequest( app )
