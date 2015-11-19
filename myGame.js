var canvas;
var context;
var isWhite = true;//设置是否该轮到白棋
var isWell = false;//设置该局棋盘是否赢了，如果赢了就不能再走了
//var isHere=false;
var img_b = new Image();
img_b.src = "images/b.png";//白棋图片
var img_w = new Image();
img_w.src = "images/w.png";//黑棋图片
var count1;
var count2;
var count3;
var count4;
var white=1;
var black=2;
var Huo=[0.25,0.4,0.6,0.8,1];
var Si=[0.1,0.2,0.3,0.4,0.5];
var little=10;
var big = 100;
var fourBig=1000;
//var blackLocation=new Array(2);
var chessData = new Array(16);//这个为棋盘的二维数组用来保存棋盘信息，初始化0为没有走过的，1为白棋走的，2为黑棋走的
for (var x = 0; x < 16; x++) {
    chessData[x] = new Array(16);
    for (var y = 0; y < 16; y++) {
        chessData[x][y] = 0;
    }
}

function abc(){
   alert("nihao");
}

function drawRect() {//页面加载完毕调用函数，初始化棋盘
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    for (var i = 0; i <= 640; i += 40) {//绘制棋盘的线
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(640, i);
        context.closePath();
        context.stroke();

        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, 640);
        context.closePath();
        context.stroke();
    }
}


function play(e) {//鼠标点击时发生
    var x = parseInt((e.offsetX - 20) / 40);//计算鼠标点击的区域，如果点击了（65，65），那么就是点击了（1，1）的位置
    var y = parseInt((e.offsetY - 20) / 40);

    if (chessData[x][y] != 0) {//判断该位置是否被下过了
        alert("你不能在这个位置下棋");
        return;
    }
    drawWhiteChess(x,y);
    judge(x,y,white);
    var blackLocation=searchBlackLocation(black,white);
    drawBlackChess(blackLocation[0],blackLocation[1]);
    judge(blackLocation[0],blackLocation[1],black);
}


function drawWhiteChess( x, y) {//参数为，棋（1为白棋，2为黑棋），数组位置
    if (isWell == true) {
        alert("已经结束了，如果需要重新玩，请刷新");
        return;
    }
    if (x >= 0 && x < 15 && y >= 0 && y < 15) {
            context.drawImage(img_w, x * 40 + 20, y * 40 + 20);//绘制白棋
            chessData[x][y] = white;

    }
}


function drawBlackChess(x,y) {
    if (isWell == true) {
        alert("已经结束了，如果需要重新玩，请刷新");
        return;
    }
    if (x >= 0 && x < 15 && y >= 0 && y < 15) {
        context.drawImage(img_b, x * 40 + 20, y * 40 + 20);//绘制白棋
        chessData[x][y] = black;
    }
}


