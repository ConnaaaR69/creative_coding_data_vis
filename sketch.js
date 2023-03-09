
let table;
let table2;
let data1 = [];
let data2 = [];
let data3 = [];
let series = [];
let font;

function preload() {
    font = loadFont('assets/Montserrat-Regular.ttf')
    table = loadTable(`data/rppi_test.csv`,'csv', 'header');
    // table2 = loadTable(`data/Health_Social_Welfare.csv`, `csv`,`header`)
}

function tidyData(_data,arr){
    _data.forEach(i => {
        arr.push(int(i))
    });
}     


function setup() {
    textFont(font)
    let w = windowWidth;
    let h = windowHeight / 8 + 50;
    
    series = table.columns;
    createCanvas(windowWidth,windowHeight); 
    noLoop();
    
    tidyData(table.getColumn(series[1]),data1)
    tidyData(table.getColumn(series[2]),data2)
    tidyData(table.getColumn(series[3]),data3)
        
    angleMode(DEGREES)
    
    
    horBar = new HBarChart(260,260,w/12,h*2+100,data1,10,10,5);
    bar= new BarChart(260,260,w/12,h*4+150,data3,10,10,5); 
    
    stacked = new Stacked(260,260,(w/12)*5,h*4+150,data2,data3,10,10,5);
    lineStacked = new Linechart(260,260,(w/12)*5,h*2+100,data1,data2,10,10,5)

    pie = new PieChart(data2,(w/12)*8,h*3.5+100,stacked.width * 1.8);
   
   
} 

function draw(){  
    background(40);
    fill(200)
    textSize(25)
    textAlign(CENTER)
    textStyle(BOLD)
    text('Comparison of Change in Weekly Earnings \n in NACE Sectors (G), (P) & (Q) from 2008 to 2022', windowWidth /2, 50)
    textStyle(NORMAL)
    textSize(15)
    //rotated bar chart
    horBar.render('Average Weekly Earnings \n for Education Sector (P)')
    /////

    //Standard barchart
    bar.render('Weekly Earnings for \n Health & Welfare Sector (Q)')
    // bar.drawLegend(table.columns[2])
    /////

    // stacked barchart
    stacked.render('Stacked Avg Weekly Earnings \n for Education (P) & Health (Q) Sectors')
    /////

    // piechart
    pie.render('Percentage Change in Education Earnings YoY')
    /////
   
    // stacked Linechart
    lineStacked.render('Stacked Average Weekly Earnings, \n  Retail (G) & Education (P) Sectors with Mean Line ')
    ///// 
}




