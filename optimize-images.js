#!/usr/bin/env node

/**
 * 이미지 최적화 스크립트
 * 모든 PNG/JPG 이미지를 WebP로 변환하고 크기를 축소합니다.
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
const imageDirs = [
    path.join(projectRoot, 'images'),
    path.join(projectRoot, 'Projects')
];

let processedCount = 0;
let errorCount = 0;

/**
 * 이미지 파일을 WebP로 변환하고 최적화합니다.
 */
async function optimizeImage(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    
    // PNG/JPG/JPEG 파일만 처리
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
        return;
    }

    const dir = path.dirname(filePath);
    const filename = path.basename(filePath, ext);
    const outputPath = path.join(dir, `${filename}.webp`);

    // 이미 WebP가 있으면 스킵
    if (fs.existsSync(outputPath)) {
        console.log(`⏭️  SKIP: ${outputPath} (이미 존재)`);
        return;
    }

    try {
        // 파일 크기 확인 (큰 이미지는 더 줄인다)
        const stats = fs.statSync(filePath);
        const fileSizeMB = stats.size / (1024 * 1024);
        
        let width = null;
        let quality = 80;

        // 파일 크기에 따라 리사이징 설정
        if (fileSizeMB > 2) {
            // 2MB 이상: 50% 축소
            width = 1200;
            quality = 75;
        } else if (fileSizeMB > 1) {
            // 1~2MB: 30% 축소
            width = 1600;
            quality = 78;
        } else if (fileSizeMB > 0.5) {
            // 0.5~1MB: 20% 축소
            width = 1920;
            quality = 80;
        }

        // Sharp를 사용해서 WebP로 변환
        let pipeline = sharp(filePath);

        if (width) {
            pipeline = pipeline.resize(width, null, {
                withoutEnlargement: true,
                fit: 'inside'
            });
        }

        await pipeline
            .webp({ quality })
            .toFile(outputPath);

        const webpStats = fs.statSync(outputPath);
        const webpSizeMB = webpStats.size / (1024 * 1024);
        const compressionRatio = ((1 - webpStats.size / stats.size) * 100).toFixed(1);

        console.log(`✅ SUCCESS: ${filename}.webp (${fileSizeMB.toFixed(2)}MB → ${webpSizeMB.toFixed(2)}MB, -${compressionRatio}%)`);
        processedCount++;
    } catch (error) {
        console.error(`❌ ERROR: ${filePath}\n   ${error.message}`);
        errorCount++;
    }
}

/**
 * 디렉토리를 재귀적으로 탐색하며 이미지를 최적화합니다.
 */
async function processDirectory(dir) {
    try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                // 재귀적으로 디렉토리 처리
                await processDirectory(fullPath);
            } else if (entry.isFile()) {
                // 파일 처리
                await optimizeImage(fullPath);
            }
        }
    } catch (error) {
        console.error(`디렉토리 접근 오류: ${dir}\n${error.message}`);
    }
}

/**
 * 메인 함수
 */
async function main() {
    console.log('🚀 이미지 최적화 시작...\n');

    // Sharp 설치 확인
    try {
        require.resolve('sharp');
    } catch {
        console.error('❌ sharp가 설치되지 않았습니다.');
        console.log('설치 명령어: npm install sharp');
        process.exit(1);
    }

    for (const dir of imageDirs) {
        if (fs.existsSync(dir)) {
            console.log(`\n📁 처리 중: ${dir}`);
            await processDirectory(dir);
        }
    }

    console.log(`\n✨ 완료!`);
    console.log(`   처리된 이미지: ${processedCount}개`);
    console.log(`   오류 발생: ${errorCount}개`);
}

main().catch(console.error);
