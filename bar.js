//bar.js
//simple ,elegant bar chart library
//{date}-{version}
//{url}
//copyright 2017 {your name}
//released under the MIT liscense
//{license url}

'use strict';

function BarChart(targetId, width, height, data){
        //Base
        var chart = this;

        //specify configaration
        chart.configureChart(targetId, width, height, data);

        //pre operations
        chart.performOperations();

        //draw chart
        chart.drawChart();
}
BarChart.prototype.configureChart=function(targetId, width, height, data) {

        var chart = this;
        //global Canvas spec
        chart.setCanvasParameters(targetId, width, height, data);


        //global chart spec
        chart.setChartParameters();

 };
BarChart.prototype.setCanvasParameters=function(targetId, width, height, data) {
        var chart = this;
        //global specifications come from outside
        //canvas related config
        chart.id = targetId;
        chart.width = width;
        chart.height = height;
        chart.data = data;

 };
BarChart.prototype.setChartParameters=function(targetId, width, height, data) {
        var chart = this;
        //chart related config
        //axis config
        chart.axisRatio = 10; //in terms of percentage
        chart.verticalMargin = (chart.height * chart.axisRatio) / 100;
        chart.horizontalMargin = (chart.width * chart.axisRatio) / 100;
        chart.axisColor = '#b1b1b1';
        chart.axisWidth = 0.75;

        //label config-dynamic font size
        chart.fontRatio = 3; //in terms of percentage
        chart.fontFamily = 'times';
        chart.fontStyle = 'normal';
        chart.fontWeight = '300';
        chart.fontColor = '#666';
        chart.verticalFontSize = (chart.height * chart.fontRatio) / 100;
        chart.horizontalFontSize = (chart.width * chart.fontRatio) / 100;

        //guidelines config
        chart.guidelineColor = '#e5e5e5';
        chart.guidelineWidth = 0.5;
};
BarChart.prototype.performOperations=function() {
        var chart = this;

        //create canvas
        chart.createCanvas();

        //get data
        chart.handleData();

        //prepare data
        chart.prepareData();

};
BarChart.prototype.createCanvas=function() {
        var chart = this;

        //create canvas
        //create the canvas dynamically by use of js createElement function()
        var canvas = document.createElement('canvas');
        canvas.id = chart.id + '-' + Math.random();
        canvas.width = chart.width;
        canvas.height = chart.height;

        //append canvas to target container
        document.getElementById(chart.id).innerHTML = ''; //clean container
        document.getElementById(chart.id).appendChild(canvas); //add canvas to clean container



        //add canvas to chart obj
        chart.canvas = canvas;
        chart.context = canvas.getContext('2d');
};
BarChart.prototype.handleData=function() {
        var chart = this;

        //data sets
        chart.labels = [];
        chart.values = [];

        //handle data
        chart.data.forEach(function (item) {
            chart.labels.push(item.label);
            chart.values.push(item.value);
        });
 }









BarChart.prototype.prepareData=function(){
    var chart=this;

    //global variables
    chart.itemsNum=chart.data.length;
    chart.maxValue=Math.max.apply(null,chart.values);
    chart.minValue=Math.min.apply(null,chart.values);

    //axis spec
    chart.verticalAxisWidth=chart.height-2*chart.verticalMargin;//bottom & top margin
    chart.horizontalAxisWidth=chart.width-2*chart.horizontalMargin;//left & right margin

    //label spec
    chart.verticalUpperBound=Math.ceil(chart.maxValue/10)*10;
    chart.verticalLabelFreq=chart.verticalUpperBound/chart.itemsNum;

    chart.horizontalLabelFreq=chart.horizontalAxisWidth/chart.itemsNum;

};

BarChart.prototype.drawChart=function(){
    var chart=this;

    chart.drawVerticalAxis();//vertical axis
    chart.drawVerticalLabels();//vertical lebels
    chart.drawHorizontalAxis();//horizontal axis
    chart.drawHorizontalLabels();//horizontal labels
    chart.drawHorizontalGuidelines();//horizontal guidelines
    chart.drawVerticalGuideLines();//vertical guidelines
    chart.drawBars();//bars

};

BarChart.prototype.drawVerticalAxis=function(){
    var chart=this;

    //vertical axis
    chart.context.beginPath();
    chart.context.strokeStyle=chart.axisColor;
    chart.context.lineWidth=chart.axisWidth;
    chart.context.moveTo(chart.horizontalMargin,chart.verticalMargin);
    chart.context.lineTo(chart.horizontalMargin,chart.height-chart.verticalMargin);
    chart.context.stroke();
};

BarChart.prototype.drawHorizontalAxis=function(){
    var chart=this;

    //horizontal axis
    chart.context.beginPath();
    chart.context.strokeStyle=chart.axisColor;
    chart.context.lineWidth=chart.axisWidth;
    chart.context.moveTo(chart.horizontalMargin,chart.height-chart.verticalMargin);
    chart.context.lineTo(chart.width-chart.horizontalMargin,chart.height-chart.verticalMargin);
    chart.context.stroke();
}

