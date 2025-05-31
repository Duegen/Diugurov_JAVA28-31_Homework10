let litmir = [
    { author: "Orwell", title: "1984"},
    { author: "Nesbo", title: "Knife"},
    { author: "Caroll", title: "Alice in Wonderland"},
    { author: "Gogol", title: "Viy"}
];

console.log(litmir.sort(function (a, b){
    if (a.title < b.title) return -1;
    else return 1;
}))

let results = [
    {name: 'Vasya', points: 150},
    {name: 'Moshe', points: 120},
    {name: 'Lisa', points: 100},
    {name: 'Boruh', points: 150},
    {name: 'Sam', points: 120},
    {name: 'Lida', points: 200}
];

console.log(results.sort(function (a, b){
    if(a.points < b.points) return 1;
    else{
        if(a.points > b.points) return -1;
        else{
            if(a.name < b.name) return -1;
            else return 1;
        }
    }
}))