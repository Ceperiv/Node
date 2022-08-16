const fs = require('fs').promises;

fs.rename('./main/zero.js', './all/zero.js').catch(e=>console.log(e))