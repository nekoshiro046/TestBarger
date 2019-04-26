var imges = [];
var objects = [];
var wt;

var fr;
let objNum = 10;

var sw;

var scene;

 
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
	fr = 10;
	scene = 1;// 0: start画面 1:game画面 2:end画面 
  //slow down the frameRate to make it more visible
  createCanvas(windowWidth, windowHeight,P2D);
  frameRate(fr);

  sw = new stopWatch(fr,windowWidth/10,windowWidth/2,windowWidth/10);

  wt = new waiter(width/2,height - 100);
  initObjets();

}

function draw() {
	if(scene == 1){
		drawGameScene();
	}else{
		drawEndScene();
	}
}

function drawGameScene(){
	background(255);

	sw.updata();
  	sw.drawWatch();

	updata();
	drawMaterial();
	wt.drawImg();
}

function drawEndScene(){
	background(0);
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



// function mouseReleased() {
  
// }

// function keyPressed() {
// }
