/* _optimizely_evaluate=force */
function checkifbodyexist() {
 if (document.body === null) {
   setTimeout(function() {
     checkifbodyexist();
   }, 10);
 } else {
		var mainCss = '.offerselect-list .offerselect-tile .right__wrapper {display: none; }';

		var headofdoc = document.getElementsByTagName('head')[0];
		var s = document.createElement('style');
		s.setAttribute('type', 'text/css');
		s.appendChild(document.createTextNode(mainCss));
		headofdoc.appendChild(s);
 }
}
checkifbodyexist();
/* _optimizely_evaluate=safe */

(function() {

    //* global scope
    var $ = window.jQuery;
        // $priceDiv = $(".price"),
        // $paynowDiv = $(".price-section.price-section--flex"),
        // $payLaterDiv = $(".price-section.price-section--prpd");

    var sixtSidebySide = {
        init: function() {
            this.mainCss(true);
            this.reArrangeItems();
            this.noLowestRate();
        },
        mainCss: function(applyCss) {
            if (applyCss) {

                var mainCss =   '.offerselect-list .offerselect-tile .center .description__main { width: 80%; }' +
                                '.offerselect-list .offerselect-tile .right .price .price-section--prpd { display: inline-block; border: none; padding: 0; box-sizing: border-box; margin-top: 0; float: left; width: 50%; }' +
                                '.offerselect-list .offerselect-tile .right .price .price-section--flex { display: inline-block; border: none; padding: 0; box-sizing: border-box; float: right; width: 50%; }' +
                                '.offerselect-list .offerselect-tile .right .price .price-section--prpd h4, .offerselect-list .offerselect-tile .right .price .price-section--flex h4 { padding-top: 0; }' +
                                '.offerselect-list .offerselect-tile .right .price .price-section__left, .offerselect-list .offerselect-tile .right .price .price-section__right { float: none; width: auto; padding: 0; margin-top: 1em; display: inline-block; }' +
                                '.offerselect-list .offerselect-tile .right .price .price-section__left p, .offerselect-list .offerselect-tile .right .price .price-section__right p { display: inline-block; }' +
                                '.offerselect-list .offerselect-tile .right .price .price-section__left__overallprice { float: none; display: block;}' +
                                '.price-section__left__dayprice { display: inline-block; }' +
                                '.right h4 { padding-bottom: 0; } ' +
                                '.offerselect-list .offerselect-tile .right .price .price-section__right { float: none; }' +
                                '@media only screen and (max-width: 998px) {' +
                                    '.price .price-section--prpd h4, .price .price-section--flex h4 { min-height: 36px; }' +
                                    '.offerselect-list .offerselect-tile .right .price .price-section__left, .offerselect-list .offerselect-tile .right .price .price-section__right { display: block; margin-top: 0;  }' +
                                    '.offerselect-list .offerselect-tile .right .price .price-section__button { margin-top: 1em; }' +
                                    '.price-section__left__dayprice small { display: block; }' +
                                ' }' +
                                '@media only screen and (max-width: 799px) {' +
                                    '.offerselect-list .offerselect-tile .right .price .price-section__left, .offerselect-list .offerselect-tile .right .price .price-section__right { margin-top: 0; float: left; }' +
                                    '.offerselect-list .offerselect-tile .right .price .price-section--prpd, .offerselect-list .offerselect-tile .right .price .price-section--flex { display: inline-block; border: none; padding: 0; box-sizing: border-box; margin-top: 0; float: none; width: 45%; text-align: center; }' +
                                    '' +
                                ' }' +
                                '@media only screen and (max-width: 350px) {' +
                                    '.offerselect-list .offerselect-tile .right .price .price-section--prpd, .offerselect-list .offerselect-tile .right .price .price-section--flex { width: 40%; }' +
                                    '.offerselect-list .offerselect-tile .right .price .price-section__left p, .offerselect-list .offerselect-tile .right .price .price-section__right p { min-width: 50px; width: 8em !important; padding: 1em !important; }' +
                                '}';
              
              mainCss += '.offerselect-list .offerselect-tile .right__wrapper {display: block !important; }';

                var headofdoc = document.getElementsByTagName('head')[0];
                var s = document.createElement('style');
                s.setAttribute('type', 'text/css');
                s.appendChild(document.createTextNode(mainCss));
                headofdoc.appendChild(s);
            }
        },
        reArrangeItems: function() {
            $(".price-section.price-section--prpd").each(function() {
                $(this).closest(".price").prepend(this);
            });
        },
        noLowestRate: function() {
            if ( $(".price-section.price-section--flex").length === 0 ) {
                // no lowest rate
                $(".offerselect-list .offerselect-tile .right .price .price-section--prpd").css({position: "relative", width: "100%", padding: "10px 15px", marginTop: "14px"});
                $(".offerselect-list .offerselect-tile .right .price .price-section__right").css({marginTop: "0", position: "absolute", top: "0", right: "0", transform: "translate(0%, 50%)"});
                $(".offerselect-list .offerselect-tile .right .price .price-section__left p, .offerselect-list .offerselect-tile .right .price .price-section__right p").css({marginTop: "0px"});
                $(".offerselect-list .offerselect-tile .right .price .price-section").css({border: "none"});
                console.log("inside if statement of noLowestRate");
            }
        }
    };

    jQuery(document).ready(function($) {
        try {
            sixtSidebySide.init();
          
          	try{
              window.hj=window.hj||function(){(hj.q=hj.q||[]).push(arguments);};
							hj('trigger', 'Redeye - Side by Side Prices [V1]');
            } catch(err){}
          
        } catch (err) {
            console.log('ERROR: ' + err);
        }

    });
})();