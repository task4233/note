var ghpages = require("gh-pages");

ghpages.publish("./docs", {
    user: {
        name: "task4233",
        email: "tks.m1205@gmail.com"
    },
    message: "Auto build and deploy [ci skip]"
}, function(err) {
    if (err) {
        console.log(err);
        process.exit(1);
    } else {
        console.log("Successfully Delployed!");
    }
});
