// let data = [
//     {fruit:"Apples",sales:200},
//     {fruit:"Oranges",sales:300},
//     {fruit:"Pears",sales:400}
// ]
let table;
let dataFile;
let data1 = [];
let data2 = [];
function preload() {
    table = loadTable(`data/rppi_test.csv`,'csv', 'header');

}

function tidyData(_data,arr){
    // let scaleValue = chartHeight / maxValue;
    
        arr.push(int(_data))
    // let scaleValue = chartHeight / maxValue;
    // return _num * scaleValue
}



function setup() {
    let w = windowWidth / 8 + 50;
    let h = windowHeight / 8 + 50;
    createCanvas(windowWidth,windowHeight); 
    noLoop();
    for (let p = 0; p < table.rows.length; p++) {
        tidyData(table.rows[p].obj.Value1,data1)
        // console.log(int(table.rows[p].obj.Value1)) 
        tidyData(table.rows[p].obj.Value2,data2)
        
    }

    angleMode(DEGREES)
    push()
    
    b = new BarChart(250,250,50,h*2,data1,10,10,5);

    bar= new BarChart(250,250,50,h*4,data1,10,10,5);
    
    s = new Stacked(250,250,450,h*4,data1,data2,10,10,5);

    p = new PieChart(data2,450,h*2,s.width);
   
    l = new Linechart(250,250,850,h*3,data2,10,10,5)
   
} 

function draw(){  
    background(40);

    //rotated bar chart
    b.drawXAxis(0);
    b.drawYAxis(90);
    b.drawData(90);
    /////

    //Standard barchart
    bar.render()
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
    l.drawAxis();
    l.drawAxis(90,false,0);
    l.drawData();
    /////
    
}