//计算左右方向的权值
function calculateLeftToRightDirection(x,y,chess) {
    var leftHuoFive = 0;
    var leftHuoFour = 0;
    var leftSiFour = 0;
    var leftHuoThree = 0;
    var leftSiThree = 0;
    var leftHuoTwo = 0;
    var leftSiTwo = 0;
    var leftHuoOne = 0;
    var leftSiOne=0;
    var leftScore = 0

    var rightHuoFive = 0;
    var rightHuoFour = 0;
    var rightSiFour = 0;
    var rightHuoThree = 0;
    var rightSiThree = 0;
    var rightHuoTwo = 0;
    var rightSiTwo = 0;
    var rightHuoOne = 0;
    var rightSiOne=0;
    var rightScore = 0;

    var leftCount = 0;
    var rightCount = 0;

    var leftUpCount = 0;
    var leftDownCount = 0;
    var rightUpCount = 0;
    var rightDownCount = 0;


    if(chessData[x][y]!=0)
    {
        return -1;
    }
    var i=0;
    for (i = x - 1; i >= 0; i--) {
        if (chessData[i][y] != chess) {
            break;
        }
        leftCount++;
    }
if(i==-1 || chessData[i][y] != 0){
    switch (leftCount) {
        case 1:
            leftSiOne = 1*Si[0];
            break;
        case 2:
            leftSiTwo = 2*Si[1];
            break;
        case 3:
            leftSiThree = 3*Si[2];
            break;
        case 4:
            leftSiFour = 4*Si[3]+fourBig;
            break;
    }
}
else{
        switch (leftCount) {
            case 1:
                leftHuoOne = 1*Huo[0];
                break;
            case 2:
                leftHuoTwo = 2*Huo[1];
                break;
            case 3:
                leftHuoThree = 3*Huo[2]+little;
                break;
            case 4:
                leftHuoFour = 4*Huo[3]+fourBig;
                break;
            case 5:
                leftHuoFive = 5*Huo[4];
                break;
        }
    }


    for (i = x + 1; i < 15; i++)
        {
            if (chessData[i][y] != chess)
            {
               break;
            }
            rightCount++;
        }
if (chessData[i][y] == 0) {
    switch (rightCount) {
        case 1:
            rightHuoOne = 1 * Huo[0];
            break;
        case 2:
            rightHuoTwo = 2 * Huo[1];
            break;
        case 3:
            rightHuoThree = 3 * Huo[2] + little;
            break;
        case 4:
            rightHuoFour = 4 * Huo[3] + fourBig;
            break;
        case 5:
            rightHuoFive = 5 * Huo[4];
            break;
    }

}
else
{
    switch (rightCount)
    {
        case 1:
            rightSiOne = 1*Si[0];
            break;
        case 2:
            rightSiTwo = 2*Si[1];
            break;
        case 3:
            rightSiThree=3*Si[2];
            break;
        case 4:
            rightSiFour = 4*Si[3]+big;
            break;
        case 5:
            rightHuoFive = 5*Si[4];
            break;
     }
}
    if(leftHuoOne==1*Huo[0])
    {
        if(rightHuoTwo==2*Huo[1])
        {
            leftHuoOne+=big;
            rightHuoTwo+=big;
        }
        if(rightHuoThree==3*Huo[2]+little)
        {
            leftHuoOne+=big;
            rightHuoThree+=big;
        }
        if(rightSiThree==3*Si[2])
        {
            leftHuoOne+=big;
            rightSiThree+=big;
        }
    }
    if(leftSiOne==1*Si[0])
    {
        if(rightHuoThree==3*Huo[2]+little)
        {
            leftSiOne+=big;
            rightHuoThree+=big;
        }
        if(rightSiThree==3*Si[2])
        {
            leftSiOne+=big;
            rightSiThree+=big;
        }
    }
    if(leftHuoTwo==2*Huo[1])
    {
        if(rightHuoOne==1*Huo[0])
        {
            leftHuoTwo+=big;
            rightHuoOne+=big;
        }
        if(rightHuoTwo==2*Huo[1])
        {
            leftHuoTwo+=big;
            rightHuoTwo+=big;
        }
        if(rightSiTwo==2*Si[1])
        {
            leftHuoTwo+=big;
            rightSiTwo+=big;
        }
    }
    if(leftSiTwo==2*Si[1])
    {
        if(rightHuoTwo==2*Huo[1])
        {
            leftSiTwo+=big;
            rightHuoTwo+=big;
        }
        if(rightSiTwo==2*Si[1])
        {
            leftSiTwo+=big;
            rightSiTwo+=big;
        }
    }
    if(leftHuoThree==3*Huo[2]+little)
    {
        if(rightHuoOne==1*Huo[0])
        {
            leftHuoThree+=big;
            rightHuoOne+=big;
        }
        if(rightSiOne==1*Si[0])
        {
            leftHuoThree+=big;
            rightSiOne+=big;
        }
    }
    if(leftSiThree==3*Si[2])
    {
        if(rightHuoOne==1*Huo[0])
        {
            leftSiThree+=big;
            rightHuoOne+=big;
        }
        if(rightSiOne==1*Si[0])
        {
            leftSiThree+=big;
            rightSiOne+=big;
        }
    }
    leftScore = leftSiOne+leftHuoOne + leftHuoTwo + leftSiTwo + leftHuoThree + leftSiThree + leftHuoFour + leftSiFour + leftHuoFive;

    rightScore = rightHuoOne+rightHuoFive + rightHuoFour + rightHuoThree + rightHuoTwo + rightSiFour + rightSiThree + rightSiTwo + rightSiOne;
        return leftScore + rightScore;
}

