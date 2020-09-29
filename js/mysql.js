var user_data = {
    uid: 0,
    firstName: "",
    lastName: "",
    email_id: "",
    institute: "",
    dob: "",
    username: "",
    password: "",
    address: "",
    count: 0
};

var org_data = {
    moid: 0,
    name: "",
    email_id: "",
    phone: "",
    country: "",
    username: "",
    password: "",
    count1: 0,
    count2: 0,
    type: 0
};

var admin_data = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    type: 0
};

var sat_data = {
    sid: 0,
    name: "",
    purpose: "",
    detailed_purpose: "",
    class_of_orbit: 0,
    type_of_orbit: 0,
    longitude_of_geo: 0,
    perigree: 0,
    apogee: 0,
    eccentricity: 0,
    inclination: 0,
    period: 0,
    launch_mass: 0,
    dry_mass: 0,
    power: 0,
    launch_date: "",
    expected_lifetime_years: 0,
    NORAD_number: 0,
    man_name: "",
    owner_name: "",
    launch_loc: "",
    users: "",
    launch_vehicle: "",
    moid: 0,
    lid: 0,
    count: 0,
    oid: 0,
}

var mysql = require('mysql');
const path = require('path')
const {spawn} = require('child_process')

function runScript(sid_val) {
   return spawn('python', [
      path.join(__dirname, 'TLE_plotter.py'), sid_val
   ]);
}

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    //database: 'satellite_management_system'
    database: 'test'
});

connection.connect((err) => {
    if (err) {
        return console.log("Connection to the server failed");
    }
    console.log("Connection to the server Success");
    count_records();
});



function count_records() {
    let test_query = "select count(*) as count from user_account;";
    console.log(test_query);
    connection.query(test_query, function (error, answer, fields) {
        if (error) {
            console.log(answer);
            return console.log("username query failed");
        };
        console.log("Query success", answer[0].count);
        user_data.count = answer[0].count;
    });

    test_query = "select count(*) as count from manufacturing_org;";
    connection.query(test_query, function (error, answer, fields) {
        if (error) {
            console.log(answer);
            return console.log("username query failed");
        };
        console.log("Query success", answer[0].count);
        org_data.count1 = answer[0].count;
    });

    test_query = "select count(*) as count from owner_org;";
    connection.query(test_query, function (error, answer, fields) {
        if (error) {
            console.log(answer);
            return console.log("username query failed");
        };
        console.log("Query success", answer[0].count);
        org_data.count2 = answer[0].count;

    });

    test_query = "select count(*) as count from satellites;";
    connection.query(test_query, function (error, answer, fields) {
        if (error) {
            console.log(answer);
            return console.log("username query failed");
        };
        console.log("Query success", answer[0].count);
        sat_data.count = answer[0].count;

    });
}

function end_connection() {
    connection.end();
}

function set_banner_values() {
    console.log(user_data.count, org_data.count1, org_data.count2, sat_data.count);
    var a1 = document.getElementById("num_of_users1");
    a1.innerHTML = user_data.count;
    var a2 = document.getElementById("num_of_users2");
    a2.innerHTML = user_data.count;
    var a3 = document.getElementById("num_of_users3");
    a3.innerHTML = user_data.count;

    var b1 = document.getElementById("num_of_manu_users1");
    var b2 = document.getElementById("num_of_manu_users2");
    var b3 = document.getElementById("num_of_manu_users3");

    b1.innerHTML = b2.innerHTML = b3.innerHTML = org_data.count1;

    var c1 = document.getElementById("num_of_launch_users1");
    var c2 = document.getElementById("num_of_launch_users2");
    var c3 = document.getElementById("num_of_launch_users3");

    c1.innerHTML = c2.innerHTML = c3.innerHTML = org_data.count2;

    var d1 = document.getElementById("num_of_sat1");
    var d2 = document.getElementById("num_of_sat2");
    var d3 = document.getElementById("num_of_sat3");

    d1.innerHTML = d2.innerHTML = d3.innerHTML = sat_data.count;

}

function login_user() {

    admin_data.type = 0;
    console.log("admin", admin_data.type)
    username = document.getElementById("user_username");
    password = document.getElementById("user_password");
    let query = `select * from user_account where username like binary'` + username.value + `' and ` + `password like binary'` + password.value + `';`;
    console.log(username, password, query);
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(results);
            return console.log("query failed");
        };
        console.log("Query success", results);
        if (results.length === 0) {
            console.log("incorrect username or password");
            let alert_notif = document.getElementById("user_notif");
            alert_notif.innerHTML = "Incorrect username or password";
            setTimeout(() => {
                alert_notif.innerText = ""
            }, 3000);
        } else {
            console.log("Correct", results);
            login_null();
            user_data.uid = results[0].uid;
            user_data.firstName = results[0].first_name;
            user_data.lastName = results[0].last_name;
            user_data.email_id = results[0].email_id;
            user_data.institute = results[0].organisation;
            user_data.dob = results[0].date_of_birth;
            user_data.username = results[0].username;
            user_data.password = results[0].password;
            user_data.address = results[0].address;
            show_user_image();
            switch_to_home_user();
            profile_data_user();
            set_banner_values();
        }

    });
}



function login_org() {

    admin_data.type = 0;
    console.log("admin", admin_data.type)
    let d20 = document.getElementById("sidebar_add_org");

    username = document.getElementById("org_username");
    password = document.getElementById("org_password");
    let type = document.getElementsByName("optradio");
    if (type[0].checked == true) {
        let query = `select * from manufacturing_org where username like binary'` + username.value + `' and ` + `password like binary'` + password.value + `';`;
        console.log(username, password, query);
        connection.query(query, function (error, results, fields) {
            if (error) {
                console.log(results);
                return console.log("query failed");
            };
            console.log("Query success", results);
            if (results.length === 0) {
                console.log("incorrect username or password");
                let alert_notif = document.getElementById("org_notif");
                alert_notif.innerHTML = "Incorrect username or password";
                setTimeout(() => {
                    alert_notif.innerText = ""
                }, 3000);
            } else {
                console.log("Correct", results[0]);
                var d3 = document.getElementById("dashboard");
                d3.style.display = "block";
                username.value = "";
                password.value = "";

                org_data.moid = results[0].MOID;
                org_data.name = results[0].name;
                org_data.email_id = results[0].email_id;
                org_data.phone = results[0].phone;
                org_data.country = results[0].country;
                org_data.username = results[0].username;
                org_data.password = results[0].password;
                org_data.type = 1;


                switch_to_home_org();
                d20.style.display = "none";
                profile_data_org();
                set_banner_values();
            }

        });
    } else {

        let query = `select * from owner_org where username like binary'` + username.value + `' and ` + `password like binary'` + password.value + `';`;
        console.log(username, password, query);
        connection.query(query, function (error, results, fields) {
            if (error) {
                console.log(results);
                return console.log("query failed");
            };
            console.log("Query success", results);
            if (results.length === 0) {
                console.log("incorrect username or password");
                let alert_notif = document.getElementById("org_notif");
                alert_notif.innerHTML = "Incorrect username or password";
                setTimeout(() => {
                    alert_notif.innerText = ""
                }, 3000);
            } else {
                console.log("Correct");
                var d3 = document.getElementById("dashboard");
                d3.style.display = "block";
                username.value = "";
                password.value = "";
                org_data.type = 2;
                org_data.moid = results[0].OID;
                org_data.name = results[0].name;
                org_data.email_id = results[0].email_id;
                org_data.phone = results[0].phone;
                org_data.country = results[0].country;
                org_data.username = results[0].username;
                org_data.password = results[0].password;
                org_data.type = 2;
                switch_to_home_org();
                d20.style.display = "block";
                profile_data_org();

                set_banner_values();
            }

        });
    }
}

