const dayJs = require('dayjs')
const uts = require('dayjs/plugin/utc')

const {authService} = require("../services");

dayJs.extend(uts)

module.exports = {

    removeOldOAuthTokens: async () => {
        try {
            console.log('remove old token start:', new Date().toISOString() )

            const timeBeforeNow = dayJs().utc().subtract(1, 'day');

            const deleteInfo = await authService.deleteMany({
                createdAt: {$lte: timeBeforeNow}
            })

            console.log(deleteInfo);
        }catch (e) {
            console.log(e)
        }
      
        console.log(deleteInfo)
    }
}