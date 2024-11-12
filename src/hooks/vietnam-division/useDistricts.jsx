import { API_DISTRICTS, dataService } from '@/service';
import { getI18n } from '@/utils/index';
import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useDistricts = (provinceId) => {
  const { t } = useTranslation();
  const [districts, setDistricts] = useState([]);
  const [loadingDistricts, setLoadingDistricts] = useState(false);

  const getDistricts = async () => {
    try {
      setLoadingDistricts(true);

      const response = await dataService.get(API_DISTRICTS, { province_id: provinceId });
      const districts = response?.data;
      setDistricts(districts);
    } catch (error) {
      console.error(error);
      notification.error({
        message: t('Common_Error'),
        description: getI18n('Common_CanNotGetList', [getI18n('Provider_District')]),
      });
    } finally {
      setLoadingDistricts(false);
    }
  };

  useEffect(() => {
    provinceId && getDistricts();
  }, [provinceId]);

  return { districts, setDistricts, loadingDistricts, setLoadingDistricts };
};
