let getCategoryData = () => {
    $.ajax({
        url: '/Admin/GetCategory',
        type: 'Get',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            loadData(response.result.Category)
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
    const {CategoryId, CategoryName} = row;
    let dataRow = $("#dataRow").clone();
    dataRow.removeAttr('hidden')
    dataRow.removeAttr('id')
    dataRow.find('#No').text(index+1)
    dataRow.find('#category-name').text(CategoryName)    
    $("#tbody").append(dataRow)
}
$(() => {
    getCategoryData()
})

let AddNewCategory =()=>{
    let categoryName = $("#categoryName").val()
    if(IsFormValid(categoryName))
    {
        verifyCategoryName()
    }
}

let IsFormValid = (categoryName) =>{
    if(!$.trim(categoryName))
    {
        $("#categoryName").val("")
        showErrorMessage("#show-error-msg","Category name is required!")
        return false
    }
    return true
}

let verifyCategoryName =()=>{
    $.ajax({
        url: '/Admin/VerifyCategory',
        type: 'Post',
        data:{'CategoryName':$("#categoryName").val()},
        success: function (response) {
            IsCategoryExist(response.result)
        }
    });
}

let showErrorMessage=(selector,message)=>{
    $(selector).text(message)
    setTimeout( function(){ 
        $(selector).text(''); 
    }, 2000 ); 
}

let IsCategoryExist = (status)=>{
    if(!status)
    {
        $.ajax({
            url: '/Admin/AddNewCategory',
            type: 'Post',
            data:{'CategoryName':$("#categoryName").val()},
            success: function (response) {
                if(response.result)
                {
                    $("#categoryName").val("")
                    $("#myModal").modal('hide')
                    $.notify("Category name added successfully","success")
                    getCategoryData()
                }
            }
        });

    }else{showErrorMessage("#show-error-msg","Category name already exist!")}
}