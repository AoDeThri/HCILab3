import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { useMount } from "react-use"
import { connect } from 'umi'
import ReactEChartsCore from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { Row, Col, Card } from 'antd'
import styles from './index.less';


import { 
  BarChart,
  LineChart,
  PieChart,
} from 'echarts/charts';
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,

} from 'echarts/components';
import {
  CanvasRenderer
} from 'echarts/renderers';
import { result } from 'lodash-es';

echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer, PieChart]
);


export default connect (({json}) => ({
  data: json.data
}))(({data = [], dispatch = () => {}}) => {

  useMount(() => {
    dispatch({
      type: 'json/fetchJson',
    })
  })

  useEffect(() => {
    console.log(data)
  }, [data])

  const getAgePieData = () => {
    const result = []
    const nameClass = {}
    data.forEach((i) =>{
      nameClass[i.Age] = 
        nameClass[i.Age] == undefined? Number(i.Purchase) 
                            : nameClass[i.Age] + Number(i.Purchase)
    })
    for(const x in nameClass){
      result.push({
        name: x,
        value: nameClass[x]
      })
    }
    return result.sort((a, b) => {
      const nameA = a['name']
      const nameB = b['name']
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    })
  }

  const options = {
    title: {
      text: 'Age',
      subtext: 'FUck',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [{
      name: 'Age',
      type: 'pie',
      center: ['50%', '60%'],
      data: getAgePieData(),
      }
    ],
    emphasis: {
      itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }  
  }

  return (
    <PageContainer content="这是一个新页面，从这里进行开发！" className = {styles.main}>
      <Row>
        <Col>
          <Card
            className = {styles.pieCard}
          >
            <ReactEChartsCore
              echarts={echarts}
              option={options}
              notMerge={true}
              lazyUpdate={true}
            />
          </Card>
        </Col>
        <Col>
        </Col>
      </Row>
    </PageContainer>
  );
})
