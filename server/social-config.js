let app_id = process.env.FB_APP_ID;
if (typeof(app_id) === 'undefined') {
  process.env.FB_APP_ID = '363947497271601';
}

let app_secret = process.env.FB_APP_SECRET;
if (typeof(app_secret) === 'undefined') {
  process.env.FB_APP_SECRET = '200f19ee85bdfc8e4ac624d0f0ba8267';
}

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: process.env.FB_APP_ID,
    secret: process.env.FB_APP_SECRET
});

console.log(process.env.FB_APP_ID);