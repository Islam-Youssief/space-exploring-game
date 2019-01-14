


/**
* fire bullet  create the bullet and move it 5 sec and then remove the bullet and stop the interval
*/
let score = 0;
let posLeft = 0 ;
	let posTop =0;
  let rocksingame = document.getElementsByClassName('rock');
  let imgs = document.getElementsByTagName('img');
  let fires = [];
  for(let n =0;n<imgs.length;n++)
    {
      if(imgs[n].src.endsWith("syellow_laser.png")){
        fires.push(imgs[n]);
      }
    }
let FireBullet = function () {
	 //collisionDetectionFire();
	
	//console.log(this.posLeft);
  let bullet = document.createElement("img");
	bullet.src = "yellow_laser.png";
	document.getElementsByTagName('body')[0].appendChild(bullet);
	myMusic = new sound("sfx/laser_shoot.wav");
  myMusic.play();//play bullet sound 
  let pos = 0;
  let id = setInterval(fire, 5);
  	/**
	* fite function is resposeble for moving and removing the bullet
	*/
	function fire() {
    
         let Rtop ,
        Rleft,
        Rheight,
        Rwidth,
        firetop,
        fireleft,
        firehieght,
        firewidth;

        let len = rocksingame.length;
        console.log("collision function");
    
        firetop = bullet.offsetTop;
        fireleft = bullet.offsetLeft;
        firehieght = bullet.offsetHeight-10;
        firewidth = bullet.offsetWidth-10;
        if(len>0){
        // for (let x=0 ; x<len ;x++) {

          Rtop = rocksingame[0].offsetTop;
          Rleft = rocksingame[0].offsetLeft;
          Rheight = rocksingame[0].offsetHeight;
          Rwidth = rocksingame[0].offsetWidth;
        }
         
	    if (pos === posLeft+300) {
	      clearInterval(id);
	      document.getElementsByTagName('body')[0].removeChild(bullet);// remove bullet image dom
	      let audioObject = document.getElementsByTagName('audio'); 
	      let n;
	      for(n = 0;n<audioObject.length;n++)
	      {
	      	if(audioObject[n].src.endsWith("sfx/laser_shoot.wav")){
	      		document.getElementsByTagName('body')[0].removeChild(audioObject[n]);// remove audio from dom after being ended
	      	}
	      }
	    } 
      else {
  	      pos++; 
  	      bullet.style.left = pos + 'px';  
  	      bullet.style.top = posTop + 'px';  
      
          if((Rleft+Rwidth) > fireleft && Rleft < (fireleft+firewidth) && (Rtop+Rheight) > firetop && Rtop < (firetop+firehieght)){
              score = score +10;
              console.log(score);
              document.getElementsByTagName('body')[0].removeChild(rocksingame[0]);
              myMusic = new sound("sfx/explosion.wav");
              myMusic.play();//play bullet sound 
              console.log("Collision detected ");
              clearInterval(id);
              document.getElementsByTagName('body')[0].removeChild(bullet);// remove bullet image dom
              let audioObject = document.getElementsByTagName('audio'); 
              let n;
              for(n = 0;n<audioObject.length;n++)
              {
                if(audioObject[n].src.endsWith("sfx/laser_shoot.wav")){
                  document.getElementsByTagName('body')[0].removeChild(audioObject[n]);// remove audio from dom after being ended
                }
              }
              // call create rock object function
          }   
	    }
	  
  }
}

 //collisionDetectionFire();
 

/**
* create sound
*/
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}


let rock = function () {
    let elem = document.getElementById("rock");   
    let posh = 0;
    let posv =0;
    let id = setInterval(framel, 5);

    function framel() {
        if (posh == window.innerWidth-100) {
            clearInterval(id);
            //posh = 0;
            id = setInterval(framet, 5);
        } else {
            posh++; 
            elem.style.left = posh+ "px"; 
        }
    }
    function framet() {
        if (posv == innerHeight-100) {
            clearInterval(id);
            //posv = 0;
            id = setInterval(framer, 5);
        } else {
            posv++; 
            elem.style.top = posv + "px"; 
        }
    }
    function framer() {
        if (posh== 0) {
            clearInterval(id);
            //posh = 350;
            id = setInterval(frameb, 5);
        } else {
            posh--; 
            elem.style.left = posh+ "px"; 
        }
    }
    function frameb() {
        if (posv== 0) {
            clearInterval(id);
            //posv= 350;
            id = setInterval(framel, 5);
        } else {
            posv--; 
            elem.style.top = posv+ "px"; 
        }
    }
}


let rockobj = new rock;


/**
*on click space event,call create and fire bullet function
*/
window.addEventListener("keydown", function(e){
 if(e.key == ' ' || e.key==='Spacebar')
 {
 	  e.preventDefault();
 	  console.log(e.keyCode);
 	  let fire = new FireBullet;
 	  console.log(fire);
 }

 
});
