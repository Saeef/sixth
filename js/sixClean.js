(function(andRedEyelikeSixt, undefined) {
    var $ = window.jQuery;
    var SL = {};
    var reg,sav;
    var customerSavingsIs = 0;
    var con = $('.sx-res-prepaid-postpaid-hint');
    var path = window.location.pathname;
    var lu = $('.sx-res-offerselect-wrapper.sx-res-offerlist-wrapper');
    var ah4r = $('.right > div > div > div.price-section.price-section--flex > h4');
    var prir = $('.price-section.price-section--flex > div.price-section__left > span.price-section__left__dayprice');
    var ah4l = $('.right div.price-section.price-section--prpd > h4');
    var pril = $('.price-section.price-section--prpd > div.price-section__left > span.price-section__left__dayprice');
    var pnow = $('.price-section.price-section--flex > div.price-section__right');
    var plater = $('.price-section.price-section--prpd > div.price-section__right');
    var $percentChange;
    SL.andRedEyelikeSixt = {
        init: function() { 
            this.pgCssDesktop();
            
            if(path == "/php/reservation/offerselect") {
                SL.andRedEyelikeSixt.firstRow();
                SL.andRedEyelikeSixt.listRO();
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
            function addcss(css) {
                var s = document.createElement('style');
                s.setAttribute('type', 'text/css');
                s.appendChild(document.createTextNode(css));
                head.appendChild(s);
            }
            addcss(mainCss);
        }, 
        cookieJar: {
            setCookie: function(cname,cvalue,exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays*24*60*60*1000));
                var expires = "expires=" + d.toGMTString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            },

            getCookie: function(name) {
              var value = "; " + document.cookie;
              var parts = value.split("; " + name + "=");
              if (parts.length == 2) return parts.pop().split(";").shift();
            }
        },

        payOggi: function() {
                var trg,grab;
                var ol = document.querySelectorAll('.sx-res-offerselect-wrapper.sx-res-offerlist-wrapper')[0];
                var ola = document.querySelector('#sx-res-offerselect-special > li > div.right > div > div');
                ol.addEventListener('click',function(e) {
                    if(e.target.innerText.toUpperCase() == "PAY NOW") {
                       trg = e.target.innerText;
                       trg = trg.replace(/\D+/g, '');  
                       grab = e.target.parentElement.parentElement.children[0].innerText;
                       grab = grab.replace(/\D+/g, '');
                       console.log(grab);
                       SL.andRedEyelikeSixt.cookieJar.setCookie('reg', grab);
                    }

                },false);
                ola.addEventListener('click',function(e) {
                    if(e.target.innerText.toUpperCase() == "PAY NOW") {
                       trg = e.target.innerText;
                       trg = trg.replace(/\D+/g, '');  
                       grab = e.target.parentElement.parentElement.children[0].innerText;
                       grab = grab.replace(/\D+/g, '');
                       console.log(grab);
                       SL.andRedEyelikeSixt.cookieJar.setCookie('reg', grab);
                    }

                },false);
        },

        firstRow: function() {
            console.log('firstRow');
            document.querySelector('#sx-res-offerselect-special > li > div.right div.price-section.price-section--prpd > h4').innerText = "STAY FLEXIBLE";
            var a,b,c,d,change,res,result;
            pn = $('#sx-res-offerselect-special > li > div.right > div > div > div.price-section.price-section--flex > div.price-section__left > span.price-section__left__dayprice').text();
            pn = pn.replace(/\D+/g, '');
            a = pn.slice(0,5);
            b = (a/100).toFixed(0);
            pl = $('#sx-res-offerselect-special > li > div.right > div > div > div.price-section.price-section--prpd > div.price-section__left > span.price-section__left__dayprice').text();
            pl = pl.replace(/\D+/g, '');
            c = pl.slice(0,5);
            d = (c/100).toFixed(0);
            change = (1 - b / d) * 100; 
            res = Number(change);    
            res = parseFloat(res);
            res = res.toFixed(0);
            result = "SAVE " + res + "% EACH DAY";            
            $('#sx-res-offerselect-special > li > div.right > div > div > div.price-section.price-section--flex > h4').html(result);
        },

        listRO: function() {
            document.body.style.opacity = 0.0125;
            otherlist();

            function recommendedclasses(index) {
                var pno,pna;
                pno = $('#sx-res-offerselect-special > li > div.right > div > div > div.price-section.price-section--flex');
                pno.addClass('pnrec');
                $('#sx-res-offerselect-special > li > div.right > div > div > div.price-section.price-section--flex > div.price-section__left').addClass('sin');
                pna = $('#sx-res-offerselect-special > li > div.right > div > div > div.price-section.price-section--prpd');
                pna.addClass('plrec');
                $('#sx-res-offerselect-special > li > div.right > div > div > div.price-section.price-section--prpd > div.price-section__left').addClass('sin');
                prir[index].parentElement.classList.add('sin');
                pril[index].parentElement.classList.add('sin');
                pnow[index].classList.add('des');
                plater[index].classList.add('des');
                

            }

            function otherlist() {
                function calculatePercentage($oldFigure, $newFigure, index) {
                    index = index || 0;
                    var res;
                    if (($oldFigure != 0) && ($newFigure != 0)) {
                        $percentChange = (1 - $oldFigure / $newFigure) * 100;
                    }
                    else {
                        $percentChange = null;
                    }   
                    res = Number($percentChange);    
                    res = parseFloat(res);
                    res = res.toFixed(0);          
                    if(document.querySelectorAll('#sx-res-offerselect-all div.price-section.price-section--flex > h4')[index].parentElement.className.indexOf('price-section--flex') > -1) {
                            document.querySelectorAll('#sx-res-offerselect-all div.price-section.price-section--flex > h4')[index].innerText = "SAVE " + res + "% EACH DAY";   
                    }              

                }

                lu = document.querySelector('.sx-res-offerselect-wrapper.sx-res-offerlist-wrapper');
                ah4r = document.querySelectorAll('#sx-res-offerselect-all div.right > div > div > div.price-section.price-section--flex > h4');
                    console.log(ah4r);
                prir = document.querySelectorAll('#sx-res-offerselect-all div.price-section.price-section--flex > div.price-section__left > span.price-section__left__dayprice');
                    console.log(prir);
                ah4l = document.querySelectorAll('#sx-res-offerselect-all div.right div.price-section.price-section--prpd > h4');
                    console.log(ah4l);
                pril = document.querySelectorAll('#sx-res-offerselect-all div.price-section.price-section--prpd > div.price-section__left > span.price-section__left__dayprice');
                    console.log(pril);
            

                if(lu.children[0].children.length >= 1) {
                    console.log('lu greater than 1');
                    lupo();
                }



                function lupo() {
                    var riprice,leprice,letitle,rititle;
                    setTimeout(function() {
                        for(var i=0; i < ah4r.length; i++) {
                            if(ah4r[i].innerText.toUpperCase() == "OUR LOWEST RATE") {
                                rititle = ah4r[i].innerText = "SAVE 5% EACH DAY";
                                if(ah4r[i].parentElement.parentElement.children.length == 2) {
                                    ah4r[i].parentElement.classList.add('cien');
                                    ah4r[i].parentElement.children[1].classList.add('fifty');
                                    ah4r[i].parentElement.children[2].classList.add('fortyfive');
                                }
                                ah4r[i].parentElement.classList.add('pnrec');
                            }
                        }

                        for(var f=0; f < ah4l.length; f++) {
                            if(ah4l[f].innerText.toUpperCase() == "FREE CANCELLATION") {
                                letitle = ah4l[f].innerText = "STAY FLEXIBLE";
                                
                                if(ah4l[f].parentElement.parentElement.children.length == 2) {
                                    ah4l[f].parentElement.classList.add('cienleft');
                                    ah4l[f].parentElement.children[1].classList.add('fifty');
                                    ah4l[f].parentElement.children[2].classList.add('fortyfive');
                                }
                                ah4l[f].parentElement.classList.add('plrec');
                            }
                        }

                    
                        //priceright
                        for(var p=0; p < prir.length;) {
                            for(var h=0; h < pril.length; h++) {
                             
                            if( p < prir.length ) {  

                                    if(prir[p]) {
                                        riprice = prir[p].innerText;
                                        riprice = riprice.replace(/\D+/g, '');
                                        riprice = (riprice/100).toFixed(0);
                                        console.log('right amt: ' + riprice);

                                    }
                                    if(pril[h]) {
                                        leprice = pril[h].innerText;
                                        leprice = leprice.replace(/\D+/g, '');
                                        leprice = (leprice/100).toFixed(0);
                                    }
                                        
                                    if(p == h) {
                                        calculatePercentage(riprice,leprice,p);
                                        recommendedclasses(p);
                                        p++;
                                    }//if
                            }        

                               
                            }//for
    
                        }//for price-right

                    },650);
                    lights();

                }//lupo
                    
            }//otherlist
            
          
            function lights() {
                    document.body.style.opacity = 1;
            }

        }, //listRO 

        pageNome: function() {
                var panow = document.querySelector('.sx-res-config-save');
                var palat = document.querySelector('.sx-res-config-extra-incl-highlight');
                var fp,fg,fn;
                if(document.querySelector('.sx-res-config-prpd')) { 
                    if(document.querySelector('.sx-res-config-save')){
                        if(panow.innerText.toUpperCase().indexOf('CHEAPEST PRICE') > -1) {
                            panow.classList.add('rojo');
                            fp = document.querySelector('.sx-res-config-cost.sx-res-config-cost-payment-list').innerText;
                            fg = fp.slice(3,fp.length);
                            fn = parseFloat(fg);
                            reg = SL.andRedEyelikeSixt.cookieJar.getCookie('reg');
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


                    }
                    if($('#sx-js-res-offerconfig-data > form > div.sx-cta-area > div.sx-res-prepaid-postpaid-hint').text().toUpperCase().indexOf('OUR LOWEST') > -1) {
                        low = $('#sx-js-res-offerconfig-data > form > div.sx-cta-area > div.sx-res-prepaid-postpaid-hint').text("Save " + sav + "% each day");
                    }
                    
      
                }

               

                if(document.querySelector('.sx-res-config-extra-incl-highlight')) {
                    if(palat.innerText.toUpperCase() == "FREE CANCELLATION - STAY FLEXIBLE") {
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
                con = document.querySelector('.sx-res-prepaid-postpaid-hint');
                var custco = SL.andRedEyelikeSixt.cookieJar.getCookie('custdet');
                if(con.innerText.toUpperCase().indexOf("FREE CANCELLATION") > -1) {
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
        if (window.jQuery !== undefined) {
            try {
                SL.andRedEyelikeSixt.init();
            } 
            catch (err) {
                console.log('TRY ERROR: '+ err);
            }
        } else { 
            setTimeout(_RE, 45); 
        }
           
    })();

}.call(window.andRedEyelikeSixt || {}));