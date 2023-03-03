class Linechart {
    constructor(_height, _width, _posX, _posY, _data, _marginL, _marginR, _blockGap) {
        this.height = _height;
        this.width = _width;
        this.posX = _posX;
        this.posY = _posY;
        this.data = _data;
        this.maxValue = Math.max(...this.data)
        this.numBlocks = this.data.length
        this.blockGap = _blockGap
        this.marginLeft = _marginL;
        this.marginRight = _marginR;
        this.blockWidth = (this.width - (this.marginLeft + this.marginRight) - ((this.numBlocks - 1) * this.blockGap)) / this.numBlocks;
        this.masterGap = this.blockWidth + this.blockGap
    }


    /**
     * This renders the barchart in its entireity if no optional values for drawData and drawAxis methods need passing
     */
    render() {
        // this.drawData()
        // this.drawAxis()
        // this.drawAxis(0)
    }


    /**
     * Scales values to fit chart, used in the drawData method.
     * @param {number} _num 
     * @returns 
     */
    scale(_num) {
        let scaleValue = this.height / this.maxValue;
        // console.log('scaling!')
        return _num * scaleValue

    }


    /**
     * Draws the bars for the bar chart with the data defined in the data attribute
     */
    drawData() {
        for (let x = 0; x < this.data.length; x++) {
            //draw data bars
            push();
            translate(this.marginLeft + (x * this.masterGap), 0)
            noStroke()
            
            fill(78, 168, 222)
            rect(this.posX, this.posY, this.blockWidth, this.scale(-this.data[x]));
            
            //draw mean line
            if (x >= 1) {
                stroke(239,71,111)
                strokeWeight(3);
                
                translate(this.posX, this.posY)
                line(this.blockWidth / 2 - this.masterGap, this.scale(-this.data[x-1]/2), this.blockWidth / 2, this.scale(-this.data[x]/2))
            }
            //draw mean line dots
            fill(64,86,244);
            ellipse(this.blockWidth / 2, this.scale(-this.data[x])/2, 5, 5)
           
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
    let _numTicks = this.data.length
    let tickgap = this.height / (_numTicks);
    let numGap = this.maxValue / (_numTicks);
    push();

    translate(this.posX, this.posY);
    stroke(100);
    strokeWeight(1);
    line(0, 0, 0, -this.height);

    //draws ticks
    for (let x = 0; x < _numTicks + 1; x++) {
        fill(200);
        stroke(200);
        line(0, x * -tickgap, -_lengthTicks, x * -tickgap);
        stroke(50);
        line(0, x * -tickgap, this.height, x * -tickgap);
        noStroke();

        //draws axis labels
        if (_labels) {
            textSize(15);
            textAlign(LEFT, CENTER);
            text(Math.round(((x * numGap) / 5) * 5), _lengthTicks + 10, x * -tickgap);
        };
    }
    pop();
}

   /**
     * Draws the axis lines of a bar chart
     * @param {number} _rotation - enter a number between 0 - 359 for rotation
     * @param {boolean} _labels - enable Y Axis data labels
     * @param {number} _lengthTicks - length of Y axis marker ticks
     * @param {boolean} _grid - enable or disable gridlines
     */
    drawXAxis(_labels = true, _lengthTicks = 10) {
        let _numTicks = this.data.length
        let tickgap = this.height / (_numTicks);
        push();
        // draw axis
        translate(this.posX, this.posY);
        stroke(100);
        strokeWeight(1);
        line(0, 0, 0, -this.height);

        //draws ticks
        for (let x = 0; x < this.data.length; x++) {
            fill(200);
            stroke(200);
            line(0, x * -tickgap, -_lengthTicks, x * -tickgap);
            stroke(50)
            line(0, (x+1) * -tickgap, this.height, (x+1) * -tickgap)
            noStroke();


            if (_labels) {
                textSize(15);
                textAlign(RIGHT, CENTER);
                
                text(table.getRows()[x].arr[0], -_lengthTicks, -(this.marginLeft + (this.blockWidth / 2) + (x * this.masterGap)));
            }
        }
        pop();
    }
}