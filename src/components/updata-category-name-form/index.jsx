import React, {Component} from 'react'
import {Form, Input} from "antd";
import PropTypes from 'prop-types';

const Item = Form.Item;


class UpdataCategoryNameForm extends Component {

  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm:PropTypes.func.isRequired
  };

  componentWillMount(){
    //一上来就将调用setfrom 传入form传给父组件
   this.props.setForm(this.props.form)
  }
  render() {

    const {getFieldDecorator} = this.props.form;
    const {categoryName} = this.props;

    return (
      <Form>
        <Item>
          {
            getFieldDecorator(
              'categoryName',
              {
                initialValue: categoryName
              }
            )(
              <Input />
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(UpdataCategoryNameForm)