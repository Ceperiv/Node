const fs = require('fs').promises;
const path = require('path')



const recursion = async (link) => {
    await fs.readdir(link).then(folders => {
        for (const folder of folders) {
            console.log(folder)
            let folderIn = folder
            fs.stat(path.join(link,folder)).then(folder => {
                if (!folder.isDirectory()) {
                    fs.rename(path.join(link, folderIn), path.join('./all',folderIn))
                        .catch(e => console.log(e))
                } else {
                    recursion(path.join(link, folderIn))
                }
            })
        }
    })
}
recursion(path.join(__dirname,'./main'))