//计算上下方向的权值
function calculateUpToDownDirection(x,y,chess){
    var upHuoFive = 0;
    var upHuoFour = 0;
    var upSiFour = 0;
    var upHuoThree = 0;
    var upSiThree = 0;
    var upHuoTwo = 0;
    var upSiTwo = 0;
    var upHuoOne = 0;
    var upSiOne=0;
    var upScore = 0

    var downHuoFive = 0;
    var downHuoFour = 0;
    var downSiFour = 0;
    var downHuoThree = 0;
    var downSiThree = 0;
    var downHuoTwo = 0;
    var downSiTwo = 0;
    var downHuoOne=0;
    var downSiOne = 0;
    var downScore = 0;

    var upCount = 0;
    var downCount = 0;
    if(chessData[x][y]!=0)
    {
        return -1;
    }
    var i=0;
    for (i = y-1; i >= 0; i--) {
        if (chessData[x][i] != chess) {
            break;
        }
        upCount++;
    }

  if(i==-1 || chessData[x][i] !=0)
  {
      switch (upCount) {
          case 1:
              upSiOne = 1 * Si[0];
              break;
          case 2:
              upSiTwo = 2 * Si[1];
              break;
          case 3:
              upSiThree = 3 * Si[2];
              break;
          case 4:
              upSiFour = 4 * Si[3]+fourBig;
              break;
          case 5:
              upHuoFive = 5 * Si[4];
              break;
      }
  }
else
    {
        switch (upCount)
        {
            case 1:
                upHuoOne = 1*Huo[0];
                break;
            case 2:
                upHuoTwo = 2*Huo[1];
                break;
            case 3:
                upHuoThree = 3*Huo[2]+little;
                break;
            case 4:
                upHuoFour = 4*Huo[3]+fourBig;
                break;
            case 5:
                upHuoFive = 5*Huo[4];
                break;
        }

    }

    var i=0;
    for ( i = y + 1; i < 15; i++)
    {
        if (chessData[x][i] != chess)
        {
            break;
        }
        downCount++;
    }
if(chessData[x][i] ==0)
    {
        switch (downCount)
        {
            case 1:
                downHuoOne = 1*Huo[0];
                break;
            case 2:
                downHuoTwo = 2*Huo[1];
                break;
            case 3:
                downHuoThree = 3*Huo[2]+little;
                break;
            case 4:
                downHuoFour = 4*Huo[3]+fourBig;
                break;
            case 5:
                downHuoFive = 5*Huo[4];
                break;
        }
    }
    else
    {
        switch (downCount) {
            case 1:
                downSiOne = 1 * Si[0];
                break;
            case 2:
                downSiTwo = 2 * Si[1];
                break;
            case 3:
                downSiThree = 3 * Si[2];
                break;
            case 4:
                downSiFour = 4 * Si[3]+fourBig;
                break;
            case 5:
                downHuoFive = 5 * Si[4];
                break;
        }
    }




    if(upHuoOne==1*Huo[0])
    {
        if(downHuoTwo==2*Huo[1])
        {
            upHuoOne+=big;
            downHuoTwo+=big;
        }
        if(downHuoThree==3*Huo[2]+little)
        {
            upHuoOne+=big;
            downHuoThree+=big;
        }
        if(downSiThree==3*Si[2])
        {
            upHuoOne+=big;
            downSiThree+=big;
        }
    }
    if(upSiOne==1*Si[0])
    {
        if(downHuoThree==3*Huo[2]+little)
        {
            upSiOne+=big;
            downHuoThree+=big;
        }
        if(downSiThree==3*Si[2])
        {
            upSiOne+=big;
            downSiThree+=big;
        }
    }
    if(upHuoTwo==2*Huo[1])
    {
        if(downHuoOne==1*Huo[0])
        {
            upHuoTwo+=big;
            downHuoOne+=big;
        }
        if(downHuoTwo==2*Huo[1])
        {
            upHuoTwo+=big;
            downHuoTwo+=big;
        }
        if(downSiTwo==2*Si[1])
        {
            upHuoTwo+=big;
            downSiTwo+=big;
        }
    }
    if(upSiTwo==2*Si[1])
    {
        if(downHuoTwo==2*Huo[1])
        {
            upSiTwo+=big;
            downHuoTwo+=big;
        }
        if(downSiTwo==2*Si[1])
        {
            upSiTwo+=big;
            downSiTwo+=big;
        }
    }
    if(upHuoThree==3*Huo[2]+little)
    {
        if(downHuoOne==1*Huo[0])
        {
            upHuoThree+=big;
            downHuoOne+=big;
        }
        if(downSiOne==1*Si[0])
        {
            upHuoThree+=big;
            downSiOne+=big;
        }
    }
    if(upSiThree==3*Si[2])
    {
        if(downHuoOne==1*Huo[0])
        {
            upSiThree+=big;
            downHuoOne+=big;
        }
        if(downSiOne==1*Si[0])
        {
            upSiThree+=big;
            downSiOne+=big;
        }
    }



    upScore=upHuoFive+upHuoFour+upHuoThree+upHuoTwo+upSiFour+upSiThree+upSiTwo+upHuoOne+upSiOne;
    downScore=downHuoFive+downHuoFour+downHuoThree+downHuoTwo+downSiFour+downSiThree+downSiTwo+downHuoOne+downSiOne;
    return upScore+downScore;
}

