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
    '.data': 'application/octet-stream',
    '.pdf': 'application/pdf',
    '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    // PDF 파일 요청 로그
    if (filePath.includes('.pdf')) {
        console.log(`📋 PDF 요청: ${filePath}`);
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                console.error(`❌ 파일 없음: ${filePath}`);
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                console.error(`❌ 서버 오류: ${error.code} - ${filePath}`);
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`, 'utf-8');
            }
        } else {
            // PDF 파일 로드 성공 로그
            if (filePath.includes('.pdf')) {
                console.log(`✓ PDF 로드 성공: ${filePath} (${content.length} bytes)`);
            }
            // gzip 파일인 경우 Content-Encoding 헤더 추가
            if (filePath.endsWith('.gz')) {
                res.writeHead(200, {
                    'Content-Type': contentType,
                    'Content-Encoding': 'gzip',
                    'Content-Length': content.length
                });
                res.end(content, 'binary');
            } else if (extname === '.pdf' || extname === '.wasm') {
                res.writeHead(200, {
                    'Content-Type': contentType,
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

