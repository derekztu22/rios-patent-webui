// tableJson=[{"label":"1","col":"asf"}, {"label":"2","col":"2143"}, {"label":"3","col":"rfds"}]
// headData=[]
// tableData=[]
// for (const [key, value] of Object.entries(tableJson[0])) {
//     headData.push({tableTitle:key})
// }
// tableJson.forEach(element => {
//     row=[]
//     for (const [key, value] of Object.entries(element)) {
//         row.push({value:value})
//     }
//     tableData.push(row)
// });

// console.log(headData)
// console.log(tableData)


function GenNonDuplicateID(randomLength) {
    return Number(Math.random().toString().substr(2, randomLength) + Date.now()).toString(36)
}
var a={}
var ID=GenNonDuplicateID()
console.log(ID)
console.log("a: "+JSON.stringify(a))
a[ID]={status:true}
console.log("a: "+a)
console.log("a: "+JSON.stringify(a))
delete a[ID]
console.log(a)
