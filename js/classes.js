class object{
	constructor(x,y){
		this.position = createVector(x, y);
	    this.velocity = createVector(0, 0);
	    this.acceleration = createVector(0, 0);
	    this.gravity = createVector(0,0.1);
	    this.imgID = int(random(1,5));
	    this.objSize = windowWidth/10;
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
	    this.objSize = windowWidth/6;
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