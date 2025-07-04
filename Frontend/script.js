/*
const backendURL = "http://localhost:3000";
const appDiv = document.getElementById("app");

// Show Registration Form
function showRegister() {
    appDiv.innerHTML = `
    <h1>Register</h1>
    <input type="email" id="email" placeholder="Email">
    <input type="text" id="first_name" placeholder="First Name">
    <input type="text" id="middle_name" placeholder="Middle Name">
    <input type="text" id="last_name" placeholder="Last Name">
    <input type="password" id="password" placeholder="Set Password">
    <input type="checkbox" id="showPassword"> Show Password
    <button onclick="registerUser()">Register</button>
    <button id="helpButtonRegister">Need Help?</button> <!-- ✅ Ensure this exists -->
        <p>Already registered? <a href="#" onclick="showLogin()">Login here</a></p>
    `;

    setupPasswordToggle();
    setTimeout(() => setupHelpButton("helpButtonRegister"), 500); // ✅ Delay event binding
}

    setupHelpButton("helpButtonRegister");
   
 // ✅ Ensure correct ID is passed



async function registerUser() {
    const data = {
        email: document.getElementById("email").value,
        first_name: document.getElementById("first_name").value,
        middle_name: document.getElementById("middle_name").value,
        last_name: document.getElementById("last_name").value,
        password: document.getElementById("password").value
    };

    const response = await fetch(`${backendURL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    alert(result.message);

    if (result.message.includes("✅")) {
        window.location.href = "homepage.html"; // Redirect to homepage
    }
}

// Login User
async function loginUser() {
    console.log("📌 Login button clicked!");

    const email = document.getElementById("login_email").value;
    const password = document.getElementById("login_password").value;

    try {
        const response = await fetch(`${backendURL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        console.log("✅ Login Response:", result);
        alert(result.message);

        if (result.message.includes("✅")) {
            window.location.href = "homepage.html"; // Redirect to homepage
        }
    } catch (error) {
        console.error("❌ Login Error:", error);
    }
}


// Forgot Password Request
async function requestReset() {
    const email = document.getElementById("reset_email").value;

    const response = await fetch(`${backendURL}/request-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    });

    const result = await response.json();
    alert(result.message);
}

// Show Password Toggle Functionality
function setupPasswordToggle() {
    const passwordField = document.getElementById("password");
    const showPasswordCheckbox = document.getElementById("showPassword");

    showPasswordCheckbox.addEventListener("change", function () {
        passwordField.type = this.checked ? "text" : "password";
    });
}

// Show Forgot Password Screen
function showForgotPassword() {
    appDiv.innerHTML = `
        <h1>Forgot Password?</h1>
        <input type="email" id="reset_email" placeholder="Enter your email">
        <button onclick="requestReset()">Send Reset Link</button>
    `;
}

// Show Login Form
function showLogin() {
    appDiv.innerHTML = `
        <h1>Login</h1>
        <input type="email" id="login_email" placeholder="Email">
        <input type="password" id="login_password" placeholder="Password">
        <input type="checkbox" id="showLoginPassword"> Show Password
        <button id="loginBtn">Login</button>
        <button id="helpButtonLogin">Need Help?</button>
        <p><a href="#" onclick="showForgotPassword()">Forgot Password?</a></p>
    `;

    setupHelpButton("helpButtonLogin");

    // ✅ Add event listener after innerHTML update
    setTimeout(() => {
        document.getElementById("loginBtn").addEventListener("click", loginUser);
    }, 500);
}

 
 // ✅ Pass correct button ID


    // Enable password toggle for login field
    const loginPasswordField = document.getElementById("login_password");
    const showLoginPasswordCheckbox = document.getElementById("showLoginPassword");

    showLoginPasswordCheckbox.addEventListener("change", function () {
        loginPasswordField.type = this.checked ? "text" : "password";
    });
}

// Help Button: Redirects to AI chatbot
function setupHelpButton() {
    document.getElementById("helpButton").addEventListener("click", function () {
        window.location.href = "https://your-ai-bot-link.com"; // Replace with actual chatbot link
    });
}
function setupHelpButton(buttonId) {
    setTimeout(() => {
        const helpButton = document.getElementById(buttonId);
        if (helpButton) {
            helpButton.addEventListener("click", function () {
                window.open("https://your-ai-bot-link.com", "_blank"); // Opens chatbot in new tab
            });
        } else {
            console.error(`❌ Help button with ID '${buttonId}' not found!`);
        }
    }, 500); // Ensures button is fully loaded before attaching event
}

async function sendMessageToChatbot(userMessage) {
    const response = await fetch("http://localhost:3000/dialogflow", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ query: userMessage }) 
    });

    const chatbotResponse = await response.json();
    alert("🤖 Chatbot says: " + chatbotResponse.fulfillmentText);
}
*/


