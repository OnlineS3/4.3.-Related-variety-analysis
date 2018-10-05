
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
	<link rel="stylesheet" href="css/tab.css" />
    <link rel="stylesheet" href="css/backButton.css" />
	<link rel="stylesheet" href="css/treelikeGraph.css" />
    <link rel = "stylesheet" href = "//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
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

					<div class="tab">
						<button class="tablinks" onclick="openTab(event, 'tab1')" id="defaultOpen">tab1</button>
						<button class="tablinks" onclick="openTab(event, 'tab2')">tab2</button>
                        <button class="tablinks" onclick="openTab(event, 'tab3')">tab3</button>
						<button class="tablinks" onclick="openTab(event, 'tab4')">tab4</button>
					</div>

					<div id="tab1" class="tabcontent">
                        <div class="ui-state-highlight ui-corner-all">
		                      <p><span class="ui-icon ui-icon-info"></span>
		                      By clicking on a circle you can see or hide its name and number of workers, if it is not a region .</p>
                        </div>
                        
						<div align='center' id="treelikeGraph"></div>
                        
                        <button id="saveImgButton1" class="btn btn-primary">
                            <i class="fa" aria-hidden="true"></i>
                                Save as image
                        </button>
					</div>

					<div id="tab2" class="tabcontent">
                        <div class="ui-state-highlight ui-corner-all">
		                      <p><span class="ui-icon ui-icon-info"></span>
		                      By clicking on a circle you can see or hide its name and number of workers, if it is not a region .</p>
                        </div>
                        
						<div align='center' id="coloredGraph"></div>
                        
                        <button id="saveImgButton2" class="btn btn-primary">
                            <i class="fa" aria-hidden="true"></i>
                                Save as image
                        </button>
					</div>
                    
                    <div id="tab3" class="tabcontent">
                        <div class="ui-state-highlight ui-corner-all">
		                      <p><span class="ui-icon ui-icon-info"></span>
		                      By clicking on a circle you can see or hide its name and number of workers, if it is not a region .</p>
                        </div>
                        
						<div align='center' id="specializationGraph"></div>  
                        
                        <button id="saveImgButton3" class="btn btn-primary">
                            <i class="fa" aria-hidden="true"></i>
                                Save as image
                        </button>
					</div>
                    
                    <div id="tab4" class="tabcontent">
                        <div class="ui-state-highlight ui-corner-all">
		                      <p><span class="ui-icon ui-icon-info"></span>
		                      By clicking on a circle you can see or hide its name and number of workers, if it is not a region .</p>
                        </div>
                        
                        <div class="ui-state-highlight ui-corner-all" id="infoBox" >
		                      <p><span class="ui-icon ui-icon-info"></span>
		                      By double clicking on a red circle you can see its correlated sectors, if there are any.</p>
                        </div>
                        
						<div align='center' id="correlationGraph"></div>
                        
                        <button id="saveImgButton4" class="btn btn-primary">
                            <i class="fa" aria-hidden="true"></i>
                                Save as image
                        </button>
					</div>

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
<script src="http://d3js.org/d3.v3.min.js"></script>
<script type = "text/javascript" src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>	
<script type = "text/javascript" src = "https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
<script src="js/treelikeGraph.js"></script>
<script type="text/javascript" src="js/tab.js"></script>
<script type="text/javascript" src="js/graphData.js"></script>
<script type="text/javascript" src="js/simg.js"></script>
<script type="text/javascript" src="js/png.js"></script>
</html>
