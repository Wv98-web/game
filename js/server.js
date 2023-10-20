const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
	// 设置CORS头部，允许所有来源访问
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');

	if (req.method === 'OPTIONS') {
		// 处理预检请求
		res.writeHead(204);
		res.end();
		return;
	}
	if (req.url === '/game_list.json') {
		// 读取JSON文件并将其发送给客户端
		fs.readFile('../database/game_list.json', 'utf8', (err, data) => {
			if (err) {
				res.writeHead(500);
				res.end();
				return;
			}

			try {
				let arr = JSON.parse(data);
				let obj = {};
				arr.forEach((item) => {
					let category = item?.category;
					if (!obj.hasOwnProperty(category)) {
						obj[category] = [];
					}
					obj[category].push(item);
				});
				Object.keys(obj).forEach((item) => {
					let str = item ? item.replace(/ /g, '_') : `Other`;
					fs.writeFileSync(`../database/${str}.json`, JSON.stringify(obj[item]));
				});
			} catch (error) {}
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(data);
		});
	} else {
		res.writeHead(404);
		res.end();
	}
});

const port = 3000;
server.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
