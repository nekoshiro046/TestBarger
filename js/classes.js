class object{
	constructor(x,y,at,ab){
		this.position = createVector(x, y);
	    this.velocity = createVector(0, 0);
	    this.acceleration = createVector(0, 0);
      // this.imgID ;
      // var rn = int(random(50));
      // if(rn == 0){
      //   this.imgID = 0;
      // }else{
      //   this.imgID = int(random(1,5));
      // }

      this.imgID = int(random(1,7));
      // this.imgID = 5;
      // this.gravity ;
      // if(this.imgID == 0){
      //   this.gravity = createVector(0,0.5);
      // }else{
      //   this.gravity = createVector(0,0.1);
      // }

      this.gravity = createVector(0,0.15);
	    this.objSize = windowHeight/10;
      this.areaTop = at;
      this.areaBottom = ab;
	}

	updata(t){
		this.acceleration.add(this.gravity);
	    this.velocity.add(this.acceleration);
	    this.position.add(this.velocity);
	    this.acceleration.mult(0);
	    this.velocity.mult(0.98);
	    
	    if(this.position.y > this.areaBottom){
	    var posX = random(this.objSize/2,windowWidth-this.objSize/2);
        var posY = int(random(windowHeight / 4));
        // var posY = windowHeight / 4;
	      this.position = createVector(posX, posY);

        // var rn = int(random(50));
        // if(rn == 0){
        //   this.imgID = 0;
        //   this.gravity = createVector(0,0.5);
        // }else{
        //   this.imgID = int(random(1,5));
        //   this.gravity = createVector(0,0.1);

        // }
        if(t > 240){
          var rn = int(random(3));
          if(rn == 0){
            this.imgID = 5;
          }else{
            this.imgID = int(random(1,7));
          }
        }
        this.imgID = int(random(1,7));
        this.gravity = createVector(0,0.15);

	    }
	}

	rest(){
		// var posX = random(windowWidth);
		var posX = random(this.objSize/2,windowWidth-this.objSize/2);
		var posY = int(random(windowHeight / 4));
    // var posY = windowHeight / 4;
	  this.position = createVector(posX, posY);
    // this.imgID = int(random(1,5));
    // var rn = int(random(50));
    //   if(rn == 0){
    //     this.imgID = 0;
    //     this.gravity = createVector(0,0.5);
    //   }else{
    //     this.imgID = int(random(1,5));
    //     this.gravity = createVector(0,0.1);
    //   }

      this.imgID = int(random(1,7));
      this.gravity = createVector(0,0.15);

	}

	putOnBred(bredPos){
		this.position = bredPos;
	}

	drawImg(){
    imageMode(CENTER);
    if(this.imgID == 0){
      imageMode(CENTER);
      image(objImg[this.imgID], this.position.x, this.position.y,this.objSize,this.objSize*2);
    }else{
      image(objImg[this.imgID], this.position.x, this.position.y,this.objSize,this.objSize);
    }
	}

}

class waiter{
	constructor(x,y){

	this.position = createVector(x, y);
	this.velocity = createVector(0, 0);
	this.imgID = 0;
	this.objSize = windowHeight/4;
	this.position.y -= this.objSize;
    this.stackingHeight = 0;
    this.patties = [];
    this.patties[0] = 12;
    this.paCount = 1;
    this.paHeight = 0;
    this.rollingCount = 0;

	}

	updata(d){
    if((this.position.x+d < windowWidth-this.objSize/2) && (this.position.x+d > this.objSize/2) ) {
      if(this.imgID == 4 || this.imgID == 5){
        this.position.x += 0;
      }else{
        this.position.x += d;
      }
      
    }
    if(this.rollingCount == 0){
      if(d < 0){
        if(this.imgID == 0){
          this.imgID = 1;
          var rn = int(random(50));
          if(rn == 0){
            this.imgID = 4;
            this.rollingCount = int(random(10));
          }
        }
        else if(this.imgID == 1){
          this.imgID = 0;
          var rn = int(random(50));
          if(rn == 0){
            this.imgID = 4;
            this.rollingCount = int(random(10));
          }
        }
        else{
          this.imgID = int(random(2));
        }
      }else{
        if(this.imgID == 2){
          this.imgID = 3;
          var rn = int(random(50));
          if(rn == 0){
            this.imgID = 5;
            this.rollingCount = int(random(10));
          }
        }
        else if(this.imgID == 3){
          this.imgID = 2;
          var rn = int(random(50));
          if(rn == 0){
            this.imgID = 5;
            this.rollingCount = int(random(10));
          }
        }
        else{
          this.imgID = int(random(2,4));
        }
      }
    }else{
      this.rollingCount--;
    }
	}

