const nodemailer = require("nodemailer");

module.exports = {
  sendmail: (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let message = req.body.message;

    var smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "lineagesoset@gmail.com",
        pass: "uRn0725Az"
      }
    });

    smtpTransport.sendMail(
      {
        from: email,
        to: "lazarevand1997@gmail.com",
        subject: "Дк миэт обратная связь",
        html:
          "<p> Имя: " +
          name +
          "</p><p> Телефон: " +
          phone +
          "</p><p> Email: " +
          email +
          "</p><p> Сообщение: " +
          message +
          "</p>"
      },
      function(error, response) {
        if (error) {
          return res.json(error);
        } else {
          return res.json(response);
        }

        smtpTransport.close();
      }
    );
  }
};
