import "./App.css";
import { Component, lazy, Suspense } from "react";
import { Routes, Route, useLocation, useNavigate, useParams, BrowserRouter } from "react-router-dom";
import { connect, Provider } from 'react-redux';
import { compose } from "redux";
import { initializeApp } from './redux/app-reducer';
import store from './redux/redux-store';
import Nav from "./components/Nav/Nav";
import HeaderContainer from "./components/Header/HeaderContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import MessagesContainer from "./components/Messages/MessagesContainer";
import Login from "./components/Login/Login";
import Preloader from "./components/Common/Preloader/Preloader";

const Friends = lazy(() => import("./components/Friends/Friends"));
const UsersContainer = lazy(() => import("./components/Users/UsersContainer"));
const News = lazy(() => import("./components/News/News"));
const Music = lazy(() => import("./components/Music/Music"));
const Settings = lazy(() => import("./components/Settings/Settings"));

class App extends Component {

  componentDidMount() {
    this.props.initializeApp();
  }

  render() {

    if (!this.props.initialized) {
      <Preloader/>
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Nav />
        <div className="app-wrapper-content">
          <Routes>
            <Route path="/profile/*" element={<ProfileContainer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/friends" element={<Suspense fallback={<div><Preloader /></div>}><Friends /></Suspense>} />
            <Route path="/messages/*" element={<MessagesContainer />} />
            <Route path="/users" element={<Suspense fallback={<div><Preloader /></div>}><UsersContainer /></Suspense>} />
            <Route path="/news" element={<Suspense fallback={<div><Preloader /></div>}><News /></Suspense>} />
            <Route path="/music" element={<Suspense fallback={<div><Preloader /></div>}><Music /></Suspense>} />
            <Route path="/settings" element={<Suspense fallback={<div><Preloader /></div>}><Settings /></Suspense>} />
          </Routes>
        </div>
      </div>
  );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})

const withRouter = (Component) => {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component {...props} router={{location, navigate, params}} />
    )
  }
  return ComponentWithRouterProp;
}
const AppContainer = compose(connect(mapStateToProps, { initializeApp }))(withRouter(App));

const SamuraiJsApp = (props) => {
  return <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    </BrowserRouter>
}

export default SamuraiJsApp;