(function(andRedEyelikeSixt, undefined) {
    var $ = window.jQuery;
    var SL = {};
    SL.andRedEyelikeSixt = {
        init: function() { 
            this.pgCssDesktop();
            this.listRO();      
        },
        //init

        pgCssDesktop: function() {
            console.info('%c pgCssDesktop \u221a', 'background:blue;color:white;');
            //@990px min-width mediaQuerie
            var mainCss = "@media screen and (max-width:380px) {span.price-section__left__dayprice {font-size:22px !important;} .offerselect-list .offerselect-tile .right .price h4 { font-size: 14px !important;}  .offerselect-list .offerselect-tile .right .sx-gc-button-cta-list { min-width:130px !important; }   } @media screen and (max-width:650px) { div.price-section.price-section--flex.pnrec {width:40%; float:right; margin-right:24px;  } div.price-section.price-section--prpd.plrec {width:40%; float:left; } div.price-section__left.sin { width:100% !important; } div.price-section__right.des { width:86% !important; padding-left:0 !important; margin-top:12px; } .offerselect-list .offerselect-tile .right .price .price-section {border:0;} .offerselect-list .offerselect-tile .right .sx-gc-button-cta-list {min-width:140px;} .offerselect-list .offerselect-tile .right .price .price-section__button {float:left;} .offerselect-list .offerselect-tile .right .price .price-section--prpd {margin-top:0;} } @media screen and (min-width:990px) { #t3-js-main div.price-section.price-section--flex.pnrec {width:42%; display:inline-block; margin-top:3px; border:0;padding:0; float:right;} #t3-js-main div.price-section.price-section--prpd.plrec {width:50%; display:inline-block; margin-top:3px; border:0;padding:0;}  #t3-js-main div.price-section__left.sin {float:right; width:100%; padding:0;} #t3-js-main div.price-section__right.des {float:left; width:100%; padding:0;} .offerselect-list .offerselect-tile .right .price .price-section__left__dayprice {font-size:23px;} .offerselect-list .offerselect-tile .right .price h4 {padding-bottom:10px;} .offerselect-list .offerselect-tile .right .price .price-section__left__overallprice {padding:12px 0;} .offerselect-list .offerselect-tile .left .carimage {width:240px; height:137px;} .offerselect-list .offerselect-tile .center {width: 25.3%;} .offerselect-list .offerselect-tile .right {width:42%; margin-left:1.5em;}    } .cien {width:100% !important; margin-top:10% !important;} .fifty {width:50% !important; float:left !important;} .cienleft {float:left !important; width:100% !important; margin-top:10% !important;} .fortyfive {width:45% !important; margin-left:16px !important;}  ";

            var head = document.getElementsByTagName('head')[0];
            function addcss(css) {
                var s = document.createElement('style');
                s.setAttribute('type', 'text/css');
                s.appendChild(document.createTextNode(css));
                head.appendChild(s);
            }
            addcss(mainCss);
        }, //pgCssDesktop

        listRO: function() {
            console.info('%c listRO \u221a', 'background:blue;color:white;');
            document.body.style.opacity = 0.0125;

            recommended();
            otherlist();

            function recommended() {
                console.info('%c recommended \u221a', 'background:blue;color:white;');
                //recommended slot
                var rec = document.querySelector('.sx-res-offerselect-special-wrapper'); 
                var pnow = rec.querySelector('.price-section.price-section--flex');
                pnow.children[0].innerText = "SAVE 5% EACH DAY";
                pnow.classList.add('pnrec');
                //priceleft/priceright
                var pleft1 = rec.querySelector('.price-section__left');
                var pright1 = rec.querySelector('.price-section__right');
                pleft1.classList.add('sin');
                pright1.classList.add('des');
                plat = rec.querySelector('.price-section.price-section--prpd');
                plat.children[0].innerText = "STAY FLEXIBLE";
                plat.classList.add('plrec');
                var pleft2 = plat.querySelector('.price-section__left');
                var pright2 = plat.querySelector('.price-section__right');
                pleft2.classList.add('sin');
                pright2.classList.add('des');

            }//recommended

            function otherlist() {
                console.info('%c otherlist \u221a', 'background:blue;color:white;');
                //otherlist
                var ol = new Promise(function(resolve,reject) {
                    setTimeout(function() {
                        ol = document.querySelectorAll('.sx-res-offerselect-wrapper.sx-res-offerlist-wrapper')[0].children[0].children;
                        if(ol.length >= 1) {
                            resolve(ol);
                        }
                        else {
                            reject(ol);
                        }
                    },650);
                });//ol

                ol.then(function(dat) {
                    //fulfilled
                    console.log(dat);
                    for(var i=0; i<ol.length; i++) {
                        if(ol[i].children[2].children[0].children[0].children[0].children[0].innerText == "OUR LOWEST RATE") {
                            ol[i].children[2].children[0].children[0].children[0].children[0].innerText = "SAVE 5% EACH DAY";
                        }

                        else if(ol[i].children[2].children[0].children[0].children[0].children[0].innerText == "FREE CANCELLATION") {
                            ol[i].children[2].children[0].children[0].children[0].children[0].innerText = "STAY FLEXIBLE";
                        }

                        if(ol[i].children[2].children[0].children[0].children[1].children[0].innerText == "FREE CANCELLATION") {
                            ol[i].children[2].children[0].children[0].children[1].children[0].innerText = "STAY FLEXIBLE";
                        }

                        if(ol[i].children[2].children[0].children[0].children[0].className == "price-section price-section--flex") {
                            ol[i].children[2].children[0].children[0].children[0].classList.add('pnrec');
                        }//if
                        if(ol[i].children[2].children[0].children[0].children[1].className == "price-section price-section--prpd") {
                            ol[i].children[2].children[0].children[0].children[1].classList.add('plrec');
                        }//if
                        //prpdisfirst
                        else if(ol[i].children[2].children[0].children[0].children[0].className == "price-section price-section--prpd") {
                            ol[i].children[2].children[0].children[0].children[0].classList.add('plrec');
                        }//if
                        if(ol[i].children[2].children[0].children[0].children[1].className == "price-section price-section--prpd plrec") {
                            ol[i].children[2].children[0].children[0].children[1].children[1].classList.add('sin');
                            ol[i].children[2].children[0].children[0].children[1].children[2].classList.add('des');
                        }//if
                        if(ol[i].children[2].children[0].children[0].children[0].children[1].className == "price-section__left") {
                            ol[i].children[2].children[0].children[0].children[0].children[1].classList.add('sin');
                        }//if          
                        if(ol[i].children[2].children[0].children[0].children[0].children[2].className == "price-section__right") {
                            ol[i].children[2].children[0].children[0].children[0].children[2].classList.add('des');
                        }//if   


                        if(ol[i].children[2].children[0].children[0].children.length === 2) {
                            if(ol[i].children[2].children[0].children[0].children[0].className == "price-section price-section--flex pnrec") {
                                        ol[i].children[2].children[0].children[0].children[0].className = "price-section price-section--flex pnrec cienleft"
                                        ol[i].children[2].children[0].children[0].children[0].children[1].classList.add('fifty');
                                        ol[i].children[2].children[0].children[0].children[0].children[2].classList.add('fortyfive');

                            }//if
                            else if(ol[i].children[2].children[0].children[0].children[0].className == "price-section price-section--prpd plrec") {
                                        ol[i].children[2].children[0].children[0].children[0].className = "price-section price-section--prpd plrec cien"
                                        ol[i].children[2].children[0].children[0].children[0].children[1].classList.add('fifty');
                                        ol[i].children[2].children[0].children[0].children[0].children[2].classList.add('fortyfive');
                            }//elseif


                        }//length 2



                    }//forloop

                    function lights() {
                        console.info('%c lights \u221a', 'background:blue;color:white;');
                        document.body.style.opacity = 1;
                    }
                    //turn lights on
                    lights();

                }).catch(function(err) {
                    console.log(err);
                });

            }//otherlist

        }//listRO     

    };//SL.andRedEyelikeSixt
   (function _RE() {
        if (window._satellite.data.URI === "/php/reservation/offerselect") {
            try {
                SL.andRedEyelikeSixt.init();
            } 
            catch (err) {
                  console.log('TRY ERROR: '+ err);
            }
       }//if 
       else { 
            setTimeout(_RE, 25); 
        }//else
           
    })();//_RE

}.call(window.andRedEyelikeSixt || {}));