const express = require('express');

const app = express()


const path = require('path');
let { PythonShell } = require('python-shell')
const cors = require('cors')

app.use(express.json())
app.use(cors())

const runPepToCodes = (body) => {
    return runPyScriptPepToCodes('resources\\PepToCodes\\main.py', body.inputDB, body.inputCode, body.checkSmiles, body.inputSmiles)
}

const runPyScriptPepToCodes = async (path, db, code, type, smiles) => {
    const options = {
        mode: 'text',
        pythonPath: 'C:\\Users\\brend\\miniconda3\\envs\\webpage_chemdata\\python.exe',
        pythonOptions: ['-u'], // get print results in real-time
        args: [db, code, type, smiles]
        // args: ['peptocodes', 'one letter code', 'smiles', 'N[C@@]([H])(CCCNC(=N)N)C(=O)N[C@@]([H])([C@]([H])(O)C)C(=O)N[C@@]([H])(CCCCN)C(=O)N[C@@]([H])(CCCNC(=N)N)C(=O)O']
    };
    console.log(db, code, type, smiles)
    const res = await PythonShell.run(path, options)
    console.log(res)

    return res
}

const handlePeptocodes = (body) => {

    return runPepToCodes(body)
}

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'))
// })


app.post('/peptocodes', async (req, res) => {
    const body = req.body
    console.log('body: ', body)
    const result = await handlePeptocodes(body)
    console.log(result)
    res.json({ result })
})

app.listen(8080, () => {
    console.log('Server is listening on port 8080')
})


// const runPyCode = async (str) => {
//     const res = await PythonShell.runString(str, null)
//     console.log(res)

//     return res
// }

// const runPyScript = async (filename) => {
//     const res = await PythonShell.run(filename)
//     console.log(res)

//     return res
// }