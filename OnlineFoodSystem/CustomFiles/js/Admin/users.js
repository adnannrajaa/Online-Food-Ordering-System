$(() => {
    getUserData()
})

let getUserData = () => {
    $.ajax({
        url: '/Admin/GetUsers',
        type: 'Get',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            loadData(response.result.User)
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
        }

    });
}
let clearTable = () => {
    $("#add-to-cart-table tbody").empty()
}
let loadData = (arg_data) => {
    clearTable()
    arg_data.map((row,index) => {
        renderRow(row,index)
    })
}
let renderRow = (row,index) => {
    const {userId, username,email} = row;
    let dataRow = $("#dataRow").clone();
    dataRow.removeAttr('hidden')
    dataRow.removeAttr('id')
    dataRow.find('#no').text(index+1)
    dataRow.find('#userName').text(username)    
    dataRow.find('#email').text(email)    
    $("#tbody").append(dataRow)
}


