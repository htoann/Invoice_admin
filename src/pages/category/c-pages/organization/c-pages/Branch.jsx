import { Button } from '@/components/button';
import { Cards } from '@/components/card';
import { Modal } from '@/components/modal';
import { BasicFormWrapper, BorderLessHeading } from '@/container/style';
import { API_BRANCH, API_BRANCHES, dataService } from '@/service';
import { RightOutlined } from '@ant-design/icons';
import { Col, Empty, Form, Input, Menu, notification, Skeleton } from 'antd';
import { useAppState } from 'context/AppContext';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MenuItem from '../components/MenuItem';

const BranchList = () => {
  const { t } = useTranslation();

  const {
    branches,
    setBranches,
    loadingBranches,
    getBranches,
    selectedBranchId,
    setSelectedBranchId,
    setSelectedDepartmentId,
  } = useAppState();

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [branchEdit, setBranchEdit] = useState(null);

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const handleCreateSubmit = async (values) => {
    try {
      setShowEdit(false);
      setLoading(true);

      await dataService.post(API_BRANCHES, {
        ...values,
      });

      getBranches();
      setShowCreate(false);
      form.resetFields();

      notification.success({
        message: t('Common_Branch'),
        description: t('Branch_CreateSuccess'),
      });
    } catch {
      notification.error({
        message: t('Common_Branch'),
        description: t('Branch_CreateError'),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (values) => {
    try {
      setLoading(true);

      const response = await dataService.put(API_BRANCH(branchEdit.id), {
        ...values,
      });
      const updatedAccount = response.data;

      const updatedAccounts = branches.map((acc) => (acc.id === updatedAccount.id ? updatedAccount : acc));
      setBranches(updatedAccounts);

      form.resetFields();
      setShowEdit(false);

      notification.success({
        message: t('Common_Branch'),
        description: t('Branch_EditSuccess'),
      });
    } catch {
      notification.error({
        message: t('Common_Branch'),
        description: t('Branch_EditError'),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);

      await dataService.delete(API_BRANCH(id));

      setBranches(branches.filter((item) => item.id !== id));
      setSelectedBranchId('');
      setSelectedDepartmentId('');

      notification.success({
        message: t('Common_Branch'),
        description: t('Branch_DeleteSuccess'),
      });
    } catch {
      notification.error({
        message: t('Common_Branch'),
        description: t('Branch_DeleteError'),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setShowCreate(true);
    setShowEdit(false);
  };

  const handleEdit = (item) => {
    setBranchEdit(item);
    setShowEdit(true);
    form.setFieldsValue(item);
  };

  const cancelCreate = () => {
    setShowCreate(false);
    form.resetFields();
  };

  const cancelEdit = () => {
    setShowEdit(false);
    form.resetFields();
  };

  const customModal = (textSubmit, onSubmit, onCancel, loading) => (
    <BasicFormWrapper>
      <Form form={form} onFinish={onSubmit} autoComplete="off">
        <Form.Item
          name="name"
          label={t('Branch_Name')}
          rules={[{ required: true, message: t('Branch_Name_Required') }]}
          initialValue={showEdit ? branchEdit?.name : ''}
        >
          <Input />
        </Form.Item>
        <div style={{ justifyContent: 'end', display: 'flex' }}>
          <Button size="default" type="white" outlined style={{ marginRight: 8 }} onClick={onCancel}>
            {t('Common_Cancel')}
          </Button>
          <Button htmlType="submit" size="default" type="primary" key="submit" loading={loading}>
            {textSubmit}
          </Button>
        </div>
      </Form>
    </BasicFormWrapper>
  );

  return (
    <Col xs={24} sm={12} md={8} lg={8}>
      <BorderLessHeading>
        <Cards title={t('Common_Branch')}>
          <Menu
            style={{ width: '100%', minHeight: 'var(--org-structure)', borderRight: 'none' }}
            mode="inline"
            selectedKeys={[selectedBranchId]}
            onClick={({ key }) => {
              setSelectedBranchId(key);
              setSelectedDepartmentId('');
            }}
            itemIcon={<RightOutlined />}
          >
            {loadingBranches ? (
              <Skeleton active style={{ marginTop: 10, paddingRight: 10 }} />
            ) : branches?.length > 0 ? (
              <>
                <Button
                  onClick={() => handleCreate()}
                  size="extra-small"
                  type="primary"
                  outlined
                  style={{ marginBottom: 10 }}
                >
                  + {t('Branch_Create')}
                </Button>
                {branches.map((department) => (
                  <Menu.Item key={department.id}>
                    <MenuItem
                      key={department.id}
                      item={department}
                      onEdit={() => handleEdit(department)}
                      onDelete={() => handleDelete(department.id)}
                      loading={loading}
                    />
                  </Menu.Item>
                ))}
              </>
            ) : (
              <Empty
                description={t('Branch_Empty_Description')}
                className="common-center"
                style={{
                  minHeight: 'var(--org-structure)',
                }}
              >
                <Button size="small" type="primary" onClick={() => handleCreate()}>
                  {t('Common_Create')}
                </Button>
              </Empty>
            )}
          </Menu>
        </Cards>
      </BorderLessHeading>

      <Modal title={t('Branch_Create')} open={showCreate} onCancel={cancelCreate}>
        {customModal(t('Common_Create'), handleCreateSubmit, cancelCreate, loading)}
      </Modal>

      <Modal title={t('Branch_Edit_Title')} open={showEdit} onCancel={cancelEdit}>
        {customModal(t('Common_Save'), handleEditSubmit, cancelEdit, loading)}
      </Modal>
    </Col>
  );
};

export default BranchList;
