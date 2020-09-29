//var landing_page = document.getElementById("landing_page");
var d0 = document.getElementById("landing_page");
var d1 = document.getElementById("login_content_user");
var d2 = document.getElementById("signup_content_user");
var d3 = document.getElementById("dashboard");
var d4 = document.getElementById("home_user");
var d5 = document.getElementById("developer_details_user");
var d6 = document.getElementById("search_page");
var d7 = document.getElementById("login_content_org");
var d8 = document.getElementById("login_content_admin");
var d9 = document.getElementById("signup_content_org");
var d10 = document.getElementById("home_org");
var d11 = document.getElementById("home_admin");
var d14 = document.getElementById("sidebar_user");
var d15 = document.getElementById("sidebar_org");
var d16 = document.getElementById("sidebar_admin");
var d17 = document.getElementById("add_admin_page");
var d18 = document.getElementById("addSat_admin");
var d19 = document.getElementById("addSat_org");
var d21 = document.getElementById("my_satellites");
var my_sat_data = document.getElementById("my_satellite_data");



d0.style.display = "block";
d1.style.display = "none";
d2.style.display = "none";
d3.style.display = "none";
d4.style.display = "none";
d5.style.display = "none";
d6.style.display = "none";
d7.style.display = "none";
d8.style.display = "none";
d9.style.display = "none";
d10.style.display = "none";
d11.style.display = "none";
d14.style.display = "none";
d15.style.display = "none";
d16.style.display = "none";
d17.style.display = "none";
d18.style.display = "none";
d19.style.display = "none";
d21.style.display = "none";



function none_div() {
    d0.style.display = "none";
    d1.style.display = "none";
    d2.style.display = "none";
    d3.style.display = "none";
    d4.style.display = "none";
    d5.style.display = "none";
    d6.style.display = "none";
    d7.style.display = "none";
    d8.style.display = "none";
    d9.style.display = "none";
    d10.style.display = "none";
    d11.style.display = "none";

    d14.style.display = "none";
    d15.style.display = "none";
    d16.style.display = "none";
    d17.style.display = "none";
    d18.style.display = "none";
    d19.style.display = "none";
    d21.style.display = "none";
}

function switch_to_landing_page() {
    none_div();
    login_null();

    d0.style.display = "block";
}

function switch_to_login_user() {
    none_div();
    login_null();
    d1.style.display = "block";
}

function switch_to_login_org() {
    none_div();
    login_null();
    d7.style.display = "block";
}

function switch_to_login_admin() {
    none_div();
    login_null();
    d8.style.display = "block";
}

function switch_to_signup_user() {
    none_div();
    d2.style.display = "block";
}

function switch_to_signup_org() {

    none_div();
    d9.style.display = "block";
}

function switch_to_signup_admin() {
    none_div();
    d10.style.display = "block";
}



function switch_to_dev_user() {
    none_div();
    d14.style.display = "block";
    d3.style.display = "block";
    d5.style.display = "block";
}

function switch_to_dev_org() {
    none_div();
    d15.style.display = "block";
    d3.style.display = "block";
    d5.style.display = "block";
}

function switch_to_dev_admin() {
    none_div();
    d16.style.display = "block";
    d3.style.display = "block";
    d5.style.display = "block";
}

function switch_to_home_user() {
    none_div();
    d3.style.display = "block";
    d4.style.display = "block";
    d14.style.display = "block";
}

function switch_to_home_org() {
    none_div();
    d3.style.display = "block";
    d10.style.display = "block";
    d15.style.display = "block";
}

function switch_to_home_admin() {
    none_div();
    d3.style.display = "block";
    d11.style.display = "block";
    d16.style.display = "block";
}



function switch_to_search_user() {
    none_div();
    d3.style.display = "block";
    d6.style.display = "block";
    d14.style.display = "block";
    document.getElementById("search_results").style.display = "none";
    document.getElementById("textbar").value = "";
}

function switch_to_search_org() {
    none_div();
    d3.style.display = "block";
    d6.style.display = "block";
    d15.style.display = "block";
    document.getElementById("search_results").style.display = "none";
    document.getElementById("textbar").value = "";
}

function switch_to_search_admin() {
    none_div();
    d3.style.display = "block";
    d6.style.display = "block";
    d16.style.display = "block";
    document.getElementById("search_results").style.display = "none";
    document.getElementById("textbar").value = "";
}

function login_null() {

    let user_username = document.getElementById("user_username");
    let user_password = document.getElementById("user_password");
    let org_username = document.getElementById("org_username");
    let org_password = document.getElementById("org_password");
    let admin_username = document.getElementById("admin_username");
    let admin_password = document.getElementById("admin_password");

    user_username.value = "";
    user_password.value = "";
    org_username.value = "";
    org_password.value = "";
    admin_username.value = "";
    admin_password.value = "";
}

function show_add_admin() {
    d17.style.display = "block";
}

function switch_to_addSat_admin() {
    none_div();
    d3.style.display = "block";
    d16.style.display = "block";
    d18.style.display = "block";
}

function switch_to_addSat_org() {
    none_div();
    d3.style.display = "block";
    d15.style.display = "block";
    d19.style.display = "block";
    console.log("hello")
    document.getElementById("org_sat_owner_name").value = org_data.name;
}

function switch_to_my_satellites() {
    none_div();
    /*  let div = document.getElementById("more_details_my_sat");
      div.style.display = "none";
     */
    my_sat_data.innerHTML = "";
    d3.style.display = "block";
    d15.style.display = "block";
    d21.style.display = "block";
    my_satData();

}