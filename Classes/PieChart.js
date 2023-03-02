class PieChart {
    constructor(_data, _posX, _posY, _diameter) {
        this.data = _data;
        // posx is divided by half the diamter to make posX the center of the piechart
        this.posX = _posX + (_diameter/2); 
        this.posY = _posY - (_diameter/2);
        this.diameter = _diameter;
        
    }

    /**
    * Draws a pie chart with given data array
    */
    drawPie() {

        let increases = this.data.map((i,v) => {
            if (v == 0) {
                return;
            }
            let previousVal = this.data[v-1];
            return((i - previousVal)  / previousVal) *100
        }).filter(Boolean)
        this.data = increases;

        
        console.log(this.data)
        
   
        //gets total number of segments to be created
        let total = 0;
        this.data.forEach(i => total += i);
        

        angleMode(RADIANS)
        let angle = 0;
       
        //iterates for the length of the data array
        for (let i = 0; i < this.data.length; i++) {

            //gets degrees of circle from array
            let degrees = (Math.abs(this.data[i]) / total) * 360;
            console.log(degrees)
            push()
            fill(200)
            
            textSize(15);
            textAlign(CENTER, CENTER);
                
            translate(this.posX,this.posY)
            rotate(degrees);

            // rounds to 1/4 of a percent
            text(Math.round(this.data[i]*4)/4 + '%', 0,(this.diameter / 2 )+ 10)
            
            pop()
            fill(20 + (20*i),71 ,111);

            //arc() generates a sector of a circle
            arc(
                this.posX,
                this.posY,
                this.diameter,
                this.diameter,
                angle,
                angle + radians(degrees) ,
                PIE);

            // Add last angle to angle variable, sets starting position of next arc
            angle += radians(degrees);
            // console.log(data[i]/total*360)
        }
    }
}
