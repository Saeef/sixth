console.log('Experiment');
(function(andRedEyelikeSixt, undefined) {

    var $ = window.jQuery;
    var SL = {};
    var reg,sav,custco,flex,saving;
    var customerSavingsIs = 0;
    var con = document.querySelector('.sx-res-prepaid-postpaid-hint');
    var path = window.location.pathname;
    var rcook,cook;
    SL.andRedEyelikeSixt = {
        init: function() { 
            this.pgCssDesktop();
            if(path == "/php/reservation/offerselect") {
                SL.andRedEyelikeSixt.listRO();
                 SL.andRedEyelikeSixt.percentage();
                SL.andRedEyelikeSixt.payOggi();

            }
            else if(path == "/php/reservation/offerconfig") {
                SL.andRedEyelikeSixt.pageNome();       
            }
            else if(path == "/php/reservation/customerdetails") {
                SL.andRedEyelikeSixt.pageCust();
            }   
        },
      pgCssDesktop: function() {
            console.info('%c pgCssDesktop \u221a', 'background:blue;color:white;');
            var mainCss = "@media screen and (max-width:380px) { .fortyfive {width:45% !important; margin-left:0px !important;} span.price-section__left__dayprice {font-size:22px !important;} .offerselect-list .offerselect-tile .right .price h4 { font-size: 13px !important;}  .offerselect-list .offerselect-tile .right .sx-gc-button-cta-list { min-width:130px !important; }   } @media screen and (max-width:650px) { div.price-section.price-section--flex.pnrec {width:40%; float:right; margin-right:24px;  } div.price-section.price-section--prpd.plrec {width:40%; float:left; } div.price-section__left.sin { width:100% !important; } div.price-section__right.des { width:86% !important; padding-left:0 !important; margin-top:12px; } .offerselect-list .offerselect-tile .right .price .price-section {border:0;} .offerselect-list .offerselect-tile .right .sx-gc-button-cta-list {min-width:140px;} .offerselect-list .offerselect-tile .right .price .price-section__button {float:left;} .offerselect-list .offerselect-tile .right .price .price-section--prpd {margin-top:0;} } @media screen and (min-width:990px) {  .fortyfive {width:45% !important; margin-left:16px !important;}  #t3-js-main div.price-section.price-section--flex.pnrec {width:45%; display:inline-block; margin-top:3px; border:0;padding:0; float:right;} #t3-js-main div.price-section.price-section--prpd.plrec {width:50%; display:inline-block; margin-top:3px; border:0;padding:0;}  #t3-js-main div.price-section__left.sin {float:right; width:100%; padding:0;} #t3-js-main div.price-section__right.des {float:left; width:100%; padding:0;} .offerselect-list .offerselect-tile .right .price .price-section__left__dayprice {font-size:23px;} .offerselect-list .offerselect-tile .right .price h4 {padding-bottom:10px;} .offerselect-list .offerselect-tile .right .price .price-section__left__overallprice {padding:12px 0;} .offerselect-list .offerselect-tile .left .carimage {width:240px; height:137px;} .offerselect-list .offerselect-tile .center {width: 25.3%;} .offerselect-list .offerselect-tile .right {width:42%; margin-left:1.5em;}    } .cien {width:100% !important; margin-top:10% !important;} .fifty {width:50% !important; float:left !important;} .cienleft {float:left !important; width:100% !important; margin-top:10% !important;} .rojo {text-transform: uppercase; color: #ff7d19;}  ";
            var head = document.getElementsByTagName('head')[0];
            var s = document.createElement('style');
            s.setAttribute('type', 'text/css');
            s.appendChild(document.createTextNode(mainCss));
            head.appendChild(s);
        }, 
        cookieJar: {
            setCookie: function(cname,cvalue,exdays) {
                console.info('%c setscookie \u221a', 'background:blue;color:white;');
                var d = new Date();
                d.setTime(d.getTime() + (exdays*24*60*60*1000));
                var expires = "expires=" + d.toGMTString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            },

            getCookie: function(name) {
              console.info('%c setscookie \u221a', 'background:blue;color:white;');
              var value = "; " + document.cookie;
              var parts = value.split("; " + name + "=");
              if (parts.length == 2) return parts.pop().split(";").shift();
            }
        },

        percentage: function() {
            console.info('%c percentage \u221a', 'background:blue;color:white;');
            var flex,sav,rsav,rflex,tsa,tsav;
            function calculatePercentage($oldFigure, $newFigure) {
                if (($oldFigure != 0) && ($newFigure != 0)) {
                    $percentChange = (1 - $oldFigure / $newFigure) * 100;
                }
                else {
                    $percentChange = null;
                }
                return $percentChange;

            }

            //calculatePercentage(103.77, 98.81)


            //first row
            flex = document.querySelectorAll('.price-section__left__dayprice')[1];
            flex = flex.innerText;
            rflex = flex.replace(/\D+/g, '');
            rflex = (rflex/100).toFixed(0);

            sav = document.querySelectorAll('.price-section__left__dayprice')[0];
            sav = sav.innerText;
            rsav = sav.replace(/\D+/g, '');
            rsav = (rsav/100).toFixed(0);
            tsa = calculatePercentage(rsav,rflex);
            tsa = Number(tsa);
            tsa = parseFloat(tsa);
            tsa = tsa.toFixed(0);
            //console.log(tsa);
            
            document.querySelector('.price-section.price-section--flex.pnrec h4').innerText = 'SAVE ' + tsa + '% EACH DAY';


        },

        payOggi: function() {
            console.info('%c payOggi \u221a', 'background:blue;color:white;');
                var trg,grab;
                var ol = document.querySelectorAll('.sx-res-offerselect-wrapper.sx-res-offerlist-wrapper')[0].children[0];
                var ola = document.querySelectorAll('.sx-res-offerselect-wrapper.sx-res-offerlist-wrapper')[0].children[0].children;
                ol.addEventListener('click',function(e) {
                    console.log(e);
                    if(e.target.innerText == "PAY NOW") {
                       trg = e.target.innerText;
                       trg = trg.replace(/\D+/g, '');  
                       console.log(trg);
                       console.log('hey');
                       //grab perc
                       grab = e.target.parentElement.parentElement.children[0].innerText;
                       grab = grab.replace(/\D+/g, '');
                       console.log(grab);
                       SL.andRedEyelikeSixt.cookieJar.setCookie('reg', grab);
                    }

                },false);
        },

        listRO: function() {
            console.info('%c listRO \u221a', 'background:blue;color:white;');
            document.body.style.opacity = 0.0125;
            otherlist();
            function recommended() {
                console.info('%c recommended \u221a', 'background:blue;color:white;');
                var rec = document.querySelector('.sx-res-offerselect-special-wrapper'); 
                var pnow = rec.querySelector('.price-section.price-section--flex');
                pnow.children[0].innerText = "SAVE 5% EACH DAY";
                pnow.classList.add('pnrec');
                //priceleft/priceright
                var pleft1 = rec.querySelector('.price-section__left');
                var pright1 = rec.querySelector('.price-section__right');
                pleft1.classList.add('sin');
                pright1.classList.add('des');
                var plat = rec.querySelector('.price-section.price-section--prpd');
                plat.children[0].innerText = "STAY FLEXIBLE";
                plat.classList.add('plrec');
                var pleft2 = plat.querySelector('.price-section__left');
                var pright2 = plat.querySelector('.price-section__right');
                pleft2.classList.add('sin');
                pright2.classList.add('des');
            }
            function otherlist() {
                console.info('%c otherlist \u221a', 'background:blue;color:white;');
                var ol = document.querySelectorAll('.sx-res-offerselect-wrapper.sx-res-offerlist-wrapper')[0].children[0].children;

                function calculatePercentage($oldFigure, $newFigure) {
                    if (($oldFigure != 0) && ($newFigure != 0)) {
                        $percentChange = (1 - $oldFigure / $newFigure) * 100;
                    }
                    else {
                        $percentChange = null;
                    }
                    return $percentChange;

                }




                if(ol.length >= 1) {
                    loopup();
                }
                function loopup() {
                    var amt,savi,flexi;
                    var arr = [];
                    setTimeout(function(e) {
                        for(var i=0; i<ol.length; i++) {

                        console.log(ol[i]);
                        savi = ol[i].children[2].children[0].children[0].children[0];


                            if(savi.children[0].innerText == "OUR LOWEST RATE") {
                                savi.children[0].innerText = "SAVE 5% EACH DAY";
                                saving = savi.children[1].children[0].innerText;
                                saving = saving.replace(/\D+/g, '');
                                saving = (saving/100).toFixed(0);
                                console.log('amount right ' + saving);

                            }
                            else if(savi.children[0].innerText == "FREE CANCELLATION") {
                                savi.children[0].innerText = "STAY FLEXIBLE";
                                 
                            }
                            
                            if(ol[i].children[2].children[0].children[0].children[1].children[0].innerText == "FREE CANCELLATION") {
                                ol[i].children[2].children[0].children[0].children[1].children[0].innerText = "STAY FLEXIBLE";
                                

                               flex = ol[i].children[2].children[0].children[0].children[1].children[1].children[0].innerText;
                                flex = flex.replace(/\D+/g, '');
                                flex = (flex/100).toFixed(0);
                                console.log('amount left ' + flex);
                                
                                    
                                if(ol[i].children[2].children[0].children[0].children.length == 3) {
                                        amt = calculatePercentage(saving,flex);
                                        amt = Number(amt);
                                        amt = parseFloat(amt);
                                        amt = amt.toFixed(0);
                                        console.log('savings ' + amt +'%');
                        
                                        ol[i].children[2].children[0].children[0].children[0].children[0].innerText = "SAVE " + amt + "% EACH DAY";
                                         SL.andRedEyelikeSixt.cookieJar.setCookie('rega',amt);

            
                                }
                                        

                            }
                            
                            if(savi.className == "price-section price-section--flex") {
                                savi.classList.add('pnrec');
                            }
                            if(ol[i].children[2].children[0].children[0].children[1].className == "price-section price-section--prpd") {
                                ol[i].children[2].children[0].children[0].children[1].classList.add('plrec');
                            }
                            else if(ol[i].children[2].children[0].children[0].children[0].className == "price-section price-section--prpd") {
                                ol[i].children[2].children[0].children[0].children[0].classList.add('plrec');
                            }
                            if(ol[i].children[2].children[0].children[0].children[1].className == "price-section price-section--prpd plrec") {
                                ol[i].children[2].children[0].children[0].children[1].children[1].classList.add('sin');
                                ol[i].children[2].children[0].children[0].children[1].children[2].classList.add('des');
                            }
                            if(savi.children[1].className == "price-section__left") {
                                savi.children[1].classList.add('sin');
                            }          
                            if(savi.children[2].className == "price-section__right") {
                                savi.children[2].classList.add('des');
                            }
                            if(ol[i].children[2].children[0].children[0].children.length === 2) {
                                if(savi.className == "price-section price-section--flex pnrec") {
                                            savi.className = "price-section price-section--flex pnrec cienleft";
                                            savi.children[1].classList.add('fifty');
                                            savi.children[2].classList.add('fortyfive');

                                }
                                else if(savi.className == "price-section price-section--prpd plrec") {
                                            savi.className = "price-section price-section--prpd plrec cien";
                                            savi.children[1].classList.add('fifty');
                                            savi.children[2].classList.add('fortyfive');
                                }
                            }

                        }

                    },650);
                    
                }
                    
            }
            recommended();
            lights();
            
          
            function lights() {
                    console.info('%c lights \u221a', 'background:blue;color:white;');
                    document.body.style.opacity = 1;
            }

        },  

        pageNome: function() {
                var panow = document.querySelector('.sx-res-config-save');
                var palat = document.querySelector('.sx-res-config-extra-incl-highlight');
                var fp,fg,fn;
                if(document.querySelector('.sx-res-config-prpd')) { 
                    if(document.querySelector('.sx-res-config-save')){
                        if(panow.innerText == "CHEAPEST PRICE - YOU SAVE 5%") {
                            panow.classList.add('rojo');
                            fp = document.querySelector('.sx-res-config-cost.sx-res-config-cost-payment-list').innerText;
                            fg = fp.slice(3,fp.length);
                            fn = parseFloat(fg);
                            reg = SL.andRedEyelikeSixt.cookieJar.getCookie('reg');
                            //reg = SL.andRedEyelikeSixt.cookieJar.setCookie('rega');
                            console.log('regular value');
                            console.log(reg);
                            if(typeof reg === 'undefined') {
                                sav = "5";
                            }
                            else {
                                sav = reg;
                                customerSavingsIs = reg;
                                SL.andRedEyelikeSixt.cookieJar.setCookie('custdet',customerSavingsIs);
                            }
                            panow.innerText = "SAVE " + sav + "% EACH DAY";
                        }
                        con.innerText = "Save " + sav + "% each day";


                    }//config-save
                    else {
                         var pi = document.createElement('p');
                         pi.innerText = "Stay flexible, pay later";
                         pi.style.clear = 'left';
                         pi.className = 'rojo';
                         document.querySelector('.sx-res-config-prpd').appendChild(pi);
                         fp = document.querySelector('.sx-res-config-cost.sx-res-config-cost-payment-list').innerText;
                            fg = fp.slice(3,fp.length);
                            fn = parseFloat(fg);
                            reg = SL.andRedEyelikeSixt.cookieJar.getCookie('reg');
                            //reg = SL.andRedEyelikeSixt.cookieJar.setCookie('rega');
                        
                            
                            if(typeof reg === 'undefined') {
                                sav = "5";
                            }
                            else {
                                sav = reg;
                                customerSavingsIs = reg;
                                SL.andRedEyelikeSixt.cookieJar.setCookie('custdet',customerSavingsIs);
                            }
                            pi.innerText = "SAVE " + sav + "% EACH DAY";
                            document.querySelector('.sx-res-prepaid-postpaid-hint').innerText = "SAVE " + sav + "% EACH DAY";


                    }

                    
                }//if sx-res-config-prpd

               

                if(document.querySelector('.sx-res-config-extra-incl-highlight')) {
                    if(palat.innerText == "FREE CANCELLATION - STAY FLEXIBLE") {
                        console.log('paylater');
                        document.querySelector('.sx-res-config-extra-incl-highlight').innerText = "Stay flexible, pay later";
                        document.querySelector('.sx-res-prepaid-postpaid-hint').innerText = "Stay flexible, pay later";
                    }
                }

                if(document.querySelector('.sx-res-config-flex')) {
                    var p = document.createElement('p');
                    p.innerText = "Stay flexible, pay later";
                    p.style.clear = 'left';
                    p.className = 'rojo';
                    if(document.querySelector('.sx-res-config-extra-incl-highlight')) {
                        console.log('dont do it');
                    }else {
                        document.querySelector('.sx-res-config-flex').appendChild(p);
                        document.querySelector('.sx-res-prepaid-postpaid-hint').innerText = "Stay flexible, pay later";

                    }
                    


                }
        },
        pageCust: function() {
            console.info('%c pageCust \u221a', 'background:blue;color:white;');
                con = document.querySelector('.sx-res-prepaid-postpaid-hint');
                var custco = SL.andRedEyelikeSixt.cookieJar.getCookie('custdet');
                if(con.innerText === "Free cancellation at any time!") {
                    console.log("STAY FLEXIBLE");
                    con.innerText = "Stay flexible, pay later";
                }
                else if(con.innerText == "Our lowest rate") {
                    console.log("Save 5% each day");
                    if(isNaN(custco)) {
                        custco = "5%";
                        con.innerText = "Save " + custco + " each day";
                    }
                    else if(custco > 0) {
                        con.innerText = "Save " + custco + "% each day";  
                    }
                    
                }


        }

    };
   (function _RE() {
        //if (window.jQuery !== undefined) {
            //try {
                SL.andRedEyelikeSixt.init();
            //} 
            //catch (err) {
                 // console.log('TRY ERROR: '+ err);
            //}
        //} else { 
          //  setTimeout(_RE, 45); 
        //}
           
    })();

}.call(window.andRedEyelikeSixt || {}));