//计算左上到右下方向的权值
function calculateLeftUpToRightDownDirection(x,y,chess)
{
    if(chessData[x][y]!=0)
    {
        return -1;
    }
    var leftUpHuoFive = 0;
    var leftUpHuoFour = 0;
    var leftUpSiFour = 0;
    var leftUpHuoThree = 0;
    var leftUpSiThree = 0;
    var leftUpHuoTwo = 0;
    var leftUpSiTwo = 0;
    var leftUpHuoOne = 0;
    var leftUpSiOne=0;
    var leftUpScore = 0

    var rightDownHuoFive = 0;
    var rightDownHuoFour = 0;
    var rightDownSiFour = 0;
    var rightDownHuoThree = 0;
    var rightDownSiThree = 0;
    var rightDownHuoTwo = 0;
    var rightDownSiTwo = 0;
    var rightDownHuoOne = 0;
    var rightDownSiOne=0;
    var rightDownScore = 0;

    var leftUpCount = 0;
    var rightDownCount = 0;
    var i=0;
    var j=0;
    for ( i = x-1, j = y-1; i >= 0 && j >= 0; i--, j--) {
        if (chessData[i][j] != chess) {
            break;
        }
        leftUpCount++;
    }
    if(i == -1 || j==-1 || chessData[i][j] != 0)
    {
        switch (leftUpCount) {
            case 1:
                leftUpSiOne = 1 * Si[0];
                break;
            case 2:
                leftUpSiTwo = 2 * Si[1];
                break;
            case 3:
                leftUpSiThree = 3 * Si[2];
                break;
            case 4:
                leftUpSiFour = 4 * Si[3]+fourBig;
                break;
            case 5:
                leftUpHuoFive = 5 * Si[4];
                break;
        }
    }
else
{
    switch (leftUpCount)
    {
        case 1:
            leftUpHuoOne = 1*Huo[0];
            break;
        case 2:
            leftUpHuoTwo = 2*Huo[1];
            break;
        case 3:
            leftUpHuoThree = 3*Huo[2]+little;
            break;
        case 4:
            leftUpHuoFour = 4*Huo[3]+fourBig;
            break;
        case 5:
            leftUpHuoFive = 5*Huo[4];
            break;
    }
}

    var i=0;
    var j=0;
    for ( i = x + 1, j = y + 1; i < 15 && j < 15; i++, j++) {
        if (chessData[i][j] != chess) {
            break;
        }
        rightDownCount++;
    }
if(chessData[i][j] ==0)
{
    switch (rightDownCount) {
        case 1:
            rightDownHuoOne = 1 * Huo[0];
            break;
        case 2:
            rightDownHuoTwo = 2 * Huo[1];
            break;
        case 3:
            rightDownHuoThree = 3 * Huo[2]+little;
            break;
        case 4:
            rightDownHuoFour = 4 * Huo[3]+fourBig;
            break;
        case 5:
            rightDownHuoFive = 5 * Huo[4];
            break;
    }
}
else
{
    switch (rightDownCount) {
        case 1:
            rightDownSiOne = 1 * Si[0];
            break;
        case 2:
            rightDownSiTwo = 2 * Si[1];
            break;
        case 3:
            rightDownSiThree = 3 * Si[2];
            break;
        case 4:
            rightDownSiFour = 4 * Si[3]+big;
            break;
        case 5:
            rightDownHuoFive = 5 * Si[4];
            break;
    }
}


    if(leftUpHuoOne==1*Huo[0])
    {
        if(rightDownHuoTwo==2*Huo[1])
        {
            leftUpHuoOne+=big;
            rightDownHuoTwo+=big;
        }
        if(rightDownHuoThree==3*Huo[2]+little)
        {
            leftUpHuoOne+=big;
            rightDownHuoThree+=big;
        }
        if(rightDownSiThree==3*Si[2])
        {
            leftUpHuoOne+=big;
            rightDownSiThree+=big;
        }
    }
    if(leftUpSiOne==1*Si[0])
    {
        if(rightDownHuoThree==3*Huo[2]+little)
        {
            leftUpSiOne+=big;
            rightDownHuoThree+=big;
        }
        if(rightDownSiThree==3*Si[2])
        {
            leftUpSiOne+=big;
            rightDownSiThree+=big;
        }
    }
    if(leftUpHuoTwo==2*Huo[1])
    {
        if(rightDownHuoOne==1*Huo[0])
        {
            leftUpHuoTwo+=big;
            rightDownHuoOne+=big;
        }
        if(rightDownHuoTwo==2*Huo[1])
        {
            leftUpHuoTwo+=big;
            rightDownHuoTwo+=big;
        }
        if(rightDownSiTwo==2*Si[1])
        {
            leftUpHuoTwo+=big;
            rightDownSiTwo+=big;
        }
    }
    if(leftUpSiTwo==2*Si[1])
    {
        if(rightDownHuoTwo==2*Huo[1])
        {
            leftUpSiTwo+=big;
            rightDownHuoTwo+=big;
        }
        if(rightDownSiTwo==2*Si[1])
        {
            leftUpSiTwo+=big;
            rightDownSiTwo+=big;
        }
    }
    if(leftUpHuoThree==3*Huo[2]+little)
    {
        if(rightDownHuoOne==1*Huo[0])
        {
            leftUpHuoThree+=big;
            rightDownHuoOne+=big;
        }
        if(rightDownSiOne==1*Si[0])
        {
            leftUpHuoThree+=big;
            rightDownSiOne+=big;
        }
    }
    if(leftUpSiThree==3*Si[2])
    {
        if(rightDownHuoOne==1*Huo[0])
        {
            leftUpSiThree+=big;
            rightDownHuoOne+=big;
        }
        if(rightDownSiOne==1*Si[0])
        {
            leftUpSiThree+=big;
            rightDownSiOne+=big;
        }
    }

    leftUpScore=leftUpHuoFive+leftUpHuoFour+leftUpHuoThree+leftUpHuoTwo+leftUpSiFour+leftUpSiThree+leftUpSiTwo+leftUpHuoOne+leftUpSiOne;
    rightDownScore=rightDownHuoFive+rightDownHuoFour+rightDownHuoThree+rightDownHuoTwo+rightDownSiFour+rightDownSiThree+rightDownSiTwo+rightDownHuoOne+rightDownSiOne;
    return leftUpScore+rightDownScore;
}

