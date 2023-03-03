class PieChart {
    constructor(_data, _posX, _posY, _diameter) {
        this.data = _data;
        // posx is addded to half the diamter to make posX the center of the piechart
        this.posX = _posX + (_diameter/2); 
        this.posY = _posY - (_diameter/2);
        this.diameter = _diameter;
        
    }

    /**
    * Draws a pie chart with given data array
    */
    render() {
        //Gets percentage change of values between years and converts data array
        let changePer = this.data.map((i,v) => {
            if (v == 0) {
                return;
            }
            let previousVal = this.data[v-1];
            return((i - previousVal)  / previousVal) *100
        }).filter(Boolean)
        this.data = changePer;

       
        let total = 0; //gets total number of segments to be created
        this.data.forEach(i => total += Math.abs(i));// gets total of data array

        let angle = 0; // for piechart 
        let prevDeg = 0 // for text placement
        
        //iterates for the length of the data array
        for (let i = 0; i < 13; i++) {
            //gets degrees of circle from array, converts to whole, non negative float
            let degrees = (Math.abs(this.data[i]) / total) * 360;
            prevDeg += degrees;

            //colours the arcs
            
            fill(78+ (5*i), 168- (10* i), 222 - (5* i));
            angleMode(RADIANS)
            //arc() generates a sector of a circle
            arc(
            this.posX,
            this.posY,
            this.diameter,
            this.diameter,
            angle,
            angle+radians(degrees) ,
            PIE
            );
            fill(40)
            ellipse(this.posX,this.posY, this.diameter- 100)
            // Add previous angle to angle variable, sets starting position of next arc
            angle += radians(degrees);

            // text labels
            push();
            fill(200);
            textSize(15);
            textAlign(CENTER, CENTER);
            
            translate(this.posX,this.posY)
            angleMode(DEGREES)
            rotate((prevDeg-90)- degrees/2);
            degrees = ((this.data[i]) / total) * 360;
            // rounds to 1/4 of a percent
            
            text(Math.round(this.data[i]*4)/4 + '%', 0,(this.diameter / 2 )+(this.diameter / 20))
            text(table.rows[i].arr[0], 0,(this.diameter / 2 )+(this.diameter / 20+20))
            
            pop()
        }
    }
}
