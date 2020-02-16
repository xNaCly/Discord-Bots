<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
		<link rel="stylesheet" href="src/css/bootstrap.min.css" />
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" />
		<link rel="stylesheet" href="src/css/addons/bootstrap-select.min.css" />
		<link rel="stylesheet" href="src/css/emojionearea.css" />
		<link rel="stylesheet" href="src/css/simple-sidebar.css" />
		<link rel="stylesheet" href="src/css/index.css" />
		<title>Odium - The Discord Bot</title>
	</head>
	<body>
		<noscript>You need to enable JavaScript to use Odium Admin Panel.</noscript>
		<div class="mask">
			<?php
require "header.php";
require "dashboard/index.php";
require "home.php";
require "footer.php";
?>

			<a id="back-to-top" href="#" class="btn btn-primary btn-lg back-to-top">
				<i class="fas fa-chevron-up"></i>
			</a>
		</div>
		<div id="load" style="display:none">
			<div class="d-flex text-white" style="align-items: center;flex-direction: column;">
				<div class="spinner-border"></div>
				<br />
				<p>
					Logging in ...
				</p>
			</div>
		</div>

		<script src="src/js/js.cookie.js"></script>
		<script src="src/js/base64.min.js"></script>
		<script src="src/js/socket.io.js"></script>
		<script src="src/js/jquery-3.3.1.min.js"></script>
		<script src="src/js/popper.min.js"></script>
		<script src="src/js/moment.js"></script>
		<script src="src/js/emojionearea.js"></script>
		<script src="src/js/bootstrap.min.js"></script>
		<script src="src/js/addons/bootstrap-select.min.js"></script>
		<script src="src/js/settings.js"></script>
		<script src="src/js/commands.js"></script>
		<script src="src/js/help.js"></script>
		<script src="src/js/index.js"></script>
	</body>
</html>
