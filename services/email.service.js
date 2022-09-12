const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates')
const path = require('path')

const {NO_REPLY_EMAIL, NO_REPLY_PASSWORD, FRONTEND_URL} = require("../config/config");
const emailTemplatesObj = require("../email-templates");
const {ApiError} = require("../Errors");

const sentEmail = async (userMail, emailAction, locals = {}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NO_REPLY_EMAIL,
            pass: NO_REPLY_PASSWORD,
        }
    });
    const templateParser = new EmailTemplates({
        views: {root: path.join(process.cwd(), 'email-templates')}
    })

    const emailInfo = emailTemplatesObj[emailAction]
    if (!emailInfo) {
        throw new ApiError('wrong template name', 500)
    }
    const html = await templateParser.render(emailInfo.templateName, {...locals, frontendURL: FRONTEND_URL})

    return transporter.sendMail({
        from: 'UK of Ceperiv',
        to: userMail,
        subject: emailInfo.subject,
        html
    })
};

module.exports = {
    sentEmail
};