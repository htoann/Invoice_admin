import { Button } from '@/components/button';
import { Modal } from '@/components/modal';
import { BasicFormWrapper } from '@/container/style';
import { AutoComplete, Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, Select } from 'antd';
import { useTranslation } from 'react-i18next';

export const ModalCommon = ({
  form,
  handleOk,
  dataUpdate = {},
  onCancel,
  loading,
  textSubmit,
  fields,
  onValuesChange,
  size = 'default',
  title,
  open,
  width = 620,
}) => {
  const { t } = useTranslation();

  const renderField = (type, name, options = []) => {
    switch (type) {
      case 'select': {
        const loadingValue = (dataUpdate?.[name]?.id || dataUpdate?.[name] || options?.[0]?.id) && !options?.length;

        return (
          <Select disabled={loadingValue} loading={loadingValue}>
            {options?.map((option, index) => (
              <Select.Option key={index} value={option.id}>
                {t(option.name)}
              </Select.Option>
            ))}
          </Select>
        );
      }
      case 'date':
        return <DatePicker style={{ width: '100%' }} format="DD/MM/yyyy" />;
      case 'checkbox':
        return <Checkbox />;
      case 'autocomplete':
        return <AutoComplete />;
      case 'email':
        return <Input type="email" />;
      case 'number':
        return <InputNumber />;
      case 'input':
      default:
        return <Input />;
    }
  };

  const getRules = (type, required, defaultRules) => {
    if (defaultRules) {
      return defaultRules;
    }

    const rules = [];

    if (required) {
      rules.push({ required: true, message: t('Common_Input_Required') });
    }

    if (type === 'email') {
      rules.push({ type: 'email', message: t('Common_Invalid_Email') });
    }

    return rules;
  };

  return (
    <Modal title={title} open={open} onCancel={onCancel} width={width}>
      <BasicFormWrapper>
        <Form form={form} name="contactEdit" onFinish={handleOk} autoComplete="off" onValuesChange={onValuesChange}>
          <Row gutter={size === 'large' ? 24 : 0}>
            {fields.map(({ name, label, type, options, required, rules }) => (
              <Col span={size === 'large' ? 12 : 24} key={name}>
                <Form.Item
                  initialValue={
                    type === 'select'
                      ? dataUpdate?.[name]?.id || dataUpdate?.[name] || options?.[0]?.id
                      : dataUpdate?.[name]
                  }
                  label={t(label)}
                  name={name}
                  valuePropName={type === 'checkbox' ? 'checked' : 'value'}
                  rules={getRules(type, required, rules)}
                  style={{ marginBottom: 14 }}
                >
                  {renderField(type, name, options)}
                </Form.Item>
              </Col>
            ))}
          </Row>

          <div style={{ justifyContent: 'end', display: 'flex' }}>
            <Button size="default" type="white" outlined style={{ marginRight: 8 }} onClick={onCancel}>
              {t('Common_Cancel')}
            </Button>
            <Button type="primary" htmlType="submit" size="default" key="submit" loading={loading}>
              {textSubmit}
            </Button>
          </div>
        </Form>
      </BasicFormWrapper>
    </Modal>
  );
};
