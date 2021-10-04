import nodemailer from "nodemailer"
import xoauth2 from "xoauth2"

const sendMail = async (data) => {
  try {
    let { emailTo, resetToken } = data

    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false, // use SSL
      port: 25,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    // let mailTransporter = nodemailer.createTransport("SMTP", {
    //   service: "Gmail",
    //   secure: false,
    //   auth: {
    //     xoauth2: xoauth2.createXOAuth2Generator({
    //       user: process.env.EMAIL,
    //       pass: process.env.PASS,
    //     }),
    //   },
    //   tls: {
    //     rejectUnauthorized: false,
    //   },
    // })

    let mailDetails = {
      from: "Next Commerce",
      to: emailTo,
      subject: "Reset Password",
      html: `
        <div>
        <h1>Next Commerce</h1>
        <h2>Please reset your password using the following link</h2>
        <p>When reseting your password we recommend choosing the one which is easy for you to remember</p>
        <p><strong>If you find any issue about our services please mail us: </strong></p>
        <h4><a href = "mailto: blaiseonnet@gmail.com">@next-commerce.app</a></h4>
        <br/><br/>
        <h3><a style="padding: 15px; font-size=50px" href = "${process.env.CLIENT_URL}/forgot-password/${resetToken}">Click to reset your password</a></h3>
        </div>        
        `,
    }
    await mailTransporter.sendMail(mailDetails)
    return {
      success: true,
      message: "Email sent successfully",
    }
  } catch (e) {
    return {
      success: false,
      message:
        e.message === "getaddrinfo ENOTFOUND smtp.gmail.com"
          ? "Email not found at smtp.gmail.com"
          : e.message,
    }
  }
}

export default sendMail
