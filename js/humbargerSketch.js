var imges = [];
var waiterImg = [];
var objects = [];
let objNum = 5;//obj_classの生成数
var wt;//waiter_class

var canvas;
var fr;//フレームレート

//munu_classes
var sw;
// var btn;
//シーン管理
var scene;// 0: start画面 1:game画面 2:end画面 3:スコア画面
var commentCount = 0;
var uScore = 0;

 
function preload() {
	// imges[0] = loadImage('assets/watermark.png');

	imges[0] = loadImage('assets/obj/sakanahone_t.jp2');

	imges[1] = loadImage('assets/obj/lettuce_top.jp2');
	imges[2] = loadImage('assets/obj/tomato_top.jp2');
	imges[3] = loadImage('assets/obj/patty_top.jp2');
	imges[4] = loadImage('assets/obj/bunsU_top.jp2');

	// imges[1] = loadImage('assets/obj/sakanahone_t.jp2');
	// imges[2] = loadImage('assets/obj/sakanahone_t.jp2');
	// imges[3] = loadImage('assets/obj/sakanahone_t.jp2');
	// imges[4] = loadImage('assets/obj/sakanahone_t.jp2');


	imges[5] = loadImage('assets/obj/lettuce_side.jp2');																	
	imges[6] = loadImage('assets/obj/tomato_side.jp2');
	imges[7] = loadImage('assets/obj/patty_side.jp2');
	imges[8] = loadImage('assets/obj/bunsU_side.jp2');

	imges[9] = loadImage('assets/wow.jp2');
	imges[10] = loadImage('assets/timeup.jp2');

	imges[11] = loadImage('assets/score.jp2');

	imges[12] = loadImage('assets/back_02.png');

	waiterImg[0] = loadImage('assets/waiter/waiter_left_01.png');
	waiterImg[1] = loadImage('assets/waiter/waiter_left_02.png');
	waiterImg[2] = loadImage('assets/waiter/waiter_right_01.png');
	waiterImg[3] = loadImage('assets/waiter/waiter_right_02.png');

	waiterImg[4] = loadImage('assets/waiter/waiter_rolling_l.png');
	waiterImg[5] = loadImage('assets/waiter/waiter_rolling_r.png');

	
}

function setup() {
	fr = 10;
	scene = 1;
  //slow down the frameRate to make it more visible
  canvas = createCanvas(windowWidth, windowHeight,P2D);

  canvas.position(0,0);
  canvas.style('position','fixed');
  canvas.style('z-index','0');

  canvas.parent('sketch-holder');


  frameRate(fr);

  sw = new stopWatch(fr,windowHeight/10,windowWidth/5,windowWidth/8);
  // btn = new moveBtn(windowWidth / 4,windowHeight / 10*9,windowWidth / 4*3,windowHeight / 10*9,windowHeight/10 /4 * 3);
  wt = new waiter(windowWidth/2,windowHeight/100*98);
  initObjets();

}

