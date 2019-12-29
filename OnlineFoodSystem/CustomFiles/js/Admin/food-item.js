$(() => {
    LoadProductsData()
   
})
let LoadProductsData =()=>{
    getFoodItemsData()
    getCategoryData()
}
let getCategoryData = () => {
    $.ajax({
        url: '/Admin/GetCategory',
        type: 'Get',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            loadcategoryData(response.result.Category)
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
        }

    });
}
let loadcategoryData = (arg_data) => {
    arg_data.map((row,index) => {
        renderOptions(row,index)
    })
}
let renderOptions = (row,index) => {
    const {CategoryId, CategoryName} = row;
    let dataRow = $("#dataOption").clone();
    dataRow.removeAttr('hidden')
    dataRow.removeAttr('id')
    dataRow.attr("value",CategoryId)
    dataRow.text(CategoryName)  
    $("#item-category").append(dataRow)
}
let getFoodItemsData = () => {
    $.ajax({
        url: '/Admin/GetFoodItems',
        type: 'Get',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            loadData(response.result.Items)
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
    const {itemId,name, description,price,quantity,image,isEnabled,isDeleted} = row;
    let dataRow = $("#dataRow").clone();
    dataRow.removeAttr('hidden')
    dataRow.removeAttr('id')
    dataRow.find('#No').text(index+1)
    dataRow.find('#name').text(name)  
    dataRow.find('#description').text(description)
    dataRow.find('#price').text(price)
    dataRow.find('#quantity').text(quantity)
    dataRow.find('#Image').attr("src","/AppFiles/Images/" + image)
    dataRow.find('#delete-item').attr('onclick',`deleteProduct(${itemId})`)
    dataRow.find('#edit').attr('onclick',`updateProduct(${itemId},this)`)
    if(isEnabled){
        dataRow.find('#enable').attr('hidden',"")
        dataRow.find('#disable').attr('onclick',`enableDisable(${itemId})`)
    }
    else{
        dataRow.find('#disable').attr('hidden',"")
        dataRow.find('#enable').attr('onclick',`enableDisable(${itemId})`)
    }
    
    $("#tbody").append(dataRow)
}
let enableDisable=(ItemId)=>{
    $.ajax({
        type: "POST",
        url: "/Admin/EnableDisable",
        data: { 'id': ItemId },
        success: function (response) {
            if(response){ $.notify("Item enabled successfully", "warn");}
            else{ $.notify("Item disabled successfully", "success");}
            getFoodItemsData()
        }
    })
}
let updateProduct =(id,ele)=>{
    $("#Price").val("")
    var existingPrice = $(ele).closest("tr").find('td:eq(3)').text();
    $("#Price").val(existingPrice)
    $("#editPriceModal").modal('show')
    $("#edit-price").attr("onclick",`updatePrice(${id})`)
}
let deleteProduct =(ItemId)=>{
    $.ajax({
        type: "POST",
        url: "/Admin/DeleteItem",
        data: { 'id': ItemId },
        success: function (response) {
            if(response){ $.notify("Item deleted successfully", "warn");}
            getFoodItemsData()
        }
    })
}
let updatePrice =(id)=>{
    if(IsPriceValid())
    {
        $.ajax({
            type: "Post",
            url: "/Admin/EditPrice",
            data: { 'Price': $("#Price").val(), 'itemId': id },
            success: function (data) {
                if(data)
                {
                    $("#Price").val("")
                    $("#editPriceModal").modal('hide')
                    $.notify("Price updated successfully", "success")
                    getFoodItemsData()
                }
              
            }
            
        })
    }
}
let IsPriceValid =()=>{
    let price =  $("#Price").val()
   if($.trim(price) == "")
   {
       $("#Price").val("")
       showErrorMessage("#show-error","Price is required!")
       return false
   }
   else if(price<0)
   {
       $("#Price").val("")
       showErrorMessage("#show-error","Price must be greater then 0!")
       return false
   }
   else if(price >10000)
   {
       $("#Price").val("")
       showErrorMessage("#show-error","Invalid price entered!")
       return false
   }
    return true;
}
let showErrorMessage=(selector,message)=>{
    $(selector).removeAttr('hidden');
    $(selector).text(message)
    setTimeout( function(){ 
        $(selector).text(''); 
        $(selector).attr('hidden','');
    }, 2000 ); 
}
let showItemModel=()=>{
    $("#addNewItemModel").modal('show')
    resetItemForm()

}
let IsItemFormValid = () =>{
    let catId = $.trim($("#item-category option:selected").val())
    let name = $.trim($("#item-name").val())
    let description = $.trim($("#item-description").val())
    let price = $.trim($("#item-price").val())
    let quantity = $.trim($("#item-quantity").val())
    let image = $.trim($("#item-image").val())
   
    if (catId==0) { showErrorMessage("#show-error-category", 'Please select category'); return false }
    else if (!name) { showErrorMessage("#show-error-name", 'Item name is required'); $("#item-name").val(""); return false }
    else if (!description) { showErrorMessage("#show-error-description", 'Item description is required');$("#item-description").val(""); return false }
    else if (!price) { showErrorMessage("#show-error-price", 'Item price is required');$("#item-price").val(""); return false }
    else if(price<0 || price>10000){ showErrorMessage("#show-error-price", 'Invalid price entered');$("#item-price").val(""); return false}
    else if (!quantity) { showErrorMessage("#show-error-quantity", 'Item quantity is required');$("#item-quantity").val(""); return false }
    else if(quantity<0 || quantity>10000){ showErrorMessage("#show-error-quantity", 'Invalid quantity entered');$("#item-quantity").val(""); return false }
    else if(!image){ showErrorMessage("#show-error-ImageUpload", 'Image is required');$("#item-image").val(""); return false }
    return true
}
let verifyImageFormat =(Img)=>{
    $.ajax({
        type: "GET",
        url: "/Admin/VerifyImage",
        data: { 'Image': $(Img).val() },
        success: function (data) {
            if (data != "True") {
                showErrorMessage("#show-error-ImageUpload", 'Invalid image format! \t valid format(.png, .jpg, .jpeg)')
                return false
            }
        }
    })
    return true;

}
let resetItemForm=()=>{
    $("#item-category").val("0")
    $("#item-name").val("")
    $("#item-description").val("")
    $("#item-price").val("")
    $("#item-quantity").val("")
    $("#item-image").val("")
}
let VerifyForm = ()=>{
    if(IsItemFormValid())
    {
        $.ajax({
            type: "GET",
            url: "/Admin/VerifyImage",
            data: { 'Image': $('#item-image').val() },
            success: function (data) {
                if (data != "True") {
                    showErrorMessage("#show-error-ImageUpload", 'Invalid image format! \t valid format(.png, .jpg, .jpeg)')
                }
                else
                {
                    $("#savebutton").removeAttr('onclick');
                    $("#savebutton").attr('type','submit');

                }
            }
        })
    }
}

let AddNewItem =(form)=>{
    var ajaxConfig = {
        type: 'POST',
        url: '/Admin/SaveNewFoodItem',
        data: new FormData(form),
        success: function (response) {
            console.log(response)
            if(response.status)
            {
                getFoodItemsData()
                $.notify("Product added successfully!","success")
                resetItemForm()
                $("#").modal('hide')
               
                $("#savebutton").attr('onclick',"VerifyForm()");
                $("#savebutton").attr('type','button');
            }
        }
    }
    if ($(form).attr('enctype') == "multipart/form-data") {
        ajaxConfig["contentType"] = false;
        ajaxConfig["processData"] = false;
    }
    $.ajax(ajaxConfig);
}


