var imges = [];
var objects = [];
var wt;

let objNum = 10;

 
function preload() {
	imges[0] = loadImage('assets/watermark.png');

	imges[1] = loadImage('assets/lettuce.png');
	imges[2] = loadImage('assets/tomato.png');
	imges[3] = loadImage('assets/patty.png');
	imges[4] = loadImage('assets/buns.png');

	imges[5] = loadImage('assets/lettuce2.png');
	imges[6] = loadImage('assets/tomato2.png');
	imges[7] = loadImage('assets/patty2.png');
	imges[8] = loadImage('assets/buns2.png');

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
			&& objects[i].position.y < wt.position.y -wt.paHeight && objects[i].position.y > (wt.position.y -wt.paHeight-wt.objSize/4))
		{
			objects[i].rest();

			if(objects[i].imgID == 1){
				wt.patties[wt.paCount] = 5;
				wt.paCount++;
				wt.paHeight += wt.objSize/4;

			}else if(objects[i].imgID == 2){
				wt.patties[wt.paCount] = 6;
				wt.paCount++;
				wt.paHeight += wt.objSize/4;
			}else if(objects[i].imgID == 3){
				wt.patties[wt.paCount] = 7;
				wt.paCount++;
				wt.paHeight += wt.objSize/4;
			}else{
				wt.patties[wt.paCount] = 8;
				wt.paCount++;
				wt.paHeight += wt.objSize/4;
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
	    this.imgID = int(random(1,5));
	    this.objSize = 50;
	}

	updata(){
		this.acceleration.add(this.gravity);
	    this.velocity.add(this.acceleration);
	    this.position.add(this.velocity);
	    this.acceleration.mult(0);
	    this.velocity.mult(0.98);
	    
	    if(this.position.y > windowHeight){
	      var posX = random(windowWidth);
	      this.position = createVector(posX, 0);
	    }
	}

	rest(){
		var posX = random(windowWidth);
		var posY = int(random(-windowHeight/2));
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
	    this.stackingHeight = 0;
	    this.patties = [];
	    this.paCount = 0;
	    this.paHeight = 0;

	}

	updata(d){
		this.position.x += d;
	}

	drawImg(){
		image(imges[this.imgID], this.position.x-this.objSize/2, this.position.y,this.objSize,this.objSize);
		for(var i = 0,j=0; i < this.paCount; i++){
			if(this.patties[i] != 0){
				image(imges[this.patties[i]], this.position.x-this.objSize/2, this.position.y-j,this.objSize/2,this.objSize/4);
				j += this.objSize/4;
			}
		}
		
	}

}



// function mouseReleased() {
  
// }

// function keyPressed() {
// }
