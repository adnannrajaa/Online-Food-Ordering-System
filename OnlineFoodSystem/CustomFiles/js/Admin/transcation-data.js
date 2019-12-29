var data = []
var filterData = []
let getAvailableDoctors = () => {
    $.ajax({
        url: '/Admin/GetTranscation',
        type: 'Get',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            data = response.result.Order
            loadData(data)
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
    arg_data.map((row, index) => {
        renderRow(row, index)
    })
}

let renderRow = (row,index) => {
    const {TranscationId, CustomerName, dateTime,totalPrice} = row;

    let dataRow = $("#dataRow").clone();
    dataRow.removeAttr('hidden')
    dataRow.removeAttr('id')
    dataRow.find('#no').text(index+1)
    dataRow.find('#trans-id').text(TranscationId)    
    dataRow.find('#customer-name').text(CustomerName)
    dataRow.find('#date-time').text(dateTime)   
    dataRow.find('#total-amount').html(totalPrice)    

    $("#tbody").append(dataRow)
}



let handleTextBoxChange = () => {
    $("#search-by-amount,#search-by-date").on('keyup', (e) => {
        applyFilter($("#search-by-amount").val(),$("#search-by-date").val());
    })
    $("#search-by-date").on('change', (e) => {
        applyFilter($("#search-by-amount").val(),$("#search-by-date").val());
    })
   
}

let applyFilter = (searchByAmount,searchByDate) => {
    filterData = data.filter(x => 
        (searchByAmount == '' || x.totalPrice.toLowerCase().includes(searchByAmount.toLowerCase()))  &&
        (searchByDate == '' || x.dateTime.toLowerCase().includes(searchByDate.toLowerCase()))
      )
    loadData(filterData)
}
$(() => {
    getAvailableDoctors()
    handleTextBoxChange()
    $("#search-by-date").datepicker({
        dateFormat: "dd/mm/yy"
    });
})