//计算右上到左下方向的权值
function calculateRightUpToLeftDownDirection(x,y,chess)
{
    if(chessData[x][y]!=0)
    {
        return -1;
    }
    var rightUpHuoFive = 0;
    var rightUpHuoFour = 0;
    var rightUpSiFour = 0;
    var rightUpHuoThree = 0;
    var rightUpSiThree = 0;
    var rightUpHuoTwo = 0;
    var rightUpSiTwo = 0;
    var rightUpHuoOne = 0;
    var rightUpSiOne=0;
    var rightUpScore = 0

    var leftDownHuoFive = 0;
    var leftDownHuoFour = 0;
    var leftDownSiFour = 0;
    var leftDownHuoThree = 0;
    var leftDownSiThree = 0;
    var leftDownHuoTwo = 0;
    var leftDownSiTwo = 0;
    var leftDownHuoOne = 0;
    var leftDownSiOne=0;
    var leftDownScore = 0;

    var rightUpCount = 0;
    var leftDownCount = 0;
    var i=0;
    var j=0;
    for (i = x+1, j = y-1; i < 15 && j >= 0; i++, j--) {
        if (chessData[i][j] != chess) {
            break;
        }
        rightUpCount++;
    }
if(j == -1 || chessData[i][j] !=0)
{
    switch (rightUpCount) {
        case 1:
            rightUpSiOne = 1 * Si[0];
            break;
        case 2:
            rightUpSiTwo = 2 * Si[1];
            break;
        case 3:
            rightUpSiThree = 3 * Si[2];
            break;
        case 4:
            rightUpSiFour = 4 * Si[3]+fourBig;
            break;
        case 5:
            rightUpHuoFive = 5 * Si[4];
            break;
    }
}
else{
    switch (rightUpCount)
    {
        case 1:
            rightUpHuoOne = 1*Huo[0];
            break;
        case 2:
            rightUpHuoTwo = 2*Huo[1];
            break;
        case 3:
            rightUpHuoThree = 3*Huo[2]+little;
            break;
        case 4:
            rightUpHuoFour = 4*Huo[3]+fourBig;
            break;
        case 5:
            rightUpHuoFive = 5*Huo[4];
            break;
    }
}

    var m = x-1;
    var n = y+1;
    for (; m >= 0 && n < 15;m--, n++) {

        if (chessData[m][n] != chess) {
            break;
        }
        leftDownCount++;
    }
   if(m == -1 || chessData[m][n] != 0)
   {
       switch (leftDownCount)
       {
           case 1:
               leftDownSiOne = 1*Si[0];
               break;
           case 2:
               leftDownSiTwo = 2*Si[1];
               break;
           case 3:
               leftDownSiThree = 3*Si[2];
               break;
           case 4:
               leftDownSiFour = 4*Si[3]+fourBig;
               break;
           case 5:
               leftDownHuoFive = 5*Si[4];
               break;
       }
   }
else
{
    switch (leftDownCount)
    {
        case 1:
            leftDownHuoOne = 1*Huo[0];
            break;
        case 2:
            leftDownHuoTwo = 2*Huo[1];
            break;
        case 3:
            leftDownHuoThree = 3*Huo[2]+little;
            break;
        case 4:
            leftDownHuoFour = 4*Huo[3]+fourBig;
            break;
        case 5:
            leftDownHuoFive = 5*Huo[4];
            break;
    }

}



    if(leftDownHuoOne==1*Huo[0])
    {
        if(rightUpHuoTwo==2*Huo[1])
        {
            leftDownHuoOne+=big;
            rightUpHuoTwo+=big;
        }
        if(rightUpHuoThree==3*Huo[2]+little)
        {
            leftDownHuoOne+=big;
            rightUpHuoThree+=big;
        }
        if(rightUpSiThree==3*Si[2])
        {
            leftDownHuoOne+=big;
            rightUpSiThree+=big;
        }
    }
    if(leftDownSiOne==1*Si[0])
    {
        if(rightUpHuoThree==3*Huo[2]+little)
        {
            leftDownSiOne+=big;
            rightUpHuoThree+=big;
        }
        if(rightUpSiThree==3*Si[2])
        {
            leftDownSiOne+=big;
            rightUpSiThree+=big;
        }
    }
    if(leftDownHuoTwo==2*Huo[1])
    {
        if(rightUpHuoOne==1*Huo[0])
        {
            leftDownHuoTwo+=big;
            rightUpHuoOne+=big;
        }
        if(rightUpHuoTwo==2*Huo[1])
        {
            leftDownHuoTwo+=big;
            rightUpHuoTwo+=big;
        }
        if(rightUpSiTwo==2*Si[1])
        {
            leftDownHuoTwo+=big;
            rightUpSiTwo+=big;
        }
    }
    if(leftDownSiTwo==2*Si[1])
    {
        if(rightUpHuoTwo==2*Huo[1])
        {
            leftDownSiTwo+=big;
            rightUpHuoTwo+=big;
        }
        if(rightUpSiTwo==2*Si[1])
        {
            leftDownSiTwo+=big;
            rightUpSiTwo+=big;
        }
    }
    if(leftDownHuoThree==3*Huo[2]+little)
    {
        if(rightUpHuoOne==1*Huo[0])
        {
            leftDownHuoThree+=big;
            rightUpHuoOne+=big;
        }
        if(rightUpSiOne==1*Si[0])
        {
            leftDownHuoThree+=big;
            rightUpSiOne+=big;
        }
    }
    if(leftDownSiThree==3*Si[2])
    {
        if(rightUpHuoOne==1*Huo[0])
        {
            leftDownSiThree+=big;
            rightUpHuoOne+=big;
        }
        if(rightUpSiOne==1*Si[0])
        {
            leftDownSiThree+=big;
            rightUpSiOne+=big;
        }
    }



    rightUpScore=rightUpHuoFive+rightUpHuoFour+rightUpHuoThree+rightUpHuoTwo+rightUpSiFour+rightUpSiThree+rightUpSiTwo+rightUpHuoOne+rightUpSiOne;
    leftDownScore=leftDownHuoFive+leftDownHuoFour+leftDownHuoThree+leftDownHuoTwo+leftDownSiFour+leftDownSiThree+leftDownSiTwo+leftDownHuoOne+leftDownSiOne;
    return rightUpScore+leftDownScore;
}


