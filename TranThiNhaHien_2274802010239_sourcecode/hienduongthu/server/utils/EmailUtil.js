// CLI: npm install nodemailer --save
const nodemailer = require('nodemailer');
const MyConstants = require('./MyConstants');

const transporter = nodemailer.createTransport({
    service: 'hotmail', // Dùng Outlook/Hotmail
    auth: {
        user: MyConstants.EMAIL_USER,
        pass: MyConstants.EMAIL_PASS
    }
});

const EmailUtil = {
    send(email, id, token) {
        const text = `Thanks for signing up! Please use the following information to activate your account:
        \n\tID: ${id} 
        \n\tToken: ${token}`;

        return new Promise((resolve, reject) => {
            const mailOptions = {
                from: MyConstants.EMAIL_USER,
                to: email,
                subject: 'Signup | Verification',
                text: text
            };

            transporter.sendMail(mailOptions, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }
};

module.exports = EmailUtil;
