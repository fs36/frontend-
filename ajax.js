//使用promise或await解决回调地狱问题
const serverUrl='/server'
function ajax(url, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.open(method, url, true);
        
        xhr.onreadystatechange = function() {
            if (this.readyState === 4) { // 请求完成
                if (this.status >= 200 && this.status < 300) {
                    // 成功（状态码 2xx）
                    resolve(this.response);
                } else {
                    // 失败（其他状态码）
                    reject(new Error(`请求失败: ${this.status} ${this.statusText}`));
                }
            }
        };
        
        xhr.onerror = function() {
            reject(new Error('网络错误'));
        };
        
        xhr.responseType = 'json';
        xhr.setRequestHeader('Accept', 'application/json');
        
        if (method === 'POST' && data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send(null);
        }
    });
}

// 使用示例,promise链
// ajax('/api/users', 'GET')
//     .then(data1 => return ajax('api/bill','GET))
//     .then(data2 => console.log('成功:', data2))
//     .catch(err => console.error('失败:', err));
//使用示例，async/await:是promise的语法糖
// async function fetchData() {
//     try {
//         const user = await ajax('/api/user');
//         console.log('用户:', user);
        
//         const orders = await ajax('/api/orders');
//         console.log('订单:', orders);
        
//         const products = await ajax('/api/products');
//         console.log('产品:', products);
//     } catch (err) {
//         console.error('出错了:', err);
//     }
// }