class HBarChart {
    constructor(_height, _width, _posX, _posY, _data, _marginL, _marginR, _blockGap, _rotation = 0) {

        this.height = _height;
        this.width = _width;
        this.posX = _posX;
        this.posY = _posY;
        this.data = _data;
        this.maxValue = this.calculateMax();
        this.minValue = Math.min(...this.data);
        this.numBlocks = this.data.length;
        this.blockGap = _blockGap;
        this.marginLeft = _marginL;
        this.marginRight = _marginR;
        this.blockWidth = (this.width - (this.marginLeft + this.marginRight) - ((this.numBlocks - 1) * this.blockGap)) / this.numBlocks;
        this.masterGap = this.blockWidth + this.blockGap;
    }

    /**
     * This renders the barchart in its entireity if no optional values for drawData and drawAxis methods need passing
     */
    render(_title) {
        this.drawYAxis();
        this.drawXAxis();
        this.drawLegend(_title);
        this.drawData(); 
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
     * @param {number} _rotation - rotates the graph, currently only 0 and 90 supported
     */
    drawData() {
        for (let x = 0; x < this.data.length; x++) {
            push();
            translate(this.posX, this.posY)
            rotate(90)
            translate(-this.width+(this.marginLeft + (x * this.masterGap)), 0)
            noStroke()
            let c = map(this.data[x], this.minValue, this.maxValue,90, 200)
            fill(61, c, 210)
            rect(0, 0, this.blockWidth, this.scale(-this.data[x]));
            pop();
        }
    }

    /**
     * @param {string} _title Title of Chart in string format
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

    calculateMax() {
        let max = 0;
        max = Math.max(...this.data)
        let TotalNum = 1750;
        for(let x = max; x < TotalNum; x++) {
            if(x % this.data.length==0 && x % 100==0) {
                max = x;
                break;
            }
        }
        return max;
    }


    /**
     * Draws the axis lines of a bar chart
     * @param {number} _rotation - enter a number between 0 - 359 for rotation
     * @param {boolean} _labels - enable Y Axis data labels
     * @param {number} _lengthTicks - length of Y axis marker ticks
     * @param {boolean} _grid - enable or disable gridlines
     */
    drawYAxis( _labels = true, _lengthTicks = 10) {
        let _numTicks = this.data.length
        let tickgap = this.height / (_numTicks);
        let reverseArray = table.getColumn('Year');
        reverseArray.reverse();

        push();
        translate(this.posX, this.posY);
        textStyle(BOLD);
        stroke(100);
        strokeWeight(1);
        line(0, 0, 0, -this.height);

        //draws ticks
        
        for (let x = 0; x < _numTicks; x++) {
            //tick marks
            fill(200);
            stroke(200);
            line(0, x * -tickgap, -_lengthTicks, x * -tickgap);
            
            //gridline
            stroke(50)
            line(0, x * -tickgap, this.height, x * -tickgap)
            noStroke();
            
            if (_labels) {
                // series label
                textAlign(RIGHT, CENTER);
                text(reverseArray[x], -_lengthTicks, -(this.marginLeft + (this.blockWidth / 2) + (x * this.masterGap)));
            }
        }
        push()
            rotate(90)
            textAlign(CENTER, CENTER);
            textSize(12)
            text(`${table.columns[0]}`,-this.height/2, _lengthTicks * 5)
            pop()
        pop();
        ;
    }
    drawXAxis(_rotation = 90, _labels = true, _lengthTicks = 10) {
        
        let _numTicks = this.data.length
        let tickgap = this.height / (_numTicks);
        let numGap = this.maxValue / (_numTicks);
        
        push();
        translate(this.posX, this.posY);
        textStyle(BOLD);
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
            line(0, x * -tickgap, _lengthTicks, x * -tickgap);
            stroke(50)
            line(0, x * -tickgap,-this.height, x * -tickgap)
            noStroke();


            if (_labels) {
                textSize(15);
                textAlign(LEFT, CENTER);
                text(Math.round((x * numGap) / 5) * 5, _lengthTicks, x * -tickgap);
            };
        }
            push()
            rotate(-90)
            textAlign(CENTER, CENTER);
            textSize(12)
            
            text(`${table.columns[2]}`, this.width/4 + this.height/4, _lengthTicks * 5)
            pop()
        pop();
    }
}