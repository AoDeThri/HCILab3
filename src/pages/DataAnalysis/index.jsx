import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { useMount } from "react-use"
import { connect } from 'umi'
import ReactEChartsCore from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { Row, Col, Card } from 'antd'
import styles from './index.less';
import 'echarts-gl'


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
  [TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer, PieChart, LineChart]
);


export default connect (({json}) => ({
  data: json.data
}))(({data = [], dispatch = () => {}}) => {

  useMount(() => {
    dispatch({
      type: 'json/fetchJson',
    })
  })


  const sortPieFunction = (a, b) => {
    const nameA = a['name']
      const nameB = b['name']
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
  }

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
    return result.sort(sortPieFunction)
  }

  const getGenderAxisData = () =>{
    const result = []
    const nameClass = {}
    data.forEach((i) =>{
      const index = i.Gender + i.Marital_Status
      nameClass[index] = 
        nameClass[index] == undefined? Number(i.Purchase) 
                            : nameClass[index]+ Number(i.Purchase)
    })
    for(const x in nameClass){
      result.push({
        name: x,
        value: nameClass[x]
      })
    }
    return result.sort(sortPieFunction)
  }

  const getGenderPieData = () => {
    const result = []
    const nameClass = {}
    data.forEach((i) =>{
      const index = i.Gender == 'M' ? 'Male': 'Female'
      nameClass[index] = 
        nameClass[index] == undefined? Number(i.Purchase) 
                            : nameClass[index] + Number(i.Purchase)
    })
    for(const x in nameClass){
      result.push({
        name: x,
        value: nameClass[x]
      })
    }
    return result.sort(sortPieFunction)
  }

  const getProductPieData = () =>{
    const result = []
    const nameClass = {}
    data.forEach((i) =>{
      const index = i.Product_ID
      nameClass[index] = 
        nameClass[index] == undefined? Number(i.Purchase) 
                            : nameClass[index] + Number(i.Purchase)
    })
    for(const x in nameClass){
      result.push({
        name: x,
        value: nameClass[x]
      })
    }
    return result.sort(sortPieFunction)
  }

  const genderAxis = () => {
    const result = getGenderAxisData()
    const type = ["未婚", "已婚"]
    const sex = ["Female", "Male"]
    const zcount = result.length == 0? [0, 0] : [
      result[0].value/1000000, 
      result[2].value/1000000
    ]
    const mcount = result.length == 0? [0, 0] : [
      result[1].value/1000000, 
      result[3].value/1000000
    ]
    console.log(result)
    return {
      title: {
        text: '购买量',
        subtext: '单位:百万'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
      },
      legend: {
        data: type
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: sex
      },
      series: [
        {
            name: '已婚',
            type: 'bar',
            data: zcount
        },
        {
            name: '未婚',
            type: 'bar',
            data: mcount
        }
      ]
    }
  }

  const agePieOptions = {
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

  const genderPieOptions = {
    title: {
      text: 'Gender',
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
      data: getGenderPieData(),
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

  const productIdOptions = {
    title: {
      text: 'Gender',
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
      data: getProductPieData(),
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

  const getCityYearsPieData = () => {
    const result = []
    const nameClass = {}
    data.forEach((i) =>{
      const index = i.Stay_In_Current_City_Years
      nameClass[index] = 
        nameClass[index] == undefined? Number(i.Purchase) 
                            : nameClass[index] + Number(i.Purchase)
    })
    for(const x in nameClass){
      result.push({
        name: x,
        value: nameClass[x]
      })
    }
    return result.sort(sortPieFunction)
  }

  const getCityCategoryData = () => {
    const result = []
    const nameClass = {}
    data.forEach((i) =>{
      const index = i.City_Category
      nameClass[index] = 
        nameClass[index] == undefined? Number(i.Purchase) 
                            : nameClass[index] + Number(i.Purchase)
    })
    for(const x in nameClass){
      result.push({
        name: x,
        value: nameClass[x]
      })
    }
    return result.sort(sortPieFunction)
  }

  const cityCategoryOptions = ()  => {
    const xAxisData = []
    const seriesData = []
    const dataResult = getCityCategoryData();
    dataResult.forEach((i) => {
      xAxisData.push(i.name)
      seriesData.push(i.value / 1000000)
    })
    return {
      title: {
        text: 'City Category',
        subtext: '单位:百万',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: seriesData,
        type: 'bar'
      }]
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
              option={agePieOptions}
              notMerge={true}
              lazyUpdate={true}
            />
          </Card>
        </Col>
        <Col>
          <Card className = {styles.pieCard}>
            <ReactEChartsCore
              echarts={echarts}
              option={genderPieOptions}
              notMerge={true}
              lazyUpdate={true} 
            />
          </Card>
        </Col>
        <Col>
          <Card className = {styles.pieCard}>
            <ReactEChartsCore
              echarts={echarts}
              option={genderAxis()}
              notMerge={true}
              lazyUpdate={true} 
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className = {styles.pieCard}>
          </Card>
        </Col>
        <Col>
          <Card className = {styles.pieCard}>
            <ReactEChartsCore
              echarts={echarts}
              option={cityCategoryOptions()}
              notMerge={true}
              lazyUpdate={true} 
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
})
