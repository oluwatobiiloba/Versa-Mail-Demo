require("dotenv").config();
const versaMail = require("versa-mail");
const nodemailerConfig = {
  emailService: process.env.emailService,
  emailUsername: process.env.emailUsername,
  emailPassword: process.env.emailPassword,
  senderAddress: process.env.senderAddress,
};
const mailerType = "nodemailer";
const mailerFactory = new versaMail();
const mailer = mailerFactory.createMailer(mailerType, nodemailerConfig);

module.exports = {
  single: async (data) => {
    try {
      const options = data;
      const response = await mailer.sendEmail(options);
      return response;
    } catch (error) {
      throw error;
    }
  },
  bulk: async (data) => {
    try {
      const options = data;
      const response = await mailer.sendBulk(options);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
