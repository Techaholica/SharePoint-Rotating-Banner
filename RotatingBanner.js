/**************************************************************************************
Banner Rotator
Techaholica
11-26-14
**************************************************************************************/

(function()
{
	/********************* User Defined Variables ***************************************
	**** Update the variables below to customize how the banner rotator works ***********/
	var bannerListName = "Banner Rotator"; //the name of the list to pull the banner items from
	var interval = 5; //time to wait before showing the next picture (in seconds)
	var showPages = true; //change to false if you do not want to show the page numbers
	
	//if you know how to write CAML you can update this string
	//by default it looks for all items in the list, but you can change that here
	var query = '<View><Query><Where><Geq><FieldRef Name=\'ID\'/><Value Type=\'Number\'>1</Value></Geq></Where></Query><RowLimit>10</RowLimit></View>';
	/***********************************************************************************/

	//global variables
	var index = 0;
	var bannerList = [];

	$(document).ready(function() 
	{ 
			// make sure the SharePoint script file 'sp.js' is loaded before code runs
			SP.SOD.executeFunc('sp.js', 'SP.ClientContext',start);
	});

	function start()
	{
		ctx = SP.ClientContext.get_current();
		this.site = ctx.get_site();
		this.website = ctx.get_web();
		var oList = website.get_lists().getByTitle(bannerListName);
		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml(query);
		this.collListItem = oList.getItems(camlQuery);
		ctx.load(collListItem);
		this.ctx.executeQueryAsync(onQuerySucceeded, onQueryFailed);
	}


	function onQuerySucceeded()
	{
		var listItemInfo = '';
		var listItemEnumerator = collListItem.getEnumerator();
		
	  
		//create all the banner objects
		while (listItemEnumerator.moveNext()) {
			var oListItem = listItemEnumerator.get_current();
			
			var listItemInfo = [];
			listItemInfo["id"] = oListItem.get_id(); 
			listItemInfo["title"] = oListItem.get_item('Title'); 
			listItemInfo["body"] = oListItem.get_item('Body');
			listItemInfo["bgcolor"] = oListItem.get_item('BackgroundColor');
			
			//check if there is a banner picture
			if(oListItem.get_item('BannerPicture'))
			{
				listItemInfo["bannerPicture"] = oListItem.get_item('BannerPicture').get_url();
			}else
			{
				listItemInfo["bannerPicture"] = "";
			}
			
			listItemInfo["expires"] = oListItem.get_item('Expires');
			
			//if no URL given, just use the current page
			if(oListItem.get_item('URL'))
			{
				listItemInfo["url"] = oListItem.get_item('URL').get_url();
			}else
			{
				listItemInfo["url"] = "#";
			}
			
			listItemInfo["tiled"] = oListItem.get_item('Tiled');
			listItemInfo["fontSize"] = oListItem.get_item('FontSize');
			listItemInfo["fontColor"] = oListItem.get_item('FontColor');
			listItemInfo["linkBackground"] = oListItem.get_item('LinkBackground');
			bannerList.push(listItemInfo);
		}
		
		//pass this list on to a helper function to handle the rotating of images
		if(bannerList.length > 0)
		{
			//show the first banner then increment the index before getting into the loop
			showBanner(false);
		}
		
	}


	function onQueryFailed()
	{
		alert("There was an issue loading the current website!")
	}

	//this function calls showBanner after the interval time
	//show banner will call this function thus creating the loop
	function bannerLoop()
	{
		setTimeout(showBanner, interval * 1000);
	} 

	function showBanner(skip)
	{
		/*
		clear the previous contents of the banner
		*/
		$("#bannerWrapper").empty();
		
		/*
		create top level div to hold this banner's contents
		*/
		var banner = bannerList[index];
		
		var urlLink = "url(\"" + banner.bannerPicture + "\")";
		$bannerDiv = $("<div />", 
		{
			"class":"banner"
			
		}).css(
		{
			'background-color': banner.bgcolor,
			'background-image': urlLink
		});
		
		if (banner.tiled)
		{
			$bannerDiv.addClass("tiledImage");
			
		}else
		{
			$bannerDiv.addClass("nonTiledImage");
		}
		
		$("#bannerWrapper").append($bannerDiv);

		/*
		create the banner link wrapper
		need this in case we want to specify a link background
		*/
		$linkWrapper = $("<div />",
		{
			"class":"linkWrapper",
		}).css(
		{
			'background': banner.linkBackground
		});
		$bannerDiv.append($linkWrapper);
		
		/*
		Create the actual link now
		*/
		$bannerLink = $("<a>", 
		{
			'href': banner.url,
			'text': banner.title,
			'class':"bannerLink",
			'target': '_blank'
		}).css(
		{
			'font-size': banner.fontSize,
			'color': banner.fontColor,
			'text-decoration': 'none'
		});
		$linkWrapper.append($bannerLink);
		
		/*
		create the pages div if that option is set
		*/
		if (showPages)
		{
			$pagesWrapper = $("<div />",
			{
				"class":"pagesWrapper",
			});
			
			$previous = $("<span />",
			{
				'class':'PreviousNext',
				'text': " Previous ",
				id: "pagePrevious"
			});
			$pagesWrapper.on("click","#pagePrevious",changeBanner);
			$pagesWrapper.append($previous);
			
			for (var count = 0; count < bannerList.length; count++)
			{
				var tempCount = count +1; //because we don't typically start counting at 0, but the arrays do 
				$number = $("<span />",
				{
					'class':'pageNumber',
					'text': " " + tempCount + " ",
					id: "page" + tempCount
				});
				$pagesWrapper.on("click","#page" + tempCount,changeBanner);
				
				if (count == index)
				{
					//if we are on the same page as the index, add a class to the number
					//this class will be used to highlight the number
					$number.addClass("currentPage");
				}
				$pagesWrapper.append($number);
			}

			$next = $("<span />",
			{
				'class':'PreviousNext',
				'text': " Next ",
				id: "pageNext"
			});
			$pagesWrapper.on("click","#pageNext",changeBanner);
			$pagesWrapper.append($next);

			$("#bannerWrapper").append($pagesWrapper);
		}
		
		index++;
		if (index == bannerList.length)
		{
			index = 0;
		}

		if(!skip)
		{
			bannerLoop();
		}
	}

	function changeBanner()
	{
		var elementID = $(this).attr("id");
		//update the index and then show the new banner at that index
		if(elementID == "pagePrevious")
		{
			if (index == 0)
			{
				index = bannerList.length-2;
			}else if (index == 1){
				index = bannerList.length-1;
			}else
			{
				index = index - 2;
			}
		}else if(elementID == "pageNext")
		{
			//don't need to do anything since the index has already been incremented
		}else
		{
			var pageNumber = Number(elementID.substring(4));
			index = pageNumber-1;
		}
		showBanner(true);
	}
})();