let array = [1, 2, [3, 45, 67], 8, [9, 1011, [12, 13, 14, [15, 16, 1718]]], 19];


function foo(...arr) {
    let newArr = [];

    while (arr.length) {
        let next = arr.pop()
        if (Array.isArray(next)) {
            arr.push(...next)
        } else {
            newArr.push(next)
        }
    }
    return newArr.reverse()
}

console.log(foo(array))