/*
const backendURL = "http://localhost:3000";
const appDiv = document.getElementById("app");

// Show Registration Form
function showRegister() {
    appDiv.innerHTML = `
        <h1>Register</h1>
        <input type="email" id="email" placeholder="Email">
        <input type="text" id="first_name" placeholder="First Name">
        <input type="text" id="middle_name" placeholder="Middle Name">
        <input type="text" id="last_name" placeholder="Last Name">
        <input type="password" id="password" placeholder="Set Password">
        <input type="checkbox" id="showPassword"> Show Password
        <button onclick="registerUser()">Register</button>
        <p>Already registered? <a href="#" onclick="showLogin()">Login here</a></p>
    `;

    setupPasswordToggle(); // Enable show/hide password feature
}

// Register User
async function registerUser() {
    const data = {
        email: document.getElementById("email").value,
        first_name: document.getElementById("first_name").value,
        middle_name: document.getElementById("middle_name").value,
        last_name: document.getElementById("last_name").value,
        password: document.getElementById("password").value
    };

    const response = await fetch(`${backendURL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    alert(result.message);

    if (result.message.includes("✅")) {
        window.location.href = "homepage.html"; // Redirect to homepage
    }
}

// Login User
async function loginUser() {
    const email = document.getElementById("login_email").value;
    const password = document.getElementById("login_password").value;

    console.log("📧 Sending login request:", { email, password });

    try {
        const response = await fetch(`${backendURL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        console.log("✅ Login Response:", result);
        alert(result.message);

        if (result.message.includes("✅")) {
            window.location.href = "homepage.html"; // Redirect to homepage
        }
    } catch (error) {
        console.error("❌ Login Error:", error);
    }
}

// Forgot Password Request
async function requestReset() {
    const email = document.getElementById("reset_email").value;

    const response = await fetch(`${backendURL}/request-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    });

    const result = await response.json();
    alert(result.message);
}

// Show Password Toggle Functionality
function setupPasswordToggle() {
    const passwordField = document.getElementById("password");
    const showPasswordCheckbox = document.getElementById("showPassword");

    showPasswordCheckbox.addEventListener("change", function () {
        passwordField.type = this.checked ? "text" : "password";
    });
}

// Show Forgot Password Screen
function showForgotPassword() {
    appDiv.innerHTML = `
        <h1>Forgot Password?</h1>
        <input type="email" id="reset_email" placeholder="Enter your email">
        <button onclick="requestReset()">Send Reset Link</button>
    `;
}

// Show Login Form
function showLogin() {
    appDiv.innerHTML = `
        <h1>Login</h1>
        <input type="email" id="login_email" placeholder="Email">
        <input type="password" id="login_password" placeholder="Password">
        <input type="checkbox" id="showLoginPassword"> Show Password
        <button onclick="loginUser()">Login</button>
        <p><a href="#" onclick="showForgotPassword()">Forgot Password?</a></p>
    `;

    // Enable password toggle for login field
    const loginPasswordField = document.getElementById("login_password");
    const showLoginPasswordCheckbox = document.getElementById("showLoginPassword");

    showLoginPasswordCheckbox.addEventListener("change", function () {
        loginPasswordField.type = this.checked ? "text" : "password";
    });
}
*/

const backendURL = "http://localhost:3000";
const appDiv = document.getElementById("app");

function hideMainContent() {
  const main = document.getElementById("mainContent");
  if (main) main.style.display = "none";
}

function showMainContent() {
  const main = document.getElementById("mainContent");
  if (main) main.style.display = "block";
  appDiv.innerHTML = ""; // clears Login/Register form
}

// ✅ Show Register Form
function showRegister() {
  hideMainContent();
  appDiv.innerHTML = `
    <h1>Register</h1>
    <input type="text" id="name" placeholder="Name" required>
    <input type="email" id="email" placeholder="Email" required>
    <input type="text" id="phone" placeholder="Phone" required>
    <input type="password" id="password" placeholder="Password" required>
    <button onclick="registerUser()">Register</button>
    <p>Already registered? <a href="#" onclick="showLogin()">Login here</a></p>
  `;
}

async function registerUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  if (!name || !email || !phone || !password) {
    alert("❌ All fields are required!");
    return;
  }

  try {
    const response = await fetch(`${backendURL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Name: name, Email: email, Phone: phone, Password: password })
    });

    const result = await response.json();
    alert(result.message || result.error);

    if (result.message?.includes("✅")) {
      showLogin();
    }
  } catch (error) {
    console.error("❌ Registration error:", error);
    alert("❌ Failed to register.");
  }
}

// ✅ Show Login Form
function showLogin() {
  hideMainContent();
  appDiv.innerHTML = `
    <h1>Login</h1>
    <label for="login_role">I am a:</label>
    <select id="login_role" required>
      <option value="customer">Customer</option>
      <option value="support">Support Agent</option>
    </select><br><br>
    <input type="email" id="login_email" placeholder="Email" required>
    <input type="password" id="login_password" placeholder="Password" required>
    <button onclick="loginUser()">Login</button>
    <p><a href="#" onclick="showForgotPassword()">Forgot Password?</a></p>
  `;
}

async function loginUser() {
  const email = document.getElementById("login_email").value;
  const password = document.getElementById("login_password").value;
  const role = document.getElementById("login_role")?.value || "customer";
  const route = role === "support" ? "/login-agent" : "/login";

  if (!email || !password) {
    alert("❌ Email and password are required!");
    return;
  }

  try {
    const response = await fetch(`${backendURL}${route}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Email: email, Password: password })
    });

    const result = await response.json();
    alert(result.message || result.error);

    if (result.message?.includes("✅")) {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userName", result.name || "User");

      if (role === "support") {
        window.location.href = "agent_dashboard.html";
      } else {
        showUserOptions();
      }
    }
  } catch (error) {
    console.error("❌ Login error:", error);
    alert("❌ Login failed.");
  }
}

