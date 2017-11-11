/*
    The progressBar class is created and manages the download indicator.
    This class contains a class constructor and 4 methods getValue, rotation, hide, setValue.
    The mechanics of the download indicator I tried to realize on the basis of how most of the carousels work,
    that is, an empty block is created, an id is assigned for it, according to which the class creates updates.

    The constructor of the constructor class (data = {id: string, width: number, speed: string}) - to the constructor
    of the class an object is transmitted that contains:
    id (identifier of the block that will be the download indicator), width (width of the indicator ring),
    speed ([ms] fill time of the load indicator). Constructor of a set of initial values ??of variables
    class to be used when it is loaded. It was decided to put in a class constructor
    forming the DOM tree of our indicator.

    rotation (bool) - this method starts the download loading animation. The input parameter is Boolean
    variable. Animation implemented using css animation and activated / activated by adding / removing a class
    "ProgressBar__circle_rotation"

    hide (bool) - this method controls the visibility of the download indicator. The input parameter is Boolean
    variable. The visibility control is implemented by means of css and is activated / deactivated by adding / removing a class
    "ProgressBar_hidden"

    getValue (string) - this method gets the values ??of the load indicators checks it and
    passes this value to the setValue method.

    setValue () - this method controls the degree of filling of the indicator. The number is recalculated from 0
    to 100 in the length of the arc indicator and start the fill animation. SVG animation is used in this project.
*/

class progressBar{

    constructor(data={id: "", width: "", speed: ""}){
        this.value = 0;
        this.circleLenght = 0;
        this.progressBarSkin = document.getElementById(data.id);
        createDOM(this.progressBarSkin, this);
        this.figure = this.progressBarSkin.getElementsByTagName("svg")[0].getElementById("progressBar__circle");
        this.animationAtts = this.progressBarSkin.getElementsByTagName("svg")[0].getElementById("progressBar__animation");
        this.figure.setAttribute("stroke-dasharray", (this.circleLenght*this.value)/100 + ' '+ this.circleLenght);
        function createDOM(elem, obj){
            var cx = elem.clientWidth/2;
            var cy = elem.clientWidth/2;
            var r = elem.clientWidth/2 - data.width;
            obj.circleLenght = 2*3.14*r;
            elem.innerHTML =
                ' <svg width="100%" height="100%" class="progressBar">\n' +
                '        <circle class="progressBar__background" cx="'+cx+'" cy="'+cy+'" r="'+r+'" stroke="#efefec" stroke-width="'+data.width+'" fill="none" opacity="0.5"></circle>\n' +
                '        <circle id="progressBar__circle" cx="'+cx+'" cy="'+cy+'" r="'+r+'" stroke="#ffdb4d" stroke-width="'+data.width+'"   stroke-dasharray ="0 700"  fill="none" >\n' +
                '           <animate\n' +
                '               attributeName="stroke-dasharray"\n' +
                '               dur="'+data.speed+'"\n' +
                '               begin="indefinite"\n' +
                '               fill="freeze"\n' +
                '               id="progressBar__animation"\n' +
                '           />\n' +
                '        </circle>\n' +
                ' </svg>'
        };
    }

    setValue(value) {
        this.animationAtts.setAttribute("from", (this.circleLenght*this.value)/100 + ' '+ this.circleLenght);
        this.value = value;
        this.animationAtts.setAttribute("to", (this.circleLenght*this.value)/100 + ' '+ this.circleLenght);
        this.animationAtts.beginElement();
    }

    hide(value){
        if (value == true){
            if(!this.progressBarSkin.getElementsByTagName("svg")[0].classList.contains("progressBar_hidden")) {
                this.progressBarSkin.getElementsByTagName("svg")[0].classList.add("progressBar_hidden")
            }
        }else{
            if(this.progressBarSkin.getElementsByTagName("svg")[0].classList.contains("progressBar_hidden")) {
                this.progressBarSkin.getElementsByTagName("svg")[0].classList.remove("progressBar_hidden")
            }
        }
    }

    rotation(value){
        if (value == true){
            if(!this.figure.classList.contains("progressBar__circle_rotation")) {
                this.figure.classList.add("progressBar__circle_rotation")
            }
        }else{
            if(this.figure.classList.contains("progressBar__circle_rotation")) {
                this.figure.classList.remove("progressBar__circle_rotation")
            }
        }
    }

    getValue(value){
        if ((value <= 100) && (value >= 0)) {
            this.setValue(value);
        } else {
            if (value > 100) {
                this.setValue(100);
            } else {
                this.setValue(0);
            }
            console.log("íåäîïóñòèìîå çíà÷åíèå value");
        }
    }
}

// Initializing the download indicator
let progress1 = new progressBar(data={id:'progressBar1', width:'9', speed:'0.5s'});

/*
    This test task was implemented within two days. I think it's long. This amount of time
    was spent in connection with the fact that initially it was chosen in my opinion the wrong algorithm and the
    implementation technique task. Nevertheless, I corrected my way and what happened as a result, I personally have
    like...
    In this implementation, as many as many download indicators can be created on one page
    which can be controlled without unnecessary manipulation.
*/
