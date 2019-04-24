var imges = [];
var objects = [];
var wt;

let objNum = 10;

 
function preload() {
	imges[0] = loadImage('assets/watermark.png');
	imges[1] = loadImage('assets/lettuce.png');
	imges[2] = loadImage('assets/tomato.png');
	imges[3] = loadImage('assets/patty.png');
	imges[4] = loadImage('assets/lettuce2.png');
	imges[5] = loadImage('assets/tomato2.png');
	imges[6] = loadImage('assets/patty2.png');
}

function setup() {
  //slow down the frameRate to make it more visible
  createCanvas(windowWidth, windowHeight,P2D);
  frameRate(10);

  wt = new waiter(width/2,height - 100);
  initObjets();

}

function draw() {
	background(255);

	updata();
	drawMaterial();
	wt.drawImg();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function updata(){
	if(mouseIsPressed){
		if(mouseX < width/2){
			wt.updata(-10);
		}
		else if(mouseX > width/2){
			wt.updata(10);
		}
	}

	for (var i = 0; i < objNum; i++) {
		if(objects[i].position.x < wt.position.x && objects[i].position.x > (wt.position.x - wt.objSize)  
			&& objects[i].position.y > wt.position.y )
		{
			objects[i].rest();
			if(objects[i].imgID == 1){
				wt.lettuceOn = true;
			}else if(objects[i].imgID == 2){
				wt.tomatoOn = true;
			}else{
				wt.pattyOn = true;
			}
		}
		else{
			objects[i].updata();
		}
	}
}

function drawMaterial(){
	for (var i = 0; i < objNum; i++) {
	  objects[i].drawImg();
	}
}

function initObjets(){
	for (var i = 0; i < objNum; i++) {
	  var posX = int(random(windowWidth));
	  var posY = int(random(-windowHeight/2));
	  objects[i] = new object(posX,posY);
	}
}

class object{
	constructor(x,y){
		this.position = createVector(x, y);
	    this.velocity = createVector(0, 0);
	    this.acceleration = createVector(0, 0);
	    this.gravity = createVector(0, random(0.05, 0.1));
	    this.imgID = int(random(1,4));
	    this.objSize = 50;

	}

	updata(){
		this.acceleration.add(this.gravity);
	    this.velocity.add(this.acceleration);
	    this.position.add(this.velocity);
	    this.acceleration.mult(0);
	    this.velocity.mult(0.98);

	    this.lettuceOn = false;
	    this.tomatoOn = false;
	    this.pattyOn = false;
	    
	    
	    if(this.position.y > windowHeight){
	      var posX = random(windowWidth);
	      	// var posX = random(windowWidth/2,windowWidth);
	      this.position = createVector(posX, 0);
	    }
	}

	rest(){
		var posX = random(windowWidth);
		var posY = int(random(-windowHeight/2));
		// var posX = windowWidth/2;
	    // var posX = random(windowWidth/2,windowWidth);
	    this.position = createVector(posX, posY);

	}

	putOnBred(bredPos){
		this.position = bredPos;
	}

	drawImg(){
		image(imges[this.imgID], this.position.x-this.objSize/2, this.position.y-this.objSize/2,this.objSize,this.objSize);
	}

}

class waiter{
	constructor(x,y){
		this.position = createVector(x, y);
	    this.velocity = createVector(0, 0);
	    this.imgID = 0;
	    this.objSize = 100;

	}

	updata(d){
		this.position.x += d;
	}

	drawImg(){
		image(imges[this.imgID], this.position.x-this.objSize/2, this.position.y,this.objSize,this.objSize);
		if(this.lettuceOn)this.drawLettuce();
		if(this.tomatoOn)this.drawTomato();
		if(this.pattyOn)this.drawPatty();
	}

	drawTomato(){
		image(imges[5], this.position.x-this.objSize/2, this.position.y-this.objSize/4,this.objSize/2,this.objSize/4);
	}

	drawLettuce(){
		image(imges[4], this.position.x-this.objSize/2, this.position.y-this.objSize/2,this.objSize/2,this.objSize/4);
	}

	drawPatty(){
		image(imges[6], this.position.x-this.objSize/2, this.position.y-this.objSize/4*3,this.objSize/2,this.objSize/4);
	}


}



// function mouseReleased() {
  
// }

// function keyPressed() {
// }