function login_admin() {

    admin_data.type = 1;
    console.log("admin", admin_data.type)
    username = document.getElementById("admin_username");
    password = document.getElementById("admin_password");
    let query = `select * from admin where username like binary '` + username.value + `' and ` + `password like binary '` + password.value + `';`;
    console.log(username, password, query);
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(results);
            return console.log("query failed");
        };
        console.log("Query success", results);
        if (results.length === 0) {
            console.log("incorrect username or password");
            let alert_notif = document.getElementById("admin_notif");
            alert_notif.innerHTML = "Incorrect username or password";
            setTimeout(() => {
                alert_notif.innerText = ""
            }, 3000);
        } else {
            console.log("Correct", results);
            admin_data.firstName = results[0].first_name;
            admin_data.lastName = results[0].last_name;
            admin_data.username = results[0].username;
            admin_data.password = results[0].password;
            var d3 = document.getElementById("dashboard");
            d3.style.display = "block";
            username.value = "";
            password.value = "";

            switch_to_home_admin();
            document.getElementById("admin_profile_first_name").value = admin_data.firstName;
            document.getElementById("admin_profile_last_name").value = admin_data.lastName;
            document.getElementById("admin_profile_username").value = admin_data.username;
            document.getElementById("admin_profile_password").value = admin_data.password;
            set_banner_values();
        }

    });
}

function profile_data_user() {
    document.getElementById("user_profile_uid").innerHTML = user_data.uid;
    document.getElementById("user_profile_fname").value = user_data.firstName;
    document.getElementById("user_profile_email").value = user_data.email_id;
    document.getElementById("user_profile_dob").value = user_data.dob;
    document.getElementById("user_profile_username").value = user_data.username;
    document.getElementById("user_profile_password").value = user_data.password;
    document.getElementById("user_profile_lname").value = user_data.lastName;
    document.getElementById("user_profile_org").value = user_data.institute;
    document.getElementById("user_profile_address").value = user_data.address;
}

function profile_data_org() {
    var head = document.getElementById("org_head");
    if (org_data.type == 1) {
        head.innerText = "Manufacturing Organisation ID:   " + org_data.moid;
        console.log()
    } else {
        head.innerText = "Owner ID:   " + org_data.moid;
    }
    document.getElementById("org_profile_name").value = org_data.name;
    document.getElementById("org_profile_email").value = org_data.email_id;
    document.getElementById("org_profile_phone").value = org_data.phone;
    document.getElementById("org_profile_username").value = org_data.username;
    document.getElementById("org_profile_password").value = org_data.password;
    document.getElementById("org_profile_country").value = org_data.country;
}



function signup_user() {
    let first_name = document.getElementById("user_first_name");
    let last_name = document.getElementById("user_last_name");
    let email = document.getElementById("user_email_id");
    let dob = document.getElementById("user_dob");
    let val = document.querySelectorAll("user_type");
    let org = document.getElementById("user_organisation");
    let username = document.getElementById("user_username_ent");
    let password = document.getElementById("user_password_ent");
    let address = document.getElementById("user_address");
    let username_validate = document.getElementById("user_username_validate");
    let terms_checkbox = document.getElementById("user_terms_checkbox");
    let terms_text = document.getElementById("user_terms_text");

    var checkboxes = document.getElementsByName('type');
    var type = "";
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        if (checkboxes[i].checked) {
            type += "," + checkboxes[i].value;
        }
    }
    console.log(type);
    if (type) type = type.substring(1);
    console.log(type);

    user_data.firstName = first_name;
    user_data.lastName = last_name;
    user_data.email_id = email;
    user_data.dob = dob;
    user_data.institute = org;
    user_data.address = address;
    user_data.username = username;
    user_data.password = password;
    console.log("firstname", first_name.value, "\nlastname:", last_name.value, "\nemail:", email.value, "\ndob:", dob.value, "\ntype:", type.value, "\nusername: ", username.value, "\npassword:", password.value,
        "\norg:", org.value, "\naddress:", address.value);
    let answer;

    if (!terms_checkbox.checked) {

        user_terms_text.innerHTML = "Please agree to the terms and conditions to register";

    } else {


        let check = "select username from user_account where username like binary'" + user_data.username.value + "';";
        console.log(check);
        connection.query(check, function (error, answer, fields) {
            if (error) {
                console.log(answer);
                return console.log("username query failed");
            };
            console.log("Query success", answer);
            if (answer.length != 0) {
                console.log("Length is not 0");
                username_validate.style.display = "block";
                username_validate.innerHTML = "The username is taken";
            } else {

                username_validate.style.display = "none";
                let query =
                    "INSERT INTO `user_account`(`uid`, `first_name`, `last_name`, `email_id`, `date_of_birth`, `organisation`, `address`, `username`, `password`) VALUES(NULL, '" + user_data.firstName.value + "', '" + user_data.lastName.value + "', '" + user_data.email_id.value + "', '" + user_data.dob.value + "', '" + user_data.institute.value + "', '" + user_data.address.value + "', '" + user_data.username.value + "', '" + user_data.password.value + "')";

                console.log(query);

                let alert_notif = document.getElementById("user_notif");

                connection.query(query, function (error, results, fields) {
                    if (error) {
                        console.log(results);
                        alert_notif.style.color = "red";
                        alert_notif.innerHTML = "Registration failed";
                        return console.log("query failed");
                    };
                    console.log("Query success", results);
                    alert_notif.style.color = "green"
                    alert_notif.innerHTML = "Registration was sucessful";
                    switch_to_login_user();

                });


                setTimeout(() => {
                    let query2 = "select uid from user_account where username like binary '" + user_data.username.value + "';";
                    connection.query(query2, function (error, results, fields) {
                        if (error) {
                            console.log(results);
                            console.log(query2);
                        }
                        console.log(query2);
                        let image_id = results[0].uid;
                        console.log("retrieved uid");
                        add_user_image(image_id);
                    });
                }, 300);



                setTimeout(() => {
                    alert_notif.innerText = ""
                }, 3000);


            }
        });
    }
}

function signup_org() {
    let name = document.getElementById("org_name");
    let email = document.getElementById("org_email_id");
    let phone = document.getElementById("org_phone");
    let username = document.getElementById("org_username_ent");
    let password = document.getElementById("org_password_ent");
    let country = document.getElementById("org_country");
    let type = document.getElementsByName("type");

    let username_validate = document.getElementById("org_username_validate");
    let terms_checkbox = document.getElementById("org_terms_checkbox");
    let terms_text = document.getElementById("org_terms_text");

    org_data.name = name;
    org_data.email_id = email;
    org_data.phone = phone;
    org_data.username = username;
    org_data.password = password;
    org_data.country = country;

    console.log();
    let answer;

    if (!terms_checkbox.checked) {

        org_terms_text.innerHTML = "Please agree to the terms and conditions to register";
    } else {


        let check = "select * from manufacturing_org,owner_org where manufacturing_org.username like '" + org_data.username.value + "' or owner_org.username like '" + org_data.username.value + "';";
        console.log(check);
        connection.query(check, function (error, answer, fields) {
            if (error) {
                console.log(answer);
                return console.log("username query failed");
            };
            console.log("Query success", answer);
            if (answer.length != 0) {
                console.log("Length is not 0");
                username_validate.style.display = "block";
                username_validate.innerHTML = "The username is taken";
            } else {
                username_validate.style.display = "none";
                let alert_notif = document.getElementById("org_notif");
                console.log("Inserting into database");
                if (type[0].checked) {
                    let query0 =
                        "insert into owner_org values(NULL, '" + org_data.name.value + "', '" + org_data.email_id.value + "', '" + org_data.phone.value + "', '" + org_data.country.value + "', '" + org_data.username.value + "', '" + org_data.password.value + "')";

                    console.log(query0);
                    connection.query(query0, function (error, results, fields) {
                        if (error) {
                            console.log(results);
                            alert_notif.style.color = "red";
                            alert_notif.innerHTML = "Registration failed";
                            console.log("query failed");
                        };
                        console.log("Query success", results);
                        alert_notif.style.color = "green"
                        alert_notif.innerHTML = "Registration was sucessful";
                    });
                }


                if (type[1].checked) {
                    let query1 =
                        "insert into manufacturing_org values(NULL,'" + org_data.name.value + "','" + org_data.email_id.value + "','" + org_data.phone.value + "','" + org_data.country.value + "','" + org_data.username.value + "','" + org_data.password.value + "')";

                    console.log(query1);

                    connection.query(query1, function (error, results, fields) {
                        if (error) {
                            console.log(results);
                            alert_notif.style.color = "red";
                            alert_notif.innerHTML = "Registration failed";
                            return console.log("query failed");
                        }
                        console.log("Query success", results);
                        alert_notif.style.color = "green"
                        alert_notif.innerHTML = "Registration was sucessful";
                    });
                }
                setTimeout(() => {
                    alert_notif.innerText = ""
                }, 3000);
            }

        });

        switch_to_login_org();
    }

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




function modify_profile_user() {
    user_data.firstName = document.getElementById("user_profile_fname");
    user_data.lastName = document.getElementById("user_profile_lname");
    user_data.email_id = document.getElementById("user_profile_email");
    user_data.dob = document.getElementById("user_profile_dob");
    user_data.institute = document.getElementById("user_profile_org");
    user_data.address = document.getElementById("user_profile_address");
    user_data.username = document.getElementById("user_profile_username");
    user_data.password = document.getElementById("user_profile_password");
    let alert = document.getElementById("modify_notif_user");
    console.log(user_data.uid);

    let query = "update user_account set first_name = '" + user_data.firstName.value + "', last_name = '" + user_data.lastName.value + "', email_id =' " + user_data.email_id.value + "', date_of_birth = '" + user_data.dob.value + "', organisation = '" + user_data.institute.value + "', address = '" + user_data.address.value + "', username = '" + user_data.username.value + "', password = '" + user_data.password.value + "' where uid = " + user_data.uid + ";";
    console.log(query);
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(results);
            alert.innerText = "Updation of your data failed";
            alert.style.color = "red";
            return console.log("Update Failed");
        } else {
            console.log("Update success", results);
            alert.style.color = "green";
            alert.innerText = "Your profile has been updated";
        }

    });

    update_user_image(user_data.uid);

    setTimeout(function () {
        alert.innerText = ""
    }, 3500);
}


