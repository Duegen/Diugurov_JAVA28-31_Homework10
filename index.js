const btn_add = document.querySelector('.add');
const btn_clear = document.querySelector('.clear');
const info = document.querySelectorAll('.left p')
const last = document.querySelectorAll('.right p');
const right = document.querySelector('.right');

const random_set = 5;
const random_max = 36;
const random_min = 1;
const func_arr = [
    {title: "Random numbers", func: arr_to_string},
    {title: "Max number", func: get_max},
    {title: "Min number", func: get_min},
    {title: "Average value", func: get_avg},
    {title: "Odd count", func: get_odd},
    {title: "Even count", func: get_even}
]

btn_add.onclick = function () {
    let base_numbers = [];
    for (let i = random_min; i <= random_max; i++) {
        base_numbers[i - random_min] = i;
    }
    base_numbers.sort(function () {
        return Math.random() - 0.5;
    })
    let random = base_numbers.slice(0, random_set);
    random.sort(function (a, b) {
        return a - b;
    });
    let stat = Statisctics(func_arr, random);
    print_stat(stat)
    add_number(stat)
}

btn_clear.onclick = function () {
    const choice = confirm("Are you sure?")

    if (choice) {
        for (let i = 0; i < info.length; i++)
            info[i].innerHTML = func_arr[i].title + ": -";
        for (let i = 0; i < last.length; i++)
            last[i].innerHTML = "";
        right.setAttribute('data-index', "0");
    }
}

function arr_to_string(massive) {
    return massive.toString();
}

function get_min(massive) {
    // let min = Number.MAX_SAFE_INTEGER;
    // for (let i = 0; i < massive.length; i++)
    //     if (massive[i] < min) min = massive[i];
    // return min;
    return massive[0];
}

function get_max(massive) {
    // let max = Number.MIN_SAFE_INTEGER;
    // for (let i = 0; i < massive.length; i++)
    //     if (massive[i] > max) max = massive[i];
    // return max;
    return massive[massive.length - 1]
}

function get_avg(massive) {
    let avrg = 0;
    for (let i = 0; i < massive.length; i++)
        avrg += massive[i];
    return avrg / massive.length;
}

function get_odd(massive) {
    let count = 0;
    for (let i = 0; i < massive.length; i++)
        if (massive[i] % 2) count++;
    return count;
}

function get_even(massive) {
    let count = 0;
    for (let i = 0; i < massive.length; i++)
        if (!(massive[i] % 2)) count++;
    return count;
}

function Statisctics(func_array, massive) {
    const stat = {};
    for (let i = 0; i < func_array.length; i++) {
        stat[func_array[i].title] = func_array[i].func(massive)
    }
    return stat;
}

function print_stat(stat_obj) {
    let entries = Object.entries(stat_obj)
    for (let i = 0; i < entries.length; i++) {
        info[i].innerHTML = `<p>${entries[i][0]}: ${entries[i][1]}</p>`
    }
}

function add_number(stat_obj) {
    let index = Number(right.getAttribute('data-index'));
    let massive = [];
    const random_str = Object.values(stat_obj)[0];

    for (let i = index; i > 0; i--) {
        last[i].innerHTML = last[i - 1].innerHTML;
        last[i].onclick = function () {
            massive = last[i].innerHTML.split(',').map(Number);
            print_stat(Statisctics(func_arr, massive));
        }
    }
    last[0].innerHTML = random_str;
    last[0].onclick = function () {
        print_stat(stat_obj);
    }
    last[index].style.display = "block";
    if (index < last.length - 1)
        right.setAttribute('data-index', (index + 1).toString());
}