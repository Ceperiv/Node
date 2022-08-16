const fs = require('fs').promises;
const path = require('path')

async function sortByGender(folder, gender, writeFolder) {
    try {
        const mainPath = path.join(__dirname, folder)
       const user = await fs.readdir(mainPath)
        for (const file of user) {
            const data = await fs.readFile(path.join(mainPath,file))
            const user = JSON.parse(data.toString())
            if(user.gender !== gender){

               await fs.rename(path.join(mainPath,file), path.join(__dirname,writeFolder,file) )
            }
        }
        console.log('WELL DONE')
    }catch (e){
        console.log(e)
    }
}
sortByGender('boys','male', 'girls')
sortByGender('girls','female', 'boys')