function modify_profile_org() {
    org_data.name = document.getElementById("org_profile_name");
    org_data.email_id = document.getElementById("org_profile_email");
    org_data.phone = document.getElementById("org_profile_phone");
    org_data.username = document.getElementById("org_profile_username");
    org_data.country = document.getElementById("org_profile_country");
    org_data.password = document.getElementById("org_profile_password");
    let alert = document.getElementById("modify_notif_org");
    console.log(org_data.moid);
    let query = "";
    if (org_data.type === 1) {
        query = "update manufacturing_org set name = '" + org_data.name.value + "', email_id = '" + org_data.email_id.value + "', phone =' " + org_data.phone.value + "', country = '" + org_data.country.value + "', username = '" + org_data.username.value + "', password = '" + org_data.password.value + "' where MOID = " + org_data.moid + ";";
    } else {
        query = "update owner_org set name = '" + org_data.name.value + "', email_id = '" + org_data.email_id.value + "', phone =' " + org_data.phone.value + "', country = '" + org_data.country.value + "', username = '" + org_data.username.value + "', password = '" + org_data.password.value + "' where OID = " + org_data.moid + ";";
    }
    console.log(query);
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(results);
            alert.innerText = "Updation of your data failed";
            alert.style.color = "red";
            return console.log("Update Failed");
        } else {
            console.log("Update success", results);
            alert.style.color = "green";
            alert.innerText = "Your profile has been updated";
        }
        setTimeout(function () {
            alert.innerText = ""
        }, 3500);
    });
}

function modify_profile_admin() {
    admin_data.firstName = document.getElementById("admin_profile_first_name");
    admin_data.lastName = document.getElementById("admin_profile_last_name");
    admin_data.username = document.getElementById("admin_profile_username");
    admin_data.password = document.getElementById("admin_profile_password");
    let alert = document.getElementById("modify_notif_admin");
    console.log(org_data.moid);
    let query = "update admin set first_name = '" + admin_data.firstName.value + "', last_name = '" + admin_data.lastName.value + "', password = '" + admin_data.password.value + "' where username like binary '" + admin_data.username + ";";
    console.log(query);
    connection.query(query, function (error, results, fields) {
        if (error) {
            console.log(results);
            alert.innerText = "Update Failed";
            alert.style.color = "red";
            return console.log("Update Failed");
        } else {
            console.log("Update success", results);
            alert.style.color = "green";
            alert.innerText = "Updated Succefully";
        }
        setTimeout(function () {
            alert.innerText = ""
        }, 3500);
    });
}

function add_admin() {


    let username = document.getElementById("add_admin_username");

    let notif = document.getElementById("modify_notif_admin");
    let check = "select * from admin where username like binary '" + username.value + "';";
    connection.query(check, function (error, answer, fields) {
        if (error) {
            console.log("search failed");
        } else {
            if (answer.length != 0) {
                notif.style.color = "red";
                notif.innerText = "Username already Exists";
            } else {
                let first_name = document.getElementById("add_admin_fname");
                let last_name = document.getElementById("add_admin_lname");
                let password = document.getElementById("add_admin_password");
                console.log(first_name.value, last_name.value, username.value, password.value);
                let query = "insert into admin values('" + username.value + "', '" + password.value + "', '" + first_name.value + "', '" + last_name.value + "');"
                console.log(query)
                connection.query(query, function (error, results, fields) {
                    if (error) {
                        console.log("admin reg failed");
                        notif.style.color = "red";
                        notif.innerText = "Registration Failed";
                    } else {
                        notif.style.color = "green";
                        notif.innerText = "Registration Successful";
                    }
                    d17.style.display = "none";
                });

            }
        }
    });
    first_name.value = "";
    last_name.value = "";
    username.value = "";
    password.value = "";
    setTimeout(() => {
        notif.innerText = "";
    }, 3000);

}


