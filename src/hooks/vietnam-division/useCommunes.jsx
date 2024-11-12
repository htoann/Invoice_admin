import { API_COMMUNES, dataService } from '@/service';
import { getI18n } from '@/utils/index';
import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useCommunes = (districtId) => {
  const { t } = useTranslation();
  const [communes, setCommunes] = useState([]);
  const [loadingCommunes, setLoadingCommunes] = useState(false);

  const getCommunes = async () => {
    try {
      setLoadingCommunes(true);

      const response = await dataService.get(API_COMMUNES, {
        district_id: districtId,
      });
      const communes = response?.data;
      setCommunes(communes);
    } catch (error) {
      console.error(error);
      notification.error({
        message: t('Common_Error'),
        description: getI18n('Common_CanNotGetList', [getI18n('Provider_Ward')]),
      });
    } finally {
      setLoadingCommunes(false);
    }
  };

  useEffect(() => {
    districtId && getCommunes();
  }, [districtId]);

  return { communes, setCommunes, loadingCommunes, setLoadingCommunes };
};
