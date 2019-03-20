var ghpages = require("gh-pages");

ghpages.publish("./docs", function (err) {
    if (err) {
        console.log(err);
        process.exit(1);
    } else {
        console.log("Successfully Delployed!");
    }
});
