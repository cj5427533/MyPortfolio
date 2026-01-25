#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json

with open('lighthouse-report-new.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print('=' * 60)
print('성능 개선 상세 분석')
print('=' * 60)

metrics = data['audits']

# Failed audits에서 상세 정보 추출
failed_audits = {
    'modern-image-formats': '최신 이미지 포맷 (WebP/AVIF)',
    'uses-responsive-images': '반응형 이미지 최적화',
    'image-delivery-insight': '이미지 제공 최적화',
    'unused-javascript': '미사용 JavaScript',
    'unused-css-rules': '미사용 CSS',
    'render-blocking-resources': '렌더링 차단 리소스',
    'uses-long-cache-ttl': '캐시 TTL 설정',
}

print('\n📌 Failed Audits (개선 필요):')
print('-' * 60)

for audit_id, audit_name in failed_audits.items():
    if audit_id in metrics:
        audit = metrics[audit_id]
        score = audit.get('score', None)
        if score is not None and score < 1:
            details = audit.get('details', {})
            display = audit.get('displayValue', '')
            description = audit.get('description', '')
            
            print(f'\n❌ {audit_name} ({audit_id})')
            if display:
                print(f'   결과: {display}')
            if 'items' in details and details['items']:
                items = details['items']
                if isinstance(items, list) and len(items) > 0:
                    print(f'   상세: {len(items)} items 발견')
                    for i, item in enumerate(items[:3]):  # 처음 3개만
                        if isinstance(item, dict):
                            url = item.get('url', '')
                            if url:
                                print(f'      - {url}')

# LCP 요소 분석
print('\n\n🎯 LCP (Largest Contentful Paint) 분석:')
print('-' * 60)

if 'lcp-breakdown-insight' in metrics:
    lcp = metrics['lcp-breakdown-insight']
    if 'details' in lcp and 'items' in lcp['details']:
        items = lcp['details']['items']
        if items:
            print('LCP 요소 분석:')
            for item in items:
                if isinstance(item, dict):
                    headings = item.get('headings', [])
                    item_details = item.get('items', [])
                    for detail in item_details:
                        if isinstance(detail, dict):
                            print(f"  • {detail}")

# 권장사항
print('\n\n💡 권장 개선 순서:')
print('-' * 60)
recommendations = [
    ('1', '이미지 최적화', 'WebP 자동 제공 + 반응형 크기', '1.6 + 1.2 MB 절감'),
    ('2', '캐시 정책', 'Cache-Control 헤더 최적화', '반복 방문 50% 빠르게'),
    ('3', '미사용 코드 제거', 'CSS/JS 번들 최적화', '약 100-200 KB 절감'),
    ('4', 'LCP 개선', 'Hero 이미지 우선 로딩', 'LCP 50-70% 개선'),
    ('5', '폰트 로딩', 'font-display: swap 적용', 'FCP 개선'),
]

for seq, title, action, benefit in recommendations:
    print(f'{seq}. {title}')
    print(f'   조치: {action}')
    print(f'   효과: {benefit}')
    print()

print('=' * 60)
