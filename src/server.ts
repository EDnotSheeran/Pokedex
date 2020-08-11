import * as express from 'express' 
const app = express()
app.use(express.json())
import db from './database/connection'
// Lista pokemons
app.get('/', async (req, res) => {{
    const pokemons = await db('pokemon').select('number','name','type','description').orderBy('number')
    res.json(pokemons)
}})
// Lista um pokemon
app.get('/:number', async (req, res) => {{
    const { number } = req.params
    const pokemon = await db('pokemon').select('*').orWhere('number', '=', Number(number))
    res.json(pokemon)
}})
// Salva um pokemon no banco
app.post('/',async (req, res) => {
    const {
        name,
        type,
        number,
        description
    } = req.body
    await db('pokemon').insert({name, type, number, description})
    res.json({"inserido":req.body})
})
// Altera um pokemon no banco
app.put('/',async (req, res) => {
    const {
        id,
        name,
        type,
        number,
        description
    } = req.body
    await db('pokemon').update({name, type, number, description}).where('id', '=', id)
    res.json({msg: 'Pokemon alterado com sucesso'})
})
// Deleta um pokemon
app.delete('/:id', async (req, res) => {{
    const { id } = req.params
    await db('pokemon').delete('*').where('id', '=', id)
    res.json({msg: 'Pokemon deletado com sucesso'})
}})
app.listen(3333)