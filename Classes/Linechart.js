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
        // console.log('Drawing!')
        for (let x = 0; x < this.data.length; x++) {
            push();
            rotate(0)
            translate(this.marginLeft + (x * this.masterGap), 0)
            noStroke()
            
            fill(200, 100 ,100) 
            rect(this.posX, this.posY, this.blockWidth, this.scale(-this.data[x]));
            
            push()
            
            if (x >= 1) {
                stroke(255)
                strokeWeight(3);
                
                translate(this.posX, this.posY)
                line(this.blockWidth / 2 - this.masterGap, this.scale(-this.data[x-1]/2), this.blockWidth / 2, this.scale(-this.data[x]/2))
                
            }
            // fill(255);
            ellipse(this.blockWidth / 2, this.scale(-this.data[x])/2, 5, 5)
            
            pop()
            // noStroke();
           
            pop();
        }
    }
   


    /**
     * Draws the axis lines of a bar chart
     * @param {number} _rotation - enter a number between 0 - 359 for rotation
     * @param {boolean} _labels - enable Y Axis data labels
     * @param {number} _lengthTicks - length of Y axis marker ticks
     */
    drawAxis(_rotation = 0, _labels = true, _lengthTicks = 10) {
        let _numTicks = this.data.length
        let tickgap = this.height / (_numTicks);
        let numGap = this.maxValue / (_numTicks);
        push();
        translate(this.posX, this.posY);
        angleMode(DEGREES);
        rotate(_rotation);
        stroke(100);
        strokeWeight(1);
        line(0, 0, 0, -this.height);
        // line(0, 0, this.width, 0);

        //draws ticks
        for (let x = 0; x < _numTicks + 1; x++) {
            fill(200);
            stroke(200  );
            line(0, x * -tickgap, -_lengthTicks, x * -tickgap);
            noStroke();
            

            if (_labels) {
                textSize(15);
                textAlign(RIGHT, CENTER);
                // text((x * numGap), -10, x * -tickgap);
                text(Math.round(((x * numGap)/5)*5), -10, x * -tickgap);
            };
        }
        pop();

    }

}