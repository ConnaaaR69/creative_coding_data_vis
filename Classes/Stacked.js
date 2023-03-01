class Stacked {
    constructor(_height, _width, _posX, _posY, _data1,_data2, _marginL, _marginR, _blockGap) {
        this.height = _height;
        this.width = _width;
        this.posX = _posX;
        this.posY = _posY;
        this.data1 = _data1;
        this.data2 = _data2;
        this.maxValue = Math.max(...this.data1) + Math.max(...this.data2);
        this.numBlocks = this.data1.length
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
    roundNearest5(num) {
        return 
      }

    /**
     * Draws the bars for the bar chart with the data defined in the data attribute
     */
    drawData() {

        for (let x = 0; x < this.data1.length; x++) {
            push();
            translate(this.marginLeft + (x * this.masterGap), 0)
            noStroke()
            fill(this.data1[x]+50, 100 ,100) 
            rect(this.posX, this.posY, this.blockWidth, this.scale(-this.data1[x]));

            
            for(let i = 0; i < this.data2.length; i++){
                fill(100, 100 ,this.data1[x]+75) 
                // console.log(this.data1[x])
                console.log(this.scale(this.data1[x]))
                rect(this.posX, this.posY-this.scale(this.data1[x]),this.blockWidth,this.scale(-this.data2[i]))
            }
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
        let _numTicks = this.data1.length
        
        let tickgap = this.height / (_numTicks);
        let numGap = this.maxValue / (_numTicks);
        console.log(this.maxValue)
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
            console.log(numGap)

            if (_labels) {
                textSize(15);
                textAlign(RIGHT, CENTER);
                // text((x * numGap), -10, x * -tickgap);
                
                text(Math.round((x * numGap) / 5) * 5, -10, x * -tickgap);
                // text(Math.ceil(((x * numGap)/5)*5), -10, x * -tickgap);
                
                
            };
        }
        pop();

    }

}