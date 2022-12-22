import React,{Component} from 'react';
import ReactDOM from 'react-dom/client';
import RKS from 'react-keycloak-spa';
import App from './App';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

class Login extends Component{
  render(){
    return (
      <RKS
        config={{
          "clientId":'Club',
          "realm": "burux",
          "url": "https://iam.burux.com/auth/",
          "ssl-required": "external",
          "resource": "Club",
          "public-client": true,
          "confidential-port": 0
        }}
        component={App}
      />
    )
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
