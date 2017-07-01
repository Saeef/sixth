/**
 * res.js
 * common reservation js
 *
 * @author:     jw
 * created:     25.10.2010
 * needs:       jquery-1.4.2.js
 */

    // sometimes ...
    var sx_is_ie6       =  !!(document.all && navigator.appVersion.indexOf("MSIE 6.")!=-1);
    var sx_is_ie7       =  !!(document.all && navigator.appVersion.indexOf("MSIE 7.")!=-1);

    var sx_past_res_tpl =  (typeof get_cookie === "function")? get_cookie('sx_reservation_tpl') : false;

    var SIXT    =  window.SIXT      || {};
        SIXT.sx =  window.SIXT.sx   || {};

    $(document).ready(function() {

        // set template name
        sx_reservation_tpl = window.sx_reservation_tpl || false;
        sx_partner_context = window.sx_partner_context || false;

        // hard return in case of browser back in portal
        (function(){
            var is_portal =  (window.location.host.indexOf("business.sixt.com") !== -1)? true : false;
            if(!is_portal) {
                return;
            }

            if(sx_past_res_tpl === 'bookingconfirmation' || (sx_past_res_tpl === 'switchoci' && sx_reservation_tpl !== 'bookingconfirmation'))  {
                set_cookie('sx_reservation_tpl', '',0,1,0);
                self.location.replace(window.location.protocol + '\/\/business.sixt.com/php/portal/portal');
            }
        })();

        /**
         * decide what to do in the beginning, depending on template's name
         ******************************************************************
         * ATTENTION! New templates containing suggest must be added in
         * incl/google-maps.tpl too!
         ******************************************************************
         * @author: jw
         * @params:
         */
        switch (sx_reservation_tpl) {
            case "home":
                sx_station_suggest.init();
                sx_init_booking_time();
                sx_res_datepicker.init_ibe_horizontal();
                sx_home_topoffer.init();
                sx_location.check();
                sx_store_hash.init();
                sx_awardsform_init();
                sx_waiting.init();

                // GEODELCOL
                sx_del_col.init();
                if ( typeof is_relaunch_delcol !== "undefined" && is_relaunch_delcol ) {
                    sx_station_suggest.event_observers.set_as_pickup.push( $.proxy(sx_del_col.on_suggest_set_as_pickup, sx_del_col) );
                }

                //initiate the social media login
                sx_social_media_login.init();
                sx_mobile_banner.init();

                // basic slider init
                sx_teaser_slider_basic.init();

                prevent_zoomin_issue_for_mobile();

                break;
            case "lkw_fleet":
                sx_lkw_fleet.init();
                sx_lkw.init();
                sx_lkw_teaser.init();
                break;
            case "start":
                sx_partner_iframe.init_on_safari();
                sx_fleet_start.init();
                sx_station_suggest.init();
                sx_init_booking_time();
                sx_login.init();
                sx_login.logout();
                // if partner initialize start with open datepickers
                if (sx_partner_context) {
                    sx_res_datepicker.init_partner();
                } else {
                    sx_res_datepicker.init_ibe_horizontal();
                }
                //sx_init_alt_suggests();
                sx_init_agb();
                sx_awardsform_init();

                //initiate the social media login
                sx_social_media_login.init();

                // GEODELCOL
                sx_del_col.init();
                sx_login.callback.logout.push( $.proxy( sx_del_col.on_sx_login__logout, sx_del_col ) );
                sx_login.callback.login_welcome.push( $.proxy( sx_del_col.on_sx_login__login_welcome,  sx_del_col ) );
                break;
            case "agent-start":
            case "newsletter":
            case "startrebooking":
                sx_fleet_start.init();
                sx_station_suggest.init();
                sx_init_booking_time();
                sx_login.init();
                sx_login.logout();
                sx_res_datepicker.init_ibe_horizontal();
                sx_init_agb();
                sx_awardsform_init();

                // GEODELCOL
                sx_del_col.init();
                sx_login.callback.logout.push( $.proxy( sx_del_col.on_sx_login__logout, sx_del_col ) );
                sx_login.callback.login_welcome.push( $.proxy( sx_del_col.on_sx_login__login_welcome,  sx_del_col ) );
                break;
            case "offerselect":
                sx_login.logout();
                //sx_res_datepicker.init_booking();
                sx_res_set_breadcrumb(1);
                sx_res_backlink();
                sx_init_offerselect();
                sx_init_agb();
                sx_init_tell_a_friend();
                titleBlinker.init();
                //sx_get_shortage.init();
                init_alternative_currency();
                break;
            case "offerconfig":
                sx_res_set_breadcrumb(2);
                sx_login.logout();
                sx_offerconfig.init();
                sx_init_offerconfig_info();
                sx_init_agb();
                sx_init_tell_a_friend();
                titleBlinker.init();


                currencySelector.init();
                //sx_offerconfig.restore_state(); // set past state again...
                init_alternative_currency();
                break;
            case "customerdetails":
                sx_customerdetails.init();
                sx_res_set_breadcrumb(3);
                sx_login.init();
                sx_login.logout();
                sx_init_agb();
                sx_youngdriver.init();
                sx_set_errors();
                //initiate the social media login
                sx_social_media_login.init();
                titleBlinker.init();
                break;
            case "switchoci":
                sx_res_set_breadcrumb(3);
                sx_init_agb();
                sx_switchoci.init();
                break;
            case "mobile/switchoci":
                break;
            case "bookingconfirmation":
                sx_res_set_breadcrumb(4);
                sx_login.logout();
                sx_init_agb();
                sx_init_bookingconfirmation();
                break;
            case "topoffer_list":
                sx_topoffer.init();
                break;
            case "topoffer_details":
            case "topoffer_details_horizontal":
                sx_station_suggest.init();
                sx_init_booking_time();
                sx_login.init();
                sx_login.logout();
                sx_res_datepicker.init_ibe_horizontal();
                break;
            case "agent-rateselection":
                sx_agentrate.init();
                sx_login.logout();
                break;
            case "loginstart":
            case "prerental":
            case "corporate-customers-register":
                sx_login.init();
                break;
            case "editreservation":
                sx_editres.init();
                break;
            case "reservation_check":
                sx_station_suggest.init();
                sx_init_reservation_check();
                break;
            case "create_xing_vouchers":
            case "create_ypo_vouchers":
                sx_partnervoucher_voucher();
                break;
        }


		// rollout postmessage on follwing partners
        var partners_with_iframe = ['hrs_slim', 'ltur'];
		if(sx_partner_context && $.inArray(sx_partner_context, partners_with_iframe) >= 0) {
            sx_partner_iframe.init();
        }

        if(typeof set_cookie !== "undefined") {
            // set coockie to display debug
            sx_show_debug_info();
            // store to see where we come from
            set_cookie('sx_reservation_tpl',sx_reservation_tpl,0,1,0);
        }

        // initialize customized sitecatalist events
        if(typeof sitecatalyst !== "undefined" && typeof sitecatalyst.init !== "undefined") {
            sitecatalyst.init();
        }

        // gps/geolocation?
        if( $('.sx-js-res-get-loc').length && typeof sx_geolocation !== "undefined" ) {
            sx_geolocation.init();
        }

        get_loading_time();
    });


    /*
     * Introduce the modules namespace to our SIXT namespace
     */
    window.SIXT.modules = window.SIXT.modules || {};


    /*
     * This module comfortably creates single or further nested namespaces
     * while respecting allready existing ones.
     * Use it like NamespaceFactory("Foo.Bar.Blah");
     */
    window.SIXT.modules.NamespaceFactory = function(namespace) {
        var namespaces = namespace.split('.'),
            size = namespaces.length,
            parent = window,
            current;
        for (var i = 0; i < size; i++) {
            current = namespaces[i];
            parent[current] = parent[current] || {};
            parent = parent[current];
        }
        return window[namespaces[0]];
    };

    /*
     * Tiny Pub/Sub plugin with namespaces
     * @example
     * onFoo = function(ev, args){}; "ev" is the event object, you probably don't care about it.
     * $.subscribe('foo', onFoo(args));
     * $.publish('foo', args);
     */
    (function($) {
        var o = $({});
        $.subscribe = function() {
            o.on.apply(o, arguments);
        };
        $.unsubscribe = function() {
            o.off.apply(o, arguments);
        };
        $.publish = function() {
            o.trigger.apply(o, arguments);
        };
    }(jQuery));

    /*
     * jQuery throttle / debounce - v1.1 - 3/7/2010
     * http://benalman.com/projects/jquery-throttle-debounce-plugin/
     *
     * Copyright (c) 2010 "Cowboy" Ben Alman
     * Dual licensed under the MIT and GPL licenses.
     * http://benalman.com/about/license/
     */
    (function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);


    /**
     * return the parameters of the url as an array
     * @author  sebastian.uebele@sixt.com
     *
     * @return array
     */
    var sx_helper = (function() {
        return {
            get_url_vars: function() {
                var vars = [], hash;
                var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                for(var i = 0; i < hashes.length; i++)
                {
                    hash = hashes[i].split('=');
                    vars.push(hash[0]);
                    vars[hash[0]] = hash[1];
                }
                return vars;
            }
        }
    })();


    var sx_partner_iframe = (function() {
       /**
        * send postMessage to the window where the site is integrated
        * @author  sebastian.uebele@sixt.com
        *
        * @return  {void}
        */
        function send_postmsg(height) {
            if( typeof height === 'undefined' ) {
                height = $('body').height();
            }
            parent.postMessage(
                JSON.stringify({ // IE8/9 require stringified data
                method: "resize",
                    params: {
                        height: height
                    }
                }), '*'
            );
        }


        function is_in_iframe() {
            try {
                return window.self !== window.top;
            } catch (e) {
                return true;
            }
        }

        function is_safari() {
            var ua = navigator.userAgent.toLowerCase();
            var is_safari = false;
            if (ua.indexOf('safari') != -1) {
                if (ua.indexOf('chrome') > -1) {
                    is_safari = false; // Chrome
                } else {
                    is_safari = true; // Safari
                }
              }
            return is_safari;
        }

        return {

        /**
        * Safari is by default not possible to write 3rd-Party Cookies
        * @author  sebastian.uebele@sixt.com
        *
        * @return  {void}
        */
            init_on_safari: function() {

                if( is_safari() && is_in_iframe() && !document.cookie ) {
                    href=document.location.href;
                    href=(href.indexOf('?')==-1)?href+'?':href+'&';
                    top.location.href =href+'reref='+document.referrer;
                } else {
                    if( typeof sx_helper.get_url_vars()['reref'] !== 'undefined') {
                        window.location.href = sx_helper.get_url_vars()['reref'];
                    }
                }

            },

            init: function() {

                send_postmsg();

                // special usecase for bookingconfirmation
                // page grows dynamic so postmsg when window has finished loading
                if( sx_reservation_tpl === 'bookingconfirmation' ) {
                    $(window).load(function() {
                        send_postmsg();
                    })
                }

                $(document).mousedown(function(e){
                   $.box.iframe_click_pos_y = e.pageY;
                });

                $(document).click(function(e) {
                    setTimeout(send_postmsg, 50);
                });

                /**
                * override functions in jquery.box plugin from joachim wendenburg
                * to set a position of box and preloadimage to the abssolute value of clicked y position
                * @author  sebastian.uebele@sixt.com
                *
                * @return  {void}
                */

                // set position of loading_icon in a visible area
                $.box.overlay_size = function() {
                    var sx_is_ie6       =  !!(document.all && navigator.appVersion.indexOf("MSIE 6.")!=-1);
                    var overlay_height  =  sx_is_ie6? "height" : "minHeight";
                    var loading_icon_height = 100;
                    var top = 0;
                    if( this.iframe_click_pos_y - loading_icon_height <= (loading_icon_height/2) ) {
                        top = this.iframe_click_pos_y + 100;
                    } else {
                        top = this.iframe_click_pos_y - 100;
                    }
                    $(this.curr.opt.box_overlay).css(overlay_height, $.box.client().height + 'px').css('backgroundPosition', '50% ' + top + "px");
                };

                // set position of box in a visible area
                $.box.set_box_pos = function() {
                    var top = 0;
                    var top_padding = 10;
                    var body_height = $('body').height();

                    if (!this.curr.opt.box_window) {
                        return;
                    }

                    var box_height = $(this.curr.opt.box_window).outerHeight(false);
                    var left = ($(window).width()/2 - box_height/2 + $.box.client().scrollleft)  + "px";

                    if( body_height <= box_height + top_padding ) {
                        send_postmsg( box_height + top_padding );
                    }

                    if( this.iframe_click_pos_y <= $(this.curr.opt.box_window).outerHeight(false) ) {
                        if( body_height - ( this.iframe_click_pos_y + box_height ) <= 0 ) {
                            top = top_padding + "px";
                        } else {
                            top  = this.iframe_click_pos_y + "px";
                        }

                    } else {
                        top  = this.iframe_click_pos_y - box_height + "px";
                    }

                    $('#box-overlay').css('background-position', '50% 0px');
                    $(this.curr.opt.box_window).css("top", top).css("left", left);
                };

            }
        };
    })(); // sx_partner_iframe



    var sx_lkw_fleet = {

        config: {
            testing: false
        },

        run: false,

        init: function() {
            var $_tradoubler_img = $('img:first', '#sx-lkw-home-tradedoubler-wrapper');

            this.db('img:' +  $_tradoubler_img.length);

            if($_tradoubler_img.length) {
                this.check_image(0, $_tradoubler_img);
            } else {
                this.replace_img();
            }
        },

        check_image: function(cnt, $el) {

            cnt ++;
            var ht;
            var obj =  this;
            var ok  =  false;

            clearTimeout(this.run);

            // does img has an height larger 200px?
            ht  =  $el.get(0).height;

            this.db("height: " + ht);

            if(ht < 100) {
                // check up to 5 times if image is available
                if(cnt < 5) {
                    this.run =  setTimeout(function(){obj.check_image(cnt, $el)}, 500);
                    return;
                }

                obj.replace_img();
            }
        },

        replace_img: function() {
            var buttons =   $('#sx-lkw-home-tradedoubler-wrapper .sx-ibe-button-wrapper')
                            .add( $('#sx-lkw-home-tradedoubler-wrapper .sx-button-wrapper') );
            // remove tradedoubler but not the buttons
            var $wrap =  $('#sx-lkw-home-tradedoubler-wrapper').html(buttons);
            // replace tradedoubler with default image
            $('<img>').attr({
                src: sx_default_img.src
                ,alt: sx_default_img.alt
                ,title: sx_default_img.title
            }).prependTo($wrap);
        },

        db: function(out) {

            if(!this.config.testing) {
                return false;
            }

            try{
                console.info(out);
            }catch(err){};
        }
    };






    var sx_lkw =  {

        page: 0,
        page_items: 3,
        page_list: [],
        page_curr: 1,

        init: function() {
            var obj =  this;
            $("#sx-home-lkw-list-wrapper ul li").each(function(i) {
                if(!(i < obj.page_items * obj.page)) {
                    obj.page ++;
                    obj.page_list.push(obj.page);
                }
                $(this).addClass("sx-lkw-list-page-" + obj.page);

                // get either href or click and add to car image
                if( $(".sx-js-submit-button:first", this).is("a") ) {
                    var url =  $("a:first", this).attr("href");
                    $("img:first", this).click(function(){
                        self.location.href =  url;
                    });
                } else {
                    var p  =  $(".sx-js-submit-button", this);
                    $("img:first", this).click(function(){
                        p.click();
                    });
                }
            });

            $("#sx-js-offer-back").click(function(){
                obj.down();
            });
            $("#sx-js-offer-next").click(function(){
                obj.up();
            });
            this.dpl();
        },


        dpl: function() {
            $("#sx-home-lkw-list-wrapper ul li").css('display', 'none');
            $(".sx-lkw-list-page-" + this.page_curr).css('display', '');

            $("#sx-js-offer-back").removeClass("sx-offer-inactive");
            $("#sx-js-offer-next").removeClass("sx-offer-inactive");

            if(this.page_curr === this.page_list[0]) {
                $("#sx-js-offer-back").addClass("sx-offer-inactive");
            } else if(this.page_curr === this.page_list[this.page_list.length -1]) {
                $("#sx-js-offer-next").addClass("sx-offer-inactive");
            }
        },

        up: function() {
            if (this.page_curr < this.page_list.length) {
                this.page_curr ++;
            }
            this.dpl();
        },

        down: function() {
            if (this.page_curr > 1) {
                this.page_curr --;
            }
            this.dpl();
        }
    };

    var sx_lkw_teaser =  {

        page: 0,
        page_items: 3,
        page_list: [],
        page_curr: 1,

        init: function() {
            var obj =  this;
            $("#sx-base-home-teaser-wrapper ul li").each(function(i) {
                if(!(i < obj.page_items * obj.page)) {
                    obj.page ++;
                    obj.page_list.push(obj.page);
                }
                $(this).addClass("sx-lkw-teaser-page-" + obj.page);
            });

            $("#sx-js-tt-teaser-back").click(function(){
                obj.down();
            });
            $("#sx-js-tt-teaser-next").click(function(){
                obj.up();
            });
            this.dpl();
        },

        dpl: function() {
            $("#sx-base-home-teaser-wrapper ul li").css('display', 'none');
            $(".sx-lkw-teaser-page-" + this.page_curr).css('display', '');

            $("#sx-js-tt-teaser-back").removeClass("sx-offer-inactive");
            $("#sx-js-tt-teaser-next").removeClass("sx-offer-inactive");

            if(this.page_curr === this.page_list[0]) {
                $("#sx-js-tt-teaser-back").addClass("sx-offer-inactive");
            } else if(this.page_curr === this.page_list[this.page_list.length -1]) {
                $("#sx-js-tt-teaser-next").addClass("sx-offer-inactive");
            }
        },

        up: function() {
            if (this.page_curr < this.page_list.length) {
                this.page_curr ++;
            }
            this.dpl();
        },

        down: function() {
            if (this.page_curr > 1) {
                this.page_curr --;
            }
            this.dpl();
        }
    };

    /**
     * init offerselect
     * @author: jw
     * @params:
     */
    function sx_init_offerselect() {

        if( $("#sx-res-catlist").length ) {
            // old offerselect
            $("#sx-res-catlist").click(function(e){
                sx_res_dpl_catlist(e);
            }).mouseout(function(e){
                sx_res_dpl_catlist(e);
            });
        }

        // currencies
        $("#sx-js-res-change-wakz").box({
            'txttitle': _sx_res_txt('currencyselect'),
            'width': '440px',
            'height': '230px'
        });

        // alternative cits
        $("#sx-js-res-altcit").box({
            'txttitle': _sx_res_txt('alt_cit'),
            'width': '490px',
            'height': '280px'
        });

        // alternative lkw cits
        $("#sx-js-res-lkw-altcit").box({
            'txttitle': _sx_res_txt('alt_cit'),
            'width': '490px',
            'height': '280px'
        });

        // alternative funcars cits
        $("#sx-js-res-funcar-altcit").box({
            'txttitle': _sx_res_txt('alt_cit'),
            'width': '490px',
            'height': '280px'
        });

        // surprise
        $("#sx-js-res-surprise-info").box({
            'txttitle': _sx_res_txt('surprise'),
            'width': '220px',
            'height': '120px'
        });

        // init fastlane functionality
        sx_offerselect_fastlane.init();

        // init booking-buttons
        sx_offerselect_booking.init();

        // init openhour info sync with time select - if available
        if( $('#sx-js-res-pu-time').length && $('#sx-js-res-ret-time').length ) {
            sx_sync_info_with_select.add("sx-js-res-pu-time");
            sx_sync_info_with_select.add("sx-js-res-ret-time");
        }

        // init waitlist
        sx_waitlist.init();

        // filter stuff
        sx_preselect_offer_filter();

        // USA-1212
        collapsibleOfferfilter.init();

        //SLP-103
        minimumAgeFilter.init();

        // WEBC-231
        currencySelector.init();

        $('.sx-res-js-select-offer').click(clickOffer);
    }

    var clickOffer = function(payment_method) {
        age_restricted = $(this).data("age_restricted");

        if(!age_restricted){
            var handle = $(this).data("handle");
            var offer_type = $(this).data("offer_type");
            if($(this).data('type')==="Recommendation"){
                var grp = $(this).data("grp");
                var pagetrackervar = $(this).data("pagetrackervar");
                sx_track('USA-FEAT-step2a', 'upsell-click', grp+'-'+pagetrackervar);sx_res_submit('offer_request_config',{'sx-js-res-offerselect-handle':handle, 'sx-js-res-offerselect-type':offer_type}, true);
            } else {
                sx_res_submit('offer_request_config',{"sx-js-res-offerselect-handle":handle, "sx-js-res-offerselect-type":offer_type}, true);
            }
        }
    }

    var sx_offerselect_fastlane =  {

        config: {
            sel: {
                fastlane:       '#sx-js-offerselect-fastlane-wrapper',
                butt_fastlane:  '#sx-js-offerselect-fastlane-button',
                butt_ooh:       '#sx-js-offerselect-ooh-button',
                butt:           '#sx-js-offerselect-fastlane-button',
                overlay:        '#sx-res-offerlist-overlay',
            },
            action: 'use_fastlane'
        },

        init: function() {
            var fastlane =  $(this.config.sel.fastlane).length || false;
            if(!fastlane) {
                return;
            }
            this.init_overlay();
            this.init_button();
        },

        init_overlay: function() {
            $(this.config.sel.overlay).css('display', 'block');
        },

        hide_fastlane: function() {
            $(this.config.sel.overlay).css('display', 'none');
            $(this.config.sel.fastlane).css('display', 'none');
            // ignore fastlane after hiding it
            sx_offerselect_booking.remove_fastlane()
        },

        init_button: function() {
            $(this.config.sel.butt_fastlane).bind('click', $.proxy(this.handle_button, this, {butt:'fastlane'}));
            $(this.config.sel.butt_ooh).bind('click', $.proxy(this.handle_button, this, {butt:'ooh'}));
        },

        handle_button: function(data, e) {

            if(data.butt === "ooh") {
                this.hide_fastlane();
            } else {
                var url     =  sx_create_ajax_url(this.config.action);
                var params  =  {
                    'tab_identifier': $("#sx-tab-identifier").val(),
                    'use_fastlane': 1
                };
            }

            var obj =  this;
            $.getJSON(url, params, function(response) {
                if(response.err.length) {
                    try {
                        console.info(response.err);
                    } catch(err) {}
                } else {
                    obj.hide_fastlane();
                }
            });
        }
    };

    /**
     *
     */
    var currencySelector = (function() {
        var $currency_choose_list = null;
        var $currency_choose_button = null;
        var $currency_choose_list_items = null;
        var $currency_modal = null;
        var $currenct_modal_btn = null;

        var css_down = "sx-icon-arrow_down_1";
        var css_up = "sx-icon-arrow_up_1";

        var init = function() {
            $currency_modal = $('.currency__modal__form__container');
            $currenct_modal_btn = $('.currency__modal__button__img');
            $currency_choose_list = $('.currency__modal__form__dropdown__list');
            $currency_choose_list_items = $('.currency__modal__form__dropdown__list li');
            $currency_choose_button = $('.currency__modal__form__dropdown__button');

            $currency_choose_button.on('click', function(e){
                toggleCurrencyList(e);
            });

            $currency_choose_list_items.on('click', $.debounce(100, function(e){
                selectCurrency($(this));
                toggleCurrencyList(e);
            }));

            $currency_choose_button.css('display','block');

            $('.currency__modal__button').on('click', toggleCurrencyModal);
            $('.currency__modal__form__close').on('click', toggleCurrencyModal);


            $currency_choose_button.find('.currency__modal__form__dropwodnw__button__icon').addClass(css_down);
        };

        var hideCurrencyList = function() {
            $currency_choose_list.hide();
            $currency_choose_button.removeClass('gc-activated');
            $(document).off('click', hideCurrencyList);
        };

        var toggleCurrencyList = function(e){
            e.stopPropagation();
            e.preventDefault();
            $currency_choose_list.slideToggle();
            $currency_choose_button.toggleClass('gc-activated');

            var $dropdown_button = $('.currency__modal__form__dropdown__button').find('.currency__modal__form__dropwodnw__button__icon');
            if ($dropdown_button.hasClass(css_down)) {
                $dropdown_button.removeClass(css_down);
                $dropdown_button.addClass("sx-icon-arrow_up_1");
            }
            else {
                $dropdown_button.removeClass("sx-icon-arrow_up_1");
                $dropdown_button.addClass(css_down);
            }
        };

        var selectCurrency = function($currency_list_item) {
            var currency = $currency_list_item.text();
            var css_down = "sx-icon-arrow_down_1";
            var css_up = "sx-icon-arrow_up_1";

            $('.currency__modal__form__dropdown__button__text').text(currency);

            $currency_choose_list_items.each( function(index, item) {
                $(item).removeClass('currency__modal__dropdown__li--selected');
            });
            $currency_list_item.addClass('currency__modal__dropdown__li--selected');


            var $dropdown_button = $('.currency__modal__form__dropdown__button').find('.currency__modal__form__dropwodnw__button__icon');
            if ($dropdown_button.hasClass(css_down)) {
                $dropdown_button.removeClass(css_down);
                $dropdown_button.addClass(css_up);
            }
        };

        var toggleCurrencyModal = function(e) {
            $currency_modal.toggle();
            if ($currenct_modal_btn.hasClass("sx-icon-arrow_down_1")) {
                $currenct_modal_btn.removeClass("sx-icon-arrow_down_1");
                $currenct_modal_btn.addClass("sx-icon-arrow_up_1");
                $('.currency__modal').css('z-index', '0');
                $('.currency__modal').css('display', 'none')
            }
            else {
                $currenct_modal_btn.removeClass("sx-icon-arrow_up_1");
                $currenct_modal_btn.addClass("sx-icon-arrow_down_1");
                $('.currency__modal').css('z-index', '35000');
                $('.currency__modal').css('display', 'block')
            }
        };

        return {
            init: init
        };
    })();


