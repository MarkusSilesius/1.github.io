// RocketCake Gallery implementation
// (c) by Nikolaus Gebhardt / Ambiera e.U.
function wsp_gallery()
{
	this.popUpWindow = null;
	this.layer = null;
	this.showingLayerImage = null;
	
	this.winWidth = 640;
	this.winHeight = 480;
	
	this.showSingleImageNoBackground = false;
}

wsp_gallery.prototype.openpopup = function(imgurl, width, height)
{
	var left = (screen.width-width)/2;
	var top = (screen.height-height)/2;
 
	// close old window and store position
	
	if (this.popUpWindow &&  this.popUpWindow.location && !this.popUpWindow.closed) 
	{
		left = this.popUpWindow.screenX;
		top = this.popUpWindow.screenY;
		this.popUpWindow.close();
	} 
	
	// reopen new window
	{
		var winWidth = width + 10;
		var winHeight = height + 10;
		var win = window.open(imgurl, "wsp_imgwindow",
			"width=" + winWidth + ",height=" + winHeight + "\",resizable=1,top=" + top + ",left=" + left);
		this.popUpWindow = win;
	}
}

wsp_gallery.prototype.openlayer = function(imgurl, width, height)
{
	if (width <= 0 || height <= 0)
		return;
		
	this.closeLayer();
	
	if (this.layer == null)
	{
		var l = document.createElement("div");
		
		l.style.position = "absolute";		
		l.style.overflow = "visible";
		l.style.verticalAlign = 'middle';
		l.style.textAlign = 'center';
		l.style.backgroundColor = document.body.style.backgroundColor; //'#ffffff';
		l.style.filter = 'Alpha(Opacity=100)';
		l.style.zIndex = '50';
		
		document.body.appendChild(l);	
		
		this.layer = l;		
	}
	
	var l = this.layer;
	
	var img = document.createElement("img");
	img.src = imgurl;
	img.onclick = function() { wsp_gallery.closeLayer() };
	
	this.updateBrowserWidth();
		
	if (this.showSingleImageNoBackground)
	{
		var posx = Math.round((this.winWidth - width) / 2 + document.body.scrollLeft);
		var posy = Math.round((this.winHeight - height) / 2 + document.body.scrollTop);
		
		img.style.width = width + 'px';
		img.style.height = height + 'px';	
			
		l.innerHTML = '';
		l.appendChild(img);
		l.style.left = posx + "px";
		l.style.top = posy + "px"; 
		l.style.display = 'block';
	}
	else
	{
		var showWidth = width;
		var showHeight = height;
		var showMargin = 5;
		
		// if image is larger than screen, resize to fit screen
		
		if (showWidth > this.winWidth - showMargin)
		{
			showWidth = this.winWidth - showMargin;
			showHeight = showWidth * (height / width);
		}
		
		if (showHeight > this.winHeight - showMargin)
		{
			showHeight = this.winHeight - showMargin;
			showWidth = showHeight * (width / height);
		}
		
		// show on screen
	
		var scrollPosX = window.pageXOffset;
		var scrollPosY = window.pageYOffset;
		
		var posx = Math.round((this.winWidth - showWidth) / 2 + scrollPosX);
		var posy = Math.round((this.winHeight - showHeight) / 2 + scrollPosY);
				
		img.style.width = showWidth + 'px';
		img.style.height = showHeight + 'px';	
		img.style.left = posx + 'px';
		img.style.top = posy + 'px';
		img.style.position = 'absolute';
		img.style.zIndex = '51';
		
		this.showingLayerImage = img;
		
		document.body.appendChild(img);	
		
		l.innerHTML = '';
		l.style.left = scrollPosX + 'px';
		l.style.top = scrollPosY + 'px';
		l.style.width = this.winWidth + 'px';
		l.style.height = this.winHeight + 'px';
		l.style.backgroundColor = '#000000';
		l.style.opacity = '0.6';
		l.style.msFilter = 'alpha(opacity=60)' // For IE8 and earlier 
 
		l.style.display = 'block';
		
		l.onclick = function() { wsp_gallery.closeLayer() };
	}
}

wsp_gallery.prototype.updateBrowserWidth = function()
{
	if (window.innerWidth)
	{
		this.winWidth = window.innerWidth;
		this.winHeight = window.innerHeight;
	}
	else
	{
		this.winWidth = document.body.clientWidth;
		this.winWidth = document.body.clientHeight;
	}	
}

wsp_gallery.prototype.closeLayer = function()
{
	if (wsp_gallery == null || wsp_gallery.layer == null)
		return;
		
	wsp_gallery.layer.style.display = 'none';
	
	try
	{
		if (wsp_gallery.showingLayerImage)
			document.body.removeChild(wsp_gallery.showingLayerImage);
	}
	catch(e)
	{
	}
}


wsp_gallery.prototype.replaceimg = function(imgurl, elemid, width, height)
{
	var imgelem = document.getElementById(elemid);
	if (imgelem == null)
		return;
		
	imgelem.src = imgurl;
}


var wsp_gallery = new wsp_gallery();