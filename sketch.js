
let table;
let data1 = [];
let data2 = [];
let series = [];
function preload() {
    table = loadTable(`data/rppi_test.csv`,'csv', 'header');

}

function tidyData(_data,arr){
    // console.log(_data)
    // let scaleValue = chartHeight / maxValue;
    _data.forEach(i => {
        arr.push(int(i))
    });
        
    // let scaleValue = chartHeight / maxValue;
    // return _num * scaleValue
}

function setup() {
    let w = windowWidth / 8 + 50;
    let h = windowHeight / 8 + 50;
    createCanvas(windowWidth,windowHeight); 
    noLoop();
    series = table.columns;
    console.log(series)
    
        tidyData(table.getColumn(series[1]),data1)
        // console.log(int(table.rows[p].obj.Value1)) 
        tidyData(table.getColumn(series[2]),data2)
        
    

    angleMode(DEGREES)
    push()
    
    b = new BarChart(250,250,100,h*2,data1,10,10,5);

    bar= new BarChart(250,250,100,h*4+50,data2,10,10,5);
    
    s = new Stacked(250,250,450,h*4+50,data1,data2,10,10,5);

    p = new PieChart(data2,450,h*2,s.width);
   
    l = new Linechart(250,250,850,h*3,data2,10,10,5)
   
} 

function draw(){  
    background(40);

    //rotated bar chart
    b.drawLegend('€ / Week Earnings '+table.columns[1]);
    b.drawXAxis(0);
    b.drawYAxis(90);
    b.drawData(90);
   
    /////

    //Standard barchart
    bar.render()
    bar.drawLegend(table.columns[2])
    /////

    // stacked barchart
    s.drawAxis();
    s.drawAxis(90,false,0);
    s.drawData();
    /////

    // piechart
    p.drawPie()
    /////
   
    // Linechart
    l.drawXAxis(90);
    l.drawYAxis(0);
    l.drawData();
    /////
    
}




