/*
There are 2 divs :
one for choosing the space ship and entering user name
The second one is to get the div of the game itself
*/
const divchoose = document.getElementById('choose');
const divgame = document.getElementById('main_game');
//==============================================================
// global variables for the game
let userRocket = null; 
var level = 1 ;
var RocksNumber = 0;
var rocksMaximum = level * 8;
var lives = 5 ;
var score = 0 ;
// Represents the stored score in local storage
var totalScore = 0;
let currentPlayer;
let rocketimageURL;
// for the ship rotation
let angle = 0;
// shootFire position
let posleft=0;
let postop=0;
//==========  general sounds & photo  =================
const explosionAudio = document.getElementById('explosion');
const fireAudio = document.getElementById('shipfire');
let fireImageURL = "./assets/images/fire/bullet.png"
//=========== DOM elements from html  =================
const container = document.getElementById('container');  //main game container
const Levels = document.querySelectorAll('.stage');     //level completed 3
const levelScore = document.querySelectorAll('.div1'); //level score 3
const butscore = document.getElementsByClassName('btn-lg')[1];
const butlives = document.getElementsByClassName('btn-lg')[2];
const butstartOver1 = document.getElementsByClassName('btn-lg')[3];
const butstartOver2 = document.getElementsByClassName('btn-lg')[4];
butstartOver1.style.display ='none';
butstartOver2.style.display ='none';
const badgeBo = document.querySelector('.badge');
const badge1 = document.getElementById('badge1');
const badge2 = document.getElementById('badge2');
const badge3 = document.getElementById('badge3');
const but = document.getElementsByClassName('btn-lg')[0];
const butchoose = document.getElementById("start");

// pressing on the ready button
butchoose.addEventListener("click", function(e) 
{
    currentPlayer = document.getElementById("username").value;
    if(document.getElementById("img1").checked)
        rocketimageURL = document.getElementById("img1").value;
    else
        rocketimageURL = document.getElementById("img2").value;

    divchoose.style.display="none";
    divgame.style.display="block";
});

//================= set items in local storage =======
function updateStorage () {
    localStorage.setItem(`${currentPlayer}`,totalScore);
}

// ========== initializations ===============
butlives.innerHTML=`Lives ${lives}`;
butscore.innerHTML = `Score ${score}` ;

