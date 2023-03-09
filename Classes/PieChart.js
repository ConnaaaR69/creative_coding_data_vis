class PieChart {
    constructor(_data, _posX, _posY, _diameter) {
        this.data = _data;
        // posx is addded to half the diamter to make posX the center of the piechart
        this.posX = _posX + (_diameter/2); 
        this.posY = _posY - (_diameter/2);
        this.diameter = _diameter;
    }

    /**
    * @param {string} _title Title of Chart in string format
    */
    drawLegend(_title){
        if(!typeof _title === "string"){
            throw ('Chart Title is Not a String!')
        }
        textAlign(CENTER,CENTER)
        text(_title, this.posX,this.posY - this.diameter/2 - this.diameter/5)
    }

    
    /**
    * Draws a pie chart with given data array
    */
    render(_title) {
        this.drawLegend(_title)
        //Gets percentage change of values between years and converts data array
        let changePer = this.data.map((v,i) => {
            //dont calc on first index
            if (i == 0) {
                return; 
            }
            //get prev value to compare to
            let previousVal = this.data[i-1];
            
            return((v - previousVal)  / previousVal) *100
        }).filter(Boolean)
        this.data = changePer;
       
        let total = 0; //gets total number of segments to be created
        this.data.forEach(i => total += Math.abs(i));// gets total of data array

        let angle = 0; // for piechart 
        let prevDeg = 0 // for text placement
        
        //iterates for the length of the data array
        for (let i = 0; i < this.data.length; i++) {
            //gets degrees of circle from array, converts to whole, non negative float
            let degrees = (Math.abs(this.data[i]) / total) * 360;
            prevDeg += degrees;

            //colours the arcs
            let c = map(this.data[i], Math.min(...this.data),  Math.max(...this.data),90, 200)
            fill(61, c, 210)
           
            
            // fill(78+ (5*i), 168- (10* i), 222 - (5* i));
            angleMode(RADIANS)
            //arc() generates a sector of a circle
            stroke(255)
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
            noStroke()
            ellipse(this.posX,this.posY, this.diameter- 100)
            // Add previous angle to angle variable, sets starting position of next arc
            angle += radians(degrees);

            // text labels
            push();
            
            fill(200);
            textSize(20);
            textAlign(CENTER, CENTER);
            
            translate(this.posX,this.posY)
            angleMode(DEGREES)
            console.log(degrees + prevDeg - 90)
           
            rotate((prevDeg-90)- degrees/2);
            degrees = ((this.data[i]) / total) * 360;
            // rounds to 1/4 of a percent
            
            // Flips label text on degrees
            if(degrees + prevDeg - 90 >= 180){
                push()
                // pushes unflips labels to correct position
                rotate(180)
                // negative y value flips text
                text(Math.round(this.data[i]*4)/4 + '%', 0,(-this.diameter / 2 )-(this.diameter / 20))
                text(table.rows[i].arr[0], 0,(-this.diameter / 2 )-(this.diameter / 20+20))
                pop()
            }else{
                text(Math.round(this.data[i]*4)/4 + '%', 0,(this.diameter / 2 )+(this.diameter / 20))
                text(table.rows[i].arr[0], 0,(this.diameter / 2 )+(this.diameter / 20+20))
            }
            pop()
        }
            
        
        
    }
}
