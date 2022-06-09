// Посортувати дівчат і хлопців по папках

const fs = require('fs');
const path = require('path');

const dirs = ['boys', 'girls'];
// `./${dir === 'boys' ? dir : 'girls'}/${file}`

for (const dir of dirs) {
    fs.readdir(path.join(__dirname,dir), (err, files) => {
        err && console.log(err);

        for (const file of files) {
            fs.readFile(path.join(__dirname,dir === 'boys' ? dir : 'girls',file), (err, data) => {
                const human = JSON.parse(data.toString());
                
                fs.rename(
                    path.join(__dirname,dir,file),
                    path.join(__dirname,human.gender === 'male' ? 'boys' : 'girls',file),
                    (err) => {
                        err && console.log(err);
                    })
            })
        }
    })
}
