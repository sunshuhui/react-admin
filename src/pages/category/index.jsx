import React, {Component} from 'react'

import MyButton from '../../components/my-button';

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
    categories: [],//保存所有一级分类数据
    subCategories: [],//保存所有二级分类数据
    isShowAdd: false,
    isShowUpdate: false,
    category: {},
    parentId: '0', //
    parentName: '', //初始化 name
    isSubCategoriesLoading: true,
  };

  //获取分类列表的方法
  getCategoryListings = async parentId => {
    //发送请求
    const result = await categoryListings(parentId);
    if (result.status === 0) {
      //成功更新数据
      if (parentId === '0') {
        //保存一级分类数据
        this.setState({
          categories: result.data
        })
      } else {
        if (result.data.length) {
          //保存二级分类数据
          this.setState({
            subCategories: result.data,
            isSubCategoriesLoading: true
          })
        } else {
          this.setState({
            subCategories: result.data,
            isSubCategoriesLoading: false
          })
        }
      }
    } else {
      message.error(
        '获取分类列表失败'
      )
    }
  }
  ;

//添加分类的函数
  addCategory = async () => {
    //获取添加的数据
    const {parentId, categoryName} = this.form.getFieldsValue();
    //发送请求  往后台添加
    const result = await reqAddCategory(parentId, categoryName);

    let updataState = {isShowAdd: false}
    //判断
    if (result.status === 0) {
      message.success('添加成功！');
      //更新数据
      const currentId = this.state.parentId
      if (parentId === '0') {
        //从后台拿去数据
        updataState.categories = [...this.state.categories, result.data]
      } else {
        if (currentId === parentId) {
          updataState.subCategories = [...this.state.subCategories, result.data]
        }
      }

    } else {
      message.error('添加失败！');
    }
    //统一等新状态
    this.setState(updataState)
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
    if (categoryName === name) {
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

          const {parentId} = this.state;
          if (parentId === '0') {
            return <div>
              <MyButton name='修改名称' onClick={() => this.setState({isShowUpdate: true, category})}/> &nbsp;&nbsp;&nbsp;
              <MyButton name='查看其子品类' onClick={() => {
                // 让table二级分类的数据
                this.setState({parentId: category._id, parentName: category.name})
                //请求二级分类的数据
                this.getCategoryListings(category._id)
              }}/>
            </div>

          } else {
            return <MyButton name='修改名称' onClick={() => this.setState({isShowUpdate: true, category})}/>
          }

        }
      }];
  }


  componentDidMount() {
    this.getCategoryListings('0')
  }

  render() {

//读取数据
    const {categories, isShowAdd, isShowUpdate, category, subCategories, parentId, parentName, isSubCategoriesLoading} = this.state;

    //判断是否是一级分类;
    const isCategory = parentId === '0';
    const data = isCategory ? categories : subCategories;

    const isLoading = isCategory ? categories.length === 0 : isSubCategoriesLoading && subCategories.length === 0

    return (
      <Card
        title={
          isCategory
            ? '一级分类列表'
            : <div>
              <MyButton name="一级分类" onClick={() => {
                this.setState({parentId: '0'})
              }
              }/><Icon type="arrow-right"/>&nbsp;&nbsp;{parentName}
            </div>

        }
        extra={<Button type="primary" onClick={() => this.setState({isShowAdd: true})}><Icon type="plus"/>添加品类</Button>}
      >
        <Table
          columns={this.columns}
          dataSource={data}
          bordered
          pagination={{
            pageSize: 3,
            showSizeChanger: true,
            pageSizeOptions: ['3', '6', '9',],
            showQuickJumper: true
          }}
          rowKey='_id'
          loading={isLoading}

          />


          < Modal
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

