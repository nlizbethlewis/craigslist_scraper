/* My first scraper
* Author: TC McCarthy
* Date: 9/3/15
*/


var cheerio = require("cheerio"),
	request = require("request"),
	sequelize = require("sequelize"),
	config = require("./config.js"),

	//connects us to the Database 
	db = new sequelize("wiki_sraper", "root", "root", {dialectOptions:{socketPath:"/Applications/MAMP/tmp/mysql/mysql.sock"}, logging: true}),
	wiki = db.import(__dirname + "/wiki");



	//this enters the wiki table and finds the first entry and then console logs the results of that row
// wiki.find({
// 	where:{
// 		id: 1
// 	}
// }).then(function (row){
// 	console.log(row.dataValues);
// });

//this finds or create an entry into the table based on the object you create in defaults
// wiki.findOrCreate({
// 	where:{
// 		id: 1
// 	}
// }, defaults:{
// 	headline: "Test hed",
// 	lede: "Test lede",
// 	subhed: "Test subhed",
// 	sunlede: "Test sublede",
// 	// this sets a boolean for find or create sets it to true or false
// }).spread(function(row, created){

// });

//this updates the specified row in your table and updates the contents based on whatever you set 
// wiki.update({
// 	headline:"did it update?"
// },
// 	{
// 	where:{
// 		id: 1
// 	}
// }).then(function(row){
// 	console.log(row);
// });

// this makes a new row in your table based on the values you set 
wiki.create({
	headline: "This is a new row",
	lede: "New rows are the building blocks for tired jschoolers",
	subhed: "Databasing adds confusion",
	sublede: "I hope the HW isn't too tough"
});




//set the URL of the page I want to scrape
// var url = "https://en.wikipedia.org/wiki/New_York_Jets";

// //
// request(url, function(err, response, body){
// 	if(err) throw err;

// 	$ = cheerio.load(body);

// 	var title = $("#firstHeading").text();

// 	console.log(title);
// });