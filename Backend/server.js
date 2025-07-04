/*
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const path = require("path");
const helmet = require("helmet");
const fetch = require("node-fetch");

dotenv.config();
const app = express();

// ✅ Security Middleware (CSP, Helmet)
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../Frontend")));

// ✅ Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", 
    database: "purple_chillies"
});

db.connect(err => {
    if (err) throw err;
    console.log("✅ Database connected!");
});

// ✅ Nodemailer Configuration (Admin Email)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "test.purplechillies2025@gmail.com",  
        pass: "fznpwocwjykcgets"  
    }
});

// ✅ Serve Reset Password & Login Pages
app.get("/reset-password", (req, res) => res.sendFile(path.join(__dirname, "../Frontend/set_password.html")));
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "../Frontend/login.html")));

// ✅ User Registration API
app.post("/register", async (req, res) => {
    const { email, first_name, middle_name, last_name, password } = req.body;
    if (!email || !first_name || !last_name || !password) return res.status(400).json({ message: "❌ All fields are required!" });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO Customers (Email, First_name, Middle_name, Last_name, Password) VALUES (?, ?, ?, ?, ?)`;

        db.query(query, [email, first_name, middle_name, last_name, hashedPassword], (err) => {
            if (err) return res.status(500).json({ message: "❌ Registration failed", error: err.sqlMessage });
            res.json({ message: "✅ Registration successful!" });
        });
    } catch (error) {
        res.status(500).json({ message: "❌ Internal server error!" });
    }
});

// ✅ Login API
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "❌ Email and password are required." });

    const query = `SELECT Password FROM Customers WHERE Email = ?`;
    db.query(query, [email], async (err, result) => {
        if (err) return res.status(500).json({ message: "❌ Login failed." });
        if (result.length === 0) return res.status(401).json({ message: "❌ User not found." });

        const match = await bcrypt.compare(password, result[0].Password);
        return match ? res.json({ message: "✅ Login successful!" }) : res.status(401).json({ message: "❌ Incorrect password." });
    });
});

// ✅ Dialogflow Chatbot API Route (Corrected)
app.post("/dialogflow", async (req, res) => {
    try {
        const response = await fetch(`https://dialogflow.googleapis.com/v2/projects/purple-chillies-bot-xstt/agent/sessions/1234:detectIntent`, {
            method: "POST",
            headers: { 
                "Authorization": `Bearer YOUR_ACCESS_TOKEN`, 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query_input: {
                    text: {
                        text: req.body.query,
                        language_code: "en"
                    }
                }
            })
        });

        const chatbotResponse = await response.json();
        res.json({ fulfillmentText: chatbotResponse.queryResult.fulfillmentText });
    } catch (error) {
        res.status(500).json({ message: "❌ Error processing chatbot request." });
    }
});

// ✅ Start Server
app.listen(3000, () => console.log("🚀 Server running on port 3000"));

*/


/*
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Reset Password API
app.post("/reset-password", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "❌ Email is required!" });
    }

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Reset Your Password",
            html: `<p>Click <a href="http://localhost:3000/set-password?email=${email}">here</a> to reset your password.</p>`
        });

        res.json({ message: "✅ Password reset link sent!" });
    } catch (error) {
        console.error("❌ Error sending email:", error);
        res.status(500).json({ message: "❌ Failed to send reset link." });
    }
});

// Login API
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "❌ Missing credentials!" });
    }

    try {
        if (email === "test@example.com" && password === "123456") {
            res.json({ message: "✅ Login successful!" });
        } else {
            res.status(401).json({ message: "❌ Invalid credentials!" });
        }
    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ message: "❌ Server error!" });
    }
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
*/


