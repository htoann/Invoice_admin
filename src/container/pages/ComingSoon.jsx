import { Cards } from '@/components/card';
import { PageHeader } from '@/components/page-header';
import { Col, Row } from 'antd';
import { useAppState } from 'context/AppContext';
import FontAwesome from 'react-fontawesome';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Main } from '../style';
import { ComingSoonStyleWrapper } from './style';

function ComingSoon() {
  const { t } = useTranslation();
  const { layoutMode } = useAppState();

  return (
    <>
      <PageHeader className="invoice-page-header-main" title={t('Common_ComingSoonTitle')} />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <ComingSoonStyleWrapper>
              <Cards headless>
                <div className="invoice-logo">
                  {layoutMode === 'lightMode' ? (
                    <img loading="lazy" src={require('@/static/img/logo_dark.png')} alt="" />
                  ) : (
                    <img loading="lazy" src={require('@/static/img/logo_white.svg')} alt="" />
                  )}
                </div>
                <div className="coming-soon-content">
                  <h1>{t('Common_ComingSoonTitle')}</h1>
                  <p>{t('Common_ComingSoonContent')}</p>
                </div>
                <div className="coming-soon-social">
                  <ul>
                    <li>
                      <Link to="#" className="facebook">
                        <FontAwesome name="facebook" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="twitter">
                        <FontAwesome name="twitter" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="globe">
                        <FontAwesome name="globe" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="github">
                        <FontAwesome name="github" />
                      </Link>
                    </li>
                  </ul>
                  <p>{t('Common_CopyRight')}</p>
                </div>
              </Cards>
            </ComingSoonStyleWrapper>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default ComingSoon;
