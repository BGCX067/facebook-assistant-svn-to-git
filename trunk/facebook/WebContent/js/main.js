var markers = [];
var lastInfoWindow;
var isOpen = false;



$(window).resize(
		function() {
			$("#map_canvas").height($("#friend_list").height() - $('#mngb').height());
			$("#friend_list").height($($("#friend_list")).height() - $('#mngb').height());
		});

//Start everything
$(function() {
	$("#map_canvas").height($("#friend_list").height() - $('#mngb').height());
	$("#friend_list").height($($("#friend_list")).height() - $('#mngb').height());
	initialize();
	$(".nomarkers").hide();
	$(".cloader").hide();
	var firstOpen = true;

	$("#sortable").sortable({
		scroll : true,
		cursor: 'pointer'
	});
	$("#sortable").disableSelection();
	
	// descending sort
	function dec_sort(a, b){
		 var compA = $(a).text();
         var compB = $(b).text();
         return (compA > compB) ? -1 : (compA < compB) ? 1 : 0;  
	}

	// ascending sort
	function asc_sort(a, b){
	   var compA = $(a).text();
       var compB = $(b).text();
       return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
	}
	
	$(".trigger").click(function(){
		isOpen = isOpen?false:true;
	})
	
	$("#sorter").click(function() {
		if ($(this).hasClass("asc")) {
			$(this).removeClass("asc").addClass("dec");
			$(".autosort li").sort(dec_sort).appendTo('.autosort');
		} else {
			$(this).removeClass("dec").addClass("asc");
			$(".autosort li").sort(asc_sort).appendTo('.autosort');
		}
		$(this).find(".sortarrow").toggleClass("ui-icon-triangle-1-n");
		$(this).find(".sortarrow").toggleClass("ui-icon-triangle-1-s");	
	});
	$("#sorter").disableSelection();
	$(".autosort li").sort(asc_sort).appendTo('.autosort');
	
	//click on a friend
	$("#sortable li").click(function() {
		$(".nomarkers").hide();
		$(".cloader").show();
		
		$.each(markers, function(index, value) { 
			value.setMap(null);
		});
		markers = [];

		
		var uid = $(this).attr('id');
		
		// Load Details
		$.ajax({
			type:"POST",
			url:"/facebook/servlet/friendsdetail",
			data:"user="+uid+"&query="+"details"
		}).done(function(msg){
			if(!isOpen){
				$(".trigger").click();
				isOpen = true;
			}else{
				$(".trigger").click();
				$(".trigger").click();
			}
			var name="";
			var pic_square="";
			var birthday="";
			var sex="";
			var hometown_location="";
			var interests="";
			var religion="";
			var meeting_sex="";
			var political="";
			var quotes="";
			var status="";
			var email="";
			
			if(msg.getElementsByTagName("name")[0].firstChild != null){
				name = msg.getElementsByTagName("name")[0].firstChild.nodeValue;
			}
			if(msg.getElementsByTagName("pic_square")[0].firstChild != null){
				pic_square = msg.getElementsByTagName("pic_square")[0].firstChild.nodeValue;
			}
			if(msg.getElementsByTagName("birthday")[0].firstChild != null){
				birthday = msg.getElementsByTagName("birthday")[0].firstChild.nodeValue;
			}
			if(msg.getElementsByTagName("sex")[0].firstChild != null){
				sex = msg.getElementsByTagName("sex")[0].firstChild.nodeValue;
			}
			if(msg.getElementsByTagName("hometown_location")[0].firstChild != null){
				hometown_location = msg.getElementsByTagName("city")[0].firstChild.nodeValue;
				hometown_location +=", "+msg.getElementsByTagName("country")[0].firstChild.nodeValue;
			}
			if(msg.getElementsByTagName("interests")[0].firstChild != null){
				interests = msg.getElementsByTagName("interests")[0].firstChild.nodeValue;
			}
			if(msg.getElementsByTagName("religion")[0].firstChild != null){
				religion = msg.getElementsByTagName("religion")[0].firstChild.nodeValue;
			}
			if(msg.getElementsByTagName("meeting_sex")[0].firstChild != null){
				meeting_sex = msg.getElementsByTagName("meeting_sex")[0].firstChild.nodeValue;
			}
			if(msg.getElementsByTagName("political")[0].firstChild != null){
				quotes = msg.getElementsByTagName("political")[0].firstChild.nodeValue;
			}
			if(msg.getElementsByTagName("status")[0].firstChild != null){
				status = msg.getElementsByTagName("status")[0].firstChild.nodeValue;
			}
			if(msg.getElementsByTagName("email")[0].firstChild != null){
				email = msg.getElementsByTagName("email")[0].firstChild.nodeValue;
			}
			$(".panel").html(createPanelContent(name,pic_square,birthday,sex,hometown_location,interests,religion,meeting_sex,quotes,status,email));
		});
		
		
		// Load Markers
		$.ajax({
			type:"POST",
			url: "/facebook/servlet/friendsdetail",
			data: "user="+uid+"&query="+"checkins",
		}).done(function(msg){
			$(".cloader").hide();
			checkin = msg.getElementsByTagName("checkin");
			
			$.each(checkin, function(index, value) { 
				var lat = value.getElementsByTagName("latitude")[0].firstChild.nodeValue;
				var lon = value.getElementsByTagName("longitude")[0].firstChild.nodeValue
				var pos = new google.maps.LatLng(lat,lon);
				var marker = new google.maps.Marker({
					position:  pos,
					title: value.getElementsByTagName("page_id")[0].firstChild.nodeValue
				});
				
				marker.setAnimation(google.maps.Animation.DROP); //or BOUNCE?
				marker.setMap(map);
				markers.push(marker);
				var infowindow = new google.maps.InfoWindow({content : "", maxWidth:"500px"});
				infowindow.content = "<div align='center'><img src='../img/ajax-loader.gif'/></div>";
				google.maps.event.addListener(marker,'click',function() {
					if (lastInfoWindow instanceof google.maps.InfoWindow) {
						lastInfoWindow.close();
					}
					lastInfoWindow = infowindow;
					infowindow.open(map, marker);
					$.ajax({
						type:"POST",
						url: "/facebook/servlet/friendsdetail",
						data: "user="+marker.getTitle()+"&query="+"page",
					}).done(function(msg){
						title = "";
						generalInfo = "";
						picSmall = "";
						totalCheck = "";
						username = ""
						
						if(msg.getElementsByTagName("name")[0].firstChild != null){
							title = msg.getElementsByTagName("name")[0].firstChild.nodeValue;
						}
						if(msg.getElementsByTagName("general_info")[0].firstChild != null){
							generalInfo = msg.getElementsByTagName("general_info")[0].firstChild.nodeValue;
						}
						if(msg.getElementsByTagName("pic_small")[0].firstChild != null){
							picSmall = msg.getElementsByTagName("pic_small")[0].firstChild.nodeValue;
						}
						if(msg.getElementsByTagName("checkins")[0].firstChild != null){
							totalCheck = msg.getElementsByTagName("checkins")[0].firstChild.nodeValue;
						}
						if(msg.getElementsByTagName("username")[0].firstChild != null){
							username = msg.getElementsByTagName("username")[0].firstChild.nodeValue;
						}
						
						var html_img = "<div style='vertical-align:middle; float:left; margin-right: 15px'><img src='"+picSmall+"'/></div>";
						var html_title = (username != "") ? "<a target='_blank' href='http://www.facebook.com/"+username+"'>"+title+"</a>" : title;
						var html_checkins = "<span>"+totalCheck+"</span>";
						
						var html_head = "<div>"+html_img+"<div style='float:left'><div style='font-size: 15pt; color: navy;'>"+html_title+"</div><div>visited "+html_checkins+" times</div></div>"+"</div>";
						var html_info = "<div style='clear:left'>"+generalInfo+"</div>";
					
						infowindow.setContent("<div>"+html_head+html_info+"</div>");
						
						
					
					});
					
				});
				
			});

			if (markers.length > 0) {
				//show all markers
				var latlngbounds = new google.maps.LatLngBounds();
				$.each(markers, function(index, value) { 
					latlngbounds.extend(value.getPosition());
				});
				map.fitBounds(latlngbounds);
			} else {
				$("#no_user_markers").html($("#" + uid +" .friend_name").html()+ " never made a check-in");
				$(".nomarkers").show();
				effectFadeIn('blink');
			}
		});
		
	});
	
	
	$(".trigger").click(function() {
		$(".panel").toggle("fast");
		$(this).toggleClass("active");
		return false;
	});
	
	$("#AboutThis").click(function() {
		var content = 
						"<p style='color:black;padding:0; text-align: center'>Facebook Personal Assistant</p>"+
						"<ul style='list-style-type:circle; padding: 10px; text-align: center'>"+
						"<li style='color:darkgrey;padding: 10px'>- authors -</li>"+
						"<li style='padding: 10px'>Stefano Pongelli &lt;sponge@student&gt;</li>"+
						"<li style='padding: 10px'>Giulio Valente &lt;gvalente@student&gt;</li>"+
						"<li style='padding: 10px'>Thomas Selber &lt;selbert@student&gt;</li></ul>"+
						"<img src='../img/meme/pokerface.jpg') style='width:70px;float:left'/>";
		$("#dialog").html(content);
		$("#dialog").dialog({title:"ETHZ - WebEngineering 2012", width: 500, modal:true });		
		$('.ui-widget-overlay').live('click', function() {
		     $("#dialog").dialog( "close" );
		});
	});

	times = 0;
	function effectFadeIn(classname) {
		times = times + 1;
		$("."+classname).fadeOut(500).fadeIn(500, effectFadeOut(classname))
	}
	function effectFadeOut(classname) {
		if (times < 2) {
			$("."+classname).fadeIn(500).fadeOut(500, effectFadeIn(classname));
		} else {
			times = 0;
		}
	}
});