import request from '@/api/request'

export function fileupload(formData) {
  return request({
    url:'api/sys/upload',
    method:'post',
    formData,
    headers : {
      processData: false,// 告诉axios不要去处理发送的数据
      "Content-Type": "multipart/form-data;boundary="+new Date().getTime()
    },
  });
}
