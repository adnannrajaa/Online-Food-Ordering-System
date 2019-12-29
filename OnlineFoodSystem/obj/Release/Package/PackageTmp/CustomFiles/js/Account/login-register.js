let showRegisterForm =()=>{
    $('.loginBox').fadeOut('fast',function(){
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast',function(){
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('Register');
    }); 
    $('.error').removeClass('alert alert-danger').html('');
    resetDatafeilds()
       
}
let showLoginForm=()=>{
    $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');    
        });
        
        $('.modal-title').html('Login');
    });       
     $('.error').removeClass('alert alert-danger').html(''); 
}

let openLoginModal=()=>{
    showLoginForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
}
let openRegisterModal=()=>{
    showRegisterForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
}

let loginAjax = () =>{
    let userName = $("#userName").val();
    let password = $("#password").val();
    
    if (isFormValid(userName, password) == true)
    {
        let logindata = { 'email': userName, "password": password }
        $.ajax({
            type: "POST",
            url: "/Account/Login",
            data: logindata,
            success: function (response) {
                performActionAccordingToResponse(response)
            }
        });

    }
   


}
let performActionAccordingToResponse = (response) => {
    switch (response.result) {
        case 1:
            window.location = "/Home/Index"
            break
        case 2:
            window.location = "/admin/Index"
            break
        case 0:
            shakeModal("Invalid username/password combination", '.error')
            break
    }
}
let isFormValid = (userName, password) => {
    if (userName == "")
    { shakeModal("username is required", '.error'); return false }
    else if (password == "") { shakeModal("password is required", '.error'); return false }
   return true
}

let shakeModal=(msg,selector)=>{
    $(selector).addClass('alert alert-danger').html(msg);
             setTimeout( function(){ 
                 $(selector).removeClass('alert alert-danger').html("");
    }, 2000 ); 
}
let successMessage = (msg, selector) =>{
    $(selector).removeClass('alert alert-danger').html("");
    $(selector).addClass('alert alert-success').html(msg);
    setTimeout( function(){ 
        $(selector).removeClass('alert alert-success').html("");
    }, 3000 ); 
}

let registerUser = () => {
    if (isFormValidated() == true) {

        let param = {
            UserName: $("#userNameR").val(),
            email: $("#Email").val(),
            password: $("#passwordR").val(),
        }

        $.ajax({
            type: "POST",
            url: "/Account/registerUser",
            data: { '_model': param },
            success: function (response) {
                if (response.result) {
                    resetDatafeilds();
                    successMessage("Your Account Created Successfully!", '.errorRegister')
                }
            }
        });

    }

}
let resetDatafeilds = () => {
    $("#Email").val("")
    $("#userNameR").val("")
    $("#passwordR").val("")
    $("#password_confirmation").val("")
    $(".errorRegister").removeClass('alert alert-danger').html("");
}
let isFormValidated = () => {
    let email = $("#Email").val()
    let userName = $("#userNameR").val()
    let password = $("#passwordR").val()
    let confirmPassword = $("#password_confirmation").val()
    if (email == "") { shakeModal("Email is required", '.errorRegister'); return false }
    else if (userName == "") { shakeModal("User name is required", '.errorRegister'); return false }
    else if (password == "") { shakeModal("Password is required", '.errorRegister'); return false }
    else if (confirmPassword == "") { shakeModal("Confirm password is required", '.errorRegister'); return false }
    else if (confirmPassword != password) { shakeModal("Password not match", '.errorRegister'); return false }
    else if(IsEmailExist()==true){shakeModal("Email already exist!", '.errorRegister'); return false}
    else if(IsUserExist()==true){shakeModal("User already exist!", '.errorRegister'); return false}
    else if(email_validate()==false){shakeModal("Email is not in valid formate!", '.errorRegister'); return false}

    return true

  
}
let email_validate = () =>{
    let email = $("#Email").val()
    var regexPattern = new RegExp(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/);    // regular expression pattern
    let isValid = regexPattern.test(email);
    if(!isValid){
        shakeModal("Email not in valid format", '.errorRegister')
        setTimeout(function () {
            $('.errorRegister').removeClass('alert alert-danger').html("");
        }, 2000);
        return false;
    }
    return true;
}
let IsUserExist = () => {
    $.ajax({
        type: "POST",
        url: "/Account/isUserExist",
        data: { 'UserName': $("#userNameR").val() },
        success: function (response) {
            if (response.result) {
                shakeModal("User name already exist", '.errorRegister')
                return true;
            }
        }
    });
    return false;
}

let IsEmailExist = () => {
    $.ajax({
        type: "POST",
        url: "/Account/IsEmailExist",
        data: { 'Email': $("#Email").val() },
        success: function (response) {
            if (response.result) {
                shakeModal("Email already exist", '.errorRegister')
                return true;
            }
        }
    });
    return false;
}



let showRelatedFeilds = () => {
    let RoleId = $("#userRole option:selected").val()
    if (RoleId == 2) { $("#location").addClass('hide'); $("#carType").removeClass('hide') }
    else if (RoleId == 3) { $("#carType").addClass('hide'); $("#location").removeClass('hide') }
    else {
        $("#carType").addClass('hide')
        $("#location").addClass('hide')
    }
}

$(() => {
    $("#carType").addClass('hide')
    $("#location").addClass('hide')
})