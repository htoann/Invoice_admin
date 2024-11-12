import { API_MAILS_ACCOUNTS, dataService } from '@/service';
import { getI18n } from '@/utils/index';
import { notification } from 'antd';
import { useAppState } from 'context/AppContext';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useGetMailAccounts = () => {
  const { t } = useTranslation();
  const { selectedBranchId, selectedDepartmentId, selectedProjectId, setSelectedAccountId } = useAppState();

  const [mailAccountList, setMailAccountList] = useState([]);
  const [loadingMailAccounts, setLoadingMailAccounts] = useState(false);

  const getMailAccounts = async () => {
    try {
      setLoadingMailAccounts(true);

      const response = await dataService.get(API_MAILS_ACCOUNTS, {
        branch_id: selectedBranchId,
        department_id: selectedDepartmentId,
        project_id: selectedProjectId,
      });

      const mailAccounts = response?.data?.results;

      setMailAccountList(mailAccounts);
      setSelectedAccountId(mailAccounts?.[0]?.id);
    } catch (error) {
      console.error(error);
      notification.error({
        message: t('Common_Error'),
        description: getI18n('Common_CanNotGetList', [t('Common_Account')]),
      });
    } finally {
      setLoadingMailAccounts(false);
    }
  };

  useEffect(() => {
    getMailAccounts();
  }, [selectedBranchId, selectedDepartmentId, selectedProjectId]);

  return { mailAccountList, setMailAccountList, loadingMailAccounts, setLoadingMailAccounts };
};
