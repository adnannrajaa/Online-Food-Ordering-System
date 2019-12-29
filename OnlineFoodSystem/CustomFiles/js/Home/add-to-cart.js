let addToCart = (ItemId) => {
        event.preventDefault();
        var name = $(`.${ItemId}`).data('name');
        var price = Number($(`.${ItemId}`).data('price'));
        var image =$(`.${ItemId}`).data('image');
        var itemId =$(`.${ItemId}`).data('itemid');
        var quantity =$(`.${ItemId}`).data('quantity');
        shoppingCart.addItemToCart(name,quantity,price,image,itemId, 1);
        displayCart();
        $("#cartModal").modal('show')
}

let shoppingCart = (function () {
    // =============================
    // Private methods and propeties
    // =============================

    cart = [];

    // Constructor
    function Item(name,price,image,itemId,quantity, count) {
        this.name = name;
        this.price = price;
        this.image= image;
        this.itemId=itemId;
        this.count = count;
        this.quantity = quantity;


    }

    // Save cart
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }


    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function (name,quantity,price,image,itemId, count) {
        if(Isquantity(name,quantity) == true)
        {
            for (var item in cart) {
                if (cart[item].name === name) {
                    cart[item].count++;
                    saveCart();
                    return;
                }
            }
            var item = new Item(name,price,image,itemId,quantity, count);
            cart.push(item);
            saveCart();
        }
        else{
            $.notify(`We are sorry to say we have only ${quantity} items for ${name}`,'info')
        }
       
    }
    // Set count from item
    obj.setCountForItem = function (name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function () {
        cart = [];
        saveCart();
    }

    // Count cart 
    obj.totalCount = function () {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function () {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function () {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }
    return obj;
})();

let Isquantity=(name,quantity)=>{
    let cartArray = shoppingCart.listCart();
    let totalcounts=0;
    let productName=null;
    cartArray.map(row => {
        totalcounts = (row.count+1)
        productName = row.name
    })
    if(productName==name && totalcounts>quantity)
    {
        return false;
    }
    return true;
}

let clearCartTable =()=>{
    $("#cart-table tbody").empty()
}

let displayCart = () => {
    clearCartTable()
    let cartArray = shoppingCart.listCart();
    cartArray.map((row, index) => {
        renderCartRow(row, index)
    })
    $('.total-cart').html(shoppingCart.totalCart())
}

let renderCartRow = (row, index) => {
    const {image,count,total,itemId,name,price,quantity} = row;
    let dataRow = $("#cart-dataRow").clone();
    dataRow.removeAttr('hidden')
    dataRow.removeAttr('id')
    dataRow.find('#cart-no').text(index+1)    
    dataRow.find('#cart-image').attr("src","/AppFiles/Images/" + image)
    dataRow.find('#cart-quantity').text(count)
    dataRow.find('#cart-quantity').attr("class",`${itemId}`)
    dataRow.find('.value-plus').attr("onclick",`valuePlus(${itemId})`)
    dataRow.find('.value-plus').addClass(`${itemId}`)
    dataRow.find('.value-plus').attr("data-name",name)
    dataRow.find('.value-plus').attr("data-quantity",quantity)


    dataRow.find('.value-minus').attr("onclick",`valueMinus(${itemId})`)
    dataRow.find('.value-minus').addClass(`${itemId}`)
    dataRow.find('.value-minus').attr("data-name",name)
    dataRow.find('.value-plus').attr("data-quantity",quantity)

    dataRow.find('#cart-name').text(name)
    dataRow.find('#cart-price').text(total)
    dataRow.find('.rem').attr("data-name",name)
    dataRow.find('.rem').addClass(`${itemId}`)
    dataRow.find('.rem').attr("onclick",`removeRow(${itemId})`)
    $("#tbody").append(dataRow)
}


let removeRow =(itemId)=>{
    let name = $(`.${itemId}`).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
}

let valueMinus = (itemId)=>{
    let name = $(`.${itemId}`).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
}

let valuePlus= (itemId)=>{
    let name = $(`.${itemId}`).data('name')
    let quantity = $(`.${itemId}`).data('quantity')
    shoppingCart.addItemToCart(name,quantity);
    displayCart();
}

let orderNow = () =>{
    let record_Count=0;
    let cartArray = shoppingCart.listCart();
    cartArray.map((row, index) => {
        record_Count = index+1;
    })
    if(record_Count>0)
    {
        showPaymentPage()
    }
    else
    {
        $.notify("Your shopping cart is empty")
    }
}

       
let showPaymentPage = () => {
    $.ajax({
        url: '/Account/IsUserLogin',
        type: 'Get',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            console.log(response)
            if(response.result)
            {
                window.location = '/Home/Payment';
            }else{
                $("#cartModal").modal('hide')
                openLoginModal();}
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
        }

    });
}
displayCart();