//=======levels & score progress=========
function moveToLevel (levelNum) {
    level_Score = levelScore [levelNum - 1];
    if (levelNum === 2)
    { 
        Levels[0].classList.add('completed');
        levelScore[0].style.width ='100%';
    }   
    if (levelNum === 3 ) 
    {
        Levels[1].classList.add('completed');
        levelScore[1].style.width ='100%';
    }
}

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
// Rocks movement
    move () {

        let moveClass;
        switch (this.num) {
            case 0 :
                    this.div.innerHTML = "<img src ='assets/images/plantes/2.png'>";
                    moveClass = setInterval (()=> {
                        this.div.style.left =`${this.pos[1] ++ % 95}%`;
                        this.div.style.top =`${this.pos[0] ++ % 95}%`;
                    },200)
                    break;
            case 1 :
                    this.div.innerHTML = "<img src ='assets/images/plantes/1.png'>";
                    moveClass = setInterval (()=> {
                        this.div.style.left =`${(this.pos[1] -- === 0)? this.pos[1]= 95 : this.pos[1]  % 95}%`;
                        this.div.style.top =`${(this.pos[0] -- === 0)? this.pos[0]= 95 : this.pos[0]  % 95}%`;
                    },300)
                    break;
            case 2 :
                    this.div.innerHTML = "<img src ='assets/images/plantes/asteroid_blend.png'>";
                    moveClass = setInterval (()=> {
                        this.div.style.left =`${this.pos[1] ++ % 95}%`;
                        this.div.style.top =`${this.pos[0] ++ % 95}%`;
                    },500)
                    break;

            case 3 :
                    this.div.innerHTML = "<img src ='assets/images/plantes/3.png'>";
                    moveClass = setInterval (()=> {
                        this.div.style.left =`${this.pos[1] ++ % 95}%`;
                        this.div.style.top =`${(this.pos[0] +=.1) % 95}%`;
                    },200)
                    break;
            case 4 :
                    this.div.innerHTML = "<img src ='assets/images/plantes/4.png'>";
                    moveClass = setInterval (()=> {
                        this.div.style.left = `${(this.pos[1] -- === 0)? this.pos[1]= 95 : this.pos[1]  % 95}%`;
                        this.div.style.top =`${(this.pos[0] +=.2) % 95}%`;
                    },200)
                    break;
            case 5 :
                    this.div.innerHTML = "<img src ='assets/images/plantes/5.png'>";
                    moveClass = setInterval (()=> {
                        this.div.style.top =`${this.pos[0] ++ % 95}%`;
                        this.div.style.left =`${(this.pos[1] +=.2) % 95}%`;
                    },200)
                    break;
            case 6 :
                    this.div.innerHTML = "<img src ='assets/images/plantes/6.png'>";
                    moveClass = setInterval (()=> {
                        this.div.style.top =`${(this.pos[0] -- === 0)? this.pos[0]= 95 : this.pos[0]  % 95}%`;
                        this.div.style.left =`${(this.pos[1] +=.2) % 95}%`;
                    },200)
                    break;
            case 7 :
                    this.div.innerHTML = "<img src ='assets/images/plantes/7.png'>";
                    moveClass = setInterval (()=> {
                        this.div.style.top =`${this.pos[0] ++ % 95}%`;
                        this.div.style.left =`${(this.pos[1] +=.5) % 95}%`;
                    },200)
                    break;
            case 8 :
                    this.div.innerHTML = "<img src ='assets/images/plantes/8.png'>";
                    moveClass = setInterval (()=> {
                        this.div.style.top =`${(this.pos[0] +=2) % 95}%`;
                        this.div.style.left =`${this.pos[1] ++ % 95}%`;
                    },100)
                    break;
            case 9 :
                    this.div.innerHTML = "<img src ='assets/images/plantes/9.png'>";
                    moveClass = setInterval (()=> {
                        this.div.style.top =`${(this.pos[0] +=.5) % 95}%`;
                        this.div.style.left =`${this.pos[1] ++ % 95}%`;
                    },100)
                    break;
            case 10 :
                    this.div.innerHTML = "<img src ='assets/images/plantes/10.png'>";
                    moveClass = setInterval (()=> {
                        this.div.style.top =`${this.pos[0] ++ % 95}%`;
                        this.div.style.left =`${(this.pos[1] +=2) % 95}%`;
                    },100)
                    break;
            default :
                this.div.innerHTML = "<img src ='assets/images/plantes/2.png'>";
                moveClass = setInterval (()=> {
                    this.div.style.left =`${(this.pos[1] -- === 0)? this.pos[1]= 95 : this.pos[1]  % 95}%`;
                    this.div.style.top =`${this.pos[0] ++ % 95}%`;
                },100)
        }
    }
};

//================ main helping functions =================

//generate random top and left for the starting rock position

