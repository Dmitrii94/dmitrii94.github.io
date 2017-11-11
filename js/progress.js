/*
    Класс progressBar создаёт и управляет индикатором загрузки.
    Данный класс содержит конструктор класса и 4 метода getValue, rotation, hide, setValue.
    Механику индикатора загрузки я постарался реализовать на подобии того, как работают большинство каруселей,
    то есть создаётся пустой блок, для него прописывается id, по которому класс создаёт индикатор загрузки.

    Конструктор класса constructor(data={id: string, width: number, speed: string}) - в конструктор класса
    передаётся объект, который содержит:
    id (id блока, который будет являтся индикатором загрузки), width (ширина кольца индикатора),
    speed ([ms] время заполнения индикатора загрузки). Конструктор класса устанавливает начальные значения переменных
    класса, которые будут использоваться при его загрузке. Было принято решение поместить в конструктор класса
    формирование DOM дерева нашего индикатора.

    rotation(bool) - данный метод запускает анимацию вращения индикатора загрузки. Входным параметром является булевая
    переменная. Анимация реализованна при помощи css анимации и активируется/диактивируется добавлением/удалением класса
    "progressBar__circle_rotation"

    hide(bool) - данный метод управляет видимостью индикатора загрузки. Входным параметром является булевая
    переменная. Управление видимостью реализуется средствами css и активируется/диактивируется добавлением/удалением класса
    "progressBar_hidden"

    getValue(string) - данный метода получает величину заполнения индикатора загрузки проверяет его и
    передаёт это значение в метод setValue.

    setValue() - данный метод управляет степенью заполнения индикатора. Происходит пересчёт числа от 0 до 100 в длину дуги
    индикатора и запуск анимации заполнения. В данной реализации используется SVG анимация.
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
            console.log("недопустимое значение value");
        }
    }
}

// Инициализация индикатора загрузки
let progress1 = new progressBar(data={id:'progressBar1', width:'9', speed:'0.5s'});

/*
    Данное тестовое задание было реализованно втечении двух дней. Я считаю это долго. Данное количество времени
    было потраченно в связи с тем, что изначально был выбран по моему мнению неверный алгоритм и методика реализции
    поставленной задачи. Тем не менее свой путь я скорректировал и то, что получилось в итоге лично мне довольно
    нравится...
    В данной реализации на одной странице может быть созданно сколько угодно много индикаторов загрузки
    которыми без лишних манипуляций можно упровлять.
*/
