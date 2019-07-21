var validateEmail = false;
var validPassword = false;

var validSignupEmail = false;
var validSignupPassword = false;
var validSignupName = false;
var validSignupAddress = false;
var validSignupPhoneNumber = false;
var validSignupSalary = false;
var validSignupTenure = false;

$(document).ready(function(){
    if(localStorage.getItem("email")){
        $('.navbar-nav').html("");
        $('.navbar-nav').append("<li class=\"nav-item logout\"><span class=\"nav-link\">Logout</span></li> <li class=\"nav-item dashboard\"><span class=\"nav-link\">Dashboard</span></li>");
    }

    if($('.identify-page').val() == "dashboard"){
        var emailID = localStorage.getItem("email");
        if(emailID){
            $.ajax({
                url: 'http://localhost:1337/status?email='+emailID,
                dataType:'json',
                beforeSend: function( xhr ) {
                   
                }
              })
                .done(function( data ) {
                    $('.dashboard-uniqueID').text(data.id);
                    $('.dashboard-name').text(data.Name);
                    $('.dashboard-email').text(data.Email);
                    $('.dashboard-address').text(data.Address);
                    $('.dashboard-phone').text(data.Phone_Number);
                    $('.dashboard-salary').text(data.Salary);
                    $('.dashboard-tenure').text(data.Salary);
                    $('.dashboard-status').text(data.Status);
            })
        }
        
    }else{
        //don't do anything
    }
});

$(document).on("click","li.logout",function(){
    localStorage.clear();
    window.location.replace("/");
})

$(document).on("click","li.dashboard",function(){
    window.location.replace("/dashboard");
})

$('.signin-email').focus(function(){
    $('.email-message').text('');
});

$('.signin-email').focusout(function(){
    var signInEmail = $('.signin-email').val();
    if(checkForBlank(signInEmail)){
        if(isEmail(signInEmail)){
            $('.email-message').text('Valid Email');
            validateEmail = true;
        }else{
            //email is invalid format
            $('.email-message').text('Invalid Email.');
            validateEmail = false;
        }
    }else{
        //email is blank
        $('.email-message').text('Email Cannot Be Blank');
        validateEmail = false;
    }
});

$('.signin-password').focus(function(){
    $('.password-message').text('Make sure that the password has a length of 6');
});

$('.signin-password').keyup(function(){
    var signInPasswordLength = $('.signin-password').val();
    if(checkLengthForPassword(signInPasswordLength)){
        $('.password-message').text('Valid Password');
        validPassword = true;
    }else{
        $('.password-message').text('Invalid Password');
        validPassword = false;
    }
    
});

$('.signin-button').click(function(){

    if(validateEmail == true && validPassword == true){
        var encryptedPassword = CryptoJS.AES.encrypt($('.signin-password').val(), "cloud computing");
        debugger
        $.ajax({
            url: 'http://localhost:1337/authUser?email='+$('.signin-email').val()+'&password='+encryptedPassword,
            dataType:'json',
            beforeSend: function( xhr ) {
               
            }
          })
            .done(function( data ) {
                var jsonResponse = JSON.stringify(data);
                var response = JSON.parse(jsonResponse);
                if(response.status == "authentic"){
                    localStorage.setItem("email", $('.signin-email').val());
                    window.location.replace("/dashboard");
                }else{
                    alert("Username and password combination is not correct");
                }
        })

    }else{
        $('.password-message').text('Email or password is not valid');
    }
})

function checkLengthForPassword(value){
    if(value.length>6){
        return true;
    }else{
        return false;
    }
}

function checkForBlank(value){
    if(value.length>1){
        return true;
    }else{
        return true;
    }
}
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

// ----------------------------------signup page validation ------------------------------------

$('.signup-email').focus(function(){
    $('.email-message').text('');
});

$('.signup-password').focus(function(){
    $('.password-message').text('');
});