function add_satellite_admin() {
    sat_data.name = document.getElementById("sat_name").value;
    sat_data.purpose = document.getElementById("sat_purpose").value;
    sat_data.detailed_purpose = document.getElementById("sat_detailed_purpose").value;
    sat_data.class_of_orbit = document.getElementById("sat_class_of_orbit").value;
    sat_data.type_of_orbit = document.getElementById("sat_type_of_orbit").value;
    sat_data.launch_date = document.getElementById("sat_launch_date").value;
    sat_data.expected_lifetime_years = document.getElementById("sat_lifetime").value;
    sat_data.longitude_of_geo = document.getElementById("sat_longitude").value;
    sat_data.perigree = document.getElementById("sat_perigree").value;
    sat_data.apogee = document.getElementById("sat_apogee").value;
    sat_data.eccentricity = document.getElementById("sat_eccentricity").value;
    sat_data.inclination = document.getElementById("sat_inclination").value;
    sat_data.period = document.getElementById("sat_period").value;
    sat_data.launch_mass = document.getElementById("sat_launch_mass").value;
    sat_data.dry_mass = document.getElementById("sat_dry_mass").value;
    sat_data.power = document.getElementById("sat_power").value;
    sat_data.NORAD_number = document.getElementById("sat_norad").value;
    sat_data.man_name = document.getElementById("sat_man_org_name").value;
    sat_data.owner_name = document.getElementById("sat_owner_name").value;
    sat_data.launch_loc = document.getElementById("sat_launch_loc").value;
    sat_data.users = document.getElementById("sat_users").value;
    sat_data.launch_vehicle = document.getElementById("sat_vehicle").value;


    let moid = 0;
    let oid = 0;
    let lid = 0;
    let sid = 0;
    let flag = 0;

    let man_query = "select MOID from manufacturing_org where name like '%" + sat_data.man_name + "%';";
    let owner_query = "select OID from owner_org where name like '" + sat_data.owner_name + "';";
    let launch_query = "select LID from launch_loc where name like '" + sat_data.launch_loc + "';";

    let notif = document.getElementById("addSat_notif");
    console.log(sat_data, man_query, owner_query, launch_query);

    connection.query(man_query, function (error, results1, fields) {
        if (error) {
            console.log("man query failed");
            notif.style.color = "red";
            notif.innerText = "Query Failed";
        }
        if (results1.length == 0) {
            notif.style.color = "red";
            notif.innerText = "Manufacturing Organisation does not exist";
        } else {
            moid = results1[0].MOID;
            console.log("MOID", moid);
            connection.query(owner_query, function (error, results2, fields) {
                if (error) {
                    console.log('owner query failed');
                    notif.style.color = "red";
                    notif.innerText = "Query Failed";
                    flag = 1;
                } else if (results2.length == 0) {
                    notif.style.color = "red";
                    notif.innerText = "Owner Organisation does not exist";
                    flag = 1;
                } else {
                    oid = results2[0].OID;
                    console.log("OID", oid);
                    connection.query(launch_query, function (error, results3, fields) {
                        if (error) {
                            console.log("launch query failed");
                            notif.style.color = "red";
                            notif.innerText = "Query Failed";
                            flag = 1;
                        } else if (results3.length == 0) {
                            notif.style.color = "red";
                            notif.innerText = "Launch Location does not exist";
                            flag = 1;
                        } else {
                            lid = results3[0].LID;
                            console.log("LID", lid);
                        }
                    })
                }
            })
        }
    });
    setTimeout(() => {
        console.log("MOID", moid, "OID", oid, "LID", lid);
        if (moid != 0 && oid != 0 && lid != 0) {
            let sat_query = "insert into satellites values( NULL, '" + sat_data.name + "', '" + sat_data.purpose + "', '" + sat_data.detailed_purpose + "', '" + sat_data.class_of_orbit + "', '" + sat_data.type_of_orbit + "', " + sat_data.longitude_of_geo + ", " + sat_data.perigree + ", " + sat_data.apogee + ", " + sat_data.eccentricity + ", " + sat_data.inclination + ", " + sat_data.period + ", " + sat_data.launch_mass + ", " + sat_data.dry_mass + ", " + sat_data.power + ", '" + sat_data.launch_date + "', " + sat_data.expected_lifetime_years + ", " + sat_data.NORAD_number + ", '" + sat_data.users + "', '" + sat_data.launch_vehicle + "');";
            connection.query(sat_query, function (error, results, fields) {
                if (error) {
                    console.log("SAT query failed\n", sat_query);
                    notif.innerText = "Query Failed";
                    flag = 1;
                } else {
                    notif.style.color = "green";
                    notif.innerText = "Satellite has been added";
                    console.log("Satellite added");
                }
            })
        }
        setTimeout(() => {
            notif.innerText = "";
        }, 10000);

        let get_sid_query = "select SID from satellites where name like '" + sat_data.name + "';";
        connection.query(get_sid_query, function (error, answer, fields) {
            if (error) {
                console.log("error get_Sid");
                flag = 1;
            } else {
                console.log(answer[0]);
                sid = answer[0].SID;
                console.log("SID", sid);

            }
        });
        setTimeout(() => {
            console.log("sid=", sid);

            let man_sat_query = "insert into manufacturing_sat values(" + moid + ", " + sid + ");";
            let launch_sat_query = "insert into launch_sat values(" + lid + ", " + sid + ");";
            let owner_sat_query = "insert into owner_sat values(" + oid + ", " + sid + ");";

            connection.query(man_sat_query, function (error, results, fields) {
                if (error) {
                    console.log("man_sat query failed");
                    flag = 1;
                } else {
                    console.log("man_sat query success")
                }
            });

            connection.query(launch_sat_query, function (error, results, fields) {
                if (error) {
                    console.log("launch_sat query failed");
                    flag = 1;
                } else {
                    console.log("launch_sat query success")
                }
            });

            connection.query(owner_sat_query, function (error, results, fields) {
                if (error) {
                    console.log("owner_sat query failed");
                    flag = 1;
                } else {
                    console.log("owner_sat query success")
                }
            });
        }, 1000);
    }, 1000);

    if (flag == 0) {
        document.getElementById("sat_name").value = "";
        document.getElementById("sat_purpose").value = ""
        document.getElementById("sat_detailed_purpose").value = "";
        document.getElementById("sat_class_of_orbit").value = "";
        document.getElementById("sat_type_of_orbit").value = "";
        document.getElementById("sat_launch_date").value = "";
        document.getElementById("sat_lifetime").value = null;
        document.getElementById("sat_longitude").value = null;
        document.getElementById("sat_perigree").value = null;
        document.getElementById("sat_apogee").value = null;
        document.getElementById("sat_eccentricity").value = null;
        document.getElementById("sat_inclination").value = null;
        document.getElementById("sat_period").value = null;
        document.getElementById("sat_launch_mass").value = null;
        document.getElementById("sat_dry_mass").value = null;
        document.getElementById("sat_power").value = null;
        document.getElementById("sat_norad").value = null;
        document.getElementById("sat_man_org_name").value = "";
        document.getElementById("sat_owner_name").value = "";
        document.getElementById("sat_launch_loc").value = "";
    }
}


function add_satellite_org() {
    sat_data.name = document.getElementById("org_sat_name").value;
    sat_data.purpose = document.getElementById("org_sat_purpose").value;
    sat_data.detailed_purpose = document.getElementById("org_sat_detailed_purpose").value;
    sat_data.class_of_orbit = document.getElementById("org_sat_class_of_orbit").value;
    sat_data.type_of_orbit = document.getElementById("org_sat_type_of_orbit").value;
    sat_data.launch_date = document.getElementById("org_sat_launch_date").value;
    sat_data.expected_lifetime_years = document.getElementById("org_sat_lifetime").value;
    sat_data.longitude_of_geo = document.getElementById("org_sat_longitude").value;
    sat_data.perigree = document.getElementById("org_sat_perigree").value;
    sat_data.apogee = document.getElementById("org_sat_apogee").value;
    sat_data.eccentricity = document.getElementById("org_sat_eccentricity").value;
    sat_data.inclination = document.getElementById("org_sat_inclination").value;
    sat_data.period = document.getElementById("org_sat_period").value;
    sat_data.launch_mass = document.getElementById("org_sat_launch_mass").value;
    sat_data.dry_mass = document.getElementById("org_sat_dry_mass").value;
    sat_data.power = document.getElementById("org_sat_power").value;
    sat_data.NORAD_number = document.getElementById("org_sat_norad").value;
    sat_data.man_name = document.getElementById("org_sat_man_org_name").value;
    sat_data.owner_name = org_data.name;
    sat_data.launch_loc = document.getElementById("org_sat_launch_loc").value;
    sat_data.users = document.getElementById("org_sat_users").value;
    sat_data.launch_vehicle = document.getElementById("org_sat_vehicle").value;


    let moid = 0;
    let oid = 0;
    let lid = 0;
    let sid = 0;
    let flag = 0;

    let man_query = "select MOID from manufacturing_org where name like '" + sat_data.man_name + "';";
    let owner_query = "select OID from owner_org where name like '" + sat_data.owner_name + "';";
    let launch_query = "select LID from launch_loc where name like '" + sat_data.launch_loc + "';";

    let notif = document.getElementById("org_addSat_notif");
    console.log(sat_data, man_query, owner_query, launch_query);

    connection.query(man_query, function (error, results1, fields) {
        if (error) {
            console.log("man query failed");
            notif.style.color = "red";
            notif.innerText = "Query Failed";
        }
        if (results1.length == 0) {
            notif.style.color = "red";
            notif.innerText = "Manufacturing Organisation does not exist";
        } else {
            moid = results1[0].MOID;
            console.log("MOID", moid);
            connection.query(owner_query, function (error, results2, fields) {
                if (error) {
                    console.log('owner query failed');
                    notif.style.color = "red";
                    notif.innerText = "Query Failed";
                    flag = 1;
                } else if (results2.length == 0) {
                    notif.style.color = "red";
                    notif.innerText = "Owner Organisation does not exist";
                    flag = 1;
                } else {
                    oid = results2[0].OID;
                    console.log("OID", oid);
                    connection.query(launch_query, function (error, results3, fields) {
                        if (error) {
                            console.log("launch query failed");
                            notif.style.color = "red";
                            notif.innerText = "Query Failed";
                            flag = 1;
                        } else if (results3.length == 0) {
                            notif.style.color = "red";
                            notif.innerText = "Launch Location does not exist";
                            flag = 1;
                        } else {
                            lid = results3[0].LID;
                            console.log("LID", lid);
                        }
                    })
                }
            })
        }
    });
    setTimeout(() => {
        console.log("MOID", moid, "OID", oid, "LID", lid);
        if (moid != 0 && oid != 0 && lid != 0) {
            let sat_query = "insert into satellites values( NULL, '" + sat_data.name + "', '" + sat_data.purpose + "', '" + sat_data.detailed_purpose + "', '" + sat_data.class_of_orbit + "', '" + sat_data.type_of_orbit + "', " + sat_data.longitude_of_geo + ", " + sat_data.perigree + ", " + sat_data.apogee + ", " + sat_data.eccentricity + ", " + sat_data.inclination + ", " + sat_data.period + ", " + sat_data.launch_mass + ", " + sat_data.dry_mass + ", " + sat_data.power + ", '" + sat_data.launch_date + "', " + sat_data.expected_lifetime_years + ", " + sat_data.NORAD_number + ", '" + sat_data.users + "', '" + sat_data.launch_vehicle + "');";
            console.log(sat_query)
            connection.query(sat_query, function (error, results, fields) {
                if (error) {
                    console.log("SAT query failed");
                    notif.innerText = "Query Failed";
                    flag = 1;
                } else {
                    notif.style.color = "green";
                    notif.innerText = "Satellite has been added";
                    console.log("Satellite added");
                }
            })
        }

        let get_sid_query = "select SID from satellites where name like '" + sat_data.name + "';";
        connection.query(get_sid_query, function (error, answer, fields) {
            if (error) {
                console.log("error get_Sid");
                flag = 1;
            } else {
                console.log(answer[0]);
                sid = answer[0].SID;
                console.log("SID", sid);
            }
        });
    }, 1000);

    setTimeout(() => {
        console.log("sid=", sid);

        let man_sat_query = "insert into manufacturing_sat values(" + moid + ", " + sid + ");";
        let launch_sat_query = "insert into launch_sat values(" + lid + ", " + sid + ");";
        let owner_sat_query = "insert into owner_sat values(" + oid + ", " + sid + ");";

        connection.query(man_sat_query, function (error, results, fields) {
            if (error) {
                console.log("man_sat query failed");
                flag = 1;
            } else {
                console.log("man_sat query success")
            }
        });

        connection.query(launch_sat_query, function (error, results, fields) {
            if (error) {
                console.log("launch_sat query failed");
                flag = 1;
            } else {
                console.log("launch_sat query success");
            }
        });

        connection.query(owner_sat_query, function (error, results, fields) {
            if (error) {
                console.log("owner_sat query failed");
                flag = 1;
            } else {
                console.log("owner_sat query success");
            }
        });
    }, 1500);


    if (flag == 0) {
        document.getElementById("sat_name").value = "";
        document.getElementById("sat_purpose").value = ""
        document.getElementById("sat_detailed_purpose").value = "";
        document.getElementById("sat_class_of_orbit").value = "";
        document.getElementById("sat_type_of_orbit").value = "";
        document.getElementById("sat_launch_date").value = 0;
        document.getElementById("sat_lifetime").value = 0;
        document.getElementById("sat_longitude").value = 0;
        document.getElementById("sat_perigree").value = 0;
        document.getElementById("sat_apogee").value = 0;
        document.getElementById("sat_eccentricity").value = 0;
        document.getElementById("sat_inclination").value = 0;
        document.getElementById("sat_period").value = 0;
        document.getElementById("sat_launch_mass").value = 0;
        document.getElementById("sat_dry_mass").value = 0;
        document.getElementById("sat_power").value = 0;
        document.getElementById("sat_norad").value = 0;
        document.getElementById("sat_man_org_name").value = "";
        document.getElementById("sat_owner_name").value = "";
        document.getElementById("sat_launch_loc").value = "";
    }

    setTimeout(() => {
        notif.innerText = "";
    }, 10000);

}

