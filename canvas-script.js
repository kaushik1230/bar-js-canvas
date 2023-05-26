window.onload=function(){

min=1;
max=200;


//chart data
var data=[
    {label:'jan',value:getRandomInt(min,max)},
    {label:'feb',value:getRandomInt(min,max)},
    {label:'march',value:getRandomInt(min,max)},
    {label:'april',value:getRandomInt(min,max)},
    {label:'may',value:getRandomInt(min,max)}
];

//chart specs
var targetId='chart';
var canvasWidth=600;
var canvasHeight=450;

//create chart obj
var chart=new BarChart(targetId,canvasWidth,canvasHeight,data);

};
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

