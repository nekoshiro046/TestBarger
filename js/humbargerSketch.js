var Ph_Bold_font,Ph_Reg_font,Tsukushi_font;
var objImg = [];
var waiterImg = [];
var etcImg = [];
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
var uScore = 0,preBestScore = 0;
var snedRecord = false;var uTitle ;
var stP = 0;

 
function preload() {
	Ph_Bold_font = loadFont('assets/font/Phenomena-Bold.otf');
	Ph_Reg_font = loadFont('assets/font/Phenomena-Regular.otf');
	Tsukushi_font = loadFont('assets/font/TsukushiAMaruGothic.otf');

	objImg[0] = loadImage('assets/image/obj/sakanahone_t.jp2');

	objImg[1] = loadImage('assets/image/obj/lettuce_top.jp2');
	objImg[2] = loadImage('assets/image/obj/tomato_top.jp2');
	objImg[3] = loadImage('assets/image/obj/patty_top.jp2');
	objImg[4] = loadImage('assets/image/obj/cheese_top.jp2');
	objImg[5] = loadImage('assets/image/obj/bunsT_top.jp2');
	objImg[6] = loadImage('assets/image/obj/bunsU_top.jp2');

	objImg[7] = loadImage('assets/image/obj/lettuce_side.jp2');																	
	objImg[8] = loadImage('assets/image/obj/tomato_side.jp2');
	objImg[9] = loadImage('assets/image/obj/patty_side.jp2');
	objImg[10] = loadImage('assets/image/obj/cheese_side.jp2');
	objImg[11] = loadImage('assets/image/obj/bunsT_side.jp2');
	objImg[12] = loadImage('assets/image/obj/bunsU_side.jp2');


	waiterImg[0] = loadImage('assets/image/waiter/waiter_left_01.png');
	waiterImg[1] = loadImage('assets/image/waiter/waiter_left_02.png');
	waiterImg[2] = loadImage('assets/image/waiter/waiter_right_01.png');
	waiterImg[3] = loadImage('assets/image/waiter/waiter_right_02.png');
	waiterImg[4] = loadImage('assets/image/waiter/waiter_rolling_l.png');
	waiterImg[5] = loadImage('assets/image/waiter/waiter_rolling_r.png');


	etcImg[0] = loadImage('assets/image/etc/wow.png');
	etcImg[1] = loadImage('assets/image/etc/timeup.png');
	etcImg[2] = loadImage('assets/image/etc/back_02.jpg');
	etcImg[3] = loadImage('assets/image/etc/res_back.png');
	etcImg[4] = loadImage('assets/image/etc/finish.png');
	etcImg[5] = loadImage('assets/image/etc/startLogo.jpg');
	etcImg[6] = loadImage('assets/image/etc/walkThrough_p1.jpg');
	etcImg[7] = loadImage('assets/image/etc/walkThrough_p2.jpg');
	etcImg[8] = loadImage('assets/image/etc/walkThrough_p3.jpg');
}

function setup() {
	fr = 10;
	scene = 0;
  //slow down the frameRate to make it more visible

  canvas = createCanvas(windowWidth, windowHeight,P2D);

  canvas.position(0,0);
  canvas.style('position','fixed');
  canvas.style('z-index','0');

  canvas.parent('sketch-holder');


  frameRate(fr);

  var db = firebase.database();
  var scoreBest = db.ref("/score");

	scoreBest.on("value", function(snapshot) { 
        preBestScore = snapshot.val().best;
    });


  sw = new stopWatch(fr,windowHeight/10,windowWidth/5,windowWidth/8);
  // btn = new moveBtn(windowWidth / 4,windowHeight / 10*9,windowWidth / 4*3,windowHeight / 10*9,windowHeight/10 /4 * 3);
  wt = new waiter(windowWidth/2,windowHeight/100*98);
  initObjets();

}

