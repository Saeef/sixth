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

- Results with one single price option to be included

### notes
sitecatalyst_data object:
sitecatalyst_data.tpl => "offerselect"
sitecatalyst_data.channel => "Reservation-Pkw"
sitecatalyst_data.server => "www.sixt.com"
sitecatalyst_data.pagename => "Reservation-Pkw-Offerselect"

window._satellite object
window._satellite.browserInfo.browser => "Chrome"
window._satellite.data.URI => "/php/reservation/offerselect"
window._satellite.detectBrowserInfo()
window._satellite.domReady();
window._satellite.domReadyFired     => true or false
window._satellite.loadEventBefore(t,e)
window._satellite.pushAsyncScript(t)
window._satellite.stringify(t,e)
window._satellite.visibility.isVisible() => true


//id wraps everything
======================
id for items inc form =>  sx-offerselect-offerlist-wrapper  (everything wrapped here)

//form above items
==================
document.forms.offer_request_config  (form above items)

//recommended item if it exist first one
========================================
var rec = document.querySelector('.sx-res-offerselect-special-wrapper');      (recommended item)

//all other items except for recommended
========================================
var off = document.querySelectorAll('.sx-res-offerselect-wrapper.sx-res-offerlist-wrapper');


#### OfferSelect

- Prices placed side by side - pay now placed on the right
- Removed grey boxes around price types
- Changed the copy in orange text above the price
-		FREE CANCELLATION changed to STAY FLEXIBLE
-		OUR LOWEST RATE changed to 	SAVE X% EACH DAY



--more fixes:
- mouse in and out shopping bag image to view basket summary
- cookie banner changes and basket summary position
- add to cta button positions basket summary under shopping bag image whatever browser screen width
  (it does not suppose to resize on the fly)
- list items collected with promises
- /page/basket => comes up when you click on 'proceed to checkout' (previous page)
  If you decide not to go with that, (because 'interferes' with site overlay), then remove line [51-54] and basket summary will only show on mouse over in this page.
- 'super user friendly' => mouse out basket to hide basket summary  
- line 28 => adds conditional statment for engrave me cta (so that popup wont appear under site's popup)	

<br/>



<kbd>desktop</kbd>  :rocket:     

![](/images/) 

<kbd>desktop</kbd>  :rocket:     

![](/images/) 

:rocket: 
<hr/>

![](/images/screen1.png)

<hr/>
:rocket: 

![](/images/screen2.png)

<hr>
:rocket: 

![](/images/screen3.png)





# sixth
