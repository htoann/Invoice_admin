import CustomHeader from '@/components/HeaderCommon';
import { PageHeader } from '@/components/page-header';
import { LayoutContent } from '@/layout/LayoutContent';
import { API_PRODUCT, API_PRODUCTS, dataService } from '@/service';
import { UilEdit, UilTrash } from '@tooni/iconscout-unicons-react';
import { Popconfirm, notification } from 'antd';
import { useList } from 'hooks/useListCommon';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CreateProduct from './components/CreateProduct';
import DataTable from './components/DataTable';
import EditProduct from './components/EditProduct';
import { columnDataProduct } from './utils';

const Products = () => {
  const { t } = useTranslation();

  const [state, setState] = useState({
    visible: false,
    editVisible: false,
    update: {},
    pagination: { current: 1, pageSize: 20 },
  });

  const { pagination } = state;
  const { current, pageSize } = pagination;

  const [searchParams, setSearchParams] = useState({});

  const { list, loading, getList, setList } = useList(state, setState, API_PRODUCTS, t('Common_Goods'));

  useEffect(() => {
    getList(searchParams);
  }, [current, pageSize]);

  const showEditModal = (data) => {
    setState({
      ...state,
      editVisible: true,
      update: data,
    });
  };

  const handleDelete = async (id) => {
    try {
      await dataService.delete(API_PRODUCT(id));
      setList(list.filter((account) => account.id !== id));

      notification.success({
        message: t('Common_Success'),
        description: t('Product_DeleteSuccess'),
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: t('Common_Failure'),
        description: t('Product_DeleteError'),
      });
    }
  };

  const tableDataSource =
    list?.map((item, index) => ({
      key: item.id,
      stt: (current - 1) * pageSize + index + 1,
      ...item,
      action: (
        <div className="table-actions">
          <Link className="edit" to="#" onClick={() => showEditModal(item)}>
            <UilEdit />
          </Link>
          <Popconfirm
            title={t('Common_AreYouSureDelete')}
            onConfirm={() => handleDelete(item.id)}
            okText={t('Common_Yes')}
            cancelText={t('Common_No')}
          >
            <Link className="invoice-delete" to="#">
              <UilTrash />
            </Link>
          </Popconfirm>
        </div>
      ),
    })) || [];

  const dataTableColumn = columnDataProduct.map((col) => ({
    title:
      col.key === 'stt' || col.key === 'action' ? (
        t(col.title)
      ) : (
        <CustomHeader
          title={col.title}
          name={col.dataIndex}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          setState={setState}
        />
      ),
    dataIndex: col.dataIndex,
    key: col.key,
    sorter:
      col.key !== 'stt' && col.key !== 'action'
        ? (a, b) => a?.[col.dataIndex]?.props?.children?.localeCompare(b?.[col.dataIndex]?.props?.children)
        : false,
    fixed: col?.fixed,
    className: col.key === 'stt' || col.key === 'action' ? '' : 'searchInput',
  }));

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setState({ ...state, selectedRowKeys, selectedRows });
    },
    getCheckboxProps: (record) => ({
      id: record.id,
    }),
  };

  return (
    <>
      <PageHeader className="invoice-page-header-main" title={t('Common_ListProducts')} />
      <LayoutContent borderLessHeading cards cardsProps={{ headless: 'headless' }}>
        <DataTable
          tableData={tableDataSource}
          columns={dataTableColumn}
          rowSelection={rowSelection}
          state={state}
          setState={setState}
          loading={loading}
        />
      </LayoutContent>

      {state.visible && <CreateProduct state={state} setState={setState} list={list} setList={setList} />}

      {state.editVisible && <EditProduct state={state} setState={setState} list={list} setList={setList} />}
    </>
  );
};

export default Products;