function draw() {
	if(scene == 0){
		drawStartScene();
	}else if(scene == 1){
		drawGameScene();
	}else if(scene == 2){
		drawEndScene();
	}else if(scene == 3){
		drawScoreScene();
	}
}
function drawStartScene(){
	background(255);
	if(stP == 0){
		imageMode(CENTER);
		image(etcImg[5], windowWidth/2,windowHeight/2);
	}else if(stP == 1){
		imageMode(CORNERS);
		image(etcImg[6], 0, 0,windowWidth,windowHeight);
		push();
		translate(windowWidth/2,windowHeight/6);
		noStroke();
		fill(200,64,89);
		ellipse(-40,0,20,20);
		fill(20,50,101);
		ellipse(0,0,20,20);
		fill(20,50,101);
		ellipse(40,0,20,20);
		pop();
	}else if(stP == 2){
		imageMode(CORNERS);
		image(etcImg[7], 0, 0,windowWidth,windowHeight);
		push();
		translate(windowWidth/2,windowHeight/6);
		noStroke();
		fill(20,50,101);
		ellipse(-40,0,20,20);
		fill(200,64,89);
		ellipse(0,0,20,20);
		fill(20,50,101);
		ellipse(40,0,20,20);
		pop();
	}else if(stP == 3){
		imageMode(CORNERS);
		image(etcImg[8], 0, 0,windowWidth,windowHeight);
		push();
		translate(windowWidth/2,windowHeight/6);
		noStroke();
		fill(20,50,101);
		ellipse(-40,0,20,20);
		fill(20,50,101);
		ellipse(0,0,20,20);
		fill(200,64,89);
		ellipse(40,0,20,20);
		pop();
	}else if(stP == 4){
		imageMode(CENTER);
		image(etcImg[5], windowWidth/2,windowHeight/2);
		push();
		translate(windowWidth/2,windowHeight/2);

		fill(20,50,101);
		noStroke();
		rectMode(CENTER);
		rect(0,windowHeight/3,windowWidth/2,windowWidth/5,20);
		textAlign(CENTER);
		textFont(Ph_Bold_font);

		textSize(windowWidth/6);
		fill(200,64,89);
		text('START', 0, windowHeight/8*3);
		// if((mouseX - windowWidth/2 > -windowWidth/4) 
		// 	&& (mouseX - windowWidth/2 < windowWidth/4) 
		// 	&& (mouseY - windowHeight/2 > windowHeight/3 - windowWidth/10)
		// 	&& ( mouseY - windowHeight/2 <=  windowHeight/3 + windowWidth/10)){
		// 	fill(200,64,89);
		// 	text('START', 0, windowHeight/8*3);
		// 	if(mouseIsPressed)setup();
		// }else{
		// 	fill(67,158,157);
		// 	text('START', 0, windowHeight/8*3);
		// }

		pop();

	}
}

function mousePressed(){
	if(scene == 0){
		if(stP == 0){
			stP++;
		}else if(stP == 1){
			if(mouseX < windowWidth/2){
				stP--;
			}else{
				stP++;
			}
		}else if(stP == 2){
			if(mouseX < windowWidth/2){
				stP--;
			}else{
				stP++;
			}
		}else if(stP == 3){
			if(mouseX < windowWidth/2){
				stP--;
			}else{
				stP++;
			}
		}else if(stP == 4){
			if((mouseX - windowWidth/2 > -windowWidth/4) 
			&& (mouseX - windowWidth/2 < windowWidth/4) 
			&& (mouseY - windowHeight/2 > windowHeight/3 - windowWidth/10)
			&& ( mouseY - windowHeight/2 <=  windowHeight/3 + windowWidth/10)){
				scene = 1;
			}
		}
	}
}


function drawGameScene(){
	background(255);
	imageMode(CORNERS);
	image(etcImg[2], 0, 0,windowWidth,windowHeight);


	updata();
	drawMaterial();
	wt.drawImg();


	//------------------menues------------
	drawMenus();

	if(wt.paCount == 10){
		drawComment(windowWidth/2,windowHeight/2,20,10,'wow');

	}
}

