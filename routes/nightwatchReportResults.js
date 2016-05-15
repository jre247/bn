var http = require('http'),
    fs = require('fs');
	
/* GET users listing. */
exports.list = function(req, res){
	console.log('retrieving Nightwatch report');
	
	fs.readFile('C:/Services/Nightwatch/reports_html/report.html', function (err, html) {
		console.log('Nightwatch report retrieved');
		
		if (err) {
			console.log('Error retrieving report: ' + err);
			throw err; 
		}    

		console.log('Creating server to write back report html');
		console.log('typeof html' + typeof html);
	  
		res.writeHeader(200, {"Content-Type": "text/html"});  
		res.write(html);  
		res.end();  
	});
};
