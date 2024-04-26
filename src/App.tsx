import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {appInsights} from './telemetry';
import { useAppInsightsContext } from '@microsoft/applicationinsights-react-js';

function App() {
  // const appInsights = useAppInsightsContext();
  
  useEffect(() => {
    if (appInsights) {
      console.log("AppLoaded");
      appInsights.trackEvent({ name: "AppLoaded" });
      alert("AppLoaded");
    }
  }, [appInsights]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
