
let table;
let data1 = [];
let data2 = [];
let series = []
function preload() {
    table = loadTable(`data/rppi_test.csv`,'csv', 'header');

}

function tidyData(_data,arr){
    _data.forEach(i => {
        arr.push(int(i))
    });
}     


function setup() {
    let w = windowWidth;
    let h = windowHeight / 8 + 50;
    
    series = table.columns;
    createCanvas(windowWidth,windowHeight); 
    noLoop();
    
    tidyData(table.getColumn(series[1]),data1)
    tidyData(table.getColumn(series[2]),data2)
        
    angleMode(DEGREES)
    
    
    horBar = new HBarChart(250,250,w/12,h*2+100,data1,10,10,5);
    bar= new BarChart(250,250,w/12,h*4+200,data1,10,10,5); 
    
    stacked = new Stacked(250,250,(w/12)*5,h*4+200,data1,data2,10,10,5);
    lineStacked = new Linechart(250,250,(w/12)*5,h*2+100,data1,data2,10,10,5)

    pie = new PieChart(data2,(w/12)*8,h*3.5+100,stacked.width * 1.4);
   
   
} 

function draw(){  
    background(40);
    fill(200)
    textSize(25)
    textAlign(CENTER)
    textStyle(BOLD)
    text('Comparison of Change in Weekly Earnings \n in NACE Retail (G) & Education (P) from 2008 to 2022', windowWidth /2, 50)
    textStyle(NORMAL)
    textSize(15)
    //rotated bar chart
    horBar.render('Average Weekly Earnings \n for Education Sector (P)')
    /////

    //Standard barchart
    bar.render('Average Weekly Earnings \n for Retail Sector (G)')
    // bar.drawLegend(table.columns[2])
    /////

    // stacked barchart
    stacked.render('Stacked Avg Weekly Earnings \n for Education (P) & Retail (G) Sectors')
    /////

    // piechart
    pie.render('Percentage Change in Education Earnings YoY')
    /////
   
    // stacked Linechart
    lineStacked.render('Stacked Average Weekly Earnings, \n  Retail (G) & Education (P) Sectors with Mean Line ')
    ///// 
}




