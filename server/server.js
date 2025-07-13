const express = require('express');

const con = require('./dbConnection.js');
const bcrypt = require('bcrypt');
const cors = require('cors');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const app = express();
const port = 4000;
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// Define a secret key for JWT. In a real application, this should be in an environment variable.
const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_jwt_key"; 

// Utility function to generate consultation salt
function generateConsultationSalt(userId, username) {
  return crypto
    .createHash("sha256")
    .update(`${userId}${username}${Date.now()}`)
    .digest("hex");
}

// Utility function to generate license number
function generateLicenseNumber() {
  return `LIC${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

// Function to get user by username
async function getUserByUsername(username) {
  try {
    const [records] = await con
      .promise()
      .query("SELECT * FROM Users WHERE username = ?", [username]);
    return records.length > 0 ? records[0] : null; // Return the user object or null
  } catch (err) {
    console.error("Error checking user:", err.message);
    throw new Error("Database error during user lookup.");
  }
}

// Function to create user based on role
async function createUserByRole(userData) {
  const {
    username,
    email,
    hashedPassword,
    preferred_language,
    user_type,
    specialization,
    admin_role,
    license_expdate,
  } = userData;

  console.log("----------------------------------");
  console.log(user_type);
  console.log("----------------------------------");

  // Insert into users table
  const [userResult] = await con
    .promise()
    .query(
      "INSERT INTO Users (username, email, user_password, user_type, preferred_language, creation_date) VALUES (?, ?, ?, ?, ?, NOW())",
      [username, email, hashedPassword, user_type, preferred_language]
    );

  const userId = userResult.insertId;

  // Insert into role-specific table
  if (user_type === "patient") {
    const consultationStart = generateConsultationSalt(userId, username);
    await con
      .promise()
      .query(
        "INSERT INTO Patient (user_id, consultation_start, username, email, creation_date) VALUES (?, ?, ?, ?, NOW())",
        [userId, consultationStart, username, email]
      );
  } else if (user_type === "therapist") {
    const licenseNumber = generateLicenseNumber();
    await con
      .promise()
      .query(
        "INSERT INTO Therapist (user_id, specialization, license_number, username, email, license_expdate) VALUES (?, ?, ?, ?, ?, ?)",
        [
          userId,
          specialization,
          licenseNumber,
          username,
          email,
          license_expdate,
        ]
      );
  } else if (user_type === "system_admin") {
    await con
      .promise()
      .query(
        "INSERT INTO System_Admin (user_id, admin_role, username, email, start_date) VALUES (?, ?, ?, ?, NOW())",
        [userId, admin_role, username, email]
      );
  } else if (user_type === "customer_care") {
    await con
      .promise()
      .query(
        "INSERT INTO Customer_Care (user_id, username, email, start_date) VALUES (?, ?, ?, NOW())",
        [userId, username, email]
      );
  }

  return userId;
}

app.post("/register", async (req, res) => {
  const {
    username,
    email,
    password,
    user_type,
    preferred_language,
    specialization,
    admin_role,
    license_expdate,
  } = req.body;

  // Check if user already exists
  try {
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists. Please log in." });
    }
  } catch (err) {
    console.error("Error during user existence check:", err.message);
    return res.status(500).json({ message: "Internal server error during registration." });
  }

  // Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  console.log([
    username,
    email,
    hashedPassword,
    user_type,
    preferred_language,
    specialization,
    admin_role,
  ]);

  // Insert user into DB
  try {
    // Start transaction
    await con.promise().query("START TRANSACTION");
    const userData = {
      username,
      email,
      hashedPassword,
      user_type,
      preferred_language: preferred_language || "en",
      specialization,
      admin_role,
      license_expdate,
    };

    const userId = await createUserByRole(userData);

    // Commit transaction
    await con.promise().query("COMMIT");

    console.log("---------------------------------------");
    console.log(`User created with ID: ${userId}`);
    console.log("---------------------------------------");

    return res.status(200).json({
      message: "User created successfully",
      user_id: userId,
      username: username,
      email: email,
      role: user_type,
    });
  } catch (err) {
    // Rollback transaction on error
    await con.promise().query("ROLLBACK");

    // Log specific error codes
    if (err.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("Database access denied. Check your credentials.");
    } else if (err.code === "ER_BAD_DB_ERROR") {
      console.error("Database does not exist. Check your DB name.");
    } else if (err.code === "ER_PARSE_ERROR") {
      console.error("SQL syntax error:", err.message);
    } else if (err.code === "ECONNREFUSED") {
      console.error("Database connection refused. Is MySQL running?");
    } else if (err.code === "ETIMEDOUT") {
      console.error("Database connection timed out.");
    } else if (err.code === "ER_DUP_ENTRY") {
      console.error("Duplicate entry:", err.message);
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    } else {
      console.error("Unexpected error:", err.message);
    }

    return res
      .status(500)
      .json({ message: `Internal Server Error: ${err.message}` });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("--------------------------------");
  console.log(req.body);
  console.log("--------------------------------");

  try {
    // 1. Get the user from the database
    const user = await getUserByUsername(username);

    // 2. Check if the user exists
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    // 3. Compare the provided password with the hashed password from the database
    const hashedPassword = user.user_password;
    const isValid = await bcrypt.compare(password, hashedPassword);

    // 4. Respond based on password validity
    if (isValid) {
      console.log("Password matches!");
      // Generate a JWT token
      const token = jwt.sign(
        { user_id: user.user_id, user_type: user.user_type, username: user.username },
        JWT_SECRET,
        { expiresIn: "1h" } // Token expires in 1 hour
      );

      // For security, avoid sending the hashed password back to the frontend
      const { user_password, ...userWithoutPassword } = user;
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: userWithoutPassword, // Send user data without the password
        token: token, // Send the JWT token
      });
    } else {
      return res.status(400).json({
        message: "Invalid username or password.", // General message for security
      });
    }
  } catch (err) {
    console.error("Error during login:", err.message);
    return res.status(500).json({ message: `Internal Server Error: ${err.message}` });
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer TOKEN"

  if (token == null) {
    return res.status(401).json({ message: "Access Denied: No token provided." });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error("JWT verification error:", err.message);
      return res.status(403).json({ message: "Access Denied: Invalid token." });
    }
    req.user = user; // Attach decoded user payload to the request
    next(); // Proceed to the next middleware/route handler
  });
};

// New endpoint to post a journal entry
app.post("/postJournal", authenticateToken, async (req, res) => {
  const { journal_title, journal_entry, mood_rating } = req.body;
  const { user_id, user_type } = req.user; // Get user_id and user_type from the authenticated token

  // Ensure only patients can post journal entries
  if (user_type !== 'patient') {
    return res.status(403).json({ message: "Forbidden: Only patients can post journal entries." });
  }

  try {
    // Get the patient_id from the Patient table using the user_id
    const [patientRecords] = await con.promise().query(
      "SELECT patient_id FROM Patient WHERE user_id = ?",
      [user_id]
    );

    if (patientRecords.length === 0) {
      return res.status(404).json({ message: "Patient profile not found for this user." });
    }

    const patient_id = patientRecords[0].patient_id;

    // Insert the journal entry into the journal_entry table
    const [result] = await con.promise().query(
      "INSERT INTO Journal_Entry (patient_id, entry_date, journal_title, journal_entry, mood_rating) VALUES (?, NOW(), ?, ?, ?)",
      [patient_id, journal_title, journal_entry, mood_rating]
    );

    return res.status(201).json({
      message: "Journal entry posted successfully",
      journal_id: result.insertId,
    });

  } catch (err) {
    console.error("Error posting journal entry:", err.message);
    // Log specific error codes for debugging
    if (err.code === "ER_BAD_FIELD_ERROR") {
        console.error("SQL field error: Check column names in journal_entry table.");
    } else if (err.code === "ER_NO_REFERENCED_ROW_2") {
        console.error("Foreign key constraint failed: patient_id might not exist.");
    }
    return res.status(500).json({ message: `Internal Server Error: ${err.message}` });
  }
});

// Endpoint to fetch all journal entries for a specific user by username
app.get('/journals/:username', authenticateToken, async (req, res) => {
  const { username } = req.params;
  try {
    // Get user_id from Users table
    const [userRows] = await con.promise().query(
      'SELECT user_id FROM Users WHERE username = ?',
      [username]
    );
    if (userRows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user_id = userRows[0].user_id;
    // Get patient_id from Patient table
    const [patientRows] = await con.promise().query(
      'SELECT patient_id FROM Patient WHERE user_id = ?',
      [user_id]
    );
    if (patientRows.length === 0) {
      return res.status(404).json({ message: 'Patient profile not found for this user.' });
    }
    const patient_id = patientRows[0].patient_id;
    // Get all journal entries for this patient
    const [journalRows] = await con.promise().query(
      'SELECT * FROM Journal_Entry WHERE patient_id = ? ORDER BY entry_date DESC',
      [patient_id]
    );
    return res.status(200).json({ entries: journalRows });
  } catch (err) {
    console.error('Error fetching journals by username:', err.message);
    return res.status(500).json({ message: `Internal Server Error: ${err.message}` });
  }
});

// Endpoint to fetch chat messages for a user or chat_identifier
app.get('/chat/messages', authenticateToken, async (req, res) => {
  const { chat_identifier, other_party_id } = req.query;
  const { user_id, user_type } = req.user;
  try {
    let patient_id = null, therapist_id = null;
    if (user_type === 'patient') {
      // Get patient_id for this user
      const [patientRows] = await con.promise().query('SELECT patient_id FROM Patient WHERE user_id = ?', [user_id]);
      if (patientRows.length === 0) return res.status(404).json({ message: 'Patient profile not found.' });
      patient_id = patientRows[0].patient_id;
      if (other_party_id) therapist_id = other_party_id;
    } else if (user_type === 'therapist') {
      // Get therapist_id for this user
      const [therapistRows] = await con.promise().query('SELECT therapist_id FROM Therapist WHERE user_id = ?', [user_id]);
      if (therapistRows.length === 0) return res.status(404).json({ message: 'Therapist profile not found.' });
      therapist_id = therapistRows[0].therapist_id;
      if (other_party_id) patient_id = other_party_id;
    }
    let query = 'SELECT * FROM chat WHERE 1=1';
    const params = [];
    if (chat_identifier) {
      query += ' AND chat_identifier = ?';
      params.push(chat_identifier);
    }
    if (patient_id) {
      query += ' AND patient_id = ?';
      params.push(patient_id);
    }
    if (therapist_id) {
      query += ' AND therapist_id = ?';
      params.push(therapist_id);
    }
    query += ' ORDER BY message_timestamp ASC';
    const [rows] = await con.promise().query(query, params);
    return res.status(200).json({ messages: rows });
  } catch (err) {
    console.error('Error fetching chat messages:', err.message);
    return res.status(500).json({ message: `Internal Server Error: ${err.message}` });
  }
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});