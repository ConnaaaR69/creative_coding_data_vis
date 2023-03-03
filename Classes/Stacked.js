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
    render(_title) {
       this.drawXAxis();
       this.drawYAxis();
       this.drawLegend(_title)
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
     */
    drawData() {
        for (let x = 0; x < this.data1.length; x++) {
            push();
            // ellipse(this.posX,this.posY,25)
            // // translate(this.posX, this.posY)
            // rotate(20)
            // translate(-this.width+(this.marginLeft + (x * this.masterGap)), 0)
            // noStroke()
            // // fill(this.data1[x]+50, 100 ,100) 
            // fill(78, 168, 222)
            // rect(this.posX, this.posY, this.blockWidth, this.scale(-this.data1[x]));
            translate(this.posX, this.posY)
            rotate(90)
            translate(-this.width+(this.marginLeft + (x * this.masterGap)), 0)
            noStroke()
            fill(78, 168, 222)
            rect(0, 0, this.blockWidth, this.scale(-this.data1[x]));

            for(let i = 0; i < this.data2.length; i++){

                fill(41,131,163)
                rect(0, -this.scale(this.data1[x]),this.blockWidth,this.scale(-this.data2[i]))
            }
            pop();
        }
    }

    /**
     * Draws the axis lines of a bar chart
     * @param {number} _rotation - Enter a number between 0 - 359 for rotation
     * @param {boolean} _labels - Enable Y Axis data labels
     * @param {number} _lengthTicks - Length of Y axis marker ticks
     * @param {boolean} _grid - Enable or disable gridlines
    */
      drawYAxis(_rotation = 0, _labels = true, _lengthTicks = 10) {
        let _numTicks = this.data1.length
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
 
        for (let x = this.data1.length-1; x >= 0; x--) {
            console.log(x)
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
                text(table.getRows()[x].arr[0], -_lengthTicks, -(this.marginLeft + (this.blockWidth / 2) + (x * this.masterGap)));
            }
        }
        pop();

    }
    drawXAxis(_rotation = 90, _labels = true, _lengthTicks = 10) {
        
        let _numTicks = this.data1.length
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
            line(0, x * -tickgap, _lengthTicks, x * -tickgap);
            stroke(50)
            line(0, x * -tickgap, -this.height, x * -tickgap)
            noStroke();


            if (_labels) {
                textSize(15);
                textAlign(LEFT, CENTER);
                text(Math.round((x * numGap) / 5) * 5, _lengthTicks, x * -tickgap);
            };
        }
        pop();
    }


    drawLegend(_title){
        fill(200)
        textSize(18);
        textStyle(BOLD);
        textAlign(CENTER,CENTER)

        //Chart Heading
        text(`${_title}`, this.posX + this.width/2, this.posY - this.height - 40 )

        //text style resets
        textSize(15);
        textStyle(NORMAL);
        text(`${table.columns[0]}`,this.posX + this.width /2, this.posY + 50)
        push()
        
        // translate(this.posY,this.posX)
        // rotate(20)
        text(table.columns[0] + 'aaaaaaaaaaaaaaaaaaaaaaa' ,0 , 0)
        
        pop()
    }

}