function my_satData() {
    //Manufacturing organisation
    let div = document.getElementById("more_details_my_sat");
    //   div.style.display = "none";
    if (org_data.type == 1) {
        let rows;
        let query1 = "select * from satellites where SID in (select SID from manufacturing_sat where MOID = " + org_data.moid + ");";
        console.log(query1);

        connection.query(query1, function (error, results, fields) {

            for (let i = 0; i < results.length; i++) {
                rows = "<td>" + results[i].sid + "</td><td>" + results[i].name + "</td><td>" + results[i].purpose + "</td><td>" + results[i].detailed_purpose + "</td><td>" + results[i].NORAD_number + "</td><td>" + results[i].users + "</td>"

                let tr = document.createElement("tr");

                let button = document.createElement("button");
                button.setAttribute("data-toggle", "collapse");
                button.setAttribute("class", "btn btn-info");
                button.setAttribute("value", "Learn More");
                button.setAttribute("onclick", "learn_more_sat(" + results[i].sid + ")");
                button.setAttribute("data-target", "#more_details_my_sat");
                button.setAttribute("data-toggle", "modal");
                button.setAttribute("id", "sat_" + results[i].sid);
                button.innerHTML = "Learn More"
                tr.innerHTML = rows;

                tr.innerHTML += "<td>" + button.outerHTML + "</td>";
                console.log(tr);
                my_sat_data.appendChild(tr);
            }

        });

    } else {
        let rows;
        let query1 = "select * from satellites where SID in (select SID from owner_sat where OID = " + org_data.moid + ");";
        console.log(query1);

        connection.query(query1, function (error, results, fields) {

            for (let i = 0; i < results.length; i++) {
                rows = "<td>" + results[i].sid + "</td><td>" + results[i].name + "</td><td>" + results[i].purpose + "</td><td>" + results[i].detailed_purpose + "</td><td>" + results[i].NORAD_number + "</td><td>" + results[i].users + "</td>"

                let tr = document.createElement("tr");

                let button1 = document.createElement("button");
                button1.setAttribute("data-toggle", "collapse");
                button1.setAttribute("class", "btn btn-info");
                button1.setAttribute("value", "Learn More");
                button1.setAttribute("onclick", "learn_more_sat(" + results[i].sid + ")");
                button1.setAttribute("data-target", "#more_details_my_sat");
                button1.setAttribute("data-toggle", "modal");
                button1.setAttribute("id", "sat_" + results[i].sid);
                button1.innerHTML = "Learn More";

                let button2 = document.createElement("button")
                button2.setAttribute("data-toggle", "collapse");
                button2.setAttribute("class", "btn btn-danger");
                button2.setAttribute("value", "Learn More");
                button2.setAttribute("onclick", "modify_sat_show(" + results[i].sid + ")");
                button2.setAttribute("data-target", "#modify_details_my_sat");
                button2.setAttribute("data-toggle", "modal");
                button2.setAttribute("id", "sat_" + results[i].sid);
                button2.innerHTML = "Modify Details";

                tr.innerHTML = rows;

                tr.innerHTML += "<td>" + button1.outerHTML + "</td>";
                tr.innerHTML += "<td>" + button2.outerHTML + "</td>"
                console.log(tr);
                my_sat_data.appendChild(tr);
            }

        });
    }
}

function learn_more_sat(value) {
    let div = document.getElementById("more_details_my_sat");
    div.style.display = "block";
    let table_data1 = document.getElementById("my_sat_learn_more_data_1");
    let table_data2 = document.getElementById("my_sat_learn_more_data_2");
    let table_data3 = document.getElementById("my_sat_learn_more_data_3");

    table_data1.innerHTML = "";
    table_data2.innerHTML = "";
    table_data3.innerHTML = "";

    let users, norad, man_name, own_name, launch_names;

    let query1 = "select * from satellites where SID =" + value + ";";
    let query2 = "select name from manufacturing_org where MOID in (select MOID FROM manufacturing_sat where sid=" + value + ");"
    let query3 = "select name from owner_org where OID in (select OID from owner_sat where sid = " + value + ");"
    let query4 = "select name from launch_loc where LID in (select LID from launch_sat where sid = " + value + ");"
    console.log(value);

    let rows1, rows2, rows3;


    setTimeout(() => {
        connection.query(query1, function (error, results, fields) {
            rows1 = "<td>" + results[0].sid + "</td><td>" + results[0].name + "</td><td>" + results[0].purpose + "</td><td>" + results[0].detailed_purpose + "</td><td>" + results[0].class_of_orbit + "</td><td>" + results[0].type_of_orbit + "</td><td>" + results[0].longitude_of_GEO + "</td><td>" + results[0].perigee_km + "</td><td>" + results[0].apogee_km + "</td>"

            let tr1 = document.createElement("tr");
            tr1.innerHTML = rows1;
            table_data1.appendChild(tr1);
            console.log(table_data1);


            rows2 = "<td>" + results[0].eccentricity + "</td><td>" + results[0].inclination_deg + "</td><td>" + results[0].period_minutes + "</td><td>" + results[0].Launch_mass_kg + "</td><td>" + results[0].dry_mass_kg + "</td><td>" + results[0].power_W + "</td><td>" + results[0].launch_date + "</td><td>" + results[0].expected_lifetime_years + "</td><td>" + results[0].launch_vehicle + "</td>";
            let tr2 = document.createElement("tr");
            tr2.innerHTML = rows2;
            table_data2.appendChild(tr2);
            console.log(table_data2);

            rows3 = "<td>" + results[0].users + "</td><td>" + results[0].NORAD_number + "</td>";
            console.log(rows3);
        });
    }, 200);
    console.log(rows3);

    setTimeout(() => {
        connection.query(query2, function (error, results, fields) {
            if (error)
                console.log(error)
            rows3 += "<td>" + results[0].name + "</td>";
        });
    }, 250);


    console.log(rows3);

    setTimeout(() => {
        connection.query(query3, function (error, results, fields) {
            rows3 += "<td>" + results[0].name + "</td>";
        });
    }, 300);
    console.log(rows3);
    setTimeout(() => {
        connection.query(query4, function (error, results, fields) {
            rows3 += "<td>" + results[0].name + "</td>";
        });
    }, 350);


    console.log(rows3);

    setTimeout(() => {
        let tr3 = document.createElement("tr");
        tr3.innerHTML = rows3;
        table_data3.appendChild(tr3);
    }, 400);
}

