const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:password_123@satellite-1fkvi.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true
});

function add_user_image(uid_value) {
    var filesSelected = document.getElementById("user_image_input").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function (fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64
            console.log("Converted Base64 version is " + srcData);
            client.connect(err => {
                const collection = client.db("satellite_management_system").collection("user_image");
                // perform actions on the collection object
                if (err) {
                    console.log(err);
                    console.log("Connection to MongoDB failed")
                } else {
                    console.log("Connection to MongoDB Success");
                    collection.insertOne({
                            uid: uid_value,
                            image_data: srcData
                        },
                        function (err, res) {
                            if (err) throw err;
                            console.log("documents inserted");
                        });
                }
                client.close();
            });

        }

        fileReader.readAsDataURL(fileToLoad);
    }
}

function show_user_image() {

    console.log(user_data.uid);

    client.connect(err => {
        const collection = client.db("satellite_management_system").collection("user_image");
        // perform actions on the collection object
        if (err) {
            console.log(err);
            console.log("Error in connection");
        } else {
            console.log("entered function")
            collection.findOne({
                uid: user_data.uid
            }, function (err, result) {
                if (err) throw err;
                console.log(result.image_data);
                document.getElementById("user_image").src = result.image_data
            })

        }
    })
}

function update_user_image(uid_value) {
    var filesSelected = document.getElementById("change_user_image").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function (fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64
            console.log("Converted Base64 version is " + srcData);
            client.connect(err => {
                const collection = client.db("satellite_management_system").collection("user_image");
                // perform actions on the collection object
                if (err) {
                    console.log(err);
                    console.log("Connection to MongoDB failed")
                } else {
                    console.log("Connection to MongoDB Success");
                    collection.updateOne({
                            uid: uid_value,
                        }, {
                            $set: {
                                image_data: srcData
                            },
                        },

                        function (err, res) {
                            if (err) throw err;
                            console.log("documents updated");
                            document.getElementById("user_image").src = srcData;
                        });
                }
                client.close();
            });

        }

        fileReader.readAsDataURL(fileToLoad);
    }
}