/*
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const nodemailer = require("nodemailer");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

dotenv.config();
const app = express();

// ✅ Middleware Setup
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../Frontend")));

// ✅ MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "purple_chillies"
});

db.connect(err => {
    if (err) throw err;
    console.log("✅ Connected to MySQL!");
});

// ✅ Nodemailer Configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ✅ Registration Route
app.post("/register", async (req, res) => {
    const { Name, Email, Phone, Password } = req.body;

    if (!Name || !Email || !Phone || !Password) {
        return res.status(400).json({ error: "❌ All fields are required!" });
    }

    db.query("SELECT Email FROM customer_reg WHERE Email = ?", [Email], async (err, result) => {
        if (err) return res.status(500).json({ error: "❌ Database error!" });
        if (result.length > 0) return res.status(409).json({ error: "❌ User already exists!" });

        const hashedPassword = await bcrypt.hash(Password, 10);

        db.query("INSERT INTO customer_reg (Name, Email, Phone, Password) VALUES (?, ?, ?, ?)",
            [Name, Email, Phone, hashedPassword],
            (err) => {
                if (err) return res.status(500).json({ error: "❌ Registration failed!" });

                db.query("INSERT INTO customer_login (Name, Password) VALUES (?, ?)",
                    [Name, hashedPassword],
                    (err) => {
                        if (err) return res.status(500).json({ error: "❌ Failed to store login details!" });
                        res.json({ message: "✅ Registration successful!" });
                    });
            });
    });
});

// ✅ Login Route
app.post("/login", (req, res) => {
    const { Name, Password } = req.body;

    db.query("SELECT Password FROM customer_login WHERE Name = ?",
        [Name],
        async (err, result) => {
            if (err) return res.status(500).json({ error: "❌ Database error!" });
            if (result.length === 0) return res.status(401).json({ error: "❌ Invalid credentials!" });

            const storedPassword = result[0].Password;
            const isMatch = await bcrypt.compare(Password, storedPassword);
            if (!isMatch) return res.status(401).json({ error: "❌ Incorrect password!" });

            res.json({ message: "✅ Login successful!" });
        });
});

// ✅ Password Reset Link
app.post("/reset-password", async (req, res) => {
    const { Name } = req.body;
    const resetToken = crypto.randomBytes(32).toString("hex");

    db.query("UPDATE customer_login SET reset_token = ? WHERE Name = ?",
        [resetToken, Name],
        (err) => {
            if (err) return res.status(500).json({ message: "❌ Failed to update reset token." });

            transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: Name, // assuming Name is email here
                subject: "Reset Your Password",
                html: `<p>Click <a href="http://localhost:3000/set-password?token=${resetToken}">here</a> to reset your password.</p>`
            });

            res.json({ message: "✅ Password reset link sent!" });
        });
});

// ✅ Handle Password Reset
app.post("/set-password", async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ error: "❌ Token and new password are required!" });
    }

    db.query("SELECT Name FROM customer_login WHERE reset_token = ?",
        [token],
        async (err, result) => {
            if (err || result.length === 0) {
                return res.status(400).json({ error: "❌ Invalid or expired token!" });
            }

            const Name = result[0].Name;
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            db.query("UPDATE customer_login SET Password = ?, reset_token = NULL WHERE Name = ?",
                [hashedPassword, Name],
                (err) => {
                    if (err) return res.status(500).json({ error: "❌ Failed to update password!" });
                    res.json({ message: "✅ Password reset successful!" });
                });
        });
});

// ✅ Auto-generate Case ID
async function generateCaseID() {
    const now = new Date();
    const yearMonth = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}`;

    return new Promise((resolve, reject) => {
        db.query("SELECT MAX(CaseID) AS lastID FROM Tracker_Field WHERE CaseID LIKE ?",
            [`${yearMonth}%`],
            (err, result) => {
                if (err) return reject(err);

                let nextNum = 1;
                if (result[0].lastID) {
                    nextNum = parseInt(result[0].lastID.slice(6)) + 1;
                }

                const newID = `${yearMonth}${nextNum.toString().padStart(3, '0')}`;
                resolve(newID);
            });
    });
}

// ✅ Utility: Format time in IST for MySQL
function getISTDateTime() {
  const now = new Date();
  const offsetMs = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
  const istTime = new Date(now.getTime() + offsetMs);
  return istTime.toISOString().slice(0, 19).replace('T', ' ');
}


// ✅ Submit Case
app.post("/submit-case", async (req, res) => {
    const { Environment, Product, Description, RaisedBy, IssueType, Status, Impact, Priority } = req.body;

    if (!Environment || !Product || !Description || !RaisedBy || !IssueType || !Status || !Impact || !Priority) {
        return res.status(400).json({ message: "❌ All fields are required." });
    }

    console.log("🧾 Submitting case with data:", req.body);

    try {
        const caseID = await generateCaseID();
        const now = new Date();
        const time = getISTDateTime();


        db.query(
            "INSERT INTO Tracker_Field (CaseID, TimeStamp, Environment, Product, Description, RaisedBy, IssueType, Status, Impact, Priority, CreatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [caseID, time, Environment, Product, Description, RaisedBy, IssueType, Status, Impact, Priority, RaisedBy],
            (err) => {
                if (err) {
                    console.error("❌ Database Error:", err.sqlMessage);
                    return res.status(500).json({ message: "❌ DB error: " + err.sqlMessage });
                }

                res.json({ message: "✅ Case submitted successfully!", caseID });
            }
        );
    } catch (err) {
        console.error("❌ Case ID generation failed:", err.message);
        res.status(500).json({ message: "❌ Error generating Case ID." });
    }
});

// ✅ Start Server
app.listen(3000, () => console.log("🚀 Server running on port 3000"));
*/


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const nodemailer = require("nodemailer");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const multer = require("multer");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../Frontend")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "purple_chillies"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ Connected to MySQL!");
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ✅ File Upload Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// ✅ Register
app.post("/register", async (req, res) => {
  const { Name, Email, Phone, Password } = req.body;
  if (!Name || !Email || !Phone || !Password) {
    return res.status(400).json({ error: "❌ All fields are required!" });
  }

  db.query("SELECT Email FROM customer_reg WHERE Email = ?", [Email], async (err, result) => {
    if (err) return res.status(500).json({ error: "❌ Database error!" });
    if (result.length > 0) return res.status(409).json({ error: "❌ User already exists!" });

    const hashedPassword = await bcrypt.hash(Password, 10);

    db.query("INSERT INTO customer_reg (Name, Email, Phone, Password) VALUES (?, ?, ?, ?)",
      [Name, Email, Phone, hashedPassword], (err) => {
        if (err) return res.status(500).json({ error: "❌ Registration failed!" });

        db.query("INSERT INTO customer_login (Name, Email, Password) VALUES (?, ?, ?)",
          [Name, Email, hashedPassword], (err) => {
            if (err) return res.status(500).json({ error: "❌ Failed to store login details!" });
            res.json({ message: "✅ Registration successful!" });
          });
      });
  });
});

