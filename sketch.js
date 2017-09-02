var s;
var food;
var gamescreen=0,score=0;
function setup() {
       // Create the canvas
      createCanvas(800,600);
      frameRate(7);
      s=new snake();
      generateapple();
}
function draw(){
      if(gamescreen==0){
            startscreen();
      }
      if(gamescreen==1){
      
      background(236, 240, 241);
      showscore();
      s.update();
      s.show();
      fill(0,0,0);
      rect(food.x,food.y,20,20);
      if(s.detectcollision(food)){
            generateapple(0);
      }
      }
      if(gamescreen==3){
            gameoverscreen();
      }
}
function showscore(){
      textAlign(CENTER);
      fill(0);
      textSize(30);
      text(score,width/2,30);
}
function generateapple(){
      pos_x= random(0,40);
      pos_y= random(0,30);
      food=createVector(floor(pos_x)*20,floor(pos_y)*20);
}

function keyPressed(){
            if(gamescreen != 1){
                  gamescreen=1;
            }
            else{
                  if(keyCode === UP_ARROW){
                        s.dir(0,-1);
                  }
                  if(keyCode === DOWN_ARROW){
                        s.dir(0,1);
                  }
                   if(keyCode === LEFT_ARROW){
                        s.dir(-1,0);
                  }
                   if(keyCode === RIGHT_ARROW){
                        s.dir(1,0)
                  }
            }
            
      }
function startscreen(){
      background(236, 240, 241);
      textAlign(CENTER);
      fill(52, 73, 94);
      textSize(70);
      text("THE CLASSIC SNAKE", width/2, height/2);
      textSize(15); 
      text("press any button to start ", width/2, height-30);
}
function gameoverscreen(){
      background(236, 240, 241);
      textAlign(CENTER);
      fill(52, 73, 94);
      textSize(70);
      text(score, width/2, height/2);
      textSize(15); 
}
function snake(){
      this.total=0;
      this.blockx=[];
      this.blocky=[];
      
      this.x=0;
      this.y=0;
      this.xspeed=1;
      this.yspeed=0;
      this.update=function(){
            this.blockx[0]=this.x;
            this.blocky[0]=this.y;
            this.x=this.x+this.xspeed*20;
            this.y=this.y+this.yspeed*20;
            this.x=constrain(this.x,0,780);
            this.y=constrain(this.y,0,580);
      }

      this.show=function(){
            fill(44,62,80);
            stroke(236, 240, 241);
            rect(this.x,this.y,20,20);
            if(this.total>0){
                  for(i=this.total;i>=1;i--){
                        this.blockx[i]=this.blockx[i-1];
                        this.blocky[i]=this.blocky[i-1];
                  }
                        
                  for(i=1;i<=this.total;i++){
                        rect(this.blockx[i],this.blocky[i],20,20);
                        
                  }
            }
      }
      this.dir=function(x,y){
            this.xspeed=x;
            this.yspeed=y;
      }
      this.detectcollision=function(food){
      for(i=1;i<=this.total;i++)
      {
            if(this.blockx[i]==this.x&&this.blocky[i]==this.y)
            {
                  gamescreen=3;
            }
      }
      if(dist(this.x,this.y,food.x,food.y)<1){
            this.total=this.total+1;
            score++;
            return true;
      }
      else{
            return false;
      }
     }

}