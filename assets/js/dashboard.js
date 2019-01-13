var output = 0;
var temp = 0;
var nTemp = 0;
var res=[];
var splitted=[];
var num = [];
var names = [];
var ls = window.localStorage;

function display()
{
 if (num.length > 0) {
      for(let n = 0 ; n < num.length ; n++)
      {
        document.getElementById(`n${n+1}`).innerHTML = names[n];
        document.getElementById(`s${n+1}`).innerHTML = num[n];
      }
 } 
}

function getScore()
{
   if (ls.length === 0) {
       ls.clear();
       return;
   }
    for(let key in ls)
    {
        if ( key == 'lenght' || key == 'key' ||key == 'getitem' ||
            key == 'setitem' || key == 'removeitem' || key == 'clear')
            break;
        else    
            res.push(key +':' +ls[key]);
    }
            console.log({res});

    for (let i=0 ;i<res.length;i++)
    {
       splitted.push(res[i].split(":"));
    }
    console.log({splitted});
    for (let i=0 ; i<splitted.length;i++)
    {
        names.push(splitted[i][0]);
        num.push(parseInt(splitted[i][1]));
    }
    console.log({num});
    console.log({names});
    let nlength = num.length;
    for(let i=0;i<num.length -1;i++)
    {
        nlength--;
        for(let j=0;j<nlength;j++)
        {
            if(num[j] < num[j+1])  //sorting for high score 
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
    display();
}



getScore();
