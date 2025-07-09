<?php
session_start();
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header("Location: login.php");
    exit;
}
?>

<!DOCTYPE html>
<html>
<head>
  <title>Admin Dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <h1>✅ Welcome, Admin</h1>
  <p>You are logged in securely.</p>
  <a href="logout.php">Logout</a>
</body>
</html>
