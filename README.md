# sixth  :rocket:

### background  :bell:
- Previous test showed that by displaying the prices side by side there was no overall uplift in conversions
- However a difference in the distribution of clicks on Pay Now/ Pay Later was observed.
- Pay Now CTA clicks dropped 6.5%
- Pay Later up 6.5% on desktop
- Mobile Pay Now - 10%, Mobile Pay Later up 8%
- It is thought change in positioning of Pay Later option has increased free cancellation option.


### objective :book:
- __Changing orange copy above prices__ to downplay free cancellation option and
- __emphasize savings on Pay Now__ will increase Pay Now clicks and decrease Pay Later clicks

### targeting :boom:
https://www.sixt.com/php/reservation/offerselect
https://www.sixt.com/php/reservation/directoffer
https://www.sixt.com/php/reservation/offerconfig (copy change to follow through to this page)
https://www.sixt.com/php/reservation/customerdetails (copy change to follow through to this page)

### devices      
- desktop, tablet and mobile
- chrome, firefox, safari, IE10

### other     
- Include both cars and trucks. Same URL, but pages can be identified by:
					
	ctyp = P      //for cars
	ctyp = L      //for trucks

- Reliable identifier for test page:

	pn = "Reservation-Pkw-Offerselect"

- Results with one single price option to be included .          

### notes
sitecatalyst_data object:           
sitecatalyst_data.tpl => "offerselect" .       
sitecatalyst_data.channel => "Reservation-Pkw" .      
sitecatalyst_data.server => "www.sixt.com" .        
sitecatalyst_data.pagename => "Reservation-Pkw-Offerselect" .       

window._satellite object .     
window._satellite.browserInfo.browser => "Chrome" .      
window._satellite.data.URI => "/php/reservation/offerselect" .      
window._satellite.detectBrowserInfo() .     
window._satellite.domReady();       
window._satellite.domReadyFired     => true or false .     
window._satellite.loadEventBefore(t,e) .     
window._satellite.pushAsyncScript(t) .     
window._satellite.stringify(t,e) .      
window._satellite.visibility.isVisible() => true .      
 

### id wraps everything
- id for items inc form =>  sx-offerselect-offerlist-wrapper  (everything wrapped here)

### form above items
- document.forms.offer_request_config  (form above items)

### recommended item if it exist first one
- var rec = document.querySelector('.sx-res-offerselect-special-wrapper');      (recommended item)

### all other items except for recommended
- var off = document.querySelectorAll('.sx-res-offerselect-wrapper.sx-res-offerlist-wrapper');


#### OfferSelect
- Prices placed side by side - pay now placed on the right
- Removed grey boxes around price types
- Changed the copy in orange text above the price
-	FREE CANCELLATION changed to STAY FLEXIBLE
-	OUR LOWEST RATE changed to 	SAVE X% EACH DAY




<br/>

<kbd>desktop n mobile variation</kbd>  :rocket:          

![](/images/offerSelectVar1DesktopMobile.png)      

<kbd>desktop control</kbd>  :rocket:         

![](/images/desktop-control.png)      

<kbd>mobile iphone6 control</kbd>  :rocket:          

![](/images/iphone6-control.png)        

<kbd>mobile iphone5 control</kbd>  :rocket:          

![](/images/iphone5-control.png)        

<kbd>desktop offerSelect control</kbd>  :rocket:          

![](/images/offerSelectControlDesktop.png)      







