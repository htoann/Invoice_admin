import { ButtonPermission } from '@/components/button';
import { ConfirmModal } from '@/components/modal/ConfirmModal';
import { PageHeader } from '@/components/page-header';
import { BasicFormWrapper } from '@/container/style';
import { LayoutContent } from '@/layout/LayoutContent';
import { API_INVOICES_CONNECT_AUTHORITY, dataService } from '@/service';
import { HDDT_CAPTCHA_AUTH_ENDPOINT, HDDT_CAPTCHA_ENDPOINT, PERMISSIONS } from '@/utils/index';
import { Col, Form, Input, notification, Row, Skeleton } from 'antd';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EStatusTax } from '../utils';
import './TaxConnect.scss';

function TaxConnect() {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [saving, setSaving] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [status, setStatus] = useState(null);
  const [showWarningUpdate, setShowWarningUpdate] = useState(false);
  const [showWarningCreate, setShowWarningCreate] = useState(false);

  const [imgCaptcha, setImgCaptcha] = useState();
  const [keyCaptcha, setKeyCaptcha] = useState();

  // const alertProps = {
  //   message: statusTextMap[status] || '',
  //   type: statusTypeMap[status] || 'info',
  //   icon: statusIconMap[status] || null,
  //   description: status === EStatusTax.Failure ? 'Kiểm tra thông tin đăng nhập' : undefined,
  // };

  const intervalRef = useRef(null);

  const getCaptcha = async () => {
    const data = await axios.get(HDDT_CAPTCHA_ENDPOINT);
    setImgCaptcha(data?.data?.content || null);
    setKeyCaptcha(data?.data?.key || null);
  };

  useEffect(() => {
    getCaptcha();
  }, []);

  useEffect(() => {
    (!showWarningCreate || !showWarningUpdate) && setSaving(false);
  }, [showWarningUpdate, showWarningCreate]);

  useEffect(() => {
    if (status !== EStatusTax.Success && status !== EStatusTax.Failure) {
      intervalRef.current = setInterval(getStatus, 10000);
    }

    return () => clearInterval(intervalRef.current);
  }, [status]);

  useEffect(() => {
    getInfo();
  }, []);

  const getStatus = async () => {
    try {
      const response = await dataService.get(API_INVOICES_CONNECT_AUTHORITY);
      setStatus(response?.data?.status);
    } catch (error) {
      console.error(error);
      notification.error({
        message: t('Common_ConnectTaxAuthorities'),
        description: t('Invoice_GetTaxConnectFailure'),
      });
    }
  };

  const getInfo = async () => {
    setLoadingInfo(true);
    try {
      const response = await dataService.get(API_INVOICES_CONNECT_AUTHORITY);
      const { status, ...fields } = response?.data || {};

      fields && Object.keys(fields)?.length > 0 && form.setFieldsValue(fields);
      setStatus(status);
      setIsCreate(!response?.data?.username);
    } catch (error) {
      console.error(error);
      notification.error({
        message: t('Common_ConnectTaxAuthorities'),
        description: t('Invoice_GetTaxConnectFailure'),
      });
    } finally {
      setLoadingInfo(false);
    }
  };

  const authenticateUser = async (values) => {
    const { username, password, cvalue } = values || {};
    try {
      await axios.post(HDDT_CAPTCHA_AUTH_ENDPOINT, {
        username,
        password,
        cvalue,
        ckey: keyCaptcha,
      });
      return true;
    } catch {
      getCaptcha();
      form.setFieldValue('cvalue', '');
      setSaving(false);
      setShowWarningUpdate(false);
      setShowWarningCreate(false);
      notification.error({
        message: t('Common_ConnectTaxAuthorities'),
        description: t('Common_CaptchaNotCorrect'),
      });
      return false;
    }
  };

  const connectToAuthority = async (values) => {
    try {
      const response = await dataService.post(API_INVOICES_CONNECT_AUTHORITY, { ...values });
      setIsCreate(!response?.data?.username);
      notification.success({
        message: t('Common_ConnectTaxAuthorities'),
        description: t('Common_UpdateSuccess'),
      });
    } catch (error) {
      const errMsg =
        error?.response?.data?.errors?.code === 'invalid_invoice_credentials'
          ? t('Common_InvalidUsernameOrPassword')
          : t('Common_UpdateFailure');

      notification.error({
        message: t('Common_ConnectTaxAuthorities'),
        description: errMsg,
      });
    } finally {
      getCaptcha();
      form.setFieldValue('cvalue', '');
      setSaving(false);
      setShowWarningUpdate(false);
      setShowWarningCreate(false);
    }
  };

  const handleOk = async () => {
    const values = form.getFieldsValue();
    setSaving(true);
    setStatus(EStatusTax.Waiting);

    if (await authenticateUser(values)) {
      await connectToAuthority(values);
    }
  };

  // const renderAlert = () =>
  //   status && (
  //     <div style={{ marginBottom: 15 }}>
  //       <Alert showIcon {...alertProps} />
  //     </div>
  //   );

  return (
    <div className="tax-connect-wrapper">
      <PageHeader className="invoice-page-header-main" title={t('Common_ConnectTaxAuthorities')} />
      <LayoutContent borderLessHeading cards>
        {loadingInfo ? (
          <Skeleton active style={{ marginTop: 30 }} />
        ) : (
          <BasicFormWrapper>
            {/* {renderAlert()} */}
            <Form
              form={form}
              onFinish={() => {
                if (isCreate) {
                  setShowWarningCreate(true);
                } else {
                  setShowWarningUpdate(true);
                }
              }}
              autoComplete="off"
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: t('Common_PleaseEnterUsername') }]}
                label={t('Common_Username')}
              >
                <Input placeholder={t('Common_Username')} />
              </Form.Item>

              <Form.Item
                name="password"
                label={t('Common_Password')}
                rules={[{ required: true, message: t('Common_PleaseEnterPassword') }]}
              >
                <Input.Password placeholder={t('Common_Password')} />
              </Form.Item>

              <Row gutter={20} align="middle">
                <Col span={12}>
                  <Form.Item
                    name="cvalue"
                    label={t('Common_Captcha')}
                    rules={[{ message: t('Common_PleaseEnterCaptcha'), required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12} style={{ marginTop: 'auto', marginBottom: '10px' }}>
                  {imgCaptcha && (
                    <img
                      loading="lazy"
                      width="100%"
                      height="40"
                      alt={t('Common_Captcha')}
                      src={`data:image/svg+xml;utf8,${encodeURIComponent(imgCaptcha)}`}
                    />
                  )}
                </Col>
              </Row>

              <div style={{ justifyContent: 'end', display: 'flex', marginTop: 30 }}>
                <ButtonPermission
                  permissions={PERMISSIONS.TAX_VIEW_UPDATE}
                  htmlType="submit"
                  size="default"
                  type="primary"
                >
                  {t('Common_Connect')}
                </ButtonPermission>
              </div>
            </Form>
          </BasicFormWrapper>
        )}
      </LayoutContent>

      <ConfirmModal
        open={showWarningUpdate}
        setOpen={setShowWarningUpdate}
        onConfirm={handleOk}
        loadingInfo={saving}
        description={t('Invoice_ConfirmSyncOnLoginChange')}
      />

      <ConfirmModal
        open={showWarningCreate}
        setOpen={setShowWarningCreate}
        onConfirm={handleOk}
        loadingInfo={saving}
        description={t('Invoice_ConfirmInitialDataSync')}
      />
    </div>
  );
}

export default TaxConnect;
