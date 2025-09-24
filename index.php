<?php
if (!empty($_GET['q']) && $_GET['q'] === 'info') {
    phpinfo();
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Laragon</title>
  <style>
    body {
      margin: 0;
      font-family: sans-serif;
      background: #f9f9f9;
      color: #333;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .box {
      background: #fff;
      padding: 60px;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,.1);
      text-align: center;
      max-width: 700px;
    }
    h1 {
      font-size: 50px;
      margin: 0 0 20px;
    }
    a {
      color: #007bff;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    button {
      margin-top: 20px;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      background: #007bff;
      color: #fff;
      font-size: 14px;
      transition: 0.2s;
    }
    button:hover {
      background: #0056b3;
    }
  </style>
</head>
<body>
  <div class="box">
    <h1>Laragon</h1>
    <p><?php echo htmlspecialchars($_SERVER['SERVER_SOFTWARE']); ?></p>
    <p>
      PHP version: <?php echo htmlspecialchars(phpversion()); ?>
      (<a href="?q=info">info</a>)
    </p>
    <p>Document Root: <?php echo htmlspecialchars($_SERVER['DOCUMENT_ROOT']); ?></p>
    <button onclick="window.open('https://laragon.org/docs','_blank')">Getting Started</button>
  </div>
</body>
</html>
