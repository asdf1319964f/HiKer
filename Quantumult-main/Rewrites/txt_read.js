/***************************
主要用于预览yaml及snippet 等Safari需要下载的文本
在需要预览的链接末尾加上.t_read.txt
[Rewrite]
^https:\/\/.*\.t_read\.txt$ url script-response-body https://raw.githubusercontent.com/Toperlock/Quantumult/main/Rewrites/txt_read.js

[MITM]
hostname = github.com, raw.githubusercontent.com, gitlab.com, gist.githubusercontent.com, gitlab.com
****************************/


let req = $request.url.replace(/\.t_read\.txt$/, '');

http(req)
  .then((body) => {
    $done({
      response: {
        status: 200,
        body: body,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      }
    });
  })
  .catch((e) => {
    $notification.post(`${e}`, '', '');
    $done();
  });

function http(req) {
  return new Promise((resolve, reject) => {
    $httpClient.get(req, (error, response, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
