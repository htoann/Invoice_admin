import { Spin } from 'antd';
import { Suspense } from 'react';
import { AuthenticationWrap } from './pages/style';

const AuthLayout = (WrapperContent) => {
  return function () {
    return (
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <AuthenticationWrap style={{ backgroundImage: `url("${require('@/static/img/admin-bg-light.png')}")` }}>
          <div className="invoice-authentication-wrap">
            <div className="invoice-authentication-brand">
              <img loading="lazy" src={require(`@/static/img/logo_dark.png`)} alt="" />
            </div>
            <WrapperContent />
          </div>
        </AuthenticationWrap>
      </Suspense>
    );
  };
};

export default AuthLayout;
