<?php
session_start();
require 'config.php';

// CSRF Check
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
    die('⚠️ Invalid CSRF token.');
}

$user = $_POST['username'] ?? '';
$pass = $_POST['password'] ?? '';

// Limit login attempts
if (!isset($_SESSION['login_attempts'])) $_SESSION['login_attempts'] = 0;
if ($_SESSION['login_attempts'] >= 5) {
    die("🚫 Too many attempts. Try again later.");
}

// Validate credentials
if ($user === $ADMIN_USER && password_verify($pass, $ADMIN_PASS_HASH)) {
    session_regenerate_id(true); // Prevent session fixation
    $_SESSION['logged_in'] = true;
    unset($_SESSION['login_attempts']);
    header("Location: dashboard.php");
    exit;
} else {
    $_SESSION['login_attempts']++;
    header("Location: login.php?error=Invalid credentials");
    exit;
}
