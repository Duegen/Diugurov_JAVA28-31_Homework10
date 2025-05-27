const btn_add = document.querySelector('.add');
const btn_clear = document.querySelector('.clear');
const info = document.querySelectorAll('.left p')
const last = document.querySelectorAll('.right p');
const right = document.querySelector('.right');

btn_add.onclick = function (){
    let random = new Array(5);
    for (let i = 0; i < 5; i++){
        random[i] = Math.floor(Math.random()*36) +1;
    }
    let random_str = random.toString()
    print_stat(random_str)
    add_number(random_str)
}

btn_clear.onclick = function () {
    const choice = confirm("Are you sure?")
    if (choice) {
        for (let i = 0; i < info.length; i++)
            info[i].innerHTML = info[i].getAttribute('data-title') + "-";
        for (let i = 0; i < last.length; i++)
            last[i].innerHTML = "";
        right.setAttribute('data-index', "0");
    }
}

function min(massive){
    let min = Number.MAX_SAFE_INTEGER;
    for(let i = 0; i < massive.length; i++)
        if(massive[i] < min) min = massive[i];
    return min;
}
function max(massive){
    let max = Number.MIN_SAFE_INTEGER;
    for(let i = 0; i < massive.length; i++)
        if(massive[i] > max) max = massive[i];
    return max;
}
function avg(massive){
    let avrg = 0;
    for(let i = 0; i < massive.length; i++)
        avrg += massive[i];
    return avrg/massive.length;
}
function Statisctics(min, max, avrg, massive){
    const stat = {
        'Min value' : min(massive),
        'Max value': max(massive),
        'Average': avrg(massive)
    }
    return stat;
}
function print_stat(random_str){
    info[0].innerHTML = info[0].getAttribute('data-title') + random_str
    let random = random_str.split(',').map(Number);
    for (let i = 1; i < 4; i++) {
        info[i].innerHTML = info[i].getAttribute('data-title') + Object.values(Statisctics(min, max, avg, random))[i-1];
    }

}

function add_number(random_str) {
    let index = Number(right.getAttribute('data-index'));
    // if (index === 5) {
        for (let i = index; i > 0; i--) {
            last[i].innerHTML = last[i - 1].innerHTML;
            last[i].onclick = function () {
                print_stat(last[i].innerHTML);
            }
        }
        last[0].innerHTML = random_str;
        last[0].onclick = function () {
            print_stat(last[0].innerHTML);
        }
    last[index].style.display = "block";
        if(index < last.length - 1){

            right.setAttribute('data-index', (index + 1).toString());
        }
}