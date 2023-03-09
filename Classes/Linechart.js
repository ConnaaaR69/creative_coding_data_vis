class Linechart {
    
    constructor(_height, _width, _posX, _posY, _data1,_data2, _marginL, _marginR, _blockGap) {
        this.height = _height;
        this.width = _width;
        this.posX = _posX;
        this.posY = _posY;
        this.data1 = _data1;
        this.data2 = _data2;
        this.maxValue = Math.max(...this.data1) + Math.max(...this.data2)
        this.numBlocks = this.data1.length
        this.blockGap = _blockGap
        this.marginLeft = _marginL;
        this.marginRight = _marginR;
        this.blockWidth = (this.width - (this.marginLeft + this.marginRight) - ((this.numBlocks - 1) * this.blockGap)) / this.numBlocks;
        this.masterGap = this.blockWidth + this.blockGap
    }


    /**
     * This renders the barchart in its entireity if no optional values for drawData and drawAxis methods need passing
     * @param {string} _title the title of the chart
     */
    render(_title) {
        this.drawYAxis()
        this.drawXAxis()
        this.drawLegend(_title)
        this.drawData()
    }


    /**
     * Scales values to fit chart, used in the drawData method.
     * @param {number} _num 
     * @returns 
     */
    scale(_num) {
        let scaleValue = this.height / this.maxValue;
        return _num * scaleValue

    }

    /**
     * Draws the bars for the bar chart with the data defined in the data attribute
     */
    drawData() {
        for (let x = 0; x < this.data1.length; x++) {
            //draw data bars
            push();
            translate(this.marginLeft + (x * this.masterGap), 0)
            noStroke()
            
            let c = map(this.data1[x], Math.min(...this.data1), Math.max(...this.data1),90, 200);
            fill(61, c, 210)
            rect(this.posX, this.posY, this.blockWidth, this.scale(-this.data1[x]));

            strokeWeight(1.5)
            stroke(40)
            c = map(this.data2[x], Math.min(...this.data2), Math.max(...this.data2),90, 200);
            fill(61, c, 210)
            for(let i = 0; i < this.data2.length; i++){
                rect(this.posX, this.posY-this.scale(this.data1[x]),this.blockWidth,this.scale(-this.data2[i]))
            }
            
            //draw comparison median line
            if (x > 0) {
                stroke(180)
                fill(180)
                strokeWeight(3);
                
                translate(this.posX, this.posY)
                line(this.blockWidth / 2 - this.masterGap, this.scale(-this.data1[x-1])-this.scale(-this.data2[x-1])/2, this.blockWidth / 2, this.scale(-this.data1[x])-this.scale(-this.data2[x])/2)
                
            }
            ellipse(this.blockWidth / 2, this.scale(-this.data1[x])-this.scale(-this.data2[x])/2, 5, 5)
            //draw mean line dots
            // fill(138, 48, 162);
            
           
            pop();
        }
    }

    /**
     * Draws the axis lines of a bar chart
     * @param {number} _rotation - enter a number between 0 - 359 for rotation
     * @param {boolean} _labels - enable Y Axis data labels
     * @param {number} _lengthTicks - length of Y axis marker ticks
     * @param {boolean} _grid - enable or disable gridlines
     */
    drawYAxis(_labels = true, _lengthTicks = 10) {
        let _numTicks = this.data1.length
        let tickgap = this.height / (_numTicks);
        let numGap = this.maxValue / (_numTicks);
        push();

        translate(this.posX, this.posY);
        angleMode(DEGREES);
        
        stroke(100);
        strokeWeight(1);
        line(0, 0, 0, -this.height);
        // line(0, 0, this.width, 0);

        //draws ticks
 
        for (let x = 0; x < _numTicks + 1; x++) {
            fill(200);
            stroke(200);
            
            line(0, x * -tickgap, -_lengthTicks, x * -tickgap);
            stroke(50)
            line(0, x * -tickgap, this.height, x * -tickgap)
            
            noStroke();
            if (_labels) {
                textSize(15);
                // series label
                textAlign(RIGHT, CENTER);
                text(Math.round((x * numGap) / 5) * 5, -10, x * -tickgap);
            };
        }
        push()
            rotate(90)
            textAlign(CENTER, CENTER);
            textSize(12)
            text(`${table.columns[1]} (Bottom) \n & ${table.columns[2]} (top)`,-this.height/2, _lengthTicks * 6)
            pop()
        pop();

    }
    /**
     * 
     * @param {number} _rotation defaults to 90, sets the rotation of the x axis line
     * @param {boolean} _labels Toggles axis values
     * @param {number} _lengthTicks Sets length of axis graduations
     */
    drawXAxis(_rotation = 90, _labels = true, _lengthTicks = 10) {
        let _numTicks = this.data1.length
        let tickgap = this.height / (_numTicks);
        push();

        translate(this.posX, this.posY);
        angleMode(DEGREES);
        rotate(_rotation);
       
        
        stroke(100);
        strokeWeight(1);
        line(0, 0, 0, -this.height);

        //draws ticks
        for (let x = 0; x < this.data1.length; x++) {
            fill(200);
            stroke(200);
            line(10, x * -tickgap, _lengthTicks, x * -tickgap);
            stroke(50)
            line(0, (x+1) * -tickgap, -this.height, (x+1) * -tickgap)
            noStroke();

            if (_labels) {
                textSize(15);
                textAlign(RIGHT, CENTER);
                text(table.getRows()[x].arr[0], 40, -(this.marginLeft + (this.blockWidth / 2) + (x * this.masterGap)));
            };
        }
            push()
            rotate(-90)
            textAlign(CENTER, CENTER);
            textSize(12)
            text(`${table.columns[0]}`, this.width/4 + this.height/4,-this.height/2 + this.width/2 + 50)
            pop()
        pop();
    }

    /**
     * @param {String} _title Title of Chart in string format
     */
    drawLegend(_title){
        if(!typeof _title === "string"){
            throw ('Chart Title is Not a String!')
        }
        fill(200)
        textSize(18);
        
        textStyle(BOLD);
        textAlign(CENTER,CENTER)

        //Chart Heading
        text(`${_title}`, this.posX + this.width/2, this.posY - this.height - 40 )
    }
}