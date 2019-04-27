var imges = [];
var objects = [];
let objNum = 5;//obj_classの生成数
var wt;//waiter_class

var fr;//フレームレート

//munu_classes
var sw;var btn;
//シーン管理
var scene;// 0: start画面 1:game画面 2:end画面ß
var comentCount = 0;

 
function preload() {
	// imges[0] = loadImage('assets/watermark.png');

	// imges[1] = loadImage('assets/lettuce.png');
	// imges[2] = loadImage('assets/tomato.png');
	// imges[3] = loadImage('assets/patty.png');
	// imges[4] = loadImage('assets/buns.png');

	// imges[5] = loadImage('assets/lettuce2.png');
	// imges[6] = loadImage('assets/tomato2.png');
	// imges[7] = loadImage('assets/patty2.png');
	// imges[8] = loadImage('assets/buns2.png');

	// imges[9] = loadImage('assets/wow.png');

	imges[0] = loadImage('assets/watermark.png');

	imges[1] = loadImage('assets/lettuce.jp2');
	imges[2] = loadImage('assets/tomato.jp2');
	imges[3] = loadImage('assets/patty.jp2');
	imges[4] = loadImage('assets/buns.jp2');

	imges[5] = loadImage('assets/lettuce2.jp2');
	imges[6] = loadImage('assets/tomato2.png');
	imges[7] = loadImage('assets/patty2.jp2');
	imges[8] = loadImage('assets/buns2.jp2');

	imges[9] = loadImage('assets/wow.jp2');
}

function setup() {
	fr = 10;
	scene = 1;
  //slow down the frameRate to make it more visible
  createCanvas(windowWidth, windowHeight,P2D);
  frameRate(fr);

  sw = new stopWatch(fr,windowHeight/10,windowWidth/2,windowWidth/10);
  btn = new moveBtn(windowWidth / 4,windowHeight / 10*9,windowWidth / 4*3,windowHeight / 10*9,windowHeight/10 /4 * 3);
  wt = new waiter(width/2,windowHeight/5*4);
  initObjets();

}

function draw() {
	if(scene == 1){
		drawGameScene();
	}else{
		drawEndScene();
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawGameScene(){
	background(255);

	updata();
	drawMaterial();
	wt.drawImg();


	//------------------menues------------
	drawMenus();
}

function drawEndScene(){
	drawMaterial();
	wt.drawImg();
	drawMenus();
}


function updata(){
	wt.updata(btn.updata());

	for (var i = 0; i < objNum; i++) {
		if(objects[i].position.x < wt.position.x 
			&& objects[i].position.x > (wt.position.x - wt.objSize)  
			&& objects[i].position.y < wt.position.y -wt.paHeight 
			&& objects[i].position.y > (wt.position.y -wt.paHeight-wt.objSize/4))
		{
			if(objects[i].imgID == 1){
				wt.patties[wt.paCount] = 5;
				wt.paCount++;
				wt.paHeight += wt.objSize/4;
			}
			else if(objects[i].imgID == 2){
				wt.patties[wt.paCount] = 6;
				wt.paCount++;
				wt.paHeight += wt.objSize/4;
			}
			else if(objects[i].imgID == 3){
				wt.patties[wt.paCount] = 7;
				wt.paCount++;
				wt.paHeight += wt.objSize/4;
			}
			else{
				wt.patties[wt.paCount] = 8;
				wt.paCount++;
				wt.paHeight += wt.objSize/4;
			}
			objects[i].rest();
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

function drawMenus(){
	push();
	fill(74,204,153);
	noStroke();
	rect(0,0,windowWidth,sw.posY+sw.circleSize);
	fill(189,210,204);
	noStroke();
	rect(0,wt.position.y+wt.objSize,windowWidth,windowHeight);
	pop();
	sw.updata();
  	sw.drawWatch();
  	btn.updata();
  	btn.drawBtn();


  	if(wt.paCount > 9){
		drawWow(windowWidth/2,windowHeight/2,20,10);

	}
}

function initObjets(){
	for (var i = 0; i < objNum; i++) {
	  var posX = int(random(windowWidth));
	  var posY = int(random(sw.posY));
	  objects[i] = new object(posX,posY,sw.posY+sw.circleSizem,wt.position.y+wt.objSize);
	}
}

function drawWow(ox,oy,r,vertexNum) {
  // vertexNum -= 1;
  // push();
  // noFill();
  // stroke(1);
  // strokeWeight(5);
  // translate(ox, oy);
  // beginShape();
  // for (var theta = 0; theta < 360; theta++) {
  //   var x = r * (vertexNum * cos(radians(theta)) + cos(radians(-vertexNum * theta)));
  //   var y = r * (vertexNum * sin(radians(theta)) + sin(radians(-vertexNum * theta)));

  //   vertex(x, y);
  // }
  // endShape();
  // pop();
  if(comentCount < 20){
  	push();
  	translate(windowWidth/2,windowHeight/2);
  	tint(255,20);
  	image(imges[9], -windowWidth/8, -windowWidth/8,windowWidth/4,windowWidth/4);
  	pop();
  	comentCount++;
  }
  
}



// function mouseReleased() {
  
// }

// function keyPressed() {
// }
