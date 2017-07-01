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
            var mainCss = "@media screen and (min-width:990px) { #t3-js-main div.price-section.price-section--flex.pnrec {width:42%; display:inline-block; margin-top:3px; border:0;padding:0; float:right;} #t3-js-main div.price-section.price-section--prpd.plrec {width:50%; display:inline-block; margin-top:3px; border:0;padding:0;}  #t3-js-main div.price-section__left.sin {float:right; width:100%; padding:0;} #t3-js-main div.price-section__right.des {float:left; width:100%; padding:0;} .offerselect-list .offerselect-tile .right .price .price-section__left__dayprice {font-size:23px;} .offerselect-list .offerselect-tile .right .price h4 {padding-bottom:10px;} .offerselect-list .offerselect-tile .right .price .price-section__left__overallprice {padding:12px 0;} .offerselect-list .offerselect-tile .left .carimage {width:240px; height:137px;} .offerselect-list .offerselect-tile .center {width: 25.3%;} .offerselect-list .offerselect-tile .right {width:42%; margin-left:1.5em;}    }";

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
                pnow.classList.add('pnrec');
                //priceleft/priceright
                var pleft1 = rec.querySelector('.price-section__left');
                var pright1 = rec.querySelector('.price-section__right');
                pleft1.classList.add('sin');
                pright1.classList.add('des');
                plat = rec.querySelector('.price-section.price-section--prpd');
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
                    for(var i=0; i<ol.length; i++) {
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

                    }//forloop

                    function lights() {
                        console.log('lights');
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