const {emailActionEnum} = require("../constants");
module.exports = {
    [emailActionEnum.WELCOME]: {
        subject: 'WELCOME:)',
        templateName: 'welcome'
    },
    [emailActionEnum.TEST]: {
        subject: 'test:)',
        templateName: 'test'
    },
    [emailActionEnum.FORGOT_PASSWORD]: {
        subject: 'forgot pass',
        templateName: 'forgot_pass'
    }
};