#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
生成大量项目数据到data.json
"""

import json
import random

# 统一的百度网盘链接
BAIDU_LINK = "https://pan.baidu.com/s/1mQ7OGPbTh6-27NFKHU49_A"

# 项目分类配置（总计3000套）
CATEGORIES = {
    "SpringBoot": {
        "category": "01-92套-21-SpringBoot",
        "tags": ["SpringBoot"],
        "count": 350
    },
    "SSM": {
        "category": "02-80套-SSM",
        "tags": ["SSM", "Spring"],
        "count": 280
    },
    "Django": {
        "category": "03-50套-Django",
        "tags": ["Django", "Python"],
        "count": 220
    },
    "Flask": {
        "category": "04-40套-Flask",
        "tags": ["Flask", "Python"],
        "count": 180
    },
    "Python": {
        "category": "05-35套-Python",
        "tags": ["Python"],
        "count": 200
    },
    "QT": {
        "category": "06-30套-QT",
        "tags": ["QT", "C++"],
        "count": 150
    },
    "uniapp": {
        "category": "07-45套-uniapp",
        "tags": ["uniapp", "Vue"],
        "count": 220
    },
    "小程序": {
        "category": "08-40套-小程序",
        "tags": ["小程序", "微信"],
        "count": 220
    },
    "PHP": {
        "category": "09-38套-PHP",
        "tags": ["PHP"],
        "count": 180
    },
    "Vue": {
        "category": "10-60套-Vue",
        "tags": ["Vue", "JavaScript"],
        "count": 250
    },
    "React": {
        "category": "11-55套-React",
        "tags": ["React", "JavaScript"],
        "count": 220
    },
    "Android": {
        "category": "12-50套-Android",
        "tags": ["Android", "Java"],
        "count": 180
    },
    "微信小程序": {
        "category": "13-45套-微信小程序",
        "tags": ["微信小程序"],
        "count": 150
    },
    "Node.js": {
        "category": "14-40套-Node.js",
        "tags": ["Node.js", "JavaScript"],
        "count": 150
    },
    "Go": {
        "category": "15-35套-Go",
        "tags": ["Go", "Golang"],
        "count": 150
    }
}

# 项目名称模板
PROJECT_TEMPLATES = [
    # 电商类
    "在线商城系统", "电商平台", "跨境电商系统", "社区团购平台", "二手交易平台",
    "拍卖系统", "积分商城", "优惠券系统", "秒杀系统", "团购网站",
    
    # 教育类
    "在线教育平台", "网课系统", "题库管理系统", "在线考试系统", "学生成绩管理",
    "选课系统", "排课系统", "教务管理系统", "智慧校园", "在线作业系统",
    "知识付费平台", "课程管理系统", "培训机构管理", "学习打卡系统", "在线答题系统",
    
    # 医疗类
    "医院预约挂号系统", "在线问诊平台", "电子病历系统", "药品管理系统", "体检预约系统",
    "医护排班系统", "健康管理平台", "远程医疗系统", "医疗器械管理", "处方管理系统",
    
    # 社交类
    "社交平台", "论坛系统", "博客系统", "在线聊天室", "即时通讯系统",
    "社区系统", "交友平台", "图片分享社区", "短视频平台", "直播平台",
    
    # 办公类
    "OA办公系统", "项目管理系统", "任务管理系统", "CRM客户管理", "进销存系统",
    "人事管理系统", "考勤管理系统", "财务管理系统", "合同管理系统", "文档管理系统",
    "工单系统", "审批流程系统", "会议室预约", "资产管理系统", "报表系统",
    
    # 生活服务类
    "外卖订餐系统", "酒店预订系统", "民宿管理系统", "停车场管理", "家政服务平台",
    "美容预约系统", "健身房管理", "洗车预约系统", "宠物医院管理", "婚庆服务平台",
    "搬家服务系统", "维修服务平台", "跑腿服务系统", "快递代取系统", "洗衣服务平台",
    
    # 物流类
    "物流管理系统", "仓储管理系统", "配送管理系统", "快递管理系统", "供应链管理",
    
    # 旅游类
    "旅游网站", "景点管理系统", "旅游攻略平台", "酒店管理系统", "票务预订系统",
    "导游预约系统", "旅行社管理", "民宿预订平台", "旅游线路管理", "景区票务系统",
    
    # 房产类
    "房产中介系统", "租房平台", "二手房交易", "房屋租赁管理", "物业管理系统",
    "装修管理系统", "房产销售系统", "楼盘管理系统", "房源管理系统", "中介管理平台",
    
    # 汽车类
    "汽车租赁系统", "4S店管理系统", "汽车维修管理", "二手车交易", "驾校管理系统",
    "车辆管理系统", "汽车保养系统", "洗车店管理", "汽车配件管理", "停车管理系统",
    
    # 金融类
    "网上银行系统", "理财平台", "贷款管理系统", "P2P借贷平台", "支付系统",
    "账单管理系统", "记账本应用", "财务分析系统", "投资管理平台", "保险管理系统",
    
    # 娱乐类
    "电影票预订", "KTV管理系统", "游戏平台", "音乐播放器", "视频点播平台",
    "在线影院", "剧本杀管理", "密室逃脱预约", "电竞平台", "棋牌游戏平台",
    
    # 新闻资讯类
    "新闻发布系统", "资讯平台", "内容管理系统", "RSS阅读器", "自媒体平台",
    
    # 图书类
    "图书管理系统", "在线图书馆", "电子书阅读器", "图书借阅系统", "书店管理系统",
    "图书推荐系统", "阅读打卡系统", "图书交换平台", "图书评论系统", "数字图书馆",
    
    # 餐饮类
    "餐厅点餐系统", "外卖平台", "餐饮管理系统", "菜谱管理系统", "食堂管理系统",
    "美食推荐平台", "订座系统", "后厨管理系统", "连锁餐饮管理", "食材管理系统",
    
    # 农业类
    "智慧农业平台", "农产品销售", "农场管理系统", "农业物联网", "农资管理系统",
    
    # 工具类
    "在线投票系统", "问卷调查系统", "表单系统", "签到系统", "抽奖系统",
    "短链接服务", "二维码生成器", "文件分享平台", "云盘系统", "图床系统",
    "在线简历生成", "PDF工具", "图片处理工具", "视频编辑工具", "音频处理工具",
    
    # 智能硬件类
    "智能家居系统", "物联网平台", "智能门锁管理", "智能照明系统", "环境监测系统",
    "智能安防系统", "智能农业监控", "智能仓储", "智能制造系统", "设备管理平台",
    
    # 数据分析类
    "数据可视化平台", "BI系统", "数据分析工具", "报表生成系统", "数据挖掘平台",
    "日志分析系统", "监控告警系统", "性能分析工具", "用户行为分析", "数据大屏",
    
    # AI类
    "人脸识别系统", "图像识别平台", "语音识别系统", "智能客服", "聊天机器人",
    "推荐系统", "情感分析工具", "文本分类系统", "OCR识别系统", "智能问答系统",
    
    # 其他
    "失物招领系统", "志愿者管理", "活动报名系统", "会员管理系统", "积分系统",
    "评论系统", "留言板", "相册管理", "日程管理", "备忘录应用",
    "密码管理器", "网址导航", "天气查询系统", "快递查询", "违章查询系统"
]

# 功能前缀
PREFIXES = [
    "基于{}的", "{}实现的", "{}开发的", "智能", "在线", "移动端",
    "PC端", "Web端", "全栈", "前后端分离", "微服务", "分布式",
    "云端", "企业级", "轻量级", "高性能", "响应式", "跨平台"
]

def generate_project_name(category, index, template):
    """生成项目名称"""
    prefix = random.choice(PREFIXES)
    if "{}" in prefix:
        name = f"{category.lower()}{index:03d}{prefix.format(category)}{template}"
    else:
        name = f"{category.lower()}{index:03d}{prefix}{template}"
    return name

def generate_data():
    """生成所有数据"""
    all_data = []
    current_id = 1000000000
    
    for category, config in CATEGORIES.items():
        print(f"正在生成 {category} 类别的数据...")
        
        # 为每个分类生成指定数量的项目
        for i in range(1, config["count"] + 1):
            # 随机选择一个项目模板
            template = random.choice(PROJECT_TEMPLATES)
            
            # 生成项目名称
            name = generate_project_name(category, i, template)
            
            # 创建项目数据
            project = {
                "id": current_id,
                "category": config["category"],
                "short_category": category,
                "name": name,
                "tags": config["tags"],
                "link": BAIDU_LINK
            }
            
            all_data.append(project)
            current_id += 1
    
    return all_data

def save_to_file(data, filename):
    """保存数据到文件"""
    output_path = r"C:\Users\lenovo\Desktop\代码宝库---优质资源库\data.json"
    
    print(f"\n正在保存到文件: {output_path}")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"保存成功！")

def main():
    print("="*60)
    print("开始生成项目数据...")
    print("="*60)
    
    # 生成数据
    data = generate_data()
    
    # 统计信息
    print("\n" + "="*60)
    print("数据生成完成！")
    print(f"总项目数: {len(data)}")
    print(f"分类数: {len(CATEGORIES)}")
    print("\n各分类统计:")
    for category, config in CATEGORIES.items():
        print(f"  {category}: {config['count']}套")
    print("="*60)
    
    # 保存到文件
    save_to_file(data, "data.json")
    
    print("\n✓ 所有操作完成！")

if __name__ == "__main__":
    main()
