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
        console.log(this.data)
        
        let colourArray = ['#1D2F6F','#8390FA','#9297E4', '#A19ECE', '#BFACA1', '#FAC748', '#F9E9EC', '#F9BBCD','#F9A4BD','#F88DAD']
        let total = 0;
        
        this.data.forEach(i => total += i);

        //This should be impossible.
        if (total / total * 360 != 360) {
            return console.log('Data cannot equal 360 degrees!')
        }
        else {
            console.log(`Degrees add to: ${total / total * 360}!`)
        }

        angleMode(RADIANS)
        let angle = 0;
       
        for (let i = 0; i < this.data.length; i++) {
            //gets degrees of circle from array
            let degrees = (this.data[i] / total) * 360;
            let colour = color(colourArray[Math.floor(Math.random()* colourArray.length)])
            fill(colour);
            // console.log(Math.floor(Math.random() * colourArray.length+ 1))
            //arc() generates a sector of a circle
            arc(
                this.posX,
                this.posY,
                this.diameter,
                this.diameter,
                angle,
                angle + radians(degrees),
                PIE);

            // Add last angle to angle variable, sets starting position of next arc
            angle += radians(degrees);
            // console.log(data[i]/total*360)
        }
    }
}