function modify_sat_show(value) {

    let query1 = "select * from satellites where sid = " + value + ";";
    let query2 = "select name,MOID from manufacturing_org where MOID in (select MOID from manufacturing_sat where sid = " + value + ");";
    let query3 = "select name,LID from launch_loc where LID in (select LID from launch_sat where sid = " + value + ");";

    sat_data.sid = value;

    connection.query(query1, function (error, results, fields) {
        sat_data.name = document.getElementById("mod_sat_name").value = results[0].name;
        sat_data.purpose = document.getElementById("mod_sat_purpose").value = results[0].purpose;
        sat_data.detailed_purpose = document.getElementById("mod_sat_detailed_purpose").value = results[0].detailed_purpose;
        sat_data.class_of_orbit = document.getElementById("mod_sat_class_of_orbit").value = results[0].class_of_orbit;
        sat_data.type_of_orbit = document.getElementById("mod_sat_type_of_orbit").value = results[0].type_of_orbit;
        sat_data.launch_date = document.getElementById("mod_sat_launch_date").value = results[0].launch_date;
        sat_data.expected_lifetime_years = document.getElementById("mod_sat_lifetime").value = results[0].expected_lifetime_years;
        sat_data.longitude_of_geo = document.getElementById("mod_sat_longitude").value = results[0].longitude_of_GEO;
        sat_data.perigree = document.getElementById("mod_sat_perigree").value = results[0].perigee_km;
        sat_data.apogee = document.getElementById("mod_sat_apogee").value = results[0].apogee_km;
        sat_data.eccentricity = document.getElementById("mod_sat_eccentricity").value = results[0].eccentricity;
        sat_data.inclination = document.getElementById("mod_sat_inclination").value = results[0].inclination_deg;
        sat_data.period = document.getElementById("mod_sat_period").value = results[0].period_minutes;
        sat_data.launch_mass = document.getElementById("mod_sat_launch_mass").value = results[0].Launch_mass_kg;
        sat_data.dry_mass = document.getElementById("mod_sat_dry_mass").value = results[0].dry_mass_kg;
        sat_data.power = document.getElementById("mod_sat_power").value = results[0].power_W;
        sat_data.NORAD_number = document.getElementById("mod_sat_norad").value = results[0].NORAD_number;
        sat_data.launch_vehicle = document.getElementById("mod_sat_vehicle").value = results[0].launch_vehicle
        sat_data.users = document.getElementById("mod_sat_users").value = results[0].users;
        sat_data.owner_name = document.getElementById("mod_sat_owner_name").value = org_data.name;
        console.log(results[0]);
    });
    connection.query(query2, function (error, results, fields) {
        sat_data.man_name = document.getElementById("mod_sat_man_org_name").value = results[0].name;
        sat_data.moid = results[0].MOID;
    });
    connection.query(query3, function (error, results, fields) {
        sat_data.launch_loc = document.getElementById("mod_sat_launch_loc").value = results[0].name;
        sat_data.lid = results[0].LID;
    });
}


function modify_admin_sat_show(value) {

    let query1 = "select * from satellites where sid = " + value + ";";
    let query2 = "select name,MOID from manufacturing_org where MOID in (select MOID from manufacturing_sat where sid = " + value + ");";
    let query3 = "select name,LID from launch_loc where LID in (select LID from launch_sat where sid = " + value + ");";
    let query4 = "select name,OID from owner_org where OID in (select OID from owner_sat where sid = " + value + ");";

    sat_data.sid = value;

    connection.query(query1, function (error, results, fields) {
        sat_data.name = document.getElementById("admin_mod_sat_name").value = results[0].name;
        sat_data.purpose = document.getElementById("admin_mod_sat_purpose").value = results[0].purpose;
        sat_data.detailed_purpose = document.getElementById("admin_mod_sat_detailed_purpose").value = results[0].detailed_purpose;
        sat_data.class_of_orbit = document.getElementById("admin_mod_sat_class_of_orbit").value = results[0].class_of_orbit;
        sat_data.type_of_orbit = document.getElementById("admin_mod_sat_type_of_orbit").value = results[0].type_of_orbit;
        sat_data.launch_date = document.getElementById("admin_mod_sat_launch_date").value = results[0].launch_date;
        sat_data.expected_lifetime_years = document.getElementById("admin_mod_sat_lifetime").value = results[0].expected_lifetime_years;
        sat_data.longitude_of_geo = document.getElementById("admin_mod_sat_longitude").value = results[0].longitude_of_GEO;
        sat_data.perigree = document.getElementById("admin_mod_sat_perigree").value = results[0].perigee_km;
        sat_data.apogee = document.getElementById("admin_mod_sat_apogee").value = results[0].apogee_km;
        sat_data.eccentricity = document.getElementById("admin_mod_sat_eccentricity").value = results[0].eccentricity;
        sat_data.inclination = document.getElementById("admin_mod_sat_inclination").value = results[0].inclination_deg;
        sat_data.period = document.getElementById("admin_mod_sat_period").value = results[0].period_minutes;
        sat_data.launch_mass = document.getElementById("admin_mod_sat_launch_mass").value = results[0].Launch_mass_kg;
        sat_data.dry_mass = document.getElementById("admin_mod_sat_dry_mass").value = results[0].dry_mass_kg;
        sat_data.power = document.getElementById("admin_mod_sat_power").value = results[0].power_W;
        sat_data.NORAD_number = document.getElementById("admin_mod_sat_norad").value = results[0].NORAD_number;
        sat_data.launch_vehicle = document.getElementById("admin_mod_sat_vehicle").value = results[0].launch_vehicle
        sat_data.users = document.getElementById("admin_mod_sat_users").value = results[0].users;
        console.log(results[0]);
    });
    connection.query(query2, function (error, results, fields) {

        sat_data.man_name = document.getElementById("admin_mod_sat_man_org_name").value = results[0].name;
        sat_data.moid = results[0].MOID;
    });
    connection.query(query3, function (error, results, fields) {
        sat_data.launch_loc = document.getElementById("admin_mod_sat_launch_loc").value = results[0].name;
        sat_data.lid = results[0].LID;
    });
    connection.query(query4, function (error, results, fields) {
        sat_data.owner_name = document.getElementById("admin_mod_sat_owner_name").value = results[0].name;
        sat_data.oid = results[0].OID;
    });
}



