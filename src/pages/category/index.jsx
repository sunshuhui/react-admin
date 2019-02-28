import React, {Component} from 'react'
import {Card, Button, Icon, Table,} from 'antd';

export default class Category extends Component {
  render() {
    const columns = [{
      title: '品类名称',
      dataIndex: 'name',
    }, {
      title: '操作',
      width:300,
     render:xxx =>{
       return <div>
         <a href="javascript:void(0)">修改名称</a> &nbsp;&nbsp;&nbsp;
         <a href="javascript:void(0)">查看其子品类</a>
       </div>
     }

    }];

    const data = [{
      key: '1',
      name: '香奈儿',
      money: '￥320',

    }, {
      key: '2',
      name: '兰蔻',
      money: '￥400',

    }, {
      key: '3',
      name: '雅诗兰黛',
      money: '￥500',

    },
      {
        key: '4',
        name: '海蓝之谜',
        money: '￥600',

      },
      {
        key: '5',
        name: '迪奥',
        money: '￥700',

      },
      {
        key: '6',
        name: '圣罗兰',
        money: '￥800',

      },

      {
        key: '7',
        name: '希思黎',
        money: '￥900',

      },
      {
        key: '8',
        name: 'MAC',
        money: '￥900',

      },
      {
        key: '9',
        name: '科研室',
        money: '￥1000',

      },];
    return (
      <Card
        title="一级分类列表"
        extra={<Button type="primary"><Icon type="plus"/>添加品类</Button>}
      >
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={{
            pageSize: 3,
            showSizeChanger: true,
            pageSizeOptions: ['3', '6', '9', ],
            showQuickJumper: true
          }}
        />
      </Card>

    )
  }
}

