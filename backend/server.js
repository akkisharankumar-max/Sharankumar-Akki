
// ======================================
// SHARANKUMAR N AKKI - PORTFOLIO BACKEND
// ======================================

const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// ======================================
// 1. MIDDLEWARE
// ======================================

app.use(cors({
    origin: [
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://127.0.0.1:5501",
        "http://localhost:5501"
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json({ limit: "10kb" }));

// ======================================
// 2. PORTFOLIO INFORMATION
// ======================================

const portfolio = {
    name: "Sharankumar N Akki",
    college: "Canara Engineering College",
    role: "Full Stack Developer",
    skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "C Programming",
        "Arduino / ESP32",
        "Electronics"
    ]
};

// ======================================
// 3. HOME ROUTE
// ======================================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});

// ======================================
// 4. HEALTH CHECK API
// ======================================

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "Online",
        message: "Backend connected successfully!"
    });
});

// ======================================
// 5. PORTFOLIO API
// ======================================

app.get("/api/portfolio", (req, res) => {
    res.status(200).json({
        success: true,
        data: portfolio
    });
});

// ======================================
// 6. CONTACT FORM API
// ======================================

app.post("/api/contact", (req, res) => {

    const { name, email, subject, message } = req.body || {};

    // Validate required fields
    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof subject !== "string" ||
        typeof message !== "string" ||
        !name.trim() ||
        !email.trim() ||
        !subject.trim() ||
        !message.trim()
    ) {
        return res.status(400).json({
            success: false,
            message: "Please fill in all required fields."
        });
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid email address."
        });
    }

    // Display contact message in terminal
    console.log("New Contact Message:", {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim()
    });

    // Send success response
    return res.status(202).json({
        success: true,
        message: "Your message reached the backend successfully!"
    });
});

// ======================================
// 7. SERVE FRONTEND FILES
// ======================================

// Prevent access to backend source and dependencies
app.use("/backend", (req, res) => {
    res.status(404).send("Not Found");
});

// Serve CSS, JavaScript and other frontend assets
app.use(express.static(path.join(__dirname, "..")));

// ======================================
// 8. INVALID API ROUTE HANDLER
// ======================================

app.use("/api", (req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found."
    });
});

// ======================================
// 9. ERROR HANDLER
// ======================================

app.use((err, req, res, next) => {
    console.error("Server Error:", err.message);

    res.status(500).json({
        success: false,
        message: "Internal server error."
    });
});

// ======================================
// 10. START SERVER
// ======================================

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log("-----------------------------------");
    console.log("SHARANKUMAR N AKKI PORTFOLIO");
    console.log("Backend Server: RUNNING");
    console.log(`URL: http://localhost:${PORT}`);
    console.log("-----------------------------------");
});

server.on("error", (err) => {
    console.error("Server startup error:", err.message);
});
