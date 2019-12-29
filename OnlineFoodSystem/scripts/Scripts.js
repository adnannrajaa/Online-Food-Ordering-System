$(document).ready(function () {
    $("#Showerror").hide();
});

//var CategoryExist = false;

//function AddNewCategory(form) {
//    $.validator.unobtrusive.parse(form);
//    if ($(form).valid()) {
//        var ajaxConfig = {
//            type: 'POST',
//            url: form.action,
//            data: new FormData(form),
//            success: function (response) {
//                console.log(false);
//            }
           
//        }
        
//        $.ajax(ajaxConfig);

//    }
//    return false;
//}

function UpdateQuantity(id,price)
{
    // alert(id + ' ' + quantity);
    $("#Price").val(price);
    $("#ItemId").val(id);
    $("#Showerror").hide();
}
function EditPrice()
{
    if ($("#Price").val() != "") {
        $.ajax({
            type: "GET",
            url: "/Admin/EditPrice",
            data: { 'Price': $("#Price").val(), 'itemId': $("#ItemId").val() },
            success: function (data) {
                if (data == true) {
                    console.log(data);
                    window.location = "/Admin/Item";
                }
                else {
                    $("#err").append("<label class='text-danger'>Invalid Price</label>");
                }

            }
            
        })
    }
    else
    {
        $("#err").append("<label class='text-danger'>Invalid Price</label>");
    }
   
}
function IsEmpty(price) {
    if ($(price).val() == "")
    {
        $("#Showerror").show();
    }
    else
    {
        $("#err").hide();
    }
}
//function VerifyCatagory(cat)
//{
//    if ($(cat).val() != "")
//    {
//        $.ajax({
//            type: "GET",
//            url: "/Admin/VerifyCategory",
//            data: { 'Category': $(cat).val() },
//            success: function (data) {
//                console.log(data);
//                if (data=="True") {
//                    $("#Showerror").show();
//                }
//                else
//                {
//                    $("#Showerror").hide();
//                }

//            }
//        })
//    }
//    else
//    {
//        $("#Showerror").hide();
//    }

//}

function VerifyImg(Img) {
    if ($(Img).val() != "") {
        $.ajax({
            type: "GET",
            url: "/Admin/VerifyImage",
            data: { 'Image': $(Img).val() },
            success: function (data) {
                console.log(data);
                if (data != "True") {
                    $("#Showerror").show();
                }
                else {
                    $("#Showerror").hide();
                }

            }
        })
    }
    else {
        $("#Showerror").hide();
    }

}
function Delete(id)
{
    $.ajax({
        type: "POST",
        url: "/Admin/DeleteItem",
        data: { 'id': id },
        success: function (response) {
            $('#UpdateTr'+id).empty();
            window.location = '/Admin/Item';
        }
    })
}

function EnableDisable(id)
{
    $.ajax({
        type: "POST",
        url: "/Admin/EnableDisable",
        data: { 'id': id },
        success: function (response) {
            renderEnableDisable(response,id);
        }
    })
}

function OrderDetail(id)
{
    $.ajax({
        type: "GET",
        url: "/Admin/GetOrderDetail",
        data: { 'id': id },
        success: function (response) {
            console.log(response);
            renderDataIntoTable(response);
        }
    })
}

function renderDataIntoTable(response)
{
    $('#records_table').empty();
    var trHTML = '';
    $.each(response, function (i, item) {
        trHTML += '<tr><td>' + ++i + '</td><td>' + item.Name + '</td><td>' + item.description + '</td><td>' + item.Quantity + '</td><td>' + item.Price + '</td><td> <img src="' + item.Image.substr(1) + '" max-height=20></td></tr>';
    });
    $('#records_table').append(trHTML);
    
}

function renderEnableDisable(response,id)
{
    $('#EnableDisable' + id).empty();
    var tdHTML = '';
    if (response == true) {
        tdHTML = "<button title='Disable' class='btn btn-sm btn-outline-warning btn-icon' onclick='EnableDisable(" + id + ")'><i class='nc-icon nc-button-power'></i></button>";
    }
    else {
        tdHTML = "<button title='Enable' class='btn btn-sm btn-outline-success btn-icon' onclick='EnableDisable(" + id + ")'><i class='nc-icon nc-button-power'></i></button>";
    }
    $('#EnableDisable' + id).append(tdHTML);
}
function OrderDeliver(id)
{
    $.ajax({
        type: "POST",
        url: "/Admin/OrderDeliver",
        data: { 'id': id },
        success: function (response) {

            $('#OrderDel').empty();
            $('#OrderDel').text(response.OrderDeliver);

            $('#OrderPen').empty();
            $('#OrderPen').text(response.OrderPending);

            $('#StatusUpdate' + id).empty();
            var tdHtml = '<label class="btn btn-primary">Delivered</label>'
            $('#StatusUpdate' + id).append(tdHtml);

        }
    })
}