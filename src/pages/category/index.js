import React, { Component } from 'react';
import './index.less';
import { Card, Table, Button, message, Modal } from 'antd';
import UpdateForm from './update-form';
import AddForm from './add-form';
import LinkButton from '../../components/link-button';
import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api';
import { RightOutlined } from '@ant-design/icons';

class Category extends Component {
  state = {
    categorys: [],
    subCategory: [],
    parentId: '0',
    parentName: '',
    loading: false,
    showStatus: 0,
  };

  getCategorys = async (parentId) => {
    this.setState({
      loading: true,
    });
    parentId = parentId || this.state.parentId;
    const result = await reqCategorys(parentId);
    this.setState({
      loading: false,
    });
    if (result.status === 0) {
      const categorys = result.data;
      if (parentId === '0') {
        this.setState({ categorys });
      } else {
        this.setState({
          subCategory: categorys,
        });
      }
    } else {
      message.error('获取列表失败');
    }
  };

  showSubCates = (category) => {
    this.setState(
      {
        parentId: category._id,
        parentName: category.name,
      },
      () => {
        this.getCategorys();
      }
    );
  };

  showCategorys = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: [],
      showStatus: 0,
    });
  };

  showAdd = () => {
    this.setState({
      showStatus: 1,
    });
  };

  showUpdate = (category) => {
    this.category = category;
    this.setState({
      showStatus: 2,
    });
  };

  addCategory = async () => {
    const { parentId, categoryName } = this.form.getFieldsValue();
    // console.log(33333333, this.form.getFieldsValue())
    this.setState({
      showStatus: 0,
    });
    this.form.resetFields();
    const result = await reqAddCategory(categoryName, parentId);
    if (result.status === 0) {
      if (parentId === this.state.parentId) {
        this.getCategorys();
      } else if (parentId === '0') {
        this.getCategorys('0');
      }
    }
  };

  updateCategory = async () => {
    const categoryId = this.category._id;
    const { categoryName } = this.form.getFieldsValue();
    this.setState({ showStatus: 0 });
    this.form.resetFields();
    const result = await reqUpdateCategory({ categoryId, categoryName });
    if (result.status === 0) {
      this.getCategorys();
    }
  };

  componentWillMount() {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (category) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(category)}>
              修改分类
            </LinkButton>
            {this.state.parentId === '0' ? (
              <LinkButton onClick={() => this.showSubCates(category)}>
                查看子分类
              </LinkButton>
            ) : null}
          </span>
        ),
      },
    ];
  }

  componentDidMount() {
    this.getCategorys();
  }

  render() {
    const {
      categorys,
      subCategorys,
      parentId,
      parentName,
      loading,
      showStatus,
    } = this.state;
    const category = this.category || {};
    const title =
      parentId === '0' ? (
        '一级分类列表'
      ) : (
        <span>
          <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
          &nbsp;&nbsp;
          <RightOutlined />
          &nbsp;&nbsp;
          <span>{parentName}</span>
        </span>
      );
    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        添加
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey="_id"
          dataSource={parentId === '0' ? categorys : subCategorys}
          columns={this.columns}
          loading={loading}
          pagination={{
            pageSize: 5,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
        ></Table>
        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={() => this.setState({ showStatus: 0 })}
        >
          <AddForm
            categorys={categorys}
            parentId={parentId}
            setForm={(form) => (this.form = form)}
          ></AddForm>
        </Modal>
        <Modal
          title="更新分类"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={() => {
            this.setState({ showStatus: 0 });
            this.form.resetFields();
          }}
        >
          <UpdateForm
            categoryName={category.name}
            setForm={(form) => (this.form = form)}
          ></UpdateForm>
        </Modal>
      </Card>
    );
  }
}

export default Category;