function drawEndScene(){
	background(255);
	imageMode(CORNERS);
	image(etcImg[2], 0, 0,windowWidth,windowHeight);

	drawMaterial();
	wt.drawImg();
	drawMenus();

	drawComment(windowWidth/2,windowHeight/2,20,10,'timeup');
}

function drawScoreScene(){
	if(commentCount > 10){
		background(255);
		imageMode(CORNERS);
		image(etcImg[3], 0, 0);
		push();
		translate(windowWidth/2,windowHeight/2);
		rectMode(CENTER);
		fill(255,240);
		noStroke();
		rect(0,0,windowWidth/4*3,windowHeight/4*3,15);

		textAlign(CENTER);
		textFont(Ph_Bold_font);

		stSize = 32;
		textSize(stSize);
		let s1 = 'Score : ';
		let s2 = String(wt.paCount) + 'cm';
		let s3 = 'RETRY';
		var s4, s5;
		var sliceStr = culBurName();
		let sWidth = textWidth(sliceStr);
		var wCount = 10;var addBreakStr = "";
		for (var i = 0; i < sWidth / wCount; i++) {
		    s4 = sliceStr.slice(0, wCount);
		    s5 = sliceStr.slice(wCount);
		    addBreakStr += s4 + '\n';
		    sliceStr = s5;
		}
		if(uTitle == null){
			uTitle = culBurTitle();
		}
		fill(0);
		text(s1, -stSize, -windowHeight/3+stSize/3*2);
		text(s2, stSize, -windowHeight/3+stSize/3*2);
		textFont(Tsukushi_font);
		fill(200,64,89);
		text(uTitle, 0, -windowHeight/3+stSize*2);
		fill(0,240);
		textSize(windowWidth/20);
		text(addBreakStr, 0, -windowHeight/3+stSize*3+stSize/3*2);
		textFont(Ph_Bold_font);
		

		//retry_Btn

		fill(20,50,101);
		noStroke();
		rect(0,windowHeight/3,windowWidth/2,windowWidth/5,20);

		textSize(windowWidth/6);
		if((mouseX - windowWidth/2 > -windowWidth/4) 
			&& (mouseX - windowWidth/2 < windowWidth/4) 
			&& (mouseY - windowHeight/2 > windowHeight/3 - windowWidth/10)
			&& ( mouseY - windowHeight/2 <=  windowHeight/3 + windowWidth/10)){
			fill(200,64,89);
			text(s3, 0, windowHeight/8*3);
			if(mouseIsPressed)setup();
		}else{
			fill(67,158,157);
			text(s3, 0, windowHeight/8*3);
		}

		imageMode(CENTER);
		for(var i = 0,j=0; i < wt.paCount; i++){
      		image(objImg[wt.patties[i]], 0, windowHeight/4-j,wt.objSize/2,wt.objSize/5);
      		j += wt.objSize/8;
		}

		pop();
  	}else{
  		commentCount++;
  		push();
		translate(windowWidth/2,windowHeight/2);
		rectMode(CENTER);
		fill(255,80);
		noStroke();
		rect(0,0,windowWidth,windowHeight);
		pop();

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
			if((objects[i].position.x + objects[i].objSize/3)< wt.position.x 
				&& (objects[i].position.x) > (wt.position.x - wt.objSize/3)  
				&& wt.position.y + wt.objSize/4- objects[i].position.y - wt.paHeight > 0
				&& wt.position.y + wt.objSize/4 - objects[i].position.y - wt.paHeight < objects[i].objSize/10)
			{
				if(objects[i].imgID == 1){
					wt.patties[wt.paCount] = 7;
					wt.paCount++;
					wt.paHeight += wt.objSize/8;
				}
				else if(objects[i].imgID == 2){
					wt.patties[wt.paCount] = 8;
					wt.paCount++;
					wt.paHeight += wt.objSize/8;
				}
				else if(objects[i].imgID == 3){
					wt.patties[wt.paCount] = 9;
					wt.paCount++;
					wt.paHeight += wt.objSize/8;
				}
				else if(objects[i].imgID == 4){
					wt.patties[wt.paCount] = 10;
					wt.paCount++;
					wt.paHeight += wt.objSize/8;
				}
				else if(objects[i].imgID == 5){
					wt.patties[wt.paCount] = 11;
					wt.paCount++;
					wt.paHeight += wt.objSize/8;

					scene = 2;
      				commentCount =0;
      				drawComment(windowWidth/2,windowHeight/2,20,10,'timeup');
				}
				else{
					wt.patties[wt.paCount] = 12;
					wt.paCount++;
					wt.paHeight += wt.objSize/8;
				}
				objects[i].rest();
				continue;
			}else{
				objects[i].updata(sw.second);
				continue;
			}

		}else if(wt.imgID == 2 || wt.imgID == 3){//右向き
			if((objects[i].position.x - objects[i].objSize/3) > wt.position.x 
				&& (objects[i].position.x) < (wt.position.x + wt.objSize/3) 
				&& wt.position.y + wt.objSize/4 - objects[i].position.y - wt.paHeight > 0
				&& wt.position.y + wt.objSize/4 - objects[i].position.y - wt.paHeight < objects[i].objSize/10)
			{
				if(objects[i].imgID == 1){
					wt.patties[wt.paCount] = 7;
					wt.paCount++;
					wt.paHeight += wt.objSize/8;
				}
				else if(objects[i].imgID == 2){
					wt.patties[wt.paCount] = 8;
					wt.paCount++;
					wt.paHeight += wt.objSize/8;
				}
				else if(objects[i].imgID == 3){
					wt.patties[wt.paCount] = 9;
					wt.paCount++;
					wt.paHeight += wt.objSize/8;
				}
				else if(objects[i].imgID == 4){
					wt.patties[wt.paCount] = 10;
					wt.paCount++;
					wt.paHeight += wt.objSize/8;
				}
				else if(objects[i].imgID == 5){
					wt.patties[wt.paCount] = 11;
					wt.paCount++;
					wt.paHeight += wt.objSize/8;

					scene = 2;
      				commentCount =0;
      				drawComment(windowWidth/2,windowHeight/2,20,10,'timeup');
				}
				else{
					wt.patties[wt.paCount] = 12;
					wt.paCount++;
					wt.paHeight += wt.objSize/8;
				}
				objects[i].rest();
				continue;
			}else{
				objects[i].updata(sw.second);
				continue;
			}

		}else{
			objects[i].updata(sw.second);
		}

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
}