// ✅ Customer Login
app.post("/login", (req, res) => {
  const { Email, Password } = req.body;
  db.query("SELECT Password FROM customer_login WHERE Email = ?", [Email], async (err, result) => {
    if (err) return res.status(500).json({ error: "❌ Database error!" });
    if (result.length === 0) return res.status(401).json({ error: "❌ Invalid credentials!" });

    const isMatch = await bcrypt.compare(Password, result[0].Password);
    if (!isMatch) return res.status(401).json({ error: "❌ Incorrect password!" });

    res.json({ message: "✅ Login successful!" });
  });
});

// ✅ Agent Login
app.post("/login-agent", (req, res) => {
  const { Email, Password } = req.body;
  db.query("SELECT Password FROM support_agents WHERE Email = ?", [Email], async (err, result) => {
    if (err) return res.status(500).json({ error: "❌ DB error!" });
    if (result.length === 0) return res.status(401).json({ error: "❌ Agent not found!" });

    const isMatch = await bcrypt.compare(Password, result[0].Password);
    if (!isMatch) return res.status(401).json({ error: "❌ Incorrect password!" });

    res.json({ message: "✅ Agent login successful!" });
  });
});

// ✅ Case Submission (with optional file upload)
app.post("/submit-case", upload.single("attachment"), async (req, res) => {
  const {
    Environment, Product, Description,
    RaisedBy, IssueType, Status, Impact, Priority
  } = req.body;

  const attachmentPath = req.file ? req.file.path : null;

  


  if (!Environment || !Product || !Description || !RaisedBy || !IssueType || !Status || !Impact || !Priority) {
    return res.status(400).json({ message: "❌ All fields are required." });
  }

  try {
    const caseID = await generateCaseID();
    const time = getISTDateTime();

   db.query(
    "INSERT INTO Tracker_Field (CaseID, TimeStamp, Environment, Product, Description, RaisedBy, IssueType, Status, Impact, Priority, CreatedBy, AttachmentPath) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [caseID, time, Environment, Product, Description, RaisedBy, IssueType, Status, Impact, Priority, RaisedBy, attachmentPath],

      (err) => {
        if (err) return res.status(500).json({ message: "❌ DB error: " + err.sqlMessage });

        db.query("INSERT INTO case_status (CaseID, PreviousStage, CurrentStage, UpdatedBy) VALUES (?, NULL, ?, ?)",
          [caseID, Status, RaisedBy], (logErr) => {
            if (logErr) console.error("⚠️ Logging failed:", logErr.message);
          });

        transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: RaisedBy,
          subject: `Case ${caseID} Submitted Successfully`,
          html: `
            <h2>🎫 Case ID: ${caseID}</h2>
            <p>Your case has been submitted successfully with the following details:</p>
            <ul>
              <li><strong>Product:</strong> ${Product}</li>
              <li><strong>Description:</strong> ${Description}</li>
              <li><strong>Impact:</strong> ${Impact}</li>
              <li><strong>Priority:</strong> ${Priority}</li>
              <li><strong>Attachment:</strong> ${attachmentPath ? "✔️ Received" : "❌ None"}
              </li>
            </ul>
          `
        }, (mailErr) => {
          if (mailErr) console.error("❌ Failed to send email:", mailErr.message);
        });

        res.json({ message: "✅ Case submitted successfully!", caseID });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to create case." });
  }
});



