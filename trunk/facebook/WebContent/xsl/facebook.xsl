<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fb="http://api.facebook.com/1.0/">

	<xsl:import href="header.xsl" />
	<xsl:template match="/">
		<html>
			<head>
				<title>My Facebook Application</title>
				<link rel="stylesheet" type="text/css" href="../css/smoothness/jquery-ui-1.8.18.custom.css" />
				<link rel="stylesheet" type="text/css" href="../css/sidepanel.css" />
				<link rel="stylesheet" type="text/css" href="../css/main.css" />
				<script src="../js/ajax.js"></script>
				<script src="../js/jquery-1.7.1.min.js"></script>
				<script src="../js/jquery-ui-1.8.18.custom.min.js"></script>
				<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=true"></script>
				<script src="../js/map.js"></script>
				<script src="../js/sidepanel.js"></script>
				<script src="../js/main.js"></script>
			</head>
			<body>
				<xsl:copy-of select="$header" />
				<div id="friend_list">
					<div class="ui-widget ui-state-default ui-corner-all asc" id="sorter">
						<span class="sortarrow ui-icon ui-icon-triangle-1-n" id="leftarrow"></span>
						<span class="text">Friends</span>
						<span class="sortarrow ui-icon ui-icon-triangle-1-n" id="rightarrow"></span>
					</div>
					<ul id="sortable" class="autosort">
						<xsl:for-each select="*/user">
							<xsl:text disable-output-escaping="yes">&lt;li&gt;</xsl:text>
							<xsl:apply-templates select="name" />
						</xsl:for-each>
					</ul>
					<div style="clear: both;"> </div>
				</div>
				<div id="map_canvas"></div>
				<div id="dialog" title="Dialog Title"></div>
				<div class="panel">
				</div>
				<a class="trigger" href="#">User Info</a>
			</body>
		</html>
	</xsl:template>
	<xsl:template match="name">
		<li>
			<xsl:attribute name="id">
				<xsl:value-of select="../uid" />
			</xsl:attribute>
			<xsl:attribute name="class">ui-state-default</xsl:attribute>
			<span>
				<img>
					<xsl:attribute name="src">
					<xsl:value-of select="../pic_square" />
					</xsl:attribute>
				</img>
			</span>
			<span>
				<xsl:attribute name="class">friend_name</xsl:attribute>
				<xsl:value-of select="." />
			</span>
		</li>
	</xsl:template>
</xsl:stylesheet>