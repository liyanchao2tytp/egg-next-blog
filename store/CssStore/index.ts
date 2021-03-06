/*
 * @Author: lyc
 * @Date: 2021-02-04 18:07:24
 * @LastEditors: lyc
 * @LastEditTime: 2021-02-17 22:13:59
 * @Description: file content
 */

import { makeAutoObservable } from "mobx"

/**
 * is_static_page
 * 在我通过mobx动态更改导入的css样式的时候出现了一些问题
 *    - 因为最开始的时候使用的?id=xx的形式携带参数，后来改成了/xx的动态参数
 *    - 动态参数使用的是getStaticProps生成静态页面
 * 导致在使用动态参数的时候 无法mobx动态改变cs样式
 * 最终决定在做一个版本
 * 即:
 *    Simple        简洁页面
 *    Complexity    花哨一些
 *    Static        静态简洁页面
 */
/** 两种样式 */
enum INDEX_CSS_FILES {
  'css/pages/index.css',
  'css/pages/indexSimple.css'
}
export interface ICssStore{
  is_static_page: boolean;
  is_concise: boolean;
  indexDynamicCss: string;
  AlterConcise(): void;
  AlterIsStaticPage(): void;
}

export default class CssStore implements ICssStore {
  /** 切换是否是静态页面 */
  is_static_page = false
  /** 切换页面的css样式 */
  is_concise = this.is_static_page ? true : false

  indexDynamicCss = INDEX_CSS_FILES[0]

  constructor() {
    makeAutoObservable(this)
  }


  AlterConcise() {
    this.is_concise = !this.is_concise
    switch (this.indexDynamicCss) {
      case INDEX_CSS_FILES[0]:
        this.indexDynamicCss = INDEX_CSS_FILES[1]
        break;
      case INDEX_CSS_FILES[1]:
        this.indexDynamicCss = INDEX_CSS_FILES[0]
        break;
    }
  }
  AlterIsStaticPage() {
    this.is_static_page = !this.is_static_page
    //  静态 false => true -> 简介true
    this.is_static_page && !this.is_concise && this.AlterConcise()
  }

}

