module.exports = {
    EMAIL: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,
    PASSWORD: /^(?=.*[a-zA-Z]).{6,}$/,
    MONGO_ID:/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
}