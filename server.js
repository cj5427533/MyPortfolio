// Unity WebGL 게임을 위한 간단한 HTTP 서버
// gzip 파일을 올바르게 처리합니다
// 사용법: node server.js

const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PORT = 8000;
const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wasm': 'application/wasm',
    '.gz': 'application/gzip',
    '.data': 'application/octet-stream'
};

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`, 'utf-8');
            }
        } else {
            // gzip 파일인 경우 Content-Encoding 헤더 추가
            if (filePath.endsWith('.gz')) {
                res.writeHead(200, {
                    'Content-Type': contentType,
                    'Content-Encoding': 'gzip',
                    'Content-Length': content.length
                });
                res.end(content, 'binary');
            } else if (extname === '.wasm') {
                res.writeHead(200, {
                    'Content-Type': 'application/wasm',
                    'Content-Length': content.length
                });
                res.end(content, 'binary');
            } else {
                res.writeHead(200, {
                    'Content-Type': contentType,
                    'Content-Length': content.length
                });
                res.end(content, 'utf-8');
            }
        }
    });
});

server.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
    console.log('Unity WebGL 게임이 올바르게 로드됩니다.');
});

