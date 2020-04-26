import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
const form = Form.useForm;

class SmartForm extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      validateMessages: {},
      needButton: true,
      buttons: [
        {
          text: '提交',
          attrs: {
            type: 'primary',
            htmlType: 'submit',
          },
        },
        {
          text: '取消',
          attrs: {
            type: '',
            htmlType: 'button',
          },
        },
      ],
      layout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      },
    };
    this.mapper = {
      Input,
    };
  }

  clearFieldHandle = () => {
    console.log(111111, form);
    // form.resetFields();
  };

  onFinish = (values) => {
    console.log('form finish', values);
    this.props.onSubmit && this.props.onSubmit(values);
  };

  onCancel = () => {
    this.clearFieldHandle();
    this.props.onReset && this.props.onReset();
  };

  onValuesChange = (changedValues, allValues) => {
    console.log(54333, this, changedValues, allValues);
    this.props.onValuesChange(changedValues, allValues);
  };
  render() {
    const FormItem = this.props.formConfig.map((v, idx) => {
      let { id, name, label, rules, controlAttrs = {}, formItemAttrs = {} } = v;
      let ControlName = this.mapper[v.control];
      return (
        <Form.Item
          name={name}
          label={label}
          rules={rules}
          {...formItemAttrs}
          key={id || idx}
        >
          <ControlName {...controlAttrs}></ControlName>
        </Form.Item>
      );
    });

    let Buttons = null;
    const nopFunc = function () {};
    if (this.state.needButton) {
      let btns = this.props.buttons;
      if (!btns || !Array.isArray(btns) || !btns.length) {
        btns = this.state.buttons;
      }
      // console.log(3333, this.state, btns)
      const ButtonItem = btns.map((v) => {
        return (
          <Button
            {...v.attrs}
            style={{ marginRight: '10px' }}
            onClick={v.handler.bind(this, ...arguments) || nopFunc}
          >
            {v.text}
          </Button>
        );
      });
      const tailLayout = {
        wrapperCol: { offset: 6 },
      };

      Buttons = <Form.Item {...tailLayout}> {ButtonItem} </Form.Item>;
    }

    const validateMessages = {
      required: '请填写${label}',
      types: {
        email: '${label}不合法',
        number: '${label}不合法',
      },
      number: {
        range: '${label}需要介于${min}和${max}之间',
      },
      ...(this.state.validateMessages || {}),
    };

    return (
      <Form
        ref={this.formRef}
        initialValues={this.props.initialValues || {}}
        name={'smart-form' + (this.props.formId || Date.now())}
        validateMessages={validateMessages}
        onFinish={this.onFinish}
        onValuesChange={this.onValuesChange}
        {...this.state.layout}
      >
        {FormItem}
        {Buttons}
      </Form>
    );
  }
}

export default SmartForm;
