const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: [
    "http://chemdata-dev.eu-north-1.elasticbeanstalk.com",
    "http://chemdata-server-dev.eu-north-1.elasticbeanstalk.com",
  ],
};

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors(corsOptions));

const path = require("path");
let { PythonShell } = require("python-shell");

const runPepToCodes = (body) => {
  return runPyScriptPepToCodes(
    "resources/PepToCodes/main.py",
    body.inputDB,
    body.inputCode,
    body.checkSmiles,
    body.inputSmiles
  );
};

const runPyScriptPepToCodes = async (path, db, code, type, smiles) => {
  const options = {
    mode: "text",
    pythonPath: "/usr/bin/python3",
    pythonOptions: ["-u"], // get print results in real-time
    args: [db, code, type, smiles],
    // args: ['peptocodes', 'one letter code', 'smiles', 'N[C@@]([H])(CCCNC(=N)N)C(=O)N[C@@]([H])([C@]([H])(O)C)C(=O)N[C@@]([H])(CCCCN)C(=O)N[C@@]([H])(CCCNC(=N)N)C(=O)O']
  };
  const res = await PythonShell.run(path, options);
  console.log(res);

  return res;
};

const handlePeptocodes = (body) => {
  return runPepToCodes(body);
};

app.post("/peptocodes", async (req, res) => {
  console.log("request accepted");
  try {
    const body = req.body;
    console.log(body);
    const result = await handlePeptocodes(body);
    res.json({ result });
  } catch (err) {
    console.error("err: ", err);
    res.status(500).json({ err });
  }
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});

const runHta = (body) => {
  return runPyScriptHta(
    "resources/HeadTailAssign/main.py",
    body.checkSmiles,
    body.inputSmiles
  );
};

const runPyScriptHta = async (path, type, smiles) => {
  const options = {
    mode: "text",
    pythonPath: "C:/Users/brend/miniconda3/envs/webpage_chemdata/python.exe",
    pythonOptions: ["-u"], // get print results in real-time
    args: [type, smiles],
    // args: ['smiles', 'N[C@@]([H])(CCCNC(=N)N)C(=O)N[C@@]([H])([C@]([H])(O)C)C(=O)N[C@@]([H])(CCCCN)C(=O)N[C@@]([H])(CCCNC(=N)N)C(=O)O']
  };
  const res = await PythonShell.run(path, options);
  console.log(res);

  return res;
};

const handleHta = (body) => {
  return runHta(body);
};

app.post("/hta", async (req, res) => {
  const body = req.body;
  console.log(body);
  const result = await handleHta(body);
  res.json({ result });
});

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

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'))
// })
