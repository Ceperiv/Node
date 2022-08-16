const path = require('path')

const demo = async () => {
    console.log(__dirname)
    console.log(__filename)
    console.log(path.basename('./main/path'))
    console.log(path.parse('./main/eight/one')) // розбір шляху
    console.log(path.join('./main/eight/five/'))

    // console.log( await fs.readdir(path.join(__dirname)));

}
demo()