function draw() {
	if(scene == 1){
		drawGameScene();
	}else if(scene == 2){
		drawEndScene();
	}else if(scene == 3){
		drawScoreScene();
	}
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function drawGameScene(){
	background(255);
	imageMode(CORNERS);
	image(imges[12], 0, 0,windowWidth,windowHeight);


	updata();
	drawMaterial();
	wt.drawImg();


	//------------------menues------------
	drawMenus();

	if(wt.paCount > 2){
		drawComment(windowWidth/2,windowHeight/2,20,10,'wow');

	}
}

function drawEndScene(){
	background(255);
	imageMode(CORNERS);
	image(imges[12], 0, 0,windowWidth,windowHeight);

	drawMaterial();
	wt.drawImg();
	drawMenus();

	drawComment(windowWidth/2,windowHeight/2,20,10,'timeup');
}

function drawScoreScene(){
	background(255);
	imageMode(CORNERS);
	image(imges[12], 0, 0,windowWidth,windowHeight);


	drawMaterial();
	wt.drawImg();
	drawMenus();

	drawComment(windowWidth/2,windowHeight/2,20,10,'score');

	var db = firebase.database();
    var scoreBest = db.ref("/score");

    var preBestScore = 0;

	scoreBest.on("value", function(snapshot) { 
        preBestScore = snapshot.val().best;
    });

    var myScore = wt.paCount;

    if(myScore > preBestScore){
    	scoreBest.set({title:"example", best:myScore});
    }

}


function updata(){
	if(mouseIsPressed){
		if(mouseX < windowWidth/2){
			wt.updata(-10);
		}else{
			wt.updata(10);
		}
	}
	// wt.updata(btn.updata());

	for (var i = 0; i < objNum; i++) {//落ちてくる具材(オブジェクト)それぞれに対し当たり判定を行う
		if(wt.imgID == 0 || wt.imgID == 1){//左向き
			if((objects[i].position.x)< wt.position.x 
				&& (objects[i].position.x) > (wt.position.x - wt.objSize/3)  
				&& wt.position.y - objects[i].position.y - wt.paHeight > 0
				&& wt.position.y - objects[i].position.y - wt.paHeight < objects[i].objSize/4)
			{
				if(objects[i].imgID == 1){
					wt.patties[wt.paCount] = 5;
					wt.paCount++;
					wt.paHeight += wt.objSize/5;
				}
				else if(objects[i].imgID == 2){
					wt.patties[wt.paCount] = 6;
					wt.paCount++;
					wt.paHeight += wt.objSize/5;
				}
				else if(objects[i].imgID == 3){
					wt.patties[wt.paCount] = 7;
					wt.paCount++;
					wt.paHeight += wt.objSize/5;
				}
				else{
					wt.patties[wt.paCount] = 8;
					wt.paCount++;
					wt.paHeight += wt.objSize/5;
				}
				objects[i].rest();
			}else{
				objects[i].updata();
			}

		}else if(wt.imgID == 2 || wt.imgID == 3){//右向き
			if((objects[i].position.x) > wt.position.x 
				&& (objects[i].position.x) < (wt.position.x + wt.objSize/3) 
				&& wt.position.y - objects[i].position.y - wt.paHeight > 0
				&& wt.position.y - objects[i].position.y - wt.paHeight < objects[i].objSize/4)
			{
				if(objects[i].imgID == 1){
					wt.patties[wt.paCount] = 5;
					wt.paCount++;
					wt.paHeight += wt.objSize/5;
				}
				else if(objects[i].imgID == 2){
					wt.patties[wt.paCount] = 6;
					wt.paCount++;
					wt.paHeight += wt.objSize/5;
				}
				else if(objects[i].imgID == 3){
					wt.patties[wt.paCount] = 7;
					wt.paCount++;
					wt.paHeight += wt.objSize/5;
				}
				else{
					wt.patties[wt.paCount] = 8;
					wt.paCount++;
					wt.paHeight += wt.objSize/5;
				}
				objects[i].rest();
			}else{
				objects[i].updata();
			}

		}else{
			objects[i].updata();
		}


		// if(objects[i].position.x < wt.position.x 
		// 	&& objects[i].position.x > (wt.position.x - wt.objSize)  
		// 	&& objects[i].position.y < wt.position.y -wt.paHeight 
		// 	&& objects[i].position.y > (wt.position.y -wt.paHeight-wt.objSize/4))
		// {
		// 	if(objects[i].imgID == 1){
		// 		wt.patties[wt.paCount] = 5;
		// 		wt.paCount++;
		// 		wt.paHeight += wt.objSize/4;
		// 	}
		// 	else if(objects[i].imgID == 2){
		// 		wt.patties[wt.paCount] = 6;
		// 		wt.paCount++;
		// 		wt.paHeight += wt.objSize/4;
		// 	}
		// 	else if(objects[i].imgID == 3){
		// 		wt.patties[wt.paCount] = 7;
		// 		wt.paCount++;
		// 		wt.paHeight += wt.objSize/4;
		// 	}
		// 	else{
		// 		wt.patties[wt.paCount] = 8;
		// 		wt.paCount++;
		// 		wt.paHeight += wt.objSize/4;
		// 	}
		// 	objects[i].rest();
		// }
		// else{
		// 	objects[i].updata();
		// }

	}
}

function drawMaterial(){
	for (var i = 0; i < objNum; i++) {
		if(objects[i].position.y > windowHeight/4){
			objects[i].drawImg();
		}
	}
}

function drawMenus(){
	drawScore();

	if(scene == 1)sw.updata();
  	sw.drawWatch();
  	// btn.updata();
  	// btn.drawBtn();
}

function initObjets(){
	for (var i = 0; i < objNum; i++) {
	  var posX = int(random(wt.objSize,windowWidth-wt.objSize));
	  var posY = int(random(windowHeight / 4));
	  // var posY = windowHeight / 4;
	  objects[i] = new object(posX,posY,sw.posY+sw.circleSizem,wt.position.y+wt.objSize);
	}
}

function drawComment(ox,oy,r,vertexNum,imgNa) {
  if(imgNa == 'wow'){
  	if(commentCount < 20){
	  	push();
	  	translate(windowWidth/2,windowHeight/2);
	  	// tint(255,20);
	  	imageMode(CORNERS);
	  	image(imges[9], -windowHeight/8, -windowHeight/8,windowHeight/4,windowHeight/4);
	  	pop();
	  	commentCount++;
  	}
  	// else{
  	// 	comentCount=0;
  	// }
  }
  else if(imgNa == 'timeup'){
  	if(commentCount < 30){
	  	push();
	  	translate(windowWidth/2,windowHeight/2);
	  	tint(255,200);
	  	imageMode(CORNERS);
	  	image(imges[10], -windowWidth/8, -windowWidth/8,windowWidth/4,windowWidth/4);
	  	pop();
	  	commentCount++;
  	}else{
  		scene = 3;
  		uScore = wt.paCount;
  		commentCount = 0;
  	}
  }

  else if(imgNa == 'score'){
  	if(commentCount > 10){
  // 		push();
	 //  	translate(windowWidth/2,windowHeight/2);
		// image(imges[11], -windowWidth/8, -windowWidth/8,windowWidth/4,windowWidth/4);
		// pop();
		push();
		translate(windowWidth/2,windowHeight/2);
		rectMode(CENTER);
		fill(255,100);
		noStroke();
		rect(0,0,windowWidth/2,windowHeight/2);
		stSize = 32;
		textSize(stSize);
		let s1 = 'スコア';
		let s2 = String(wt.paCount) + 'cm';
		let s3 = 'もう一度遊ぶ';

		fill(0);
		text(s1, -stSize, 0);
		text(s2, 0, stSize);
		if((mouseX - windowWidth/2 > -stSize) 
			&& (mouseX - windowWidth/2 < stSize*6) 
			&& (mouseY - windowHeight/2 > stSize )
			&& ( mouseY - windowHeight/2 <= stSize*2)){
			fill(255,0,0);
			text(s3, -stSize, stSize*2);
			if(mouseIsPressed)setup();
		}else{
			text(s3, -stSize, stSize*2);
		}

		pop();

  	}else{
  		commentCount++;
  	}
 //  	push();
 //  	translate(windowWidth/2,windowHeight/2);
	// image(imges[11], -windowWidth/8, -windowWidth/8,windowWidth/4,windowWidth/4);
	// pop();
  }
  
}

function drawScore(){
	push();

  	translate(windowWidth*2/3,sw.posY + sw.circleSize/4);

  	stSize = sw.circleSize/3;
	textSize(stSize);
	let s1 = 'Score';
	let s2 = String(wt.paCount) + 'cm';

	textAlign(CENTER);
	fill(255);
	text(s1,0,-sw.circleSize/6);
	text(s2, 0,sw.circleSize/6);

	var db = firebase.database();
    var scoreBest = db.ref("/score");

	var preBestScore = 0;

	scoreBest.on("value", function(snapshot) { 
        preBestScore = snapshot.val().best;
    });

	let s3 = 'Best';
	let s4 = String(preBestScore) + 'cm';

	text(s3,0,sw.circleSize/3*2);
	text(s4, 0,sw.circleSize);

  	pop();
}

// function drawBestScore(){
// 	push();
// 	rectMode(CENTER);

//   	translate(sw.posX/2*3,sw.posY);
//   	fill(255);
//   	noStroke();
//   	rect(0,0,sw.circleSize*2,sw.circleSize,20);

//   	stSize = 32;
// 	textSize(stSize);
	
// 	var db = firebase.database();
//     var scoreBest = db.ref("/score");

// 	var preBestScore = 0;

// 	scoreBest.on("value", function(snapshot) { 
//         preBestScore = snapshot.val().best;
//     });

// 	let s1 = 'ベストスコア';
// 	let s2 = String(preBestScore) + 'cm';

// 	textAlign(CENTER);
// 	textSize(stSize);
// 	fill(255);
// 	text(s1,0,-sw.circleSize/2);
// 	fill(0);
// 	stSize = sw.circleSize/2;
// 	textSize(stSize);
// 	text(s2, 0,sw.circleSize/4);


//   	pop();
// }


// function mouseReleased() {
  
// }

// function keyPressed() {
// }
