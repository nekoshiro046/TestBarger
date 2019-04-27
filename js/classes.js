class object{
	constructor(x,y,at,ab){
		this.position = createVector(x, y);
	    this.velocity = createVector(0, 0);
	    this.acceleration = createVector(0, 0);
	    this.gravity = createVector(0,0.1);
	    this.imgID = int(random(1,5));
	    this.objSize = windowHeight/10;
      this.areaTop = at;
      this.areaBottom = ab;
	}

	updata(){
		this.acceleration.add(this.gravity);
	    this.velocity.add(this.acceleration);
	    this.position.add(this.velocity);
	    this.acceleration.mult(0);
	    this.velocity.mult(0.98);
	    
	    if(this.position.y > this.areaBottom){
	      var posX = random(windowWidth);
        var posY = int(random(-windowHeight/2,this.at));
	      this.position = createVector(posX, 0);
	    }
	}

	rest(){
		var posX = random(windowWidth);
		var posY = int(random(-windowHeight/2,this.at));
	  this.position = createVector(posX, posY);
    this.imgID = int(random(1,5));

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
	  this.objSize = windowHeight/6;
	    this.position.y -= this.objSize;
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

//--------------------------------------------------------------------

class stopWatch{
  constructor(fr,cs,posx,posy){
    this.fr = fr;
    this.second = 0;
    this.sCount = 0;
    this.circleSize = cs;
    this.needleSize = -this.circleSize / 3;
    this.posX = posx;
    this.posY = posy;
  }

  updata(){

    this.sCount++;
    if(this.sCount > this.fr/6){
      this.sCount = 0;

      this.second++;
    }
    if(this.second > 360){
      scene = 2;
    }
  }

  drawWatch(){
    push();
    translate(this.posX,this.posY);
    ellipse(0,0,this.circleSize,this.circleSize);
    pop();

    push();
    translate(this.posX,this.posY);
    rotate(radians(this.second));
    rect(0,0,4,this.needleSize);
    pop();
  }
}


class moveBtn{

  constructor(x1,y1,x2,y2,s){
    this.leftPosition = createVector(x1, y1);
    this.rightPosition = createVector(x2, y2);
    this.btnSize = s;
    this.leftBtnIsPressed = false;
    this.rightBtnIsPressed = false;
  }

  updata(){
    if(mouseIsPressed && dist(mouseX,mouseY,this.leftPosition.x,this.leftPosition.y) < this.btnSize*4/3 ){
      this.leftBtnIsPressed = true;
      return -10;
    }else if(mouseIsPressed && dist(mouseX,mouseY,this.rightPosition.x,this.rightPosition.y) < this.btnSize*4/3 ){
      this.rightBtnIsPressed = true;
      return 10;
    }else{
    	return 0;
    }
  }

  drawBtn(){
    //leftBtn
    push();
    translate(this.leftPosition.x,this.leftPosition.y);
    rotate(- PI /2.0);
    // triangle(posx,posy-size/3*2,posx - size/sqrt(3),posy+size/3,posx+size/sqrt(3),posy+size/3);
    ellipse(0,0,this.btnSize*4/3,this.btnSize*4/3);
    if(this.leftBtnIsPressed){
      // push();
      fill(202,34,125);
      this.leftBtnIsPressed = false;
      // pop();
    }else{
      noFill();
    }
    triangle(0,-this.btnSize/3*2,- this.btnSize/sqrt(3),this.btnSize/3,this.btnSize/sqrt(3),this.btnSize/3);
    pop();

    //rightBtn
    push();
    translate(this.rightPosition.x, this.rightPosition.y);
    rotate(PI /2.0);
    // triangle(posx,posy-size/3*2,posx - size/sqrt(3),posy+size/3,posx+size/sqrt(3),posy+size/3);
    ellipse(0,0,this.btnSize*4/3,this.btnSize*4/3);
    if(this.rightBtnIsPressed){
      // push();
      fill(202,34,125);
      this.rightBtnIsPressed = false;
      // pop();
    }else{
      noFill();
    }
    triangle(0,-this.btnSize/3*2,- this.btnSize/sqrt(3),this.btnSize/3,this.btnSize/sqrt(3),this.btnSize/3);
    pop();
  }
}


