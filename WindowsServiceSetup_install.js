var Service = require('node-windows').Service;
 
// Create a new service object 
var svc = new Service({
  name:'Nightwatch',
  description: 'Nightwatch will run End to End tests.',
  script: require('path').join(__dirname,'app.js')
});
 
// Listen for the "install" event, which indicates the 
// process is available as a service. 
svc.on('install',function(){
  svc.start();
});
 
svc.install();