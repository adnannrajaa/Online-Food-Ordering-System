$(() => {
    myVar = setTimeout(showPage, 1000);
})
let makePaymentAndSaveRecord = () => {
    myFunction()
    let values = JSON.parse(sessionStorage.getItem('shoppingCart'));
    values = JSON.stringify({ 'values': values });
    $.ajax({
        url: '/Home/SavePaymentRecord',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data:values,
        success: function (response) {
           renderActionAccordingToResponse(response.result)
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Error : " + errorThrown);
        }
    })
}

let myVar;

let myFunction = () => {
    document.getElementById("loader").style.display = "block";
    document.getElementById("myDiv").style.display = "block";
    myVar = setTimeout(showPage, 10000);
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "none";
}
let renderActionAccordingToResponse = (response) => {

    switch (response) {
        case 1:
            shoppingCart.clearCart();
            window.location = "/Home/CheckOut"
            break
        case 0:
            $.notify("Error occurred : ", "error")
            $.notify("Error occurred : ", "error")
            break
    }
}