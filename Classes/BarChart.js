class BarChart {
    constructor(_height, _width, _posX, _posY, _data, _marginL, _marginR, _blockGap, _rotation = 0) {

        this.height = _height;
        this.width = _width;
        this.posX = _posX;
        this.posY = _posY;
        this.data = _data;
        this.maxValue = this.scaleMax();
        this.minValue = Math.min(...this.data);
        this.numBlocks = this.data.length
        this.blockGap = _blockGap
        this.marginLeft = _marginL;
        this.marginRight = _marginR;
        this.blockWidth = (this.width - (this.marginLeft + this.marginRight) - ((this.numBlocks - 1) * this.blockGap)) / this.numBlocks;
        this.masterGap = this.blockWidth + this.blockGap
        this.scaleval  = 0
    }

    /**
     * This renders the barchart in its entireity if no optional values for drawData and drawAxis methods need passing
     */
    render(_title) {
        this.drawYAxis();
        this.drawXAxis();
        this.drawLegend(_title)
        this.drawData(); 
    }

    /**
     * 
     * @param {Array} arr - data to be scaled
     */
    scaleData(arr){
        //Value, Index, Array VV
        let data = arr.map((v,i,a) => i ? Math.abs(v - a[i-1]) : Math.abs(0 - v))
        data.shift()


        //reassign values
        this.data = data
        this.numBlocks = data.length
        this.blockWidth = (this.width - (this.marginLeft + this.marginRight) - ((this.numBlocks - 1) * this.blockGap)) / this.numBlocks;
        this.masterGap = this.blockWidth + this.blockGap
        this.maxValue = Math.max(...data);
        
        
    }

    /**
     * Scales individual values to fit chart, used in the drawData method.
     * @param {number} _num 
     * @returns float for data elements to be multiplied by to scale data inside chart
     */
    scale(_num) {
        let scaleValue = this.height / this.maxValue ;
        return (_num * scaleValue)  
    }

    /**
     * Helps scale axis for even, nice looking scale labels
     * @returns new max value that scales evenly between data length and 100
     */
    scaleMax() {
        let max = 0;
        max = Math.max(...this.data)
        let TotalNum = 2000;
        for(let x = max; x < TotalNum; x++) {
            if(x % this.data.length==0 && x % 100==0) {
                max = x;
                break;
            }
        }
        return max;
    }

    /**
     * Draws the bars for the bar chart with the data defined in the data attribute
     * @param {number} _rotation - rotates the graph, currently only 0 and 90 supported
     */
    drawData() {
        // Draws Bars 
        // this.scaleData(this.data)
        // this.maxValue = Math.abs(Math.max(...this.data))
        for (let x = 0; x < this.data.length; x++) {
            push();
            translate(this.posX, this.posY)
            translate(this.marginLeft + (x * this.masterGap), 0)
            noStroke()
            let c = map(this.data[x], this.minValue, this.maxValue,90, 200)
            fill(61, c, 210)
            rect(0, 0, this.blockWidth, this.scale(int(-this.data[x])));
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

        //text style resets
        textSize(15);
        textStyle(NORMAL);
        
        push()
        translate(this.posY + 40,this.posX)
        rotate(90)
        pop()
    }

    /**
     * Draws the axis lines of a bar chart
     * @param {boolean} _labels - enable Y Axis data labels
     * @param {number} _lengthTicks - length of Y axis marker ticks
     */
    drawYAxis( _labels = true, _lengthTicks = 10) {
        let _numTicks = this.data.length
        let tickgap = this.height / (_numTicks);
        let numGap = this.maxValue / (_numTicks);

        push();
        translate(this.posX, this.posY);

        //Draw Axis line
        stroke(100);
        strokeWeight(1);
        line(0, 0, 0, -this.height);

        //draws ticks
        for (let x = 0; x < _numTicks + 1; x++) {
            fill(200);
            stroke(200);
            line(0, x * -tickgap, -_lengthTicks, x * -tickgap);

            //grid line
            stroke(50)
            line(0, x * -tickgap, this.height, x * -tickgap)
            noStroke();

            if (_labels) {
                // Axis Values
                textSize(15);
                textAlign(RIGHT, CENTER);
                text(Math.round((x * numGap) / 5) * 5, -10, x * -tickgap);
            };
        }
        push()
            //Axis Label
            rotate(90)
            textAlign(CENTER, CENTER);
            textSize(12)
            text(`${table.columns[2]}`,-this.height/2, _lengthTicks * 5)
            pop()
        pop();

    }
    
    drawXAxis( _labels = true, _lengthTicks = 10) {
        let _numTicks = this.data.length -1
        let tickgap = this.width / _numTicks;

        push();
        translate(this.posX, this.posY);
        angleMode(DEGREES);
        
        //Draw Axis Line
        stroke(100);
        strokeWeight(1);
        line(0, 0, this.width, 0);

        //draws ticks
        for (let x = 0; x < this.data.length -1; x++) {
            fill(200);
            //tick marks
            stroke(200);
            line(this.marginLeft + (x * this.masterGap), 0, this.marginLeft + (x * this.masterGap), _lengthTicks); 

            //grid
            stroke(50)
            line((x+1) * tickgap,0,(x+1) * tickgap,  -this.height )
            noStroke();


            if (_labels) {
            //Scale Values
            textSize(15);
            textAlign(RIGHT, CENTER);
            push()
            rotate(90)
            //Series Labels
            text(table.getRows()[x].arr[0], 45,(-x * tickgap) - (this.blockWidth/2));
            pop()
            };
        }
            push()
            textAlign(CENTER, CENTER);
            textSize(12)
            // Axis Label
            text(`${table.columns[0]}`, this.width/4 + this.height/4, _lengthTicks * 6)
            pop()
        pop();
    }
}