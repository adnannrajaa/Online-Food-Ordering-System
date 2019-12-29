$(() => {
    loadItemsData()
   
})

let loadItemsData = ()=>{
    getTopProductsItems()
    getHotOffersItems()
}

let getHotOffersItems = () => {
    $.ajax({
        url: '/Home/GetItems',
        type: 'Get',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            loadHotOffersData(response.result.Items)
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
        }

    });
}
let clearHotOffers = () => {
    $("#hot-offers").empty()
}
let loadHotOffersData = (arg_data) => {
    clearHotOffers()
    $("#hot-offers-heading").text("Hot Offers")
    arg_data.map((row,index) => {
        renderHotOffersRow(row,index)
    })
}
let renderHotOffersRow = (row,index) => {
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
let getTopProductsItems = () => {
    $.ajax({
        url: '/Home/GetItems',
        type: 'Get',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            loadTopProductsData(response.result.Items)
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
        }

    });
}
let clearTopProducts = () => {
    $("#top-products").empty()
   
}
let loadTopProductsData = (arg_data) => {
    clearTopProducts()
    arg_data.map((row,index) => {
        renderTopProductsRow(row,index)
    })
}
let renderTopProductsRow = (row,index) => {
    const {image, itemId,name,price,quantity} = row;
    let dataRow = $("#dataCard").clone();
    dataRow.removeAttr('hidden')
    dataRow.removeAttr('id')
    dataRow.find('#item-image').attr("src","/AppFiles/Images/" +image)
    dataRow.find('#item-name').text(name)    
    dataRow.find('#item-price').text(price) 
    dataRow.find('#add-to-cart-button').addClass(`${itemId}`)
    dataRow.find('#add-to-cart-button').attr("onclick",`addToCart(${itemId})`)


    dataRow.find('#add-to-cart-button').attr("data-name",name)
    dataRow.find('#add-to-cart-button').attr("data-price",price)
    dataRow.find('#add-to-cart-button').attr("data-image",image)
    dataRow.find('#add-to-cart-button').attr("data-itemId",itemId)
    dataRow.find('#add-to-cart-button').attr("data-quantity",quantity)
    $("#top-products").append(dataRow)
}




