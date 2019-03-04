import React, {Component} from 'react'
import {Card, Button, Icon, Table, Select, Input, message} from 'antd'
import MyButton from "../../components/my-button";
import {reqProductsList,reqSearchProductsList} from '../../api'


const Option = Select.Option
export default class Index extends Component {
  state = {
    pageNum: [],
    total: 0,
    searchType: 'productName',
    searchName: ''
  }

  componentWillMount() {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      }, {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        width: 200,
      },
      {
        title: '状态',
        width: 200,
        render: category => {
          return <div>
            <Button type='primary'>上架</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            在售
          </div>
        }
      }, {
        title: '操作',
        width: 200,
        render: product => {
          return <div>
            <MyButton name='详情'/> &nbsp;&nbsp;&nbsp;
            <MyButton name='修改' onClick={()=>this.props.history.push('/product/saveupdate',{product})}/>
          </div>
        }
      }];
  }

  getProducts = async (pageNum, pageSize) => {

    //获取表单项的值
    const {searchName, searchType} = this.state;
    let result;

    if (searchName) {
      result = await reqSearchProductsList({searchName, searchType, pageNum, pageSize});
    } else {
      result = await reqProductsList(pageNum, pageSize);
    }

    //
    if (result.status === 0) {
      this.setState({
        pageNum: result.data.list,
        total: result.data.total
      })
    } else {
      message.error('添加数据失败')
    }
  }


  componentDidMount() {
    this.getProducts(1, 2)
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }



  render() {
    const {pageNum, total} = this.state;

    return (
      <Card
        title={
          <div>
            <Select defaultValue='productName' onChange={value => this.handleChange('searchType', value)}>
              <Option value='productName'>根据商品名称</Option>
              <Option value='productDesc'>根据商品描述</Option>
            </Select>
            <Input placeholder='关键字' style={{width: 200, marginLeft: 15, marginRight: 15}}/>
            <Button type='primary' onClick={() => this.getProducts(1, 2)}>搜素&nbsp;&nbsp;&nbsp;</Button>

          </div>
        }
        extra={<Button type='primary' onClick={() => this.props.history.push('/product/saveupdata')}><Icon type='plus'/>添加产品</Button>}
      >
        <Table
          columns={this.columns}
          dataSource={pageNum}
          bordered
          pagination={{
            defaultPageSize: 2,
            showSizeChanger: true,
            pageSizeOptions: ['3', '6', '9',],
            showQuickJumper: true,
            total,
            onChange: this.getProducts,
            onShowSizeChange: this.getProducts
          }}
          rowKey='_id'
          loading={false}

        />
      </Card>

    )
  }
}

