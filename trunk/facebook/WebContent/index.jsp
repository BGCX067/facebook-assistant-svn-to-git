<%@page import="ch.ethz.globis.web.facebook.Config"%>
<html>
	<head>
		<style type="text/css">
			* {
				font-family: Arial;
			}
		</style>
		<title></title>
	</head>
	<body>
		<div style="width: 71%">
			<h1>Welcome to your own Facebook application!</h1>
			<p>Please click the following button to login with your Facebook account.</p>
	
			<div id="fb-root">
				<script src="http://connect.facebook.net/en_US/all.js"></script>
				<script>
				    var appId = "<%= Config.getValue("APP_ID") %>";
				    var channelFile = "<%= Config.getValue("CHANNEL_FILE") %>";
				    if (appId == "!APP_ID!") {
				    	alert("You need to set your Application ID/API_KEY in config.properties.")
				    } else {
						FB.init({appId: appId, channelUrl: channelFile, status: true, cookie: true, xfbml: true, oauth: true });
						FB.login(function(response) {
							if (response.authResponse) {
								var accessToken = response.authResponse.accessToken;
								if (accessToken) {
									var redirectUrl = '<%= Config.getValue("FRIENDS_URL") %>?access_token=' + accessToken;
									window.location = redirectUrl;
								} else {
									alert('Error: No access token.');
								}
							} else {
								// The user has logged out, and the cookie has been cleared
							}
						  }, { scope: 'friends_birthday, friends_hometown, friends_interests, friends_checkins, user_checkins,user_status, friends_status' });
					}
				</script>
			</div>
			<fb:login-button></fb:login-button>
		</div>
	</body>
</html>