<!doctype html>
<html class="no-js" lang="en">

<head>
	<meta charset="utf-8" />
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>OnlineS3 Application Template</title>
	<link rel="stylesheet" href="css/font-awesome/css/font-awesome.min.css" />
	<link rel="stylesheet" href="css/layout.css" />
	<link rel="stylesheet" href="css/header.css" />
	<link rel="stylesheet" href="css/footer.css" />
	<link rel="stylesheet" href="css/region.css" />
    <link rel="stylesheet" href="css/backButton.css" />
</head>

<body>

	<div id="page">

		<div id="mainpage" class="site">

			<!-- site header -->
			<header id='site-header'>

				<nav id='top-menu'>
					<ul>
						<li><a href='http://www.onlines3.eu/'>Online S3 Project</a></li>
						<li class="active"><a href='#'><i class="fa fa-lightbulb-o" aria-hidden="true"></i>Applications</a></li>
						<li><a href='#'/><i class="fa fa-cog" aria-hidden="true"></i>Toolbox</a></li>
						<li><a href='#'/><i class="fa fa-bar-chart" aria-hidden="true"></i>Analytics</a></li>
						<li><a href='#'/><i class="fa fa-life-ring" aria-hidden="true"></i></i>Support</a></li>
						<li><a href='#'/><i class="fa fa-envelope-o" aria-hidden="true"></i>Contact</a></li>
					</ul>
				</nav>

				<div id='header-main'>

					<div class='top-section'>
						<div class='headers'>
							<img class='logo-img' src='img/logo.png' width='77'>
							<div>
								<p class="heading"><a href='#'>Online S3 Platform</a></p>
								<p class="sub-heading">Regional scientific production profile</p>
							</div>
						</div>

						<div class="social-links">
							<a href="https://twitter.com/online_s3" title="Twitter" target="_blank"><i class="fa fa-twitter-square" aria-hidden="true"></i></a>
							<a href="https://plus.google.com/102042915278982824881" title="Google+" target="_blank"><i class="fa fa-google-plus-square" aria-hidden="true"></i></a>
							<a href="https://www.youtube.com/channel/UCuYNnd9rdrN_EbF5_P0Nmog" title="YouTube" target="_blank"><i class="fa fa-youtube-square" aria-hidden="true"></i></a>

							<!-- <a href="https://twitter.com/online_s3" title="Twitter" target="_blank">L</a>  -->
							<!-- <a href="https://plus.google.com/102042915278982824881" title="Google+" target="_blank">G</a>  -->
							<!-- <a href="https://www.youtube.com/channel/UCuYNnd9rdrN_EbF5_P0Nmog" title="YouTube" target="_blank">X</a>  -->
							<!-- <a href="http://www.onlines3.eu/feed/" title="Newsfeed" target="_blank">R</a> -->
						</div>
					</div>

					<div class='bottom-section'>
						<div class="menu">
							<ul>
								<li><a href="index.html">About</a></li>
								<li><a href="guide.html">Guide</a></li>
								<li><a href="doc.html">Related Documents</a></li>
								<li><a id='tool' href='app.php'>Access to application</a></li>
							</ul>
						</div>

						<div class='user-btns'>
							<button class='login-btn'> Sign in </button>
							<button class='register-btn'> Sign up </button>
						</div>
					</div>

				</div>

				<div id='breadcrumb'>
					<ul>
						<li><a href='#'>Online S3 Platform</a></li>
						<li><a href='#'>Analysis of context</a></li>
						<li><span>Regional scientific production profile</span></li>
					</ul>
				</div>

			</header>
			<!-- site header -->

			<!-- Application's space -->
			<div class="site-content">
                
                <article id="main-content">
                
                    <button class="btn btn-primary" onclick="location.href='app.php'">
                        <i class="fa fa-arrow-left" aria-hidden="true"></i>
                            Back to Main
                    </button>
				    <h1 id="countryName"><?php echo $_GET['country'];?> Regions :</h1>
				    <form class="form-wrapper" action="results.php" method="get">
					   <select id="search" name="region" required>
						  <?php
						  require_once $_SERVER['DOCUMENT_ROOT'] . '/related_var/backend/getRegions.php';
						  $array = getRegions($_GET['country']);

						  foreach($array as $value){
							 echo '<option value="'.$value.'">'.$value.'</option>';
						  }
						  ?>
					   </select>
					   <input type="submit" value="go" id="submit">
				    </form>
                </article>
			</div>
			<!-- Application's space -->

			<!-- site footer -->
			<footer id='site-footer'>

				<div id="footer-links">
					<ul>
						<li><a href="#"><span>Online S3 Project</span></a></li>
						<li class="active"><a href="#"><span>Applications</span></a></li>
						<li><a href="#"><span>Toolbox</span></a></li>
						<li><a href="#"><span>Analytics</span></a></li>
						<li><a href="#">Support</span></a></li>
						<li><a href="#"><span>Contact</span></a></li>
					</ul>
					<div id='copyright'>
						<img src="img/logo.png" width="30" alt="online logo">
						<p>Copyright &copy; 2016-2017 OnlineS3 Project</p>
					</div>
				</div>

				<div id="european">
					<img src="img/eu_logo.png" width="85" alt="Co-funded by the European Union">

					<p>
						Funded by the Horizon 2020 Framework Programme of the European Union.
					</p>
				</div>

			</footer>

			<!-- site footer -->
		</div>
	</div>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</html>