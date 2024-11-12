import { Cards } from '@/components/card';
import { BorderLessHeading, TableDefaultStyle } from '@/container/style';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const businessStatus = [
  {
    tinhTrang: 'Hoạt động',
    tongSoMaSoThue: 10,
    tongTienMuaVao: 5000000,
    ngayCapNhat: '2024-07-20',
  },
  {
    tinhTrang: 'Ngừng hoạt động',
    tongSoMaSoThue: 5,
    tongTienMuaVao: 2500000,
    ngayCapNhat: '2024-07-21',
  },
  {
    tinhTrang: 'Đang xử lý',
    tongSoMaSoThue: 8,
    tongTienMuaVao: 4000000,
    ngayCapNhat: '2024-07-22',
  },
  {
    tinhTrang: 'Chờ xử lý',
    tongSoMaSoThue: 6,
    tongTienMuaVao: 3000000,
    ngayCapNhat: '2024-07-23',
  },
  {
    tinhTrang: 'Đã hoàn tất',
    tongSoMaSoThue: 12,
    tongTienMuaVao: 6000000,
    ngayCapNhat: '2024-07-24',
  },
];

const BusinessStatus = React.memo(() => {
  const { t } = useTranslation();
  const [list, setList] = useState(businessStatus);

  const tableColumns = [
    {
      title: 'Tình trạng',
      dataIndex: 'tinhTrang',
      key: 'tinhTrang',
    },
    {
      title: 'Tổng số mã số thuế',
      dataIndex: 'tongSoMaSoThue',
      key: 'tongSoMaSoThue',
    },
    {
      title: 'Tổng tiền mua vào',
      dataIndex: 'tongTienMuaVao',
      key: 'tongTienMuaVao',
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'ngayCapNhat',
      key: 'ngayCapNhat',
    },
  ];

  const getList = async () => {
    try {
      // const response = await axios.get(API_BUSINESS_STATUS);
      // setList(response?.data?.businessStatus || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const listData =
    list?.length > 0 &&
    list.map((value, index) => {
      const { tinhTrang, tongSoMaSoThue, tongTienMuaVao, ngayCapNhat } = value;
      return {
        key: index,
        tinhTrang,
        tongSoMaSoThue,
        tongTienMuaVao,
        ngayCapNhat,
      };
    });

  return (
    <div className="full-width-table">
      <BorderLessHeading>
        <Cards title={t('Dashboard_BusinessStatus')} size="large">
          <TableDefaultStyle className="invoice-having-header-bg">
            <div className="table-responsive">
              <Table columns={tableColumns} dataSource={listData} pagination={false} />
            </div>
          </TableDefaultStyle>
        </Cards>
      </BorderLessHeading>
    </div>
  );
});

export default BusinessStatus;