function initObjets(){
	for (var i = 0; i < objNum; i++) {
		var posX = random(wt.objSize/2,windowWidth-wt.objSize/2);
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
	  	tint(255,180);
	  	imageMode(CENTER);
	  	image(etcImg[0], 0,0);
	  	pop();
	  	commentCount++;
  	}
  }
  else if(imgNa == 'timeup'){
  	if(commentCount < 30){
	  	push();
	  	translate(windowWidth/2,windowHeight/2);
	  	// tint(255,200);
	  	imageMode(CENTER);
	  	image(etcImg[4], 0,0);
	  	pop();
	  	commentCount++;
  	}else{
  		scene = 3;
  		uScore = wt.paCount;
  		commentCount = 0;
  	}
  }
  
}

function drawScore(){
	push();

  	translate(windowWidth*2/3,sw.posY + sw.circleSize/4);

  	textFont(Ph_Reg_font);
  	stSize = sw.circleSize/3;
	textSize(stSize);
	let s1 = 'Score';
	let s2 = String(wt.paCount) + 'cm';

	textAlign(CENTER);
	fill(255);
	text(s1,0,-sw.circleSize/6);
	text(s2, 0,sw.circleSize/6);

	let s3 = 'Best';
	let s4 = String(preBestScore) + 'cm';

	text(s3,0,sw.circleSize/3*2);
	text(s4, 0,sw.circleSize);

  	pop();
}

