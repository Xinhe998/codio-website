import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { IoMdSearch } from 'react-icons/io';
import action from '../../actions';

import Layout from '../../components/Layout';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

import '../Index/index.scss';
import './index.scss';

import userImg from '../../assets/userImg.png';

const renderPortfolioPage = () => {
  const [userName, setUserName] = useState('Alice');
  const [list, setList] = useState(['會員管理', '圖表分析', '帳戶設定']);
  const { id } = useParams();
  return (
    <Layout userImg={userImg} userName={userName} list={list}>
      {id}
    </Layout>
  );
};

const notfound = () => <h1>404</h1>;

const portfolioRoutes = () => (
  <Switch>
    <Route exact path="/portfolio/:id" render={renderPortfolioPage} />
    {/* <Route component={notfound} /> */}
  </Switch>
);

const Portfolio = ({ match }) => {
  console.log(match);
  const { path, url } = useRouteMatch();
  return (
    <div className="Portfolio">
        <Route exact path="/portfolio/:id" component={renderPortfolioPage} />
      {renderPortfolioPage()}
    </div>
  );
};

const mapStateToProps = (store) => ({
  user: store.user,
  editor: store.editor,
});

export default withRouter(
  connect(
    mapStateToProps,
    action,
  )(Portfolio),
);