$('.signup-password').focusout(function(){
    var password = $('.signup-password').val();

    if(checkForBlank(password)){
        if(checkLengthForPassword(password)){
            validSignupPassword = true;
            $('.password-message').text('Valid Password');
        }else{
            validSignupPassword = false;
            $('.password-message').text('Invalid Password. Password must be greater than 6 in length');
        }
    }else{
        validSignupPassword = false;
        $('.password-message').text('Password cannot be blank');
    }
});

$('.signup-name').focus(function(){
    $('.name-message').text('');
});

$('.signup-name').focusout(function(){
    var name = $('.signup-name').val();
    
    if(checkForBlank(name)){
        validSignupName = true;
        $('.name-message').text('Valid Name');
    }else{
        validSignupName = false;
        $('.name-message').text('Name cannot be blank');
    }
});


$('.signup-address').focus(function(){
    $('.address-message').text('');
});

$('.signup-address').focusout(function(){
    var address = $('.signup-address').val();
    
    if(checkForBlank(address)){
        validSignupAddress = true;
        $('.address-message').text('Valid Address');
    }else{
        validSignupAddress = false;
        $('.address-message').text('Address cannot be blank');
    }
});

$('.signup-phonenumber').focus(function(){
    $('.phoneNumber-message').text('');
});

$('.signup-phonenumber').focusout(function(){
    var phoneNumber = $('.signup-phonenumber').val();
    
    if(checkForBlank(phoneNumber)){
        validSignupPhoneNumber = true; 
        $('.phonenumber-message').text('Valid Phone Number');
    }else{
        validSignupPhoneNumber = false;
        $('.phonenumber-message').text('Phone Number cannot be blank');
    }
});

$('.signup-salary').focus(function(){
    $('.salary-message').text('');
});

$('.signup-salary').focusout(function(){
    var salary = $('.signup-salary').val();
    if(checkForBlank(salary)){
        validSignupSalary = true;
        $('.salary-message').text('Valid Salary');
    }else{
        validSignupSalary = false;
        $('.salary-message').text('Salary canot be blank');
    }
});

$('.signup-tenure').focus(function(){
    $('.tenure-message').text('');
});

$('.signup-tenure').focusout(function(){
    var tenure = $('.signup-tenure').val();
    if(checkForBlank(tenure)){
        validSignupTenure = true;
        $('.tenure-message').text('Valid Tenure');
    }else{
        validSignupTenure = false;
        $('.tenure-message').text('Tenure Cannot Be Blank');
    }
    
});

$('.signup-email').focusout(function(){
    var signInEmail = $('.signup-email').val();
    if(checkForBlank(signInEmail)){
        if(isEmail(signInEmail)){
            $('.email-message').text('Valid Email');
            validSignupEmail = true;
        }else{
            //email is invalid format
            $('.email-message').text('Invalid Email.');
            validSignupEmail = false;
        }
    }else{
        //email is blank
        $('.email-message').text('Email Cannot Be Blank');
        validSignupEmail = false;
    }
});

$('.signup-button').click(function(){

    if(validSignupEmail==true && validSignupPassword == true && validSignupAddress == true && validSignupName && validSignupPhoneNumber && validSignupSalary && validSignupTenure){
        var encryptedPassword = CryptoJS.AES.encrypt($('.signup-password').val(), "cloud computing");
        debugger
        $.ajax({
            url: 'http://localhost:1337/addUser?name='+$('.signup-name').val()+'&email='+$('.signup-email').val()+'&password='+encryptedPassword+'&address='+$('.signup-address').val()+'&phoneNumber='+$('.signup-phonenumber').val()+'&salary='+$('.signup-salary').val()+'&tenure='+$('.signup-tenure').val(),
            dataType:'json',
            beforeSend: function( xhr ) {
                $('.signup-button').text("Loading...");
            }
          })
            .done(function( data ) {
                var jsonResponse = JSON.stringify(data);
                var response = JSON.parse(jsonResponse);
                if(response.status == "Success"){
                    $('.signup-button').text("Sign Up");
                    localStorage.setItem("email", $('.signup-email').val());
                    window.location.replace("/dashboard");
                }else{
                    alert(response.error);
                }
        })
    }else{
        alert("One of the values is not validated properly, please check again!");
    }
})
