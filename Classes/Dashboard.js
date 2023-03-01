class Dashboard {
    constructor(_size, _numCharts){
        this.canvasSize = _size;
        this.chartNumber = _numCharts;
        this.dataSets = [];
        this.dataFile;
    }

    canvas(){
        createCanvas(this.canvasSize,this.canvasSize);
    }

    addDataset(arr){
        this.dataSets.push(arr);
    }

    createCharts(){
        
    }

    handleFile(file){
        this.dataFile = file
    }

    fileUpload() {
        input = createFileInput(this.handleFile);
        input.position(10, 10);
    }
}