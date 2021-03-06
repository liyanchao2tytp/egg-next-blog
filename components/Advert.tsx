/*
 * @Author: lyc
 * @Date: 2020-10-09 08:57:28
 * @LastEditors: lyc
 * @LastEditTime: 2021-02-18 13:56:07
 * @Description: 主页右侧 广告信息组件
 */

import { FC } from "react";

const Advert :FC= () => (
  <div className="add-div">
    <style jsx={true}>
      {`
        .add-div {
          margin-top: 1rem;
        }
        .add-div div {
          border-radius: 0.3rem;
          margin-bottom: 0.2rem;
          overflow: hidden;
        }
      `}
    </style>

    <div>
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602135338045&di=817474e03f8558c489effa99d488d4cd&imgtype=0&src=http%3A%2F%2Fi7.download.fd.pchome.net%2Ft_1600x900%2Fg1%2FM00%2F0C%2F15%2FooYBAFRumxiIX2VkAAHmBXHWWQMAACGQwDgQGAAAeYd940.jpg"
        width="100%"
      />
    </div>
   
    <div>
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602134924592&di=abd6331168d6f7357efb395da4c6a4fb&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2Fbb03d044ad345982d648b31f07f431adc9ef845f.jpg"
        width="100%"
      />
    </div>
  </div>
);

export default Advert;
