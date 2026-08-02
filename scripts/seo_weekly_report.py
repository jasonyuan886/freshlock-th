#!/usr/bin/env python3
"""
FreshLock SEO Weekly Report Generator
Pulls GSC + GA4 data, generates prioritized optimization report.
Requires: Google Cloud service account JSON with GSC API + Analytics Data API enabled.
Service account email must be added to GSC and GA4 as user.
"""

import json
import os
import sys
import datetime
from pathlib import Path

# Google API imports
from google.oauth2 import service_account
from googleapiclient.discovery import build
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange, Dimension, Metric, RunReportRequest, OrderBy, Filter,
    FilterExpression
)

# === CONFIG ===
SERVICE_ACCOUNT_FILE = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS',
    '/app/data/所有对话/主对话/freshlock-store-clone/scripts/service-account.json')
GSC_SITE_URL = 'https://www.freshlocksealer.com/'
GA4_PROPERTY_ID = os.environ.get('GA4_PROPERTY_ID', '545971378')
SCOPES = [
    'https://www.googleapis.com/auth/webmasters.readonly',
    'https://www.googleapis.com/auth/analytics.readonly'
]
OUTPUT_DIR = '/app/data/所有对话/主对话/SEO周报'


def pull_gsc_data(credentials, days=90):
    """Pull Google Search Console search analytics data."""
    service = build('searchconsole', 'v1', credentials=credentials)

    end_date = datetime.date.today()
    start_date = end_date - datetime.timedelta(days=days)

    date_str = end_date.strftime('%Y-%m-%d')
    start_str = start_date.strftime('%Y-%m-%d')

    # 1. Overall metrics by date
    request = {
        'startDate': start_str,
        'endDate': date_str,
        'dimensions': ['date'],
        'rowLimit': 25000
    }
    response = service.searchanalytics().query(siteUrl=GSC_SITE_URL, body=request).execute()
    daily_data = response.get('rows', [])

    total_clicks = sum(r.get('clicks', 0) for r in daily_data)
    total_impressions = sum(r.get('impressions', 0) for r in daily_data)
    total_ctr = (total_clicks / total_impressions * 100) if total_impressions > 0 else 0
    avg_position = sum(r.get('position', 0) * r.get('impressions', 1) for r in daily_data) / max(total_impressions, 1)

    # 2. Top queries
    request = {
        'startDate': start_str,
        'endDate': date_str,
        'dimensions': ['query'],
        'rowLimit': 100,
        'orderBy': [{'field': 'clicks', 'sortOrder': 'DESC'}]
    }
    response = service.searchanalytics().query(siteUrl=GSC_SITE_URL, body=request).execute()
    top_queries = response.get('rows', [])[:30]

    # 3. Top pages
    request = {
        'startDate': start_str,
        'endDate': date_str,
        'dimensions': ['page'],
        'rowLimit': 50,
        'orderBy': [{'field': 'clicks', 'sortOrder': 'DESC'}]
    }
    response = service.searchanalytics().query(siteUrl=GSC_SITE_URL, body=request).execute()
    top_pages = response.get('rows', [])[:20]

    # 4. Countries
    request = {
        'startDate': start_str,
        'endDate': date_str,
        'dimensions': ['country'],
        'rowLimit': 20,
        'orderBy': [{'field': 'clicks', 'sortOrder': 'DESC'}]
    }
    response = service.searchanalytics().query(siteUrl=GSC_SITE_URL, body=request).execute()
    top_countries = response.get('rows', [])[:10]

    # 5. Devices
    request = {
        'startDate': start_str,
        'endDate': date_str,
        'dimensions': ['device'],
        'rowLimit': 10
    }
    response = service.searchanalytics().query(siteUrl=GSC_SITE_URL, body=request).execute()
    device_data = response.get('rows', [])

    # 6. High impression low CTR keywords
    high_impr_low_ctr = [q for q in top_queries if q.get('impressions', 0) > 10 and q.get('ctr', 0) < 0.02]
    high_impr_low_ctr.sort(key=lambda x: x.get('impressions', 0), reverse=True)

    return {
        'summary': {
            'clicks': total_clicks,
            'impressions': total_impressions,
            'ctr': round(total_ctr, 2),
            'avg_position': round(avg_position, 1),
            'date_range': f"{start_str} ~ {date_str}"
        },
        'daily': daily_data,
        'top_queries': top_queries,
        'top_pages': top_pages,
        'top_countries': top_countries,
        'device_data': device_data,
        'optimization_keywords': high_impr_low_ctr[:15]
    }


