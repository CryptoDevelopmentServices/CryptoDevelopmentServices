$(document).ready(function () {

    "use strict";


    var window_width = $(window).width(),

        window_height = window.innerHeight,

        header_height = $(".default-header").height(),

        header_height_static = $(".site-header.static").outerHeight(),

        headerB_height = $(".default-header").height(),

        headerB_height_static = $(".site-header.static").outerHeight(),

        fitscreen = window_height - header_height - headerB_height;


    $(".fullscreen").css("height", window_height)

    $(".fitscreen").css("height", fitscreen);


    if (document.getElementById("default-select")) {

        $('select').niceSelect();

    }
    ;




    //  Counter Js


    if (document.getElementById("counter")) {

        $('.counter').counterUp({

            delay: 10,

            time: 1000

        });

    }
    ;


// MARKETING Wallet Balance

    getMarketingBalance();

    setInterval(getMarketingBalance, 180 * 1000);

    function getMarketingBalance() {

        $.get("../_php/getMarketingBalance.php", function (data) {

            $('.marketing-count').html(data);

           $('.marketing-count').counterUp({

              delay: 10,

              time: 1000

            });

        });

    }

// MARKETING Wallet Balance PERCENTAGE

    getMarketingBalancePercent();

    setInterval(getMarketingBalancePercent, 180 * 1000);

    function getMarketingBalancePercent() {

        $.get("../_php/getMarketingBalancePercent.php", function (data) {

            $('.marketing-percent-count').html(data);

//           $('.marketing-percent-count').counterUp({

//               delay: 10,

//               time: 1000

            });

        };



 // EXCHANGE Wallet Balance

    getExchBalance();

    setInterval(getExchBalance, 180 * 1000);

    function getExchBalance() {

        $.get("../_php/getExchBalance.php", function (data) {

            $('.exchange-count').html(data);

//            $('.exchange-count').counterUp({

//                delay: 10,

//                time: 1000

            });

        };



// EXCHANGE Wallet Balance PERCENTAGE

    getExchangeBalancePercent();

    setInterval(getExchangeBalancePercent, 180 * 1000);

    function getExchangeBalancePercent() {

        $.get("../_php/getExchangeBalancePercent.php", function (data) {

            $('.exchange-percent-count').html(data);

//            $('.exchange-percent-count').counterUp({

//                delay: 10,

//                time: 1000

            });

        };



// DEVELOPMENT Wallet Balance

    getDevBalance();

    setInterval(getDevBalance, 180 * 1000);

    function getDevBalance() {

        $.get("../_php/getDevBalance.php", function (data) {

            $('.dev-count').html(data);

//            $('.dev-count').counterUp({

//                delay: 10,

//                time: 1000

            });

        };



// DEVELOPMENT Wallet Balance PERCENTAGE

    getDevBalancePercent();

    setInterval(getDevBalancePercent, 180 * 1000);

    function getDevBalancePercent() {

        $.get("../_php/getDevBalancePercent.php", function (data) {

            $('.dev-percent-count').html(data);

//            $('.dev-percent-count').counterUp({

//                delay: 10,

//                time: 1000

            });

        };



// Nodes

    getBlockDifficulty();

    setInterval(getBlockDifficulty, 180 * 1000);

    function getBlockDifficulty() {

        $.get("../_php/getBlockDifficulty.php", function (data) {

            $('.block-difficulty').html(data);

            $('.block-difficulty').counterUp({

                delay: 10,

                time: 1000

            });

        });

    }


    getBlockCount();

    setInterval(getBlockCount, 180 * 1000);

    function getBlockCount() {

        $.get("https://explorer.nycoin.info/api/getblockcount", function(data) {

            $('.block-count').html(data);

            $('.block-count').counterUp({

                delay: 10,

                time: 1000

            });

        })
            .done(function() {
                console.log("successfully retrieved block count");
            })
            .fail(function() {
                // TODO: Can fall back to some hard coded calculations here
                console.log("error retrieving block count");
            })

    }



    getTopCountry();

    setInterval(getTopCountry, 120 * 1000);

    function getTopCountry() {

        $.getJSON("../_php/getTopCountry.php", function (data) {

            if (!data['status']) return;


            var str = '';

            for (var i = 0; i < data['item'].length; i++) {

                var item = data['item'][i];

                            str += '<div class="table-row">' +

                    '       <div class="rank">' +

                    '       <img src="' + item.flag + '" alt="flag" height="34" width="34">' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + item.rank + '</div>' +

                    '       <div class="country"> ' + item.country + '</div>' +

                    '       <div class="nodes">' + item.count + '</div>' +

                    '       </div>' +
                    '       </div>'


            }

            $('.ranking-table > .table-body').html(str);

            if (data['fullNodeCount'] != -1) {

                $('.node-count').html(data['fullNodeCount']);

                $('.node-count').counterUp({

                    delay: 10,

                    time: 1000

                });

            }


            if (data['totalCount'] != -1) {

                $('.connection-count').html(data['totalCount']);

                $('.connection-count').counterUp({

                    delay: 10,

                    time: 1000

                });

            }


        });

    }

    function showNodeStatus(type, info) {
        if (type == 0) {
            $('#check-node-status').html('<div class="alert text-center alert-danger" style="display: block;">\n' +
                '    <p class="fa fa-exclamation-circle"></p>&nbsp;Enter valid IP/Port address.\n' +
                '</div>');
        } else if (type == 1) {
            $('#check-node-status').html('<div class="alert text-center alert-danger" style="display: block;">\n' +
                '    <p class="fa fa-exclamation-circle"></p>&nbsp;' + $('#ip').val() +  ' is unreachable.' +
                '</div>');
        } else if (type ==  2) {
            $('#check-node-status').html('<div class="alert text-center alert-success" style="display: block;">\n' +
                '    <p class="fa fa-check-circle"></p>&nbsp;\n' +
                '    <a title="Node status">' + info.ip_addr + ':' + info.port +  '\xa0\xa0' + info.version + '\xa0\xa0' + 'is reachable.</a>\n' +
                '</div>\n');
        }
    }


    $('#search-node > .custom-btn2').click(function() {
        var ip = $('#ip').val(),
            port = $('#port').val();

        if (ip == '' || port == '') {
            showNodeStatus(0, null);
            return;
        }
        $('#check-node-status').html('');
        $('.loading').show();
        $.post("../_php/getNodeStatus.php",
            { ip: ip, port: port},
            function (data) {
                $('.loading').hide();

                data = $.parseJSON(data);
                if (!data['status']) {
                    showNodeStatus(1, null);
                } else {
                    showNodeStatus(2, data.info);
                }
            }
        );
    });

});