function showForgotPassword() {
  hideMainContent();
  appDiv.innerHTML = `
    <h1>Forgot Password</h1>
    <input type="email" id="reset_email" placeholder="Enter Your Email">
    <button onclick="sendResetLink()">Send Reset Link</button>
    <p><a href="#" onclick="showLogin()">⬅ Back to Login</a></p>
  `;
}

async function sendResetLink() {
  const email = document.getElementById("reset_email").value;
  if (!email) {
    alert("❌ Please enter your email!");
    return;
  }

  try {
    const response = await fetch(`${backendURL}/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Email: email })
    });

    const result = await response.json();
    alert(result.message || result.error);
  } catch (error) {
    console.error("❌ Password reset error:", error);
    alert("❌ Could not send reset link.");
  }
}

// ✅ Show Options for Logged-In User
function showUserOptions() {
  const userName = localStorage.getItem("userName") || "User";
  appDiv.innerHTML = `
    <h2>Welcome, ${userName}!</h2>
    <button onclick="showCaseSubmissionForm()">Create a New Case</button>
    <button onclick="logout()">Logout</button>
  `;
}

function showPortal() {
  appDiv.innerHTML = `
    <h2>🚀 About Purple Chillies Solutions</h2>
    <p>Empowering businesses through technology-driven solutions!</p>
    <a href="about.html" class="enter-portal-button">Explore More</a>
    <button onclick="showUserOptions()">⬅ Back</button>
  `;
}

function logout() {
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userRole");
  location.reload();
}



// ✅ Show Case Submission Form
function showCaseSubmissionForm() {
  hideMainContent();
  const raisedBy = localStorage.getItem("userEmail") || "";

  appDiv.innerHTML = `
    <div class="case-form">
      <h2>Submit a New Case</h2>

      <label>Environment</label>
      <select id="environment">
        <option value="Prod">Prod</option>
        <option value="QA">QA</option>
        <option value="Dev">Dev</option>
      </select>

      <label>Product</label>
      <select id="product">
        <option value="Salesforce">Salesforce</option>
        <option value="Customer Portal">Customer Portal</option>
        <option value="Marketing Cloud">Marketing Cloud</option>
      </select>

      <label>Description</label>
      <textarea id="description" placeholder="Describe your issue" rows="4"></textarea>

      <label>Issue Type</label>
      <select id="issueType">
        <option value="Task">Task</option>
        <option value="New Project">New Project</option>
        <option value="Incident">Incident</option>
        <option value="Change Request">Change Request</option>
      </select>

      <label>Status</label>
      <select id="status" name="status">
        <option value="Identified">Identified</option>
        <option value="Approved">Approved</option>
        <option value="New">New</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="Closed">Closed</option>
        <option value="Testing">Testing</option>
        <option value="Rejected">Rejected</option>
        <option value="On Hold">On Hold</option>
      </select>

      <label>Impact</label>
      <select id="impact">
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <label>Priority</label>
      <select id="priority">
        <option value="Critical">Critical</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <label>Attach File (optional)</label>
      <input type="file" id="attachment" />

      <button onclick="submitCase()">Submit Case</button>
      <button onclick="showUserOptions()">⬅ Back</button>
    </div>
  `;
}

console.log("📤 Submitting case...");
console.log("Selected file:", document.getElementById("attachment").files[0]);

// ✅ Modified Case Submission with File Support
async function submitCase() {
  const formData = new FormData();

  formData.append("Environment", document.getElementById("environment").value);
  formData.append("Product", document.getElementById("product").value);
  formData.append("Description", document.getElementById("description").value);
  formData.append("RaisedBy", localStorage.getItem("userEmail"));
  formData.append("IssueType", document.getElementById("issueType").value);
  formData.append("Status", document.getElementById("status").value);
  formData.append("Impact", document.getElementById("impact").value);
  formData.append("Priority", document.getElementById("priority").value);

const fileInput = document.getElementById("attachment");
if (fileInput && fileInput.files.length > 0) {
  formData.append("attachment", fileInput.files[0]);
}

try {
  const response = await fetch(`${backendURL}/submit-case`, {
    method: "POST",
    body: formData
  });

  const result = await response.json();
  alert(result.message + (result.caseID ? `\nYour Case ID: ${result.caseID}` : ""));
  showUserOptions();
} catch (error) {
  console.error("❌ Case submission failed:", error);
  alert("❌ Failed to submit case.");
}
}