def pull_ga4_data(credentials, property_id, days=90):
    """Pull GA4 user behavior data."""
    if not property_id:
        return None

    client = BetaAnalyticsDataClient(credentials=credentials)

    end_date = datetime.date.today()
    start_date = end_date - datetime.timedelta(days=days)

    # 1. Overview
    request = RunReportRequest(
        property=f"properties/{property_id}",
        date_ranges=[DateRange(start_date=start_date.strftime('%Y-%m-%d'),
                               end_date=end_date.strftime('%Y-%m-%d'))],
        dimensions=[Dimension(name='date')],
        metrics=[
            Metric(name='sessions'),
            Metric(name='totalUsers'),
            Metric(name='screenPageViews'),
            Metric(name='averageSessionDuration'),
            Metric(name='bounceRate'),
        ],
        order_bys=[OrderBy(dimension=OrderBy.DimensionOrderBy(dimension_name='date'))]
    )
    response = client.run_report(request)

    overview = {'sessions': 0, 'users': 0, 'pageviews': 0, 'avg_duration': 0, 'bounce_rate': 0}
    daily_rows = []
    for row in response.rows:
        date_val = row.dimension_values[0].value
        sessions = int(row.metric_values[0].value)
        users = int(row.metric_values[1].value)
        pageviews = int(row.metric_values[2].value)
        duration = float(row.metric_values[3].value)
        bounce = float(row.metric_values[4].value)

        overview['sessions'] += sessions
        overview['users'] += users
        overview['pageviews'] += pageviews
        overview['avg_duration'] += duration
        overview['bounce_rate'] += bounce
        daily_rows.append({
            'date': date_val, 'sessions': sessions, 'users': users,
            'pageviews': pageviews, 'duration': round(duration, 1), 'bounce': round(bounce * 100, 1)
        })

    n = max(len(daily_rows), 1)
    overview['avg_duration'] = round(overview['avg_duration'] / n, 1)
    overview['bounce_rate'] = round(overview['bounce_rate'] / n * 100, 1)

    # 2. Top landing pages
    request = RunReportRequest(
        property=f"properties/{property_id}",
        date_ranges=[DateRange(start_date=start_date.strftime('%Y-%m-%d'),
                               end_date=end_date.strftime('%Y-%m-%d'))],
        dimensions=[Dimension(name='landingPagePlusQueryString')],
        metrics=[Metric(name='sessions'), Metric(name='totalUsers'),
                 Metric(name='screenPageViews'), Metric(name='averageSessionDuration')],
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name='sessions'), desc=True)],
        limit=20
    )
    response = client.run_report(request)
    top_pages = []
    for row in response.rows:
        top_pages.append({
            'page': row.dimension_values[0].value,
            'sessions': int(row.metric_values[0].value),
            'users': int(row.metric_values[1].value),
            'pageviews': int(row.metric_values[2].value),
            'duration': round(float(row.metric_values[3].value), 1)
        })

    # 3. Traffic sources
    request = RunReportRequest(
        property=f"properties/{property_id}",
        date_ranges=[DateRange(start_date=start_date.strftime('%Y-%m-%d'),
                               end_date=end_date.strftime('%Y-%m-%d'))],
        dimensions=[Dimension(name='sessionDefaultChannelGroup')],
        metrics=[Metric(name='sessions'), Metric(name='totalUsers')],
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name='sessions'), desc=True)],
        limit=10
    )
    response = client.run_report(request)
    traffic_sources = []
    for row in response.rows:
        traffic_sources.append({
            'source': row.dimension_values[0].value,
            'sessions': int(row.metric_values[0].value),
            'users': int(row.metric_values[1].value)
        })

    # 4. E-commerce events
    request = RunReportRequest(
        property=f"properties/{property_id}",
        date_ranges=[DateRange(start_date=start_date.strftime('%Y-%m-%d'),
                               end_date=end_date.strftime('%Y-%m-%d'))],
        dimensions=[Dimension(name='eventName')],
        metrics=[Metric(name='eventCount')],
        dimension_filter=FilterExpression(
            filter=Filter(
                field_name='eventName',
                in_list_filter=Filter.InListFilter(
                    values=['add_to_cart', 'begin_checkout', 'purchase', 'view_item', 'select_item']
                )
            )
        ),
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name='eventCount'), desc=True)],
        limit=20
    )
    response = client.run_report(request)
    ecommerce_events = []
    for row in response.rows:
        ecommerce_events.append({
            'event': row.dimension_values[0].value,
            'count': int(row.metric_values[0].value)
        })

    return {
        'overview': overview,
        'daily': daily_rows,
        'top_pages': top_pages,
        'traffic_sources': traffic_sources,
        'ecommerce_events': ecommerce_events
    }


