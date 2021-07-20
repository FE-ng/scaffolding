/* eslint-disable consistent-return */
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const schedule = require('node-schedule');

// https://nodemailer.com/message/ nodemailer官网

const transporter = nodemailer.createTransport({
  // host: 'smtp.ethereal.email',
  service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
  port: 465, // SMTP 端口
  secureConnection: true, // 使用了 SSL
  auth: {
    user: '224436504@qq.com',
    // 这里密码不是qq密码，是你设置的smtp授权码加密lfc
    pass: 'lwnygcgpwcbywbhhjf',
  },
});

const mailOptions = {
  from: '"cool boy" <224436504@qq.com>', // sender address
  to: 'liufeng104@sfmail.sf-express.com', // list of receivers
  subject: 'Hello', // Subject line
  // 发送text或者html格式
  // text: 'Hello world?', // plain text body
  // html: '<b>Hello world?</b>', // html body
  html: fs.createReadStream(path.resolve(__dirname, 'email.html')), // 流
};

const rule = new schedule.RecurrenceRule();
const times = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
  33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
];
rule.minute = times;

const sendEmail = () => {
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId, __dirname);
    // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
  });
};
schedule.scheduleJob(rule, () => {
  console.log('1分钟定时任务启动中');
  sendEmail();
});
