const {emailActionEnum} = require("../constants");
module.exports = {
    [emailActionEnum.WELCOME]: {
        subject: 'WELCOME:)',
        templateName: 'welcome'
    },
    [emailActionEnum.TEST]: {
        subject: 'test:)',
        templateName: 'test'
    }
};