var express=require("express");
var app=express();
var mongoose=require("mongoose");
mongoose.connect("mongodb+srv://naman:7983766385@yelpcampcluster.qzvu8.mongodb.net/yelpcamp?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true },function(err){
	if(err){
		console.log(err);
	}else{
		console.log("connected to mongodb");
	}
});
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
var campSchema= new mongoose.Schema({
	name:String,
	image:String,
	description:String
});
var Camps=mongoose.model("Camps",campSchema);
app.get("/",function(req,res){
	res.render("landing.ejs");
});
app.get("/campgrounds",function(req,res){
    Camps.find({},function(err,allcamp){
	if(err)
		console.log(err);
	else
		res.render("camp.ejs",{camps:allcamp});
});
});
app.post("/campgrounds",function(req,res){
	var neww={"name":req.body.name,"image":req.body.url,"description":req.body.description};
	Camps.create(neww,function(err){
		if(err)
			console.log(err);
		else{
			res.redirect("/campgrounds");
		}
	});
});
app.get("/campgrounds/add",function(req,res){
	res.render("newcamp.ejs");
});
app.get("/campgrounds/:id",function(req,res){
	Camps.findById(req.params.id,function(err,idcamp){
		if(err)
			console.log(err);
		else
			res.render("show.ejs",{camp:idcamp});
	});
});
app.listen(8080,function(){
	console.log("port started");
});