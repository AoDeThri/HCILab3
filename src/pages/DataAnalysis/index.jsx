import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { useMount } from "react-use"
import ReactEChartsCore from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { 
  BarChart,
  LineChart,
} from 'echarts/charts';
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,

} from 'echarts/components';
import {
  CanvasRenderer
} from 'echarts/renderers';

echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer]
);


export default () => {

  useMount(() => {
    
  })

  const options = {
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
      data:['销量']
    },
    xAxis: {
      data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }]
  }

  return (
    <PageContainer content="这是一个新页面，从这里进行开发！" >
      <ReactEChartsCore
        echarts={echarts}
        option={options}
        notMerge={true}
        lazyUpdate={true}
      />
    </PageContainer>
  );
};