BarChart.prototype.drawVerticalLabels=function(){
    var chart=this;

    //text spec
    var labelFont=chart.fontStyle+''+chart.fontWeight+''+chart.verticalFontSize+'px'+chart.fontFamily;
    chart.context.font=labelFont;
    chart.context.textAlign='right';
    chart.context.fillStyle=chart.fontColor;

    //scale values
    var scaledVerticalLabelFreq=(chart.verticalAxisWidth/chart.verticalUpperBound)*chart.verticalLabelFreq;

    //draw label
    for (var i=0;i<=chart.itemsNum;i++)
    {
        var labelText=chart.verticalUpperBound-i*this.verticalLabelFreq;
        var verticalLabelX=chart.horizontalMargin-chart.horizontalMargin/chart.axisRatio;
        var verticalLabelY=chart.verticalMargin+i*scaledVerticalLabelFreq;

        chart.context.fillText(labelText,verticalLabelX,verticalLabelY);
    }
};

BarChart.prototype.drawHorizontalLabels=function(){
    var chart=this;

    //text spec
    var labelFont=chart.fontStyle+''+chart.fontWeight+''+chart.verticalFontSize+'px'+chart.fontFamily;
    chart.context.font=labelFont;
    chart.context.textAlign='center';
    chart.context.textBaseline='top';
    chart.context.fillStyle=chart.fontColor;

    //draw labels
    for(var i=0;i<chart.itemsNum;i++)
    {
        var horizontalLabelX=chart.horizontalMargin+i*chart.horizontalLabelFreq+chart.horizontalLabelFreq/2;
        var horizontalLabelY=chart.height-chart.verticalMargin+chart.verticalMargin/chart.axisRatio;
        chart.context.fillText(chart.labels[i],horizontalLabelX,horizontalLabelY);
    }
};

BarChart.prototype.drawHorizontalGuidelines=function(){
    var chart=this;
    var scaledVerticalLabelFreq=(chart.verticalAxisWidth/chart.verticalUpperBound)*chart.verticalLabelFreq;
    // Specifications
    chart.context.strokeStyle = chart.guidelineColor;
    chart.context.lineWidth = chart.guidelineWidth;
     for (var i=0;i<=chart.itemsNum;i++)
     {
        
        
        //starting point coordinates
        var horizontalGuidelineStartX=chart.horizontalMargin;
        var horizontalGuidelineStartY=chart.verticalMargin+(i)*scaledVerticalLabelFreq;
        //end point coordinates
        var horizontalGuidelineEndX=chart.horizontalMargin+chart.horizontalAxisWidth;
        var horizontalGuidelineEndY=chart.verticalMargin+i*scaledVerticalLabelFreq;

        chart.context.beginPath();
        chart.context.moveTo(horizontalGuidelineStartX,horizontalGuidelineStartY);
        chart.context.lineTo(horizontalGuidelineEndX,horizontalGuidelineEndY);
        chart.context.stroke();

     }
};

BarChart.prototype.drawVerticalGuideLines=function(){
    var chart=this;
    // Specifications
    chart.context.strokeStyle = chart.guidelineColor;
    chart.context.lineWidth = chart.guidelineWidth;
    for(var i=0;i<=chart.itemsNum;i++)
    {
        //start point coordinates
        var verticalGuidelineStartX=chart.horizontalMargin+i*chart.horizontalLabelFreq;
        var verticalGuidelineStartY=chart.height-chart.verticalMargin;
        //end point coordinates
        var verticalGuidelineEndX=chart.horizontalMargin+i*chart.horizontalLabelFreq;
        var verticalGuidelineEndY=chart.verticalMargin;

        chart.context.beginPath();
        chart.context.moveTo(verticalGuidelineStartX,verticalGuidelineStartY);
        chart.context.lineTo(verticalGuidelineEndX,verticalGuidelineEndY);
        chart.context.stroke();
    }

}

BarChart.prototype.drawBars=function(){
    var chart=this;

   

   for(var i=0;i<chart.itemsNum;i++)
   {
        var color=chart.createRandomRGBColor();
        var fillOpacity=0.3;
        var fillColor='rgba('+color.r+','+color.g+','+color.b+','+fillOpacity+' )';
        var borderColor='rgba('+color.r+','+color.g+','+color.b+' )';
        chart.context.beginPath();
        var barX=chart.horizontalMargin+i*chart.horizontalLabelFreq+chart.horizontalLabelFreq/chart.axisRatio;
        var barY=chart.height-chart.verticalMargin;

        var barWidth=chart.horizontalLabelFreq-2*chart.horizontalLabelFreq/chart.axisRatio;
        var barHeight=-1*chart.verticalAxisWidth*chart.values[i]/chart.maxValue;
        chart.context.fillStyle=fillColor;
        chart.context.strokeStyle=borderColor;
        chart.context.rect(barX,barY,barWidth,barHeight);
        chart.context.stroke();
        chart.context.fill();

   }

}

BarChart.prototype.createRandomRGBColor=function(){
    var red=getRandomInt(0,257);
    var green=getRandomInt(0,257);
    var blue=getRandomInt(0,257);
    return {r:red,g:green,b:blue};
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }