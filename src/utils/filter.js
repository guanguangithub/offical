function filter(data){
    var _this = this;
    var obj = {};
    data.forEach(function(item) { //分组
        var first = item.Spelling.slice(0, 1)
  
        if (!obj[first]) {
            obj[first] = {
                title: first,
                list: []
            }
        }
  
        obj[first].list.push(item)
  
    })
    var targetArr = [];
    for (var i in obj) {
        targetArr.push(obj[i])
    }
    console.log(targetArr)
    return targetArr
  }
  export default filter