def generate_report(gsc_data, ga4_data, output_path):
    """Generate markdown SEO weekly report."""
    now = datetime.datetime.now()
    report_date = now.strftime('%Y-%m-%d')

    lines = []
    lines.append(f"# FreshLock SEO 周报 — {report_date}\n")
    lines.append(f"> 数据范围: {gsc_data['summary']['date_range']} (近90天)\n")
    lines.append("---\n")

    # 1. Executive Summary
    lines.append("## 📊 概览\n")
    s = gsc_data['summary']
    lines.append("| 指标 | GSC搜索数据 |")
    lines.append("|------|-------------|")
    lines.append(f"| 总点击 | {s['clicks']:,} |")
    lines.append(f"| 总曝光 | {s['impressions']:,} |")
    lines.append(f"| 平均CTR | {s['ctr']}% |")
    lines.append(f"| 平均排名 | {s['avg_position']} |")
    lines.append("")

    if ga4_data:
        o = ga4_data['overview']
        lines.append("| 指标 | GA4行为数据 |")
        lines.append("|------|-------------|")
        lines.append(f"| 总会话 | {o['sessions']:,} |")
        lines.append(f"| 总用户 | {o['users']:,} |")
        lines.append(f"| 页面浏览 | {o['pageviews']:,} |")
        lines.append(f"| 平均停留 | {o['avg_duration']}秒 |")
        lines.append(f"| 跳出率 | {o['bounce_rate']}% |")
        lines.append("")

        # E-commerce funnel
        lines.append("### 转化漏斗\n")
        events = {e['event']: e['count'] for e in ga4_data['ecommerce_events']}
        view_item = events.get('view_item', 0)
        add_to_cart = events.get('add_to_cart', 0)
        begin_checkout = events.get('begin_checkout', 0)
        purchase = events.get('purchase', 0)

        lines.append("| 漏斗阶段 | 事件数 | 转化率 |")
        lines.append("|----------|--------|--------|")
        lines.append(f"| 浏览产品 (view_item) | {view_item:,} | - |")
        if view_item > 0:
            lines.append(f"| 加入购物车 (add_to_cart) | {add_to_cart:,} | {round(add_to_cart/view_item*100, 1)}% |")
        if add_to_cart > 0:
            lines.append(f"| 开始结算 (begin_checkout) | {begin_checkout:,} | {round(begin_checkout/add_to_cart*100, 1)}% |")
        if begin_checkout > 0:
            lines.append(f"| 完成购买 (purchase) | {purchase:,} | {round(purchase/begin_checkout*100, 1)}% |")
        lines.append("")

    # 2. Top Keywords
    lines.append("## 🔍 TOP 20 搜索关键词\n")
    lines.append("| 关键词 | 点击 | 曝光 | CTR | 平均排名 |")
    lines.append("|--------|------|------|-----|----------|")
    for q in gsc_data['top_queries'][:20]:
        kw = q.get('keys', [''])[0]
        clicks = q.get('clicks', 0)
        impr = q.get('impressions', 0)
        ctr = round(q.get('ctr', 0) * 100, 2)
        pos = round(q.get('position', 0), 1)
        lines.append(f"| {kw} | {clicks} | {impr} | {ctr}% | {pos} |")
    lines.append("")

    # 3. Optimization Opportunities
    lines.append("## 🎯 优化机会（高曝光低CTR关键词）\n")
    lines.append("以下关键词曝光量高但点击率低，建议优化title/meta description：\n")
    if gsc_data['optimization_keywords']:
        lines.append("| 关键词 | 曝光 | 点击 | CTR | 排名 | 建议 |")
        lines.append("|--------|------|------|-----|------|------|")
        for kw in gsc_data['optimization_keywords'][:10]:
            keyword = kw.get('keys', [''])[0]
            impr = kw.get('impressions', 0)
            clicks = kw.get('clicks', 0)
            ctr = round(kw.get('ctr', 0) * 100, 2)
            pos = round(kw.get('position', 0), 1)
            if pos > 10:
                suggestion = "排名>10，需SEO内容优化"
            elif pos > 5:
                suggestion = "排名5-10，优化title标签"
            else:
                suggestion = "排名前5，优化meta description"
            lines.append(f"| {keyword} | {impr} | {clicks} | {ctr}% | {pos} | {suggestion} |")
    else:
        lines.append("暂无高曝光低CTR关键词（可能数据量不足）")
    lines.append("")

    # 4. Top Pages
    lines.append("## 📄 TOP 15 页面\n")
    lines.append("| 页面 | 点击 | 曝光 | CTR | 排名 |")
    lines.append("|------|------|------|-----|------|")
    for p in gsc_data['top_pages'][:15]:
        page = p.get('keys', [''])[0]
        if len(page) > 60:
            page = '...' + page[-57:]
        clicks = p.get('clicks', 0)
        impr = p.get('impressions', 0)
        ctr = round(p.get('ctr', 0) * 100, 2)
        pos = round(p.get('position', 0), 1)
        lines.append(f"| {page} | {clicks} | {impr} | {ctr}% | {pos} |")
    lines.append("")

    # 5. Traffic Sources
    if ga4_data and ga4_data.get('traffic_sources'):
        lines.append("## 🌐 流量来源\n")
        lines.append("| 渠道 | 会话 | 用户 |")
        lines.append("|------|------|------|")
        for src in ga4_data['traffic_sources']:
            lines.append(f"| {src['source']} | {src['sessions']:,} | {src['users']:,} |")
        lines.append("")

    # 6. Countries
    lines.append("## 🌍 国家/地区分布\n")
    lines.append("| 国家 | 点击 | 曝光 |")
    lines.append("|------|------|------|")
    for c in gsc_data['top_countries'][:10]:
        country = c.get('keys', [''])[0]
        clicks = c.get('clicks', 0)
        impr = c.get('impressions', 0)
        lines.append(f"| {country} | {clicks} | {impr} |")
    lines.append("")

    # 7. Devices
    lines.append("## 📱 设备分布\n")
    lines.append("| 设备 | 点击 | 曝光 | CTR |")
    lines.append("|------|------|------|-----|")
    for d in gsc_data['device_data']:
        device = d.get('keys', [''])[0]
        clicks = d.get('clicks', 0)
        impr = d.get('impressions', 0)
        ctr = round(d.get('ctr', 0) * 100, 2)
        lines.append(f"| {device} | {clicks} | {impr} | {ctr}% |")
    lines.append("")

    # 8. Priority Actions
    lines.append("## ✅ 优先行动项\n")
    actions = []

    if s['ctr'] < 2.0:
        actions.append(f"🔴 CTR仅{s['ctr']}%，低于2%行业基准。检查TOP关键词的title/meta是否吸引人")

    if s['avg_position'] > 20:
        actions.append(f"🔴 平均排名{s['avg_position']}，需加强内容深度和外链建设")
    elif s['avg_position'] > 10:
        actions.append(f"🟡 平均排名{s['avg_position']}，重点优化排名5-15的关键词页面")

    if gsc_data['optimization_keywords']:
        actions.append(f"🟡 有{len(gsc_data['optimization_keywords'])}个高曝光低CTR关键词，优先优化title标签和meta description")

    if ga4_data and ga4_data['overview']['bounce_rate'] > 70:
        actions.append(f"🔴 跳出率{ga4_data['overview']['bounce_rate']}%偏高，检查落地页内容质量和加载速度")

    if ga4_data:
        events = {e['event']: e['count'] for e in ga4_data['ecommerce_events']}
        add_to_cart = events.get('add_to_cart', 0)
        begin_checkout = events.get('begin_checkout', 0)
        purchase = events.get('purchase', 0)
        if add_to_cart > 0 and begin_checkout == 0:
            actions.append("🔴 有加购但无结算，检查购物车→结算流程是否有障碍")
        if begin_checkout > 0 and purchase == 0:
            actions.append("🔴 有结算但无成交，检查支付流程和运费设置")
        if add_to_cart == 0:
            actions.append("🟡 近90天无加购事件，检查产品页CTA是否明显")

    if not actions:
        actions.append("✅ 暂无紧急优化项，持续监控数据趋势")

    for i, action in enumerate(actions, 1):
        lines.append(f"{i}. {action}")

    lines.append("")
    lines.append("---")
    lines.append(f"\n*报告自动生成于 {now.strftime('%Y-%m-%d %H:%M')} by FreshLock SEO Bot*")

    report_text = '\n'.join(lines)
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(report_text)

    return report_text