//计算某一点的权值，各个方向权值之和并求出最大的权值
function calculateAllDirectionAndSearchTheMaxScore(chess)
{
    var propertyLocation=new Array(3);
    for(var i=0;i<3;i++)
    {
        propertyLocation[i]=0;
    }
    for(var x=0;x<15;x++)
    {
        for(var y=0;y<15;y++)
        {
            if(chessData!=0)
            {

                var LToRScore = calculateLeftToRightDirection(x,y,chess);
                var LUToRDScore = calculateLeftUpToRightDownDirection(x,y,chess);
                var UToDScore = calculateUpToDownDirection(x,y,chess);
                var RUToLDScore = calculateRightUpToLeftDownDirection(x,y,chess);
                var Score=LToRScore + LUToRDScore+UToDScore+RUToLDScore;
                if(propertyLocation[0]<Score)
                {
                    propertyLocation[0]=Score;
                    propertyLocation[1]=x;
                    propertyLocation[2]=y;
                }
            }
        }
    }
    return propertyLocation;
}

//寻找下黑棋（即电脑）的下棋位置
function searchBlackLocation(blackChess, whiteChess)
{
    var blackChessLocation=new Array(2);
    var whiteMaxScore = calculateAllDirectionAndSearchTheMaxScore(whiteChess);
    var blackMaxScore = calculateAllDirectionAndSearchTheMaxScore(blackChess);
    if(whiteMaxScore[0] <= blackMaxScore[0])
    {
        blackChessLocation[0]=blackMaxScore[1];
        blackChessLocation[1]=blackMaxScore[2];
    }
    else
    {
        blackChessLocation[0]=whiteMaxScore[1];
        blackChessLocation[1]=whiteMaxScore[2];
    }
    return blackChessLocation;
}

    function countChess(x, y, chess) {//计算棋子的个数
        count1 = 0;
        count2 = 0;
        count3 = 0;
        count4 = 0;
        //左右判断
        for (var i = x; i >= 0; i--) {
            if (chessData[i][y] != chess) {
                break;
            }
            count1++;
        }
        for (var i = x + 1; i < 15; i++) {
            if (chessData[i][y] != chess) {
                break;
            }
            count1++;
        }
        //上下判断
        for (var i = y; i >= 0; i--) {
            if (chessData[x][i] != chess) {
                break;
            }
            count2++;
        }
        for (var i = y + 1; i < 15; i++) {
            if (chessData[x][i] != chess) {
                break;
            }
            count2++;
        }
        //左上右下判断
        for (var i = x, j = y; i >= 0 && j >= 0; i--, j--) {
            if (chessData[i][j] != chess) {
                break;
            }
            count3++;
        }
        for (var i = x + 1, j = y + 1; i < 15 && j < 15; i++, j++) {
            if (chessData[i][j] != chess) {
                break;
            }
            count3++;
        }
        //右上左下判断
        for (var i = x, j = y; i >= 0 && j < 15; i--, j++) {
            if (chessData[i][j] != chess) {
                break;
            }
            count4++;
        }
        for (var i = x + 1, j = y - 1; i < 15 && j >= 0; i++, j--) {
            if (chessData[i][j] != chess) {
                break;
            }
            count4++;
        }
    }

//判断该局棋盘是否赢了
    function judge(x, y, chess) {
        countChess(x, y, chess);
        if (count1 >= 5 || count2 >= 5 || count3 >= 5 || count4 >= 5) {
            if (chess == white) {
                alert("白棋赢了");
            }
            else {
                alert("黑棋赢了");
            }
            isWell = true;//设置该局棋盘已经赢了，不可以再走了
        }
    }

