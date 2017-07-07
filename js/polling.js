function pollingFn() {
	var p = window.location.pathname;
	
	if(p == "/php/reservation/offerselect") {
      return document.querySelectorAll('.sx-res-offerselect-wrapper.sx-res-offerlist-wrapper')[0].children[0].children.length > 0;
  
  }//if 

  else if(document.cookie.indexOf('reg=') > -1){
  	if(p == "/php/reservation/offerconfig") {
	      return document.getElementById('sx-offerconfig-wrapper') !== null;
	  } else if(p == "/php/reservation/customerdetails") {
	      return document.querySelectorAll('.sx-cta-area-form .sx-res-prepaid-postpaid-hint').length > 0;
	  }  
  }
}