
var cheerio = require("cheerio"),
	request = require("request"),
	sequelize = require("sequelize"),
	config = require("./config.js"),
	
	//connects to my database
	db = new sequelize("craigslist_scraper", "root", "root", {dialectOptions:{socketPath:"/Applications/MAMP/tmp/mysql/mysql.sock"}, logging: true}),
	
	craigslist = db.import(__dirname + "/wiki");


//the landing page url 
the_url = "http://newyork.craigslist.org/search/m4w";
	

//this searches all of the posts within the section 
function get_page(offset){
	request(the_url + "?s=" + offset, function(err, response, body){
		if(err) throw err;
		$  =  cheerio.load(body),
		nextPage = ($("ul.rows").find("li.result-row").length == 100);

		// this finds all the links on the landing page
		$("ul.rows").find("li.result-row").each(function(){
			var post = $(this),
				the_links_are = post.find("a.result-image.gallery").attr("href");

				//this grabs the links, titles, posting ids, ages, and locations 

			var man_seeking_women = {
					post_links: "http://newyork.craigslist.org/" + post.find("a.result-image.gallery").attr("href"),
					post_titles: post.find("a.result-title.hdrlnk").text(),
					data_id: post.attr("data-pid"),
					repost_id: post.attr("data-repost-of"),
					age: post.find("p.result-info").find("span.result-age").text(),
					location:"",
					race_pref: 0,
					post_text:"",		
				},
				location = post.find("p.result-info").find("span.result-hood").text().match(/\((.+)\)/);

				if(location){
					man_seeking_women.location = location[1];
				}

				//this grabs the links from above, finds the post text, and flags if the post title or post content has a racial preference 
					request(man_seeking_women.post_links, function(err, res, body){
					if(err) throw err;

					var $ = cheerio.load(body),
						post_text = $("section#postingbody").text();

					man_seeking_women.post_text = post_text.trim();

					if(post_text.match(/(?:latin|black|asian|white|african|caucasian|ebony|spanish|indian|desi|muslim)/mgi) || man_seeking_women.post_titles.match(/(?:latin|black|asian|white|african|caucasian|ebony|spanish)/mgi)){
						man_seeking_women.race_pref = 1;
					} 

					console.log(man_seeking_women);
					craigslist.findOrCreate({where: {post_links: man_seeking_women.post_links}, defaults: man_seeking_women});
				});
		});

		if(nextPage){
				get_page(offset + 100);
			} else{
				console.log("I'm done!");
			}
	});
}

get_page(0);




// var man_seeking_women = {
// 					post_links: "http://newyork.craigslist.org/" + post.attr("href"),
// 					post_titles: $("p.result-info").find("a.result-title.hdrlnk").text(),
// 					data_id: $("ul.rows").find("li.result-row").attr("data-pid"),
// 					repost_id: $("ul.rows").find("li.result-row").attr("data-repost-of"),
// 					age: $("span.result-age").text(),
// 					location:"",
// 					race_pref: 0,
// 					post_text:"",		
// 				},
// 				location = $("span.result-hood").text().match(/\((.+)\)/);

// 				if(location){
// 					man_seeking_women.location = location[1];
// 				}

// this finds all the post titles on the landing page
	// $("span.pl").each(function(){
	// 	var titles = $(this),
	// 		the_titles_are = titles;

	// 			man_seeking_women.post_titles.push(the_titles_are);

	// });

	// // this finds all the posts ids 
	// $("p.row").each(function(){
	// 	var id= $(this),
	// 		the_id_is = id.attr("data-pid");

	// 			man_seeking_women.data_id.push(the_id_is);

	// });

	// // this finds the repost ids
	// $("p.row").each(function(){
	// 	var r_id= $(this),
	// 		the_repost_id_is = r_id.attr("data-repost-of");

	// 			man_seeking_women.repost_id.push(the_repost_id_is);

	// });

	// // this finds all the ages 
	// $("span.age").each(function(){
	// 	var age= $(this),
	// 		the_age_is = age.text();

	// 			man_seeking_women.age.push(the_age_is);

	// });

	// //this finds the location but right now its grabbing everything.
	// $("span.pnr").each(function(){
	// 	var location= $(this),
	// 		the_location_is = location.text();

	// 			man_seeking_women.location.push(the_location_is);

	// });

	// $("span.pl").each(function(){
	// 	var pref= $(this),
	// 		the_race_pref_is = pref.find("a").text().match(/(?:latin|black|asian|white|african|caucasian|ebony|spanish))/mgi);

	// 			man_seeking_women.race_pref.push(the_race_pref_is);

	// });


	// console.log(man_seeking_women);

	// craigslist.findOrCreate({where: {post_links:man_seeking_women.post_links} defaults: man_seeking_women});

	// });

		


