const dayJs = require('dayjs')
const uts = require('dayjs/plugin/utc')

const {previousPasswordService} = require("../services");

dayJs.extend(uts)

module.exports = {
    removeOldPasswords: async () => {
        try {
            console.log('remove old passwords start:', new Date().toISOString() )
            const timeBeforeNow = dayJs().utc().subtract(1, 'day');

            const deleteInfo = await previousPasswordService.deleteManyBeforeDate(timeBeforeNow)

            console.log(deleteInfo);
        }catch (e) {
            console.log(e)
        }

        console.log(deleteInfo)
    }
}