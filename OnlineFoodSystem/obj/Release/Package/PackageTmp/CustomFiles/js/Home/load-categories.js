$(() => {
    getCategoryData()
})

let getCategoryData = () => {
    $.ajax({
        url: '/Home/getProductCategories',
        type: 'Get',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            loadCategoryData(response.category);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
        }

    });
}
let clearListItem = () => {
    $("#add-to-cart-table tbody").empty()
}
let loadCategoryData = (arg_data) => {
    //clearListItem()
    arg_data.map((row,index) => {
        renderCategoryList(row,index)
    })
}
let renderCategoryList = (row,index) => {
    const {catId, name} = row;
    let dataRow = $("#list").clone();
    dataRow.removeAttr('hidden')
    dataRow.removeAttr('id')
    dataRow.find('#categoryName').text(name)  
    dataRow.find('#categoryName').attr("onclick",`GetProductDetailById(${catId})`)
    $("#listData").append(dataRow)
}

let GetProductDetailById =(catId)=>{
    $.ajax({
        url: '/Home/GetProductsById',
        type: 'Get',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data : {'id':catId},
        success: function (response) {
            renderProducts(response.Data.Items,response.CategoryName)
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
        }

    });
}
let clearhotOffers = () => {
    $("#hot-offers").empty()
    
}

let renderProducts =(arg_data,catName)=>{
    clearhotOffers()
    $("#hot-offers-heading").text(catName)
    arg_data.map((row,index) => {
        renderSelectedCategoryProducts(row,index)
    })
}

let renderSelectedCategoryProducts = (row,index) => {
    const {image, itemId,name,price,quantity} = row;
    let dataRow = $("#dataCard").clone();
    dataRow.removeAttr('hidden')
    dataRow.removeAttr('id')
    dataRow.find('#item-image').attr("src","/AppFiles/Images/" + image)
    dataRow.find('#item-name').text(name)    
    dataRow.find('#item-price').text(price) 
    dataRow.find('#add-to-cart-button').addClass(`${itemId}`)
    dataRow.find('#add-to-cart-button').attr("onclick",`addToCart(${itemId})`)



    dataRow.find('#add-to-cart-button').attr("data-name",name)
    dataRow.find('#add-to-cart-button').attr("data-price",price)
    dataRow.find('#add-to-cart-button').attr("data-image",image)
    dataRow.find('#add-to-cart-button').attr("data-itemId",itemId)
    dataRow.find('#add-to-cart-button').attr("data-quantity",quantity)

    
    $("#hot-offers").append(dataRow)
}