function culBurTitle(){
	var lettuceNum = 0,tomatoNum = 0,pattyNum = 0,cheeseNum = 0,bunsTNum = 0,bunsUNum = 1;
	for(var i = 0; i < wt.paCount; i++){
		if(wt.patties[i] ==  7)lettuceNum++;
		if(wt.patties[i] ==  8)tomatoNum++;
		if(wt.patties[i] ==  9)pattyNum++;
		if(wt.patties[i] ==  10)cheeseNum++;
		if(wt.patties[i] ==  11)bunsTNum++;
		if(wt.patties[i] ==  12)bunsUNum++;
	}

	var s;
	//レア度高いほうが先

	if(wt.paCount > preBestScore){
		s = '「NewRecordHolder」';
		var db = firebase.database();
		var scoreBest = db.ref("/score");
		scoreBest.set({title:"example", best:wt.paCount});
		return s;
	}

	if(lettuceNum == 0 && tomatoNum == 0 && pattyNum == 0 && cheeseNum == 0 && bunsTNum == 1){
		s = '「真ん中切っただけ...」';
		return s;
	}

	if(lettuceNum >= 2 && tomatoNum >= 2 && pattyNum >= 2 && cheeseNum >= 2 && bunsTNum == 1){
		s = '「いっぱい食べる君が好き」';
		return s;
	}

	if(wt.imgID == 4 || wt.imgID == 5){
		s = '「ドジっ子」';
		return s;
	}

	if((lettuceNum +tomatoNum) == 0 && pattyNum < 6){
		s = '「野菜不足」';
		return s;
	}

	if(pattyNum >= 6){
		s = '「肉食家」';
		return s;
	}
	if(s == null){
		s = '「称号なし」';
		return s;
	}
	return s;
}
function culBurName(){
	var lettuceNum = 0,tomatoNum = 0,pattyNum = 0,cheeseNum = 0,bunsTNum = 0,bunsUNum = 1;
	for(var i = 0; i < wt.paCount; i++){
		if(wt.patties[i] ==  7)lettuceNum++;
		if(wt.patties[i] ==  8)tomatoNum++;
		if(wt.patties[i] ==  9)pattyNum++;
		if(wt.patties[i] ==  10)cheeseNum++;
		if(wt.patties[i] ==  11)bunsTNum++;
		if(wt.patties[i] ==  12)bunsUNum++;
	}

	var s = '';
	if(lettuceNum == 0 && tomatoNum == 0 && pattyNum == 0 && cheeseNum == 0){
		s = 'ただのパン';
		return s;
	}

	if((lettuceNum +tomatoNum) >= 2 && (lettuceNum +tomatoNum) < 4){
		s += 'ヤサイ';
	}else if((lettuceNum +tomatoNum) >= 4){
		s += 'モリモリヤサイ';
	}

	if(cheeseNum > 0 && cheeseNum < 2){
		s += 'チーズ';
	}else if(cheeseNum >= 2 && cheeseNum < 3){
		s += 'ダブルチーズ';
	}else if(cheeseNum >= 3 && cheeseNum < 4){
		s += 'トリプルチーズ';
	}else if(cheeseNum >= 4 && cheeseNum < 5){
		s += 'クワトロチーズ';
	}else if(cheeseNum >= 5){
		s += 'チーーーズ';
	}

	if(pattyNum > 1 && pattyNum < 3){
		s += 'ビッグ';
	}else if(pattyNum >= 3 && pattyNum < 6){
		s += 'メガ';
	}else if(pattyNum >= 6){
		s += 'ギガ';
	}else if(pattyNum == 1){
	}else{
		s += 'にくなし';
	}

	if(bunsTNum == 1){
		s += 'バーガー';
	}else if(bunsTNum == 0){
		s += 'バーガーもどき';
	}

	return s;
}