function randomPos () {
    let posTop = Math.floor(Math.random()* (95-20) +10);
    let posLeft = Math.floor(Math.random()* (95-20) +10);

    if ((posTop > 30 && posTop < 70) || (posLeft > 30 && posLeft < 70) ) {
        return randomPos ();

    } 
    return [posTop ,posLeft];
}
// generate random numbers=
function randomNum (num) {
    return Math.floor(Math.random()* num * 4);
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

// var used to check if fire interval is set or not
var fireInterval ;   
// shooting function  
let shoot = function () {
        let fireAngle = angle ;
        let shootFire = new FireShape(fireImageURL,fireAngle);
        explosionAudio.play();
        fireAudio.play();
        let firetopposition;
        let fireleftposition;
        
        // fire position control function                 
        let controlFire = function () {
            fireclass = document.querySelectorAll('.fire');
            let len = fireclass.length ;
            for ( let i=0 ;i<len ;i++) {   
                firetopposition = parseInt(fireclass[i].style.top) ; 
                fireleftposition = parseInt(fireclass[i].style.left) ;
            if (fireleftposition >97 || firetopposition >97 || fireleftposition < 3 || firetopposition < 3) {
                container.removeChild (fireclass[i]);
            } 

            else {
                switch(parseInt(fireclass[i].dataset.angle))
                {
                    case 30:
                    case -330: 
                        fireclass[i].style.top = `${(firetopposition -= (2*0.866025)) }%`;
                        fireclass[i].style.left= `${(fireleftposition += (2 * .5)) }%`;
                        break;
            
                    case 60:
                    case -300: //cond 
                        fireclass[i].style.top = `${(firetopposition -= (2 * .5))}%`;
                        fireclass[i].style.left= `${(fireleftposition += (2*0.866025) ) }%`;
                        break;
                    
                    case 90:
                    case -270://cond
                        fireclass[i].style.left = `${(fireleftposition += 1.5) }%`;
                        break;
                    
                    case 120:
                    case -240: //cond
                        fireclass[i].style.top = `${(firetopposition += (2 * .5))}%`;
                        fireclass[i].style.left= `${(fireleftposition += (2*0.866025)) }%`;
                        break;

                    case 150:
                    case-210://cond
                        fireclass[i].style.top = `${(firetopposition += (2.5))}%`;
                        fireclass[i].style.left= `${(fireleftposition += (2 * .5)) }%`;   
                        break;
                    
                    case 180:
                    case -180: //conf
                        fireclass[i].style.top = `${(firetopposition += 1.5)}%`;    
                        break;
                
                    case 210:
                    case -150://cond
                        fireclass[i].style.top = `${(firetopposition += 2.5)}%`;
                        fireclass[i].style.left= `${(fireleftposition -= (2 * .4 )) }%`;
                        break;

                    case 240://cond
                    case -120:
                        fireclass[i].style.top = `${(firetopposition += (2 * .5))}%`;
                        fireclass[i].style.left= `${(fireleftposition -= (2*0.866025)) }%`;
                        break;
                    
                    case 270:
                    case -90://cond
                    fireclass[i].style.left = `${(fireleftposition -= 1.5) }%`;
                        break;
                    
                    case 300:
                    case -60:
                        fireclass[i].style.top = `${(firetopposition -= (2 * .5))}%`;
                        fireclass[i].style.left= `${(fireleftposition -= (2*0.866025)) }%`;
                        break;

                    case 330:
                    case -30:
                        fireclass[i].style.top = `${(firetopposition -= (2*0.866025))}%`;
                        fireclass[i].style.left= `${(fireleftposition -= (2 * .5)) }%`;
                        break
                
                    case 0:
                    case 360:
                      fireclass[i].style.top = `${firetopposition -= 1.5}%`;
                        break;
                
                }
            }} 
        };
       if (!fireInterval) {
        fireInterval = setInterval(controlFire, 50);
        }
    
};


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
//************************************************************************
// generate rock div and append them to the main game container 

function generateRocks () {
    // check the maximum number of rocks depending on level
    if (RocksNumber < rocksMaximum ) {  
        let num = randomNum (level);
        let randompos1 = randomPos ();  
        let newRock = new Rock ( randompos1 , num );
        container.appendChild(newRock.div);
        moveToLevel(level);
        newRock.move();
        collisionDetection();
        RocksNumber++ ;
    }
}

//============== collision Control part ========= 


function collisionDetection() {
    // array for collecting rock nodes 
    var rocksingame = document.getElementsByClassName('rock'); 
    // array for collecting fire nodes
    var fireclass = document.querySelectorAll('.fire');

    // variables for rocket,fire,rocks position detection
    let Rocktop ,Rockleft,Rockheight,Rockwidth,shiptop,shipleft,shipheight,
        shipwidth,fireTop,fireLeft,fireHeight,fireWidth;

    let lenRock = rocksingame.length;
    let lenFire = fireclass.length;
    for (let i=0 ; i<lenRock ; i++) {
        shiptop = userRocket.rocket.offsetTop;
        shipleft = userRocket.rocket.offsetLeft;
        shipheight = userRocket.rocket.offsetHeight-10;
        shipwidth = userRocket.rocket.offsetWidth-10;

        Rocktop = rocksingame[i].offsetTop;
        Rockleft = rocksingame[i].offsetLeft;
        Rockheight = rocksingame[i].offsetHeight;
        Rockwidth = rocksingame[i].offsetWidth;
        
        // fire collisions with rocks conditions => increase score
        for (let j=0 ; j<lenFire ; j++) {
            fireTop = fireclass[j].offsetTop;
            fireLeft = fireclass[j].offsetLeft;
            fireHeight = fireclass[j].offsetHeight;
            fireWidth = fireclass[j].offsetWidth;
            
            if((Rockleft+Rockwidth) > fireLeft && Rockleft < (fireLeft+fireWidth) && 
            (Rocktop+Rockheight) > fireTop && Rocktop < (fireTop+fireHeight)) {
                //collision fire with rocks
                fireAudio.pause();
                explosionAudio.play();
                rocksingame[i].classList.add('vanish');
                fireclass[j].classList.add('vanish');
                container.removeChild(rocksingame[i]);
                container.removeChild(fireclass[j]);
                RocksNumber --;
                score += 10;
                totalScore += 10;
                console.log('score added');
                console.log('totalscore');
                
                if(level === 1)
                    level_Score.style.width = `${score *0.2}%`;
                if(level === 2)
                    level_Score.style.width = `${score *0.2}%`;
                if(level === 3)
                  level_Score.style.width = `${score *0.1}%`;  
                
                if (totalScore === 500 ) {
                    score = 0 ;
                    level = 2;
                    rocksMaximum *= level;
                    badge1.style.display = 'block';
                    alert ('level 1 completed Press to continue');
                }
                if (totalScore === 1000) {
                    score = 0;
                    level = 3;
                    rocksMaximum *= level ;
                    badge2.style.display = 'block';
                    alert ('level 2 completed Press to continue');
                }
                if (totalScore === 2000) {
                    badge3.style.display = 'block';
                    container.innerHTML = '<p> Congratulations  <span>M</span>aster of the <span>G</span>ame </p>';
                    clearInterval (gameStart);
                    updateStorage();
                    but.removeEventListener('click',starGame);
                    butlives.style.display = 'none';
                    butstartOver1.style.display ='block';
                    butstartOver2.style.display ='block';
                    alert ('level 3 completed  You Mastered The Game Press to continue');
                }
                butscore.innerHTML = `Score ${totalScore}` ;
            }
        }
        // ship collision with rocks conditions => reduce lifes
        if((Rockleft+Rockwidth) > shipleft && Rockleft < (shipleft+shipwidth) &&
             (Rocktop+Rockheight) > shiptop && Rocktop < (shiptop+shipheight)) {
			// Do anything you want in the program when collision is detected
            rocksingame[i].classList.add('vanish');
            container.removeChild(rocksingame[i]);
            RocksNumber --;
            fireAudio.pause();
            explosionAudio.play();
            lives --;
            butlives.innerHTML = `Lives ${lives}`;

            if (lives === 0) {
                container.innerHTML = '<p> Game  <span>O</span>ver </p>';
                clearInterval (gameStart);
                updateStorage();
                alert('Game over');
                but.removeEventListener('click',starGame);
                butlives.style.display = 'none';
                butstartOver1.style.display ='block';
                butstartOver2.style.display ='block';
            }
        }
    }
    window.requestAnimationFrame(collisionDetection);
}

//======================= Main Game Start Function =========================
var gameStart;  //generating rocks interval 
function starGame () {
    startTheGame(); 
    gameStart = setInterval(generateRocks , 1000); //for Rocks ship and fire
}
but.addEventListener('click',starGame);  //start game button
