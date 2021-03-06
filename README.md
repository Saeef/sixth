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
- see TestPlan

### devices      
- desktop, tablet and mobile
- chrome, firefox, safari, IE10

### other     
- Include both cars and trucks. Pages: ctyp = P(for cars), ctyp = L(for trucks)              		      
- Reliable identifier for test page:       
	pn = "Reservation-Pkw-Offerselect"      
- Results with one single price option to be included .                 

### notes
__sitecatalyst_data object:__           
- sitecatalyst_data.tpl => "offerselect"  :snail:      
- sitecatalyst_data.channel => "Reservation-Pkw"  :snail:      
- sitecatalyst_data.pagename => "Reservation-Pkw-Offerselect" :snail:      
___window_satellite object:___ 
- window._satellite.browserInfo.browser => "Chrome"  :snake:    
- window._satellite.data.URI => "/php/reservation/offerselect"  :snake:      
- window._satellite.detectBrowserInfo()  :snake:     
- window._satellite.domReady();    :snake:   
- window._satellite.domReadyFired     => true or false  :snake:     
- window._satellite.loadEventBefore(t,e)  :snake:     
- window._satellite.pushAsyncScript(t)  :snake:     
- window._satellite.stringify(t,e)  :snake:      
- window._satellite.visibility.isVisible() => true  :snake:      
 

### id wraps everything . :ledger:
- id for items inc form =>  sx-offerselect-offerlist-wrapper  (everything wrapped here)

### form above items .  :ledger:
- document.forms.offer_request_config  (form above items)

### recommended item if it exist first one :ledger:
- var rec = document.querySelector('.sx-res-offerselect-special-wrapper');      (recommended item)

### all other items except for recommended :ledger:
- var off = document.querySelectorAll('.sx-res-offerselect-wrapper.sx-res-offerlist-wrapper');


#### OfferSelect :ledger:
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


<kbd>desktop offerSelect second layout for when a single option its only available</kbd>  :rocket:          

![](/images/secondOption.png)      

<kbd>variation desktop - normal layout</kbd>  :rocket:          

![](/images/variation-desktop.png)      