// ✅ Update Case Status
app.post("/update-case-status", (req, res) => {
  const { CaseID, PreviousStage, CurrentStage, UpdatedBy } = req.body;

  if (!CaseID || !CurrentStage || !UpdatedBy) {
    return res.status(400).json({ message: "❌ Required fields missing!" });
  }

  db.query(
    "INSERT INTO case_status (CaseID, PreviousStage, CurrentStage, UpdatedBy) VALUES (?, ?, ?, ?)",
    [CaseID, PreviousStage, CurrentStage, UpdatedBy],
    (err) => {
      if (err) return res.status(500).json({ message: "❌ Failed to update status." });
      res.json({ message: "✅ Case status updated!" });
    }
  );
});

// ✅ Reset Password
app.post("/reset-password", (req, res) => {
  const { Email } = req.body;
  const resetToken = crypto.randomBytes(32).toString("hex");

  db.query("UPDATE customer_login SET reset_token = ? WHERE Email = ?", [resetToken, Email], (err) => {
    if (err) return res.status(500).json({ message: "❌ Failed to store reset token." });

    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: Email,
      subject: "Reset Your Password",
      html: `<p>Click <a href="http://localhost:3000/set_password.html?token=${resetToken}">Reset your password</a></p>`
    }, (mailErr) => {
      if (mailErr) return res.status(500).json({ message: "❌ Failed to send email." });
      res.json({ message: "✅ Password reset link sent!" });
    });
  });
});

