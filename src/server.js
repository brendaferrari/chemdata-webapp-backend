const express = require('express');
const path = require('path');
let { PythonShell } = require('python-shell')


const app = express()

const runPyCodeHelloWorld = (options) => {
    return runPyScriptPepToCodes('resources\\PepToCodes\\main.py', options)
}

const runPyScriptPepToCodes = async () => {
    const options = {
        mode: 'text',
        pythonPath: 'C:\\Users\\brend\\miniconda3\\envs\\webpage_chemdata\\python.exe',
        pythonOptions: ['-u'], // get print results in real-time
        args: ['peptocodes', 'one code', 'string', 'N[C@@]([H])(CCCNC(=N)N)C(=O)N[C@@]([H])([C@]([H])(O)C)C(=O)N[C@@]([H])(CCCCN)C(=O)N[C@@]([H])(CCCNC(=N)N)C(=O)O']
    };
    const res = await PythonShell.run('resources\\PepToCodes\\main.py', options)

    return res
}

const handlePyGet = () => {
    return runPyCodeHelloWorld()
}

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'))
// })


app.get('/py', async (req, res) => {
    const result = await handlePyGet()
    res.json({ result })
})

app.listen(8080, () => {
    console.log('Server is listening on port 8080')
})


const runPyCode = async (str) => {
    const res = await PythonShell.runString(str, null)
    console.log(res)

    return res
}

const runPyScript = async (filename) => {
    const res = await PythonShell.run(filename)
    console.log(res)

    return res
}