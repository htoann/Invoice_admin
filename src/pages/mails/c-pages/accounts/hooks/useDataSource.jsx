import { UilEdit, UilTrash } from '@tooni/iconscout-unicons-react';
import { Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const useTableDataSource = ({ accounts, current, pageSize, showEditModal, handleDelete }) => {
  const { t } = useTranslation();

  const tableDataSource =
    accounts?.length > 0
      ? accounts.map((item, index) => ({
          key: item?.id,
          stt: (current - 1) * pageSize + index + 1,
          id: item?.id,
          name: item?.name,
          email: item?.email,
          branch: item?.branch?.name,
          department: item?.department?.name,
          project: item?.project?.name,
          action: (
            <div className="table-actions">
              <Link className="edit" to="#" onClick={() => showEditModal(item)}>
                <UilEdit />
              </Link>
              <Popconfirm
                title={t('Common_AreYouSureDelete')}
                onConfirm={() => handleDelete(item?.id)}
                okText={t('Common_Yes')}
                cancelText={t('Common_No')}
              >
                <Link className="invoice-delete" to="#">
                  <UilTrash />
                </Link>
              </Popconfirm>
            </div>
          ),
        }))
      : [];

  return tableDataSource;
};
