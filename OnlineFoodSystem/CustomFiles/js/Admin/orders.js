$(() => {
    getOrdersData()
})

let getOrdersData = () => {
    $.ajax({
        url: '/Admin/GetOrderDeatail',
        type: 'Get',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            loadData(response.Order)
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
        }

    });
}
let clearTable = () => {
    $("#tableData tbody").empty()
}
let loadData = (arg_data) => {
    clearTable()
    arg_data.map((row,index) => {
        renderRow(row,index)
    })
}

let renderRow = (row,index) => {
    const {orderId,CustomerName,status,dateTime,totalPrice} = row;

    let dataRow = $("#dataRow").clone();
    dataRow.removeAttr('hidden')
    dataRow.removeAttr('id')
    dataRow.find('#No').text(index+1)
    dataRow.find('#customer-name').text(CustomerName)
    dataRow.find('#date-time').text(dateTime)
    if(status=="Complete"){dataRow.find('#status-delivered').removeAttr('hidden')}
    else{dataRow.find('#status-pending').removeAttr('hidden')}
    dataRow.find('#total-price').html(totalPrice) 
    dataRow.find('#details').attr("onclick",`orderDetails(${orderId})`)  
    if(status=="Complete"){dataRow.find('#delivered btn').attr("disabled","disabled")}
    else{dataRow.find('#delivered').attr("onclick",`orderDelivered(${orderId})`) }
     

    $("#tbody").append(dataRow)
}

let orderDetails = (OrderId) =>{
    $("#order-details-modal").modal('show')

    $.ajax({
        type: "GET",
        url: "/Admin/GetOrderDetail",
        data: { 'id': OrderId },
        success: function (response) {
            loadOrderDetails(response)
        }
    })
}
let clearOrderDetailTable = () => {
    $("#order-detail-table tbody").empty()
}
let loadOrderDetails = (arg_data) => {
    clearOrderDetailTable()
    arg_data.map((row,index) => {
        renderOrderDetailRow(row,index)
    })
}
let renderOrderDetailRow = (row,index) => {
    const {Name,Price,Quantity,description,Image} = row;

    let dataRow = $("#order-detail-dataRow").clone();
    dataRow.removeAttr('hidden')
    dataRow.removeAttr('id')
    dataRow.find('#order-details-no').text(index+1)
    dataRow.find('#order-details-name').text(Name)
    dataRow.find('#order-details-description').text(description)
    dataRow.find('#order-details-quantity').text(Quantity)
    dataRow.find('#order-details-price').text(Price)
    dataRow.find('#order-details-image').attr("src","/AppFiles/Images/" + Image)

    $("#order-details-tbody").append(dataRow)
}

let orderDelivered = (OrderId)=>{
    $.ajax({
        type: "POST",
        url: "/Admin/OrderDeliver",
        data: { 'id': OrderId },
        success: function (response) {
            getOrdersData()
        }
    })
}

