    /**
     * start.js
     *
     * @author:     jw
     * created:     05.10.2010
     * needs:       jquery-1.4.2.js and jquery.ddlist-1.1.js
     *
     *
     */

    /** ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     *
     * home tabs
     *
     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /**
     * init home local stuff
     * @author: jw
     * @params:
     */
    var sx_location =  {

        lang_support:   false,
        lang:           false,
        liso_ip:        false,
        liso:           false,
        lang_match:     false,
        liso_match:     false,
        is_init:        false,

        /**
         * init localizing infos home
         * @author: jw
         * @params:
         */
        init: function() {
            // flag if initialized
            this.is_init =  true;
            if(typeof sx_location_info === "undefined" || !sx_location_info) {
                return;
            }

            var i, l;
            var httpinfo        =  sx_location_info["http_accept_language"].substr(0,5); // check the first 5 chars only

            this.lang           =  httpinfo.substr(0,2);
            this.lang_support   =  sx_location_info["supported_languages"].split(",");
            this.liso_ip        =  sx_location_info["liso"];
            this.liso           =  (httpinfo.substr(2,1) === "-")? httpinfo.substr(3,2).toUpperCase() : this.ip_liso;

            for(i = 0; l = this.lang_support[i]; i++) {
                if(this.lang === l) {
                    this.lang_match =  l;
                    break;
                }
            }

            if(this.liso_ip === this.liso) {
                this.liso_match =  true;
            }
        },

        get: function() {
            if(!this.is_init) {
                this.init();
            }
            return {
                lang_support:   this.lang_support,
                lang:           this.lang,
                liso_ip:        this.liso_ip,
                liso:           this.liso,
                lang_match:     this.lang_match,
                liso_match:     this.liso_match
            }
        },

        check: function() {

            if(!this.is_init) {
                this.init();
            }

            if(this.liso && !this.liso_match) {
                this.domain_mismatch();
                return false;
            }

            if(this.lang && !this.lang_match) {
                this.language_mismatch();
                return false;
            }
        },

        domain_mismatch: function() {
            //$.box.jalert("Land-Domain passt nicht!", "OK");
        },

        language_mismatch: function() {
            //$.box.jalert("Sprache-Domain passt nicht!", "OK");
        }
    };

    /**
     *
     */
    sx_teaser_slider_basic = {
        currentInd: 0,
        startX: 0,
        gridElements: $('.t3-content-division-invert-dark .t3-grid-wrapper .t3-grid-33'),
        gridButtonParent: null,
        gridButtons: null,

        init: function() {
            var that = this;
            var divs = '';

            $.each(this.gridElements, function(index, value) {
                divs = divs + '<div></div>'
            });

            this.gridButtonParent = $("<div id='t3-js-teaser-icons' class='t3-teaser-icons' style='height: 15px; display: block;'>" + divs + "</div>");
            
            // Inject grid buttons and id's
            $('.t3-content-division-invert-dark .t3-grid-wrapper').append(this.gridButtonParent);
            this.gridButtons = $('.t3-content-division-invert-dark .t3-grid-wrapper #t3-js-teaser-icons div');

            $.each(this.gridButtons, function(index) {
                $(that.gridButtons[index]).data( "id", index );
            });

            this.handleResize();

            $(window).on('resize', function () {
                that.handleResize();
            });

            $.each(this.gridElements, function(index, value) {
                // listen any touch event
                value.addEventListener('touchstart', handleTouchEventStart, false);
                value.addEventListener('touchend', handleTouchEventEnd, false);

                function handleTouchEventEnd(e) {
                    if ($(window).width() < 499) {
                        var diff = startX - e.changedTouches[0].screenX;
                        
                        if ((diff > 10) || (diff < -10)) {
                            if (diff < 0) {
                                // left
                                changeCurrentInd(-1);
                                that.changeImage(that.currentInd);
                            }
                            else {
                                // right
                                changeCurrentInd(+1);
                                that.changeImage(that.currentInd);
                            }
                        }
                    }
                }

                function handleTouchEventStart(e) {
                    startX = e.touches[0].screenX;
                }

                function changeCurrentInd(val) {
                    that.currentInd = that.currentInd + val;
                    if (that.currentInd > 2) {
                        that.currentInd = 2;
                    }

                    if (that.currentInd < 0) {
                        that.currentInd = 0;
                    }
                }
            });
        },

        changeImage: function(currentInd) {
            this.gridElements.css('display', 'none');
            this.gridButtons.removeClass('sx-selected');

            $(this.gridElements[currentInd]).toggle();
            $(this.gridButtons[currentInd]).addClass('sx-selected');
        },

        handleResize: function() {
            this.changeImage(this.currentInd);
            this.gridButtonParent.css('display', 'block');
            this.gridButtons.css('visibility', 'visible');
            this.gridElements.css('width', '100%');
            this.gridElements.css('padding', '0px 15px');

            var that = this;
            this.gridButtons.on('click',
                function (e) {
                    that.currentInd = $(this).data('id');
                    that.changeImage(that.currentInd);
                }
            );

            if ($(window).width() > 499) {
                this.gridButtonParent.css('display', 'none');
                this.gridButtons.css('visibility', 'hidden');
                this.gridElements.css('display', 'block');
                this.gridElements.css('width', '33.33%');
                this.gridElements.css('padding', '10px');
            }
        }
    };

    /**
     * topoffer object
     *
     * @author  joachim.wendenburg@sixt.de
     */
    sx_home_topoffer = {

        offer : 0,
        autorun: false,
        run: {
            staticimages: false,
            tradedoubler: false
        },
        done: {
            staticimages: false,
            tradedoubler: false
        },
        loader: false,
        count: 0,

        /**
         * init topoffer
         *
         * @author  joachim.wendenburg@sixt.de
         * @return  {void}
         */
        init: function() {

            // do we have a topoffer/tradedoubler stage at all?
            if(!$('#sx-home-stage-wrapper').length) {
                return false;
            }

            // make sure autorun is dead
            var obj =  this;
            $(document).click(function(){
                clearTimeout(obj.autorun);
            });

            // do we deal with lkw-home and have typo3-content to add
            if($("#sx-js-home-lkw-services-source").length) {
                this.init_lkw_home();
            }
            // pkw-home, init tradedoubler or static images
            else {
                this.check_image("staticimages", 0);
                this.check_image("tradedoubler", 0);
                this.check_image("adtag", 0);
                // preload css-bg for loading carpics
                this.loader     =  new Image();
                this.loader.src =  "/common/img/app/base/tt_corporate/topoffer-loader.gif";
            }
            this.check_count();
        },

        /**
         * check if tradedoubler or static images are available
         * if not remove list items
         *
         * @author  joachim.wendenburg@sixt.de
         * @param   {string} modus (tradedoubler or staticimages)
         * @param   {number} counter to control timeouts
         * @return  {void}
         */
        check_image: function(mod, cnt) {

            cnt ++;
            var ht;
            var obj =  this;
            var ok  =  false;

            // try{ console.info("check_image - mod: " + mod + ", cnt: " + cnt) }catch(err){};
            if($("#sx-js-home-topoffer-list-" + mod + "-item").length) {

                // do we have an image?
                if($("#sx-js-home-topoffer-list-" + mod + "-item img").length) {

                    // does img has an height larger 200px?
                    ht  =  $("#sx-js-home-topoffer-list-" + mod + "-item img:first").get(0).height;
                    if(ht < 200) {
                        // check up to 5 times if image is available
                        if(cnt < 5) {
                            this.run[mod] =  setTimeout(function(){obj.check_image(mod, cnt)}, 500);
                            return;
                        }
                    } else {
                        ok =  true;
                    }

                // do we have an object tag?
                } else if($("#sx-js-home-topoffer-list-" + mod + "-item object").length) {
                     ok =  true;
                }

                if(ok) {
                    // after image check succeded set li visible
                    $("#sx-js-home-topoffer-list-" + mod + "-item").css('visibility', 'visible');
                } else {
                    // after image check failed remove li-items
                    $("#sx-js-home-topoffer-list-" + mod + "-item").remove();
                    $("#sx-js-home-topoffer-list-" + mod + "-icon").remove();
                }

            }
            // store current nimber of images
            this.count      =  $('li', '#sx-js-home-topoffer-list').length;

            this.done[mod]  =  true;
            this.dpl();
        },

        /**
         * hide buttons if only one item
         *
         * @author  joachim.wendenburg@sixt.de
         * @return  {void}
         */
        check_count: function() {
            // nore list items avail, nothing to do
            if(this.count > 1) {
                return;
            }
            // hide buttons etc cause only one item available
            $(".sx-js-res-offer-item").css('display','none');
        },

        /**
         * initialize eventhandler and set first offer
         *
         * @author  joachim.wendenburg@sixt.de
         * @return  {void}
         */
        dpl: function() {

            // try{ console.info("dpl - si: " + this.done.staticimages + ", td: " + this.done.tradedoubler) }catch(err){};
            // static or tradeoubler-check is not done yet...
            if( !this.done.staticimages || !this.done.tradedoubler ) {
                return;
            }

            var obj =  this;

            // now initialize topoffer list
            var li  =  $("#sx-js-home-topoffer-list li");
            var lio =  $("#sx-js-home-topoffer-overview li");

            // events for next, back and overview icons
            $("#sx-js-offer-back").unbind('click').click(function() {
                var idx =  (obj.offer > 0)? obj.offer -1 : li.length -1;
                obj.set(idx);
            });
            $("#sx-js-offer-next").unbind('click').click(function() {
                var idx  =  (obj.offer < li.length -1)? obj.offer +1 : 0;
                obj.set(idx);
            });
            $(lio).each(function(i){
                $(this).click(function(){
                    obj.set(i);
                });
            });

            // init the first offer
            this.set(0);
        },

        /**
         * display offer and highlight depending dot-icon
         *
         * @author  joachim.wendenburg@sixt.de
         * @param   {number} index of list-item to start
         * @return  {void}
         */
        set: function(idx) {
            var li  =  $("#sx-js-home-topoffer-list li");

            li.css('display','none');
            li.eq(idx).css('display', '');
            this.offer  =  idx;

            var lio     =  $("#sx-js-home-topoffer-overview li");
            lio.removeClass("sx-gc-selected");
            lio.eq(idx).addClass("sx-gc-selected");

            // use this for preloading
            // this.imgload();

            // just load the current pic "in time"
            var img =  $('img:first', li.eq(idx));
            var src =  img.data('src') || false;
            // now obsolete
            img.data('src', false);
            // modify src if avail
            if(src) {
                img.attr('src', src).load(function(){
                    $(this).css('background','none')
                });
            }
        },

        /*
        imgload: function() {

            var li, img, src, i, item, loading =  [
                this.offer,
                (this.offer < this.count +1)? this.offer +1 : 0,
                (this.offer > 0)? this.offer -1 : this.count -1
            ];

            for(i = 0; item = loading[i]; i +=1) {
                li  =  $("#sx-js-home-topoffer-list li");
                img =  $('img:first', li.eq(item));
                src =  img.data('src') || false;
                // now obsolete
                img.data('src', false);
                // modify src if avail
                if(src) {
                    img.attr('src', src);
                }
            }
        },
        */

        init_lkw_home: function() {
            $("#sx-js-home-lkw-services-wrapper").append( $("#sx-js-home-lkw-services-source") ).css('display', 'block');
            sx_lkw_pagina.init();
        },

        /**
         * execute autorun
         *
         * @author  joachim.wendenburg@sixt.de
         * @param   {number} duration
         * @return  {void}
         */
        do_autorun: function() {

            // timeout duration as param or default value?
            var duration =  (arguments.length && !isNaN(arguments[0]))? arguments[0] : 3000;

            // execute next-click
            $("#sx-js-offer-next").click();

            // now start timeout again to execute autorun after duration
            var obj         =  this;
            this.autorun    =  setTimeout(function(){
                obj.do_autorun(duration);
            }, duration);
        },

        /**
         * remove tradedoubler for ab test
         *
         * @author  joachim.wendenburg@sixt.de
         * @return  {void}
         */
        remove_td: function() {

            clearTimeout(this.run['tradedoubler']);
            this.done['tradedoubler'] =  true;

            $("#sx-js-home-topoffer-list-tradedoubler-item").remove();
            $("#sx-js-home-topoffer-list-tradedoubler-icon").remove();

            this.dpl();
        }
    };

    /**
     * lkw service selector
     * @author: jw
     */
    var sx_lkw_pagina =  {
        offers: false,
        offers_pp: 3,
        page_lng: 0,
        page_curr: 1,

        /**
         * init selector
         * @author: jw
         * @param:
         */
        init: function() {
            var obj         =  this;
            this.offers     =  $("#sx-js-home-lkw-services-wrapper li");

            // no next/back neccessary, not enough items
            if(this.offers.length <= this.offers_pp) {
                $("#sx-js-offer-back").css('display', 'none');
                $("#sx-js-offer-next").css('display', 'none');
                $("#sx-js-home-lkw-services-wrapper li").css('display', '');
                return;
            }

            // we have as many steps as li's
            // each step displays three items
            // each step moves item's position one to the left/right
            // add class-names depending on steps when item is visible
            //
            this.offers.each(function(i) {
                var k, p = i +1;
                for(k = 0; k < obj.offers_pp; k++) {
                    if(obj.offers[i +k]) {
                        $(obj.offers[i +k]).addClass("sx-res-lkw-service-page-" + p);
                    } else {
                        obj.page_lng =  i;
                        return false;
                    }
                }
            });
            // event-handler for buttons
            $("#sx-js-offer-back").click(function(){
                obj.down();
            });
            $("#sx-js-offer-next").click(function(){
                obj.up();
            });
            this.dpl();
        },

        /**
         * display current step and modify button's class
         * @author: jw
         * @param:
         */
        dpl: function() {
            $(this.offers).css('display','none');
            $(".sx-res-lkw-service-page-" + this.page_curr).css('display','');

            if(this.page_curr === 1) {
                $("#sx-js-offer-back").addClass("sx-offer-inactive");
            } else if(this.page_curr === this.page_lng) {
                $("#sx-js-offer-next").addClass("sx-offer-inactive");
            } else {
                $("#sx-js-offer-back").removeClass("sx-offer-inactive");
                $("#sx-js-offer-next").removeClass("sx-offer-inactive");
            }
        },

        /**
         * count up until last item is visible
         * @author: jw
         * @param:
         */
        up: function() {
            if (this.page_curr < this.page_lng) {
                this.page_curr ++;
            }
            this.dpl();
        },

        /**
         * count down until first item is visible
         * @author: jw
         * @param:
         */
        down: function() {
            if (this.page_curr > 1) {
                this.page_curr --;
            }
            this.dpl();
        }
    };

    /** ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     *
     * fleet jump in...
     *
     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    var sx_fleet_start =  {

        is_fleet: false,

        /**
         * from_fleet check and data load
         * @author  jw
         * @return  {void}
         */
        init: function() {
            if(typeof sx_from_fleet === "undefined") {
                return false;
            }

            var obj         =  this;
            this.is_fleet   =  true;

            var params      =  {
                'ctyp':  sx_from_fleet.ctyp || '',
                'liso':  sx_from_fleet.liso || '',
                'crs':   sx_from_fleet.crs || '',
                'uci':   sx_from_fleet.uci || '',
				'posl':  sx_from_fleet.posl || '',
                'ref':   sx_from_fleet.ref || '',
				'tab_identifier': $('#tab-identifier').val()
            };

            $.getJSON(sx_from_fleet.url, params, function(response) {
                if (response.err.length > 0) {
                    // create error html
                    var out =  "";
                    for (var i = 0; i < response.err.length; i++) {
                        out += "<p>" + response.err[i]['txt'] + "<\/p>";
                    }
                } else {
                    obj.create_start_fleet_html(response);
                }
            });
        },

        /**
         * add html
         * @author  jw
         * @return  {void}
         */
        create_start_fleet_html: function(response) {
            if($("#sx-js-fleet-content").length) {
                // default
                $("#sx-js-fleet-content").html(response.htm.txt);
            } else if($(".t3-teaser-wrapper").length) {
                // relaunch 2015
                $(".t3-teaser-wrapper:first").html(response.htm.txt);
            } else if ($('#t3-js-teaser-container').length) {
                // horizontal ibe
                $('#t3-js-teaser-container').addClass('sx-fleetimage-container').html(response.htm.txt);

                var $hinttext       = this.create_start_fleet_hint(response);
                var $header         = this.create_start_fleet_header(response);
                var $equipment      = this.create_start_fleet_equipment(response);
                var $restrictions   = this.create_start_fleet_restrictions(response);
                var $backlink       = this.create_start_fleet_backlink(response);
                $('#sx-js-start-fleet-data')
                    .append($header)
                    .append($equipment)
                    .append($restrictions)
                    .append($hinttext)
                    .append($backlink)
                    .css('display', 'block');
            }
        },

        create_start_fleet_header: function(response) {
            return $('<h2><\/h2>').addClass('sx-start-fleet-header').html(response.rec.example_name);
        },

        create_start_fleet_hint: function(response) {
            // append hint only if from price available
            var priceFrom = response.rec.price_from || '';
            if (priceFrom === '') {
                return '';
            }

            var i,
                item,
                val;

            var hinttext        = _sx_res_txt('hinttext');
            var prepaid_pref    = _sx_res_txt('prepaid_pref');
            var taxInfo = _sx_res_txt('incl_mwst');
            if (response.rec['include_tax'] == 'N') {
                taxInfo = _sx_res_txt('excl_taxes');
            }

            var replacements = [
                'prpd', 'uci_snamwww',
                'uda', 'uti',
                'rda', 'rti',
                'aeda', 'uhr'
            ];
            for (i = 0; item = replacements[i]; i += 1) {
                val = response.rec[item] || '';
                if (item === 'prpd') {
                    val = (val === 'Y') ? prepaid_pref : '';
                }
                hinttext = hinttext.replace('###' + item + '###', val);
            }

            $hintext = $('<p><\/p>').addClass('sx-start-fleet-hint')
                .html(hinttext + ' ' + taxInfo);

            return $hintext;
        },

        create_start_fleet_equipment_li: function(val, css) {
            var pref    = 'sx-equipment-';
            var $span   = $('<span><\/span>');
            var $li     = $('<li><\/li>').addClass(pref + css);
            $li.append($span).append(val);
            return $li;
        },

        create_start_fleet_equipment: function(response) {
            var i,
                item,
                val;

            var li_key,
                li_val;

            var features    = ['aircond', 'tuer', 'seat', 'anko', 'anta', 'trnsm', 'navi', 'cbm', 'load'];
            var $list       = $('<ul><\/ul>');
            var $header     = $('<h4><\/h4>').html(_sx_res_txt('equipment'));

            for (i = 0; item = features[i]; i += 1) {

                li_key  = false;
                li_val  = false;

                val = response.rec[item] || '';
                val = val.replace(' ','');

                if (!val || val === '0') {
                    continue;
                }

                switch (item) {
                    case 'aircond':
                        if (val === "1" || val === "y" || val === "Y") {
                            li_val  = _sx_res_txt('aircond');
                        }
                        break;
                    case 'tuer':
                        li_val  = val + ' ' + _sx_res_txt(item);
                        item    = (val > 3)? 'tuer-4' : 'tuer-2';
                        break;
                    case 'trnsm':
                        li_val  = _sx_res_txt(item + val);
                        break;
                    case 'navi':
                        li_val  = val? _sx_res_txt(item) : false;
                        break;
                    default:
                        li_val  = val + ' ' + _sx_res_txt(item);
                }
                if (li_val) {
                    $list.append(this.create_start_fleet_equipment_li(li_val, item));
                }
            }

            var $equipment = $('<div><\/div>').addClass('sx-start-fleet-equipment').append($header).append($list);
            return $equipment;
        },

        create_start_fleet_restrictions: function(response) {
            var $list       = $('<ul><\/ul>');
            var $header     = $('<h4><\/h4>').html(_sx_res_txt('restrictions'));

            var min_age     =  response.rec.min_age || false;
            var min_fskl    =  response.rec.min_fskl || false;
            var $li;

            if (min_age) {
                $li = $('<li><\/li>').addClass('sx-restrictions-min_age').append($('<span><\/span>')).append(min_age + ' ' + _sx_res_txt('years'));
                $list.append($li);
            }
            if (min_fskl) {
                $li = $('<li><\/li>').addClass('sx-restrictions-min_fskl').html(_sx_res_txt('license') +': ' + _sx_res_txt(min_fskl) + min_age);
                $list.append($li);
            }
            var $restrictions = $('<div><\/div>').addClass('sx-start-fleet-restrictions').append($header).append($list);
            return $restrictions;
        },

        create_start_fleet_backlink: function(response) {

            var url = '/php/fleet/';
            if (response.rec.ctyp === 'P') {
                url = url + 'vehicle_group_list_dynamic';
            } else {
                url = url + 'lkw_group_list_dynamic';
            }
            $atag     = $('<a></a>').attr('href', url).addClass('sx-link sx-link-strong sx-link-norm-back').html(_sx_res_txt('backlink'));
            $wrapper  = $('<div><\/div>').addClass('sx-gc-backlink-wrapper').append($atag);
            return $wrapper;
        }
    };

    /** ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     *
     * booking station suggest
     *
     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    var sx_station_suggest =  {

        //testing: true,
        testing:            false,

        // delay
        run:                false,
        // store nearby search string
        nearby_search:      false,
        // store default input header values
        hd_pickup_val:      false,
        hd_return_val:      false,
        // store last response
        last_response:      false,
        // not done yet, waiting for responses
        is_pending:         false,
        // de-activate autofill return
        sx_regrep:          false,
        sx_pugrep:          false,
        // we deal with a partner, used in sx_offer_request
        sx_partner_pu:      false,
        sx_partner_ret:     false,

        sx_search_pu:       false,
        sx_search_ret:      false,

        has_google_map:     true,
        write_stationinfo:  true,

        return_as_pickup:   true,

        event_observers: {
            "set_as_pickup": []
        },

        // set pre-selected li just after open ddlist
        // otherwise google is unable to get size
        //
        exec_init_sel: {
            'sx-js-res-pu-location' : false,
            'sx-js-res-ret-location' : false
        },

        // sorry collegues ;-)
        // ATTN! lower case!
        badwords: [
            "avis autovermietung",
            "europcar autovermietung",
            "budget autovermietung",
            "buchbinder autovermietung",
            "hertz autovermietung",
            "avis ",
            "hertz ",
            "europcar "
        ],

        db: function(out) {
            if(!this.testing) {
                return;
            }
            try {
                console.info(out);
            } catch(err) {}
        },

        /**
         * callback when selecting an dropdown-list-item
         * @author: jw
         * @params: dropdown-list-header, selected-item, "enter" or "click", wrapper-id
         */
        cb_itemclick: function(hd, item, type, id) {

            // reset partner-storage if no partner set
            sx_station_suggest["sx_partner_" + ((item.por === "p")? "pu" : "ret")] =  false;

            // data error e.g. in case of preselection and invalid json
            if(typeof item === "undefined" || typeof item.txt === "undefined") {
                return;
            }
            // hide error if still displayed
            $("#sx-js-res-error").css("display","none");

            var url             =  sx_create_ajax_url("station.suggest");
            var ul              =  $("#" + id + " ul").get(0);
            var _txt            =  item.txt.replace(/\s*\((.+?)\)/g, "");
            var prop            =  (hd.tagName.toLowerCase() === "input")? "val" : "html";
            // do we deal with checkbox pickup as return?
            var $ck_pu_eq_ret   =  $("#sx-res-pu-eq-ret").length ?
                $("#sx-res-pu-eq-ret").attr('checked') : (window.sx_return_as_pickup || false);

            //var is_pickup_sel   =  (item.por === "p")? item.cit : $('#sx-js-res-pickup-cit').val();
            //var is_return_sel   =  (item.por === "r")? item.cit : $('#sx-js-res-return-cit').val();



            var is_pickup_sel   =  $('#sx-js-res-pickup-cit').val() || false;
            var is_return_sel   =  $('#sx-js-res-return-cit').val() || false;
            //var is_onway        =  (is_pickup_sel && is_pickup_sel === is_return_sel)? true : false;

            var set_ret_as_pu   =  false;
            var set_pu_as_ret   =  false;


            this.db('-------------- cb_itemclick ---------------');
            this.db(is_pickup_sel);
            this.db(is_return_sel);
            this.db(sx_station_suggest.sx_regrep);
            this.db(sx_station_suggest.sx_pugrep);
            this.db('------------- /cb_itemclick ---------------');



            // autofill pickup or return if still empty and no pugrep/regrep
            // check hd value too because in case of topoffer we already have a initial json without any selection
            //
            // var set_ret_as_pu   =  !!(item.por === "p" && !sx_station_suggest.sx_regrep && (!sx_return_json || !sx_station_suggest.hd_return_val));
            // var set_pu_as_ret   =  !!(item.por === "r" && !sx_station_suggest.sx_pugrep && (!sx_pickup_json || !sx_station_suggest.hd_pickup_val));

            // since USA-568 we possibly deal with a checkbox pickup as return
            if($ck_pu_eq_ret) {

                set_ret_as_pu =  true;

            } else {

                // new default rules since RACREDESIGN-1914
                // pickup
                if(item.por === "p") {

                    // do nothing if regrep
                    // change pickup if pickup is empty and return is empty -> return eq pickup
                    // change pickup if return is equals pickup             -> return eq pickup
                    // change pickup if return is different from pickup     -> do nothing
                    //
                    if(is_pickup_sel === is_return_sel && !sx_station_suggest.sx_regrep) {
                        set_ret_as_pu =  true;
                    }

                // return
                } else {
                    // do nothing
                }
            }

            // searchstring
            if( item.por === "p" && this.sx_search_pu) {
                var ctyp =  window.sx_ctyp || false;
                var tpl  =  window.sx_reservation_tpl || false;
                var cat  =  tpl + "_" + ctyp;
                sx_track(cat, this.sx_search_pu, _txt);
            }

            switch(item.cat) {
                case "country":

                    // remember we are waiting
                    sx_station_suggest.is_pending =  true;

                    $("#sx-js-res-" + ((item.por === "p")? "pickup" : "return") + "-liso").val(item.liso);
                    var params  =  {
                        adr:                _txt,
                        liso:               item.liso,
                        por:                item.por,
                        'tab_identifier':   $("#sx-tab-identifier").val()
                    };
                    //alert("Erneuter Requestmit params: adr=" + html + "&liso=" + item.liso + "&por=" + item.por);
                    $.getJSON(url, params, function(response){
                        sx_station_suggest.sx_handle_suggest_response(hd, ul, id, response);

                        // waiting is done
                        sx_station_suggest.is_pending =  false;
                    });
                    break;
                case "partner":

                    if(set_ret_as_pu) {
                        // store ret partner too for offer_request
                        sx_station_suggest.sx_partner_ret   =  item;
                        // store pickup item's modified txt also as return default
                        // default value in general is stored below when setting header's value
                        //
                        sx_station_suggest.hd_return_val    =  _txt;
                        // set ret as pu
                        sx_return_json =  sx_pickup_json;
                        // set item to select in ddlist
                        sx_station_suggest.exec_init_sel['sx-js-res-ret-location'] =  item.idx;
                        // force preselect only ret
                        sx_station_suggest.preset('ret');

                    } else if(set_pu_as_ret) {
                        // store return item's modified txt also as pickup default
                        sx_station_suggest.hd_pickup_val    =  _txt;
                        // reset pickup sixt-partner-flag in case it was set before
                        sx_station_suggest.sx_partner_pu    =   false ;
                        // set pu as ret
                        sx_pickup_json  =  sx_return_json;
                        // set item to select in ddlist
                        sx_station_suggest.exec_init_sel['sx-js-res-pu-location'] =  item.idx;
                        // force preselect only pu
                        sx_station_suggest.preset('pu');
                    }

                    // store partner for offer_request
                    sx_station_suggest["sx_partner_" + ((item.por === "p")? "pu" : "ret")]          =  item;
                    // store new value as default value
                    sx_station_suggest["hd_" + ((item.por === "p")? "pickup" : "return") + "_val"]  =  _txt;
                    // set header's value
                    $(hd).val(_txt);
                    break;

                case "google_suggest":
                case "town_other":
                case "town_sixt":

                    // remember we are waiting
                    sx_station_suggest.is_pending =  true;

                    // basic params
                    var params  =  {
                        adr:                _txt,
                        liso:               item.liso,
                        por:                item.por,
                        'tab_identifier':   $("#sx-tab-identifier").val()
                    };
                    // add lat/lng if no country
                    if(item.gtype !== "country") {
                        params["latu"] =  item.lat;
                        params["lotu"] =  item.lng;
                    }

                    // this request takes a time, so here we use jwait...
                    $.box.jwait();
                    $.getJSON(url, params, function(response){
                        $.box.close();
                        sx_station_suggest.nearby_search =  {hd:hd, item:item, id:id, bounds: false};
                        sx_station_suggest.sx_handle_suggest_response(hd, ul, id, response);

                        // waiting is done
                        sx_station_suggest.is_pending =  false;
                    });

                    // event tracking in case of nearby search
                    sx_track(item.cat, _txt , sx_location.liso_ip);

                    // set header's value without storing
                    $(hd).val(_txt);
                    break;
                case "station_downtown":
                case "station_railway":
                case "station_airport":
                case "station_nearby":
                    $("#sx-js-res-" + ((item.por === "p")? "pickup" : "return") + "-cit").val(item.cit);
                    $("#sx-js-res-" + ((item.por === "p")? "pickup" : "return") + "-liso").val(item.liso);

                    // we have to show a rate-selection in case of real-agent-booking
                    if((item.por === "p" || !sx_pickup_json) && $('#sx-js-res-agentprl').val() != 'PUBLIC' && $('#sx-js-res-is-corpcust').val() != '1') {
                        sx_get_rates(item.cit);
                    }

                    if(set_ret_as_pu) {
                        // store pickup item's modified txt also as return default
                        // default value in general is stored below when setting header's value
                        //
                        sx_station_suggest.hd_return_val    =  _txt;
                        // reset return sixt-partner-flag in case it was set before
                        sx_station_suggest.sx_partner_ret   =   false ;
                        // set ret as pu
                        sx_return_json  =  sx_pickup_json;
                        // set item to select in ddlist
                        sx_station_suggest.exec_init_sel['sx-js-res-ret-location'] =  item.idx;
                        // force preselect only ret
                        sx_station_suggest.preset('ret');

                    } else if(set_pu_as_ret) {
                        // store return item's modified txt also as pickup default
                        sx_station_suggest.hd_pickup_val    =  _txt;
                        // reset pickup sixt-partner-flag in case it was set before
                        sx_station_suggest.sx_partner_pu    =   false ;
                        // set pu as ret
                        sx_pickup_json  =  sx_return_json;
                        // set item to select in ddlist
                        sx_station_suggest.exec_init_sel['sx-js-res-pu-location'] =  item.idx;
                        // force preselect only pu
                        sx_station_suggest.preset('pu');
                    }

                    // customer own insurance if station in gb
                    // change residence if station in dk/no
                    sx_set_coi();
                    sx_set_residence(item.liso, item.fir);

                    // set header's value
                    $(hd).val(_txt);
                    // store new value as default value
                    sx_station_suggest["hd_" + ((item.por === "p")? "pickup" : "return") + "_val"] =  _txt;

                    // display additional infos with the time
                    this.dpl_openinghour_info( ((item.por === "p")? "pu" : "ret"), item.html );
                    break;
                case "error_radius":
                case "error_suggest":
                    $(hd).val("");
                    var params  =  {
                        adr:                '',
                        error:              true,
                        'tab_identifier':   $("#sx-tab-identifier").val()
                    };
                    // this request takes a time, so here we use jwait...
                    $.box.jwait();
                    $.getJSON(url, params, function(response){
                        $.box.close();
                        sx_station_suggest.sx_handle_suggest_response(hd, ul, id, response);
                    });
                    return;
                default:
                    $(hd).val("");
                    return;
            }
        },

        /**
         * callback when hovering a list-item
         * @author: jw
         * @params: dropdown-list-header, current-item, wrapper-id
         */
        cb_itemhover: function(hd, item, id) {

            // first time must execute itemhover at once
            // make sure run is resettet in cb_filter!!!
            // if no timeout running start exec and start empty timeout
            // else clear timeout and exec after next timeout
            //
            if(sx_station_suggest.run) {
                clearTimeout(sx_station_suggest.run);
                sx_station_suggest.run =  setTimeout(function() {
                    sx_station_suggest.exec_itemhover(hd, item, id);
                }, 600);
            } else {
                sx_station_suggest.exec_itemhover(hd, item, id);
                sx_station_suggest.run =  setTimeout(function() {}, 600);
            }
        },

        /**
         * execute when hovering after delay is over
         * @author: jw
         * @params: dropdown-list-header, current-item, wrapper-id
         */
        exec_itemhover: function(hd, item, id) {

            // data error e.g. in case of preselection and invalid json
            if(typeof item === "undefined") {
                return;
            }

            // do we write station infos?
            if(this.write_stationinfo) {
                $("#" + id + " .sx-js-res-info-content").html(item.html);
            }

            // do we display the google map?
            if(!this.has_google_map) {
                return;
            }

            var zoom, newpos;
            var mapid   =  $("#" + id + " .sx-js-res-google-map").eq(0).attr('id');
            var _txt    =  item.txt.replace(/\((.+?)\)/g, "");

            // store data we need for marker later on
            // get google data either by string name or by lotu/latu
            //
            switch(item.cat) {
                case "country":
                    google_map.marker_data = [{ img:'p', str: item.txt }];
                    google_map.map_by_str( mapid, item.country );
                    break;
                case "partner":
                    google_map.marker_data = [{ img:'p', str:item.txt, lat:item.lat, lng:item.lng }];
                    google_map.map_by_str( mapid, item.country );;
                    break;
                case "google_suggest":
                case "town_other":
                case "town_sixt":
                    google_map.marker_data = [{ img:'p', str:item.txt, lat:item.lat, lng:item.lng }];
                    google_map.map_by_str( mapid, item.country );
                    break;
                case "station_downtown":
                case "station_railway":
                case "station_airport":
                    google_map.marker_data = [{ img:'s', str: item.txt, lat:item.lat, lng:item.lng }];
                    google_map.map_by_pos( mapid, { lat:item.lat, lng:item.lng }, 12 );
                    break;
                case "station_nearby":
                    if(this.nearby_search) {

                        /*
                        // !!! old version, get bounds for _all_ nearby-search results
                        // if nearby bounds are not set yet
                        // get all nearby positions
                        // extend bounds as far as we need
                        //
                        if(!this.nearby_search.bounds) {
                            var all_pos     =  [];
                            $("#" + id + " ul ul li").each(function(){
                                var pos =  {lat:this.lat, lng: this.lng};
                                all_pos.push(pos);
                            });
                            google_map.set_bounds_by_latlng( mapid, all_pos);
                            this.nearby_search.bounds =  true;
                        }
                        */

                        // !!! new version, get bounds for nearby-search and current item only
                        var all_pos = [
                            {lat: this.nearby_search.item.lat, lng: this.nearby_search.item.lng},
                            {lat:item.lat ,lng:item.lng}
                        ];

                        google_map.set_bounds_by_latlng( mapid, all_pos);

                        // display nearby search and one nearby result
                        // set nearby search marker clearing old markers
                        //
                        google_map.marker_data = [ {img:'p', str: item.txt, lat: this.nearby_search.item.lat, lng: this.nearby_search.item.lng}, {img:'s', str: item.txt, lat:item.lat ,lng:item.lng} ];
                        google_map.set_marker(mapid, google_map.marker_data, true);
                    } else {
                        // fallback
                        google_map.marker_data = [{ img:'s', str: item.txt }];
                        google_map.map_by_pos( mapid, { lat:item.lat, lng:item.lng }, 12 )
                    };
                    break;
                default:
                    return;
            }
        },

        /**
         * callback while typing in when param 'filter' is a function
         * @author: jw
         * @params: dropdown-list-header, wrapper-id
         */
        cb_filter: function(hd, ul, id) {

            if($(hd).val().length < 3) {
                return;
            }

            // stop timout for a previous ajax request first
            clearTimeout(sx_station_suggest.run);

            // reset radius search here
            sx_station_suggest.nearby_search =  false;

            // reset infos and map
            sx_station_suggest.sx_delete_info(id);

            var url     =  sx_create_ajax_url("station.suggest");
            var por     =  (id.indexOf("-pu-") !== -1)? "p" : "r";
            var params  =  {
                adr:                $(hd).val(),
                por:                por,
                'tab_identifier':   $("#sx-tab-identifier").val()
            };

            // store last search
            this['sx_search_' + ((id.indexOf("-pu-") !== -1)? "pu" : "ret")] =  $(hd).val();

            if($("#sx-js-res-agentlgrep").length) {
                params['lgrep'] =  $("#sx-js-res-agentlgrep").val();
            };

            // wrap ajax-request in a timeout to save requests in case of quick typing
            sx_station_suggest.run =  setTimeout(function(){
                $.getJSON(url, params, function(response){
                    // reset runner to make sure cb_itemhover is done without timeout the first time
                    sx_station_suggest.run =  false;
                    sx_station_suggest.sx_handle_suggest_response(hd, ul, id, response);
                });
            }, 300);
        },

        /**
         * Simple filtration of station list
         *
         * @param {HTMLInputElement} hd
         * @param {HTMLUListElement} ul
         * @param {String} id
         *
         * @author Viktor Dudenkov <viktor.dudenkov.extern@sixt.com>
         */
        cb_simple_filter: function(hd, ul, id) {
            var filterreg = /([^\<]+)/;

            // create regex from input value
            // make sure chars like "ü" also matches "ue"
            // replace confusing chars like "()/-"
            //
            var val = $(hd).val();

            val = val.replace(/[\(\)\-\/]/g, " ");
            val = val.replace(/(\u00FC|ue)/ig, "(u|ue)");
            val = val.replace(/(\u00F6|oe)/ig, "(o|oe)");
            val = val.replace(/(\u00E4|ae)/ig, "(a|ae)");

            var reg = new RegExp("(^|\\b)" + val, "i");
            var li_selector = ($("ul li", ul).length)? "ul li" : "li";
            var li = $(li_selector, ul);

            // reset display
            $(li).css('display', '');

            // check input value's length
            if (val.length < 1) {
                return false
            }

            // loop and get innerText from innerHTML
            // replace confusing chars
            $(li).each(function(i) {
                var innerHtml = $(this).html();
                var innerText = innerHtml? filterreg.exec(innerHtml)[1] : "";

                innerText = innerText.replace(/[\(\)\-\/]/g, " ");
                innerText = innerText.replace(/(\u00FC)/ig, "u");
                innerText = innerText.replace(/(\u00F6)/ig, "o");
                innerText = innerText.replace(/(\u00E4)/ig, "a");

                if(!reg.exec(innerText) && !reg.exec(this.ciat)) {
                    $(this).css('display', 'none');
                }
            });
        },

        /**
         * callback before display list of station-suggestions
         * @author: jw
         * @params: dropdown-list-header, selected-item, wrapper-id
         */
        cb_beforeopen: function(hd, item, id) {

            // make sure howto is hidden
            // $("#sx-res-booking-howto").css("display", "none");

            // in case parent was hidden while initializing ddlist
            // we set ddlist's top here again
            $.ddlist.set_top(id);

            // IBE display-toggle only in home
            if(sx_reservation_tpl === "home") {
                sx_toggle_booking(1);
            }
        },

        /**
         * if we deal with preselected items
         * we have to wait with selecting until ddlist is open
         * otherwise google is unable to get map's size
         * @author: jw
         * @params: dropdown-list-header, selected-item, wrapper-id
         */
        cb_onopen: function(hd, item, id) {
            // if we have stored a list item to select (preselection)
            if (sx_station_suggest.exec_init_sel[id] !== false) {
                // get list item with the index stored in exec_init_sel[id] and set selected
                $.ddlist.init_sel( $("#" + id + " ul ul li").eq(sx_station_suggest.exec_init_sel[id]), id);
                sx_station_suggest.exec_init_sel[id] =  false;
            }
            // display overlay to focus on entries
            $("#sx-overlay").css("display","block");
        },

        /**
         * callback onclick header
         * store initializing header value
         * @author: jw
         * @params: dropdown-list-header, dropdown-list, wrapper-id, boolean opened
         */
        cb_hdclick: function(hd, ul, id, is_open) {

            // do nothing if clicked while ddlist is open
            if(is_open) {
                return;
            }

            // if no stored default text and header empty or if stored default text equals header value
            // store header value as default text and empty header, remove start class
            //
            var por =  (id.indexOf("-pu-") !== -1)? "pickup" : "return";
            // try{console.info(sx_station_suggest["hd_" + por + "_val"] + " --- " + $(hd).val());}catch(err){};
            if ( !sx_station_suggest["hd_" + por + "_val"] && $(hd).val() || sx_station_suggest["hd_" + por + "_val"] == $(hd).val()) {
                sx_station_suggest["hd_" + por + "_val"] =  $(hd).val();
                $(hd).val('').removeClass("sx-res-booking-start");
            }
        },

        /**
         * callback onclose list
         * restore initializing header value if empty
         * @author: jw
         * @params: dropdown-list-header, dropdown-list, wrapper-id, boolean opened
         */
        cb_onclose: function(hd, item, id) {
            var por =  (id.indexOf("-pu-") !== -1)? "pickup" : "return";

            // try{console.info(sx_station_suggest.is_pending)}catch(err){}

            // header empty or no selection
            // not waiting for next response
            // reset
            //
            if ( sx_station_suggest["hd_" + por + "_val"] !== $(hd).val() && !sx_station_suggest.is_pending ) {
                $(hd).val( sx_station_suggest["hd_" + por + "_val"] || '' );
            }

            // remove overlay
            $("#sx-overlay").css("display","none");
        },

        /**
         * handle suggest's response
         * @author: jw
         * @params: dropdown-list-header,dropdown-list, wrapper-id, json server-response
         */
        sx_handle_suggest_response: function(hd, ul, id, response) {

            // first reset hiddens containing cit and liso
            var por =  (id.indexOf("-pu-") !== -1)? "pickup" : "return";

            // MOD
            // $("#sx-js-res-" + por + "-cit").val('');
            // $("#sx-js-res-" + por + "-liso").val('');

            // if we do not have an error we pass response
            // this response can be empty...
            // then sx_create_ddlist_html's returns false
            //
            var ret =  false;
            if (response.err.length > 0) {
                alert( response.err.join(",\n") );
                return;
            } else {
                ret =  sx_station_suggest.sx_create_ddlist_html(ul, response.rec);
            }

            // response contained stations - we successfully wrote new html
            // otherways we try to get something from google;
            //
            if(ret) {
                $.ddlist.init_li( id );
                $.ddlist.dpl( "", id );

                // first list item's data were stored in this.firstitem
                // imitate itemhover by calling setsel
                //
                $.ddlist.setsel(this.firstitem, id);

            } else if (sx_reservation_tpl != 'topoffer_details') {
                this.get_suggest_by_google(hd, ul, id);
            }
        },

        sx_delete_info: function(id) {
            $("#" + id + " .sx-js-res-info-content").html("");
            $("#" + id + " .sx-js-res-google-map").html("");

            // reset map
            var mapid   =  $("#" + id + " .sx-js-res-google-map:first").attr('id');
            google_map.delete_map(mapid);
        },

        /**
         * create ddlist html from response object
         * @author: jw
         * @params: stationlist, response object
         */
        sx_create_ddlist_html: function(ul, response) {

            var cat, item, h, c, citem, cat_li, item_ul, item_li, item_hd, item_li_txt, tel_pref, item_hd_str, tmp, ooh, cl_str, html = "";
            var por         =  (ul.id === "sx-js-res-pu-list")? "p" : "r";
            var success     =  false;

            this.firstitem  =  false;

            // store last responses
            if(por === "p") {
                sx_pickup_json =  response;
            } else {
                sx_return_json =  response;
            }

            // reset
            ul.innerHTML    =  "";

            // create li element containing each category
            for(cat in response) {

                // we either has objects or an empty array
                // ignore empties
                //
                if( typeof response[cat].length !== "undefined" && response[cat].length === 0 ) {
                    continue;
                } else {
                    success =  true;
                }

                item_hd_str =  _sx_res_txt(cat);
                if (this.nearby_search) {
                    item_hd_str =  item_hd_str.replace("%s", this.nearby_search.item.txt);
                }

                cat_li              =  document.createElement("li");
                item_ul             =  document.createElement("ul");
                item_hd             =  document.createElement("h5");
                item_hd.innerHTML   =  item_hd_str;
                item_hd.className   =  "sx-ddlist-hd-" + cat;

                // create li- element containing each item
                for(item in response[cat]) {

                    if(!response[cat][item]) {
                        continue;
                    }

                    item_li             =  document.createElement("li");
                    item_li.cat         =  cat;
                    item_li.por         =  por;
                    // google type
                    item_li.gtype       =  false;

                    // get type of station and add as class
                    if (typeof response[cat][item]['CART'] !== "undefined") {

                        // mapp CART to class-strings
                        switch(response[cat][item]['CART']) {
                            case "F":
                                item_li.className   =  "sx-res-stationcat-station-airport";
                                break;
                            case "B":
                                item_li.className   =  "sx-res-stationcat-station-railway";
                                break;
                            default:
                                item_li.className   =  "sx-res-stationcat-station-downtown";
                        };
                    } else {
                        item_li.className   =  "sx-res-stationcat-" + cat.replace("_", "-");
                    }

                    switch(cat) {
                        case "country":

                            item_li.id      =  "sx-js-res-suggest-item-" + por + "-" + response[cat][item]['LISO'];
                            item_li.html    =  "<h5>" + _sx_res_txt('choose_country') + " "
                                            +  response[cat][item]['COUNTRY']
                                            +  " (" + response[cat][item]['LISO'] + ")<\/h5>";
                            item_li.liso    =  response[cat][item]['LISO'];
                            item_li.txt     =  response[cat][item]['COUNTRY'];
                            item_li.country =  response[cat][item]['COUNTRY'];
                            if(sx_current_liso !== response[cat][item]['LISO']) {
                                item_li.txt += " (" + response[cat][item]['LISO'] + ")";
                            }
                            break;

                        case "partner":

                            item_li.id      =  "sx-js-res-suggest-item-" + por + "-" + response[cat][item]['LISO'];
                            item_li.html    =  "<h5>" + _sx_res_txt('choose_partner') + " "
                                            +  response[cat][item]['SNAM']
                                            +  " (" + response[cat][item]['LISO'] + ")<\/h5>"

                                            + "<table><tr class=\"sx-res-phone-info\"><td>"
                                            + _sx_res_txt('phone') + "<\/td><td>" + response[cat][item]['TEL']
                                            + "<\/td><\/tr><\/table>";

                            item_li.liso    =  response[cat][item]['LISO'];
                            item_li.txt     =  response[cat][item]['SNAM'] + " (" + response[cat][item]['LISO'] + ")";
                            item_li.country =  response[cat][item]['COUNTRY'];
                            item_li.iata    =  response[cat][item]['IATA'];
                            item_li.lat     =  response[cat][item]['LATU'];
                            item_li.lng     =  response[cat][item]['LOTU'];
                            item_li.cart    =  response[cat][item]['CART'];
                            break;

                        case "town_other":
                        case "town_sixt":

                            // add country string only if foreign country
                            item_li.html    =  "<h5>" + _sx_res_txt('choose_town') + " " +  response[cat][item]['TOWN'];
                            if(sx_current_liso !== response[cat][item]['LISO']) {
                                item_li.html += ", " + response[cat][item]['COUNTRY'];
                            }
                            item_li.html    += "<\/h5>";

                            item_li.liso    =  response[cat][item]['LISO'];
                            item_li.country =  response[cat][item]['COUNTRY'];
                            item_li.txt     =  response[cat][item]['TOWN'];
                            item_li.lat     =  response[cat][item]['LATU'];
                            item_li.lng     =  response[cat][item]['LOTU'];
                            break;

                        case "google_suggest":

                            item_li.html    =  "<h5>" + _sx_res_txt('choose_town') + " "
                                            +  response[cat][item]['TOWN']
                                            +  " (" + response[cat][item]['LISO'] + ")<\/h5>";
                            item_li.liso    =  response[cat][item]['LISO'];
                            item_li.country =  response[cat][item]['COUNTRY'];
                            item_li.txt     =  response[cat][item]['TOWN'];
                            item_li.lat     =  response[cat][item]['LATU'];
                            item_li.lng     =  response[cat][item]['LOTU'];
                            item_li.gtype   =  response[cat][item]['GTYPE'];
                            break;

                        case "station_downtown":
                        case "station_railway":
                        case "station_airport":
                        case "station_nearby":

                            tmp                         =  "";
                            ooh                         =  ""; // attn! contains html string for openhours
                            response[cat][item]['TEL']  =  response[cat][item]['TEL'] || "-";

                            // phone costs
                            // get phone-prefix and check if note for this prefix available
                            tel_pref        =  response[cat][item]['TEL'].replace("+","00").substr(0, 9);
                            tel_pref        =  (_sx_res_txt(tel_pref) !== tel_pref)? _sx_res_txt(tel_pref) : false;

                            item_li.html    =  "<h5>" + response[cat][item]['SNAM'] + "<\/h5>"
                                            + "<p>" + response[cat][item]['STR'] + ", "
                                            //+ response[cat][item]['PLZ'] + " "
                                            //+ response[cat][item]['ORT'] + ", "
                                            + response[cat][item]['CITY'] + ", "
                                            + response[cat][item]['COUNTRY'] + "<\/p><table>"
                                            + "<tr class=\"sx-res-phone-info\"><td>" + _sx_res_txt('phone') + (tel_pref? "*" : "") + "<\/td><td>" + response[cat][item]['TEL'] + "<\/td><\/tr>";

                            // add fax only if more then 3 chars
                            if(response[cat][item]['FAX'].length > 3) {
                                item_li.html += "<tr class=\"sx-res-fax-info\"><td>" + _sx_res_txt('fax') + (tel_pref? "*" : "") + "<\/td><td>" + response[cat][item]['FAX'] + "<\/td><\/tr>";
                            }
                            // loop openhours
                            for(h in response[cat][item]['OPENHOURS']) {
                                ooh         += "<tr><td>" + _sx_res_txt(h) + "<\/td><td>"
                                            +  (response[cat][item]['OPENHOURS'][h].join(' ' + _sx_res_txt('and') + ' '))
                                            +  " " + _sx_res_txt('clock') + "<\/td><\/tr>";
                            }

                            // we need ooh twice, within info block and additionally for alt_stations
                            item_li.html    += ooh;
                            item_li.ooh     =  ooh;

                            // closed string
                            if(response[cat][item]['CLOSED'] && response[cat][item]['CLOSED'].length) {
                                tmp += (tmp? ", " : "") + _sx_res_txt('closed') + ' ';
                                for(c = 0; citem = response[cat][item]['CLOSED'][c]; c++) {
                                    if(c > 0 && c < response[cat][item]['CLOSED'].length -1) {
                                        tmp += ', ';
                                    } else if(response[cat][item]['CLOSED'].length > 1 && c == response[cat][item]['CLOSED'].length -1) {
                                        tmp += ' ' + _sx_res_txt('and') + ' '
                                    }
                                    tmp += _sx_res_txt(citem);
                                }
                            }

                            if(response[cat][item]['MOBILEKEY']) {
                                if(response[cat][item]['MOBILEKEY']['IS24H'] === "1") {
                                    item_li.html += "<tr><td class=\"sx-fastlane\">&nbsp;<\/td><td>" + _sx_res_txt('fastlane') + "<\/td><tr>";
                                }
                            }

                            // display OOH (pickup / return 24 hours?)
                            if(response[cat][item]['OOH']) {
                                if( response[cat][item]['OOH']['PICKUP']['ALLOWED'] && response[cat][item]['OOH']['RETURN']['ALLOWED'] ) {
                                    tmp += (tmp? ", " : "") + _sx_res_txt('puret_allowed');
                                } else {
                                    if( response[cat][item]['OOH']['PICKUP']['ALLOWED'] ) {
                                        tmp += (tmp? ", " : "") + _sx_res_txt('pu_allowed');
                                    }
                                    if( response[cat][item]['OOH']['RETURN']['ALLOWED'] ) {
                                        tmp += (tmp? ", " : "") + _sx_res_txt('ret_allowed');
                                    }
                                }
                                if( response[cat][item]['OOH']['PICKUP']['ONREQUEST'] && response[cat][item]['OOH']['RETURN']['ONREQUEST'] ) {
                                    tmp += (tmp? ", " : "") + _sx_res_txt('puret_onrequest');
                                } else {
                                    if( response[cat][item]['OOH']['PICKUP']['ONREQUEST'] ) {
                                        tmp += (tmp? ", " : "") + _sx_res_txt('pu_onrequest');
                                    }
                                    if( response[cat][item]['OOH']['RETURN']['ONREQUEST'] ) {
                                        tmp += (tmp? ", " : "") + _sx_res_txt('ret_onrequest');
                                    }
                                }

                                if(tmp) {
                                    tmp             =  "<tr><td><\/td><td class=\"sx-res-ooh-note\">" + tmp + "<\/td><\/tr>";
                                    item_li.html    += tmp;
                                    item_li.ooh     += tmp;
                                }
                            }
                            // finite table
                            item_li.html    += "<\/table>";

                            // phone-costs none?
                            if(tel_pref) {
                                item_li.html    += "<p class=\"sx-res-phone-cost-note\">* " + tel_pref + "<\/p>";
                            }

                            if(response[cat][item]['HINT']) {
                                item_li.html    += "<p class=\"sx-res-station-hint\">" + response[cat][item]['HINT'] + "<\/p>";
                            }

                            item_li.liso    =  response[cat][item]['LISO'];
                            item_li.txt     =  response[cat][item]['SNAM'];
                            item_li.cit     =  response[cat][item]['CIT'];
                            item_li.fir     =  response[cat][item]['FIR'];
                            item_li.lat     =  response[cat][item]['LATU'];
                            item_li.lng     =  response[cat][item]['LOTU'];
                            item_li.ciat    =  response[cat][item]['CIAT'];

                            // add liso so list item if station's liso differs from customer's liso
                            if( response[cat][item]['LISO'] !== sx_location.get().liso) {
                                item_li.txt +=  " (" + response[cat][item]['LISO'] + ")";
                            }

                            // STREET_MATCH: add street name
                            if(response[cat][item]['STREETMATCH'] === "1") {
                                item_li.txt += " (" + response[cat][item]['STR'] + ")";
                            }

                            // Entfernung
                            if (response[cat][item]['DIST']) {
                                item_li.txt += " (" + response[cat][item]['DIST'] + ")";
                            }
                            break;

                        case "error_radius":
                        case "error_suggest":
                            item_li.html    =  "";
                            item_li.txt     =  response[cat][item]['MSG'];
                            break;
                    }
                    item_li.innerHTML   = item_li.txt;
                    item_ul.appendChild(item_li);

                    if(!this.firstitem) {
                        this.firstitem =  item_li;
                    }
                }
                cat_li.appendChild(item_hd);
                cat_li.appendChild(item_ul);
                ul.appendChild(cat_li);
            }
            // if true some stations were found in response
            return success;
        },

        /**
         * pass searchstring to google
         * here we go if backend-response did not contain any results
         * @author: jw
         * @params:
         */
        get_suggest_by_google: function(hd, ul, id) {

            var i, item, j, comp, latlng, tmp, key, suggests =  {};
            var searchobj   =  {'address': $(hd).val()};
            var obj         =  this;
            var success     =  false;
            var dpl_err_nb  =  true; // flag: display ddlist with error no_matches_rd?
            var por         =  (id.indexOf("-pu-") !== -1)? "pickup" : "return";

            // radius search by click on a google-result did not find any station
            // write error into ddlist and display
            //
            if(this.nearby_search) {

                /*
                REMOVE POPUP
                // special case USA
                // here we display international-search-popup _after_ nearby_search did fail
                //
                if(
                    this.nearby_search.item.liso === "US" && sx_location.liso_ip !== "US"
                ) {
                    var _txt =  this.nearby_search.item.txt.replace(/\s*\((.+?)\)/g, "");
                    if (_txt.indexOf(",") != -1) {
                        _txt =  _txt.substr(0, _txt.indexOf(","));
                    }
                    $("#sx-res-search-worldwide").val(_txt);
                    $("#sx-res-international-search strong:first").html(_txt);
                    $.box.open('sx-res-international-search');
                    dpl_err_nb =  false;
                    $(hd).val( sx_station_suggest["hd_" + por + "_val"] );
                }
                */

                var no_matches_rd =   _sx_res_txt('no_matches_rd').replace("%s", this.nearby_search.item.txt);
                suggests['error_radius'] = [
                    {
                        "MSG"       :  no_matches_rd
                    }
                ];
                this.nearby_search =  false;
                this.sx_create_ddlist_html( ul, suggests );
                $.ddlist.init_li( id );
                // display only if international-search-popup is not displayed
                if(dpl_err_nb) {
                    $.ddlist.dpl( "", id );
                }
                return;
            }

            // add domain's tld as region
            var h   =  self.location.host;
            var d   =  h.lastIndexOf(".");
            var tld =  h.substr(d +1);
            // use us for 'com' etc.
            if (tld.length !== 2) {
                tld =  "us";
            }
            // add region
            searchobj['region'] =  tld;

            // store google request here to avoid endless loop with the same request
            google_map.get_geocode( searchobj, function(response) {

                for(i = 0; item = response[i]; i++) {

                    // reset current result
                    tmp             =  {};
                    latlng          =  item['geometry']['location'];
                    tmp["LATU"]     =  latlng.lat();
                    tmp["LOTU"]     =  latlng.lng();
                    tmp["COUNTRY"]  =  "";
                    tmp["LISO"]     =  "";
                    tmp["TOWN"]     =  false;
                    faddress        =  item['formatted_address'];
                    types           =  item['types'] || [false, false];

                    for(j = 0; comp = item['address_components'][j]; j++) {

                        //alert(comp.toSource())
                        switch(comp["types"][0]) {
                            case "locality":
                                town     =  comp["long_name"];
                                break;
                            case "country":
                                tmp["COUNTRY"]  =  comp["long_name"];
                                tmp["LISO"]     =  comp["short_name"];
                                break;
                        }
                    }
                    if(faddress) {
                        tmp["TOWN"] =  faddress;
                    }

                    // pass types
                    tmp["GTYPE"]    =  types[0];

                    // sometimes we find badword-strings in google's results
                    for(k = 0; badword =  obj.badwords[k]; k++) {
                        startpos =  tmp["TOWN"].toLowerCase().indexOf(badword);
                        if(startpos < 0) {
                            continue;
                        }

                        // if match create new string without badword
                        part1           =  tmp["TOWN"].substr(0, startpos);
                        part2           =  tmp["TOWN"].substr(part1.length + badword.length);
                        tmp["TOWN"]     =  part1 + part2;
                    }

                    // true only if town avail
                    if(tmp["TOWN"]) {
                        if(typeof suggests["google_suggest"] === "undefined") {
                            suggests["google_suggest"] =  [];
                        }
                        suggests["google_suggest"].push(tmp);
                        success =  true;
                    }
                }

                // nothing found via google? create error to display in ddlist
                if(!success) {
                    suggests['error_suggest'] = [
                        {
                            "MSG"       : _sx_res_txt('no_matches')
                        }
                    ]
                }
                obj.sx_create_ddlist_html( ul, suggests );
                $.ddlist.init_li( id );
                $.ddlist.dpl( "", id );
            });
        },

        init: function() {
            var obj             =  this;
            // set features (map, infos) depending on device's size
            var set_features    =  function() {
                // global for historical reasons
                obj.has_google_map       =  ( $('.sx-js-res-google-map:first').css('display') === "block" )?    (window.sx_has_google_map || true) : false;
                obj.write_stationinfo    =  ( $('.sx-res-info-wrapper:first').css('display') === "block" )?     true : false;

                obj.db("map: " + obj.has_google_map);
                obj.db("info: " + obj.write_stationinfo);
            };
            $(window).resize(set_features);
            set_features();

            // som flags for initializing, google maps, default suggest value like "Abholort", delcol...
            sx_disable_suggest      =  (typeof sx_disable_suggest !== "undefined")?     sx_disable_suggest      : false;
            this.sx_regrep          =  (typeof sx_regrep_set !== "undefined")?          sx_regrep_set           : false;
            this.sx_pugrep          =  (typeof sx_pugrep_set !== "undefined")?          sx_pugrep_set           : false;

            // in case of del/col is already set while initializing station must not be changed
            // so do nothing
            //
            if(sx_disable_suggest) {
                return;
            }

            // bad guy... make sure these globals are available
            if(typeof sx_pickup_json === "undefined") {
                sx_pickup_json =  false
            }
            if(typeof sx_return_json === "undefined") {
                sx_return_json =  false
            }

            var obj         =  this;
            var cbFilter = (/^topoffer_details/.test(sx_reservation_tpl))
                               ? obj.cb_simple_filter : obj.cb_filter;
            // do we deal with topoffer, newsletter or sgrep, pusgrep, rsgrep
            var pu_filter   =  (typeof sx_pu_filter !== "undefined")
                                   ? true : cbFilter;
            var ret_filter  =  (typeof sx_ret_filter !== "undefined")
                                   ? true : cbFilter;

            // init PICKUP COUNTRY
            $("#sx-js-res-pu-location").ddlist ({
                'heading': 'input[type=text]', //ATTN since checkbox geodelcol first input is no longer the suggest
                'itemclick': obj.cb_itemclick,
                'itemhover': obj.cb_itemhover,
                'filter': pu_filter,
                'beforeopen': obj.cb_beforeopen,
                'onopen': obj.cb_onopen,
                'hdclick': obj.cb_hdclick,
                'hd_toggle': false,
                'onclose': obj.cb_onclose,
                'zindex': 3100,
                'scope': obj
            });

            // init RETURN COUNTRY
            $("#sx-js-res-ret-location").ddlist ({
                'heading': 'input[type=text]', //ATTN since checkbox geodelcol first input is no longer the suggest
                'itemclick': obj.cb_itemclick,
                'itemhover': obj.cb_itemhover,
                'filter': ret_filter,
                'beforeopen': obj.cb_beforeopen,
                'onopen': obj.cb_onopen,
                'hdclick': obj.cb_hdclick,
                'hd_toggle': false,
                'onclose': obj.cb_onclose,
                'zindex': 3100,
                'scope': obj
            });

            // initialize presettings
            this.preset();
        },

        /**
         * preset suggest list by json-strings passed via smarty
         * @author: jw
         * @papams:
         */
        preset: function() {

            var preset_mode =  arguments.length? arguments[0] : false;
            var $li;

            // make sure its initialized
            if(typeof sx_pickup_json === "undefined")  sx_pickup_json =  false;
            if(typeof sx_return_json === "undefined")  sx_return_json =  false;

            if(sx_pickup_json && (preset_mode === false || preset_mode === 'pu')) {

                // as we set pickup as returnthe first time
                // we set sx_return_json as pickup if no return available
                //
                if(!sx_return_json && $("#sx-js-res-return-cit").val() != '8710') {
                    sx_return_json =  sx_pickup_json;
                }

                this.sx_create_ddlist_html( $("#sx-js-res-pu-list").get(0),  sx_pickup_json );
                $.ddlist.init_li( 'sx-js-res-pu-location' );

                // only one list item available?
                // store here and set selected _after_ opening ddlist
                // to avoid trouble with google map size cause it's still hidden
                // set params/strings normally set by item-click by hand now
                //
                if( $("#sx-js-res-pu-list ul li").length < 2) {
                    // store index of ddlit's item to select
                    this.exec_init_sel['sx-js-res-pu-location'] =  0;
                    this.set_preselect_params(sx_pickup_json, 'pickup');

                    // display additional infos with the time
                    $li =  $("#sx-js-res-pu-list ul li").get(0);
                    if (typeof $li !== 'undefined') {
                        this.dpl_openinghour_info( "pu", $li.html );
                    }
                } else if(this.exec_init_sel['sx-js-res-pu-location'] !== false) {

                    // exec_init_sel might be set by cb_itemclick
                    this.set_preselect_params(sx_return_json, 'pickup');

                    // display additional infos with the time
                    $li =  $("#sx-js-res-ret-list ul li").get(this.exec_init_sel['sx-js-res-pu-location']);
                    if (typeof $li !== 'undefined') {
                        this.dpl_openinghour_info( "pu", $li.html );
                    }
                }
            }
            if(sx_return_json && (preset_mode === false || preset_mode === 'ret')) {

                this.sx_create_ddlist_html($("#sx-js-res-ret-list").get(0), sx_return_json);
                $.ddlist.init_li( 'sx-js-res-ret-location' );

                // only one list item available?
                // store here and set selected _after_ opening ddlist
                // to avoid trouble with google map size cause it's still hidden
                // set  params/strings normally set by item-click by hand now
                //
                if( $("#sx-js-res-ret-list ul li").length < 2) {
                    // store index of ddlit's item to select
                    this.exec_init_sel['sx-js-res-ret-location'] =  0;
                    this.set_preselect_params(sx_return_json, 'return');

                    // display additional infos with the time
                    $li =  $("#sx-js-res-ret-list ul li").get(0);
                    if (typeof $li !== 'undefined') {
                        this.dpl_openinghour_info( "ret", $li.html );
                    }

                } else if(this.exec_init_sel['sx-js-res-ret-location'] !== false) {

                    // exec_init_sel might be set by cb_itemclick
                    this.set_preselect_params(sx_return_json, 'return');

                    // display additional infos with the time
                    $li =  $("#sx-js-res-ret-list ul li").get(this.exec_init_sel['sx-js-res-ret-location']);
                    if (typeof $li !== 'undefined') {
                        this.dpl_openinghour_info( "ret", $li.html );
                    }
                }
            }
        },

        /**
         * we can not init the suggest-item-click until suggest dropdown is open
         * cause google is unable to get map's size while it's display is "none"
         * set params and strings from pu/ret-json without item-click
         * @author: jw
         * @papams: object suggest-json, string mode
         */
        set_preselect_params: function(obj, por) {

            // do nothing if no obj
            if(!obj) {
                return;
            }

            var _txt, cat, item, done =  false;
            var cnt =  0;
            var sel =  this.exec_init_sel['sx-js-res-' + ((por === "return")? 'ret' : 'pu') + '-location'];

            // loop categories
            for(cat in obj) {

                // this.exec_init_sel contains the list item's index
                // but within obj every category starts from index 0 again
                // so loop cats until wanted index was found
                //
                if(obj[cat].length <= sel) {
                    sel -= obj[cat].length;
                    continue;
                }

                // replace brackets from snam like we do in cb_itemclick
                _txt    =  obj[cat][sel]["SNAM"].replace(/\s*\((.+?)\)/g, "");

                // fill hidden and header
                $("#sx-js-res-" + por + "-cit").val( obj[cat][sel]["CIT"] );
                $("#sx-js-res-" + por + "-liso").val( obj[cat][sel]["LISO"] );
                $("#sx-js-res-" + ((por === "return")? 'ret' : 'pu') + "-location input").val( _txt );

                // set as default header value
                if(por === "pickup") {
                    this["hd_pickup_val"] =  _txt;
                } else {
                    this["hd_return_val"] =  _txt;
                }
                break;
            }
        },

        /**
         * set resturn as pickup
         * @author  jw
         * @return  {void}
         */
        set_as_pickup: function(el) {

            var selected_pu,
                ck =  !!el.checked;

            var pickup_handlers = this.event_observers.set_as_pickup;
            for ( var idx in pickup_handlers ) {
                pickup_handlers[idx](ck);
            }

            if(ck) {
                $('#sx-js-res-ret-location').slideUp();

                selected_pu =  $.ddlist.getsel('sx-js-res-pu-location') || this.exec_init_sel['sx-js-res-pu-location'];
                if(selected_pu === false) {
                    return;
                }

                // set header values the same
                this.hd_return_val  =  this.hd_pickup_val;
                // set ret as pu
                sx_return_json      =  sx_pickup_json;
                // set item to select in ddlist
                this.exec_init_sel['sx-js-res-ret-location'] =   selected_pu.idx;
                // force preselect only ret
                this.preset('ret');
            } else {
                $('#sx-js-res-ret-location').slideDown();
            }
        },

        /**
         * set return as pickup, will replace set_as_pickup
         * @author  jw
         * @return  {void}
         */
        set_return_as_pickup: function(id) {

            // pass or just toggle
            if (arguments.length > 1) {
                this.return_as_pickup = arguments[1];
            } else {
                this.return_as_pickup = this.return_as_pickup? false : true;
            }

            // we need the checkbox for historical reasons
            $('#sx-res-pu-eq-ret').attr('checked', this.return_as_pickup);

            if (this.return_as_pickup) {
                $('#' + id).addClass('ibe-horizontal-par');

                selected_pu =  $.ddlist.getsel('sx-js-res-pu-location') || this.exec_init_sel['sx-js-res-pu-location'];
                if(selected_pu === false) {
                    return;
                }

                // set header values the same
                this.hd_return_val  =  this.hd_pickup_val;
                // set ret as pu
                sx_return_json      =  sx_pickup_json;
                // set item to select in ddlist
                this.exec_init_sel['sx-js-res-ret-location'] =   selected_pu.idx;
                // force preselect only ret
                this.preset('ret');

                // make sure cillection is not checked
                $col = $('#sx-res-del-col-ret');
                $col.attr('checked', false).parent().removeClass('sx-gc-selected');
                sx_del_col.dpl($col);
            } else {
                $('#' + id).removeClass('ibe-horizontal-par');
            }
        },

        /**
         * display station infos also with time-ddlist
         * @author: jw
         * @param: string pickup or return
         * @param: string html stationinfo
         * @param: string stationname to replace with "opening hours"
         */
        dpl_openinghour_info: function(por, htm) {

            if(!$("#sx-js-res-" + por + "-time-info").length) {
                return;
            }
            $("#sx-js-res-" + por + "-time-info").html(htm.replace(/<h5>(.+?)<\/h5>/, "<h5>" + _sx_res_txt('openhours') + "<\/h5>"));
        }
    };

    /** ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     *
     * booking time
     *
     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    function sx_init_booking_time() {

        // set defaults
        $("#sx-js-res-pu-time").get(0).placeholder  =  $("#sx-js-res-pu-time").val();
        $("#sx-js-res-ret-time").get(0).placeholder =  $("#sx-js-res-ret-time").val();

        $("#sx-js-res-pu-datetime-entry").ddlist({
            'heading': '#sx-js-res-pu-time',
            'zindex': 3100,
            'onfocus': true,
            'hdclick': function(hd, ul, id, dpl){
                hd.blur();
            },
            'itemclick': function(hd, item, type, id) {
                $(hd).val( item.innerHTML );
            },
            'onopen': function(hd, item, id) {
                $(hd).addClass('sx-datetime-open');
            },
            'onclose': function(hd, item, id) {
                $(hd).removeClass('sx-datetime-open');
            }
        });

        $("#sx-js-res-ret-datetime-entry").ddlist({
            'heading': '#sx-js-res-ret-time',
            'zindex': 3100,
            'onfocus': true,
            'hdclick': function(hd, ul, id, dpl) {
                hd.blur();
            },
            'itemclick': function(hd, item, type, id) {
                $(hd).val( item.innerHTML );
            },
            'onopen': function(hd, item, id) {
                $(hd).addClass('sx-datetime-open');
            },
            'onclose': function(hd, item, id) {
                $(hd).removeClass('sx-datetime-open');
            }
        });

        var pu_time     =  $("#sx-js-res-pu-time").val().replace(":", "");
        var ret_time    =  $("#sx-js-res-ret-time").val().replace(":", "");

        // init time selection with current time
        $.ddlist.init_sel( $("#sx-js-res-pu-time-item-" + pu_time) , $("#sx-js-res-pu-datetime-entry"));
        $.ddlist.init_sel( $("#sx-js-res-ret-time-item-" + ret_time) , $("#sx-js-res-ret-datetime-entry"));
    };

    /** ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     *
     * datepicker
     *
     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    sx_res_datepicker =  {

        sx_add_arrow: function() {
            var $cal =  $("#ui-datepicker-div");
            $('.sx-res-info-wrapper-arrow', $cal).remove();

            var $arr =  $('<span></span>').appendTo( $cal ).html('&nbsp;').addClass('sx-res-info-wrapper-arrow sx-res-info-wrapper-arrow-red');
        },

        /**
         * callback after setting a datepicker date
         * @author: jw
         * @params: date given by datepicker's beforeShowDay
         */
        sx_set_booking_period:  function(date) {

            // loop all calendar items and get their dates
            // turn date in ms to compare
            //
            var curr        =  date.getTime();
            var pu_date     =  $('#sx-js-res-pu-date').val();
            var ret_date    =  $('#sx-js-res-ret-date').val();
            var pu_ms       =  sx_date_obj.ms_from_datestring(pu_date);
            var ret_ms      =  sx_date_obj.ms_from_datestring(ret_date);

            // datepicker expects an array as return...
            if (curr == pu_ms)  return [1, "ui-datepicker-current-period-start"];
            if (curr == ret_ms) return [1, "ui-datepicker-current-period-end"];
            if (curr > pu_ms && curr < ret_ms) return [1, "ui-datepicker-current-period"];
            return [1, ""];
        },

        /**
         * callback after selecting a datepicker date
         * @author: jw
         * @params: date given by datepicker's onSelect
         */
        sx_compare_booking_date: function(date, mod) {

            var pu_date     =  $('#sx-js-res-pu-date').val();
            var ret_date    =  $('#sx-js-res-ret-date').val();
            var pu_ms       =  sx_date_obj.ms_from_datestring(pu_date);
            var ret_ms      =  sx_date_obj.ms_from_datestring(ret_date);
            var date        =  "";

            if(pu_ms > ret_ms) {
                ret_date    =  sx_date_obj.datestring_from_ms(pu_ms, 2);
                ret_ms      =  sx_date_obj.ms_from_datestring(pu_date, 2);
                $('#sx-js-res-ret-date').val(ret_date);
            }

            if(!mod) {
                return;
            }

            // after all we set the date for _both_ calendars again
            // (ok, it is a hack...)
            // so beforeShowDay fires and sets the period-class
            //
            pu_date     =  new Date(pu_ms);
            ret_date    =  new Date(ret_ms);
            $('#sx-js-res-pu-datepicker').datepicker( 'setDate', pu_date );
            $('#sx-js-res-ret-datepicker').datepicker( 'setDate', ret_date );
        },

        init_partner: function() {

            // relaunch 2014 with modified ibe
            // use homecom initialisation
            //
            if($('#sx-js-ibe-form').length) {
                this.init_ibe_horizontal();
                return;
            }

            // for some testings or for partner.sixt.com we need to start with a hidden calendar
            // so start with "init_booking" if param cal set to 0 and hide default cal wrapper
            //
            var cal_dpl =  (typeof sx_cal_dpl === "undefined")? true : sx_cal_dpl;
            if(!cal_dpl) {
                // hide dafault wrapper only if calendar is hidden
                $('.sx-res-datepicker', '#sx-js-res-datepicker-wrapper').css('display', 'none');
                this.init_booking();
                return;
            }

            // initialize dateobject for validation etc...
            sx_date_obj.init(sx_date_str);
            var obj =  this;

            $('#sx-js-res-pu-datepicker').datepicker({
                numberOfMonths: 1, // display more then one month
                firstDay: sx_date_obj.firstday, // start calendar with monday
                dayNames: sx_datapicker_day_names,
                dayNamesMin: sx_datapicker_day_names_min,
                monthNames: sx_datapicker_month_names,
                monthNamesShort: sx_datapicker_month_names_short,
                dateFormat: sx_date_obj.datestr,
                changeMonth: true,
                changeYear: true,
                minDate: +0,
                nextText: sx_datapicker_txt_next,
                prevText: sx_datapicker_txt_prev,
                altField: '#sx-js-res-pu-date',
                onSelect: function(date, inst) {
                    obj.sx_compare_booking_date(date, 1);
                },
                beforeShowDay: function(date) {
                    return obj.sx_set_booking_period(date);
                }
            });

            $('#sx-js-res-ret-datepicker').datepicker({
                numberOfMonths: 1, // display more then one month
                firstDay: sx_date_obj.firstday, // start calendar with monday
                dayNames: sx_datapicker_day_names,
                dayNamesMin: sx_datapicker_day_names_min,
                monthNames: sx_datapicker_month_names,
                monthNamesShort: sx_datapicker_month_names_short,
                dateFormat: sx_date_obj.datestr,
                changeMonth: true,
                changeYear: true,
                minDate: +0,
                nextText: sx_datapicker_txt_next,
                prevText: sx_datapicker_txt_prev,
                altField: '#sx-js-res-ret-date',
                onSelect: function(date, inst) {
                    obj.sx_compare_booking_date(date, 1);
                },
                beforeShowDay: function(date) {
                    return obj.sx_set_booking_period(date);
                }
            });
            // using altField replaces input values, reset to avoid conflicts displaying the period
            $('#sx-js-res-pu-date').val(sx_def_uda);
            $('#sx-js-res-ret-date').val(sx_def_rda);

            // now set dates for datepicker
            $('#sx-js-res-pu-datepicker').datepicker( 'setDate', sx_date_obj.date_from_datestring(sx_def_uda) );
            $('#sx-js-res-ret-datepicker').datepicker( 'setDate', sx_date_obj.date_from_datestring(sx_def_rda) );

            this.init_manual_entry(1);
        },

        init_ibe_horizontal: function() {

            // initialize dateobject for validation etc...
            sx_date_obj.init(sx_date_str);
            var obj =  this;

            $('.sx-js-datepicker').datepicker({
                firstDay: sx_date_obj.firstday, // start calendar with monday
                dayNames: sx_datapicker_day_names,
                dayNamesMin: sx_datapicker_day_names_min,
                monthNames: sx_datapicker_month_names,
                monthNamesShort: sx_datapicker_month_names_short,
                dateFormat: sx_date_obj.datestr,
                changeMonth: true,
                minDate: +0,
                nextText: sx_datapicker_txt_next,
                prevText: sx_datapicker_txt_prev,
                onSelect: function(date, inst) {
                    obj.sx_compare_booking_date(date, 0);
                    if(inst.id === 'sx-js-res-pu-date') {
                        setTimeout(function(){$('#sx-js-res-ret-date').focus();},50);
                    }
                    $('.sx-js-datepicker').triggerHandler('on_ibe_date_changed', {
                        pu_date: $('#sx-js-res-pu-date').val(),
                        ret_date: $('#sx-js-res-ret-date').val()
                    });
                },
                beforeShowDay: function(date, inst) {
                    obj.sx_add_arrow();
                    return obj.sx_set_booking_period(date);
                }
            });
        },

        init_mobile: function() {
            // initialize dateobject for validation etc...
            sx_date_obj.init(sx_date_str);
            var obj =  this;

            $('#sx-js-res-pu-date').datepicker({
                numberOfMonths: 1, // display more then one month
                firstDay: sx_date_obj.firstday, // start calendar with monday
                dayNames: sx_datapicker_day_names,
                dayNamesMin: sx_datapicker_day_names_min,
                monthNames: sx_datapicker_month_names,
                monthNamesShort: sx_datapicker_month_names_short,
                dateFormat: sx_date_obj.datestr,
                changeMonth: true,
                changeYear: true,
                minDate: +0,
                nextText: sx_datapicker_txt_next,
                prevText: sx_datapicker_txt_prev,
                onSelect: function(date, inst) {
                    obj.sx_compare_booking_date(date, 1);
                },
                beforeShowDay: function(date) {
                    return obj.sx_set_booking_period(date);
                }
            });

            $('#sx-js-res-ret-date').datepicker({
                numberOfMonths: 1, // display more then one month
                firstDay: sx_date_obj.firstday, // start calendar with monday
                dayNames: sx_datapicker_day_names,
                dayNamesMin: sx_datapicker_day_names_min,
                monthNames: sx_datapicker_month_names,
                monthNamesShort: sx_datapicker_month_names_short,
                dateFormat: sx_date_obj.datestr,
                changeMonth: true,
                changeYear: true,
                minDate: +0,
                nextText: sx_datapicker_txt_next,
                prevText: sx_datapicker_txt_prev,
                onSelect: function(date, inst) {
                    obj.sx_compare_booking_date(date, 1);
                },
                beforeShowDay: function(date) {
                    return obj.sx_set_booking_period(date);
                }
            });
            // using altField replaces input values, reset to avoid conflicts displaying the period
            $('#sx-js-res-pu-date').val(sx_def_uda);
            $('#sx-js-res-ret-date').val(sx_def_rda);

            // now set dates for datepicker
            $('#sx-js-res-pu-date').datepicker( 'setDate', sx_date_obj.date_from_datestring(sx_def_uda) );
            $('#sx-js-res-ret-date').datepicker( 'setDate', sx_date_obj.date_from_datestring(sx_def_rda) );

            this.init_manual_entry(1);
        },

        init_booking: function() {

            // relaunch 2014 with modified ibe
            // use homecom initialisation
            //
            $dp_inp =  $('.sx-js-datepicker');
            if(!$dp_inp.length) {
                return;
            }

            var obj     =  this;
            sx_date_str =  window.sx_date_str || "d.m.y|1|24";
            // initialize dateobject for validation etc...
            sx_date_obj.init(sx_date_str);

            // ie6 is not really good rendering animations...
            var sx_datapicker_duration  = (sx_is_ie6)? "" : "normal";
            // no month dropdown if param was set (wizzard)
            var change_month            =  (typeof sx_change_month !== "undefined")? sx_change_month    : true;    // default: display

            $dp_inp.datepicker({
                numberOfMonths: 1, // display more then one month
                firstDay: sx_date_obj.firstday, // start calendar with monday
                dayNames: sx_datapicker_day_names,
                dayNamesMin: sx_datapicker_day_names_min,
                monthNames: sx_datapicker_month_names,
                monthNamesShort: sx_datapicker_month_names_short,
                dateFormat: sx_date_obj.datestr,
                changeMonth: change_month,
                minDate: +0,
                duration: sx_datapicker_duration,
                nextText: sx_datapicker_txt_next,
                prevText: sx_datapicker_txt_prev,
                onSelect: function(date, inst) {
                    obj.sx_compare_booking_date(date, 0);
                    if(inst.id === 'sx-js-res-pu-date') {
                        setTimeout(function(){$('#sx-js-res-ret-date').focus();},50);
                    }
                },
                beforeShowDay: function(date) {
                    return obj.sx_set_booking_period(date);
                }
            });

            // icons hide the input and prevent click-event
            $('#sx-js-res-pu-date-icon').bind('click', function(){
                $('#sx-js-res-pu-date').focus();
            });
            $('#sx-js-res-ret-date-icon').bind('click', function(){
                $('#sx-js-res-ret-date').focus();
            });
        },

        init_manual_entry: function(mod) {

            var obj =  this;
            $('.sx-gc-date').each(function() {
                // store initiale datestring
                this.def =  $(this).val();
            }).keyup(function() {
                // while keyup get value
                // if length complete start validation
                //
                var date =  $(this).val();
                if(date.length > 9) {

                    // get entry milliseconds
                    // get datestring of today's milliseconds
                    // get again today's milliseconds, but at 0 o'clock for comparrison
                    // compare milliseconds of today and date
                    //
                    var date_ms     =  sx_date_obj.ms_from_datestring(date);
                    var today_date  =  sx_date_obj.datestring_from_ms(new Date().getTime());
                    var today_ms    =  sx_date_obj.ms_from_datestring(today_date);
                    var plausible   =  (date_ms - today_ms < 0)? false : true;

                    if ( !sx_date_obj.regex().exec(date) || !plausible ) {
                        $.box.jalert( _sx_res_txt('error_datepicker'), 'OK' );
                        $(this).val(this.def);
                    } else {
                        obj.sx_compare_booking_date(date, 1);
                    }
                }
            }).blur(function() {
                // rset if leaving without datestring is complete
                var date =  $(this).val();
                if ( !sx_date_obj.regex().exec(date) ) {
                    $.box.jalert( _sx_res_txt('error_datepicker'), 'OK' );
                    $(this).val(this.def);
                }
            });
        }
    };

    /** ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     *
     * send
     *
     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

    //hier
    function sx_offer_request() {

        // delcol in jquery box? Do not use b$ox.close
        var request_del_col = sx_del_col.get_jquery_box_state();

        var strack = function(method) {
            if(typeof sitecatalyst === "undefined" || typeof sitecatalyst[method] === "undefined") {
                return;
            }
            var args =  arguments[1] || false;
            sitecatalyst[method](args);
        };

        var waiter =  function(mod) {
            // spinner not for mobile
            if(sx_is_supported_mobile() && !request_del_col) {
                if(mod) {
                    $.box.jwait();
                } else {
                    $.box.close();
                }
            } else {
                if(mod) {
                    sx_waiting.dpl();
                } else {
                    sx_waiting.hide();
                }
            }
        };

        // hide page until all is done
        waiter(1);

        //console.info(sx_station_suggest.sx_partner_pu +" - " + sx_station_suggest.sx_partner_ret)

        // if we deal with a partner we forward request to micronexus
        if(sx_station_suggest.sx_partner_pu || sx_station_suggest.sx_partner_ret) {

            // don't mix it up...
            if(!sx_station_suggest.sx_partner_pu || !sx_station_suggest.sx_partner_ret) {
                waiter(0);
                var partner_error = "<p>" + _sx_res_txt('error_partner') + "<\/p>";
                $("#sx-js-res-error").html( partner_error ).show();
                return false;
            }

            // now we have to prepare data to pass to micronexus
            // dates splitted into year, month, day, time etc...

            /**
             * parse time and prepare for micronexus
             * 24h-formatted, leading "0", like 09:30
             *
             * @author  joachim.wendenburg@sixt.com
             *
             * @params  {string} match hour
             * @params  {string} match min
             * @params  {string} match am/ pm or empty
             * @return  {string} time 24h-formatted
             *
             */
            var parse_time =  function() {

                var ampm    =  arguments[3] || false;
                var hour    =  arguments[1];

                if(ampm && ampm.toLowerCase().indexOf("pm") !== -1) {
                    hour =  parseInt((hour.substr(0,1) == "0")? hour.substr(1) : hour);
                    hour =  hour +12;
                    hour =  (hour < 10)? "0" + hour : hour;
                }
                return hour + ":" + arguments[2];
            }

            // time
            var pu_time         =  $("#sx-js-res-pu-time").val();
            var ret_time        =  $("#sx-js-res-ret-time").val();
            var regex           =  /^(\d{1,2})\:(\d{1,2})(\s.+)?/;

            // format timestring
            var pu_time_str     =  pu_time.replace(regex, parse_time);
            var ret_time_str    =  ret_time.replace(regex, parse_time);

            // get date as milliseconds and turn into date-obj
            var pu_ms           =  sx_date_obj.ms_from_datestring( $('#sx-js-res-pu-date').val() );
            var ret_ms          =  sx_date_obj.ms_from_datestring( $('#sx-js-res-ret-date').val() );
            var pu_date         =  new Date(pu_ms);
            var ret_date        =  new Date(ret_ms);

            // get backend params
            var language        =  (typeof sx_micronexus_language !== "undefined")? sx_micronexus_language : "1";
            var affiliate_id    =  (typeof sx_micronexus_affiliate_id !== "undefined")? sx_micronexus_affiliate_id : "371";

            // airport or downtown
            var pu_loc          =  (sx_station_suggest.sx_partner_pu.cart === "F")? "PIATA" : "PCITY";
            var ret_loc         =  (sx_station_suggest.sx_partner_ret.cart === "F")? "DIATA" : "DCITY";

            var url             =  "http://international.sixt.com/Parameters.aspx"
                                +  "?" + pu_loc + "=" + sx_station_suggest.sx_partner_pu.iata
                                +  "&PDAY=" + pu_date.getDate()
                                +  "&PMONTH=" + (pu_date.getMonth() +1)
                                +  "&PYEAR=" + pu_date.getFullYear()
                                +  "&PTIME=" + pu_time_str
                                +  "&" + ret_loc + "=" + sx_station_suggest.sx_partner_ret.iata
                                +  "&DDAY=" + ret_date.getDate()
                                +  "&DMONTH=" + (ret_date.getMonth() +1)
                                +  "&DYEAR=" + ret_date.getFullYear()
                                +  "&DTIME=" + ret_time_str
                                +  "&LANGUAGE=" + language
                                +  "&Affiliate_ID=" + affiliate_id;

            self.location.href  =  url;

            // end here if partner
            return false;
        }

        // if we jump in from fleet
        // check if liso did not change
        if(typeof sx_from_fleet !== "undefined" && typeof sx_from_fleet.liso !== "undefined") {

            var selected_liso = $("#sx-js-res-pickup-liso").val();
            if (request_del_col) {
                selected_liso = $('#geo_del_country').val();
            }

            if(selected_liso != sx_from_fleet.liso) {
                if(!sx_from_fleet.ignore) {
                    sx_from_fleet.ignore =  true;
                    waiter(0);
                    var from_fleet_error = "<p>" + _sx_res_txt('error_from_fleet') + "<\/p>";
                    $("#sx-js-res-error").html( from_fleet_error ).show();
                    return false;
                }
            }
        }

        // store for tracking if error occurs
        var www_nam     = $("#sx-js-res-pu-location input:first").val();

        // map params with entry-id
        var submit_data =  {
            uci: 'sx-js-res-pickup-cit',
            rci: 'sx-js-res-return-cit',
            uli: 'sx-js-res-pickup-liso',
            rli: 'sx-js-res-return-liso',
            uda: 'sx-js-res-pu-date',
            rda: 'sx-js-res-ret-date',
            uti: 'sx-js-res-pu-time',
            rti: 'sx-js-res-ret-time',
            posl:'sx-js-res-posl'
        };


        // we deal with topoffer/newsletter and pass some more values
        if ($("#sx-js-res-istopoffer").length || $("#sx-js-res-isnewsoffer").length) {
            submit_data['is_topoffer']  =  'sx-js-res-istopoffer';
            submit_data['is_newsoffer'] =  'sx-js-res-isnewsoffer';
            submit_data['grp']          =  'sx-js-res-grp';
            submit_data['prl']          =  'sx-js-res-prl';
            submit_data['insu']         =  'sx-js-res-insu';
            submit_data['prpd']         =  'sx-js-res-prpd';
            submit_data['rtyp']         =  'sx-js-res-rtyp';
            submit_data['ctyp']         =  'sx-js-res-ctyp';
        }

        // we deal with agent-booking and pass some more values
        if ($("#sx-js-res-isagent").length) {
            submit_data['is_agentbooking'] = 'sx-js-res-isagent';
            if ($("#sx-js-res-agentfake").length) {
                submit_data['hdc_kdnr']    = 'sx-js-res-hdckdnr';
            } else {
                submit_data['agent_prl']   = 'sx-js-res-agentprl';
                submit_data['agent_ctyp']  = 'sx-js-res-agentctyp';
            }
        }

        // create url and param-object
        var url     =  sx_create_ajax_url('offer.request');
        var params  =  {
            'tab_identifier':   $("#sx-tab-identifier").val(),
            'wants_uk_del':     ($("#sx-res-uk-del").attr('checked')? 1 : 0),
            'wants_uk_col':     ($("#sx-res-uk-col").attr('checked')? 1 : 0),
            'wants_coi':        ($("#sx-res-coi").attr('checked')? 1 : 0),
            'pickup_as_return': $("#sx-res-booking-entry-pu-eq-ret").attr('checked'),
            // GEODELCOL
            'wants_geo_delivery':       ($("#sx-res-del-col-pu").attr('checked')? 1 : 0),
            'wants_geo_collection':     ($("#sx-res-del-col-ret").attr('checked')? 1 : 0),

            //hier
            'geo_del_name':             $("#geo_del_name").val(),
            'geo_del_street':           $("#geo_del_street").val(),
            'geo_del_postcode':         $("#geo_del_postcode").val(),
            'geo_del_town':             $("#geo_del_town").val(),
            'geo_del_country':          $("#geo_del_country").val(),
            'geo_del_remark':           $("#geo_del_note").val(),

            //hier
            'geo_col_name':             $("#geo_col_name").val(),
            'geo_col_street':           $("#geo_col_street").val(),
            'geo_col_postcode':         $("#geo_col_postcode").val(),
            'geo_col_town':             $("#geo_col_town").val(),
            'geo_col_country':          $("#geo_col_country").val(),
            'geo_col_remark':           $("#geo_col_note").val()
        };
        for(var item in submit_data) {
            params[item] =  $("#" + submit_data[item]).val();
        }

        $.getJSON(url, params, function(response) {
            if (response.err.length > 0) {
                // something went wrong
                var err_code        =  (typeof response.rec.error_codes !== "undefined") ? response.rec.error_codes.join(',') : false;
                // add error code for tracking
                params['err_code']  =  err_code;

                if(response.rec.length || (typeof response.rec.data !== "undefined" && response.rec.data.length)) {
                    sx_offer_alt_suggests(response);
                    // sitecatalyst
                    strack('offer_request_data', params);
                } else {

                    if ( typeof response.rec.must_deliver !== "undefined" ){
                        sx_del_col.set("del", "state", true);
                    }

                    if ( typeof response.rec.must_collect !== "undefined" ){
                        sx_del_col.set("col", "state", true);
                    }

                    if(typeof response.rec.address_alternatives_delivery !== "undefined" || typeof response.rec.address_alternatives_collection !== "undefined") {
                        // create address suggest for geodelcol
                        sx_del_col.import_err(response.rec);
                    }

                    // create error html
                    var out =  "";
                    for (var i = 0; i < response.err.length; i++) {
                        out += "<p>" + response.err[i]['txt'] + "<\/p>";
                    }

                    if (
                        response.err.length
                            &&
                        (
                            typeof response.rec.posl_country_del !== "undefined" || typeof response.rec.posl_country_col !== "undefined"
                        )
                    ) {
                        sx_del_col.on_sx_offer_request_error(response.rec);
                    }


                    // wizzard with callback
                    if(typeof sx_wizzard_error === "function") {
                        sx_wizzard_error( out, response.err );
                        return false;
                    } else {
                        waiter(0);
                        out += "<span><\/span>";
                        $("#sx-js-res-error").html( out ).show();

                    }

                    if(sx_reservation_tpl === "offerselect") {
                        $("#sx-js-res-currentoffer-data").show();
                    }

                    // track error
                    var ctyp     =  ($("#sx-js-res-ctyp").is(":checked"))? "P" : "L";
                    var cat      =  params['uli'] + "-" + www_nam;
                    var act      =  "ctyp-" + ctyp + "-" + response.rec.error_codes.join("-");
                    var res_type =  (typeof response.rec.reservation_type !== "undefined") ? response.rec.reservation_type : false;
                    //alert(cat + " / " + act + " / " + res_type)

                    strack('offer_request_error', params);
                    sx_track(cat, act, res_type);
                    return false;
                }

            } else {
                // hide waiter before submit for mobiles devices
                // cause mobiles will restore state when going back
                if(sx_is_supported_mobile()) {
                    waiter(0);
                }
                // sitecatalyst...
                strack('offerrequest');
                document.offer_request.submit();
            }
        });
        return false;
    };

    /**
     * in case station is closed we display jquery box with alternative stations
     * on select we update station suggest using sx_station_suggest's preset method
     * @author: jw
     * @params: array of stationdata
     */
    function sx_offer_alt_suggests(response) {

        var i, item, li, hint_text;
        var selected_item   =  $("#sx-js-res-pu-location .ddlist-selected").length? $("#sx-js-res-pu-location .ddlist-selected").get(0) : $("#sx-js-res-pu-list ul li:first").get(0);
        var pu_eq_ret       =  ($('#sx-js-res-pickup-cit').val() === $('#sx-js-res-return-cit').val())? true : false;

        // make sure info div is available
        if(!$('#sx-js-res-alt-suggests').length) {
            sx_init_alt_suggests();
        }

        // add error and note
        $('#sx-js-res-alt-suggests').html('<div class="sx-gc-error"><p>' + response.err[0]['txt'] + '<\/p><\/div>');

        // get openhours-table from stationinfo, add
        var openhours   =  "<p><b>" + _sx_res_txt('alt_origin_hd') + "<\/b><\/p>";
            openhours   += "<table>" + selected_item.ooh + "<\/table>";
        $("<div></div>").addClass('sx-res-info-wrapper').html(openhours).appendTo( $('#sx-js-res-alt-suggests') );

        // add header alt suggest
        if (response.err[0]['txt'].indexOf("221") >= 0) {
        	hint_text = _sx_res_txt('alt_open_list_221');
        } else {
        	hint_text = _sx_res_txt('alt_open_list');
        }
        $("<div></div>").html('<p><b>' + hint_text + '</b><br>(' + _sx_res_txt('alt_open_hint') + ')<\/p>').appendTo( $('#sx-js-res-alt-suggests') );

        // add list
        var ul =  $('<ul><\/ul>').appendTo( $('#sx-js-res-alt-suggests') ).addClass('box-window-altcit-list');

        // set current selected station as nearby_search
        // first get selected list item, or, if preset and not clicked yet, the first one
        //
        sx_station_suggest.nearby_search =  {
            'hd':   $("#sx-js-res-pu-location input:first").get(0),
            'item': selected_item,
            'id':   'sx-js-res-pu-location',
            'bounds': false
        };

        // station data on level lower since WATRACK-178
        var data =  response.rec.length? response.rec : ((response.rec.data !== "undefined" && response.rec.data.length)? response.rec.data : []);
        // loop stations in response
        // add li with stationnam
        for(i = 0; item =  data[i]; i++) {
            li =  $('<li><\/li>').appendTo(ul).addClass('sx-gc-active').html(item.SNAM).click(function(){
                // set sx_pickup_json with suggested station as station_nearby
                sx_pickup_json =  {'station_nearby': [this.item]};
                // RAC-8291 sync return station
                if(pu_eq_ret) {
                    sx_return_json =  {'station_nearby': [this.item]};
                }
                // set selected item as suggest preset
                sx_station_suggest.preset();
                $.box.close();

                // tracking
                sx_track(selected_item.liso + "-" + selected_item.txt, 'alternativstation-step1', this.item.LISO + "-" + this.item.SNAM);
            });
            $(li).get(0).item =  item;
        }

        sx_track(selected_item.liso + "-" + selected_item.txt, 'alternativstation-step1');

        $.box.open( 'sx-js-res-alt-suggests' );
    }

    function sx_init_alt_suggests() {
        // agb's
        if(!$("#sx-js-res-alt-suggests").length) {
    	   $('<div><\/div>').appendTo( $('body') ).attr('id', 'sx-js-res-alt-suggests').addClass('box-window-info-content').css('display','none');
        }
        $("#sx-js-res-alt-suggests").box({
            'txttitle': _sx_res_txt('alt_suggests'),
            'width': '450px',
            'height': '400px'
        });
    }


    /** ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     *
     * ctyp
     *
     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

    /**
     * reload with modified ctyp param
     * @author: jw
     * @params: string ctyp
     */
    function sx_set_ctype(ctyp,mod) {
        if (typeof sx_entry_url_ctyp_switch === "undefined" || !sx_entry_url_ctyp_switch) {
            return;
        } else {
            if(mod === "fleet") {
                var ctypstr     =  (ctyp === "P")? 'pkw' : 'lkw';
                var gotostr     =  (ctyp === "P")? 'lkw' : 'pkw';
                var cat         =  "start_" + ctypstr + "_list";
                var act         =  'goto_' + gotostr;
                var label       =  cat + '_' + act;
                sx_track(cat,act,label);
            }
            self.location.href =  sx_entry_url_ctyp_switch;
        }
     }


    /** ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     *
     * del/col, coi, residence
     *
     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /**
     * display del/col if sx_show_del_col is set
     * @author: jw
     */
    function sx_set_del_col() {

        // should be there but you never know...
        if(typeof sx_show_del_col === "undefined") {
            sx_show_del_col =  false;
        }

        // add or remove class cause we display del/col only if IBE was opened
        if( sx_show_del_col ) {
            $("#sx-js-res-booking-del-col").addClass("sx-res-booking-del-col-open");
        } else {
            $("#sx-js-res-booking-del-col").removeClass("sx-res-booking-del-col-open");
            $("#sx-js-res-booking-del-col input").attr("checked", false);
        }
    }

    /**
     * hide suggest if del_col
     * @author  jw
     * @param   {string} delivery or collection
     * @return  {void}
     */
    function sx_select_del_col(delcol) {
        var state   =  $("#sx-res-uk-" + delcol).attr("checked");
        var dpl     =  state? "none" : "";
        $(".sx-js-res-dep-uk-" + delcol).css('display', dpl);
    }

    /**
     * geodelcol
     * new delivery and collection for all company customers
     * RACRESNEW-973
     *
     * @author  joachim.wendenburg@sixt.de
     *
     */
    var sx_del_col =  {

        config: {
            URL_CHECK_DELCOL_COUNTRY:  self.location.protocol + "\/\/" + self.location.host + "/php/reservation/check_delcol_country",
            // make sure we display delcol only if overlay is shown
            jquery_box_is_open: false,
            // store state and addressbook
            geodelcol: {
                del: {
                    state:     false,
                    adr:       [],
                    alt:       false,
                    wants:     false,
                    suggest:   false,
                    countries: []
                },
                col: {
                    state:     false,
                    adr:       [],
                    alt:       false,
                    wants:     false,
                    suggest:   false,
                    countries: []
                }
            },
            // store callbacks when setting geodelcol config vars
            callback: {
                del: {
                    state:     ['handle_delcol', 'reset'],
                    adr:       ['handle_adr'],
                    alt:       ['handle_alt'],
                    wants:     ['handle_wants'],
                    suggest:   ['handle_suggest'],
                    countries: ['handle_countries_list_change']
                },
                col: {
                    state:     ['handle_delcol', 'reset'],
                    adr:       ['handle_adr'],
                    alt:       ['handle_alt'],
                    wants:     ['handle_wants'],
                    suggest:   ['handle_suggest'],
                    countries: ['handle_countries_list_change']
                }
            },
            // jquery selectors, add '-del' or '-col' if depending
            sel: {
                on:          '.sx-js-res-geodelcol-on',
                off:         '.sx-js-res-geodelcol-off',
                ck:          '.sx-js-res-geodelcol-ck',
                adr:         '.sx-js-res-geodelcol-adr',
                country:     'select[name$="country"].sx-res-booking-entry',
                del_country_select_box: '#geo_del_country',
                col_country_select_box: '#geo_col_country',
                alt:         '.sx-js-res-geodelcol-alt',
                pl:          '.sx-has-placeholder',
                del2colcopy: '.sx-js-res-del2colcopy-link',
                checkbox_return_to_pickup_station: '#sx-res-pu-eq-ret',
                checkbox_delcol_pickup: '#sx-res-del-col-pu',
                checkbox_delcol_return: '#sx-res-del-col-ret',
                button_open_delcol: '#sx_open_delcol_in_box'
            },
            testing:        false,
            adrlisttpl:     '',
            html5:          false,
            entries:        {'nam1':'name', 'str':'street', 'plz':'postcode', 'snam':'town', 'liso':'country'}
        },

        /**
         * initialize
         * find out about html5 abilities, start globals import
         *
         * @author  joachim.wendenburg@sixt.de
         * @return  {void}
         */
        init: function() {

            var obj                 =  this;
            var handle_change       =  function() {
                obj.dpl_adrlist($(this));
            };

            // can we deal with placeholder?
            var testinp             =  document.createElement('input');
            this.config.html5       =  ('placeholder' in testinp);

            var $adrlist            =  $(this.config.sel.adr).bind('change',    handle_change);

            var $del2colcopy_link   = $(this.config.sel.del2colcopy).click(function(){
                obj.handle_copy_deldata_to_coldata();
                return false;
            });

            if ( typeof is_relaunch_delcol !== "undefined" && is_relaunch_delcol ) {

                var $delcol_checkboxes  = $(this.config.sel.checkbox_delcol_pickup)
                                         .add(this.config.sel.checkbox_delcol_return)
                                         .click( function(){
                                             obj.handle_delcol_checkbox_click(this);
                                         });

            }

            $(this.config.sel.country).bind('change', function() {
                obj.handle_change_country( $(this) );
            }).change();

            this.config.adrlisttpl  =  $adrlist.eq(0).html();

            this.import_global();
            this.init_placeholder();

            this.db( 'init', this.config );
        },

        /**
         * sx_login/login event handler
         * @author  nikolaos.nikolaidis@sixt.de
         *
         * @return  {void}
         */
            on_sx_login__login_welcome: function( event_data ){
            this.set("del","countries", event_data.posl_country );
            this.set("col","countries", event_data.posl_country );

            this.config.geodelcol.del.suggest = event_data.show_del_suggest;
            this.config.geodelcol.col.suggest = event_data.show_col_suggest;
        },

        /**
         * sx_offer_request error event handler for delcol
         * @author  nikolaos.nikolaidis@sixt.de
         *
         * @return  {void}
         */
        on_sx_offer_request_error: function( event_data ){

            if ( typeof event_data.posl_country_del !== "undefined" ) {
                this.set("del","countries", event_data.posl_country_del );
            }

            if ( typeof event_data.posl_country_col !== "undefined" ) {
                this.set("col","countries", event_data.posl_country_col );
            }

        },

        /**
         * sx_login/logout event handler
         * @author  nikolaos.nikolaidis@sixt.de
         *
         * @return  {void}
         */
        on_sx_login__logout: function( event_data ){
            this.set("del","state", event_data.show_del );
            this.set("col","state", event_data.show_col );

            this.set("del","countries", event_data.posl_country );
            this.set("col","countries", event_data.posl_country );

            this.dpl_hide_delcol_errors();
        },

        /**
         * set the visibility of the delcol error container
         * @author  nikolaos.nikolaidis@sixt.de
         *
         * @return  {void}
         */
        dpl_hide_delcol_errors: function(){
            $("#sx-js-res-error.sx-gc-error ").hide();
        },

        on_suggest_set_as_pickup: function( set_as_pickup_checked ){

            if ( set_as_pickup_checked ){
                if( $("#sx-res-del-col-pu:checked").length )   {
                    $("#sx-res-del-col-ret").attr("checked", true).parents("p").addClass("sx-gc-selected");
                    this.dpl( $("#sx-res-del-col-ret").get(0) );
                    this.handle_copy_deldata_to_coldata();
                } else if( $("#sx-res-del-col-ret:checked").length )   {
                    $("#sx-res-del-col-ret").attr("checked", false).parents("p").removeClass("sx-gc-selected");
                    this.dpl( $("#sx-res-del-col-ret").get(0) );
                }

            }

        },
        /**
         * checks the suggest input field visibility depending on the country liso code
         *
         * @param   {String}    liso_code    liso code
         *
         * @author  nikolaos.nikolaidis@sixt.de
         * @return  {Deferred}
         */
        check_delcol_country: function( liso_code ){

            return $.ajax({
                url: this.config.URL_CHECK_DELCOL_COUNTRY,
                type: "GET",
                data: {
                    tab_identifier: $("#sx-tab-identifier").val(),
                    country_liso:   liso_code
                }
            });
        },

        /**
         * import global vars
         *
         * @author  joachim.wendenburg@sixt.de
         * @return  {void}
         */
        import_global: function() {

            var gdc,
                key,
                geodelcol =  window['sx_geodelcol'] || {};

            this.db( 'import_global', geodelcol );

            for(gdc in geodelcol) {
                for(key in geodelcol[gdc]) {
                    this.set(gdc, key, geodelcol[gdc][key]);
                }
            }
        },

        /**
         * import record.rec from offer-request
         *
         * @author  joachim.wendenburg@sixt.de
         * @param   {object} record.rec json
         * @return  {void}
         */
        import_rec: function(rec) {
            this.set('del', 'state', rec.show_del);
            this.set('col', 'state', rec.show_col);
        },

        /**
         * import record.rec from offer-request in case of error with address
         *
         * @author  joachim.wendenburg@sixt.de
         * @param   {object} record.rec json
         * @return  {void}
         */
        import_err: function(rec) {
            this.set('del', 'alt', rec.address_alternatives_delivery || false);
            this.set('col', 'alt', rec.address_alternatives_collection || false);
        },

        /**
         * set flag del_col
         *
         * @author  joachim.wendenburg@sixt.de
         * @param   {boolean}
         * @return  {void}
         */
        set: function(gdc, key, val) {

            if(typeof this.config.geodelcol[gdc] === "undefined" || typeof this.config.geodelcol[gdc][key] === "undefined") {
                return;
            }

            this.config.geodelcol[gdc][key] = val;
            this.callback(gdc, key, val);
        },

        callback: function(gdc, key, val) {

            var i,
                item,
                avail;

            if(typeof this.config.callback[gdc] === "undefined" || typeof this.config.callback[gdc][key] === "undefined") {
                return;
            }

            // loop callback methods after setting list
            for(i=0;item=this.config.callback[gdc][key][i];i+=1) {
                avail =  this[item] || false;
                if(avail) {
                    this[item](gdc, key, val);
                } else {
                    this.db("method unavailable: " + item);
                }
            }
        },

        /**
         * click event handler for delcol checkboxes
         *
         * @author  nikolaos.nikolaos@sixt.com
         * @return  {void}
         */
        handle_delcol_checkbox_click: function( clicked_checkbox ){
            $_return_cb = $(this.config.sel.checkbox_return_to_pickup_station);

            if(
                ( $(clicked_checkbox).attr("id") === "sx-res-del-col-pu"  && $_return_cb.is(":checked") )
                                                            ||
                ( $(clicked_checkbox).attr("id") === "sx-res-del-col-ret" && !document.getElementById("sx-res-del-col-pu").checked )
            ) {
                $_return_cb.get(0).checked = false;
                sx_station_suggest.set_as_pickup( $_return_cb.get(0) );
                $_return_cb.parents("p").removeClass("sx-gc-selected");
            }
        },


        /**
         * callback after del-col was set
         *
         * @author  joachim.wendenburg@sixt.de
         * @return  {void}
         */
        handle_delcol: function(gdc, key) {
            var dpl =  this.config.geodelcol[gdc]['state']? "inline-block" : "none";

            $(this.config.sel.ck + '-' + gdc).css('display', dpl);
            $(this.config.sel.button_open_delcol).css('display', dpl);
        },


        /**
         * handles delcol countries list after login/logout
         *
         * @author nikolaos.nikolaidis@sixt.de
         * @return  {void}
         */
        handle_countries_list_change: function( del_or_col , config_key, countries ) {

            var $_select_box               = $(this.config.sel[del_or_col + "_country_select_box"]),
                $_select_box_selected_val  = $_select_box.find("option:selected").val(),
                countries_options          = $.map(countries, function( country_name, country_code ){
                    var selected_attr = ($_select_box_selected_val === country_code ? "selected" : ""),
                        val_attribute = "value=" + country_code;

                    return  $("<option " +  val_attribute + " " + selected_attr + ">" + country_name + "</option>").get(0);
                });
                $_select_box.empty().append(countries_options);
        },


        /**
         * callback after adress list was set
         *
         * @author  joachim.wendenburg@sixt.de
         * @return  {void}
         */
        handle_adr: function(gdc, key) {

            var $adrlist               = $(this.config.sel.adr + '-' + gdc).html(""),
                $adrlist_container     = $adrlist.parents("p"),
                $adrlist_adrlist_title = $adrlist.parents("div:first").children("p:first"),
                adr                    = this.config.geodelcol[gdc]['adr'];

            if(!adr || !adr.length) {
                $adrlist_container.add( $adrlist_adrlist_title ).hide();
                return;
            } else {
                $adrlist_container.add( $adrlist_adrlist_title ).show();
            }

            var i,
                item,
                str,
                opt =  this.config.adrlisttpl.replace('###adress###', '...');
                tmp =  opt.replace('###index###', '');

            for(i=0;item=adr[i];i++) {
                str =  item.nam1 + ', ' + item.str + ', ' + item.plz + ' ' + item.snam + ', ' + item.liso;
                opt =  this.config.adrlisttpl.replace('###index###', i);
                tmp += opt.replace('###adress###', str);
            }

            $adrlist.html(tmp).find('option:first').attr('selected', 'selected');
        },


        /**
         * sets the suggest visibility state in the config
         * @author  nikolaos.nikolaidis@sixt.de
         *
         * @param   {String}    delcol_type           delivery / collection - "del" / "col"
         * @param   {mixed}     is_suggest_visible    suggest visibility flag
         *
         * @return  {void}
         */
        set_suggest_visibily: function( delcol_type, is_suggest_visible ){
            this.set( delcol_type, "suggest", is_suggest_visible );
        },

        /**
         * it copies the delivery address data to the collection address data
         *
         * @return  {void}
         */
        handle_copy_deldata_to_coldata: function() {

            var input_fields_to_copy = [
                 "geo_[address_type]_name"
                ,"geo_[address_type]_street"
                ,"geo_[address_type]_postcode"
                ,"geo_[address_type]_town"
            ];

            var  source_name = ""
                ,target_name = "";
            for( var idx in input_fields_to_copy ){
                source_name = input_fields_to_copy[idx].replace("[address_type]", "del");
                target_name = input_fields_to_copy[idx].replace("[address_type]", "col");
                $("input[name='" + target_name + "']").val( $("[name='" + source_name + "']").val() );
            }

            $("select[name='geo_col_country']").get(0).selectedIndex = $("select[name='geo_del_country']").get(0).selectedIndex;
            $("select[name='geo_col_country']").change();
        },

        /**
         * country select box change event handler
         * @author  nikolaos.nikolaidis@sixt.de
         *
         * @param   {jQuery}    $select_box    the country select box
         *
         * @return  {void}
         */
        handle_change_country: function( $select_box ) {
            var obj         = this,
                delcol_type = $select_box.attr("id").split("_")[1],
                liso_code   = $select_box.val();

            this.check_delcol_country( liso_code )
            .done(function( response_data ){

                var  flag_exists_in_response_data = ( typeof response_data.rec !== "undefined" && typeof response_data.rec.show_station_suggest !== "undefined" ),
                     show_station_suggest         = ( flag_exists_in_response_data && !!response_data.rec.show_station_suggest );

                obj.set_suggest_visibily( delcol_type, show_station_suggest );

            })
            .fail(function( err ){});
        },

        dpl_adrlist: function($el) {

            var gdc     =  $el.data('delcol');
            var val     =  $el.val();
            var item    =  this.config.geodelcol[gdc]['adr'][val] || false;

            var key,
                inp,
                val;

            // hier
            for(key in this.config.entries) {
                inp =  'geo_' + gdc + '_' + this.config.entries[key];
                val =  item[key] || '';
                $('input[name=' + inp + ']').val(val);
            }
        },

        handle_wants: function(gdc, key) {
            var wants   =  this.config.geodelcol[gdc]['wants'];
            var $ck     =  $('input[type=checkbox]', this.config.sel.ck + '-' + gdc).attr('checked', wants);
            this.dpl($ck.get(0));
        },



        /**
         * suggest flag change event handler
         * @author  nikolaos.nikolaidis@sixt.de
         *
         * @param   {String}    delcol_type        delivery / collection - "del" / "col"
         * @param   {String}    config_flag_key    config flag key
         *
         * @return  {void}
         */
        handle_suggest: function( delcol_type, config_flag_key ) {
            var delcol_checkbox_suffix_mapping = {
                del: "pu",
                col: "ret"
            };

            var show_suggest             = this.config.geodelcol[delcol_type][config_flag_key],
                suggest_section_selector = this.config.sel.off + "-" + delcol_type,
                $suggest_section         = $( suggest_section_selector ),
                $delcol_checkbox         = $( "#sx-res-del-col-" + delcol_checkbox_suffix_mapping[delcol_type] );

            if ( $delcol_checkbox.length && !!$delcol_checkbox.attr("checked") ) {
                if ( show_suggest ) {
                    $suggest_section.show();
                } else {
                    $suggest_section.hide();
                }
            }
        },

        /**
         * callback after alternative suggestions in case of offer_request error
         *
         * @author  joachim.wendenburg@sixt.de
         * @return  {void}
         */
        handle_alt: function(gdc, key) {

            this.db('alt', this.config.geodelcol)

            var i,
                item,
                str         =  "",
                obj         =  this,
                $wrap       =  $(this.config.sel.alt + '-' + gdc).css('display', 'none'),
                $altlist    =  $('ul:first', $wrap).html(""),
                alt         =  this.config.geodelcol[gdc]['alt'];

            if(!alt) {
                return false;
            }

            for(i=0;item=alt[i];i++) {
                str += '<li data-index="' + i +'" data-delcol="' + gdc + '">' + item.street + ', ' + item.postcode + ' ' + item.town + ', ' + item.country + '<\/li>';
            }


            var handle_click =  function() {
                //hier
                obj.dpl_altlist($(this));
            };

            $altlist.html(str);
            $wrap.css('display', '').find('li', $altlist).bind('click', handle_click);
        },


        dpl_altlist: function($el) {

            var key, inp;
            var gdc     =  $el.data('delcol');
            var idx     =  $el.data('index');
            var item    =  this.config.geodelcol[gdc]['alt'][idx];

            for(key in item) {
                inp =  'geo_' + gdc + '_' + key;
                val =  item[key] || '';
                $('input[name=' + inp + ']').val(val);
            }
        },

        reset: function() {

            var gdc,
                key;

            for(gdc in this.config.geodelcol) {
                if(!this.config.geodelcol[gdc]['state']) {
                    $(this.config.sel.on + '-' + gdc).css('display', 'none');
                    $(this.config.sel.off + '-' + gdc).css('display', '');
                    $('input', this.config.sel.ck + '-' + gdc).attr('checked', false);
                }
            }
        },

        /**
         * callback after geodelcol was set
         *
         * @author  joachim.wendenburg@sixt.de
         * @return  {void}
         */
        dpl: function(el) {

            var def,
                val,
                gdc =  $(el).data('delcol'),
                dpl =  $(el).is(':checked');

            if(dpl) {
                // SLP-63
                // since we display delcol in jquery box
                // we must open the jquery box first!!!
                if (!this.config.jquery_box_is_open) {
                    sx_ibe_dpl_delcol();
                }

                $(this.config.sel.on + '-' + gdc).css('display', '');

                if ( this.config.geodelcol[gdc].suggest ){
                    $(this.config.sel.off + '-' + gdc).css('display', '');
                } else {
                    $(this.config.sel.off + '-' + gdc).css('display', 'none');
                }
            } else {
                $(this.config.sel.on + '-' + gdc).css('display', 'none');
                $(this.config.sel.off + '-' + gdc).css('display', '');
            }

            if (gdc === "col") {
                this.sync_col(dpl);
            }
        },

        set_jquery_box_state: function(state) {
            this.config.jquery_box_is_open = state;
        },

        get_jquery_box_state: function() {
            return this.config.jquery_box_is_open;
        },

        /**
         * sync collection with delivery data
         *
         * @author  joachim.wendenburg@sixt.com
         * @return  {void}
         */
        sync_col: function(dpl) {
            var val;
            for(var i in this.config.entries) {
                val = dpl? $('#geo_del_' + this.config.entries[i]).val() : '';
                $('#geo_col_' + this.config.entries[i]).val(val);
            }
        },

        /**
         * dinos dont know nothing about html5
         * initialize input events and prefilling
         *
         * @author  joachim.wendenburg@sixt.com
         * @return  {void}
         */
        init_placeholder: function() {

            if(this.config.html5) {
                return;
            }

            var $this,
                obj =  this,
                cb  =  function(e) {
                    obj.set_placeholder(this, e.type)
                };

            $(this.config.sel.pl, this.config.sel.on).each(function(){
                $this   =  $(this);
                $this.bind('focus', cb).bind('blur', cb);
                obj.set_placeholder(this, 'blur');
            });
        },

        /**
         * dinos dont know nothing about html5
         * remove or add default values from placeholder attribute
         *
         * @author  joachim.wendenburg@sixt.de
         * @param   {object} input element
         * @param   {string} event type
         * @return  {void}
         */
        set_placeholder: function(el,mod) {
            $el       =  $(el);
            var def   =  $el.attr('placeholder');
            var val   =  $el.val();

            if(mod === "focus") {
                if(val === def) {
                    $el.val('');
                }
            } else {
                if(!val) {
                    $el.val(def);
                }
            }
        },

        db: function() {
            if(!this.config.testing) {
                return false;
            }
            try {
                var i, item;
                for(i=0;item=arguments[i];i+=1) {
                   console.info(item);
                }
            } catch(err) {}
        }
    };


    /**
     * display coi if liso gb and smarty var show_coi
     *
     * @author: jw
     * @params: response.rec.show_del_col
     */
    function sx_set_coi() {

        // should be there but you never know...
        if(typeof sx_show_coi === "undefined") {
            sx_show_coi =  false;
        }

        // add or remove class cause we display coi only if IBE was opened
        if( sx_show_coi && $("#sx-js-res-pickup-liso").val() == "GB" ) {
            $("#sx-js-res-booking-coi").addClass("sx-res-booking-coi-open");
        } else {
            $("#sx-js-res-booking-coi").removeClass("sx-res-booking-coi-open");
            $("#sx-js-res-booking-coi input").attr("checked", false);
        }
    }

    var sx_initial_posl =  false;
    function sx_set_residence(liso, fir) {
        // store posl to reset in case...
        if(!sx_initial_posl) {
            sx_initial_posl =  $("#sx-js-res-posl").val();
        }
        // add/remove class depending on fir or country
        if(
            $("#sx-js-res-is-corpcust").val() != "1" && // only if no real-corpcust
            (liso    === "DK" || liso    === "NO")
        ){
            $("#sx-js-res-residence-wrapper").addClass("sx-res-residence-wrapper-open");
        } else {
            $("#sx-js-res-residence-wrapper").removeClass("sx-res-residence-wrapper-open");
            // reset posl if cit changes again
            $("#sx-js-res-posl").val(sx_initial_posl);
        }
    }

    /**
     * display us-rates as jquery box
     *
     * @author  jw
     * @param   {string} uci
     * @return  {void}
     */
    function sx_get_rates(uci) {

        var $afr    =  $("#sx-js-res-agentprl");
        var $afrd   =  $("#sx-js-res-askforrate-dpl");

        // nothing to do, rate was selected
        if ( !$afr.length ) {
            return;
        }

        // no box created yet
        if( !$afrd.length ) {

            $('<div><\/div>').appendTo( $('body') ).attr('id', 'sx-js-res-askforrate-dpl').css('display','none');

            $afrd =  $("#sx-js-res-askforrate-dpl");
            $afrd.box({
                'width': '650px',
                'height': '350px'
            });
        // reset existing box
        } else {
            // reset
            $afrd.html('');
        }

        // reset hidden
        $afr.val('1');

    	// create params and url
        var url =  sx_create_ajax_url("agent_ratelist");
        var params  =  {
            'tab_identifier':   $("#sx-tab-identifier").val(),
            'uci': uci
        };

        // get rates html
        $.getJSON(url, params, function(response) {
             if (response.err.length) {
                var err =  "";
                for(i in response.err) {
                    err += "<p>" + response.err[i].txt + "<\/p>";
                }
                $('<div><\/div>').addClass('sx-gc-error').html(err).appendTo( $afrd );

            // no error occurred
            } else {
                $('<div><\/div>').addClass('sx-afr-dpl').html(response.htm.txt).appendTo( $afrd );

                // init clickhandler for radios
                $('input[type=radio]', $afrd).click(function() {

                    // get value, write to hidden, reset message and display new rate as message
                    var val = this.value;
                    $afr.val(val);
                    $('.sx-gc-message', $afrd).remove();

                    switch(val) {
                        case '1':
                            $('<div><\/div>').addClass('sx-gc-message').html( _sx_res_txt('sel_home_rate') ).prependTo( $afrd );
                            break;
                        default:
                            var rate =  val;
                            $('<div><\/div>').addClass('sx-gc-message').html( _sx_res_txt('sel_rate').replace('%s', rate) ).prependTo( $afrd );
                    }

                });
             }
             // display jquery box
             $.box.open( $afrd );
        });
    }

    function sx_toggle_posl_view(el){
        /*
        var dpl =  $("span.sx-toggle-posl").is(":visible");
        if(dpl) {
            $("span.sx-toggle-posl").css('display', 'none');
            $("select.sx-toggle-posl").css('display', '');
        } else {
            $("span.sx-toggle-posl").css('display', '');
            $("select.sx-toggle-posl").css('display', 'none');
        }
        */

        if(el !== false) {
            //var idx =  el.selectedIndex;
            //$("#sx-js-res-posl-name").html( $("select.sx-toggle-posl option").get(idx).innerHTML );
            $("#sx-js-res-posl").val( $(el).val() );
        }
    }

    /** ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     *
     * google maps...
     *
     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /**
     * some methods to deal with google maps
     * @params:
     * @author: jw
     */
    var google_map =  {

        map: {},
        mgr: {},
        mgr_isload: {},

        // may contain a collection of markers
        marker_data: [],

        /**
         * initialize a map and markerManager
         * @author: jw
         * @params: map-wrapper id
         */
        create: function(id, latlng) {

            // create map with defaults
            var obj         =  this;
            var opt         =  {
                zoom: 12,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false,
                styles: [{
                    featureType: "poi.business",
                    elementType: "labels",
                    stylers: [
                        {
                            visibility: "off"
                        }

                    ]
                }]
            };
            this.map[id]    =  new google.maps.Map( document.getElementById(id), opt );

            // add event-handler bounds_changed
            google.maps.event.addListener( this.map[id], "bounds_changed", function() {
                obj.handle_bounds_changed(id);
            });
        },

        /**
         * delete map and markerManager
         * @author: jw
         * @params: map-wrapper id
         */
        delete_map: function(id) {
            this.map[id]        =  false;
            this.mgr[id]        =  false;
            this.mgr_isload[id] =  false;
        },

        /**
         * move a map to latlng
         * @author: jw
         * @params: map-wrapper id, google-latlng, zoom or false, object bounds or false (either zoom or bounds), some station-data to pass
         */
        move: function(id, latlng, zoom, bounds) {

            // presetting ddlist may cause a move call without create before...
            if(typeof this.map[id] === "undefined" || !this.map[id]) {
                this.create(id, latlng);
            }

            // store in object and move map
            // hide streetview
            //
            this.map[id].panTo(latlng);
            this.map[id].streetView.setVisible(false);
            //this.map[id].streetView.setPosition(latlng);

            // fit to bounds if bounds are passed
            if(typeof bounds === "object") {
                this.map[id].fitBounds(bounds);
            }

            // set zoom if zoom was passed
            if(zoom) {
                this.map[id].setZoom(zoom);
            }
        },

        /**
         * create google latlng an call move
         * @author: jw
         * @params: obj latu, lotu
         */
        map_by_pos: function(id, pos, zoom) {
            var latlng =  new google.maps.LatLng( pos.lat, pos.lng );
            this.move(id, latlng, zoom, false);
        },

        /**
         * get latlng and bounds from a searchstring by google's geocoder, call move in callback
         * @author: jw
         * @params: map-wrapper id, search, some station-data to pass
         */
        map_by_str: function(id, searchstr) {

            var obj =  this;
            this.get_geocode({'address': searchstr}, function(response) {

                var latlng  =  response[0]["geometry"]["location"];
                var bounds  =  response[0]["geometry"]["bounds"];

                obj.move(id, latlng, false, bounds);
            });
        },
        /**
         * get geocode from searchstring
         * @author: jw
         * @params: searchstring, callback-function
         */
        get_geocode: function( searchobj, cb ) {

            // make sure object is given
            if(typeof searchobj === "string" ) {
                searchobj =  {'address': searchobj}
            }

            var g                   =  new google.maps.Geocoder();
            var obj                 =  this;
            searchobj['language']   =  (typeof sx_language !== "undefined" && sx_language)? sx_language : "de";

            g.geocode(searchobj, function(response, state) {
                // do nothing if response is not valid
                if(state.toLowerCase() !== "ok") {
                    cb(false);
                } else {
                    cb(response);
                }
            });
        },

        /**
         * add marker to markerManager
         * @author: jw
         * @params: map-wrapper id, object station-data, flag to clear old markers
         */
         set_marker: function(id, data, clearing) {

            // do not init without map
            if(typeof this.map[id] === "undefined" || !this.map[id]) {
                return;
            }

            // create marker-manager if not available
            // set loaded flag if loading is done
            // call again
            //
            var i, item, mImg, zoom, latlng, marker, obj =  this;
            if ( typeof this.mgr[id] === "undefined" || !this.mgr[id] ) {
                this.mgr[id] =  new MarkerManager(this.map[id]);
                google.maps.event.addListener(obj.mgr[id], 'loaded', function() {
                    obj.mgr_isload[id] =  true;
                    obj.set_marker (id, data, clearing);
                });
            }
            // do nothing if marker-manager is not ready yet
            if(typeof this.mgr_isload[id] === "undefined" || !this.mgr_isload[id]) {
                return;
            }

            // remove existing markers
            if(clearing) {
                this.mgr[id].clearMarkers();
            }

            for(i = 0; item =  data[i]; i++) {

                mImg    =  this.create_marker_img(item.img);
                /*
                mImg    =  new google.maps.MarkerImage(
                    self.location.protocol + "\/\/" + self.location.host + "/common/img/app/reservation/default/google/marker_sprite.png",
                    new google.maps.Size(62, 39),
                    new google.maps.Point(0,0),
                    new google.maps.Point(8,39)
                );
                */

                // get zoom
                // use station latlng or latlng stored in object after last geocode-search
                zoom    =  this.map[id].getZoom();
                latlng  =  new google.maps.LatLng( item.lat, item.lng );
                marker  =  new google.maps.Marker({
                    position: latlng,
                    title: item.str,
                    icon: mImg
                });

                this.mgr[id].addMarker(marker, zoom);
            }
        },

        create_marker_img: function(img) {

            var pref =  self.location.protocol + "\/\/" + self.location.host + "/common/img/app/reservation/default/google/";
            switch(img) {
                case "p":
                    mImg =  new google.maps.MarkerImage(
                        pref + "marker-position.png",
                        new google.maps.Size(40, 49),
                        new google.maps.Point(0,0),
                        new google.maps.Point(15,42)
                    );
                    break;
                default:
                    mImg =  new google.maps.MarkerImage(
                        pref + "marker-station.png",
                        new google.maps.Size(40, 49),
                        new google.maps.Point(0,0),
                        new google.maps.Point(15,42)
                    );
            }
            return  mImg;
        },

        /**
         * handle event "bounds_changed"
         * @author: jw
         * @params: map-wrapper id
         */
        handle_bounds_changed: function(id) {
            this.set_marker(id,  this.marker_data, true);
        },

        /**
         * set bounds depending on a array of latlng's
         * @author: jw
         * @params: map-wrapper id, array of position-objects {lat:lat, lng:lng}
         */
        set_bounds_by_latlng: function( id, pos ) {
            // create bound object
            var i, item, latlng;
            var bounds  =  new google.maps.LatLngBounds();

            var past =  0;

            // presetting ddlist may cause a move call without create before...
            if( typeof this.map === "undefined" || typeof this.map[id] === "undefined" ) {
                this.create( id, new google.maps.LatLng( pos[1].lat, pos[1].lng ) );
            }

            // loop position-objects and extend bounds
            for(i = 0; item = pos[i]; i++) {
                latlng =  new google.maps.LatLng( item.lat, item.lng );
                bounds.extend(latlng);
            }
            // fit map into bounds
            this.map[id].fitBounds(bounds);

            // if nearby and result pos matches, zoom is to high
            // marker is not displayed...?
            // set zoom a little lower
            //
            var zoom =  this.map[id].getZoom();
            if (zoom > 17) {
                 this.map[id].setZoom(17);
            }
        }
    };

    /** ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     *
     * booking/login display
     *
     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

    /**
     * toggle booking areas className depending on stat
     * @author: jw
     * @params: stat
     */
    function sx_toggle_booking(stat) {

        if( !$(".sx-res-dpl-toggle").length ) {
            return;
        }

        if(stat) {
            $(".sx-res-dpl-toggle").css('display', 'block');
        } else {
            $(".sx-res-dpl-toggle").css('display', 'none');
        }

        sx_toggle_topoffer_dpl();
        var store = (arguments.length > 1)? arguments[1] : true;
        if(store) {
            sx_store_hash.store();
        }
    }

    /**
     * login box view toggle
     * @author: jw
     * @params: optional 0 or 1 to set state (empty or null to get checkbox's checked), optional true or false to store hash
     */
    function sx_toggle_home_login() {

        if(arguments.length && arguments[0] !== null) {
            $("#sx-dpl-login").attr("checked", (arguments[0]? true : false));
        }
        var dpl     =  $("#sx-dpl-login").is(":checked");
        // hide offer request error if still open
        var $err    =  $('#sx-js-res-error');
        if($err.length) {
            $err.css('display', 'none');
        }

        var $lerr   =  $('#sx-js-res-login-error');
        if($lerr.length) {
            $lerr.css('display', 'none');
        }

        /*
        if( dpl && self.location.href.indexOf("http:") === 0) {

            if(confirm("Sie werden nun auf eine sichere Seite umgeleitet")) {
                self.location.href =  self.location.href.replace("http:", "https:");
            } else {
                $("#sx-dpl-login").attr("checked", false);
            }
            return;
        }
        */

        if(dpl) {
            $("#sx-js-home-login-box").addClass("sx-home-login-box-open");
        } else {
            $("#sx-js-home-login-box").removeClass("sx-home-login-box-open");
        }

        sx_toggle_topoffer_dpl();
        var store = (arguments.length > 1)? arguments[1] : true;
        if(store) {
            sx_store_hash.store();
        }
    }

    function sx_toggle_topoffer_dpl() {
        var dpl_ibe     =  $(".sx-res-dpl-toggle:first").is(":visible")? true : false;
        var dpl_login   =  $("#sx-dpl-login").attr("checked");

        if(dpl_ibe || dpl_login) {
            $("#sx-js-button-home-back").css('display', 'block');
            $("#sx-js-home-topoffer").css('display', 'none');
        } else {
            $("#sx-js-button-home-back").css('display', 'none');
            $("#sx-js-home-topoffer").css('display', 'block');
        }
    }

    /**
     * handle hash to deal with back button
     * @author: jw
     */
    sx_store_hash =  {

        state: "0;0",

        /**
         * set onhashchange-handler
         * get hash and set displays depending on hash-values
         * @author: jw
         * @params:
         */
        init: function() {
            try {
                window.onpopstate = function(e) {

                    // get current hash
                    var p =  e.state? e.state.split(";") : "0;0";

                    // second param to avoid pushState here again
                    sx_toggle_booking(parseInt(p[0]), false);
                    sx_toggle_home_login(parseInt(p[1]), false);
                }

            } catch(err) {}
        },
        /**
         * get current display-state and set as location hash
         * @author: jw
         * @params:
         */
        store: function() {
            try {
                // get current displays, store in object's "state"
                var login   =  $("#sx-dpl-login").attr("checked")? 1 : 0;
                var booking =  $(".sx-res-dpl-toggle:visible").length? 1 : 0;
                this.state  =  booking + ";" + login;

                // nothing to do
                if(self.location.hash.substr(1) === this.state) {
                    return;
                }

                // push history
                history.pushState(this.state, document.title, location.href.substr(0, self.location.href.lastIndexOf("#")) + "#" +  this.state);

            } catch(err) {}
        }
    };

    /** ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     *
     * ab-testing
     *
     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
     var sx_is_ab_home =  false;
     function sx_ab_home() {
        var serverid    =  get_cookie("ServerID");
        if( serverid !== "1171" && serverid !== "1172" && serverid !== "1173" ) {
            return;
        }
        // return station already open
        $("#sx-res-booking-entry-pu-eq-ret").attr("checked", false);
        sx_sync_ck_with_content('sx-res-booking-entry-pu-eq-ret',{'sx-js-res-ret-container':false,'sx-js-res-pu-eq-ret':true});
        sx_is_ab_home =  true;
     }

     // TESTING
     function sx_awardsform_init() {
        if(typeof sx_preset_searchstr === "undefined" || !sx_preset_searchstr) {
            return;
        }

        // tracking needs some time... USA-626
        var $pu = arguments.length? $(arguments[0]) : $(".sx-res-booking-entry", "#sx-js-res-pu-location");
        setTimeout(function(){
            $pu.click().val(sx_preset_searchstr);
            sx_station_suggest.cb_filter( $pu.get(0),  document.getElementById('sx-js-res-pu-list'), 'sx-js-res-pu-location' );
        }, 200);
     }


    /** ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     *
     * add ios banner for ipad
     *
     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

     (function() {
        if( !/ipad/i.exec(navigator.userAgent) ) {
            return;
        }

        var metatag             =  document.createElement('meta');
            metatag.name        =  'apple-itunes-app';
            metatag.content     =  'app-id=394632891';

        var head =  document.getElementsByTagName('head')[0];
            head.appendChild(metatag);

    })();

    /** ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     *
     * ibe horizontal - login
     *
     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

    var sx_get_ie_version = function() {
        var myNav = navigator.userAgent.toLowerCase();

        return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : 99;
    };

    var sx_ibe_dpl_login = function() {
        if (sx_get_ie_version() < 11) {
            $('#sx-home-ibe-login').box({
                'txttitle': _sx_res_txt('customerlogin')
            });
            // login needs to know that we display jquery box
            sx_login.login_overlay = 'sx-home-ibe-login';

            sx_ibe_dpl_login = function() {
                SIXT.t3.teaserslider.stopAll();
                $.box.open('sx-home-ibe-login');
            };
            sx_ibe_dpl_login();
        }
    };

    var sx_ibe_dpl_delcol = function() {

        // non responsive versions...
        if (!$('#sx-js-ibe-form').length) {
            sx_ibe_dpl_delcol = function() {
                return false;
            };
            return false;
        }

        $('#sx-js-ibe-form').box({
            txttitle: _sx_res_txt('delcol'),
            windowclass: 'sx-ibe-delcol',
            closealways: false,
            beforeclose: function() {
                $del = $('#sx-res-del-col-pu');
                $col = $('#sx-res-del-col-ret');
                $col.attr('checked', false).parent().removeClass('sx-gc-selected');
                $del.attr('checked', false).parent().removeClass('sx-gc-selected');
                sx_del_col.set_jquery_box_state(false);
                sx_del_col.dpl($del);
                sx_del_col.dpl($col);
                // set return as pickup
                sx_station_suggest.set_return_as_pickup('sx-js-ibe-horizontal', true);
                // move return ddlist to a position behind pickup datetime for delcol
                $('#sx-js-ibe-location-pickup').after($('#sx-js-ibe-location-return'));

                // Hide error messages
                $("#sx-js-res-error").hide();
            },
            beforeopen: function() {
                $del = $('#sx-res-del-col-pu');
                $del.attr('checked', true).parent().addClass('sx-gc-selected');
                sx_del_col.set_jquery_box_state(true);
                sx_del_col.dpl($del);
                // set return !== pickup
                sx_station_suggest.set_return_as_pickup('sx-js-ibe-horizontal', false);
                // move return ddlist back to it's default position
                $('#sx-js-ibe-location-return').appendTo($('#sx-js-ibe-location-return-delcol'));
            }
        });

        sx_ibe_dpl_delcol = function() {
            SIXT.t3.teaserslider.stopAll();
            $.box.open('sx-js-ibe-form');
        }
        sx_ibe_dpl_delcol();
    };

    var sx_dpl_checkin_form = function() {
        $('#sx-js-checkin-form-wrapper').box({
            txttitle: _sx_res_txt('checkin_form'),
            windowclass: 'sx-checkin-form-window'
        });
        sx_dpl_checkin_form = function() {
            $.box.open('sx-js-checkin-form-wrapper');
        };
        sx_dpl_checkin_form();
    };
