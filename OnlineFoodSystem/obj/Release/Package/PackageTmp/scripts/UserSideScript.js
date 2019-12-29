let ViewCart = () => {
    $("#cartModal").modal('show')
}


//$(function () {
//    $("#loaderbody").addClass('hide');


//    $(document).bind('ajaxStart', function () {
//        $("#loaderbody").removeClass('hide');
//    }).bind('ajaxStop', function () {
//        $("#loaderbody").addClass('hide');
//    });
//});



//function LoadCategory(UlId) {
   
//        $.ajax({
//            type: "GET",
//            url: '/Home/getProductCategories',
//            success: function (response) {
//                renderCategory(response, UlId);
//                console.log(response);
//            }
//        })
//}



//function OrderDetail(id) {
//    $.ajax({
//        type: "GET",
//        url: "/Admin/GetOrderDetail",
//        data: { 'id': id },
//        success: function (response) {
//            console.log(response);
//            renderDataIntoTable(response);
//        }
//    })
//}
//function renderDataIntoTable(response) {
//    $('#records_table').empty();
//    var trHTML = '';
//    $.each(response, function (i, item) {
//        trHTML += '<tr><td>' + ++i + '</td><td>' + item.Name + '</td><td>' + item.description + '</td><td>' + item.Quantity + '</td><td>' + item.Price + '</td><td> <img src="' + item.Image.substr(1) + '" class="img-rounded" style="max-height:200px;max-width:200px" /></td></tr>';
//    });
//    $('#records_table').append(trHTML);

//}

//jQuery(document).ready(function ($) {
//    $(".scroll").click(function (event) {
//        event.preventDefault();
//        $('html,body').animate({ scrollTop: $(this.hash).offset().top }, 1000);
//    });
//    $("#signupbtn").click(function () {

//        $("#myModal").modal('show');

//    });



//    $(".dropdown").hover(
//    function () {
//        $('.dropdown-menu', this).stop(true, true).slideDown("fast");
//        $(this).toggleClass('open');
//    },
//    function () {
//        $('.dropdown-menu', this).stop(true, true).slideUp("fast");
//        $(this).toggleClass('open');
//    }
//);

//    /*
//				var defaults = {
//				containerID: 'toTop', // fading element id
//				containerHoverID: 'toTopHover', // fading element hover id
//				scrollSpeed: 1200,
//				easingType: 'linear'
//				};
//			*/

//    $().UItoTop({ easingType: 'easeOutQuart' });

   

//});


//LoadCategory($('#productCategory'));