var output = 0;
var temp = 0;
var nTemp = 0;
res=[];
splitted=[];
num = [];
names = [];
var ls = window.localStorage;

// Used to add dummy data to the local storage
function setDummy(name , score)
{
    for(var key in ls)
    {
        if(name === key)
        {   
            console.log("Name Exists , please choose another name");
            break;
        }    
        else  
            ls.setItem(name , score);
    }       
}

// Used to get the top player by sorting scores.
function getScore()
{   
    for(var key in ls)
    {
        if ( key == 'lenght' || key == 'key' ||key == 'getitem' ||
            key == 'setitem' || key == 'removeitem' || key == 'clear')
            break;
        else    
            res.push(key +':' +ls[key]);  
    }    
    for (var i=0;i<res.length;i++)
    {
       splitted.push(res[i].split(":"));
    }   
    for (var i=0;i<splitted.length;i++)
    {
        names.push(splitted[i][0]);
        num.push(parseInt(splitted[i][1]));
    }    
    length = num.length;  
    for(var i=0;i<num.length-1;i++)
    {   
        length--;
        for(var j=0;j<length;j++)
        {
            if(num[j] < num[j+1])
            {
                temp = num[j];
                num[j] = num[j+1]
                num[j+1] = temp;
                nTemp = names[j];
                names[j] = names[j+1]
                names[j+1] = nTemp;
            }
        }
    }   
    output = {[names[0]] : num[0]};
    return output;
}

var msg=document.getElementById('message');
var myPic =document.getElementsByClassName('image');

// showing badges according to the score
function show(score){
      var i=0;
      msg.innerHTML="Your Badges Are:";
      for (;i<myPic.length;i++){
          myPic[i].style.visibility='hidden';
          }
      if(score>=2000){
              myPic[0].style.visibility='visible';
              myPic[1].style.visibility='visible';
              myPic[2].style.visibility='visible';
      }else if(score>=1000){
            myPic[0].style.visibility='visible';
            myPic[1].style.visibility='visible';
      }else if(score>500){
            myPic[0].style.visibility='visible';
      }else{
            msg.innerHTML="You don't have any budget";
            for (;i<myPic.length;i++){
            myPic[i].style.visibility='hidden';
            }
      }

}

output = getScore();
var playerName = Object.keys(output)[0];
var score = Object.values(output)[0];
var name=document.getElementById('caption').innerHTML=playerName;
show(score);
/*
// Test cases :
show(200);
show(500);
show(1000);
show(1500);
show(200);
show(2000);
show(2500);
show(0);
show(-5);
*/