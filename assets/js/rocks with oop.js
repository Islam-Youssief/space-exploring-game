const divchoose = document.getElementById('choose');
const divgame = document.getElementById('main_game');

//================ ship movement = Rocks = fire= main classes===============================

class Rocket {
    constructor(src) {
        this.rocket = document.createElement("img");
        this.rocket.setAttribute('id','rocket');
        this.rocket.src = src;
        this.rocket.style.position = "absolute";
        this.rocket.style.top = `${40}%`;
        this.rocket.style.left = `${40}%`;
        this.rocket.style.width="10%";
        this.rocket.style.height="15%";
        container.appendChild(this.rocket);
    }
}

class FireShape {
    constructor(src,angle) {
        
        this.fireShape = document.createElement("img");
        this.fireShape.setAttribute('class','fire');
        this.fireShape.dataset.angle =angle;
        this.fireShape.src = src;
        this.fireShape.style.position = "absolute";
        this.fireShape.style.top =`${postop }%`;
        this.fireShape.style.left =`${posleft}%`;
        this.fireShape.style.width = `2%`;
        this.fireShape.style.height = `2%`;
        container.appendChild(this.fireShape);   
    }
}
//Rock class to generate 'rocks in div' with random position and random number for movement 

class Rock { 
    
    constructor(pos,num) {
        this.div = document.createElement('div');
        this.pos = pos;
        this.div.style.top = `${pos[0]}%`;
        this.div.style.left = `${pos[1]}%`;
        this.div.setAttribute ('class','rock');
        this.div.dataset.rocknum = num;
        this.num = num ;
    } 
 }
//========= Movements and controls======

let keyPressed = [];
let keyPress = function (event) {
    keyPressed[event.code] = true; 
    if (keyPressed["Space"]) {
        event.preventDefault();}

};
let keyReleased = function (event) {
    event.preventDefault();
    keyPressed[event.code] = false;
};

document.addEventListener("keydown", keyPress);
document.addEventListener("keyup", keyReleased);


var fireInterval ;   //for check if fire interval is set or not
                     // shooting function  
// generate main rocket shape and fire shape 

