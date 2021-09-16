const chalk = require("chalk");

function yellow() {
    console.log(chalk.yellow("yellow"));
}

function green() {
    console.log(chalk.green("green"));
}

module.exports = {yellow, green};