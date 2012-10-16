function addVideo(obj) {
  var chain = new Array('Movies');

  obj.title = obj.title.replace(/!|\[|\]|/g, '');

  var movie_p = /(.*).*(2\d\d\d).*/i;
  var match = movie_p.exec(obj.title);
  
  if(match) {
    obj.title = match[1]+"["+match[2]+"]";
  }

  clear_title(obj);
  print("Video: " + obj.title + " mime: " + orig.mimetype);

  addCdsObject(obj, createContainerChain(chain));
}

function clear_title(obj) {
  obj.title = obj.title.replace(/\.|_/g, ' ');
  obj.title = obj.title.replace(/\(|\)|dvdrip|hdrip|bdrip|dub|\sd\s|xvid|by scarabey|\sengeco|rutracker\sorg|torrents\sru|chopper887/g, '');
  obj.title = obj.title.replace(/youtracker\snet|mvo|\savi|\smkv|\swmv/g, ' ');  
  //return title
}
function iphone(obj) { 
	var chain = new Array('iPhone Video');
  addCdsObject(obj, createContainerChain(chain));
}

function addTVShow(obj,match) { // match[1] - TV Show name
  showname = match[1];
  season = "Season "+match[2];
  showname = showname.replace(/\./g, ' ');
  showname = showname.replace(/\s\s/g, ' ');
  obj.title = showname+" [s"+match[2]+"e"+match[3]+"]";
  
  print("TVShow: " + obj.title);
  
  var chain = new Array('TV Shows', showname, season);
  addCdsObject(obj, createContainerChain(chain));
}

// main script part
if(getPlaylistType(orig.mimetype) == '')
{
  var arr = orig.mimetype.split('/');
  var mime = arr[0];

  var obj = orig; 
  obj.refID = orig.id;
    
  if(mime == 'video') {
    if(orig.mimetype == 'video/quicktime' || orig.mimetype == 'video/mp4') {
			iphone(obj);
		} else {
      obj.title = obj.title.toLowerCase();
    	var pattern = /(.*).s(\d\d).*e(\d\d).(.*)/i;
    	var match = pattern.exec(obj.title);
    	if(match)	{
      	addTVShow(obj,match);
    	} else {
      	addVideo(obj); 
    	}
		}
  }
  
  if(orig.mimetype == 'application/ogg') {
    if(orig.theora == 1) {
      addVideo(obj);
    }
  }
}
