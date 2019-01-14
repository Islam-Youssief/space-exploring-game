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
let shoot = function () {
        let fireAngle = angle ;
        let shootFire = new FireShape(fireImageURL,fireAngle);

        explosionAudio.play();
        fireAudio.play();
        
    
        
        let firetopposition;
        let fireleftposition;
                                       //fire position control function                 
        let controlFire = function () {
            fireclass = document.querySelectorAll('.fire');
            let len = fireclass.length ;
            for ( let i=0 ;i<len ;i++) {   
                // console.log(fireclass[i]);
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


//====== Main Game Start Function ====

var gameStart;  //generating rocks interval 
function starGame () {
    startTheGame();                                     //for Rocket ship and fire
    gameStart = setInterval(generateRocks , 1000);      //for Rocks    
}

but.addEventListener('click',starGame);  //start game button







