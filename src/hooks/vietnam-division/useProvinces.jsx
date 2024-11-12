import { API_PROVINCES, dataService } from '@/service';
import { getI18n } from '@/utils/index';
import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useProvinces = () => {
  const { t } = useTranslation();
  const [provinces, setProvinces] = useState([]);
  const [loadingProvinces, setLoadingProvinces] = useState(false);

  const getProvinces = async () => {
    try {
      setLoadingProvinces(true);

      const response = await dataService.get(API_PROVINCES);
      const provinces = response?.data;
      setProvinces(provinces);
    } catch (error) {
      console.error(error);
      notification.error({
        message: t('Common_Error'),
        description: getI18n('Common_CanNotGetList', [getI18n('Provider_Province')]),
      });
    } finally {
      setLoadingProvinces(false);
    }
  };

  useEffect(() => {
    getProvinces();
  }, []);

  return { provinces, setProvinces, loadingProvinces, setLoadingProvinces };
};
