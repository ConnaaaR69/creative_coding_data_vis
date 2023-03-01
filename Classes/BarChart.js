class BarChart {
    constructor(_height, _width, _posX, _posY, _data, _marginL, _marginR, _blockGap, _rotation = 0) {
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

    rotate(_angle){
        push();
        angleMode(DEGREES);
        rotate(_angle);
        pop()
        push()
        translate(-this.width,0);
        pop()
    }
    /**
     * This renders the barchart in its entireity if no optional values for drawData and drawAxis methods need passing
     */
    render() {
        this.drawYAxis();
        this.drawXAxis(90, true, 0);
        this.drawData(); 
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
     * @param {number} _rotation - rotates the graph, currently only 0 and 90 supported
     */
    drawData(_rotation = 0) {
        // console.log('Drawing!')
        for (let x = 0; x < this.data.length; x++) {
            push();
            translate(this.posX, this.posY)
            rotate(_rotation)
             if(_rotation > 45){
                
                translate(-this.width,0)
             }
            translate(this.marginLeft + (x * this.masterGap), 0)
            noStroke()
            fill(200, 100, 100)
            rect(0, 0, this.blockWidth, this.scale(-this.data[x]));

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
    drawYAxis(_rotation = 0, _labels = true, _lengthTicks = 10, _grid = true) {
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
           
            stroke(200);
            if (_rotation < 45) {
                line(0, x * -tickgap, -_lengthTicks, x * -tickgap);
                if (_grid) {
                    stroke(50)
                    line(0, x * -tickgap, this.height, x * -tickgap)
                }
            } else {
                line(0, x * -tickgap, _lengthTicks, x * -tickgap);
                if (_grid) {
                    stroke(50)
                    line(0, x * -tickgap, -this.height, x * -tickgap)
                }
            }
            noStroke();

            if (_labels) {
                textSize(15);
                
                if (_rotation > 45) {
                    textAlign(LEFT, CENTER);
                    text(Math.round(((x * numGap) / 5) * 5), 10, x * -tickgap);
                }
                else{
                    textAlign(RIGHT, CENTER);
                    text(Math.round(((x * numGap) / 5) * 5), -10, x * -tickgap);

                }
                // text((x * numGap), -10, x * -tickgap);
            };
        }
        pop();

    }
    drawXAxis(_rotation = 90, _labels = true, _lengthTicks = 10) {
        let _numTicks = this.data.length
        let tickgap = this.height / (_numTicks);
        push();

        translate(this.posX, this.posY);
        angleMode(DEGREES);
        rotate(_rotation);
       
        
        stroke(100);
        strokeWeight(1);
        line(0, 0, 0, -this.height);
        // line(0, 0, this.width, 0);

        //draws ticks
        for (let x = 0; x < this.data.length; x++) {
            fill(200);
            stroke(200);
            if (_rotation < 45) {
                line(0, x * -tickgap, -_lengthTicks, x * -tickgap);
                if (_grid) {
                    stroke(50)
                    line(0, (x+1) * -tickgap, this.height, (x+1) * -tickgap)
                }
            } else {
                line(0, x * -tickgap, _lengthTicks, x * -tickgap);
                if (_grid) {
                    stroke(50)
                    line(0, (x+1) * -tickgap, -this.height, (x+1) * -tickgap)
                }
            }
            noStroke();


            if (_labels) {
                textSize(15);
                textAlign(RIGHT, CENTER);
                // text((x * numGap), -10, x * -tickgap);
                if (_rotation < 45) {
                    text(table.rows[x].obj.Year, -_lengthTicks, -(this.marginLeft + (this.blockWidth / 2) + (x * this.masterGap)));
                    
                } else {
                    text(table.rows[x].obj.Year, 40, -(this.marginLeft + (this.blockWidth / 2) + (x * this.masterGap)));
                    
                }

            };
        }
        pop();
    }
}