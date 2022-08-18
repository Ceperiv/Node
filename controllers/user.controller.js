const fileService = require("../services/file.service");
module.exports = {
    getAllUsers: async (req, res) => {
        const usersFromService = await fileService.getUsers();
        res.json(usersFromService)
    },
    getUserById: async (req, res) => {
        const {userId} = req.params
        if (Number.isNaN(+userId) || +userId < 0) {
            res.status(400).json('wrong user id!!!')
            console.log('wrong user id!!!')
            console.log('---------------')
        }
        const user = await fileService.getUser(+userId)
        if (!user) {
            res.status(404).json('user not found!!!')
            console.log('user not found')
            console.log('---------------')

        }

        res.json(user)
    },
    createUser: async (req, res) => {
        const user = await fileService.insertUser(req.body);
        res.status(201).json(user)
    },
    editUser: async (req, res) => {
        const {userId} = req.params
        const {age, name} = req.body
        if (Number.isNaN(+userId) || +userId < 0) {
            res.status(400).json('wrong user id!!!')
            console.log('wrong user id!!!')
            console.log('---------------')
        }
        const userObject = {}
        if (name) userObject.name = name
        if (age) userObject.age = age

        const user = await fileService.updateUser(+userId, userObject)
        if (!user) {
            res.status(404).json('user not found!!!')
            console.log('user not found')
            console.log('---------------')

        }
        res.status(201).json(user)
    },
    removeUser: async (req, res) => {
        const {userId} = req.params
        if (Number.isNaN(+userId) || +userId < 0) {
            res.status(400).json('wrong user id!!!')
            console.log('wrong user id!!!')
            console.log('---------------')
        }
        const user = await fileService.deleteUser(+userId)
        if (!user) {
            res.status(404).json('user not found!!!')
            console.log('user not found')
            console.log('---------------')
        }
        res.status(204)

    }
}