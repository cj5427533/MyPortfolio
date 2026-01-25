#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json

with open('lighthouse-report-new.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print('=' * 50)
print('Lighthouse 성능 분석 결과')
print('=' * 50)

# 기본 점수
cats = data['categories']
print('\n📊 전체 점수:')
print(f'Performance:     {int(cats["performance"]["score"]*100)}/100')
print(f'Accessibility:   {int(cats["accessibility"]["score"]*100)}/100')
print(f'Best Practices:  {int(cats["best-practices"]["score"]*100)}/100')
print(f'SEO:             {int(cats["seo"]["score"]*100)}/100')

# Core Web Vitals
print('\n⚡ Core Web Vitals:')
metrics = data['audits']

if 'largest-contentful-paint' in metrics:
    lcp_audit = metrics['largest-contentful-paint']
    if 'numericValue' in lcp_audit:
        lcp = lcp_audit['numericValue'] / 1000
        print(f'  LCP: {lcp:.2f}s (목표: <2.5s) {"✓" if lcp < 2.5 else "✗"}')

if 'cumulative-layout-shift' in metrics:
    cls_audit = metrics['cumulative-layout-shift']
    if 'numericValue' in cls_audit:
        cls = cls_audit['numericValue']
        print(f'  CLS: {cls:.3f} (목표: <0.1) {"✓" if cls < 0.1 else "✗"}')

if 'interaction-to-next-paint' in metrics:
    inp_audit = metrics['interaction-to-next-paint']
    if 'numericValue' in inp_audit:
        inp = inp_audit['numericValue']
        print(f'  INP: {inp:.0f}ms (목표: <200ms) {"✓" if inp < 200 else "✗"}')

# 성능 저해 요소 (Failed audits)
print('\n❌ 성능 저해 요소:')
critical_audits = [
    ('render-blocking-resources', '렌더링 차단 리소스'),
    ('modern-image-formats', '최신 이미지 포맷'),
    ('uses-responsive-images', '반응형 이미지'),
    ('unused-javascript', '미사용 JavaScript'),
    ('unused-css-rules', '미사용 CSS'),
    ('uses-long-cache-ttl', '캐시 정책'),
    ('image-delivery-insight', '이미지 제공 최적화'),
    ('third-parties-summary', '제3자 리소스'),
]

for audit_id, audit_name in critical_audits:
    if audit_id in metrics:
        audit = metrics[audit_id]
        score = audit.get('score')
        if score is not None and score < 1:
            display = audit.get('displayValue', '')
            print(f'  • {audit_name}: {display}')

# 총 페이지 크기
if 'total-byte-weight' in metrics:
    total_bytes = metrics['total-byte-weight']['numericValue']
    print(f'\n📦 총 페이지 크기: {total_bytes / 1024 / 1024:.2f} MB')

print('\n' + '=' * 50)
