/*
 * @Author: lyc
 * @Date: 2020-10-25 21:46:18
 * @LastEditors: lyc
 * @LastEditTime: 2021-02-17 21:03:34
 * @Description: 使用参数的形式访问该页面  即?id=xxx
 */
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import {
  Col,
  Row,
  List,
  Breadcrumb,
  BackTop,
  ConfigProvider,
  Divider,
  Badge,
  Pagination,
} from "antd";
import zhCN from "antd/lib/locale/zh_CN";

import {
  FireOutlined,
  CalendarOutlined,
  FolderOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import servicePath from "../config/apiUrl";

import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import "../styles/pages/comp.css";
import "animate.css";
import LazyLoad, { lazyload } from "react-lazyload";
import { useRouter } from "next/router";
import { ARTICLE_TYPE } from "../config/articleType.js";
import ArticleList from "../components/ArticleList";
const myList = (props) => {
  const [myList, setMylist] = useState(props.data.article);
  const [articleType, setType] = useState("");
  const renderer = new marked.Renderer();
  const router = useRouter();

  let total = props.data.num[0].total;
  /**
   * @description: 每次进入不同的列表页的时候
   *               更改mylist的值 让页面动态刷新
   */
  useEffect(() => {
    setMylist(props.data.article);
    checkArticleType();
  }, [router]);

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });
  const checkArticleType = () => {
    switch (router.query.id) {
      case "1":
        setType(ARTICLE_TYPE.ONE);
        break;
      case "2":
        setType(ARTICLE_TYPE.TWO);
        break;
      case "3":
        setType(ARTICLE_TYPE.THREE);
        break;
    }
  };
  const gotoPage = (page, pageSize) => {
    axios(`${servicePath.getList}/${router.query.id}/${page}/${pageSize}`).then(
      (res) => {
        setMylist(res.data.data.article);
      }
    );
  };
  return (
    <>
      <Header />
      <Row className="comm-main" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link href="/">
                  <a>首页</a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{articleType}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          {/* 文章列表 */}
          <ArticleList title={articleType} myList={myList} />

          <ConfigProvider locale={zhCN}>
            <LazyLoad>
              <div className="animate__animated animate__rubberBand animate__slow">
                <Pagination
                  total={total}
                  showSizeChanger
                  showQuickJumper
                  showTotal={(total) => `共 ${total} 条`}
                  onChange={(page, pageSize) => gotoPage(page, pageSize)}
                  className="animate__animated animate__bounceInUp"
                  style={{
                    textAlign: "center",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                  }}
                />
              </div>
            </LazyLoad>
          </ConfigProvider>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <div className="animate__animated animate__fadeInRightBig">
            <Author />
            <Advert />
          </div>
        </Col>
      </Row>
      <Footer />

      <BackTop>
        <RocketOutlined />
      </BackTop>
    </>
  );
};

myList.getInitialProps = async (context) => {
  let id = context.query.id;
  const promise = new Promise((resolve) => {
    axios(`${servicePath.getList}/${id}/1/10`).then((res) => {
      resolve(res.data);
    });
  });
  return await promise;
};

export default myList;