function modify_sat_change() {

    let lid;

    sat_data.name = document.getElementById("mod_sat_name").value;
    sat_data.purpose = document.getElementById("mod_sat_purpose").value;
    sat_data.detailed_purpose = document.getElementById("mod_sat_detailed_purpose").value;
    sat_data.class_of_orbit = document.getElementById("mod_sat_class_of_orbit").value;
    sat_data.type_of_orbit = document.getElementById("mod_sat_type_of_orbit").value;
    sat_data.launch_date = document.getElementById("mod_sat_launch_date").value;
    sat_data.expected_lifetime_years = document.getElementById("mod_sat_lifetime").value;
    sat_data.longitude_of_geo = document.getElementById("mod_sat_longitude").value;
    sat_data.perigree = document.getElementById("mod_sat_perigree").value;
    sat_data.apogee = document.getElementById("mod_sat_apogee").value;
    sat_data.eccentricity = document.getElementById("mod_sat_eccentricity").value;
    sat_data.period = document.getElementById("mod_sat_period").value;
    sat_data.launch_mass = document.getElementById("mod_sat_launch_mass").value;
    sat_data.dry_mass = document.getElementById("mod_sat_dry_mass").value;
    sat_data.power = document.getElementById("mod_sat_power").value;
    sat_data.NORAD_number = document.getElementById("mod_sat_norad").value;
    sat_data.launch_vehicle = document.getElementById("mod_sat_vehicle").value;
    sat_data.users = document.getElementById("mod_sat_users").value;
    sat_data.owner_name = document.getElementById("mod_sat_owner_name").value;
    sat_data.man_name = document.getElementById("mod_sat_man_org_name").value;
    sat_data.launch_loc = document.getElementById("mod_sat_launch_loc").value;
    sat_data.inclination = document.getElementById("mod_sat_inclination").value;

    let query1 = "update satellites set name = '" + sat_data.name + "', purpose = '" + sat_data.purpose + "', detailed_purpose = '" + sat_data.detailed_purpose + "', class_of_orbit = '" + sat_data.class_of_orbit + "', type_of_orbit = '" + sat_data.type_of_orbit + "', longitude_of_GEO = " + sat_data.longitude_of_geo + ", perigee_km = " + sat_data.perigree + ", apogee_km = " + sat_data.apogee + ", eccentricity = " + sat_data.eccentricity + ", inclination_deg = " + sat_data.inclination + ", period_minutes = " + sat_data.period + ", Launch_mass_kg = " + sat_data.launch_mass + ", dry_mass_kg = " + sat_data.dry_mass + ", power_W = " + sat_data.power + ", launch_date = '" + sat_data.launch_date + "', expected_lifetime_years = " + sat_data.expected_lifetime_years + ", NORAD_number = " + sat_data.NORAD_number + ", users = '" + sat_data.users + "', launch_vehicle = '" + sat_data.launch_vehicle + "' where sid = " + sat_data.sid + ";";
    let query2 = "select MOID from manufacturing_org where name like '%" + sat_data.man_name + "%';";
    let query3 = "select LID from launch_loc where name like '%" + sat_data.launch_loc + "%';";
    let flag = 0;
    connection.query(query1, function (error, results, fields) {
        if (error) {
            console.log("Update satellite error");
            console.log(query1);
            flag = 1;
        }

    });

    if (flag == 0) {
        setTimeout(() => {
            connection.query(query2, function (error, results, fields) {
                if (error) {
                    console.log("Select moid error");
                    flag = 1;
                }
                sat_data.moid = results[0].MOID;
                console.log(query2);
                console.log("man_org success", sat_data.moid);
            });
        }, 150);

        setTimeout(() => {
            connection.query(query3, function (error, results, fields) {
                if (error) {
                    console.log("Select lid error");
                    flag = 1;
                }
                sat_data.lid = results[0].LID;
                console.log(query3);
                console.log("launch_loc success", sat_data.lid);
            });
        }, 200);

        setTimeout(() => {
            let query4 = "update manufacturing_sat set MOID = " + sat_data.moid + " where sid = " + sat_data.sid + ";";
            connection.query(query4, function (error, results, fields) {
                if (error) {
                    console.log("Update manufacturing_sat error");
                    console.log(query4);
                    flag = 1;
                } else {
                    console.log("manufacturing_sat success");
                }
            });
        }, 250);

        setTimeout(() => {
            let query5 = "update launch_sat set LID = " + sat_data.lid + " where sid = " + sat_data.sid + ";";
            connection.query(query5, function (error, results, fields) {
                if (error) {
                    console.log("Update launch_sat error");
                    console.log(query5);
                    flag = 1;
                } else {
                    console.log("launch_sat success");
                }
            });
        }, 300);
    }
    if (flag == 1) {
        document.getElementById("mod_sat_notif").innerText = "Modifcation Failed";
        document.getElementById("mod_sat_notif").style.color = "red";
    } else {
        document.getElementById("mod_sat_notif").innerText = "Modified Successfully";
        document.getElementById("mod_sat_notif").style.color = "green";
    }

    setTimeout(() => {
        document.getElementById("mod_sat_notif").innerText = "";
    }, 5000);
}


function modify_admin_sat_change() {

    let lid;

    sat_data.name = document.getElementById("admin_mod_sat_name").value;
    sat_data.purpose = document.getElementById("admin_mod_sat_purpose").value;
    sat_data.detailed_purpose = document.getElementById("admin_mod_sat_detailed_purpose").value;
    sat_data.class_of_orbit = document.getElementById("admin_mod_sat_class_of_orbit").value;
    sat_data.type_of_orbit = document.getElementById("admin_mod_sat_type_of_orbit").value;
    sat_data.launch_date = document.getElementById("admin_mod_sat_launch_date").value;
    sat_data.expected_lifetime_years = document.getElementById("admin_mod_sat_lifetime").value;
    sat_data.longitude_of_geo = document.getElementById("admin_mod_sat_longitude").value;
    sat_data.perigree = document.getElementById("admin_mod_sat_perigree").value;
    sat_data.apogee = document.getElementById("admin_mod_sat_apogee").value;
    sat_data.eccentricity = document.getElementById("admin_mod_sat_eccentricity").value;
    sat_data.period = document.getElementById("admin_mod_sat_period").value;
    sat_data.launch_mass = document.getElementById("admin_mod_sat_launch_mass").value;
    sat_data.dry_mass = document.getElementById("admin_mod_sat_dry_mass").value;
    sat_data.power = document.getElementById("admin_mod_sat_power").value;
    sat_data.NORAD_number = document.getElementById("admin_mod_sat_norad").value;
    sat_data.launch_vehicle = document.getElementById("admin_mod_sat_vehicle").value;
    sat_data.users = document.getElementById("admin_mod_sat_users").value;
    sat_data.owner_name = document.getElementById("admin_mod_sat_owner_name").value;
    sat_data.man_name = document.getElementById("admin_mod_sat_man_org_name").value;
    sat_data.launch_loc = document.getElementById("admin_mod_sat_launch_loc").value;
    sat_data.inclination = document.getElementById("admin_mod_sat_inclination").value;

    let query1 = "update satellites set name = '" + sat_data.name + "', purpose = '" + sat_data.purpose + "', detailed_purpose = '" + sat_data.detailed_purpose + "', class_of_orbit = '" + sat_data.class_of_orbit + "', type_of_orbit = '" + sat_data.type_of_orbit + "', longitude_of_GEO = " + sat_data.longitude_of_geo + ", perigee_km = " + sat_data.perigree + ", apogee_km = " + sat_data.apogee + ", eccentricity = " + sat_data.eccentricity + ", inclination_deg = " + sat_data.inclination + ", period_minutes = " + sat_data.period + ", Launch_mass_kg = " + sat_data.launch_mass + ", dry_mass_kg = " + sat_data.dry_mass + ", power_W = " + sat_data.power + ", launch_date = '" + sat_data.launch_date + "', expected_lifetime_years = " + sat_data.expected_lifetime_years + ", NORAD_number = " + sat_data.NORAD_number + ", users = '" + sat_data.users + "', launch_vehicle = '" + sat_data.launch_vehicle + "' where sid = " + sat_data.sid + ";";
    let query2 = "select MOID from manufacturing_org where name like '%" + sat_data.man_name + "%';";
    let query3 = "select LID from launch_loc where name like '%" + sat_data.launch_loc + "%';";

    let flag = 0;
    connection.query(query1, function (error, results, fields) {
        if (error) {
            console.log("Update satellite error");
            console.log(query1);
            flag = 1;
        }

    });

    if (flag == 0) {
        setTimeout(() => {
            connection.query(query2, function (error, results, fields) {
                if (error) {
                    console.log("Select moid error");
                    flag = 1;
                }
                sat_data.moid = results[0].MOID;
                console.log(query2);
                console.log("man_org success", sat_data.moid);
            });
        }, 150);

        setTimeout(() => {
            connection.query(query3, function (error, results, fields) {
                if (error) {
                    console.log("Select lid error");
                    flag = 1;
                }
                sat_data.lid = results[0].LID;
                console.log(query3);
                console.log("launch_loc success", sat_data.lid);
            });
        }, 200);

        setTimeout(() => {
            let query4 = "update manufacturing_sat set MOID = " + sat_data.moid + " where sid = " + sat_data.sid + ";";
            connection.query(query4, function (error, results, fields) {
                if (error) {
                    console.log("Update manufacturing_sat error");
                    console.log(query4);
                    flag = 1;
                } else {
                    console.log("manufacturing_sat success");
                }
            });
        }, 250);

        setTimeout(() => {
            let query5 = "update launch_sat set LID = " + sat_data.lid + " where sid = " + sat_data.sid + ";";
            connection.query(query5, function (error, results, fields) {
                if (error) {
                    console.log("Update launch_sat error");
                    console.log(query5);
                    flag = 1;
                } else {
                    console.log("launch_sat success");
                }
            });
        }, 300);


        let query6 = "select OID from owner_org where name like '%" + sat_data.owner_name + "%';";
        setTimeout(() => {
            connection.query(query6, function (error, results, fields) {
                if (error) {
                    console.log("oid error");
                    flag = 1;
                } else {
                    sat_data.oid = results[0].OID;
                    console.log("oid retrieved successfully")
                }

            })
        }, 350);

        setTimeout(() => {
            let query7 = "update owner_sat set OID = " + sat_data.oid + " where sid = " + sat_data.sid + ";";
            connection.query(query7, function (error, results, fields) {
                if (error) {
                    console.log("Update owner_sat error");
                    console.log(query7);
                    flag = 1;
                } else {
                    console.log("owner_sat success");
                }
            });

        }, 450);
    }

    if (flag == 1) {
        document.getElementById("admin_mod_sat_notif").innerText = "Modifcation Failed";
        document.getElementById("admin_mod_sat_notif").style.color = "red";
    } else {
        document.getElementById("admin_mod_sat_notif").innerText = "Modified Successfully";
        document.getElementById("admin_mod_sat_notif").style.color = "green";
    }

    setTimeout(() => {
        document.getElementById("admin_mod_sat_notif").innerText = "";
    }, 5000);
}



