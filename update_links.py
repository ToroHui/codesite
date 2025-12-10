#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
处理data.json文件，将所有link字段替换为指定的百度网盘链接
"""

import json
import os

# 配置
INPUT_FILE = r"C:\Users\lenovo\Desktop\代码宝库---优质资源库\data.json"
OUTPUT_FILE = r"C:\Users\lenovo\Desktop\代码宝库---优质资源库\data.json"
NEW_LINK = "https://pan.baidu.com/s/1mQ7OGPbTh6-27NFKHU49_A"

def update_links():
    """读取JSON文件，更新所有link字段，并保存"""
    try:
        # 读取JSON文件
        print(f"正在读取文件: {INPUT_FILE}")
        with open(INPUT_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # 统计信息
        total_items = len(data)
        updated_count = 0
        
        # 更新所有link字段
        print(f"开始处理 {total_items} 条记录...")
        for item in data:
            if 'link' in item:
                old_link = item['link']
                if old_link != NEW_LINK:
                    item['link'] = NEW_LINK
                    updated_count += 1
        
        # 保存到文件（保持格式化）
        print(f"正在保存到文件: {OUTPUT_FILE}")
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        # 输出结果
        print("\n" + "="*50)
        print("处理完成！")
        print(f"总记录数: {total_items}")
        print(f"更新记录数: {updated_count}")
        print(f"未变更记录数: {total_items - updated_count}")
        print(f"新链接: {NEW_LINK}")
        print("="*50)
        
    except FileNotFoundError:
        print(f"错误: 找不到文件 {INPUT_FILE}")
    except json.JSONDecodeError as e:
        print(f"错误: JSON格式错误 - {e}")
    except Exception as e:
        print(f"错误: {e}")

if __name__ == "__main__":
    update_links()
