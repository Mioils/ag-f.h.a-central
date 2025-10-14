// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Serve static files (home.html and thankyou.html)
app.use(express.static(path.join(__dirname)));

// Nodemailer transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "agfhacentral@gmail.com", // your Gmail
    pass: "agfhacentrals@2010", // your Gmail App Password
  },
});

// Handle form submissions
app.post("/send", (req, res) => {
  const {
    name,
    email,
    subject,
    message,
    firstName,
    lastName,
    phone,
    dob,
    address,
    occupation,
    maritalStatus,
    baptismStatus,
    reason,
  } = req.body;

  let emailSubject = subject || "New Membership Application";
  let emailText = "";

  if (subject) {
    // Contact form submission
    emailText = `
      You have a new message from your website:
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `;
  } else {
    // Membership form submission
    emailText = `
      New Membership Application:
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone}
      Date of Birth: ${dob}
      Address: ${address}
      Occupation: ${occupation}
      Marital Status: ${maritalStatus}
      Baptism Status: ${baptismStatus}
      Reason for joining: ${reason}
    `;
  }

  let mailOptions = {
    from: email,
    to: "agfhacentral@gmail.com",
    subject: emailSubject,
    text: emailText,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error sending message.");
    }
    // Redirect to thankyou.html on success
    res.redirect("/thankyou.html");
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
