/*
    ����� progressBar ������ � ��������� ����������� ��������.
    ������ ����� �������� ����������� ������ � 4 ������ getValue, rotation, hide, setValue.
    �������� ���������� �������� � ���������� ����������� �� ������� ����, ��� �������� ����������� ���������,
    �� ���� �������� ������ ����, ��� ���� ������������� id, �� �������� ����� ������ ��������� ��������.

    ����������� ������ constructor(data={id: string, width: number, speed: string}) - � ����������� ������
    ��������� ������, ������� ��������:
    id (id �����, ������� ����� ������� ����������� ��������), width (������ ������ ����������),
    speed ([ms] ����� ���������� ���������� ��������). ����������� ������ ������������� ��������� �������� ����������
    ������, ������� ����� �������������� ��� ��� ��������. ���� ������� ������� ��������� � ����������� ������
    ������������ DOM ������ ������ ����������.

    rotation(bool) - ������ ����� ��������� �������� �������� ���������� ��������. ������� ���������� �������� �������
    ����������. �������� ������������ ��� ������ css �������� � ������������/�������������� �����������/��������� ������
    "progressBar__circle_rotation"

    hide(bool) - ������ ����� ��������� ���������� ���������� ��������. ������� ���������� �������� �������
    ����������. ���������� ���������� ����������� ���������� css � ������������/�������������� �����������/��������� ������
    "progressBar_hidden"

    getValue(string) - ������ ������ �������� �������� ���������� ���������� �������� ��������� ��� �
    ������� ��� �������� � ����� setValue.

    setValue() - ������ ����� ��������� �������� ���������� ����������. ���������� �������� ����� �� 0 �� 100 � ����� ����
    ���������� � ������ �������� ����������. � ������ ���������� ������������ SVG ��������.
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
            console.log("������������ �������� value");
        }
    }
}

// ������������� ���������� ��������
let progress1 = new progressBar(data={id:'progressBar1', width:'9', speed:'0.5s'});

/*
    ������ �������� ������� ���� ������������ �������� ���� ����. � ������ ��� �����. ������ ���������� �������
    ���� ���������� � ����� � ���, ��� ���������� ��� ������ �� ����� ������ �������� �������� � �������� ���������
    ������������ ������. ��� �� ����� ���� ���� � �������������� � ��, ��� ���������� � ����� ����� ��� ��������
    ��������...
    � ������ ���������� �� ����� �������� ����� ���� �������� ������� ������ ����� ����������� ��������
    �������� ��� ������ ����������� ����� ���������.
*/