	drawImg(){
    imageMode(CENTER);
		// image(objImg[this.imgID], this.position.x-this.objSize/2, this.position.y,this.objSize,this.objSize);
    if(this.imgID == 4 || this.imgID == 5){
      image(waiterImg[this.imgID], this.position.x, this.position.y + this.objSize*4/5,this.objSize,this.objSize/2);
    }
    else{
      image(waiterImg[this.imgID], this.position.x, this.position.y + this.objSize/2,this.objSize,this.objSize);
      // push();
      // strokeWeight(10);
      // point(this.position.x, this.position.y);
      // pop();
    }
    
		for(var i = 0,j=0; i < this.paCount; i++){
			if(this.patties[i] != 0){
        if(this.imgID == 0 || this.imgID == 1){
          image(objImg[this.patties[i]], this.position.x-this.objSize/4, this.position.y-j+this.objSize/3,this.objSize/2,this.objSize/5);
        }else if(this.imgID == 2 || this.imgID == 3){
          image(objImg[this.patties[i]], this.position.x+this.objSize/4, this.position.y-j+this.objSize/3,this.objSize/2,this.objSize/5);
        }
				j += this.objSize/8;
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
    if(this.sCount > this.fr/12){
      this.sCount = 0;

      this.second++;
    }
    if(this.second > 360){
      scene = 2;
      commentCount =0;
    }
  }

  drawWatch(){
    push();
    translate(this.posX,this.posY);
    strokeWeight(0.5);
    ellipse(0,0,this.circleSize,this.circleSize);
    strokeWeight(5);
    pop();

    push();
    translate(this.posX,this.posY);
    rotate(radians(this.second));
    // fill(200,64,89);
    stroke(200,64,89);
    strokeWeight(5);
    line(0,0,0,this.needleSize);
    // rect(0,0,4,this.needleSize);
    pop();
  }
}


// class moveBtn{

//   constructor(x1,y1,x2,y2,s){
//     this.leftPosition = createVector(x1, y1);
//     this.rightPosition = createVector(x2, y2);
//     this.btnSize = s;
//     this.leftBtnIsPressed = false;
//     this.rightBtnIsPressed = false;
//   }

//   updata(){
//     if(mouseIsPressed && dist(mouseX,mouseY,this.leftPosition.x,this.leftPosition.y) < this.btnSize*4/3 ){
//       this.leftBtnIsPressed = true;
//       return -10;
//     }else if(mouseIsPressed && dist(mouseX,mouseY,this.rightPosition.x,this.rightPosition.y) < this.btnSize*4/3 ){
//       this.rightBtnIsPressed = true;
//       return 10;
//     }else{
//     	return 0;
//     }
//   }

//   drawBtn(){
//     //leftBtn
//     push();
//     translate(this.leftPosition.x,this.leftPosition.y);
//     rotate(- PI /2.0);
//     noStroke();
//     // triangle(posx,posy-size/3*2,posx - size/sqrt(3),posy+size/3,posx+size/sqrt(3),posy+size/3);
//     ellipse(0,0,this.btnSize*4/3,this.btnSize*4/3);
//     if(this.leftBtnIsPressed){
//       // push();
//       fill(202,34,125);
//       this.leftBtnIsPressed = false;
//       // pop();
//     }else{
//       noFill();
//     }
//     strokeWeight(0.5);
//     stroke(0);
//     triangle(0,-this.btnSize/3*2,- this.btnSize/sqrt(3),this.btnSize/3,this.btnSize/sqrt(3),this.btnSize/3);
//     pop();

//     //rightBtn
//     push();
//     translate(this.rightPosition.x, this.rightPosition.y);
//     rotate(PI /2.0);
//     noStroke();
//     // triangle(posx,posy-size/3*2,posx - size/sqrt(3),posy+size/3,posx+size/sqrt(3),posy+size/3);
//     ellipse(0,0,this.btnSize*4/3,this.btnSize*4/3);
//     if(this.rightBtnIsPressed){
//       // push();
//       fill(202,34,125);
//       this.rightBtnIsPressed = false;
//       // pop();
//     }else{
//       noFill();
//     }
//     strokeWeight(0.5);
//     stroke(0);
//     triangle(0,-this.btnSize/3*2,- this.btnSize/sqrt(3),this.btnSize/3,this.btnSize/sqrt(3),this.btnSize/3);
//     pop();
//   }
// }



