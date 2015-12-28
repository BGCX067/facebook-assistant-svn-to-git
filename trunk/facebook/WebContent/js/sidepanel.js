//Function used to create the content of the panel
function createPanelContent(name,pic_square,birthday,sex,hometown_location,interests,religion,meeting_sex,quotes,status,email){
	var html = "";
	html += "<h3>"+name+" "+"</h3><p><img width='80' class='right' src='"+pic_square+"'/></p>";
	html += "<table><tbody>";
	counter = 0;
	if(birthday != ""){
		counter++;
		if(counter%2==1)
			html+="<tr>";
		html += "<td VALIGN='top'><h3>Birthday</h3><p>"+birthday+"</p></td>";
		if(counter%2==0)
			html+="</tr>";
	}
	
	if(sex != ""){
		counter++;
		if(counter%2==1)
			html+="<tr>";
		html += "<td VALIGN='top'><h3>Sex</h3><p>"+sex+"</p></td>";
		if(counter%2==0)
			html+="</tr>";
	}
	
	if(hometown_location != ""){
		counter++;
		if(counter%2==1)
			html+="<tr>";
		html += "<td VALIGN='top'><h3>Hometown</h3><p>"+hometown_location+"</p></td>";
		if(counter%2==0)
			html+="</tr>";
	}
	
	if(interests != ""){
		counter++;
		if(counter%2==1)
			html+="<tr>";
		html += "<td VALIGN='top'><h3>Interests</h3><p>"+interests+"</p></td>";
		if(counter%2==0)
			html+="</tr>";
	}
	
	if(religion != ""){
		counter++;
		if(counter%2==1)
			html+="<tr>";
		html += "<td VALIGN='top'><h3>Religion</h3><p>"+religion+"</p></td>";
		if(counter%2==0)
			html+="</tr>";
	}
	
	if(meeting_sex != ""){
		counter++;
		if(counter%2==1)
			html+="<tr>";
		html += "<td VALIGN='top'><h3>Meeting Sex</h3><p>"+meeting_sex+"</p></td>";
		if(counter%2==0)
			html+="</tr>";
	}
	
	if(quotes != ""){
		counter++;
		if(counter%2==1)
			html+="<tr>";
		html += "<td VALIGN='top'><h3>quotes</h3><p>"+quotes+"</p></td>";
		if(counter%2==0)
			html+="</tr>";
	}
	
	if(email != ""){
		counter++;
		if(counter%2==1)
			html+="<tr>";
		html += "<td VALIGN='top'><h3>Email</h3><p>"+email+"</p></td>";
		if(counter%2==0)
			html+="</tr>";
	}
	
	html +=	"</tr></tbody></table>";
	return html;
}