let startTheGame = function() 
{
    userRocket = new Rocket(rocketimageURL);
    let controlMovement = function ()
    {
        let leftposition = parseInt(userRocket.rocket.style.left) ;
        let topposition  = parseInt(userRocket.rocket.style.top) ;
        const RocketWidth = parseInt(userRocket.rocket.style.width) ;
        const RocketHeight = parseInt(userRocket.rocket.style.height) ;
        
        if (keyPressed["ArrowRight"])
        {
            angle = angle +30;
            userRocket.rocket.style.transform= `rotate(${angle}deg)`;
            if (angle == 360) 
                angle = 0;
        }
        if (keyPressed["ArrowLeft"]) {
            angle = angle -30;
            userRocket.rocket.style.transform= `rotate(${angle}deg)`;
            if (angle == -360)  
                angle = 0;
        }
        if (keyPressed["ArrowDown"]) {
            switch(angle)
            {
                case -330: 
                case 30 :
                    userRocket.rocket.style.left = `${((leftposition -= (2 * 0.5)) < 0)? leftposition= 90 : leftposition %90}%`;
                    userRocket.rocket.style.top = `${(topposition += (2 * 0.866025) ) % 90}%`;
                    break;
    
                case -300:
                case 60 :
                    userRocket.rocket.style.left = `${((leftposition -= (2 * 0.5 )) < 0)? leftposition= 90 : leftposition %90}%`;
                    userRocket.rocket.style.top = `${(topposition += (2 * 0.866025) ) % 90}%`;
                    break;
                
                case -270:
                case 90:
                        userRocket.rocket.style.left = `${(leftposition -= 1.5) % 90}%`;
                    break;

                case -240:
                case 120 :
                    userRocket.rocket.style.left = `${((leftposition -= (2*0.866025)) < 0)? leftposition= 90 : leftposition %90}%`;
                    userRocket.rocket.style.top = `${((topposition -= (2*.5)) < 0)? topposition= 85 : topposition %85}%`;
                    break;

                case-210:
                case 150 :
                    userRocket.rocket.style.left = `${((leftposition -= (2*.5)) < 0)? leftposition= 90 : leftposition %90}%`;
                    userRocket.rocket.style.top = `${((topposition -= (2*0.866025) ) < 0)? topposition= 85 : topposition %85}%`;
                    break;
                    
                case -180:
                case 180 :
                    userRocket.rocket.style.top = `${(topposition -= 1.5) % 90}%`;
                    break;
             
                case -150:
                case 210 :
                    userRocket.rocket.style.left = `${(leftposition += (2*.5)) % 90}%`;
                    userRocket.rocket.style.top = `${((topposition -= (2*0.866025)) < 0)? topposition= 85 : topposition %85}%`; 
                    break;

                case -120:
                case 240 :
                    userRocket.rocket.style.left = `${(leftposition += (2*0.866025)) % 90}%`;
                    userRocket.rocket.style.top = `${((topposition -= (2*.5)) < 0)? topposition= 85 : topposition %85}%`;
                    break;
                
                case -90:
                case 270 :
                        userRocket.rocket.style.left = `${((leftposition += 1.5) < 0)? leftposition= 90 : leftposition %90}%`;
                    break;
                
                case -60:
                case 300 :
                    userRocket.rocket.style.left = `${(leftposition += (2*0.866025) ) % 90}%`;
                    userRocket.rocket.style.top = `${(topposition += (2*.5) ) % 90}%`; 
                    break;    
                 
                 case -30:
                 case 330 :
                    userRocket.rocket.style.left = `${(leftposition += (2*.5)) % 90}%`;
                    userRocket.rocket.style.top = `${(topposition += (2*0.866025)) % 90}%`; 
                    break
             
                case 0:
                case 360 :
                    userRocket.rocket.style.top = `${((topposition += 1.5) < 0)? topposition= 85 : topposition %85}%`;               
                    break;
            }
        }
        if (keyPressed["ArrowUp"]) 
        {
            switch(angle)
            {
                case 30:
                case -330: 
                    userRocket.rocket.style.left = `${(leftposition += (3*.5)) % 90}%`;
                    userRocket.rocket.style.top = `${((topposition -= (3*0.866025)) < 0)? topposition= 85 : topposition %85}%`;    
                    break;
    
                case 60:
                case -300:
                    userRocket.rocket.style.left = `${(leftposition += (3*0.866025)) % 90}%`;
                    userRocket.rocket.style.top = `${((topposition -= (3*.5)) < 0)? topposition= 85 : topposition %85}%`;
                    break;
                
                case 90:
                case -270:
                    userRocket.rocket.style.left = `${(leftposition += 3) % 90}%`;
                    break;
                
                case 120:
                case -240:
                    userRocket.rocket.style.left = `${(leftposition += (3*0.866025)) % 90}%`;
                    userRocket.rocket.style.top = `${(topposition += (3*.5)) % 85}%`;
                    break;

                case 150:
                case-210:
                    userRocket.rocket.style.left = `${(leftposition += (3*.5)) % 90}%`;
                    userRocket.rocket.style.top = `${(topposition += (3*0.866025)) % 90}%`;                
                break;
                
                case 180:
                case -180:
                    userRocket.rocket.style.top = `${(topposition += 3) % 90}%`;
                    break;
             
                case 210:
                case -150:
                    userRocket.rocket.style.left = `${((leftposition -= (3*.5)) < 0)? leftposition= 90 : leftposition %90}%`;
                    userRocket.rocket.style.top = `${(topposition += (3*0.866025)) % 85}%`;
                    break;

                case 240:
                case -120:
                    userRocket.rocket.style.left = `${((leftposition -= (3*0.866025)) < 0)? leftposition= 90 : leftposition %90}%`;
                    userRocket.rocket.style.top = `${(topposition += (3*.5)) % 85}%`;
                    break;
                
                case 270:
                case -90:
                    userRocket.rocket.style.left = `${((leftposition -= 3) < 0)? leftposition= 90 : leftposition %90}%`;                
                    break;
                
                case 300:
                case -60:
                    userRocket.rocket.style.left = `${((leftposition -= (3*0.866025)) < 0)? leftposition= 90 : leftposition %90}%`;
                    userRocket.rocket.style.top = `${((topposition -= (3*.5)) < 0)? topposition= 85 : topposition %85}%`;
                    break;

                case 330:
                case -30:
                    userRocket.rocket.style.left = `${((leftposition -= (3*.5)) < 0)? leftposition= 90 : leftposition %90}%`;
                    userRocket.rocket.style.top = `${((topposition -= (3*0.866025)) < 0)? topposition= 85 : topposition %85}%`;
                    break;
             
                case 0:
                case 360 : 
                    userRocket.rocket.style.top = `${((topposition -= 3) < 0)? topposition= 85 : topposition %85}%`;
                    break;            
            }
           
        }
        switch (angle) { // used to locate the position of the shooting fire
            case 30:
            case -330 :
                posleft = leftposition + (0.4 * RocketHeight);
                postop  = topposition +( 0.2 * RocketWidth);
                break;
            case 60:
            case -300:
                posleft = leftposition +(.5 * RocketHeight);
                postop  = topposition +( 0.4 * RocketWidth);
                break;

            case 90:
            case -270:
                posleft = leftposition +(.5 * RocketHeight);
                postop  = topposition +( 0.65 * RocketWidth);
                break;
            case 120:
            case -240:
                posleft = leftposition +(.5 * RocketHeight);
                postop  = topposition +(.65 * RocketHeight);
                break;
            case 150:
            case-210:
                posleft = leftposition +(.4 * RocketHeight);
                postop  = topposition +(.7 * RocketHeight);
                break;
            case 180:
            case -180:
                posleft = leftposition +( 0.4 * RocketWidth);
                postop  = topposition +(.8 * RocketHeight);
                break;
            case 210:
            case -150:
                posleft = leftposition +( 0.3 * RocketWidth);
                postop  = topposition +(.6 * RocketHeight);
                break;
            case 240:
            case -120:
               posleft = leftposition +( 0.3 * RocketWidth);
                postop  = topposition +(.55 * RocketHeight);
                break;
            case 270:
            case -90:
                posleft = leftposition +( 0.2 * RocketWidth);
                postop  = topposition +( 0.65 * RocketWidth);
                break;
            case 300:
            case -60:
                posleft = leftposition +( 0.15 * RocketWidth);
                postop  = topposition +( 0.4 * RocketWidth);
                break;
            case 330:
            case -30:
                posleft = leftposition +( 0.2 * RocketWidth);
                postop  = topposition +( 0.25 * RocketWidth);
                break;
            case 0 :
            case 360 :
                posleft = leftposition +( 0.4 * RocketWidth);
                postop  = topposition +( 0.2 * RocketWidth);
                break;
        }
        
        
    };
 
    setInterval(() => {
        if (keyPressed["Space"]) shoot();
    }, 30);
    setInterval(controlMovement, 40);
};

//====== Main Game Start Function ====

var gameStart;  //generating rocks interval 
function starGame () {
    startTheGame();                                     //for Rocket ship and fire
    gameStart = setInterval(generateRocks , 1000);      //for Rocks    
}

but.addEventListener('click',starGame);  //start game button







