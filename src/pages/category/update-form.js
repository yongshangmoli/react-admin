import React, { Component } from 'react';
import { Input } from 'antd';
import { Form } from '@ant-design/compatible';
import PropTypes from 'prop-types';

const Item = Form.Item;

class UpdateForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string,
    setForm: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.setForm(this.props.form);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { categoryName } = this.props;
    return (
      <Form>
        <Item>
          {getFieldDecorator('categoryName', {
            initialValue: categoryName,
          })(<Input placeholder="请输入分类名称" />)}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(UpdateForm);
