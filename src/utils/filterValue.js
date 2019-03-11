//根据输入的选项重数组中选择
export  function filterValueBySelect(group,select) {
  let result = [];
  group.forEach(item=>{
    result.push(item[select]);
  });
  return result;
}


