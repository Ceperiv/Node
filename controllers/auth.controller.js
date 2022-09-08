const {tokenService, authService,} = require("../services");
const {Auth} = require("../dataBase");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {password: hashPassword, _id} = req.user

            await tokenService.comparePassword(password, hashPassword);
            const authTokens = tokenService.createAuthTokens({_id})
            await authService.saveTokens({...authTokens, user: _id})

            res.json({
                ...authTokens,
                user: req.user
            })
        } catch (e) {
            next(e)
        }
    },
    refresh: async (req, res, next) => {
        try {
            const {user, refresh_token} = req.body;
            await authService.saveTokens.deleteOneByParams({refresh_token})

            const authTokens = tokenService.createAuthTokens({_id: user})
            const newTokens = await authService.saveTokens({...authTokens, user})

            res.json({newTokens})
        } catch (e) {
            next(e)
        }
    },
    logout: async (req, res, next) => {
        try {
            const {_id, access_token} = req.tokenInfo;
            // await Auth.deleteMany({_id, access_token})
            await authService.deleteOneByParams({_id, access_token})

            res.json('logout ok)')
        } catch (e) {
            next(e)
        }
    },

}