function search_data() {
    let search_page = document.getElementById("search_results");
    let search_table = document.getElementById("search_results_data");
    let search_data = document.getElementById("textbar").value;
    console.log(search_data);

    search_table.innerHTML = "";

    let rows;
    let query = "select * from satellites where name like '%" + search_data + "%';";

    connection.query(query, function (error, results, fields) {
        if (results.length != 0) {
            search_page.style.display = "block";
            for (let i = 0; i < results.length; i++) {
                rows = "<td>" + results[i].sid + "</td><td>" + results[i].name + "</td><td>" + results[i].purpose + "</td><td>" + results[i].detailed_purpose + "</td><td>" + results[i].NORAD_number + "</td><td>" + results[i].users + "</td>"

                let tr = document.createElement("tr");

                let button = document.createElement("button");
                button.setAttribute("data-toggle", "collapse");
                button.setAttribute("class", "btn btn-info");
                button.setAttribute("value", "Learn More");
                button.setAttribute("onclick", "search_learn_more_sat(" + results[i].sid + ")");
                button.setAttribute("data-target", "#more_details_search");
                button.setAttribute("data-toggle", "modal");
                button.setAttribute("id", "sat_" + results[i].sid);
                button.innerHTML = "Learn More"
                tr.innerHTML = rows;

                tr.innerHTML += "<td>" + button.outerHTML + "</td>";

                if (admin_data.type == 1) {
                    let button2 = document.createElement("button")
                    button2.setAttribute("data-toggle", "collapse");
                    button2.setAttribute("class", "btn btn-danger");
                    button2.setAttribute("value", "Learn More");
                    button2.setAttribute("onclick", "modify_admin_sat_show(" + results[i].sid + ")");
                    button2.setAttribute("data-target", "#modify_admin_details_my_sat");
                    button2.setAttribute("data-toggle", "modal");
                    button2.setAttribute("id", "sat_" + results[i].sid);
                    button2.innerHTML = "Modify Details";
                    tr.innerHTML += "<td>" + button2.outerHTML + "</td>"
                }

                console.log(tr);
                search_table.appendChild(tr);
            }
        } else {
            search_page.style.display = "none";
            document.getElementById("none_found").innerText = "Sorry could not find what you are looking for"
            setTimeout(() => {
                document.getElementById("none_found").innerText = "";
            }, 5000);
        }
    })


}


function search_learn_more_sat(value) {
    let div = document.getElementById("more_details_my_sat");
    div.style.display = "block";
    let table_data1 = document.getElementById("search_learn_more_data_1");
    let table_data2 = document.getElementById("search_learn_more_data_2");
    let table_data3 = document.getElementById("search_learn_more_data_3");

    table_data1.innerHTML = "";
    table_data2.innerHTML = "";
    table_data3.innerHTML = "";

    let users, norad, man_name, own_name, launch_names;

    let query1 = "select * from satellites where SID =" + value + ";";
    let query2 = "select name from manufacturing_org where MOID in (select MOID FROM manufacturing_sat where sid=" + value + ");"
    let query3 = "select name from owner_org where OID in (select OID from owner_sat where sid = " + value + ");"
    let query4 = "select name from launch_loc where LID in (select LID from launch_sat where sid = " + value + ");"
    console.log(value);

    let rows1, rows2, rows3;


    setTimeout(() => {
        connection.query(query1, function (error, results, fields) {
            rows1 = "<td>" + results[0].sid + "</td><td>" + results[0].name + "</td><td>" + results[0].purpose + "</td><td>" + results[0].detailed_purpose + "</td><td>" + results[0].class_of_orbit + "</td><td>" + results[0].type_of_orbit + "</td><td>" + results[0].longitude_of_GEO + "</td><td>" + results[0].perigee_km + "</td><td>" + results[0].apogee_km + "</td>"

            let tr1 = document.createElement("tr");
            tr1.innerHTML = rows1;
            table_data1.appendChild(tr1);
            console.log(table_data1);


            rows2 = "<td>" + results[0].eccentricity + "</td><td>" + results[0].inclination_deg + "</td><td>" + results[0].period_minutes + "</td><td>" + results[0].Launch_mass_kg + "</td><td>" + results[0].dry_mass_kg + "</td><td>" + results[0].power_W + "</td><td>" + results[0].launch_date + "</td><td>" + results[0].expected_lifetime_years + "</td><td>" + results[0].launch_vehicle + "</td>";
            let tr2 = document.createElement("tr");
            tr2.innerHTML = rows2;
            table_data2.appendChild(tr2);
            console.log(table_data2);

            rows3 = "<td>" + results[0].users + "</td><td>" + results[0].NORAD_number + "</td>";
            console.log(rows3);
        });
    }, 200);
    console.log(rows3);

    setTimeout(() => {
        connection.query(query2, function (error, results, fields) {
            if (error)
                console.log(error)
            rows3 += "<td>" + results[0].name + "</td>";
        });
    }, 250);


    console.log(rows3);

    setTimeout(() => {
        connection.query(query3, function (error, results, fields) {
            rows3 += "<td>" + results[0].name + "</td>";
        });
    }, 300);
    console.log(rows3);
    setTimeout(() => {
        connection.query(query4, function (error, results, fields) {
            rows3 += "<td>" + results[0].name + "</td>";
        });
    }, 350);


    console.log(rows3);

    setTimeout(() => {
        let tr3 = document.createElement("tr");
        tr3.innerHTML = rows3;
        table_data3.appendChild(tr3);
    }, 400);

    setTimeout(() => {
        let del_area = document.getElementById("del-area");
        if (admin_data.type == 1) {
            del_area.style.display = "block";
        } else {
            del_area.style.display = "none";
        }
    }, 300);

    runScript(value)
    console.log("script executed")
}


function admin_sat_delete() {
    let query = "delete from satellites where sid=" + sat_data.sid + ";"
    connection.query(query, function (error, results, fields) {
        if (error)
            console.log(error)
        else {
            console.log("Satellite Deleted");
            alert("The satellite with sid " + sat_data.sid + " has been deleted");
        }
    })
}

