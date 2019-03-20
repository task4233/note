// masterインスタンスを作成
var master = require("master");

master.publish("./docs", function (err) {
        if (err) {
            console.log(err);
            process.exit(1);
        } else {
            console.log("Successfully Delployed!");
        }
});