// ✅ Set New Password
app.post("/set-password", async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: "❌ Token and password are required!" });
  }

  db.query("SELECT Email FROM customer_login WHERE reset_token = ?", [token], async (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({ error: "❌ Invalid or expired token!" });
    }

    const Email = result[0].Email;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    db.query("UPDATE customer_login SET Password = ?, reset_token = NULL WHERE Email = ?", [hashedPassword, Email], (err) => {
      if (err) return res.status(500).json({ error: "❌ Failed to update password!" });
      res.json({ message: "✅ Password reset successful!" });
    });
  });
});

// ✅ Helpers
function getISTDateTime() {
  const now = new Date();
  const offsetMs = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(now.getTime() + offsetMs);
  return istTime.toISOString().slice(0, 19).replace('T', ' ');
}

async function generateCaseID() {
  const now = new Date();
  const yearMonth = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}`;

  return new Promise((resolve, reject) => {
    db.query(
      "SELECT MAX(CaseID) AS lastID FROM Tracker_Field WHERE CaseID LIKE ?",
      [`${yearMonth}%`],
      (err, result) => {
        if (err) return reject(err);
        let nextNum = 1;
        if (result[0].lastID) {
          nextNum = parseInt(result[0].lastID.slice(6)) + 1;
        }
        const newID = `${yearMonth}${nextNum.toString().padStart(3, '0')}`;
        resolve(newID);
      }
    );
  });
}

app.get("/api/cases", (req, res) => {
  db.query("SELECT * FROM Tracker_Field", (err, rows) => {
    if (err) return res.status(500).json({ error: "❌ DB error" });
    res.json(rows); // ✅ Sends valid JSON
  });
});

// ✅ Submit route
app.post("/submit-case", upload.single("attachment"), async (req, res) => {
  // your existing case submission logic...
});

// ✅ Agent case update route — ⬇ Add this just below the one above
app.put("/api/cases/:CaseID", (req, res) => {
  const { IssueType, Priority, AgentStatus, UpdatedBy } = req.body;
  const { CaseID } = req.params;

  db.query(
    "UPDATE Tracker_Field SET IssueType = ?, Priority = ?, AgentStatus = ? WHERE CaseID = ?",
    [IssueType, Priority, AgentStatus, CaseID],
    (err) => {
      if (err) return res.status(500).json({ message: "❌ Update failed." });

      db.query(
        "INSERT INTO case_status (CaseID, PreviousStage, CurrentStage, UpdatedBy) VALUES (?, NULL, ?, ?)",
        [CaseID, AgentStatus, UpdatedBy]
      );
      // Optional: fetch user's email from the DB first if needed
const query = "SELECT RaisedBy, Product, IssueType, Priority FROM Tracker_Field WHERE CaseID = ?";
db.query(query, [CaseID], (err, results) => {
  if (err || results.length === 0) return;

  const { RaisedBy, Product, IssueType, Priority } = results[0];

  transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: RaisedBy,
    subject: `🔔 Case ${CaseID} Updated`,
    html: `
      <h2>📌 Case Update</h2>
      <p>Your case has been updated with the following details:</p>
      <ul>
        <li><strong>Product:</strong> ${Product}</li>
        <li><strong>Issue Type:</strong> ${IssueType}</li>
        <li><strong>Priority:</strong> ${Priority}</li>
        <li><strong>Agent Status:</strong> ${AgentStatus}</li>
      </ul>
      <p>If you have further questions, feel free to reply to this email.</p>
    `
  }, (mailErr) => {
    if (mailErr) console.error("❌ Email update failed:", mailErr.message);
    else console.log(`📬 Update email sent to: ${RaisedBy}`);
  });
});


      res.json({ message: "✅ Case updated successfully." });
    }
  );
});




// ✅ Boot the server
app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
