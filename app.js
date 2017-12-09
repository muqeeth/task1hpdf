var express = require('express');
var app  = express()
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var path = require('path');
var request = require('request');
app.use(cookieParser());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/setcookie',function (req, res, next) {
  var cookie1 = req.cookies.name;
  if (cookie1 === undefined)
  {
    res.cookie('name','muqeeth');
    console.log('cookie created successfully');
  } 
  else
  { 
    console.log('cookie exists', cookie1);
  }
  var cookie2 = req.cookies.age;
  if (cookie2 === undefined)
  {
    res.cookie('age','19');
    console.log('cookie created successfully');
  } 
  else
  { 
    console.log('cookie exists', cookie2);
  }
  res.send('') 
  next(); 
});
app.get('/getcookie',function (req, res, next) {
  var cookie1 = req.cookies.name;
  if (cookie1 === undefined)
  {
    console.log('create cookie');
  } 
  else
  { 
    console.log('cookie exists', cookie1);
  }
  var cookie2 = req.cookies.age;
  if (cookie2 === undefined)
  {
    console.log('create cookie');
  } 
  else
  { 
    console.log('cookie exists', cookie2);
  }
  res.send('') 
  next(); 
});
app.get('/',function (req,res) {
	res.sendFile(path.join(__dirname, 'View', 'index.html'));
})

app.get('/robots.txt',function(req,res){
	res.send('you are not allowed')
})
app.get('/image', function (req, res) {
  res.sendFile(path.join(__dirname,'View', 'image.png'));
});
app.get('/html', function (req, res) {
  res.sendFile(path.join(__dirname, 'View', 'test.html'));
});
app.get('/input', function (req, res) {
  res.sendFile(path.join(__dirname, 'View', 'input.html'));
});
app.post('/data',function(req,res){
  var data=req.body.data;
  console.log(" name = "+data);
  res.send("yes");
});
var url1 = 'https://jsonplaceholder.typicode.com/users';
var url2 = 'https://jsonplaceholder.typicode.com/posts';
var posts = [];
app.get('/authors', function(req, res){ 
  request({
    url: url1,
    json: true
  }, function (error, response, body){
  	var len1 = Object.keys( body ).length;
   	if(posts ==""){
    request({
    url: url2,
    json: true
  },function (error, response, body) {
      if (!error && response.statusCode === 200) {
      	var len = Object.keys( body ).length;
      	var count =[];
    	for(var i=0;i<len1;i++){
    		var c=0;
    		for(var j =0; j<len;j++){
    			if(body[j].userId==(i+1)){
    				c +=1;
    			}
    		}
    		count.push(c);
    	}
    	console.log(count)
    	for(var i=0;i<10;i++){
    		posts.push(count[i])
    	}
    	callback();
    }
  })
  	}
  	else{
  		callback();
  	}
  	function callback(){
      if (!error && response.statusCode === 200) {
      	myChannel = [];
      	for(var i =0 ; i<len1;i++){
      		myChannel.push( body[i].name + "  has wrriten " + posts[i] +" posts");
      	}
      	res.send( myChannel.join("<br/>"));
    }
}
  })
});
app.listen(8080,function(){
	console.log("listening on port 8080")
})
