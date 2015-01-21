# SharePoint-Rotating-Banner
A customizable rotating banner which pulls images from a SharePoint library.

See here for more info: http://techaholica.com/2014/12/01/sharepoint-rotating-banner/

There are a lot of rotating banners out there, but not too many of them work with SharePoint and they aren’t the easiest to customize for beginners. I wanted something that any user would be able to setup and customize, plus I took this opportunity to learn more about SharePoint’s JAvaScript object model (JSOM), JavaScript, jQuery, HTML, and CSS.

Here is how you set it up.

The Files
Take all the files listed above and put them in your Site Assets folder for the site that you want to setup this banner on. If you don’t have a Site Assets folder, just create a document library by the same name. If you are comfortable with HTML, you can modify the file RotatingBanner.html to point at whatever library you want. Even if you aren’t familiar with HTML, you could probably open up the file with any text editor and do a search and replace on the word “SiteAssets” and replace it with your list name.

Create a Banner List
You need to create a custom list called Banner Rotator with the following fields. My explanation of the files is below each one.

Title (Text)
This is what is displayed on the banner
BackgroundColor (Text)
This is the background color of the banner. If you don’t specify an image or if you image is smaller than the banner size, this color will be displayed underneath.
BannerPicture (Picture)
You can link to any picture on any site to use as your banner. If you don’t specify a picture, make sure you at least specify a Background Color.
Tiled (Yes/No)
If yes, then your image will be tiled across the banner. If no, then it will just be a single instance of the image.
URL (Hyperlink)
This is the page the user will be sent to when they click your banner text.
FontSize (Text, Required)
The font size for your banner text
FontColor (Text, Required)
The font color for your banner text
LinkBackground (Text)
If you specify a color here, it will place a background just around your banner text
These fields define the banners that will be displayed. You can add more fields such as a Description field or Keywords field if you like. You should also consider adding your own default values and validation checks.  For all the color fields, make sure you are using HTML color notation like this #000000 for black or #FFFFFF for white and so on.

Create the Banners
With your Banner Rotator list setup, you can start populating it now. You don’t need to be a graphic designer to create these banners. You can just use screen shots or simple images you find on the Internet. The default banner size is 1200×200. If your image is bigger than that, it will cut off the image, which might be what you are looking for. If not, use Paint or another imaging tool to set the size of the image. You can also use a smaller image, and check the Tiled box. This will tile the image across the banner. Just be careful about your text showing up.

Customize the Banner Rotator Script
If you want to customize how the script works, you can open up the RotatingBanner.js file in any text editor. Be sure you have a backup copy of this script just in case something happens. At the top of the script, you will see a section labeled “User Defined Variables”. Here you can modify a couple of values.

BannerListName: Change “Banner Rotator” to another list, if you want to name your banner list something different.
interval: Change this to how long in seconds you want to wait on each picture before moving to the next one. Default is 5 seconds.
showPages: Change this to false if you don’t want to show the page count at the bottom of the banner.
query: This one is complicated, but if you know how to write CAML code, you can change this to change how you query for items. For instance, if you had an Expires field on your banner. You can change the query to only look for items in your banner list where the Expires date has not passed yet.
Be sure to keep the semi colons at the end of each statement and if you are modifying a text field, make sure you have quotation marks around it!

Customize the Banner Rotator CSS File
You have even more customization options here. Even if you are not familiar with CSS, you can use this file to change how the banners are displayed. The most important setting is the banner size list under the “.banner” section. Simply change the width and height to whatever value you want for the size of your banner. Be sure to keep the “px” at the end of the number along with the semi colons at the end of the statement. If you are really familiar with CSS, you could modify all kinds of things. You can give borders to the banner items, change how the highlighted page looks, change the font of the page numbers, and a lot more.

Add the Banner Rotator to your Page
Now you are ready to add your banner rotator to your page. Here are the steps:

Add a Content Editor Web Part to your page.
Edit the properties of the web part:
Under Content Editor > Content Link, type in the path to your BannerRotator.html file.
Under Appearance > Chrome Type, change the drop down to None
Click OK to close the web part properties window
Save / Check In / Publish your page if you need to.
That’s it. You should now see your beautiful banner on your page! Let me know if you have any issues. I actually plan to make some small improvements to this tool later, so I will let you guys know when those are done. Thanks!
