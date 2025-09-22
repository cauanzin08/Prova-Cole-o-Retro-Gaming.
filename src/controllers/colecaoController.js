import dadosc from "../models/dados.js";

const { colecao }= dados;


const getAllColecao = (req, res) => {
    let resultado = colecoes;

    res.status(200).json({
        total: getAllColecao.length,
        colecoes: resultado,
    });
};

 const getColecoesById = (req, res) => {
    const id = parseInt(req.params.id);

    const colecao = colecoes.find((c) => c.id === id);

    res.status(200).json({
        total: colecao.length,
        colecao: colecao,
    });
 };

 const createColecao = (req, res) => {
    const {jogo, console, genero, anoLancamento, desenvolvedora, condicao, preco, raridade} = req.body;

    if(!jogo || !console || !genero || !desenvolvedora || !preco){
        return res.status(400).json({
            sucess: false,
            message: "jogo, console, genero, desenvolvedora e preço, são obrigatorios",
        });
    }

    const novaColecao = {
        id: colecoes.length +1,
        jogo: jogo,
        console: console,
        genero: genero,
        anoLancamento: parseInt(anoLancamento),
        desenvolvedora: desenvolvedora,
        condicao: condicao,
        preco: preco,
        raridade: raridade
    };

    colecoes.push(novaColecao);

    res.atatus(201).json({
        sucess: true,
        message: "Coleção cadastrada com sucesso",
        colecao: novaColecao,
    });
 };

 const deleteColecao = (req, res) => {
    console.log("Passou por aqui")
    const id = parseInt(req.params.id);

    if(isNaN(id)){
        return res.status(400).json({
            sucess: false,
            message: "0 ID deve ser valido"
        });
    };

const colecoesParaRemover = colecoes.find(c => c.id === id);

if(!colecoesParaRemover) {
    return res.status(404).json({
        sucess: false,
        message: `Coleção com o id: ${id} não existe`
    })
}

const colecoesFiltradas = colecoes.filter(colecao => colecao.id !== id);

colecoes.splice(0, colecoes.length, ...colecoesFiltradas);

res.status(200).json({
    sucess: true,
    message:`A coleção com id ${id} foi removida com sucesso`
    })
};

app.get('/colecoes', (req, res) => {
    const { jogo, console, genero, anoLancamento, desenvolvedora, condicao, preco, raridade } = req.query;
    let resultado = colecoes;
  
    if (jogo) {
      resultado = resultado.filter(c => c.jogo.toLowerCase() === jogo.toLowerCase());
    }
  
    if (console) {
      resultado = resultado.filter(c => c.console == console);
    }
  
    if (genero) {
      resultado = resultado.filter(c => c.genero.toLowerCase().includes(genero.toLowerCase()));
    }
  
    if (anoLancamento) {
      resultado = resultado.filter(c => c.anoLancamento.toLowerCase().includes(genero.toLowerCase()));
    }
    if (desenvolvedora) {
      resultado = resultado.filter(c => c.desenvolvedora.toLowerCase().includes(desenvolvedora.toLowerCase()));
    }
    if (condicao) {
      resultado = resultado.filter(c => c.condicao.toLowerCase().includes(condicao.toLowerCase()));
    }
    if (preco) {
      resultado = resultado.filter(c => c.preco.toLowerCase().includes(preco.toLowerCase()));
    }
    if (raridade) {
      resultado = resultado.filter(c => c.raridade.toLowerCase().includes(raridade.toLowerCase()));
    }
  
    res.status(200).json({
      total: resultado.length,
      data: resultado
    });
});

const updateColecoes = (req, res) => {
    const id = parseInt(req.params.id);
    const {jogo, console, genero, anoLancamento, desenvolvedora, condicao, preco, raridade} = req.body;
    const idParaEditar = id;

    if(isNaN(idParaEditar)){
        return res.status(400).json({
            sucess: false,
            message: " O id deve ser um numero valido",
        });
    };

const colecaoExiste = colecoes.find((colecao) => colecao.id === idParaEditar);
if(!colecaoExiste){
    return res.status(404).json({
        sucess: false,
        message: `A coleção com o id: ${idParaEditar} não existe`,
    });
};

const colecoesAtualizadas = colecoes.map((colecao) =>
    colecao.id === idParaEditar
    ? {
        ...colecao,
        ...(jogo && {jogo}),
        ...(console && {console}),
        ...(genero && {genero}),
        ...(anoLancamento && {anoLancamento}),
        ...(desenvolvedora && {desenvolvedora}),
        ...(condicao && {condicao}),
        ...(preco && {preco}),
        ...(raridade && {raridade}),
    }
    : colecao
);

colecoes.splice(0, colecoes.length, ...colecoesAtualizadas);

  const colecaoEditada = colecoes.find((colecao) => colecao.id === idParaEditar);
  res.status(200).json({
    sucess: true,
    message: "Dados atualizados com sucesso da coleção",
    colecao: colecaoEditada,
  });
};


export{getAllColecao, getColecoesById, createColecao, deleteColecao, updateColecoes };