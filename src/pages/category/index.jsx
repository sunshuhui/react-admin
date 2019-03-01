import React, {Component} from 'react'
import {
  Card,
  Button,
  Icon,
  Table,
  message,
  Modal,
} from 'antd';
import {categoryListings, reqAddCategory, reqUpdataName} from '../../api';
import AddCategoryForm from '../../components/add-category-form'
import UpdataCategoryNameForm from '../../components/updata-category-name-form'

export default class Category extends Component {
  //初始化列表状态
  state = {
    categories: [],
    isShowAdd: false,
    isShowUpdate: false,
    category: {}
  };

  //获取分类列表的方法
  getCategoryListings = async parentId => {
    //发送请求
    const result = await categoryListings(parentId);
    if (result.status === 0) {
      //成功更新数据
      this.setState({
        categories: result.data
      })
    } else {
      message.error('获取分类列表失败')
    }
  };

  //添加分类的函数
  addCategory = async () => {
    //获取添加的数据
    const {parentId, categoryName} = this.form.getFieldsValue();
    //发送请求  往后台添加
    const result = await reqAddCategory(parentId, categoryName);

    //判断
    if (result.status === 0) {
      message.success('添加成功！');
      //从后台拿去数据
      this.setState({
        categories: [...this.state.categories, result.data],
        isShowAdd: false
      })
    } else {
      message.error('添加失败！');
      this.setState({
        isShowAdd: false
      })
    }
    //清空用户的输入
    this.form.resetFields();
  };

  //修改名称的函数
  updateCategoryName = async () => {
    //点击确认，获取修改的信息
    const categoryName = this.form.getFieldValue('categoryName')
    //获取修改前的数据
    const {name, _id} = this.state.category
    //判断前后是否一致，如果一致不修改
    if (categoryName ===name) {
      message.warn('请修改名称')
    } else {
      //获取ajax请求保存在后台
      const result = await reqUpdataName(_id, categoryName)
      if (result.status === 0) {
        message.success('修改名称成功')
        //关闭对话框，更新页面显示
        this.setState({
          isShowUpdate: false,
          categories: this.state.categories.map(item => {
            if (item._id === _id) {
              item.name = categoryName
            }
            return item
          })
        })
      } else {
        message.error('修改名称失败')
        this.setState({
          isShowUpdate: false
        })
      }
    }
  };


  componentWillMount() {
    this.columns = [
      {
        title: '品类名称',
        dataIndex: 'name',
      }, {
        title: '操作',
        width: 300,
        render: category => {
          return <div>
            <a href="javascript:void(0)"
               onClick={() => this.setState({isShowUpdate: true, category})}>修改名称</a> &nbsp;&nbsp;&nbsp;
            <a href="javascript:void(0)">查看其子品类</a>
          </div>
        }
      }];
  }


  componentDidMount() {
    this.getCategoryListings('0')
  }

  render() {

//读取数据
    const {categories, isShowAdd, isShowUpdate, category} = this.state;
    return (
      <Card
        title="一级分类列表"
        extra={<Button type="primary" onClick={() => this.setState({isShowAdd: true})}><Icon type="plus"/>添加品类</Button>}
      >
        <Table
          columns={this.columns}
          dataSource={categories}
          bordered
          pagination={{
            pageSize: 3,
            showSizeChanger: true,
            pageSizeOptions: ['3', '6', '9',],
            showQuickJumper: true
          }}
          rowKey='_id'
          loading={categories.length === 0}

        />


        <Modal
          title="更新分类"
          visible={isShowUpdate}
          okText='确认'
          cancelText='取消'
          onOk={this.updateCategoryName}
          onCancel={() => this.setState({isShowUpdate: false})}
          width={300}
        >
          <UpdataCategoryNameForm categoryName={category.name} setForm={form => this.form = form}/>
        </Modal>

        <Modal
          title="添加品类"
          visible={isShowAdd}
          okText='确认'
          cancelText='取消'
          onOk={this.addCategory}
          onCancel={() => this.setState({isShowAdd: false})}
        >
          <AddCategoryForm categories={categories} setForm={form => this.form = form}/>


        </Modal>
      </Card>

    )
  }
}

