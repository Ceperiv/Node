const cron = require('node-cron');
const {removeOldOAuthTokens} = require("./removeoldOAuthTokens");
const {removeOldPasswords} = require("./removeOldPasswords");

module.exports = () => {
    cron.schedule('0 4 * * * *', removeOldOAuthTokens)
    cron.schedule('0 4 * * * *', removeOldPasswords)
}