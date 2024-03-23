const fs = require('fs');
const path = require('path');
const audiosFolder = './originais/';
const Functions = require('./functions/allFunctions');
let args = process.argv.slice(2);
let acao = args[0];

if (acao == undefined) {
    return console.log('Comandos aceitos: \n -c = converter arquivos');
}
if (acao == '-h') {
    return console.log('Comandos aceitos: \n -c = converter arquivos');
}
if (acao == '-ql') {
    if (args[1] == undefined) return console.log('O SkillId é obrigatório.');
    return console.log(`Quick Link: https://alexa-skills.amazon.com.br/apis/custom/skills/${args[1]}/launch`);
}

// (async () => {
    fs.readdir(audiosFolder, (err, files) => {
        if (err) {
            return console.log('Falha ao escanear a pasta: ' + err);
        } else {
            if (files.length == 0 || files == '.gitkeep') {
                return console.log('Nenhum arquivo encontrado na pasta: ' + audiosFolder);
            } else {
                files.forEach(async file => {
                    if (file != '.gitkeep') {
                        let name = path.parse(file).name.replace(new RegExp(' ', 'g'), '').replace(new RegExp('ã', 'g'), 'a').replace(new RegExp('ç', 'g'), 'c');
                        console.log(name);
                        await Functions.convertFile(audiosFolder+file, './convertidos/'+name+'.mp3');
                    }
                });
            }
        }
    });
// })();
