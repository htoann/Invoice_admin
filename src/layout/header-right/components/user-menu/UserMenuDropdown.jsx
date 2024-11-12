import { Popover } from '@/components/popup';
import { UilAngleDown } from '@tooni/iconscout-unicons-react';
import { Avatar, Skeleton } from 'antd';
import { useAuth } from 'context/AuthContext';
import { Link } from 'react-router-dom';
import { UserMenu } from './UserMenu';

export const UserMenuDropdown = ({ setSettingOpen }) => {
  const { userInfo, loadingUserInfo } = useAuth();

  return (
    <div className="invoice-nav-actions__item invoice-nav-actions__author">
      {loadingUserInfo ? (
        <div className="invoice-nav-action-link">
          <Skeleton.Avatar active size={40} style={{ marginRight: 8 }} />
          <Skeleton.Input active style={{ width: 90, minWidth: 90 }} size="small" />
        </div>
      ) : (
        <Popover
          placement="bottomRight"
          content={<UserMenu userInfo={userInfo} setSettingOpen={setSettingOpen} />}
          action="click"
        >
          <Link to="#" className="invoice-nav-action-link">
            <Avatar size={40} style={{ backgroundColor: '#8231D3' }}>
              {(userInfo?.last_name || userInfo?.username)?.charAt(0)?.toUpperCase()}
            </Avatar>
            <span className="invoice-nav-actions__author--name">
              {userInfo?.first_name && userInfo?.last_name
                ? `${userInfo?.first_name} ${userInfo?.last_name}`
                : userInfo?.username}
            </span>
            <UilAngleDown />
          </Link>
        </Popover>
      )}
    </div>
  );
};