def main():
    print("=== FreshLock SEO Weekly Report ===")

    if not os.path.exists(SERVICE_ACCOUNT_FILE):
        print(f"ERROR: Service account file not found: {SERVICE_ACCOUNT_FILE}")
        print("Setup steps:")
        print("1. Go to https://console.cloud.google.com/")
        print("2. Create a project (or use existing)")
        print("3. Enable APIs: Google Search Console API + Google Analytics Data API")
        print("4. IAM > Service Accounts > Create > Download JSON key")
        print(f"5. Save JSON to: {SERVICE_ACCOUNT_FILE}")
        print(f"6. Add service account email to GSC: https://search.google.com/search-console/users (for {GSC_SITE_URL})")
        print("7. Add service account email to GA4: Admin > Property access management")
        print("8. Set GA4_PROPERTY_ID env var (numeric ID, find in GA4 Admin > Property settings)")
        sys.exit(1)

    credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES
    )

    # Pull GSC data
    print("Pulling GSC data (90 days)...")
    try:
        gsc_data = pull_gsc_data(credentials, days=90)
        print(f"  OK GSC: {gsc_data['summary']['clicks']} clicks, {gsc_data['summary']['impressions']:,} impressions")
    except Exception as e:
        print(f"  FAIL GSC error: {e}")
        gsc_data = None

    # Pull GA4 data
    ga4_data = None
    if GA4_PROPERTY_ID:
        print(f"Pulling GA4 data (property: {GA4_PROPERTY_ID})...")
        try:
            ga4_data = pull_ga4_data(credentials, GA4_PROPERTY_ID, days=90)
            print(f"  OK GA4: {ga4_data['overview']['sessions']} sessions, {ga4_data['overview']['users']} users")
        except Exception as e:
            print(f"  FAIL GA4 error: {e}")
    else:
        print("SKIP: GA4_PROPERTY_ID not set")

    # Generate report
    if gsc_data:
        report_date = datetime.date.today().strftime('%Y%m%d')
        output_path = f"{OUTPUT_DIR}/seo_report_{report_date}.md"
        report = generate_report(gsc_data, ga4_data, output_path)
        print(f"\nOK Report saved to: {output_path}")
        print(f"   Report size: {len(report)} chars")
    else:
        print("\nFAIL: No GSC data, cannot generate report")
        sys.exit(1)


if __name__ == '__main__':
    main()