//SLP-103
    /**
     * This filter is used to prevent the user from renting
     * offers according to the minimum age.
     * @author Niclas Geiger
     */
    var minimumAgeFilter = (function() {
        var $filter_list;
        var $filter_button;
        var $filter_items;

        var init = function() {
            $filter_list = $('.sx-js-fake-select-list');
            $filter_button = $('.sx-res-filter-age');
            $filter_items = $('.sx-js-fake-select-list li')
            $filter_button.on('click', function(e){
                toggleFilterList(e);
            });

            $filter_items.on('click', $.debounce(100, function(){
                selectFilter($(this));
            }));

            if($(window).width() < 800){
                $('.sx-js-age-filter-data').text("-");
            }
            $('.sx-res-filter-age').css('display','block');
            if(typeof get_cookie !== "undefined") {
                var min_age = get_cookie("sx_res_min_age");
                if(min_age != null){
                    $.each($filter_items, function(index, filter_item){
                       if($(filter_item).data("age")==min_age){
                           selectFilter($(filter_item));
                       }
                    });
                }
            }
        };
        /**
         * Hide the Filter dropdown
         */
        var hideFilterList = function() {
            $filter_list.hide();
            $filter_button.removeClass('gc-activated');
            $(document).off('click', hideFilterList);
        };
        /**
         * Toggle Callback for the Filter List Dropdown
         * @param e
         */
        var toggleFilterList = function(e){
            e.stopPropagation();
            e.preventDefault();
            $filter_list.slideToggle();
            $filter_button.toggleClass('gc-activated');
            if($filter_list.css('display')!='none'){
                $(document).on('click', hideFilterList);
            }
        };
        /**
         * Filter Click Callback
         */
        var selectFilter = function($filter_item) {
            var age = $filter_item.data("age");
            var age_text = $filter_item.text();

            $('.sx-js-age-filter-data').text(age_text);
            if(typeof set_cookie !== "undefined") {
                set_cookie("sx_res_min_age",age,0,0,30);
            }
            $filter_items.removeClass('gc-selected');
            $filter_item.addClass('gc-selected');

            sortOffers(age);
        };
        /**
         * display either the "minimum age too low" message if tile age < age or just displays the offer if tile age >= age
         * the offers are sorted for special first and then all other offers
         * @param age
         */
        var sortOffers = function(age){
            //sort the items by availability for both special offers and normal offerselect lists
            $.each(["#sx-res-offerselect-special","#sx-res-offerselect-all"],function(j, parent) {
                var available = [];
                var restricted = [];
                $(parent+' .offerselect-tile').each(function (index, value) {
                    var tile = $(this);
                    var right = tile.find('.right');
                    var center = tile.find('.center');
                    var age_hint = tile.find('.age-hint');
                    var tile_age = tile.data("min_age");
                    if (age < tile_age) {
                        right.hide();
                        center.hide();
                        age_hint.addClass('display-hint');
                        tile.addClass('sx-res-age-filtered');
                        tile.data('age_restricted', true);
                        restricted.push($(this).detach());
                    }
                    else {
                        right.show();
                        center.show();
                        age_hint.removeClass('display-hint');
                        tile.removeClass('sx-res-age-filtered');
                        tile.data('age_restricted', false);
                        available.push($(this).detach());
                    }
                });
                var container = $(parent);
                $.each(available, function (index, element) {
                    container.append(element);
                });
                $.each(restricted, function (index, element) {
                    container.append(element);
                });
            });
        }

        return {
            init: init
        };
    })();
    /**
     * Converts the offerselect filter buttons (currently implemented
     * as fakecheckbox) into vertical list on mobile (<800).
     * It collapses on click.
     */
    var collapsibleOfferfilter = (function() {

        $offerselectFilterList = $('.offerselect__filter');

        var init = function() {
            // responsiv view only
            if (!$offerselectFilterList.length) {
                return false;
            }
            var $offerselectFilterListitems = $offerselectFilterList.find('ul li');
            // debouncing here due to the second 'triggered click' from the fakecheckbox of typo3-corporate.js
            $offerselectFilterListitems.on('click', $.debounce( 100, handleFilterClick ));
        };

        var handleFilterClick = function() {
            updateFilterHeadline();
            $offerselectFilterList.toggleClass('is--closed');
        };

        // update found headline after filterupdate
        var updateFilterHeadline = function() {

            var filterHeadline = $('.offerselect__headline').text(),
                currentlyShownItems = $('.offerselect-tile:visible').length;

            $('.offerselect__headline').text(filterHeadline.replace(/[0-9]{1,2}/, currentlyShownItems));
        };

        return {
            init: init
        };
    })();

    /**
     * init preselected offerselect filter
     * @author  jw
     * @return  {boolean}
     */
    var sx_preselect_offer_filter =  function() {
        // filter stuff
        var selected_filter =  window.sx_selected_filter || false;
        if(!selected_filter) {
            return false;
        }

        var i,
            item,
            filter  =  selected_filter.split(",");

        for(i = 0; item =  filter[i]; i++) {
            // classic filter
            if( $("#sx-res-offercats-" + item).prop('tagName') == "INPUT" ) {

                $("#sx-res-offercats-" + item).attr('checked', true);
                // checkbox click method
                sx_res_cat_filter(0);

            // relaunch
            } else {

                // set hidden checkbox checked and add fake checkbox selected class
                $("#sx-res-offercats-" + item).addClass('sx-gc-selected').find('input[type=checkbox]').attr('checked', true);
                // set container class to open container
                $('.t3-js-toggle-wrapper').addClass('t3-selected');
                // checkbox-click callback method to start filter process
                SIXT.sx.fakecheckbox.filter(item, true);
            }
        }
        return true;
    };

    /**
     * ctrl waitlist option
     * SEE ALSO request_alt_stations for historical reasons!
     * @author     jw
     */
    var sx_waitlist =  (function() {

        var config = {
            url:        '/php/reservation/set_waitlist_entry',
            butt:       'sx-js-res-button-waitlist',
            box:        'sx-js-res-waitlist',
            sender:     'sx-js-res-button-waitlist-send',
            error:      'sx-js-res-waitlist-error',
            message:    'sx-js-res-waitlist-message',
            altciturl:  'offer.req_alt_cits',
            altcitdiv:  'sx-js-altcit-wrapper',
            altcitform: 'sx-js-alt-cit-keep-rci',
            formwrap:   'sx-js-res-waitlist-form-wrapper',
            resurl:     (self.location.protocol + '\/\/' + self.location.host + '/php/reservation'),
            grp: false
        };

        /**
         * initialize if waitlist available
         * set button event-handler and init box
         * @author  jw
         * @return  void
         */
        var init =  function() {

            var $butt   =  $('.' + config.butt),
                obj     =  this;

            if(!$butt.length) {
                return;
            }

            $('#' + config.box).box({
                'txttitle': _sx_res_txt('waitlist')
            });

            $('#' + config.sender).click(function() {
                obj.send();
            });

            $butt.click(function(e) {
                e.stopPropagation();
                obj.add( $(this).data('group') );
            });
        };

        /**
         * set selected grp ad get alt_cits via ajax
         * create alt_cits list and open box
         *
         * @author  jw
         * @param   {string} crs
         * @return  void
         */
        var add =  function(group) {

            // we wait we'll see....
            $.box.jwait();

            config.grp      =  group;
            var url         =  sx_create_ajax_url(config.altciturl);
            var params      = {
                'req_grp':        group,
                'tab_identifier': $("#sx-tab-identifier").val(),
                'is_waitlist_req': 1
            };

            $.getJSON(url, params, function(response) {

                if (response.err.length > 0) {
                    var html =  '<div class="sx-gc-error"><p>' + response.err[0]['txt'] + '<\/p><\/div>';
                    $('#' + config.altcitdiv).html(html);
                    $('#' + config.altcitform).css('display', 'none');
                } else {
                    var cit,
                        cnt =  0,
                        ul  =  $('<ul></ul>').appendTo( $('#' + config.altcitdiv).html('') );

                    for(cit in response.rec.cits_info) {
                        ul.append( alt_cit_html(response.rec.cits_info[cit]) );
                        cnt += 1;
                    }

                    // dpl checkbox
                    $('#' + config.altcitform).css('display', '');
                    // sitecatalyst
                    strack('altcit', [group, cnt]);
                }

                // for special error codes hide waitlist form
                var dpl = (typeof response.rec.hide_waitlist !== "undefined" && response.rec.hide_waitlist === '1')? 'none' : 'block';
                $('#' + config.formwrap).css('display', dpl);

                // open anyway
                $.box.open(config.box);
            });
        };

        /**
         * modify param rci in links to alternativ cits
         * @author: mw/jw
         * @arams: checkbox
         */
        var keep =  function(el) {

            // checked?
            var keep =  $(el).is(":checked");
            $('#' + config.altcitdiv + ' a').each(function() {

                // replace current rci param
                // get alt cit from param uci
                //
                this.href   =  this.href.replace(/\&rci=(.+?)(\&|$)/, "\$2");
                var uci     =  /\&uci=(.+?)(\&|$)/.exec(this.href);

                // something is wrong
                if(!uci) {
                    return;
                }
                // create new url depending on checked
                if(keep) {
                    rci =  $("#sx-js-res-return-cit").val();
                } else {
                    rci =  uci[1];
                }
                this.href +=  "&rci=" + rci;
            });
        };

        /**
         * create li element (jquery object)
         *
         * @author  jw
         * @param   {object} item data
         * @return  {object} jquery li element
         */
        var alt_cit_html =  function(item) {
            // get link and create tracking data
            var redirect    =  config.resurl;
            var ga_data     =  [
                $("#sx-js-res-liso-snamwww2").val(),
                'alternativstation-step2a',
                'branch-' + item.LISO + '-' + item.SNAM
            ]
            // create li
            var li  =  $('<li></li>').data('tracking', ga_data).bind('click', function() {
                // add ga tracking on click
                if(typeof sx_track === "undefined") {
                    return;
                }
                var ga =  $(this).data('tracking');
                sx_track(ga[0], ga[1], ga[2]);
            });
            // create link
            var a   =  $('<a></a>').attr('href', redirect + item.REDIRECT_LINK).addClass('sx-gc-active').html('<strong>' + item.SNAM + '<\/strong> <span>' + item.STR + ', ' + item.PLZ + ' ' + item.ORT + '<\/span>');
            a.appendTo(li);
            return li;
        };

        // sstecatalyst - pass input-clicks to sitecatalyst method
        var strack = function(method, val) {
            if(typeof sitecatalyst === "undefined" || typeof sitecatalyst[method] === "undefined") {
                return;
            }
            sitecatalyst[method](val);
        };

        /**
         * send user entry and display response
         * @author  jw
         * @return  void
         */
        var send =  function() {

            $('.' + config.error).css('display', 'none');
            $('.' + config.message).css('display', 'none');

            var data = $('form', '#' + config.box).serializeArray(),
                params =  {},
                run,
                i,
                item;

            for(i = 0; item = data[i]; i += 1) {
                params[item['name']] =  item['value'];
            }
            params['grp'] =   config.grp;

            $.getJSON(config.url, params, function(response) {

                if (response.err.length) {
                    $('.' + config.error).html('<p>'+ response.err[0]['txt'] +'<\/p>').css('display', '');
                } else {
                    $('.' + config.message).html('<p>'+ _sx_res_txt('waitlist_success') +'<\/p>').css('display', '');
                    run =  setTimeout(function(){
                        $.box.close();
                    }, 2000);
                }
            });
        };

        // publish methods
        return {
            init:init,
            add:add,
            send:send,
            keep: keep
        }
    })();


    var sx_get_shortage =  (function() {

        var config = {
            url: '/php/reservation/get_shortage_data',
            pref: 'sx-shortage-',
            tid: 'sx-tab-identifier',
            formid: 'sx-shortage-form'
        };

        var data =  false;

        var init =  function() {

            // nothing to do
            if(typeof sx_exec_shortage === "undefined" || !sx_exec_shortage) {
                return false;
            }

            var params =  {
                'tab_identifier': ( $('#' + config.tid).val() || false )
            };

            $.getJSON(config.url, params, function(response) {

                if (!response.err.length) {
                    set(response.rec);
                }
            });

        };

        var set =  function(rec) {
            data =  rec;
            return true;
        };

        var get =  function() {
            return data;
        };

        var entry =  function() {

            if(!data) {
                return false;
            }

            // reset form if already avail
            $("#" + config.formid).remove();

            var i, eid, $inp;
            var $form   =  $("<form></form>").appendTo( $("body") ).attr('id', config.formid);

            for(i in data) {
                eid     =  config.pref + i.replace("_", "-");
                $inp    =  $("<input type=\"hidden\"\/>").appendTo( $form ).attr("id", eid).attr("name", i).val( data[i] );
            }
            return true;
        };

        return {
            init:init,
            get:get,
            entry:entry
        }
    })();

    /**
     * init offerselect for mobile version
     * @author: rp
     * @params:
     */
    function sx_init_offerselect_mobile() {
        $("#sx-res-catlist").click(function(e){
            sx_res_dpl_catlist_mobile(e);
        });

        // currencies
        $("#sx-js-res-change-wakz").box({
            'txttitle': _sx_res_txt('currencyselect'),
            'width': '440px',
            'height': '230px'
        });

        // filter stuff
        if(typeof sx_selected_filter === "undefined" || !sx_selected_filter) {
            return;
        }

        var i, item, filter =  sx_selected_filter.split(",");
        for(i = 0; item =  filter[i]; i++) {
            $("#sx-res-offercats-" + item).attr('checked', true);
        }
        sx_res_cat_filter(0);
    }

    /**
     * offerselect booking
     * @author: jw
     */
    var sx_offerselect_booking =  {
        // store previous values of location
        store_pu:  false,
        store_ret: false,
        // store previous values of date and time
        store: [
            {
                type: 'input',
                sel:  'pu-date',
                val:  false
            },
            {
                type: 'input',
                sel:  'ret-date',
                val:  false
            },
            {
                type: 'select',
                sel:  'pu-time',
                val:  false
            },
            {
                type: 'select',
                sel:  'ret-time',
                val:  false
            }
        ],
        datetime_pref: '#sx-js-res-',
        config: {
            elm: {
                main:       '#sx-offerselect-reservation-wrapper',
                modify:     '#sx-js-booking-modify',
                wrapper:    '#sx-js-res-booking-data-wrapper',
                booking:    '#sx-js-res-booking-button',
                overlay:    '#sx-res-offerlist-overlay',
                close:      '#sx-js-res-booking-data-close',

                fastlane:   '#sx-js-offerselect-fastlane-wrapper'
            },
            class_act:      'sx-offerselect-res-active',

            fastlane:       false
        },
        google_url: false,

        /**
         * init offerselect events
         * @author  joachim.wendenburg@sixt.com
         * @return  {void}
         */
        init: function() {

            // add callback param to allow asynchrone loading
            this.google_url =  window.sx_google_api_url + "&callback=sx_initialize_googleload" || false;
            if(!this.google_url) {
                try{
                    console.info("Google Url is missing!")
                } catch(err){}
                return false;
            }

            var item,
                ch_activate,
                ch_restore,
                i,
                dt,
                obj =  this;

            this.store_pu   =  window.sx_pickup_json || false;
            this.store_ret  =  window.sx_return_json || false;
            this.fastlane   =  $(this.config.elm.fastlane).length || false;

            // USA-1058 now restore selected index and values
            for(i=0;dt=this.store[i]; i+=1) {
                if(dt.type === 'select') {
                    dt.val =  $(this.datetime_pref + dt.sel + ' option:selected').index();
                } else {
                    dt.val =  $(this.datetime_pref + dt.sel).val();
                }
            }

            // create jquery shortcuts
            for(item in this.config.elm) {
                this.config.elm[item] =  $(this.config.elm[item]).length? $(this.config.elm[item]) : false;
            }

            if(this.config.elm.modify) {
                this.config.elm.modify.bind('click', $.proxy(this.handleclick, this));
            }
            if(this.config.elm.close) {
                this.config.elm.close.bind('click', $.proxy(this.handleclick, this));
            }
            if (this.config.elm.overlay) {
                this.config.elm.overlay.bind('click', $.proxy(this.handleclick, this));
            }

            // handle sticky changes
            var ibe_wrapper      = $('#sx-offerselect-reservation-wrapper');
            var ibe_headline       = $('.offerselect__headline');

            var $that = this;
            $(window).scroll(function(e){
                if ($(window).scrollTop() > 180) {
                    $(ibe_wrapper).addClass("sx-offerselect-res-sticky");
                    $(ibe_headline).addClass('offerselect__headline--big');
                }
                else {
                    $(ibe_wrapper).removeClass("sx-offerselect-res-sticky");
                    $(ibe_headline).removeClass('offerselect__headline--big');
                }
            });
        },

        handleclick: function() {
            var dpl =  this.config.elm.main.hasClass(this.config.class_act)? true : false;
            if(dpl) {
                this.restore_booking();
            } else {
                this.activate_booking();
            }
        },

        /**
         * activate ibe
         * self-overwriting method to init google-api loading only once
         * toggle ibe and overlay's display
         * @author  joachim.wendenburg@sixt.com
         * @return  {void}
         */
        activate_booking: function() {

            this.activate_booking =  function() {
                if(this.config.elm.wrapper) {
                    this.config.elm.wrapper.css('display', 'block');
                }
                if(this.config.elm.wrapper) {
                    this.config.elm.overlay.css('display', 'block');
                }
                if(this.config.elm.main) {
                    this.config.elm.main.addClass(this.config.class_act);
                }
                // hide fastlane select box if available
                if(this.fastlane) {
                    $(this.config.elm.fastlane).css('display', 'none');
                }
            }

            var obj =  this;
            this.load(this.google_url);
        },

        /**
         * restore present booking data
         * toggle ibe and overlay's display
         * @author  joachim.wendenburg@sixt.com
         * @return  {void}
         */
        restore_booking: function() {

            // restore fastlane select box if available
            if(this.fastlane) {
                $(this.config.elm.fastlane).css('display', 'block');
            } else {
                this.config.elm.overlay.css('display', 'none');
            }

            this.config.elm.wrapper.css('display', 'none');


            // restore station
            sx_pickup_json  =  this.store_pu;
            sx_return_json  =  this.store_ret;
            sx_station_suggest.preset();

            // USA-1058 now store selected index and values
            var i, dt;
            for(i=0;dt=this.store[i]; i+=1) {
                if(dt.type === 'select') {
                    $(this.datetime_pref + dt.sel + ' option').eq(dt.val).attr('selected', 'selected');
                } else {
                    $(this.datetime_pref + dt.sel).val(dt.val);
                }
            }

            // hide/reset error
            $("#sx-js-res-error").css('display', 'none').html('');

            if(this.config.elm.main) {
                this.config.elm.main.removeClass(this.config.class_act);
            }
        },

        /**
         * callback after google-api was loaded
         * @author  joachim.wendenburg@sixt.com
         * @return  {void}
         */
        init_ibe: function() {
            sx_station_suggest.init();
            this.activate_booking();

            // init date and time only the first time
            sx_init_booking_time();
            sx_res_datepicker.init_ibe_horizontal();
        },

        /**
         * load script and exec callback when done
         * @author  joachim.wendenburg@sixt.com
         * @return  {void}
         */
        load: function(url) {

            var b,
                s
                obj =  this;

            // create dom element script
            s       =  document.createElement('script');
            s.type  =  'text/javascript';
            s.src   =  url;

            // append to dom
            document.getElementsByTagName('head')[0].appendChild(s);
        },

        /**
         * remove fastlane after decison was made in sx_offerselect_fastlane
         * @author  joachim.wendenburg@sixt.com
         * @return  {void}
         */
        remove_fastlane: function() {
            this.fastlane =  false;
        }
    };

    /**
     * dynamic loading of google maps needs a callback
     * @author: jw
     */
    function sx_initialize_googleload() {
        sx_offerselect_booking.init_ibe();
    }

    /**
     * synchronize div's display with select's display
     * wo my god - what an event-chaos
     * @author: jw
     */
    var sx_sync_info_with_select =  {

        is_open: {},
        items: [],
        initialized: false,
        current: false,

        /**
         * init
         * use mouseup cause it's fired with a click
         * even when click does not fire ;-)
         * @author: jw
         * @param: string select id (div's id must be the same with an "-info" suffix)
         */
        init: function() {

            var obj             =  this;
            this.initialized    =  true;

            $(document).mouseup(function(e){
                obj.check(e)
            });

            $(document).keyup(function(e){
                if(e.which !== 13) {
                    return true;
                }
                if( obj.current ) {
                    obj.hide( obj.current );
                }
            });

            if(window.addEventListener) {
                window.addEventListener("touchend", function(e) {
                    if( obj.current ) {
                        obj.hide( obj.current );
                    }
                });
            }
        },

        add: function(id) {
            var obj =  this;
            if(!this.initialized) {
                this.init();
            }
            $('#' +id).bind('focus',function(){
                obj.hide( obj.current );
            });

            if(window.addEventListener) {
                document.getElementById(id).addEventListener("change", function(e) {
                    obj.hide( obj.current );
                });
            }

            this.items.push( id );
        },

        /**
         * check if select is focussed at all
         * init display or hide
         * @author: jw
         * @param: string select id (div's id must be the same with an "-info" suffix)
         */
        check: function(e) {

            var
                i,
                item
                match   =  false,
                target  =  e.target;

            for(i = 0; item =  this.items[i]; i+=1) {
                var el =  document.getElementById(item);
                if(this.isinside( el, target )) {
                    match =  item;
                }
            }

            if( this.current && this.current !== match ) {
                this.hide( this.current );
            }

            if(match) {
                this.ctrl(match);
            }
        },

        ctrl: function(id) {

            if(this.is_open[id]) {
                this.hide(id);
            } else {
                this.dpl(id);
            }
        },

        dpl: function(id) {
            $("#" + id + "-info").css("display", "");
            this.is_open[id] =  true;
            this.current     =  id;
        },
        hide: function(id) {
            $("#" + id+ "-info").css("display", "none");
            this.is_open[id] =  false;
            this.current     =  false;
        },
        isinside: function (container, containee) {
            if (typeof container === "undefined") return false;
            if (window.Node && Node.prototype && !Node.prototype.contains) {
                Node.prototype.contains = function (arg) {
                    return !!(this.compareDocumentPosition(arg) & 16);
                };
            }
            return container.contains(containee);
        }
    };

    /**
     * hide/show classes depending on checkboxes checked
     *
     * ATTENTION!
     * Relaunch filtering is done by fake-checkbox
     * callback in typ3-corporate.js
     *
     * @author: jw
     * @params: all or filter (1 or 0)
     */
    function sx_res_cat_filter(mod) {
        var c, v, i, j, item;
        var f   =  {};
        var _f  =  [];
        var _fs =  [];

        // loop all categories and find items checked
        $("#sx-res-catlist .sx-res-offercats").each(function() {
            c       =  !!(this.checked);
            v       =  this.value;
            f[v]    =  c;

            if(c) {
                _f.push(v);
            }
        });

        if(mod || !_f.length) {
            $("#sx-res-offercats-all").attr('checked', true);
            $("#sx-res-catlist .sx-res-offercats").attr('checked', false);
            $("#sx-res-catlist p").html(sx_res_txt["all_pkw_grp"]);
            $(".sx-res-offerlist-wrapper li").css('display', '');
            $("#sx-js-res-filter").val("");
            //$("#sx-js-res-selected-filter").hide();
        } else {
            $("#sx-res-offercats-all").attr('checked', false);
            $("#sx-res-catlist p").html(sx_res_txt["sel_pkw_grp"]);
            for ( i in f) {
                if( f[i] ) {
                    $(".sx-res-offerlist-wrapper .sx-res-offerlist-cat-" + i).css('display', '');
                } else {
                    $(".sx-res-offerlist-wrapper .sx-res-offerlist-cat-" + i).css('display', 'none');
                }
            }
            $("#sx-js-res-filter").val(_f.join(","));

            /*
            // not in use
            for(j = 0; item = _f[j]; j++) {
                _fs.push(_sx_res_txt(item));
            }
            $("#sx-js-res-selected-filter").show().find("p:first").html(_fs.join(", "));
            */
        }

        $("#sx-res-offerlist").addClass("sx-fade-out");
        setTimeout(function(){
            $("#sx-res-offerlist").removeClass("sx-fade-out");
        }, 1000);
    }

    /**
     * display or hide filter selection
     * @author: jw
     * @params: jquery-event
     */
    function sx_res_dpl_catlist(e) {

        switch(e.type) {
            case "mouseout":
                // check if element moved to is child node of catlist container
                // do nothing if so, hide only if mouseout catlist container
                //
                var el  =  e.toElement || e.relatedTarget;
                if(_contains( $("#sx-res-catlist").get(0), el )) {
                    return;
                }
                $("#sx-res-catlist ul").slideUp();
                break;
            default:
                // check if target element is filter header
                // check if visible or not
                // toggle display
                //
                var p   =  $("#sx-js-res-offerfilter-hd").get(0);
                var el  =  e.target;
                var dpl =  $("#sx-res-catlist ul").is(":visible")? true : false;
                if(el == p) {
                    if(dpl) {
                        $("#sx-res-catlist ul").slideUp();
                    } else {
                        $("#sx-res-catlist ul").slideDown();
                    }
                }
        }
    }

    /**
     * display or hide filter selection for mobile version (no mouseout)
     * @author: rp
     * @params: jquery-event
     */
    function sx_res_dpl_catlist_mobile(e) {

        // check if target element is filter header
        // check if visible or not
        // toggle display
        //
        var p   =  $("#sx-js-res-offerfilter-hd").get(0);
        var el  =  e.target;
        var dpl =  $("#sx-res-catlist ul").is(":visible")? true : false;
        if(el == p) {
            if(dpl) {
                $("#sx-res-catlist ul").slideUp();
            } else {
                $("#sx-res-catlist ul").slideDown();
            }
        }
    }

    /**
     * jquery.box with alternativ cits (alt_cit) for soldout_groups
     * SEE ALSO sx_waitlist for historical reasons!
     * @author: mw/jw
     * @arams: string car-group
     */
    function request_alt_stations(grp) {
        var url        =  sx_create_ajax_url("offer.req_alt_cits");
        var redirect   =  self.location.protocol + "\/\/" + self.location.host + "/php/reservation";

        // sstecatalyst - pass input-clicks to sitecatalyst method
        var strack = function(method, val) {
            if(typeof sitecatalyst === "undefined" || typeof sitecatalyst[method] === "undefined") {
                return;
            }
            sitecatalyst[method](val);
        };

        var params = {
            'req_grp':        grp,
            'tab_identifier': $("#sx-tab-identifier").val()
        };

        $.box.jwait();
        $.getJSON(url, params, function(response) {
            if (response.err.length > 0) {
                $.box.jalert(response.err[0]['txt'], "OK" );
                return;
            } else {
                var cit,
                    item,
                    cnt     =  0;
                    html    =  "<ul>";

                for(cit in response.rec.cits_info) {

                    item =  response.rec.cits_info[cit];
                    // create html fo each nearby station
                    // add tracking event
                    //
                    // html += "<li><a onclick=\"sx_track('" + item.LISO + "-" + item.SNAM + "','alternativstation-step1');\" class=\"sx-gc-active\" href=\"" + redirect + item.REDIRECT_LINK + "\">";
                    html += "<li onclick=\"sx_track('" + $("#sx-js-res-liso-snamwww").val() + "', 'alternativstation-step2a', 'branch-" + item.LISO + "-" + item.SNAM + "')\">";
                    html += "<a class=\"sx-gc-active\" href=\"" + redirect + item.REDIRECT_LINK + "\">";
                    html += "<strong>" + item.SNAM + "<\/strong>";
                    html += "<span>" + item.STR + ", " + item.PLZ + " " + item.ORT + "<\/span>";
                    html += "<\/a><\/li>";

                    cnt  += 1;
                }
                html += "<\/ul>";

                $('#sx-js-res-altcit div').html(html);

                var modify_alt_station = true;
                var uci_value = $('#sx-js-res-return-cit').val();
                var rci_value = $('#sx-js-res-pickup-cit').val();
                if (uci_value == rci_value) {
                    modify_alt_station = false;
                }

                var modify_alt_station_checkbox = $('#sx-js-res-altcit [type=checkbox]');
                if (modify_alt_station_checkbox) {
                    modify_alt_station_checkbox.prop('checked', modify_alt_station);
                    sx_modify_alt_station_link(modify_alt_station_checkbox);
                }

                $.box.open('sx-js-res-altcit');

                // sitecatalyst
                strack('altcit', [grp, cnt]);
            }
        });
    }

    /**
     * modify param rci in links to alternativ cits
     * @author: mw/jw
     * @arams: checkbox
     */
    function sx_modify_alt_station_link(el) {

        // checked?
        var keep =  $(el).is(":checked");
        $('#sx-js-res-altcit div ul a').each(function() {

            // replace current rci param
            // get alt cit from param uci
            //
            this.href   =  this.href.replace(/\&rci=(.+?)(\&|$)/, "\$2");
            var uci     =  /\&uci=(.+?)(\&|$)/.exec(this.href);
            // something is wrong
            if(!uci) {
                return;
            }
            // create new url depending on checked
            if(keep) {
                rci =  $("#sx-js-res-return-cit").val();
            } else {
                // remove fake checkbox selected class if called external
                $(el).parent().removeClass('sx-gc-selected');
                rci =  uci[1];
            }
            this.href +=  "&rci=" + rci;
        });
    }

    /**
     * display upsel surprise offer info
     * @author: jw
     */
    function sx_display_surprise_info(e) {
        // we have to cancel parent's onclick behaviour
        cancle_bubble(e);
        $.box.open("sx-js-res-surprise-info");
    }

    /**
     * init jquery.box divs...
     * @author: jw
     */
    function sx_init_offerconfig_info() {
        $("#sx-res-info-u1-u2").box({
            'width': '450px',
            'height': '410px'
        });
    }

    function sx_init_tell_a_friend() {
        $("#sx-js-res-tell-a-friend").box({
            'txttitle': _sx_res_txt('tell_a_friend'),
            'width': '480px',
            'height': '400px'
        });
    }

    /**
     * chco...
     * deal with checkboxes and radios to configure car-extras
     * @author: jw
     */
    var sx_offerconfig =  {

        /**
         * set eventhandler for plus-minus spans
         * set eventhandler for inputs
         * @author: jw
         */
        init: function() {

            var obj =  this;

            if(typeof this.init_mobile === "function") {
                this.init_mobile();
            }

            // inputs... radios and checkboxes
            $(".sx-res-config-list input").click(function() {
                /////////////////////////////////////////////////////////////
                var ck  = !!($(this).attr('checked'));
                var cnt = ck ? 1 : 0;
                // var cl  = $(this).parent().parent().find("select");

                var el;
                // michi did this for RAC-5135 and RAC-6032
                if ($(this).is(":checked")) {
                    var code = $(this).val();
                    $("li.depending-on-" + code).show();
                    $("input.prereq-of-" + code).attr('checked', true); // RAC-6032
                    $("input.prereq-of-" + code).trigger('click');      // RAC-6032
                    $("input.prereq-of-" + code).attr('checked', true); // RAC-6032
                } else {
                    var code = $(this).val();
                    var base_insu_id = "sx-res-config-LD";
                    if ($("#" + base_insu_id).hasClass('ld-depending-on-' + code) && $("#" + base_insu_id).is(':checked')) {    // RAC-6032
                        $("#" + base_insu_id).attr('checked', false);                                                           // RAC-6032
                        sx_sync_ck_with_content(base_insu_id, false, true);                                                     // RAC-6032
                    }
                    $("li.depending-on-" + code).hide();
                    $("li.depending-on-" + code + ' input').removeAttr('checked');
                }
                /////////////////////////////////////////////////////////////
                // set start value for plus-minus, depending on checked or not
                // if(cl.length > 0) {
                //     el =  cl.eq(0);
                //     if(ck) {
                //         $(el).val(1);
                //     } else {
                //         $(el).val(0);
                //     }
                // }
                obj.update( $(this), cnt );
                obj.strack( $(this) );
            });


            // reinitial som strackings
            this.strack_reinit();

            // display how many more-extra-charges are selected
            this.create_more();

            // incremental sale
            if( $("#sx-res-secure-packages-wrapper").length ) {

                // loop all td's containing package values
                $("#sx-res-secure-packages-wrapper .sx-res-is-val").each(function(){

                    // first deal with selects within package
                    $("select", $(this)).click(function(e){
                        // cancel bubbling
                        var _e =  e.originalEvent;
                        cancle_bubble(_e);
                    }).change(function(){
                        obj.update( $(this).val(), 1 );
                    });

                    // create string like +classname+classname+classname+
                    // and check for match
                    //
                    var classname =  "+" + this.className.replace(/\s/g, "+") + "+";
                    if(classname.indexOf("+sx-res-is-base_package+") !== -1) {
                        this.p  =  "base";
                    } else if(classname.indexOf("+sx-res-is-comfort_package+") !== -1) {
                        this.p  =  "comfort";
                    } else if(classname.indexOf("+sx-res-is-optimal_package+") !== -1) {
                        this.p  =  "optimal";
                    }
                    // set click handler
                    $(this).click(function(){
                        obj.select_package(this);
                    }).mouseover(function(){
                        $("#sx-res-secure-packages-wrapper .sx-res-is-" + this.p + "_package").addClass('sx-res-is-hovered');
                    }).mouseout(function(){
                        $("#sx-res-secure-packages-wrapper .sx-res-is-" + this.p + "_package").removeClass('sx-res-is-hovered');
                    });
                });
            }
        },

        select_package: function(el) {

            // reset select
            $("#sx-res-secure-packages-wrapper .sx-res-is-selected select").attr('disabled', true);
            // set borders
            $("#sx-res-secure-packages-wrapper .sx-res-is-selected").removeClass('sx-res-is-selected');
            $("#sx-res-secure-packages-wrapper .sx-res-is-" + el.p + "_package").addClass('sx-res-is-selected');

            // set select
            $("#sx-res-secure-packages-wrapper .sx-res-is-selected select").attr('disabled', false);
            this.update( el.p, 1 )
        },

        /**
         * get updated html or values only via ajax
         * @author: jw
         */
        update: function(inp, cnt) {

            // hide until update is done
            $("#sx-js-res-offerconfig-price").css('visibility', 'hidden');
            $("#sx-js-res-offerconfig-price-brutto").css('visibility', 'hidden');
            $("#sx-js-res-offerconfig-price-vat").css('visibility', 'hidden');
            $("#sx-js-res-offerconfig-price-euro").css('visibility', 'hidden');
            $("#sx-js-res-offerconfig-price-without-premium-charge").css('visibility', 'hidden');
            $("#sx-js-res-offerconfig-price-premium-charge").css('visibility', 'hidden');

            // redesign 2014
            $("#sx-js-res-offerconfig-price-wrapper").addClass("sx-offerconfig-wait-for-up");

            this.create_more();
            var val, id     =  false;
            var reset_dep   =  false;
            var reset_D_dep   =  false;
            var obj         =  this;

            // special case icremental sale packages
            // pass values as string
            //
            if(typeof inp === "string") {
                val         =  inp;
            } else {
                // get value from checkbox
                val         =  $(inp).val();
                id          =  $(inp).attr('id');
                reset_dep   =  ($(inp).attr('id') === "sx-res-config-LD-reset") ? true : false;
                reset_D_dep   =  ($(inp).attr('id') === "sx-res-config-D-reset") ? true : false;
            }

            // incremental sale packages
            if(val === "base" || val === "comfort"|| val === "optimal" || val === "BE" || val === "BF") {
                $.box.jwait();
            }

            // flex or prepaid? update all data-html via ajax
            if(val === "flex" || val === "prpd") {
                $.box.jwait();
            }

            // sync content with LD-checkbox
            // insu instead LD means:
            // switch group cause LD is included but not an extra charge
            // update all data-html via ajax
            //
            if((val === "LD" || val === "V" || val === "insu") && !reset_dep) {
                $.box.jwait();
                if( id && $("#" + id).length ) {
                    sx_sync_ck_with_content(id, false, true);
                }
            }

            // special case plan
            // get plan_nr from id and pass as param cnt
            //
            if(val === "plan") {
                $.box.jwait();
                cnt =  id.substr(id.lastIndexOf("-") +1);
            }

            //reset count for reset D charge
            if(reset_D_dep){
                if(val!="D"){
                    cnt=0;
                }
            }

            var url     =  sx_calculate_url + "?_=" + new Date().getTime();
            var params  =  {
                'val':              val,
                'cnt':              cnt,
                'tab_identifier':   $("#sx-tab-identifier").val()
            };

            // depending radio to reset LD/insu only
            if(reset_dep) {
                params['reset'] =  1;
            }

            $.getJSON(url, params, function(response){
                $.box.close();
                obj.handle_response(response, val, cnt);

                // sytecatalyst if rate switch
                if(val === "flex" || val === "prpd") {
                    obj.strack_rate(val, response.rec);
                }
            });
        },
        /**
         * what to do with ajax response
         * either just update price, or update the complete right column
         * @author: jw
         * @params: object response
         */
        handle_response: function(response, val, cnt) {

            var obj     =  this;
            var error   =  [];
            var i, item;
            if (response.err.length > 0) {
                for(i = 0; item = response.err[i]; i++) {
                    error.push( item['txt'] );
                    // when offercache wasn't found we redirect to startpage
                    var redirect =  self.location.protocol + "\/\/" + self.location.host + "/php/reservation";
                    if (item['txt'] == "ERR_RESERVATION_CALCULATION_FAILED_NO_OFFERCACHE") {
                        self.location.href =  redirect;
                    }
                }
                //alert(error.join("\n"));
                return;
            }
            // error offer_handle
            else if(typeof response['rec']['offer_handle_error'] !== "undefined")  {
                self.location.href=self.location.protocol + "\/\/" + self.location.host + "/php/reservation/offerselect?tab_identifier=" + $("#sx-tab-identifier").val();
                return false;
            }
            // update complete right column and re-init, in case dpl debug infos
            else if(typeof response['htm']['txt'] !== "undefined") {
                $("#sx-js-res-offerconfig-data").html(response['htm']['txt']);
                obj.init();
                obj.reinit_SIXT();
                sx_show_debug_info();
            }
            // response is no complete html
            else {
                // update rebooking fee display only if no html-response...
                if(typeof response['rec']['rebooking_fee'] !== "undefined") {
                    if(response['rec']['rebooking_fee']) {
                        $("#sx-js-res-rebooking-wrapper").css("display","");
                        $("#sx-js-res-rebooking-wrapper .sx-res-config-cost:first").html( _sx_res_txt('wakz') +  " " + response['rec']['rebooking_fee'] );
                    } else {
                        $("#sx-js-res-rebooking-wrapper").css("display","none");
                    }
                }

                if (typeof response['rec']['completePriceWithoutPremiumCharge'] !== "undefined") {
                    $("#sx-js-res-offerconfig-price-without-premium-charge").html(_sx_res_txt('wakz') + " " + response['rec']['completePriceWithoutPremiumCharge']).css('visibility', 'visible');
                }
                if (typeof response['rec']['premiumCharge'] !== "undefined") {
                    $("#sx-js-res-offerconfig-price-premium-charge").html(_sx_res_txt('wakz') + " " + response['rec']['premiumCharge']).css('visibility', 'visible');
                }

                // update prices only and display span again
                if(typeof response['rec']['total_price'] !== "undefined") {
                    if (response['rec']['redemption'] != "MM") {
                        $("#sx-js-res-offerconfig-price").html(_sx_res_txt('wakz') + " " + response['rec']['total_price']).css('visibility', 'visible');
                    } else {
                        $("#sx-js-res-offerconfig-price").html( _sx_res_txt('wakz_miles') +  " " + response['rec']['total_price']).css('visibility', 'visible');
                    }
                    $("#sx-js-res-offerconfig-price-euro").html( _sx_res_txt('wakz_euro') +  " " + response['rec']['total_price_euro']).css('visibility', 'visible');

                    // redesign 2014
                    $("#sx-js-res-offerconfig-price-wrapper").removeClass("sx-offerconfig-wait-for-up");
                }

                if(typeof response['rec']['total_brutto'] !== "undefined") {
                    $("#sx-js-res-offerconfig-price-brutto").html( _sx_res_txt('wakz') +  " " + response['rec']['total_brutto']).css('visibility', 'visible');
                }
                if(typeof response['rec']['vat_amount'] !== "undefined" && response['rec']['pickupCityIsSpain']) {
                    $("#sx-js-res-offerconfig-price-vat").html( _sx_res_txt('wakz') +  " " + response['rec']['vat_amount']).css('visibility', 'visible');
                } else if (typeof response['rec']['vat_amount'] !== "undefined") {
                    $("#sx-js-res-offerconfig-price-vat").html( _sx_res_txt('wakz') +  " " + response['rec']['vat_amount']).css('visibility', 'visible');
                }

                // update incremental sale package price too
                if (typeof response['rec']['comfort_price'] !== "undefined" && response['rec']['comfort_price']) {
                    $("#sx-res-comfort_package-price").html( _sx_res_txt('wakz') +  " " + response['rec']['comfort_price']);
                }
                // update price of included charges (when they are shown separately, eg. MX & US)
                if (typeof response['rec']['incl_charge_prices'] !== "undefined" && response['rec']['incl_charge_prices']) {
                    $.each(response['rec']['incl_charge_prices'], function(index, value) {
                        $("#sx-res-sep-incl-charge-" + index).html(_sx_res_txt('wakz') +  " " + value);
                        // alert(index + ': ' + value);
                    });
                }
            }

            // update "Selbstbeteiligung" in case of charge D
            if(val === "D") {
                if (cnt == 1) {
                    $("#opt_insu_D").show();
                } else {
                    $("#opt_insu_D").hide();
                }
            }


            // update tellafriend too
            if(typeof response['rec']['tellafriend_msg'] !== "undefined" && response['rec']['tellafriend_msg']) {
                $("#sx-js-res-tellafriend-msg").html(response['rec']['tellafriend_msg']);
            }
            // update debug rate too
            if(typeof response['rec']['debug_update'] !== "undefined" && response['rec']['debug_update']) {
                $("#sx-js-res-debug-rate").html(response['rec']['debug_update']);
            }
            // update onlinehelp-message too
            if(typeof response['rec']['onlinehelp_msg'] !== "undefined" && response['rec']['onlinehelp_msg']) {
                $("#sx-js-res-onlinehelp-msg").val(response['rec']['onlinehelp_msg']);
            }

            // update promo label to current rate
            var offerPromoLabelValue = '';
            if ($("#sx_pricing_promo_label_rate_value").val() != '') {
                offerPromoLabelValue = " - " + $("#sx_pricing_promo_label_rate_value").val();
            }
            $("#sx_offer_pricing_promo_label").text(offerPromoLabelValue);
        },

        /**
         * display number of extras selected
         * @author  jw
         * @return  {string} note
         */
        create_more: function() {
            var more    =  $("#sx-js-res-offerconfig-more-wrapper input:checked").length;
            var morestr =  _sx_res_txt('extras_selected').replace("%s", more);
            $("#sx-js-res-offerconfig-count").html(morestr);
            return more;
        },

        /**
         * check config state in case of reload, back-button etc...
         * @author: jw
         * @params:
         */
        restore_state: function() {

            // moving forwards, no need to restore data loading page
            if( get_cookie('sx_reservation_tpl') === "offerselect"){
                return;
            }

            // seems that in this case cache-param does not have any effect, so add query
            var url     =  sx_calculate_url + "?_=" + new Date().getTime();
            var params  =  {
                'val':              "nochange",
                'cnt':              1,
                'tab_identifier':   $("#sx-tab-identifier").val(),
                'offer_handle':     $("#sx-offer-handle").val()
            };

            $.getJSON(url, params, function(response){
                sx_offerconfig.handle_response(response, "nochange", 1);
            });
        },

        send_data: function() {
            if(this.is_mobile) {
                return;
            }

            // no waiter in case of mobiles devices
            // cause mobiles will restore state when going back
            if(!sx_is_supported_mobile()) {
                $.box.jwait();
            }
        },

        // sstecatalyst - pass input-clicks to sitecatalyst method
        strack: function($el) {
            if(typeof sitecatalyst === "undefined" || typeof sitecatalyst['extras'] === "undefined") {
                return;
            }
            sitecatalyst['extras']($el);
        },
        // sstecatalyst - pass input-clicks to sitecatalyst method
        strack_rate: function(rate, rec) {
            if(typeof sitecatalyst === "undefined" || typeof sitecatalyst['offerconfig_rate'] === "undefined") {
                return;
            }
            sitecatalyst['offerconfig_rate'](rate, rec);
        },
        // if re-init reinit some sitecatalyst eventhandler too (new dom loaded)
        strack_reinit: function() {
            if(typeof sitecatalyst === "undefined" || typeof sitecatalyst['more'] === "undefined") {
                return;
            }
            sitecatalyst['more']();
        },
        // relauch rac 2014
        reinit_SIXT: function(){
            if(typeof SIXT !== "undefined" && typeof SIXT.sx !== "undefined" && typeof SIXT.t3 !== "undefined") {
                SIXT.sx.fakeradio.init();
                SIXT.sx.fakecheckbox.init();
                SIXT.t3.tooltip.init(true);
            }
        }
    };

    /**
     * init customerdetails
     * @author  jw
     */
    var sx_customerdetails =  {

        wm_login_run: false,

        config: {
            testing: true
        },

        init: function() {

            // init bonusprogram info
            $("#sx-js-res-t-idnr-info").box({
                'iframe':   true,
                'width':    '560px',
                'height':   '500px'
            });

            // init multiplus (JJ) info
            $("#sx-js-res-multiplus-info").box({
                'width':    '250px',
                'height':   '150px'
            });

            this.set_addentries();
            this.set_ainr();
            this.set_bonus();
            this.set_zah();
            this.set_ccnr();
            this.init_cvv2();
            this.set_flnr();
            this.init_flcomp();
            this.init_similar();
            this.init_voucher();
            this.init_agency_evoucher();
            this.init_collection();
            this.init_drland();

            // in case we have a preselected zah...
            // make sure all hidings are executed
            $("#sx-js-res-zah").change();

            //this.init_flnr();
        },

        /**
         * A/B Testing
         * @author  jw
         * @return  {boolean}
         */
        get_delivery: function() {
            if( $("#sx-res-del-address").length ) {
                return true;
            } else {
                return false;
            }
        },

        set_addentries: function() {

            $("#sx-js-res-email").addentry({
                addstr:     "",
                remstr:     "",
                addclass:   "sx-gc-add",
                remclass:   "sx-gc-rem",
                onrem:      function(el, p) {
                    $(p).find('input').val('');
                }
            });

            $("#sx-js-res-phone").addentry({
                addstr:     "",
                remstr:     "",
                addclass:   "sx-gc-add",
                remclass:   "sx-gc-rem"
            });
            // initialize with 2 displayed emails
            if(typeof sx_dpl_2_email !== "undefined" && sx_dpl_2_email) {
                $(".sx-gc-add", "#sx-js-res-email").click();
            }
        },

        /**
         * who really needs this?
         * display number of chars left user may type in
         * @author: jw
         * @params:
         */
        set_ainr: function() {

            $("#sx-js-res-ainr").keyup(function() {
                var max_chars   =  500;
                var avail_chars =  max_chars - $(this).val().length;
                if(avail_chars < 0) {
                    $(this).val( $(this).val().substr(0, max_chars)  );
                    avail_chars =  0;
                }
                $("#sx-js-ainr-length").html(avail_chars);
            });

            $("#sx-js-res-ainr-aus").keyup(function() {
                var max_chars   =  500;
                var avail_chars =  max_chars - $(this).val().length;
                if(avail_chars < 0) {
                    $(this).val( $(this).val().substr(0, max_chars)  );
                    avail_chars =  0;
                }
                $("#sx-js-ainr-aus-length").html(avail_chars);
            });
        },

        /**
         * after bonusprogramm select display info
         * @author: jw
         */
        set_bonus: function() {
            var obj          = this;
            var $bonusselect = $("#sx-js-res-t-idnr");

            $bonusselect.change(function() {
                // reset "nummer" cause it's possibly hidden
                $("#sx-js-res-idnr").attr('readonly', false).parent().css('visibility', 'visible');
                // reset wm
                $("#webmiles-widget").html('').css('display', 'none');

                switch( $(this).val() ) {
                    case 'WM':
                        sx_check_wm_script();
                        $("#sx-js-res-idnr").val('').parent().css('visibility', 'hidden');
                        break;
                    case 'MX':
                        $.box.open('sx-js-res-t-idnr-info', sx_maximiles_url);
                        $("#sx-js-res-idnr").val('').attr('readonly', true);
                        break;
                    case 'JJ':
                        $.box.open("sx-js-res-multiplus-info");
                        break;
                    default:
                        //$("#sx-js-res-idnr-hint").hide();
                }
            });

            // special case preselected bonusprogramm
            if ($bonusselect.val()) {
                $("#sx-res-bonusprogramm").click(function(){
                    $bonusselect.change();
                });
            }

            if ($bonusselect.val() == 'WM') {
                $bonusselect.change();
            }
        },

        /**
         * called by mx-window after login
         * @author: jw
         * @params:
         */
        set_maximiles: function(id) {
            $("#sx-js-res-idnr").val(id);
            $("#sx-js-res-wmidnr").val(id);
            $.box.close();
        },

        /**
         * after payment select display or hide expiry
         * @author: jw
         * @params:
         */
        set_zah: function() {
            $("#sx-js-res-zah").change(function(){

                switch( $(this).val() ) {
                    case "CC":
                        $("#sx-js-res-valid-thru").css('display', 'none');
                        break;
                    case "AP":
                        $("#sx-js-res-valid-thru").css('display', 'none');
                        break;
                    case "AI":
                    case "CR":
                    case "ES":
                        $("#sx-js-res-valid-thru").css('display', 'none');
                        $("#sx-js-res-ccnr").css('display', 'none');
                        $("#sx-js-res-payment-entry-cvv2").css('display', 'none');
                        break;
                    default:
                        $("#sx-js-res-valid-thru").css('display', '');
                        $("#sx-js-res-ccnr").css('display', '');
                        $("#sx-js-res-payment-entry-cvv2").css('display', '');
                }

                $("#sx-res-ccnr").trigger('change');
            });

        },

        /*
            eventhandler zah and ccnr

            @author mw, jw
            @return {void}
        */
        set_ccnr: function() {

            var obj =  this;

            // ccnr was entered
            $("#sx-res-ccnr").change(function() {
                obj.display_ap();
            });
            // credit card was selected
            $("#sx-js-res-zah").change(function() {
                obj.display_ap();
            });
        },

        /**
         * display cvv2 infos onfocus input
         *
         * @author jw
         * @return {void}
         */
        init_cvv2: function() {
            var $inp    =  $('#cvv2');
            var $info   =  $('#sx-res-securitycode-info');

            $inp.bind('focus', function() {
                $info.css('display', 'block');
            }).bind('blur', function() {
                $info.css('display', 'none');
            }).bind('input', function(){
                var val =  $(this).val();
                if(val.length > 2) {
                    $info.css('display', 'none');
                }
            });
        },

        /*
            airtplus
            if ccnr was entered check if cc-type eq AP
            get additional fields if so

            @author mw, jw
            @return {void}
        */
        display_ap: function() {

            // do it once only
            if( $("#ap_ik").length && $("#ap_ks").length) {
                return false;
            }

            var ccnr    =  $("#sx-res-ccnr").val();
            var zah     =  $("#sx-js-res-zah").val();

            //RAC-6929 hide credit card hint for prepaid agency
            if(zah == "AI") {
                $('#sx-credit-card-hint').hide();
            } else if($('#sx-credit-card-hint').css('display') == 'none') {
                $('#sx-credit-card-hint').show();
            }

            if(zah == "AP" && ccnr) {

                // in case of error ap is displayed hardcoded already
                if ($('input', '#non-ajax-air-plus-values').length) {
                    return false;
                }

                $.box.jwait()

                var params  =  {
                    'tab_identifier': $("#sx-tab-identifier").val(),
                    'ccnr'          : ccnr
                };

                var url =  sx_create_ajax_url("airplus_getfields");

                // get html via ajax and display
                $.getJSON(url, params, function(response) {
                    $.box.close();
                    if (response.err.length > 0) {
                        if (response.rec.error != "") {
                            $("#sx-js-res-error").html('<p>' + response.rec.error + '<\/p>').css('display', '');
                        }
                        $("#sx-js-res-airplus_fields").hide();
                    } else {
                        $("#sx-js-res-error").css('display', 'none');
                        $("#sx-js-res-airplus_fields").html(response.htm.txt).css('display','');
                    }
                });

            } else {
                // empty ccnr field or not AP
                $("#sx-js-res-error").css('display', 'none');
                $("#sx-js-res-airplus_fields").css('display','none');
            }
        },


        /**
         * set flight-info's radios click-handler
         * @author: jw
         * @param:
         */
        set_flnr: function() {
            var flnr_radios =  $("#sx-res-customerdetails-form input[name=has_flnr_info]");
            flnr_radios.click(function(){
                flnr_radios.each(function(){
                    var id =  $(this).attr('id');
                    var ck =  $(this).is(":checked");
                    $("#" + id + "-content").css('display', ck? '' : 'none');
                });
                // reset...
                if($("#sx-js-res-flight-info-content").length) {
                    $("#sx-js-res-flight-info-content").css('display', 'none');
                    $("#sx-res-flight-info").val("");
                }
                $("#sx-res-flnr").val("");
                $("#sx-res-flcomp :selected").attr('selected', false);
            });
        },

        /**
         * set flight-companies select change-handler
         * @author: jw
         * @param:
         */
        init_flcomp: function() {
            $("#sx-res-flcomp").change(function(){
                var val =  $(this).val();
                if($("#sx-js-res-flight-info-content").length) {
                    var dpl = (val === "notknown")? 'block' : 'none';
                    $("#sx-js-res-flight-info-content").css('display', dpl);
                }
                // set flnr's value although it's hidden
                if(val && val !== "notknown") {
                    $("#sx-res-flnr").val(val);
                }
            });

            // multiple terminals?
            if($("#sx-res-flight-info").length) {
                // copy val into flnr
                $("#sx-res-flight-info").blur(function(){
                    var val = this.value;
                    if(!val){
                        return;
                    }
                    $("#sx-res-flnr").val(val);
                });
            }
        },

        /**
         * deal with special case kue
         * we have to toggle payments display to required
         * we have to disable entries to avoid overriding
         * @author: jw
         * @params:
         */
        set_kue: function() {

            sx_sync_ck_with_content ('sx-js-res-wantskue',false,true);

            var obj     =  this;
            var url     =  sx_create_ajax_url("custdetails.payment");
            var params  =  {
                'tab_identifier':   $("#sx-tab-identifier").val(),
                'wantskue':         ($("#sx-js-res-wantskue").is(":checked")? 1 : 0)
            };
            $.getJSON(url, params, function(response){

                if (response.err.length > 0) {

                    if (response.rec.session_lost !== undefined) {
                        self.location.href =  self.location.protocol + "\/\/" + self.location.host + "/php/reservation";
                        return;
                    }

                    alert( response.err[0]['txt'] );
                    return;
                } else {
                    $("#sx-js-res-hidden-payment-div").html(response.htm.txt);

                    // re-init payment after html-load
                    obj.set_zah();
                    obj.set_ccnr();
                }
            });
        },

        /**
         * deal with special case wantsdel
         * we have to toggle payments display to required
         * we have to disable entries to avoid overriding
         * @author: jw
         * @params:
         */
        set_wantsdel: function() {

            sx_sync_ck_with_content ('sx-res-del-address',false,true);

            // no ajax update if hidden payment available
            if ( $("#sx-js-res-company-pays").attr('disabled') || $("#sx-payment-display").is(':visible') ) {
                return;
            }

            var j, item;
            var obj     =  this;
            var url     =  sx_create_ajax_url("custdetails.payment");
            var params  =  {
                'tab_identifier':   $("#sx-tab-identifier").val(),
                'wantsdel':         ($("#sx-res-del-address").is(":checked")? 1 : 0),
                'zah':              $("#sx-js-res-zah").val(),
                'ccnr':             $("#sx-res-ccnr").val()
            };

            // add (maybe) already entered ap-additional-fields values (RACREDESIGN-1671)
            var ap_fields = new Array('ap_ae', 'ap_ak', 'ap_au', 'ap_bd', 'ap_ds', 'ap_ik', 'ap_ks', 'ap_pk', 'ap_pr', 'ap_rz');
            for(j = 0; item = ap_fields[j]; j++) {
                params[item] = $("#" + item).val();
            }

            $.getJSON(url, params, function(response){

                if (response.err.length > 0) {

                    if (response.rec.session_lost !== undefined) {
                        self.location.href =  self.location.protocol + "\/\/" + self.location.host + "/php/reservation";
                        return;
                    }

                    alert( response.err[0]['txt'] );
                    return;
                } else {
                    $("#sx-js-res-hidden-payment-div").html(response.htm.txt);

                    // re-init payment after html-load
                    obj.set_zah();
                    obj.set_ccnr();

                    $("#sx-res-ccnr").trigger('change');
                }
            });
        },

        /**
         * init similar reservation info
         * @author: jw
         * @params:
         */
        init_similar: function() {

            // init similar reservation
            if( $("#sx-js-res-similar-booking").length ) {
                $("#sx-js-res-similar-booking").box({
                    'width':    '500px',
                    'height':   '430px'
                });
                $.box.open('sx-js-res-similar-booking');
            }
        },

         /**
          * Check if there are similar reservations! (RAC-4312)
          * Show specific dialog when neccessary.
          * @author: mw
          * @params:
          */
         similar_res: function() {

            if ($("#non-ajax-air-plus-values").length) {
                $("#non-ajax-air-plus-values").remove();
            }

            // get value and clean from whitespaces
            var $ccnr = $("#sx-res-ccnr");
            var ccnr  = $ccnr.val().replace(/\s/g, '');
            $ccnr.val(ccnr);

            if(!ccnr) {
                return;
            }

            var obj     =  this;
            var params  =  {
                    'tab_identifier':   $("#sx-tab-identifier").val(),
                    'ccnr'          :   ccnr
            };
            var url    =  sx_create_ajax_url("chk_sim_res");

            $.getJSON(url, params, function(response) {
                if (typeof response['htm']['txt'] !== "undefined") {
                    $("#sx-reservation-main").append( response['htm']['txt'] );
                    obj.init_similar();
                }
                return false
            });
        },

        /**
         * Init the select logic of the agency evouchers and payment methods.
         *
         * @returns {void}
         */
        init_agency_evoucher: function() {
            var select_evoucher = $('#sx-js-res-age-evoucher');
            if (!select_evoucher.length) {
                return;
            }

            var me = this;
            select_evoucher.change(function() {
                var current_evoucher = $(this).val().toLowerCase();

                // show message
                $('.sx-js-age-evoucher-message').hide();
                var message_id = 'sx-js-age-evoucher-' + current_evoucher + '-message';
                $('#' + message_id).show();

                // filter payment options
                var evoucher_sum = $('#sx-js-res-age-evoucher-sum-wrapper');
                var payments = $('#sx-js-res-payment-entries');
                switch (current_evoucher) {
                case 'fc':
                    evoucher_sum.hide();
                    me.filter_payments4agency([], '');
                    $("#sx-res-ccnr").val('');
                    payments.hide();
                    break;
                case 'lc':
                    evoucher_sum.show();
                    payments.show();
                    // only credit cards
                    me.filter_payments4agency(['AE', 'DC', 'EC', 'JC', 'VI']);
                    break;
                case 'bn':
                    evoucher_sum.hide();
                    payments.show();
                    me.filter_payments4agency(['CC'], 'CC');
                    break;
                default:
                    evoucher_sum.hide();
                    payments.show();
                    me.filter_payments4agency();
                }
            });

            select_evoucher.change();
        },

        filter_payments4agency: function(allow_list, pre_select) {
            if (!this.all_agency_payments) {
                this.all_agency_payments = $('#sx-js-res-zah').children();
            }

            var empty_payment = '';
            if (allow_list) {
                allow_list.push(empty_payment);
            }

            var payments = $('#sx-js-res-zah');
            if (typeof pre_select == 'undefined') {
                pre_select = payments.val();
            }

            payments.children().replaceWith('');
            $('.sx-js-card-image').hide();
            this.all_agency_payments.each(function() {
                if (!allow_list || allow_list.indexOf(this.value) !== -1) {
                    payments.append(this);
                    $('#sx-js-card-image-' + this.value).show();
                }
            });

            var can_pre_select = false;
            if (allow_list && allow_list.indexOf(pre_select) !== -1) {
                can_pre_select = true;
            }

            var values_list = [];
            payments.children().each(function() {
                values_list.push(this.value);
            });

            if (!allow_list && values_list.indexOf(pre_select) !== -1) {
                can_pre_select = true;
            }

            if (pre_select && can_pre_select) {
                payments.val(pre_select).change();
            } else {
                payments.val(empty_payment).change();
            }
        },

        /**
         * initialize voucher
         * control display
         * create ajax-request
         *
         * @author  joachim.wendenburg@sixt.de
         * @return  {void}
         */
        init_voucher: function() {

            if(
                typeof sx_voucher_check_result !== "undefined" && sx_voucher_check_result &&
                typeof sx_voucher_check_result.check_result !== "undefined" &&
                typeof sx_voucher_check_result.prices !== "undefined"
            ) {
                $('#sx-res-voucher-content').css('display', '');
                this.display_voucher_result(sx_voucher_check_result);
            }

            $('#sx-js-res-voucher-info').box({
                width: "400px"
            });

            var obj =  this;

            // init add button
            $(".sx-gc-add", "#sx-js-res-voucher-add").click(function() {
                obj.display_voucher_button(true, false);
                //$("#sx-js-res-voucher-check").css('display', '');
                //$("#sx-js-res-voucher-add").css('display', 'none');
            });

            // init send button
            var voucherbutt =  $(".sx-gc-button-normal-red:first", "#sx-js-res-voucher-check").click(function() {
                obj.send_voucher("send");
            });


            // i am a bad guy
            // voucher as param, send initial
            this.send_voucher("send");
        },

        send_voucher: function(mod) {

            // check vonr only if modus is "send"
            var vonr    =  $("input[type=text]", "#sx-js-res-voucher-check").val();
            if(mod == "send" && !vonr) {
               return;
            }

            $.box.jwait();

            //
            $('#sx-js-res-voucher-check').css('display', 'none').find('input[type=text]').val('');

            var i, item;
            var obj =  this;
            var url =  sx_create_ajax_url("chk_vonr");

            // create params
            var params  =  {
                'tab_identifier':   $("#sx-tab-identifier").val()
            };

            // get voucher numbers already displayed from available hidden fields
            var voucher_dpl =  $(".sx-js-res-vova", "#sx-js-res-voucher-added").serializeArray();

            // create collection of vouchers displayed...
            var voucher_all = [];
            for(i = 0; item = voucher_dpl[i]; i++) {
                voucher_all[i] =  item['value'];
            }

            // ...and new voucher if available
            if(vonr) {
                voucher_all[voucher_all.length] =  vonr;
            }

            // create keys from voucher like "voucher[0]" to pass as array
            // or pass param voucher eq false if all were removed again
            //
            if(voucher_all.length) {
                // add to params
                for(i = 0; item = voucher_all[i]; i++) {
                    params['voucher[' + i +  ']'] =  item;
                }
            } else {
                params['voucher'] =  0;
            }

            params['nam1']    = $('#nam1').val();
            params['nam2']    = $('#nam2').val();
            params['str']     = $('#str').val();
            params['ort']     = $('#ort').val();
            params['plz']     = $('#plz').val();
            params['land']    = $('#land').val();
            params['emai']    = $('#emai').val();
            params['tel']     = $('#tel').val();
            params['tel_cc']  = $('#tel_cc').val();
            params['tel2']    = $('#tel2').val();
            params['tel2_cc'] = $('#tel2_cc').val();

            // get result
            $.getJSON(url, params, function(response) {
                obj.display_voucher_result(response.rec);
                $.box.close(true);
            });
        },

        /**
         * create display of voucher-results
         * depending on response
         *
         * @author  joachim.wendenburg@sixt.de
         * @param   {object} response.rec
         * @return  {void}
         */
        display_voucher_result: function(rec) {

            var obj =  this;
            var vonr, dpl_voucher, dpl_class, dpl_str;

            // reset errors
            this.set_voucher_error("reset", false);

            // reset dpl
            $("#sx-js-res-voucher-added").html("");

            if(rec.check_result) {
                // loop results an create display
                for(vonr in rec.check_result) {

                    // clone template for voucher display
                    dpl_voucher =  $(".sx-js-res-voucher:first", "#sx-js-res-voucher-template").clone(false);

                    // create class/note depending on response
                    if (rec.check_result[vonr]['voucher_ok']) {
                        dpl_class   =  "sx-res-vonr-ok";
                        dpl_str     =  _sx_res_txt('voucher_val') + ": " + rec.check_result[vonr]['value'];
                    } else {
                        dpl_class =  "sx-res-vonr-error";
                        dpl_str     =  rec.check_result[vonr]['error'];
                        this.set_voucher_error("set", vonr);
                    }

                    // set strings/values and classes
                    $(".sx-js-res-vonr", dpl_voucher).html(vonr).addClass(dpl_class);
                    $(".sx-js-res-votx", dpl_voucher).html(dpl_str).addClass(dpl_class);
                    $(".sx-js-res-vova", dpl_voucher).val(vonr).attr('name', 'voucher[]');
                    $("#sx-res-voucher").attr('checked', true);

                    // store parent in closure and set eventhandler for remove button
                    (function(){
                        var div     =  dpl_voucher;
                        var _vonr   =  vonr;
                        $(".sx-gc-rem", dpl_voucher).click(function() {
                            $(div).remove();
                            obj.send_voucher("rem");
                        });
                    }());

                    // add
                    $("#sx-js-res-voucher-added").append(dpl_voucher);
                }
            }

            this.get_price_update();

            /*
            if(rec.prices) {
                $("#sx-js-res-compl-price").html(rec.prices.new_price + " **");

                if(rec.prices.voucher_sum && rec.check_result) {
                    $(".sx-js-res-additional-wrapper").css('display', '');
                    $("#sx-js-res-voucher-sum").html("- " + rec.prices.voucher_sum);
                    $("#sx-js-res-old-price").html(rec.prices.old_price);
                } else {
                    $(".sx-js-res-additional-wrapper").css('display', 'none');
                }

                if(rec.prices.new_price_eur) {
                    $("#sx-js-res-compl-price-euro").html(rec.prices.new_price_eur);
                }
            }
            */

            this.display_voucher_button(false, rec.limit_reached);
        },

        get_price_update: function() {

            var i,
                item,
                params  =  {},
                obj     =  this;

            var url     =  self.location.protocol + "\/\/" + self.location.host + "/php/reservation/calculate_custdetails?_=" + new Date().getTime();
            var entries =  [
                ['bday', '#sx-js-res-bday #bday'],
                ['bmon', '#sx-js-res-bday #bmon'],
                ['byear', '#sx-js-res-bday #byear'],
                ['tab_identifier', '#sx-tab-identifier']
            ];

            for(i = 0; item = entries[i]; i++) {
                val             =  parseInt($(item[1]).val());
                val             =  (val && val < 10)? '0' + val : val;
                params[item[0]] =  val;
            }

            this.db(params);

            $.ajax({
                url: url,
                dataType: 'json',
                data: params,
                type: "POST",
                success: function(response) {
                    if(typeof response.htm.txt === "undefined") {
                        obj.db("response empty");
                        return;
                    }
                    obj.db("response");
                    obj.db(response);
                    $('#sx-js-res-cd-price-wrapper').html(response.htm.txt);
                }
            });
        },

        /**
         * testout
         *
         * @author  jw
         * @param   {mixed} optional output, default data object
         * @return  {void}
         */
        /* global console */
        db: function() {
            if(!this.config.testing) {
                return;
            }
            try {
                if(arguments.length) {
                    console.info(arguments[0]);
                } else {
                    console.info(this.data);
                }
            } catch(err) {}
        },

        /**
         * update error stack
         *
         * @author  joachim.wendenburg@sixt.de
         * @param   {string} mode
         * @param   {string} vonr
         * @return  {bool} true if errors
         */
        voucher_error:  [],
        set_voucher_error: function(mod, val) {

            switch(mod) {
                case "reset":
                    this.voucher_error =  [];
                    break;
                case "set":
                    this.voucher_error.push(val);
                    break;
                case "rem":
                    var i, item, tmp =  [];
                    for(i = 0; item = this.voucher_error[i]; i++) {
                        if(item == val) {
                            continue;
                        }
                        tmp.push(item);
                    }
                    this.voucher_error =  tmp;
                    break;
                case "state":
                    // nothing to do here
                    break;
            }
            // true if still errors left
            return this.voucher_error.length? true : false;
        },

        /**
         * add/check Button depending on errors and number of displayed vouchers
         *
         * @author  joachim.wendenburg@sixt.de
         * @return  {void}
         */
        display_voucher_button: function() {

            hide_button =  arguments[0] || false;
            hide_add    =  arguments[1] || false;

            if(hide_button) {

                // toggle after add-click
                $("#sx-js-res-voucher-check").css('display', '');
                $("#sx-js-res-voucher-add").css('display', 'none');

            } else if( $(".sx-js-res-voucher", "#sx-js-res-voucher-added").length ) {

                // no more errors? display add
                if(!this.set_voucher_error("state", false) && !hide_add) {
                    $("#sx-js-res-voucher-add").css('display', '');
                    $("#sx-js-res-voucher-check").css('display', 'none');
                } else {
                    // we have errors: neither add nor entry
                    $("#sx-js-res-voucher-add").css('display', 'none');
                    $("#sx-js-res-voucher-check").css('display', 'none');
                }
            } else {
                // no vouchers to display, show entry
                $("#sx-js-res-voucher-check").css('display', '');
                $("#sx-js-res-voucher-add").css('display', 'none');
            }
        },

        init_collection: function() {
            var inp =  $("input[type=radio]", "#sx-js-res-collection");
            if(!inp.length) {
                return;
            }
            inp.click(function() {
                inp.each(function(){
                    var container =  $("#" + this.id + "-content");
                    if(!container.length) {
                        return;
                    }
                    var dpl =  this.checked? "" : "none";
                    container.css('display', dpl);
                });
            });
        },

        /**
         * some countries need a region select
         * init eventhandler for drland to display blan
         *
         * @author  joachim.wendenburg@sixt.de
         * @return  {void}
         */
        init_drland: function() {
            var blanid      =  "sx-js-res-blan-wrapper";
            var drlandid    =  "sx-js-res-drland";
            $("#" + drlandid).change(function(){
                if( $(this).val() ===  "US") {
                    $("#" + blanid).css('display', '');
                } else {
                    $("#" + blanid).css('display', 'none').find('option:first').attr('selected', true);
                }

                if($(this).val()==="IT") {
                    $('#sx-js-res-taxid').show();
                } else {
                    $('#sx-js-res-taxid').hide();
                }
            });
            // init change
            $("#" + drlandid).change();
        }
    };


    /**
     * youngdriver check
     * @author  jw
     */
    var sx_youngdriver =  {

        config: {
            sel: [
                ['bday', '#sx-js-res-bday #bday'],
                ['bmon', '#sx-js-res-bday #bmon'],
                ['byear', '#sx-js-res-bday #byear']
            ],
            selref: {},
            flex: [
                ['wrapflex', '#sx-js-res-bday'],
                ['ckflex', '#sx-js-res-is-youngdriver']
            ],
            flexref: {},
            hint: [
                ['hint1', '#sx-js-res-youngdriver-hint1']
            ],
            hintref: {},
            action: '/php/reservation/calculate_custdetails',
            url: false,
            tab_id: '#sx-tab-identifier',
            tab_id_val: false,
            minage: 23,
            bookingdate: false,
            agestate: 2,
            testing: false
        },

        // store elements and selected index here
        data: {},
        // callback after data has changed
        fn_data_changed: [],

        /**
         * youngdriver check initialize
         * create jquery objects and change-handler
         *
         * @author  jw
         * @return  {void}
         */
        init: function() {
            var i,
                entry,
                hint,
                obj = this;

            var ch_handler = function() {
                obj.getval();
            };

            this.fn_data_changed.push('check_age');

            // create jquery objects once and add events for birthday entries
            for (i = 0; entry = this.config.sel[i]; i += 1) {
                this.config.selref[entry[0]] = $(entry[1]);
                this.config.selref[entry[0]].bind('change', ch_handler);
            }

            // create jquery objects once for hints
            for (i = 0; hint = this.config.hint[i]; i += 1) {
                this.config.hintref[hint[0]] = $(hint[1]);
                this.config.hintref[hint[0]].css('display', 'none');
            }

            // create jquery objects once for checkbox and depending content
            for (i = 0; entry = this.config.flex[i]; i += 1) {
                this.config.flexref[entry[0]] = $(entry[1]);
            }

            // create events for checkbox
            this.config.flexref.ckflex.bind('click', function() {
                if (this.checked) {
                    obj.config.flexref.wrapflex.css('display', 'none');
                    $('select', obj.config.flexref.wrapflex).each(function(){
                        this.selectedIndex = 0;
                    });
                } else {
                    obj.config.flexref.wrapflex.css('display', '');
                }
                obj.getval();
            });

            // get tab_identifier
            this.config.tab_id_val = $(this.config.tab_id).val();
            this.config.url = self.location.protocol
                + '\/\/' + self.location.host
                + this.config.action + '?_=' + new Date().getTime();
            // get default date
            this.config.bookingdate = this.get_bookingday(false);

            // import globals set by smarty
            this.smarty();

            // initial check
            this.getval();
        },

        /**
         * import data from global set by smarty
         *
         * @author  jw
         * @return  {void}
         */
        smarty: function() {
            if (typeof sx_youngdriver_data !== 'undefined') {
                this.config.minage = parseInt(sx_youngdriver_data.minage, 10)
                    || this.config.minage;
                this.config.bookingdate = this.get_bookingday(sx_youngdriver_data.uda);
            }
        },

        /**
         * collect bday, bmon and byear if avail
         * store in data
         * call onchange handler
         *
         * @author  jw
         * @return  {void}
         */
        getval: function() {
            var key;
            for (key in this.config.selref) {
                this.data[key] = parseInt(this.config.selref[key].val(), 10);
            }

            this.db();
            this.data_changed();
        },

        /**
         * loop data and check if complete
         * check year
         * check month if necessary
         * check day if necessary
         * call display method
         *
         * @author  jw
         * @return  {void}
         */
        check_age: function() {
            var key,
                state = 0;

            // birthday not complete, asume we are old enough
            for (key in this.data) {
                if(!this.data[key]) {
                    state = 2;
                    break;
                }
            }

            // compare age
            // state = 0 : match, next level
            // state = 1 : too young
            // state = 2 : old enough
            if (state === 0) {
                var date = this.config.bookingdate,
                    age = date.year - this.data.byear;

                state = this.check_year(age);
                this.db('alter: ' + age);
                this.db('year: ' + state);
            }

            // same year, compare mon
            if (state === 0) {
                state = this.check_mon(date.mon);
                this.db('mon: ' + state);
            }
            // same mon, compare day
            if (state === 0) {
                state = this.check_day(date.day);
                this.db(state);
                this.db('day: ' + state);
            }

            if (this.config.agestate !== state) {
                this.config.agestate = state;
                this.dpl_hint();
                this.mod_price();
            }
        },

        check_year: function(age) {
            return (age > this.config.minage)
                ? 2
                : ((age < this.config.minage) ? 1 : 0);
        },

        check_mon: function(mon) {
            return (mon > this.data.bmon)
                ? 2
                : ((mon < this.data.bmon) ? 1 : 0);
        },

        check_day: function(day) {
            return (day >= this.data.bday) ? 2 : 1;
        },

        get_bookingday: function(bookingday) {
            var bd, date;
            if (bd = /^([0-9]{4})([0-9]{2})([0-9]{2})$/.exec(bookingday)) {
                // create number, even if contains leading zero
                var mon = parseInt(bd[2], 10);
                    mon = (mon > 0)? mon -1 : 0;
                var day = parseInt(bd[3], 10);

                date = new Date(bd[1], mon, day);
                var hour = date.getHours();

                // in case of switch to wintertime takes place at 00:00
                // Lokal Time jumps back to 23:00
                if (hour == 23) {
                    date = new Date(bd[1], mon, day, 1, 0, 0);
                }
            } else {
                date = new Date();
            }

            return {
                ms: date.getTime(),
                day: date.getDate(),
                mon: date.getMonth() +1,
                year: date.getFullYear()
            };
        },

        /**
         * display hint and ck
         *
         * @author  jw
         * @return  {void}
         */
        dpl_hint: function() {
            var key;
            for (key in this.config.hintref) {
                this.config.hintref[key].css(
                    'display',
                    (this.config.agestate === 1) ? '' : 'none'
                );
            }

            // login...
            // in case we display hint and checkbox is available
            // uncheck checkbox and display bday selects
            if (this.config.flexref.ckflex.length && this.config.agestate === 1) {
                this.config.flexref.ckflex.attr('checked', false);
                this.config.flexref.wrapflex.css('display', '');
            }

            this.db('dpl_hint state: ' + this.config.agestate);
        },

        mod_price: function() {
            var obj = this,
                params = {
                    tab_identifier: this.config.tab_id_val,
                    byear: this.data.byear,
                    bmon: (this.data.bmon < 10) ? '0' + this.data.bmon : this.data.bmon,
                    bday: (this.data.bday < 10) ? '0' + this.data.bday : this.data.bday
                };

            $.ajax({
                url: this.config.url,
                dataType: 'json',
                data: params,
                type: 'POST',
                success: function(response) {
                    if (typeof response.htm.txt === 'undefined') {
                        obj.db('response empty');
                        return;
                    }

                    obj.db('response:');
                    obj.db(response.htm.txt);

                    $('#sx-js-res-cd-price-wrapper').html(response.htm.txt);
                }
            });

            this.db('mod_price state: ' + this.config.agestate);
        },

        /**
         * callback after data were changed
         * loop through functions to call
         *
         * @author  jw
         * @return  {void}
         */
        data_changed: function() {
            var i, fn;
            for (i = 0; fn = this.fn_data_changed[i]; i++) {
                this[fn]();
            }
        },

        /**
         * testout
         *
         * @author  jw
         * @param   {mixed} optional output, default data object
         * @return  {void}
         */
        /* global console */
        db: function() {
            if (!this.config.testing) {
                return;
            }
            try {
                if (arguments.length) {
                    console.info(arguments[0]);
                } else {
                    console.info(this.data);
                }
            } catch(err) {}
        }
    };

    /**
     * switchoci
     * send invoice data and handle result
     * @author  jw
     *
     */
    var sx_switchoci = {

        conf: {
            'formid': 'sx-js-res-invoice-data',
            'buttid': 'sx-js-res-invoice-data-save',
            'errorid': 'sx-js-res-invoice-data-error',
            'errorclass': 'sx-gc-error-field',
            'msgid': 'sx-js-res-invoice-data-message',
            'blanwrap': 'sx-js-oci-blan-wrapper',
            'landid': 'sx-js-oci-land'
        },

        $f: false,
        $e: false,
        $m: false,
        $w: false,
        $l: false,

        /**
         * init vars and events
         * @author  jw
         * @return  {void}
         *
         */
        init: function() {

            if($("#sapoci-form").length >= 1) {
                $("#sapoci-form").submit();
            }

            var $b  =  $("#" + this.conf.buttid),
                obj =  this;

            if(!$b.length) {
                return false;
            }

            this.$e =  $("#" + this.conf.errorid);
            this.$m =  $("#" + this.conf.msgid);
            this.$f =  $("#" + this.conf.formid);

            this.$w =  $("#" + this.conf.blanwrap);
            this.$l =  $("#" + this.conf.landid);

            this.init_blan();

            $b.click(function(){
                obj.send();
            });
        },

        /**
         * some countries need a region select
         * init eventhandler for land to display blan
         *
         * @author  joachim.wendenburg@sixt.de
         * @return  {void}
         */
        init_blan: function() {

            if(!this.$w.length) {
                return false;
            }

            var obj =  this;

            this.$l.change(function() {
                if( $(this).val() ===  "US") {
                    obj.$w.css('display', '');
                } else {
                    obj.$w.css('display', 'none').find('option:first').attr('selected', true);
                }
            });
            // init change
            this.$l.change();
        },

        /**
         * create url, params and execute ajax
         * @author  jw
         * @return  {void}
         *
         */
        send: function() {

            this.reset();

            var obj     =  this,
                data    =  this.$f.serializeArray(),
                url     =  this.$f.attr('action'),
                params  =  {},
                i,
                item;

            for(i = 0; item =  data[i]; i += 1) {
                params[item.name] =  item.value;
            }

            $.getJSON(url, params, function(response){

                if (response.err.length > 0) {
                    obj.error( response );
                    return;
                } else {
                    obj.success( response );
                }
            });
        },

        /**
         * reset error and message
         * @author  jw
         * @return  {void}
         *
         */
        reset: function() {

            if(!this.$f) {
                return false;
            }

            this.$e.css('display','none');
            this.$m.css('display','none');
            $('.' +  this.conf.errorclass, this.$f).removeClass( this.conf.errorclass );
        },

        /**
         * display error, init form error setting
         * @author  jw
         * @return  {void}
         *
         */
        error: function(response) {
            var str =  "<p>" + response.err[0]['txt'] + "<\/p>";
            this.$e.html(str).css('display','');

            // unfortunally old global style..
            sx_error_fields =  response.rec.error_fields;
            sx_set_errors();
        },

        /**
         * display success
         * @author  jw
         * @return  {void}
         *
         */
        success: function(response) {
            this.$m.css('display','');
        },

        /**
         * testing error or message with dummy data
         * @author  jw
         * @param   {string} "err" to display error (optional)
         * @return  {string} mode
         *
         */
        db: function() {

            this.reset();

            var err =  arguments[0] || false;
            var response;

            if(err) {
                response =  {"err":[{"txt":"Fehlertext"}],"msg":[],"state":null,"rec":{"successful":"","error_fields":["inv_nam1","inv_nam2","inv_str","inv_plz","inv_ort","inv_land"]},"htm":""};
                this.error(response);
            } else {
                response =  {"err":[],"msg":[],"state":null,"rec":{"successful":"1","error_fields":[]},"htm":""};
                this.success(response);
            }
            return err? "Fehlertest done!" : "Successtest done!";
        }
    }



    /**
     * init breadcrumb- which is part of the template-wrapper
     * @author  joachim.wendenburg@sixt.de
     * @param   {number} step
     * @return  {void}
     */
    function sx_res_set_breadcrumb(step) {
        // geat breadcrumb list
        var $breadcrumbParent = $("#sx-js-res-breadcrumb");
        var $bc =  $breadcrumbParent.addClass('sx-res-breadcrumb-' +step);
        $breadcrumbParent.addClass('sx-res-breadcrumb-display');


        // nothing to do
        if(!$bc.length || typeof sx_breadcrumb_txt === "undefined") {
            return;
        }

        var $lis =  $('li', $bc);
        $lis.each(function(i) {
            if (i+1 < step) {
                // make sure we deal with absolute pathes
                if(sx_breadcrumb_txt[i][1].indexOf("http") === -1) {
                    sx_breadcrumb_txt[i][1] =  self.location.protocol + "\/\/" + self.location.host + sx_breadcrumb_txt[i][1];
                }
                // add html either wrapped in a tag or not
                $("<a></a>").appendTo( $(this).html('') ).attr('href', sx_breadcrumb_txt[i][1]).html(  '<strong>' + (i+1) +'. <\/strong><span>' + sx_breadcrumb_txt[i][0] + '<\/span>' );
            } else {
                $(this).html(  '<strong>' + (i+1) +'. <\/strong><span>' + sx_breadcrumb_txt[i][0] + '<\/span>'  );
            }
        });
        $bc.css('display','block');
    }

    function sx_res_backlink() {
        if (sx_breadcrumb_txt[4][2]) {
            $("<a style='text-decoration: none;'></a>").insertBefore( $('.offerselect__headline') ).attr('href', sx_breadcrumb_txt[4][1]).html(  '<span> &#8249; ' + sx_breadcrumb_txt[4][0] + '<\/span>' );
        }
    }



    function sx_res_toggle_parent_class(el) {
        var n =  el.name;
        var p =  $(el).parents("ul");

        $(p).find("input[name=" + n + "]").each(function(){
            if(el === this) {
                $(this).parent().addClass('sx-gc-selected');
            } else {
                $(this).parent().removeClass('sx-gc-selected');
            }
        });
    }


    /**
     * toggle hidden payment's display
     * @author  jw
     * @param   {object} jquery selectors to toggle
     */
    var toggle_hidden_payment = {

        config: {
            state: false
        },

        toggle: function(arr) {

            var i,
                item,
                dpl =  this.config.state? ['none', 'block'] : ['block', 'none'];

            for(i=0; item=arr[i]; i+=1) {
                $(item[0]).css('display', dpl[item[1]]);
            }

            if(typeof sx_clear_inputs === "function") {
                sx_clear_inputs('#sx-js-res-payment-entries');
            }

            this.config.state =  this.config.state? false : true;
        }
    }



    /** ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     *
     * login
     *
     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    var sx_login =  {

        // array for adding observers for several sx_login events
        callback: {
            logout:        [],
            login_welcome: []
        },
        // flag if jquery box is in use
        login_overlay: false,

        /**
         * method for triggering sx_login events
         * @author  nikolaos.nikolaidis@sixt.de
         *
         * @param   {String}    callback_key    the event name
         * @param   {mixed}     [event_data]    the event data
         *
         * @return  {void}
         */
        trigger_callback: function( callback_key, event_data ){
            if ( this.callback[callback_key] === "undefined" ){
                return;
            }

            var callback_list = this.callback[callback_key];

            for ( var idx = 0, cl_length = callback_list.length; idx < cl_length; idx++ ) {
                callback_list[idx]( event_data );
            };
        },

        init: function() {

            this.welcome            =  _sx_res_txt("welcome");
            this.login              =  _sx_res_txt("login");
            this.sx_value_ident     =  $("#sx-res-login-ident").val();
            this.sx_value_passw     =  false;
            var obj                 =  this; // store object

            // special case: ident (but no pass) was passed as param
            this.ident_set          =  (typeof sx_ident_set !== "undefined" && sx_ident_set)? sx_ident_set : false;
            this.error_set          =  (typeof sx_error_set !== "undefined" && sx_error_set)? true : false;
            this.is_portal          =  (typeof sx_is_portal !== "undefined" && sx_is_portal)? sx_is_portal : false;

            // though login button just causes an ajax request
            // make login posibble via enter key
            $(document).keyup(function(e){
                // do nothing if not enter key
                if(e.keyCode !== 13) {
                    return;
                }
                // do nothing if target is not password entry
                var t   =  e.target;
                var id  =  $(t).attr("id");
                if(id !== "sx-res-login-passw" && id !== "sx-res-login-passt") {
                    return;
                }
                // call button onclick
                $('#sx-js-res-login-button').click();
            });

            // select mnum
            $("#sx-js-res-mnum-list").box({
                'zindex': 10010,
                'txttitle': _sx_res_txt("logintitle")
            });

            // password/unam vorgotten iframe-popup
            $("#sx-js-res-passwd-forgotten").box({
                width: '550px',
                height: '450px',
                iframe: true
            });

            $("#sx-res-login-ident").attr('autocomplete', 'off');
            $("#sx-res-login-passw").attr('autocomplete', 'off').val('');

            /**
             * set click for submit button
             */
            $('#sx-js-res-login-button').click(function() {
                $.box.jwait();

                var _action         =  (typeof sx_login_action !== "undefined")? sx_login_action : "login";
                var url             =  sx_create_ajax_url("login." + _action);
                var params          =  {
                    'jsonlogin':        1,
                    'ident':            $("#sx-res-login-ident").val(),
                    'passw':            $("#sx-res-login-passw").val(),
                    'tab_identifier':   $("#sx-tab-identifier").val(),
                    'wants_permanent':  $("#sx-js-res-login-permanent").is(":checked")? 1 : 0,
                    'has_social_login': $("#sx-has-social-login").val()
                };

                obj.ajax_request( url, params);
            });

            if(this.ident_set) {
                this.preselect();
                this.ident_set =  false;
            }
        },

        /**
         * exec ajax
         * @author: jw
         * @params: string url, object params
         */
        ajax_request: function(url, params) {

            // reset error exept we deal with sx_ident_set and preset identifier
            if(!this.ident_set) {
                this.error(false);
            }

            var obj =  this;

            $.ajax({
                url: url,
                dataType: 'json',
                data: params,
                type: "POST",
                success: function(response) {

                    $.box.close();

                    // sitecatalyst login home/start
                    obj.strack(response, 'login');

                    if (response.err.length > 0) {

                        if (response.rec.session_lost !== undefined) {
                            self.location.href =  self.location.protocol + "\/\/" + self.location.host + "/php/reservation";
                            return;
                        }

                        obj.error( response.err[0]['txt'] );
                        if ( $('.sx-gc-waiting').length ) {
                            $('.sx-gc-waiting').attr('disabled', false).removeClass('sx-gc-waiting');
                        }

                        if (obj.login_overlay) {
                            $.box.open(obj.login_overlay);
                        }
                        return;

                    } else {

                        switch(response.rec.success) {

                            // select mnum first
                            case "mnum_list":
                                obj.sx_value_passw =  params['passw'];
                                obj.mnum_html(response.rec.mnum_list);
                                break;
                            // home or start etc...?
                            case "welcome":
                                obj.trigger_callback("login_welcome", { show_del_suggest: !!response.rec.show_del_suggest , show_col_suggest: !!response.rec.show_col_suggest, posl_country: response.rec.posl_country });
                                obj.welcome_html( response.rec );
                                break;
                            // loginstart or agent login?
                            case "redirect":
                                self.location.href =  self.location.protocol + "\/\/" + self.location.host + "/php/reservation" + response.rec.redirect;
                                break;
                            // customerdetails
                            case "step4":
                                obj.welcome_step4(response.rec, response.htm);
                                break;
                            default:
                                obj.error( "login mnum failed" );
                        };
                    }
                }
            });
        },

        /**
         * login was passed via param?
         * blur to activate password entry
         * @author: jw
         * @params:
         */
        preselect: function() {
            // preset value into input, force blur-action
            $("#sx-res-login-ident").val(this.ident_set);
            // open login if home
            if(sx_reservation_tpl === "home") {
                sx_toggle_home_login(1);
            }
        },

        error:  function(msg) {
            if(msg) {
                $('#sx-js-res-login-error').html('<p>' + msg + '<\/p>').css( 'display', '' );
            } else {
                $('#sx-js-res-login-error').html('').css( 'display', 'none' );
            }
        },

        mnum_html: function(ret, _is_social) {
            var _is_social = (typeof _is_social === "undefined") ? null : _is_social;
            // reset list
            $('#sx-js-res-mnum-list ul').html("");

            var i, n, v, s, obj =  this;
            for(mnum in ret) {

                s =  $('<li><\/li>').appendTo( $('#sx-js-res-mnum-list ul') ).click(function() {
                     $.box.jwait();
                    obj.mnum_submit(this, _is_social);
                });

                n =  $('<span><\/span>').addClass('sx-gc-leftfloater').html(mnum).appendTo(s);
                v =  $('<span><\/span>').addClass('sx-gc-rightfloater').html(ret[mnum]).appendTo(s);

            }
            $.box.open( 'sx-js-res-mnum-list' );
        },

        mnum_submit: function(li, _is_social) {
            var _is_social = (typeof _is_social === null) ? null : _is_social;
            if(_is_social !== null && _is_social.sp) {
                sx_social_media_login.new_connection({
                    'kdnr': $(li).find('span:first').html(),
                    'sp': _is_social.sp,
                    'sp_user_id': _is_social.sp_user_id
                });
            } else if(_is_social === 2) {
                sx_social_media_login.login($(li).find('span:first').html(), 1);
            }
            else {
                var _action = (typeof sx_login_action !== "undefined") ? sx_login_action : "login";
                var obj = this;
                var url = sx_create_ajax_url("login." + _action);
                var params = {
                    'jsonlogin': 1,
                    'ident': $(li).find('span:first').html(),
                    'passw': this.sx_value_passw,
                    'tab_identifier': $("#sx-tab-identifier").val(),
                    'wants_permanant': $("#sx-js-res-login-permanent").is(":checked") ? 1 : 0
                };
                this.ajax_request( url, params );
            }
        },

        /**
         * hide form and display login text, in case show del/col
         * @author: jw
         * @params: object response.rec
         */
        welcome_html: function(rec) {
            if(rec) {
                var welcome =  rec.welcome["welcome_name"]? this.welcome + ", " + rec.welcome["welcome_name"] : this.welcome;
                $(".sx-js-res-login-state-name").html(welcome);
                $(".sx-js-res-login-state-txt").html(rec.welcome["welcome_text"]);

                // set/change state of 'is_real_corp_cust'
                if (typeof rec.is_real_corp !== "undefined" && rec.is_real_corp == '1') {
                    $("#sx-js-res-is-corpcust").val("1");
                } else {
                    $("#sx-js-res-is-corpcust").val("");
                }

                // show del/col or set flag coi
                sx_del_col.import_rec(rec);
                sx_show_coi     =  rec.show_coi || false;

                $("#sx-js-res-login-form").css('display', 'none');
                $("#sx-js-open-login").css('display', 'none');
                $(".sx-js-res-login-state").css('display', '');

                if(rec.corp_rentaldetails && rec.corp_rentaldetails.txt) {
                    var str =  rec.corp_rentaldetails.txt;
                    if (rec.corp_rentaldetails.url) {
                        str =  $("<a></a>").attr('href', rec.corp_rentaldetails.url).html( str ).addClass('sx-gc-active');
                    }
                    $(".sx-js-res-login-state-corp").append(str).css('display', '');
                }
            } else {
                $("#sx-js-res-login-form").css('display', '');
                $("#sx-js-open-login").css('display', '');
                $("#sx-js-res-login-form input").val('');
                $(".sx-js-res-login-state").css('display', 'none');
                $(".sx-js-res-login-state-corp").css('display', 'none').html('');
                $(".sx-js-res-login-upd").html('');

                // set flag coi
                sx_show_coi =  false
            }
            // this.logout();
            // set coi depending on flag
            sx_set_coi();
        },

        /**
         * hide login box and shows the logged in user on success
         * @author: gabo
         * @params: object response.rec
         */
        welcome_step4: function(rec, htm) {
            $("#sx-js-res-login-form").val('').css('display', 'none');
            $("#anr").val(rec.data.anr);
            $("#dr_title").val(rec.data.title);
            $("#nam1").val(rec.data.nam1).attr("readonly","readonly");
            $("#nam2").val(rec.data.nam2).attr("readonly","readonly");
            $("#emai").val(rec.data.emai);
            $("#tel").val(rec.data.tel);
            $("#tel_cc").val(rec.data.tel_cc);
            $("#sx-js-res-drland option[value='"+rec.data.land+"']").attr('selected', true );
            $("#sx-js-res-rentaldetails").val('').css('display', 'none');
            if (rec.data.str != '' || rec.data.plz != '' || rec.data.ort != '') {
                $("#sx-res-cust-address").attr('checked', true);
                $("#sx-res-cust-address-content").css('display', 'block');
                $("#drstr").val(rec.data.str);
                $("#drplz").val(rec.data.plz);
                $("#drort").val(rec.data.ort);
            }
            $("#bday option[value='"+rec.data.bday+"']").attr('selected', true );
            $("#bmon option[value='"+rec.data.bmon+"']").attr('selected', true );
            $("#byear option[value='"+rec.data.byear+"']").attr('selected', true );
            if (rec.data.taxid != '') {
                $("#taxid").val(rec.data.taxid);
                $('#sx-js-res-taxid').show();
            }

            // mod by jw
            // toggle view between payment display and entries, empty entries if hidden
            //
            if (rec.data.payment_allowed != '') {
                $("#sx-payment-display").html(rec.data.payment_allowed).css('display', 'block');
                $("#sx-js-res-payment-entries").css('display', 'none').find(":input").val('');
            } else {
                 $("#sx-payment-display").css('display', 'none');
                 $("#sx-js-res-payment-entries").css('display', 'block');
            }

            if (rec.data.ap_html && rec.data.ap_html != '') {
                $("#sx-js-res-error").css('display', 'none');
                $("#sx-js-res-airplus_fields").html(rec.data.ap_html).css('display','');
            }

            if (rec.data.zah_list.length > 0) {
                $("#sx-res-zah").find("option").remove();
                $('#sx-res-zah').append(new Option('...', '', true, true));
                for (var i=0; i < rec.data.zah_list.length; i++) {
                    var finhvalue = rec.data.zah_list[i]['finh'];
                    var pbezvalue = rec.data.zah_list[i]['pbez'];
                    $('#sx-res-zah').append(new Option(pbezvalue, finhvalue));
                }
            }

            // modified by mw due to RACREDESIGN-1390
            if (htm.txt != '') {
                $("#sx-res-reference-div").html(htm.txt);
            }

            if(typeof sx_youngdriver !== "undefined") {
                sx_youngdriver.getval();
            }

            // USA 1149 disply login state
            $('.sx-js-res-login-state-name').html(_sx_res_txt('welcome') + ' ' + rec.data.nam2 + ' ' + rec.data.nam1);
            $('.sx-js-res-login-state').css('display', 'block');

            //RAC-8460 show Triplink Combobox
            if(rec.triplink == "1") {
                $('#sx-js-triplink').show();
                $("#triplink option").attr('selected', false);
                $("#triplink option[value='Triplink']").attr('selected', true);
            }
        },

        logout: function(rec) {
            var myNav = navigator.userAgent.toLowerCase();
            var ieVersion = (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : 99;

            if (ieVersion < 11) {
                $('a:first', '.sx-js-res-login-state').unbind('click', $.proxy(this.exec_logout, this)).bind('click', $.proxy(this.exec_logout, this));
                $('#sx-js-res-error').css('display', 'none');
            }
        },

        exec_logout: function(e) {

            e.preventDefault();

            $.box.jwait();

            var obj     =  this;
            var url     =  sx_create_ajax_url("login.logout");
            var params  =  {
                'tab_identifier':   $("#sx-tab-identifier").val(),
                'tpl':              sx_reservation_tpl
            };

            if($('.sx-social-media-icon.active').length) {
                $('.sx-social-media-icon.active').removeClass('active');
            }

            $.getJSON(url, params, function(response) {

                // sitecatalyst login home/start
                obj.strack(response, 'login');

                if (response.err.length > 0) {
                    obj.error( response.err[0]['txt'] );
                    return;
                } else {

                    // we are no real-corpcust any longer...
                    $("#sx-js-res-is-corpcust").val("");
                    // decide what to do...
                    switch(sx_reservation_tpl) {
                        case "home":
                        case "start":
                            obj.welcome_html(false);
                            obj.trigger_callback("logout", { show_del: !!response.rec.show_del , show_col: !!response.rec.show_col, posl_country: response.rec.posl_country });
                            $.box.close();
                            break;
                        default:
                            var redirect =  self.location.protocol + "\/\/" + self.location.host + "/php/reservation";
                            if (typeof response.rec.redirect_link !== "undefined") {
                                redirect += response.rec.redirect_link;
                            }
                            self.location.href =  redirect;
                    }
                }
            });
        },

        hide_home_label: function() {
            $("#sx-js-res-passt-label").css("display", "none");
            $("#sx-res-login-passw").focus();
        },

        strack: function(response, ltype) {
            if(typeof sitecatalyst === "undefined" || typeof sitecatalyst[ltype] === "undefined") {
                return;
            }
            sitecatalyst[ltype](response);
        }
    };

    /** ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     *
     * debug, tell-a-friend... sms
     *
     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /**
     * display debug infos if cookie sx_res_debug is available
     * @author: jw
     * @params:
     */
    function sx_show_debug_info() {
        if(typeof get_cookie === "undefined" || !get_cookie('sx_res_debug')) {
            return;
        }
        $(".sx-gc-debug").css('display', 'inline');
    }

    function sx_send_tellafriend(el) {

        var i, item;
        var f       =  $(el).parents("form");
        var url     =  $(f).attr('action') + "?_=" + new Date().getTime();
        var data    =  $(f).find(":input").serializeArray();

        var params  =  {
            'step' : sx_reservation_tpl
        };
        for(i = 0; item =  data[i]; i++) {
            params[item["name"]] =  item["value"];
        }

        $.getJSON(url, params, function(response){
            if (response.err.length > 0) {
                var i, item, error_txt =  "";
                for(i = 0; item =  response.err[i]; i++) {
                    error_txt += "<p>" + item['txt'] + "<\/p>";
                }
                $('#sx-js-res-error-taf').html('<p>' + error_txt + '<\/p>');
                $('#sx-js-res-error-taf').show( 0, function(){
                    var el =  this;
                    setTimeout(function() {
                        $(el).fadeOut();
                    }, 3000);
                });
                return;
            } else {
                var message_txt =  response.msg[0]['txt'];
                $('#sx-js-res-message-taf').html('<p>' + message_txt + '<\/p>');
                $('#sx-js-res-message-taf').show( 0, function(){
                    var el =  this;
                    setTimeout(function() {
                        $(el).hide();
                        $.box.close();
                    }, 3000);
                });
            }
        });
    }

    /**
     * init alternative currency in typo3 wrapper
     */
    function init_alternative_currency() {
        var value = $('.currency__modal__dropdown__li--selected').data('value');

        $('.currency__modal__button__label').text(value);
    }

    /**
     * set alternative currency and send form to reload if success
     * @author: jw
     * @params: button within the form
     */
    function sx_alternative_currency(el, tpl) {
        var i, item;
        var f       =  $(el).parents("form");
        var url     =  $(f).attr('action').replace(tpl, "status.update_field") + "?_=" + new Date().getTime();
        var dataFakeSelectBox = {};
        dataFakeSelectBox['name'] = 'value';
        dataFakeSelectBox['value'] = $('.currency__modal__dropdown__li--selected').data('value');
        var dataVar = $(f).find(":input").serializeArray();
        var data     = dataVar.concat(dataFakeSelectBox);

        var params  =  {
        };
        for(i = 0; item =  data[i]; i++) {
            params[item["name"]] =  item["value"];
        }

        $('.currency__modal__button__label').text(params["value"]);


        $.box.jwait();
        $.getJSON(url, params, function(response){
            if (response.err.length > 0) {
                var i, item, error_txt =  "";
                for(i = 0; item =  response.err[i]; i++) {
                    error_txt += item['txt'] + "\n";
                }
                $.box.jalert(error_txt, "OK");
                return;
            } else {
                f.submit();
            }
        });
    }

    /**
     * send phone number for sms-confirmation
     * display error or success and hide form again
     * @author: jw
     * @params:
     */
    function sx_sms_request() {
        var url     =  sx_create_ajax_url("confirmation.sendsms");
        var params  =  {
            'tab_identifier':   $("#sx-tab-identifier").val(),
            'field'         :   $("#sx-sms-confirmation").val(),
            'blnr'          :   $("#sx-blnr").val()
        };
        $.getJSON(url, params, function(response) {
            if (response.err.length > 0) {
                var i, item, error_txt =  "";
                for(i = 0; item =  response.err[i]; i++) {
                    error_txt += '<p>' + item['txt'] + '<\/p>';
                }
                $("#sx-js-res-sms-response").html( error_txt ).css('display', '').addClass('sx-gc-error');
            } else {
                // success
                $("#sx-js-res-sms-response").html( '<p>' + _sx_res_txt('sms_success') + '<\/p>' ).css('display', '').addClass('sx-gc-message');
            }
            // hide form, hide message after delay
            $("#sx-js-sms-confirmation").css('display', 'none');
            var run =  setTimeout(function(){
                $("#sx-js-res-sms-response").fadeOut(function(){
                    $("#sx-js-res-sms-response").removeClass('sx-gc-message').removeClass('sx-gc-error');
                });
            }, 4000);
        });
    }

    /** ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     *
     * topoffer
     *
     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    var sx_topoffer = {

        config: {
            sel: {
                form:               '#sx-js-topoffer-filter-form',
                countries:          '#sx-topoffer-country',
                ipCountries:        '#sx-topoffer-ip-country',
                ctyp:               '#sx-topoffer-ctyp',
                filter:             '.sx-js-topoffer-filter',
                list:               '#sx-js-res-topoffer-list',
                wrapperselector:    '.sx-js-topoffer-toggle-wrapper',
                buttonselector:     '.sx-js-topoffer-toggle-button',
                contentselector:    '.sx-js-topoffer-toggle-content'
            },
            classselected: 'sx-selected',
            action: 'topoffer_list.filter',
            allowTriggeredChange: false,
            tester: true

        },

        init: function() {
            var obj =  this;

            $(this.config.sel.filter).bind('change', function(e) {
                obj.init_teaser($(obj.config.sel.ctyp).val());
                if (e.originalEvent || obj.config.allowTriggeredChange) {
                    obj.filter_topoffer(e);
                }
            });

            // fix for browser back button
            var selected_country = $(this.config.sel.countries).val();
            var selected_ctyp = $(this.config.sel.ctyp).val();

            // forced select-change to pass event
            if (selected_ctyp == 'lkw') {
                this.triggerChange(this.config.sel.ctyp);
            } else if (selected_country != sx_current_liso) {
                this.triggerChange(this.config.sel.countries);
            }
            this.init_teaser(selected_ctyp);
            this.toggle();
            $(window).click(function(data){
                if(data.target.className != "sx-js-tooltip"){
                    SIXT.t3.tooltip.hide();
                }
            });
        },

        init_teaser: function(ctyp) {
            $('.sx-res-topoffer-teaser').css('background','');
            if(ctyp=='lkw'){
                $('.sx-res-topoffer-teaser').css('background-image',"url('"+sx_reservation_teaser_img_truck+"')");
                $('.sx-res-topoffer-teaser.responsive').css('background-image',"url('"+sx_reservation_teaser_img_responsive_truck+"')");
            }else {
                $('.sx-res-topoffer-teaser').css('background-image',"url('"+sx_reservation_teaser_img_car+"')");
                $('.sx-res-topoffer-teaser.responsive').css('background-image',"url('"+sx_reservation_teaser_img_responsive_car+"')");
            }
        },
        /**
         * Send the ajax request and reload the topoffer list
         */
        filter_topoffer: function(e) {
            var obj =  this;
            $.box.jwait();
            var url     = sx_create_ajax_url(obj.config.action);
            var data    = $(obj.config.sel.form).serializeArray();

            if (typeof get_cookie == 'function'
                && !get_cookie('sx_res_debug')) {
                    for (var i = 0, count = data.length; i < count; i++) {
                        if (data[i].name == 'debug_country') {
                            data.splice(i, 1);
                            break;
                        }
                    }
            }

            data.push({
                name: 'init_action',
                value: $(e.currentTarget).attr('name')
            });

            // tracking
            var ctyp    = $(this.config.sel.ctyp).val();
            $.getJSON(url, data, function (response) {
                $.box.close();
                if (response.err.length) {
                    // show error message
                    var i, item, error_txt =  "";
                    for(i=0; item=response.err[i]; i+=1) {
                        error_txt += item['txt'] + "\n";
                    }
                    $.box.jalert(error_txt, "OK");
                } else {
                    $(obj.config.sel.list).html(response.htm.txt);

                    // update country select if car type changed
                    if(e) {
                        if($.inArray($(e.currentTarget).attr('id'), [
                                'sx-topoffer-ctyp',
                                'sx-topoffer-ip-country'
                            ]) >= 0) {
                                $(obj.config.sel.countries).html(
                                    response.rec.country_html
                                );
                        }
                    }

                    obj.toggle();
                    obj.strack(ctyp);
                    sx_show_debug_info();
                    SIXT.t3.tooltip.init(true);
                }
            });
        },

        /**
         * Trigger for event "change" with allowing access for execution of
         * request
         *
         * @param {String} selector
         *
         * @author Viktor Dudenkov <viktor.dudenkov.extern@sixt.com>
         */
        triggerChange: function(selector) {
            this.config.allowTriggeredChange = true;
            $(selector).change();
            this.config.allowTriggeredChange = false;
        },

        /**
         * only for old tt_corporate without typo3-corporate.js
         * minimalized toggle function like in typo3-corporate.js
         * Temp...
         */
        toggle: function() {

            var obj =  this;

            $(this.config.sel.wrapperselector).each(function(i) {
                var $wrapper    =  $(this);
                var $content    =  $(obj.config.sel.contentselector, $wrapper);
                var $button     =  $(obj.config.sel.buttonselector, $wrapper).data('content', $content).data('wrapper', $wrapper).css('cursor', 'pointer');
            });

            var handleclick =  function(e) {
                var $button     =  $(this);
                // get relations to wrapper and content
                // find out if other wrappers have to be resettet
                var $content    =  $button.data('content');
                var $wrapper    =  $button.data('wrapper');

                if( $wrapper.hasClass(obj.config.classselected) ) {
                    $wrapper.removeClass(obj.config.classselected);
                } else {
                    $wrapper.addClass(obj.config.classselected);
                }
                return false;
            };

            $(this.config.sel.buttonselector).bind('click', handleclick);
        },

        strack: function(ctyp) {
            if(typeof sitecatalyst === "undefined" || typeof sitecatalyst.topoffer_load === "undefined") {
                return;
            }
            sitecatalyst.topoffer_load(ctyp);
        },

        db: function() {
            if(!this.config.tester) {
                return false
            }

            try {
                var i, item;
                for(i=0; item=arguments[i]; i+=1) {
                    console.log(item);
                }
            } catch(err) {}
        }
    };

    function sx_topoffer_int_filter(li, country) {
        $("li.sx-js-res-topoffer-int").css('display', 'none');
        $("li.sx-js-res-topoffer-" + country).css('display', '');

        $(li).parent().find("li.sx-gc-selected").removeClass("sx-gc-selected");
        $(li).addClass("sx-gc-selected");
    }

    /** ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     *
     * agent rates
     *
     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /**
     * init agentrates calendar
     * @author: jw
     * @params:
     */
    function sx_datepicker_single() {
        // initialize dateobject for validation etc...
        sx_date_obj.init(sx_date_str);
        var obj =  this;

        // ie6 is not really good rendering animations...
        var sx_datapicker_duration = (sx_is_ie6)? "" : "normal";

        $('.sx-js-datepicker').datepicker({
            numberOfMonths: 1, // display more then one month
            firstDay: sx_date_obj.firstday, // start calendar with monday
            dayNames: sx_datapicker_day_names,
            dayNamesMin: sx_datapicker_day_names_min,
            monthNames: sx_datapicker_month_names,
            monthNamesShort: sx_datapicker_month_names_short,
            dateFormat: sx_date_obj.datestr,
            changeMonth: true,
            minDate: +0,
            duration: sx_datapicker_duration,
            nextText: sx_datapicker_txt_next,
            prevText: sx_datapicker_txt_prev,
            onSelect: function(date, inst) {
                // create datestring like yyyymmdd
                var selectedMonth   =  inst.selectedMonth +1;
                    selectedMonth   =  (selectedMonth < 10)? "0" + selectedMonth : "" + selectedMonth;
                var datestr         =  "" + inst.selectedYear + selectedMonth + inst.selectedDay;
                $("#sx-agent-gdat").val(datestr);
            }
        });
    }

    /**
     * object agentrates
     * @author: jw
     */
    sx_agentrate =  {

        // default agent rates depending on country
        get_agent_rates: function() {

            var params  =  {
                'rate_action':      'reset',
                'tab_identifier':   $("#sx-tab-identifier").val(),
                'liso':             $("#sx-js-agent-liso").val()
            };
            $('#sx-js-res-rates-error').hide();
            $.box.jwait();
            this.ajax_request(params, 'sx-js-res-agentrates-list-wrapper');
        },

        sim_onclick_kdnr_rates : function(ev) {
            var key = ev.which;
            if(key==13) {
                this.get_kdnr_rates();
            }
        },

        get_kdnr_rates: function() {
            var params  =  {
                'rate_action':      'corporate',
                'tab_identifier':   $("#sx-tab-identifier").val(),
                'kdnr':             $("#sx-js-agent-kdnr").val(),
                'liso':             $("#sx-js-kdnr-liso").val()
            };
            $.box.jwait();
            this.ajax_request(params, 'sx-js-res-kdnrrates-list-wrapper');
        },

        get_moc_rates: function() {
            var params  =  {
                'rate_action':      'express',
                'tab_identifier':   $("#sx-tab-identifier").val(),
                'moc':              $("#sx-js-agent-moc").val(),
                'nam1':             $("#sx-js-agent-nam1").val(),
                'expr_ctyp':        $("input[name='expr_ctyp']:checked").val()
            };
            $.box.jwait();
            this.ajax_request(params, 'sx-js-res-mocrates-list-wrapper');
        },

        /**
         * get list of rates and write into given id
         * @author: jw
         * @param:  object params to pass
         * @param:  string container-id
         */
        ajax_request: function(params, id) {

            var url =  sx_create_ajax_url("agent_ratelist");
            var obj =  this;
            $.getJSON(url, params, function(response) {

                // close waiter
                $.box.close();

                if (response.err.length > 0) {
                    var i, item, error_txt =  "";
                    for(i = 0; item =  response.err[i]; i++) {
                        error_txt += "<p>" + item['txt'] + "<\/p>";
                    }
                    obj.error(error_txt);
                } else {
                    if (params.rate_action == "express") {
                        var redirect =  self.location.protocol + "\/\/" + self.location.host + "/php/reservation/agent_start?tab_identifier=" + params.tab_identifier + "&ctyp=" + params.expr_ctyp;
                        if (typeof response.rec.redirect_link !== "undefined") {
                            redirect += response.rec.redirect_link;
                        }
                        self.location.href = redirect;
                    } else {
                        $("#" + id).html( response.htm.txt );

                        // select first radio if avail
                        if( $("input[type=radio]",  $("#" + id)).length) {
                            $("input[type=radio]:first", $("#" + id)).attr('checked', true);
                        }
                    }
                }
            });
        },

        /**
         * change group of agent-rates
         * select first item of a group
         * @author: jw
         */
        select_group: function() {
            $(".sx-js-res-rateselect").each(function() {
                var s   =  "#" + this.id + "-content";
                var dpl =  this.checked? "" : "none";
                $(s).css('display', dpl);
                if(dpl === "" && $("input[type=radio]", s).length) {
                    $("input[type=radio]:first", s).attr('checked', true).parent().addClass('sx-gc-selected');
                }
            });
        },

        error:  function(err) {
            $('#sx-js-res-rates-error').html(err).css('display', '');
        },

        init: function() {

            // make sure backward-compatible
            // latest version?
            //
            if( $("#sx-js-res-agentrate-form").length ) {
                // init click-handler
                var obj =  this;
                $(".sx-js-res-rateselect").click(function() {
                    obj.select_group();
                });
                // now set first item clicked
                $(".sx-js-res-rateselect").eq(0).attr("checked", true).click();

                // this.get_agent_rates();
            } else {
                // old stuff
                this.get_rate();
            }
        },

        // continue with old stuff
        past_rate: false,

        get_rate: function() {

            var obj     =  this;

            // get all avail values
            var values  =  this.get_values();
            var url     =  sx_create_ajax_url("agent_ratelist");
            var params  =  {
                'tab_identifier':   $("#sx-tab-identifier").val(),
                'rate_action':      (this.past_rate? this.past_rate : 'reset')
            };
            for(nam in values) {
                params[nam] =  values[nam] || "";
            }
            // use rate if passed as argument
            if(arguments.length) {
                params["rate_action"]   =  arguments[0];
                this.past_rate          =  arguments[0];
            }

            $.getJSON(url, params, function(response) {
                if (response.err.length > 0) {
                    var i, item, error_txt =  "";
                    for(i = 0; item =  response.err[i]; i++) {
                        error_txt += item['txt'] + "\n";
                    }
                    obj.error(error_txt);
                    $("#sx-res-agent-rateslist-wrapper").html("");
                } else {
                    $("#sx-res-agent-rateslist-wrapper").html( response.htm.txt );
                    fix_ie6_png_bug();
                }
            });

            // empty entries again
            // this.reset_values();
        },

        get_values: function() {
            var values =  {};
            $("#sx-js-res-agentrate-entries :input").each(function(){
                var n =  $(this).attr('name');
                if(n.substr(0,1) == "_") {
                    return;
                }
                values[n] =  $(this).val() || false;
            });
            return values;
        },

        reset_values: function() {
            $("#sx-js-res-agentrate-entries :input").each(function(){
                if(!$(this).is("select")) {
                    $(this).val("");
                }
            });
        }
    };


    sx_corporate_register = {
        check: function() {

            var params  =  {};
            var url     =  sx_create_ajax_url("sendb2bmail");
            var obj     =  this;

            $("#sx-js-res-corporate-register-form :input").each(function(){
                if($(this).is("input[type=submit]") || !this.name) {
                    return;
                }
                params[this.name] =  $(this).val();
            });

            $.getJSON(url, params, function(response) {

                var i, item, txt =  "";
                var t =  (response.err.length > 0)? "err" : "msg";

                for(i = 0; item =  response[t][i]; i++) {
                    txt += "<p>" + item['txt'] + "<\/p>";
                }
                obj.out(txt, t);

                // track if success
                if(t == "msg") {
                    sx_trackpv("/php/reservation/corporatelp/request_" + ((params["contact_customer"] === "callback")? "phone" : "email") );
                }
            });

            return false;
        },
        out: function(txt, t) {
            $(".sx-js-res-out").css('display', 'none');
            $("#sx-js-res-" + t).html(txt).css('display', '');

            if(t == "msg") {
                $("#sx-js-res-corporate-register-form").css('display', 'none');
            }
        }
    };

    /** ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     *
     * state
     *
     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

    /**
     * due to ajax updates sometimes we need to get the current state...
     * @author: jw
     * @params: string field or boolean false if all fields, function callback
     */
    function sx_init_state(field, callback) {

        var url     = field? sx_create_ajax_url("status.get_field") : sx_create_ajax_url("status.get_all");
        var params  =  {
            'field':            field,
            'tab_identifier':   $("#sx-tab-identifier").val()
        };

        $.getJSON(url, params, function(response) {
            if(typeof callback === "undefined") {
                alert("not available: function " + callback.toString());
                return;
            }
            callback(response);
        });
   }


    /** ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     *
     * online help
     *
     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    function sx_init_onlinehelp() {

        // online help
        var oh_wd =  (typeof sx_infobox_max !== "undefined")? sx_infobox_max : '560px';
        $("#sx-js-res-online-help").box({
            'txttitle': _sx_res_txt('online_help'),
            'width': oh_wd,
            'height': '640px',
            'onopened' : initFaqCenter()
        });

        // // init chat, it's hidden until
        // // sx_init_onlinehelp_ichat();
        // sx_check_ichat.get(function(response){
        //     if(response) {
        //         $("#sx-res-ichat-wrapper").css("display", "");
        //     }
        // });

        // RACREDESIGN-2411 / RACREDESIGN-2432

            // create namespace for Helpcenter module
        window.SIXT.modules.NamespaceFactory('window.SIXT.modules.Helpcenter');

        // append to propper namespace in SIXT.modules
        window.SIXT.modules.Helpcenter = Helpcenter;
    };


    //     __  __________    ____  _____________   __________________
    //    / / / / ____/ /   / __ \/ ____/ ____/ | / /_  __/ ____/ __ \
    //   / /_/ / __/ / /   / /_/ / /   / __/ /  |/ / / / / __/ / /_/ /
    //  / __  / /___/ /___/ ____/ /___/ /___/ /|  / / / / /___/ _, _/
    // /_/ /_/_____/_____/_/    \____/_____/_/ |_/ /_/ /_____/_/ |_|
    var Helpcenter = Helpcenter || {};

    Helpcenter = (function (window, $) {

        // 01 test
        // 02 live
        var HOST = 'https://novoiq02.sixt.de/nmIQ/rest/iq/';
        var PARAMS = {
            ORDER: 'order=',
            CONTEXT: 'context=',
            LIMIT: 'limit=',
            SEARCH: 'search=',
            DISPLAY_LIMIT: '5'
        }
        var CONST = {
            URL_ASK: HOST +'ask', // <question>
            URL_FAQ: HOST +'faqs', // <id>
            URL_SEARCH: HOST +'suggestions', // <keyword>
            URL_CONTEXTS: HOST +'contexts', // <context>
            URL_EVALUATION: HOST + 'evaluate/', // https://apps.novomind.com/developer/ihelp/rest/api-console.html
            PARAM_ORDER_DEFAULT: PARAMS.ORDER +'context,-priority',
            PARAM_CONTEXT_DEFAULT: PARAMS.CONTEXT +'ALLE_MARKEN.Sixt_Rent_A_Car',
            PARAM_LIMIT_DEFAULT: PARAMS.LIMIT + PARAMS.DISPLAY_LIMIT,
            PARAM_SEARCH_DEFAULT: PARAMS.SEARCH +'',
        };

        // delay helper
        var delay = (function(){
            var timer = 0;
            return function(callback, ms){
                clearTimeout (timer);
                timer = setTimeout(callback, ms);
            };
        })();

        var $input;
        var $answers;
        var $topquestions;
        var s_faq_tracking;

        /*
         * initializes the Helpcenter with corresponding nodes
         * fetches topQuestions if third arg is provided
         *
         * @param $input required typeOf jQuery input
         * @param $answers required typeOf jQuery div
         * @param $topquestions optional typeOf jQuery div
         */
        init = function(jQueryInput, jQueryAnswers, jQueryTopquestions, jQueryQuestionTemplate) {
            $input = jQueryInput;
            $answers = jQueryAnswers;

            // Remove previous suggestions if there were any !!!
            $('.faqcenter__suggests').remove();

            // _initTypeahead($input);
            $input.after('<ul class="faqcenter__suggests faqcenter__list"></ul>');
            $suggets = $('.faqcenter__suggests');

            if (jQueryTopquestions) {
                $topquestions = jQueryTopquestions;
                // initial call to receive topquestions
                getTopQuestions();
            }

            $questionTemplate = jQueryQuestionTemplate;

            _addEventListener();

            // Init tracking
            s_faq_tracking = s_gi('sixtracde');
            s_faq_tracking.eVar100="SEARCH_TERM";
        };

        _sendRequest = function (url, method, data) {
            var dfd = new $.Deferred(); // Create Deferred

            jQuery.ajax({
                url: url,
                contentType: 'application/json',
                type: method === 'POST' ? 'POST' : 'GET',
                // dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                data: typeof data !== 'undefined' ? data : '',
                success: function(response) {
                    dfd.resolve(response); // Resolve the promise, give back the response (response)
                },
                statusCode: {
                    400: function(response) {

                    },
                    404: function(response) {

                    },
                    415: function(response) {

                    },
                    200: function(response) {

                    },
                    204: function(response) {

                    }
                }
            })
            .fail(function(response) {

            });
            return dfd.promise(); // Give back the promise, waiting for resolve
        };


        /*
         * Register dom & custom events
         */
        _addEventListener = function() {
            // dom node events

            $input.on('change', function(ev) {

                var value = $(this).val();

                delay(function(){
                    s_faq_tracking.tl(this,'o','Click_on_FAQ_search_field_and_searched_' + value.replace(' ', '_'));

                    _handleInputEvent(value, null, 'suggest');
                }, 1 );
            });

            // only when provided on init
            if ($topquestions) {
                $topquestions.off('click');
                $topquestions.on('click', function(ev){
                    _handleTopQuestionClick(ev);

                    return false;
                });
            }

            $.unsubscribe('sixt.helpcenter.gotAnswerById');
            $.unsubscribe('sixt.helpcenter.gotAnswersbyKeyword');
            $.unsubscribe('sixt.helpcenter.gotAnswersbyContext');
            $.unsubscribe('sixt.helpcenter.gotSuggestsByString');
            $.unsubscribe('sixt.helpcenter.gotTopQuestions');
            $.unsubscribe('sixt.helpcenter.userActed');
            $.unsubscribe('sixt.helpcenter.gotBadResponse');

            // custom events
            $.subscribe('sixt.helpcenter.gotAnswerById', function(ev, answersResponse) {
                if (answersResponse && typeof answersResponse !== 'undefined') {
                    _onBuildAnswersMarkup(answersResponse);
                }
            });
            $.subscribe('sixt.helpcenter.gotAnswersbyKeyword', function(ev, answersResponse) {
                _onBuildAnswersMarkup(answersResponse);
            });
            $.subscribe('sixt.helpcenter.gotAnswersbyContext', function(ev, answersResponse) {

                _onBuildAnswersMarkup(answersResponse);
            });
            $.subscribe('sixt.helpcenter.gotSuggestsByString', function(ev, suggestsResponse) {
                _buildSuggestsMarkup(suggestsResponse);
            });
            $.subscribe('sixt.helpcenter.gotTopQuestions', function(ev, topQuestionsResponse) {
                _onBuildTopQuestionsMarkup(topQuestionsResponse.questions);
            });
            $.subscribe('sixt.helpcenter.userActed', function(ev, element) {
                if (element.dataset && typeof element.dataset.questionid !== 'undefined' && typeof element.dataset.rating !== 'undefined') {
                    _handleEvaluationClick(ev, element);
                }

                return false;
            });

            $.subscribe('sixt.helpcenter.gotBadResponse', function(ev, response) {

            });
        };

        _handleEvaluationClick = function(ev, element) {
            var $clickedStar = $(element);
            var rating = element.dataset.rating;

            $clickedStar.siblings().andSelf().attr('class', '');
            $clickedStar.nextAll().addClass('sx-icon-star_empty');
            $clickedStar.prevAll().andSelf().addClass('sx-icon-star_full');

            if ($clickedStar.data("rating") == 1) {
                $('#sx-js-res-online-help').find('.t3-hotline-box').show('slow');
            }

            s_faq_tracking.tl($clickedStar,'o','Click_on_FAQ_rating_' + $clickedStar.data("rating") + '_star');

            ev.stopPropagation();
        };

        _handleTopQuestionClick = function(event) {
            var questionNode  = event.target;

            if ($(questionNode).is('p')) {
                return;
            }

            if ($(questionNode).is('span')) {
                $.publish('sixt.helpcenter.userActed', $(questionNode));

                return;
            }

            faqcenterAnswer = $(questionNode).next('.faqcenter__answer');

            faqcenterAnswer.toggle();
            $(questionNode).siblings('.faqcenter__evaluation').toggle();

            $faqcenterAnswerOptions = faqcenterAnswer.children('option');
            faqcenterAnswer.find('br').remove();

            $.each($faqcenterAnswerOptions, function(index, element) {
                newElement = $(element).html("<div class='faqcenter__answer__container'><div class='faqcenter__answer__choice'>" + element.text + "</div></div>");
                newElement = $(element).html();

                $(element).remove();
                faqcenterAnswer.append(newElement);
            });

            s_faq_tracking.tl($(questionNode),'o','Click_on_FAQ_question_' + $(questionNode).data('questionid'));

            var choiches = faqcenterAnswer.find('.faqcenter__answer__choice');
            if (choiches.length > 0) {
                choiches.off('click');

                //var parentQuestion = choiches.parent().parent().prev();
                choiches.on('click', function () {
                    s_faq_tracking.tl(this,'o','Click_on_FAQ_intelligent_link_' + this.innerHTML.replace(' ', '_'));

                    // search for new key, and submit parent answer text !!!
                    _handleInputEvent(
                        this.innerHTML,
                        {
                            'questionid': $(questionNode).data('questionid'),
                            'text': $(questionNode).text()
                        },'ask');

                    return false;
                });
            }

            return false;
        };

        _handleInputEvent = function(inputString, parent, type) {
            $('.faqcenter__answerheadline').hide();

            $answers.empty();

            // start seacrhing when string is longer then 2 charachters
            if (inputString.length > 2) {
                this.getSuggestsByString(inputString, parent, type);
            }
        };

        _onBuildTopQuestionsMarkup = function(questions) {
            var topQuestionsHtml = '<ul class="faqcenter__list">';
            var questionTemplate = $questionTemplate.clone( true );

            $.each(questions, function(index, questionObj) {

                if (index < 5) {

                    // some sanity checking cause answers comes in as obj with key 0
                    if (questionObj.answers && questionObj.answers[0] && questionObj.question) {

                        questionTemplate = questionTemplate.clone( true );
                        questionTemplate.find('.faqcenter__question')[0].innerHTML = questionObj.question;
                        questionTemplate.find('.faqcenter__question')[0].dataset.questionid = questionObj.id;

                        // INFO: novomind sends us back broken html, thus we have to format it correctly!
                        var question = questionObj.answers[0];
                        question = question.replace("link src", "a href");
                        question = question.replace("/link", "/a");
                        questionTemplate.find('.faqcenter__answer')[0].innerHTML = question;

                        // add clickListener to each star and publish event to call api
                        $.each(questionTemplate.find('.faqcenter__evaluation__stars')[0].children, function(index, ratingElem){
                            // insert id
                            ratingElem.dataset.questionid = questionObj.id;
                        });

                        // add evaluation markup
                        topQuestionsHtml += questionTemplate[0].innerHTML;

                    }
                    else {
                        $.publish('sixt.helpcenter.gotBadResponse', questions);
                    }
                }
            });

            topQuestionsHtml += '</ul>';

            _renderTopQuestions(topQuestionsHtml);
        };

        _onBuildAnswersMarkup = function(answersResponse) {
            var questionTemplate = $questionTemplate.clone( true );
            questionTemplate.find('.faqcenter__question')[0].innerHTML = answersResponse.question;
            questionTemplate.find('.faqcenter__question')[0].dataset.questionid = answersResponse.id;

            // INFO: novomind sends us broken html, thus we have to format it correctly!
            var answResp = answersResponse.answers[0];
            answResp = answResp.replace("link src", "a href");
            answResp = answResp.replace("/link", "/a");
            questionTemplate.find('.faqcenter__answer')[0].innerHTML = answResp;

            // add clickListener to each star and publish event to call api
            $.each(questionTemplate.find('.faqcenter__evaluation__stars')[0].children, function(index, ratingElem){

                // insert id
                ratingElem.dataset.questionid = answersResponse.id;
            });

            var answersHtml = '<ul class="faqcenter__list">';
            answersHtml += questionTemplate[0].innerHTML;
            answersHtml += '</ul>';

            _renderAnswers(answersHtml);
        };

        _buildSuggestsMarkup = function(suggestsResponse) {
            $suggets.empty();

            var suggestsHtml = '<ul class="faqcenter__list">';

            if (suggestsResponse.suggests && suggestsResponse.suggests.length) {

                $.each(suggestsResponse.suggests, function(index, suggestObj) {
                    $suggets.append(
                        $('<li class="faqcenter__listitem"><h4 class="faqcenter__question" data-topid="'+ suggestObj.id +'">' +  suggestObj.question + '</h4></li>')
                        .click(function(){
                            getAnswerById(suggestObj.id);
                            $input.val('');
                            $suggets.empty();
                        })
                    );
                });

                // if there is only one suggest click on it
                if (suggestsResponse.suggests.length == 1) {
                    $.each($('.faqcenter__question'), function(index, value) {
                        if ($(value).data("topid") == suggestsResponse.suggests[0].id) {
                            $(value).click();
                        }
                    });
                }
            }

        };

        _renderTopQuestions = function(topQuestionsHtml) {
            $topquestions.html(topQuestionsHtml);
        };

        _renderAnswers = function(answersHtml) {
            $answers.html(answersHtml);
            $('.faqcenter__answerheadline').show();
            $('.faqcenter__answers .faqcenter__answer').show();
            $('.faqcenter__answers .faqcenter__evaluation').show();

            var faqcenterAnswers = $('.faqcenter__answers .faqcenter__answer');
            faqcenterAnswers.find('br').remove();

            $.each(faqcenterAnswers.find('option'), function(index, element) {
                newElement = $(element).html("<div class='faqcenter__answer__choice'>" + element.text + "</div>");
                newElement = $(element).html();

                $(element).remove();

                faqcenterAnswers.append($(newElement));
            });

            $('.faqcenter__answers .faqcenter__answer').off('click');

            var choiches = faqcenterAnswers.find('.faqcenter__answer__choice');
            if (choiches.length > 0) {
                choiches.off('click');
                var parentQuestion = choiches.parent().prev();
                choiches.on('click', function (ev) {
                    s_faq_tracking.tl(this,'o','Click_on_FAQ_intelligent_link_' + this.innerHTML.replace(' ', '_'));

                    _handleInputEvent(
                        this.innerHTML,
                        {
                            'questionid': parentQuestion.data('questionid'),
                            'text': parentQuestion.text() + ' <br/>(' + $(this).text() + ') '
                        },'ask');

                    return false;
                });
            }

            $.each($('.faqcenter__answers .faqcenter__evaluation__stars').children(), function(index, value) {
                $(value).on('click', function() {
                    $(this).siblings().andSelf().attr('class', '');
                    $(this).nextAll().addClass('sx-icon-star_empty');
                    $(this).prevAll().andSelf().addClass('sx-icon-star_full');

                    if ($(this).data("rating") == 1) {
                        $('#sx-js-res-online-help').find('.t3-hotline-box').show('slow');
                    }

                    s_faq_tracking.tl($(this),'o','Click_on_FAQ_rating_' + $(this).data("rating") + '_star');

                    return false;
                });
            });
        };

        /*
         * @param id number/string 1
         *
         * @return {
         *    "name" : "faq13_Foo",
         *    "context" : "Agent.FAQ.Allgemein",
         *    "id" : 13,
         *    "question" : "foo?",
         *    "answers" : [ "bar!"],
         *    "priority" : 1
         *  }
         */
        getAnswerById = function (id) {

            var url = CONST.URL_FAQ + '/' +id;

            $.when(_sendRequest(url)).done(function(answer) {
                $.publish('sixt.helpcenter.gotAnswerById', answer);
            });
        };

        /*
         * @param keyword "foo"
         * @param orderCriterionArr [priority, -priority, question, context, id]
         *
         * @return [{
         *    "name" : "faq13_Foo",
         *    "context" : "Agent.FAQ.Allgemein",
         *    "id" : 13,
         *    "question" : "foo?",
         *    "answers" : [ "bar!"],
         *    "priority" : 1
         *  },{}, ...]
         */
        getAnswersbyKeyword = function (keyword) {

            var searchTerm = typeof keyword === 'string' ? keyword : CONST.PARAM_SEARCH_DEFAULT;

            var url = CONST.URL_FAQ + '?' + searchTerm + '&' + CONST.PARAM_CONTEXT_DEFAULT;

            $.when(_sendRequest(url)).done(function(answers) {
                if (answers.length || typeof answers[0] == 'object' && $.isEmptyObject(answers[0])) {
                    $.publish('sixt.helpcenter.gotAnswersbyKeyword', answers);
                } else {
                    $.publish('sixt.helpcenter.gotBadResponse', answers);
                }
            });
        };

       /* @param string input.length =< 3
        * @param string
        * @return [{
        *    "name" : "faq13_Foo",
        *    "context" : "Agent.FAQ.Allgemein",
        *    "id" : 13,
        *    "question" : "foo?",
        *    "answers" : [ "bar!"],
        *    "priority" : 1
        *  },{}, ...]
        */
       getSuggestsByString = function (string, parent, type) {
           var url = '';
           if (type === "suggest") {
               url = CONST.URL_SEARCH + '?search='+ string;
           }
           else {
               url = CONST.URL_ASK + '/' + string;
           }

           $.when(_sendRequest(url)).done(function(suggests) {if (type === "ask") {
               var obj = {
                   id : 1,
                   question : suggests.response
               };

               $.publish('sixt.helpcenter.gotAnswersbyKeyword',
                   {
                       'answers':[suggests.response],
                       'id': parent.questionid,
                       'question': parent.text
                   });
           }
           else {
               $.publish('sixt.helpcenter.gotSuggestsByString', {'suggests':suggests});
           }

           });
       };


       /*
        * @param limit optional string/number
        *
        * @return [{
        *    "name" : "faq13_Foo",
        *    "context" : "Agent.FAQ.Allgemein",
        *    "id" : 13,
        *    "question" : "foo?",
        *    "answers" : [ "bar!"],
        *    "priority" : 1
        *  },{}, ...]
        */
       getTopQuestions = function (limit) {

           var limitParameter = typeof limit === 'number' ? number : CONST.PARAM_LIMIT_DEFAULT;

           var url = CONST.URL_FAQ + '?' + limitParameter + '&' + CONST.PARAM_CONTEXT_DEFAULT;

           $.when(_sendRequest(url)).done(function(questions) {
               if (questions.length || typeof questions[0] == 'object') {
                   $.publish('sixt.helpcenter.gotTopQuestions', {'questions':questions});
               } else {
                   $.publish('sixt.helpcenter.gotBadResponse', questions);
               }
           });
       };

       // revealing public API
       return {
           init: init,
           getAnswerById : getAnswerById,
           getAnswersbyKeyword : getAnswersbyKeyword,
           getSuggestsByString : getSuggestsByString,
           getTopQuestions : getTopQuestions,
       };
    }(window, jQuery));

    /*
     * implement faq center logic
     */
    var initFaqCenter = function() {

        var $helpButton = $('.sx-res-helpandshare-help');
        var $onlineHelpBox = $('#sx-js-res-online-help');

        // add eventlistener - jquery-box callback???
        $helpButton.on('click', function(ev) {

            // initialize the Helpcenter module
            window.SIXT.modules.Helpcenter.init(
                $onlineHelpBox.find('input'),
                $onlineHelpBox.find('.faqcenter__answers'),
                $onlineHelpBox.find('.faqcenter__topquestions'),
                $onlineHelpBox.find('.faqcenter__questiontemplate')
            );

            // hide âWeitere Informationenâ if FAQ Center
            if (self.location.host === 'www.sixt.de') {
                $onlineHelpBox.find('.faqpage__link').hide();
            };

            // hide tel initially
            $onlineHelpBox.find('.hotline__wrapper').hide();
            $onlineHelpBox.find('.t3-hotline-box').hide();

            // show top 5 faq questions (API? V 9.0.32)
            // done on Helpcenter init

            function onUserActed() {
                // check if callcenter is available
                sx_check_ichat.get(function(response){
                    if(response) {

                        // on sixt.de show chat
                        if (self.location.host === 'www.sixt.de') {
                            $onlineHelpBox.find('#sx-res-ichat-wrapper').show();
                        }
                    }
                });

                return false;
            }

            $.subscribe('sixt.helpcenter.userActed', onUserActed);

        });
    };


    /**
     * check if ichat available
     * store response to avoid multiple requests
     *
     * @author  joachim.wendenburg@sixt.com
     *
     */
    var sx_check_ichat =  {

        config: {
            cat: {
                'www.sixt.de': 'Chat_DE_RES',
                'www.sixt.co.uk': 'Chat_UK_RES'
            },
            url: self.location.protocol + '\/\/' + self.location.host + '/iChatClient/JSPClient.jsp?action=STATUS',
            status: false,  // flag if check is already done
            ichat: false    // flag if ichat avail
        },

        /**
         * check if ichat available
         * store response to avoid multiple requests
         *
         * @author  joachim.wendenburg@sixt.com
         *
         */
        get: function(callback) {

            // no info yet if chat is available
            if(!this.config.status) {

                this.config.status =  "hold";

                var cat =  this.config.cat[self.location.host] || false;
                var url =  this.config.url + '&json={%22category%22:%22' + cat + '%22}';
                var obj =  this;

                if(!cat) {
                    return false;
                }

                // check if ichat is avail...
                $.ajax({
                    url: url,
                    success: function(response) {
                        obj.config.status   =  true;
                        obj.config.ichat    =  !!(response === "true");
                        callback(obj.config.ichat);
                    }
                });

            // one request was already send, waiting for response
            } else if(this.config.status === "hold") {

                // try again after a half a sec
                setTimeout(function(){
                    sx_check_ichat.get(callback);
                }, 500);

            // by the state we know check is done
            } else {
                callback(this.config.ichat);
            }
        }
    };

    var sx_ichat_banner =  {
        config: {
            selector: {
                wrap: '#sx-res-ichat-banner',
                head: '.sx-res-ichat-banner-heading',
                content: '.sx-res-ichat-banner-content',
                opened: '.sx-js-res-ichat-banner-opened',
                closed: '.sx-js-res-ichat-banner-closed',
                buttcl: '.sx-js-res-ichat-banner-butt-close',
                sender: '.sx-js-res-ichat-banner-butt-send'
            },
            ref: {},
            ichat: false,
            testchat: false,    // set true to pass ichat-check
            testing: false       // set testoutput
        },

        init: function() {
            var obj =  this;
            sx_check_ichat.get(function(response){
                if(response || obj.config.testchat) {
                    obj.exec_init();
                }
            });
        },

        exec_init: function() {

            // create jquery references
            var s, obj =  this;
            for(s in this.config.selector) {
                this.config.ref[s] =  $(this.config.selector[s]);
            }

            this.config.ref.closed.bind('click', function(){
                obj.openit();
            });

            this.config.ref.buttcl.bind('click', function(){
                obj.closeit();
            });

            this.config.ref.sender.bind('click', function(){
                call_chat();
            });

            // ichat is available;
            this.config.ichat =  true;

            if(this.config.testing) {
                setTimeout(function(){
                    sx_ichat_banner.dplit();
                }, 2000);
            }

            this.db("config", this.config);

            // only once!
            this.exec_init =  function() {}
        },

        openit: function() {
            var obj =  this;
            obj.config.ref.opened.css('display', '');
            obj.config.ref.closed.css('display', 'none');
            this.config.ref.content.slideDown();
        },

        dplit: function() {
            if(!this.config.ichat) {
                return false;
            }
            this.config.ref.wrap.css('display', '');
        },

        closeit: function() {
            this.config.ref.wrap.css('display', 'none');
        },

        resetit: function() {
            this.config.ref.opened.css('display', 'none');
            this.config.ref.closed.css('display', '');
            this.config.ref.content.css('display', 'none');
        },

        db: function(str,out) {

            if(!this.config.testing) {
                return;
            }

            try {
                if(str) {
                    console.info(str);
                }
                if(out) {
                    console.info(out);
                }
            } catch (err) {}
        }
    };


    /**
     * DEPRECIATED !!!
     * use sx_check_ichat.get(callback) instead
     *
     * init ichat
     * @author: jw
     * @params:
     */
    function sx_init_onlinehelp_ichat() {

        var cat =  false;
        switch(self.location.host) {
            case "www.sixt.de":
                cat =  "Chat_DE_RES";
                break;
            case "www.sixt.co.uk":
                cat =  "Chat_UK_RES";
                break;
        }

        if(!cat) {
            return false;
        }

        var url =  self.location.protocol + "\/\/" + self.location.host + "/iChatClient/JSPClient.jsp?action=STATUS&json={%22category%22:%22" + cat + "%22}";

        // check if ichat is avail...
        $.ajax({
            url: url,
            success: function(response) {
                if(response !== "true") {
                    return false;
                }
                // display option in popup
                $("#sx-res-ichat-wrapper").css("display", "");
            }
        });
    }



    // TODO remove after jsbase update
    if(typeof sx_form_to_ajax === "undefined") {
        function sx_form_to_ajax(id, cb) {

            var params  =  $(":input", "#" + id).serializeArray();
            var url     =  $("#" + id).attr('action');

            $.getJSON(url, params, function(response) {
                cb(response);
            });
        }
    }

    /**
     * callback when online-help's email form was send
     * @author: jw
     * @param: json response
     */
    function sx_onlinehelp_email_response(response) {

        var k = (response.err.length > 0)? "err" : "msg";

        var run, i, item, txt =  "";
        for(i = 0; item =  response[k][i]; i++) {
            txt += '<p>' + item['txt'] + '<\/p>';
        }
        $("#sx-js-res-oh-" + k).html(txt).css('display','');
        run =  setTimeout(function(){
            $("#sx-js-res-oh-" + k).fadeOut(function(){
                if(k === "msg"){
                    $.box.close();
                }
            });
        },3000);
    }


    /** ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     *
     * editres
     *
     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /**
     * ctrl radios editreservation
     *
     * @author: jw
     */
     var sx_editres = {

        // some config data
        config: {
            ulclass: 'sx-res-editres-optionlist',
            divclass: 'sx-res-editres-content',
            liclass: 'sx-res-editres-optionlist-item',
            selclass: 'sx-gc-selected'
        },
        // store elements and selected index here
        data: {},
        // callback after data has changed
        fn_data_changed: [],

        /**
         * initialize ctrl radios editreservation
         *
         * @author  jw
         * @return  {void}
         */
        init: function() {

            this.fn_data_changed.push('dpl');

            var obj     =  this;
            var $radios =  $('input[type=radio]', '.' + this.config.ulclass);
            var $divs   =  $('.' + this.config.divclass, '.' + this.config.ulclass).css('display', 'none');
            var $lis    =  $('.' + this.config.liclass, '.' + this.config.ulclass);

            this.data.radios =  $radios;
            this.data.divs   =  $divs;
            this.data.lis    =  $lis;
            this.data.sel    =  [0, 0];
            // loop radios
            $radios.each(function(idx) {
                // store index as data attribute
                var $this =  $(this);
                $this.data('idx', idx);
                // event handler
                $this.click(function() {
                    var idx = $(this).data('idx');
                    obj.set(idx);
                });
            });
            var optionFilter = '#sx-res-editres-' + $('#editres_preselected_option').val();
            // initialize first radio
            var firstRadio = this.data.radios.filter(optionFilter);
            if (!firstRadio.length) {
                firstRadio = this.data.radios.first();
            }

            firstRadio.click();

            // add selected class for relaunch's fake radio
            this.data.lis.has(firstRadio).addClass(this.config.selclass);
        },

        /**
         * set current index as past
         * set given index as current
         *
         * @author  jw
         * @param   {number} index of selected radio
         * @return  {void}
         */
        set: function(idx) {
            this.data.sel[1] = this.data.sel[0];
            this.data.sel[0] = idx;
            this.data_changed();
        },

        /**
         * display content depending on data object
         *
         * @author  jw
         * @return  {void}
         */
        dpl: function() {
            this.data.divs.eq( this.data.sel[1] ).css('display', 'none');
            this.data.divs.eq( this.data.sel[0] ).css('display', 'block');
        },

        /**
         * callback after data were changed
         * loop through functions to call
         *
         * @author  jw
         * @return  {void}
         */
        data_changed: function() {
            var i, fn;
            for (i = 0; fn = this.fn_data_changed[i]; i++) {
                this[fn]();
            }
        },

        db: function() {
            try {
                console.info(this.data);
            } catch(err) {}
        }
    };




    /** ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     *
     * more...
     *
     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /**
     * open terms either as jquery box or return true for native behaviour
     * @author  jw
     * @param   {string} url
     * @return  {boolean}
     */
    function sx_display_terms(href) {
        var is_utils =  window.SIXT || false;
        var bp       =  is_utils? SIXT.utils.get_bp() : 'max';

        if(bp === 'max' || bp === 'full') {
            $.box.open('sx-js-res-info', href);
            return false;
        } else {
            return true;
        }
    }

    function sx_set_cc_select(cc) {
        $("#sx-js-res-zah").val(cc).change();
    }

    function sx_create_ajax_url(act) {
        var module  =  (arguments.length > 1)? arguments[1] : "/php/reservation";
        var query   =  new Date().getTime();
        var url     =  self.location.protocol + "\/\/" + self.location.host;
            url     += module;
            url     += act? ("/" + act) : "";
            url     += "?_=" + query;

        return url;
    }

    function sx_init_agb() {
        // agb's
        if(!$("#sx-js-res-info").length) {
           $('<div><\/div>').appendTo( $('body') ).attr('id', 'sx-js-res-info').css('display','none');
        }
        $("#sx-js-res-info").box({
            'txttitle': _sx_res_txt('agb'),
            'iframe': true,
            'width': '750px',
            'height': '550px'
        });
    }

    function sx_init_bookingconfirmation() {
        if($('#sapoci-form').length >= 1){
            $('#sapoci-form').submit();
        }
    }

     /**
     * check if google stuff is avail at all...
     * call tracking-event method if so
     * @author: jw
     * @params: string category, string action, string label, string value
     */
    function sx_track(cat, act) {
        if(typeof sx_track_event === "undefined") {
            return;
        }
        var cat     =  arguments[0] || false;
        var act     =  arguments[1] || false;
        var label   =  arguments[2] || '';
        var val     =  arguments[3] || false;
        var opt     =  arguments[4] || false;
        if(!cat || !act) {
            return;
        }
        sx_track_event(cat, act, label, val, opt);
    }

    function sx_dpl_youtube_content(href) {

        var is_utils    =  window.SIXT || false;
        var bp          =  is_utils? SIXT.utils.get_bp() : 'max';

        if(bp === 'max' || bp === 'full') {

            // video size
            var _wd     =  560;
            var _ht     =  315;

            var wd    =  (_wd + 20) + 'px';
            var ht    =  (_ht + 5) + 'px';
            var id      =  "sx-display-external-content";
            var $box    =  $('#' + id);

            if(!$box.length) {
                $box =  $('<div><\/div>').appendTo( $('body') ).attr('id', id).css('display','none');
                $($box).box({
                    'iframe': true,
                    'width': wd,
                    'height': ht
                });
            }

            $.box.open(id, href);
            return false;
        } else {
            return true;
        }
    }

    function sx_trackpv(page) {
        if(typeof sx_track_pageview === "undefined") {
            return;
        }
        sx_track_pageview(page);
    }

    // moved to helper.js
    if(typeof sx_is_supported_mobile !== "function") {
         /**
         * TESTING
         * identify main mobile browsers
         * @author: jw
         * @params
         */
        function sx_is_supported_mobile() {
            var reg     = /(android|avantgo|bada\/|blackberry|fennec|dolphin|iemobile|iphone|ipod|ipad|opera mini|opera mobi|palm|symbian|series60)/i;
            //var reg     = /(gecko|android|avantgo|bada\/|blackberry|fennec|dolphin|iemobile|iphone|ipod|ipad|opera mini|opera mobi|palm|symbian|series60)/i;
            var matches =  reg.exec(navigator.userAgent) || false;
            return ( matches? matches[1].toLowerCase() : false );
        }
    }

    /**
     * mobile browsers zoomin when focused input fields
     * have smaller text size than the document body
     *
     * this method prevents this issue
     */
    function prevent_zoomin_issue_for_mobile(){

        //return false;
        if ( typeof SIXT.utils !== "undefined" && SIXT.utils.get_bp() === "small" && sx_is_supported_mobile() === 'iphone' ) {
            $('head meta[name=viewport]').remove();
            $('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0" />');
        }
    }

    /**
     * Update mnum-profile and redirect to booking-confirmation-page or resexpress
     *
     * @author: mw
     */
    function update_mnum_profile(redirect_link) {

        // customer has opportunity to update
        var can_update   = $("#mnum_update").length > 0;

        // customer wants update?
        var wants_update = $("#mnum_update").length > 0 && $("#mnum_update").is(':checked');

        var params  =  {
            'tab_identifier':   $("#sx-tab-identifier").val(),
            'wants_update'  :   wants_update
        };
        var url = sx_create_ajax_url("update_mnum_profile");

        // do ajax call (always when customer can update)
        // if no update wanted we just delete the session-entry (of update-data)
        if (can_update) {
            $.getJSON(url, params, function(response) {
                // do nothing more than redirecting
                if (redirect_link == '') {
                    $('#sx_go_bookingconfirmation').submit();
                } else {
                    self.location.href = redirect_link;
                }
            });
        } else {
            if (redirect_link == '') {
                $('#sx_go_bookingconfirmation').submit();
            } else {
                self.location.href = redirect_link;
            }
        }
    }

    /**
     * Check cargroup-password and reload step2 if correct
     * @author: mw
     * @params:
     */
     function sx_chk_cg_pasw() {

        // reset error dpl
        $("#sx-js-res-cg-error").css('display','none');

        var params  =  {
                'tab_identifier':   $("#sx-tab-identifier").val(),
                'pasw':             $("#sx-res-js-cg-pasw").val()
        };
        var url = sx_create_ajax_url("chk_cg_pasw");

        $.getJSON(url, params, function(response) {
             if (response.err.length) {
                var err =  "";
                for(i in response.err) {
                    err += "<p>" + response.err[i].txt + "<\/p>";
                }
                // dpl error
                $("#sx-js-res-cg-error").html(err).css('display','');
             } else {
                // Password was correct -> directoffer
                var redirect =  self.location.protocol + "\/\/" + self.location.host + '/php/reservation' + response.rec.redirect_link + '&tab_identifier=' + params["tab_identifier"];
                self.location.href = redirect;
             }
        });
     }

     /**
      * Log some params for retargeting issues (ONM-896)
      * @author: mw
      * @params:
      */
     function log_retargeting() {
         var nam1  = $("#nam1").val();
         var nam2  = $("#nam2").val();
         var emai  = $("#emai").val();
         var car   = $("#car_grp").val();
         var value = $("#price_eur").val();
         var tmp   = $("#retargeting_tmstmp").val();

         if (nam1 != '' && nam2 != '' && emai != '' && tmp == '') {
            var params  =  {
                    'tab_identifier':   $("#sx-tab-identifier").val(),
                    'nam1'          :   nam1,
                    'nam2'          :   nam2,
                    'emai'          :   emai,
                    'value'         :   value,
                    'car'           :   car
            };
            var url = sx_create_ajax_url("retarget");

            $.getJSON(url, params, function(response) {
                var time = (new Date()).getTime();
                $("#retargeting_tmstmp").val(time);
            });
         }

         else {
             return false;
         }
     }


    function get_loading_time() {
        try {
            if(!window.performance) {
                return false;
            }
            setTimeout(function(){

                var t =  window.performance.timing;
                var s =  t.navigationStart;
                var e =  t.loadEventEnd;
                var d =  (e -s) / 1000;

                if ( typeof console.info !== "undefined" ) {
                    console.info("pageload: " + d + " sec.");
                }
            }, 2000);

        } catch(err) {}
    }

    function sx_init_reservation_check() {

        // relaunch only
        var $wrap =  $("#sx-reservation-check-wrapper");
        if(!$wrap.length) {
            return;
        }

        sx_datepicker_single();
        //$('.sx-js-datepicker').datepicker( "option", "minDate", null);
    }


    // ----------------------------------------------
    //
    // mobile
    //
    // ----------------------------------------------
    /**
     * @description    popup instead of info-box
     * @author         jw
     * @param          {string} content's container id
     */
     var sx_mobile_popup =  {

        /**
         * init info-box event handler
         * @author  jw
         */
        init: function() {

            var obj =  this;
            $('.sx-gc-button-verysmall-info', '.sx-gc-info-box').click(function(){
                obj.dpl( $("div:first", $(this).parents('.sx-gc-info-box') ) );
            });

            // extend offerconfig object in case it is available
            // sx_offerconfig will be re-initialized with each offerconfig update
            // after checking/unchecking extras
            if(typeof sx_offerconfig === "object") {
                sx_offerconfig.init_mobile =  function() {
                    $('.sx-gc-info-box .sx-gc-button-verysmall-info', '#sx-js-res-offerconfig-data').click(function(){
                        obj.dpl( $("div:first", $(this).parents('.sx-gc-info-box')) );
                    });
                };
            }
        },

        /**
         * create popup containing empty popup wrapper
         * @author  jw
         * @param   {object} dom-element containing innerHTML to load
         */
        dpl: function(el) {

            // since iemobile does not open popups
            // but opens content in the current window
            // and interrupts script
            //
            if(sx_is_supported_mobile() === "iemobile") {
                $(el).box({});
                $.box.open( $(el) );
                return;
            }

            var ht              =  parseInt(screen.availHeight) -40;
            var wd              =  parseInt(screen.availWidth) -40;
            var obj             =  this;
            var url             =  self.location.protocol + "\/\/" + self.location.host + "/php/reservation/mobilepopup";
            var params          =  {};
            this.mobilepopup    =  window.open("", "sx_mobile_info", "width=" + wd +",height=" + ht + ",left=20,top=20");

            with (this.mobilepopup.document) {
                open();
                write("Waiting...");
                close();
            }

            $.ajax({
                url: url,
                data: params,
                type: "GET",
                success: function(htm) {
                    obj.load(htm, el)
                }
            });
        },

        /**
         * replace placeholder within wrapper with content
         * write document into popup;
         * @author  jw
         * @param   {object} dom-element containing innerHTML to load
         */
        load: function(htm, el) {
            var doc =  htm.replace("###INFO###", $(el).html());
            with (this.mobilepopup.document) {
                open();
                write(doc);
                close();
            }
            if(window.focus) {
                this.mobilepopup.focus();
            }
        }
     };


    // ----------------------------------------------
    //
    // webmiles stuff
    //
    // ----------------------------------------------
    function sx_check_wm_script() {

        if(!_wm_widget) {
            return false;
        }

        if( !$('#webmiles-widget').length ) {
            $("<div></div>").appendTo( $("#sx-res-additional-infos-content") ).attr('id', 'webmiles-widget').css({'clear':'both'});
        } else {
            $('#webmiles-widget').css('display','');
        }

        sx_scriptloader(sx_webmiles_url, function(){showWebmilesWidget()}) ;
    };

    /**
     * load script if not available yet
     * execute callback
     * @author  jw
     * @param   {string} url
     * @param   {function} callback
     * @return  {void}
     */
    function sx_scriptloader(url, callback) {

        var b, i, item, s;

        // check availability
        var scripts =  document.getElementsByTagName('script');
        for(i = 0; item = scripts[i]; i++) {
            if( item.src.indexOf(url) !== -1) {
                callback();
                return;
            }
        }

        // create dom element script
        s       =  document.createElement('script');
        s.type  =  'text/javascript';
        s.src   =  url;

        // onload or onreadystatechange event
        if(typeof s.readyState !== 'undefined') {
            s.onreadystatechange =  function() {
                if(s.readyState === "loaded") {
                    callback();
                }
            }
        } else {
            s.onload =  function() {
               callback();
            }
        }
        // append to dom
        document.getElementsByTagName('head')[0].appendChild(s);
    }


    function processWebmilesMember(memberId) {

        // chaos in case of reload with hash
        if(!/^[0-9]+$/.exec(memberId)) {
            var m       =  /memberId\=([0-9]+)/.exec(memberId);
            memberId    =  m[1];
        }

        //alert("Der webmiles Teilnehmer mit der ID '" + memberId + "' hat sich erfolgreich authentifiziert");
        $("#sx-js-res-wmidnr").val(memberId);
        $("#webmiles-widget").css('display','none');
    };

    /**
     * helper to get reservation data for optimizely
     * needs sx_reservationobj_data given by smarty
     *
     * @author  jw
     * @param   {string} data-name
     * @return  {string} data-value
     *
     */
    function sx_get_resdata(p) {
        var ret =  false;
        if(typeof sx_reservationobj_data !== "undefined" && typeof sx_reservationobj_data[p] !== "undefined") {
            ret =  sx_reservationobj_data[p];
        }
        return ret;
    }


    /**
     * xing voucher promo
     *
     * @author  jw
     * @return  {void}
     *
     */
    var sx_partnervoucher_voucher =  function(){

        var config =  {
            butt:       '#sx-js-res-partnervoucher-send',
            form:       '#sx-js-res-partnervoucher-form',
            error:      '#sx-js-res-error',
            message:    '#sx-js-res-message ul',
            testing:    false
        };

        /**
         * testout
         * @author  jw
         * @param   {string|obj} output
         * @return  {void}
         *
         */
        var db =  function(val) {
            if(!config.testing) {
                return false;
            }
            try{
                console.info(val);
            } catch (err) {}

        };

        /**
         * callback ajax response
         * @author  jw
         * @param   {obj} response
         * @return  {void}
         */
        var success =  function(response) {

            var str =  "";
            if(response.err.length) {
                var i, item;
                for(i = 0; item =  response.err[i]; i++) {
                    str += "<p>" + item.txt + "<\/p>";
                }
                $(config.error).html(str).css('display', '');
            } else {
                var voucher;
                for(voucher in response.rec) {
                    str += "<li>" + response.rec[voucher] + "<\/li>";
                }
                 db(str)
                $(config.message).html(str).parent().css('display', '');
            }

            db(response);
        }

        /**
         * collect data and create ajax request
         * @author  jw
         * @return  {void}
         */
        var send =  function() {

            $(config.error).css('display', 'none');
            $(config.message).parent().css('display', 'none');

            var data =  $(config.form).serializeArray();
            var url  =  $(config.form).attr('action');

            $.ajax({
                url: url,
                data: data,
                type: "POST",
                success: success
            });

            db(data);
        };

        $(config.butt).bind('click', send);
    };

    /** ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     *
     * title animation
     *
     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


    var titleBlinker = {
        config: {
            initialTitle: false,
            displayTitle: false,
            titleState: 0,
            animRunner: null,
            animDuration: 1000
        },
        init: function() {
            this.config.initialTitle = document.title;
            this.config.displayTitle = _sx_res_txt('sxAnimTitle');
            $(window).bind("focus", $.proxy(this.handleFocus, this));
            $(window).bind("blur", $.proxy(this.handleBlur, this));
        },
        handleFocus: function() {
            clearInterval(this.config.animRunner);
            document.title = this.config.initialTitle;
        },
        handleBlur: function() {
            clearInterval(this.config.animRunner);
            var obj = this;
            this.config.animRunner = setInterval(function(){
                obj.animTitle();
            }, this.config.animDuration);
        },
        animTitle: function() {
            this.config.titleState = (this.config.titleState === 0) ? 1 : 0;
            document.title = (this.config.titleState === 0) ? this.config.initialTitle : this.config.displayTitle;
        }
    }

    /** ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     *
     * loading spinner - waiting
     *
     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

    /**
     * loading spinner displaying status messages
     * @author  jw
     */
    var sx_waiting =  {

        config: {

            initialized:  false,

            spinner: {
                cl: 'sx-waiting-spinner',
                jq: false,
                css: {
                    'position':     'fixed',
                    'left':         0,
                    'top':          0,
                    'width':        '100%',
                    'min-height':   '100%',
                    'z-index':      '20200',
                    'text-align':   'center',
                    'display':      'none'
                }
            },

            infobox: {
                cl: 'sx-waiting-infobox',
                jq: false,
                css: {
                    'position':     'absolute',
                    'left':         '50%',
                    'top':          '100px',
                    'margin':       '0 0 0 -200px',
                    'width':        '400px',
                    'min-height':   '400px',
                    'overflow':     'auto'
                }
            },
            overlay: {
                cl: 'sx-waiting-overlay',
                jq: false,
                css: {
                    'opacity':      0.6,
                    'background':   '#000000',
                    'width':        '100%',
                    'height':       '100%'
                }
            },

            infotop: {
                cl: 'sx-waiting-infotop',
                jq: false,
                css: {
                    'background': 'transparent url("/static/reservation/svg/logo.svg") no-repeat 50% 50%',
                    'height': '120px',
                    'width': '120px',
                    'margin': '0 auto -35px auto',
                    'text-align': 'center',
                    'z-index': '20203',
                    'position': 'relative'
                }
            },

            infogif: {
                cl: 'sx-waiting-infogif',
                src: '/common/img/app/reservation/default/bg/bg-spinner.gif',
                css: {'margin-top': '17px'}
            },

            infotxt: {
                cl: 'sx-waiting-infotxt',
                jq: false,
                css: {
                    'background':   '#ffffff',
                    'padding':      '65px 20px 20px 20px',
                    'z-index':      '20202',
                    'font-size':    '14px',
                    'color':        '#000000',
                    'margin':       '0',
                    'min-height':   '30px',
                    'overflow':     'hidden'
                }
            },

            banner: {
                sel: '.sx-waiting-banner',
                css: {
                    'display':      'block',
                    'background':   '#ffffff',
                    'padding':      '20px',
                    'border-top':   '1px solid #a2a2a2',
                    'overflow':     'hidden'
                }
            },

            claims: [
                {
                    txt:    'validating_data',
                    jq:     false,
                    cl:     'sx-waiting-claim',
                    css:    {'margin': '0 0 0 400px', 'padding': '0', 'text-align': 'center', 'white-space': 'nowrap', 'display': 'none'},
                    dpl:    false
                },
                {
                    txt:    'calculate_offer',
                    jq:     false,
                    cl:     'sx-waiting-claim',
                    css:    {'margin': '0 0 0 400px', 'padding': '0', 'text-align': 'center', 'white-space': 'nowrap', 'display': 'none'},
                    dpl:    false
                },
                {
                    txt:    'search_bestprice',
                    jq:     false,
                    cl:     'sx-waiting-claim',
                    css:    {'margin': '0 0 0 400px', 'padding': '0', 'text-align': 'center', 'white-space': 'nowrap', 'display': 'none'},
                    dpl:    false
                },
                {
                    txt:    'make_best_offer',
                    jq:     false,
                    cl:     'sx-waiting-claim',
                    css:    {'margin': '0 0 0 400px', 'padding': '0', 'text-align': 'center', 'white-space': 'nowrap', 'display': 'none'},
                    dpl:    false
                }
            ],

            anim: {
                'speed':    '500',
                'pause':    '1500',
                'runner':   false,
                'current':  0
            }
        },

        /**
         * create html and basic styles
         * @author  jw
         * @return  {void}
         */
        init: function() {

            this.sizes();

            var i,
                item,
                $banner =  $(this.config.banner.sel),
                obj     =  this;

            this.config.spinner.jq  =  $('<div><\/div>').appendTo( $('body') ).css( this.config.spinner.css ).addClass( this.config.spinner.cl );
            this.config.overlay.jq  =  $('<div><\/div>').appendTo( this.config.spinner.jq ).css( this.config.overlay.css ).addClass( this.config.overlay.cl );
            this.config.infobox.jq  =  $('<div><\/div>').appendTo( this.config.spinner.jq ).css( this.config.infobox.css ).addClass( this.config.infobox.cl );
            this.config.infotop.jq  =  $('<div><\/div>').appendTo( this.config.infobox.jq ).css( this.config.infotop.css ).addClass( this.config.infotop.cl );
            this.config.infotxt.jq  =  $('<div><\/div>').appendTo( this.config.infobox.jq ).css( this.config.infotxt.css ).addClass( this.config.infotxt.cl );

            // css3 loading spinner USA-1302
            var $loader_circle      =  $('<div><\/div>').appendTo( this.config.infotop.jq ).addClass('loader-circle');
            var $loader_line_mask   =  $('<div><\/div>').appendTo( this.config.infotop.jq ).addClass('loader-line-mask');
            var $loader_line        =  $('<div><\/div>').appendTo( $loader_line_mask ).addClass('loader-line');

            var i, item;
            for(i = 0; item = this.config.claims[i]; i+=1) {
                item.jq =  $('<p><\/p>').appendTo( this.config.infotxt.jq ).css( item.css ).addClass( item.cl ).html( _sx_res_txt(item.txt) );
            }

            this.config.overlay.jq.click(function(){
                obj.hide();
            });

            if($banner.length) {
                $banner.appendTo( this.config.infobox.jq ).css( this.config.banner.css );
            }

            this.config.initialized =  true;
        },
        /**
         * init if neccesary
         * display and start anim
         * @author  jw
         * @return  {void}
         */
        dpl: function() {

            if(!this.config.initialized) {
                this.init();
            }

            clearTimeout(this.config.anim.runner);
            this.config.spinner.jq.css('display', 'block');
            this.anim();
        },
        /**
         * hide and reset
         * @author  jw
         * @return  {void}
         */
        hide: function() {

            if(!this.config.initialized) {
                return;
            }

            clearTimeout(this.config.anim.runner);
            this.config.spinner.jq.css('display', 'none');
            this.config.anim.current =  0;

            var i, item;
            for(i = 0; item = this.config.claims[i]; i+=1) {
                item.jq.css( item.css );
            }
        },
        /**
         * animate claims
         * @author  jw
         * @return  {void}
         */
        anim: function() {

            if(this.config.anim.current  < this.config.claims.length) {

                var obj     =  this;
                var ready   =  this.config.claims[ this.config.anim.current -1] || false;
                var load    =  this.config.claims[ this.config.anim.current   ] || false;

                // hide the current claim
                if(ready) {
                    ready.jq.css( {'display':'none'} );
                }
                // animate appearance of the next claim
                if(load) {

                    load.jq.css({'display': 'block'}).animate({'margin-left': 0}, obj.config.anim.speed, function() {

                        obj.config.anim.current += 1;

                        obj.config.anim.runner =  setTimeout(function() {
                            obj.anim();
                        }, obj.config.anim.pause);
                    });

                }


            }
        },
        /**
         * get window and document sizes
         * @author  jw
         * @return  {void}
         */
        sizes: function() {
            // set current doc-  and viewport height
            this.config.doc_ht                  =  $(document).height();
            this.config.win_ht                  =  $(window).height();
            this.config.win_wd                  =  $(window).width();
            this.config.spinner.css['height']   =  this.config.doc_ht + 'px';
        }
     };

     /**
     * Handles the social media login
     *
     * @author Daniel Hass <daniel.hass@sixt.com>
     * @type {{init: init}}
     */
    sx_social_media_login = {
        /**
         * Initialize the social media login
         */
        init: function () {
            var obj = this;

            $('.sx-social-media-login').delegate('.sx-social-media-icon:not(.active)', 'click', function (event) {
                event.preventDefault();
                obj.sp_login_popup($(this));
            });

            $('.sx-home-login-wrapper').delegate('.sx-gc-active-login', 'click', function(event) {
                event.preventDefault();
                obj.sx_login_popup();
            });


            if (window.addEventListener) {
                addEventListener("message", obj.listener, false)
            } else {
                attachEvent("onmessage", obj.listener)
            }

            $('.sx-js-res-login-state').delegate('.sx-social-logout', 'click', function(event) {
                event.preventDefault();
                obj.sx_logout();
            });
        },
        /**
         * Listen to the social media auth from the popup
         * @param event
         */
        listener: function (event) {
            if (event.origin.indexOf("sixt")) {
                response = JSON.parse(event.data);
                if (response.sx_token) {
                    // is sx customer and connected
                    sx_social_media_login.login(response.kdnr);
                } else if (response.sp_email) {
                    // is not a customer
                    sx_social_media_login.new_connection(response);
                }
            }
        },
        /**
         * Calls the ajax login
         * @param kdnr
         * @param _profile_choosed
         */
        login: function (kdnr, _profile_choosed) {
            var _profile_choosed = (typeof _profile_choosed === null) ? null : _profile_choosed;
            var url = sx_create_ajax_url('login.social_login');
            var params = {
                'ident': kdnr,
                'tab_identifier': $('#sx-tab-identifier').val(),
                'wants_permanant': $("#sx-js-res-login-permanent").is(":checked")? 1 : 0,
                'profile_choosed': _profile_choosed
            };

            $.getJSON(url, params, function (response) {
                if (!response.err.length > 0) {
                    if(response.rec['mnum_list']) {
                        //show profile selection
                        sx_login.mnum_html(response.rec['mnum_list'], 2);
                    } else {
                        $.box.close();
                        sx_login.welcome_html(response.rec);
                        //if s4 login prefill customer details
                        if($('#emai').length > 0) {
                            sx_social_media_login.prefill_form(kdnr);
                        }
                    }
                } else {
                    sx_social_media_login.show_error_msg(response.err);
                }
            });
        },
        /**
         * Send email to customer to ask for connection
         * @param auth_data
         */
        new_connection: function(auth_data) {
            if (auth_data) {
                var url = sx_create_ajax_url('login.new_connection');

                if(auth_data.sp_email) {
                    var customer_name = auth_data.sp_name.split(' ');
                    var params = {
                        'kdnr': auth_data.kdnr,
                        'sp_user_id': auth_data.sp_user_id,
                        'sp': auth_data.sp,
                        'qual': auth_data.qual,
                        'email': auth_data.sp_email,
                        'first_name': customer_name[0],
                        'last_name': customer_name[customer_name.length - 1],
                        'tab_identifier': $('#sx-tab-identifier').val()
                    };
                } else {
                    var params = {
                        'kdnr': auth_data.kdnr,
                        'sp_user_id': auth_data.sp_user_id,
                        'sp': auth_data.sp
                    }
                }

                $.getJSON(url, params, function (response) {
                    if (!response.err.length > 0) {
                        var text = response.rec['text'];

                        if(response.rec['mnum_list']) {
                            //show profile selection
                            sx_login.mnum_html(response.rec['mnum_list'], {
                                'sp': response.rec.sp_data['sp'],
                                'sp_user_id': response.rec.sp_data['sp_user_id']
                            });
                        } else if (response.rec['is_customer']){
                            // show message if no multiple profiles found
                            var is_customer = response.rec['is_customer'];
                            var message = '<strong class="sx-js-res-login-state-name">' + text['welcome'] + ', <span style="text-transform: uppercase;">' + response.rec['name'] + '</span></strong>';
                            message += ' <a class="sx-social-logout">' + text['logout'] + '</a><br/>';

                            if (is_customer == 1) {
                                //message += ' <a class="sx-gc-active">' + text['logout'] + '</a><br />';
                                message += '<span class="sx-js-res-login-state-txt"><strong>' + text['send_mail'] + '</strong> <br /><br />' + text['please_click'] + '</span>';

                            } else {
                                message += '<br />';
                                message += '<span class="sx-js-res-login-state-txt">' + text['is_sx_customer'] + ' <a href="#" class="sx-gc-active-login" title="Login">' + text['login'] + '</a></span>';
                            }
                            $.box.close();
                            sx_social_media_login.show_sx_customer_option(message);

                            // bind click event for logout button
                            $('.sx-js-res-login-state a:first').bind('click', function(e) {
                                e.preventDefault();
                                sx_login.exec_logout();
                            });


                            $('.sx-gc-active').show();
                            //if s4 login prefill customer details
                            if($('#emai').length > 0) {
                                $('#nam2').val(customer_name[0]);
                                $('#nam1').val(customer_name[customer_name.length - 1]);
                                $('#emai').val(auth_data.sp_email);
                            }
                        }
                    } else {
                        sx_social_media_login.show_error_msg(response.err);
                    }
                });
            } else {
                alert('Es ist ein Fehler aufgetreten. bitte versuchen Sie es erneut.');
                window.location.reload();
            }
        },
        /**
         * Shows the popup where the user can login to his account if there is one
         */
        show_sx_customer_option: function(message) {
            $("#sx-has-social-login").val('1');

            // hide login form and show message
            $(".sx-js-res-login-state").html(message);
            $(".sx-gc-active").hide();
            $("#sx-js-res-login-form").hide();
            $("#sx-js-open-login").css('display', 'none');
            $(".sx-js-res-login-state").show();
            $('#sx-js-res-login-button').show();
        },
        /**
         * Prefills the customer details form
         */
        prefill_form: function(kdnr) {
            var url = sx_create_ajax_url('login.get_customer');
            var params = {
                'ident': kdnr,
                'tab_identifier': $('#sx-tab-identifier').val()
            };
            $.getJSON(url, params, function (response) {
                if (!response.err.length > 0) {
                    var customer = response.rec.customer;
                    // set general data
                    $('#nam2').val(customer.nam2);
                    $('#nam1').val(customer.nam1);
                    $('#emai').val(customer.emai);
                    $("#anr option[value='"+customer.anr+"']").attr('selected',true);
                    $("#otit option[value='"+customer.otit+"']").attr('selected',true);

                    // set telephone
                    var tel = '';
                    var tel_arr = customer.tel.split('-');
                    var tel_cc = tel_arr[0];
                    for (var i=0; i < tel_arr.length; i++) {
                        tel += tel_arr[i];
                    }
                    $("#tel_cc option[value='"+tel_cc+"']").attr('selected',true);
                    $('#tel').val(tel.replace(tel_cc, ''));

                    // set address
                    if(customer.str.length > 0 ) {
                        sx_sync_ck_with_content(this.id, null, true);
                        $('#sx-res-cust-address').attr('checked',true);
                        $('.sx-res-customer-content').show();
                        $('#drstr').val(customer.str);
                        $('#drplz').val(customer.plz);
                        $('#drort').val(customer.ort);
                    }
                    $('#sx-js-res-login-form').fadeOut();
                    $("#sx-js-open-login").css('display', 'none');
                    $('#sx-js-res-rentaldetails').hide();

                } else {
                    sx_social_media_login.show_error_msg(response.err);
                }
            });
        },
        /**
         * Open the popup for social media auth
         * @param socialMediaIcon
         */
        sp_login_popup: function (socialMediaIcon) {
            var socialMedia = $(socialMediaIcon).data('socialMedia');
            // activate the social media button
            $('.sx-social-media-icon.active').removeClass('active');
            $(socialMediaIcon).addClass('active');

            $('#sx-social-media-popup').load(socialMediaIcon.attr('href'));

            var url = socialMediaIcon.attr("href");
            var windowName = "Social Media Login";
            var windowSize = "width=800,height=520";

            window.open(url, windowName, windowSize);
        },
        /**
         * Open the popup for sixt login and social media connection
         */
        sx_login_popup: function() {
            $('.sx-res-login-state').attr('style','display:block!important'); //prevent the welcome text from hiding
            $('.sx-gc-active-login').hide(); // hide the login button
            $('.sx-social-media-login').hide(); // hide the social media buttons
            $('#sx-js-res-login-form').show(); // show the login form
            $("#sx-js-open-login").css('display', '');
        },
        /**
         * Opens an error dialog popup
         */
        show_error_msg: function(errors) {
            var i, item, error_txt =  "";
            for(i = 0; item =  errors[i]; i++) {
                error_txt += item['txt'] + "\n";
            }
            $.box.jalert(error_txt, "OK");
            return;
        },
        /**
         * Prepares the login form if customer found but not connected
         */
        prepare_optional_login: function(label) {
            $("#sx-js-res-login-form").show();
            $("#sx-js-open-login").css('display', '');
            $("label[for='sx-dpl-login']").text(label);
        },
        /**
         * Optional Logout from social login on start page
         */
        sx_logout: function() {
            $.box.jwait();

            var url     =  sx_create_ajax_url("login.logout");
            var params  =  {
                'tab_identifier':   $("#sx-tab-identifier").val(),
                'tpl':              sx_reservation_tpl
            };

            if($('.sx-social-media-icon.active').length) {
                $('.sx-social-media-icon.active').removeClass('active');
            }

            $.getJSON(url, params, function(response) {
                if (response.err.length > 0) {
                    sx_social_media_login.show_error_msg(response.err[0]['txt']);
                    return;
                } else {
                    $('.sx-res-login-state').attr('style','display:none'); //prevent the welcome text from hiding
                    $('.sx-gc-active-login').show(); // hide the login button
                    $('.sx-social-media-login').show(); // hide the social media buttons
                    $('.sx-js-res-login-state-name').html('');
                    $("#sx-js-open-login").css('display', '');
                    $.box.close();
                }
            });
        }
    };

    var sx_mobile_banner = (function() {
        function checkIfDisplayed() {
            var isSupportedMobile =  sx_is_supported_mobile();
            var isTPIPage =  !!(self.location.search.indexOf('tpi=') !== -1);
            var hasBannerElement = $('#sx-js-mobile-banner').length > 0;

            if(!isSupportedMobile || isTPIPage || !hasBannerElement) {
                return false;
            } else {
                return true;
            }
        }
        function getUrlforAppleApp() {
            return 'https://itunes.apple.com/app/sixt-rent-a-car/id295079411';
        }
        function getUrlforAndroidApp(host) {
            var urlMap = {
                "www.sixt.at"   : 'https://app.adjust.com/anprhs',
                "www.sixt.be"   : 'https://app.adjust.com/1ao6ug',
                "www.sixt.ch"   : 'https://app.adjust.com/mwxnr3',
                "www.sixt.de"   : 'https://app.adjust.com/i20d3a',
                "www.sixt.es"   : 'https://app.adjust.com/9esjf8',
                "www.sixt.fr"   : 'https://app.adjust.com/wz2wnt',
                "www.sixt.nl"   : 'https://app.adjust.com/lc3zga',
                "www.sixt.co.uk": 'https://app.adjust.com/5tcrsq',
                "www.sixt.com"  : 'https://app.adjust.com/wwl0li',
                "default"       : 'https://play.google.com/store/apps/details?id=com.sixt.reservation'
            };
            return urlMap[host] || urlMap['default'];
        }
        return {
            init: function() {
                if (!checkIfDisplayed()) { //Return and Do nothing for non-mobile, tpi page, non relaunch;
                    return;
                }

                var src;
                var url;
                var text;

                switch(sx_is_supported_mobile()) {
                    case "android":
                        src = '/common/img/app/typo3/typo3-corporate/default/teaser/mobile-banner-google.png';
                        url = getUrlforAndroidApp(window.location.host);
                        text = _sx_res_txt('text_android');
                        break;
                    case "ipad":
                    case "ipod":
                    case "iphone":
                        if (/CriOS/.test(window.navigator.userAgent)) {
                            src = '/common/img/app/typo3/typo3-corporate/default/teaser/mobile-banner-apple.png';
                            url = getUrlforAppleApp(window.location.host);
                            text = _sx_res_txt('text_iphone');
                        }
                        break;
                }

                if (src && url && text) {
                    var $html = $('#sx-js-mobile-banner').detach().attr('style', '').on('click', '.sx-gc-close', function() {
                        $html.remove();
                    });
                    $html.find('.sx-mobile-app-text a').attr('href', url);
                    $html.find('.sx-mobile-app-text img').attr('src', src);
                    $html.find('.sx-mobile-app-text p').html(text);
                    $('body').prepend($html);
                }
            }
        }
     })();
