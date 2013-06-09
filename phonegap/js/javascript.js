// Put your custom code here
var cart = [];
var receipt_str;
function displayCart() {
    var cartDiv = $('.cartDiv');
    receipt_str = '';
    cartDiv.html(" ");
    var grandTotal = 0;
    for (var item in cart) {
//            var qty = cart[item].qty;
//            var price = cart[item].price;
//            var subtotal = qty * price;
//            grandTotal += subtotal;
//            cartDiv.append( '<p>' + qty + ': ' + cart[item].name);
//                    + ' $' + price.toFixed(2) + ' == $' +
//                    subtotal.toFixed(2) + '</p>');
        receipt_str += cart[item].name + ' ';

    }
//        cartDiv.append( '<p>Grand Total: $' + grandTotal.toFixed(2) + '</p>')
    cartDiv.append('<p>' + receipt_str + ' Pizza</p>');
}

$(document).ready(function () {
    // Add a buy button to each of my products

    $('div[data-product]').each(function () {
        $(this).append('<button class="btnCart">Add Topping</button>');
    });

    $('.btnCart').on("click", function (event) {
        var pid = $(this).parent().parent().data("product");
        console.log(pid);
        if (cart[pid]) {
//                cart[pid].qty += 1;
        } else {
            cart[pid] = new Object();
            cart[pid].qty = 1;
            cart[pid].pid = pid;
            cart[pid].name = $(this).parent().siblings("span").data("name");
//                cart[pid].price = $(this).parent().siblings("span").next().data("price");
        }
        displayCart();
    });

    $('#buy').on("click", function (event) {
        var buyUrl = "";
        for (var item in cart) {
            buyUrl += "&pid[]=" + item + "&qty[]=" + cart[item].qty;
        }
        $.getJSON('buy.php?' + buyUrl, function (data) {
            $('<ul/>', {
                'class': 'myu-new-list',
                html: data
            }).appendTo('.cartDiv');
            //$("#cartDiv").append(data);
        });
        //console.log( "http://cis217-4.gauthierdevelopment.net/buy.php?" + buyUrl);
        //$("#buy").parent().hide();
    });

    $('#saveOrder').on("click", function (event) {
        var cartStr = "[";
        for (var item in cart) {
            cartStr += JSON.stringify(cart[item]) + ",";
        }
        cartStr = cartStr.slice(0, -1);
        cartStr += "]";
        console.log(cartStr);
        localStorage['cart'] = cartStr;
    });


    $('#loadOrder').on("click", function () {
        cart = [];
        var obj = JSON.parse(localStorage['cart']);
        for (item in obj) {
            pid = obj[item].pid;
            cart[ pid ] = obj[item];
        }
        displayCart();
    });
});

navigator.geolocation.getCurrentPosition(function (pos) {
    var lat = pos.coords.latitude;
    var lng = pos.coords.longitude;
    console.log(lat + " : " + lng);
    $("#lat").text(lat);
    $("#lng").text(lng);
    // var url = '<a href="http://maps.google.com/maps?q=' + lat + ',' + lng + '">Your Location</a>';
    // saddr=???&daddr=????

    var url = '<a href="http://maps.google.com/maps?daddr=2234+E+Sprague+Ave,+Spokane,+WA+99207&saddr=' + lat + ',' + lng + '">Your Location</a>';
    $("#url").html(url);

    var map = '<iframe width="360" height="360" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?daddr=2234+E+Sprague+Ave,+Spokane,+WA+99207&amp;saddr=' + lat + ',' + lng + '&amp;ie=UTF8&amp;t=h&amp;geocode=FRw31wIdgTgA-Q%3BFfOq1wIduLEA-SGSF4-H7rV7wSl16BgaKBmeVDGSF4-H7rV7wQ&amp;ll=47.67371,-117.410545&amp;spn=0.020806,0.030813&amp;z=14&amp;output=embed"></iframe><br /><small><a href="https://maps.google.com/maps?daddr=2234+E+Sprague+Ave,+Spokane,+WA+99207&amp;saddr=47.65878000000001,-117.426047&amp;ie=UTF8&amp;t=h&amp;geocode=FRw31wIdgTgA-Q%3BFfOq1wIduLEA-SGSF4-H7rV7wSl16BgaKBmeVDGSF4-H7rV7wQ&amp;ll=47.67371,-117.410545&amp;spn=0.020806,0.030813&amp;z=14&amp;source=embed" style="color:#0000FF;text-align:left">View Larger Map</a></small>';
    $("#directionMap").html(map);
});


