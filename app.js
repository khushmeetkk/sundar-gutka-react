import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import ErrorBoundary from "react-native-error-boundary";
import { createStore, errorHandler, FallBack } from "@common";
import Navigation from "./src/navigation";
import Loader from "./src/Loader/Loader";

const { store, persistor } = createStore();
function App() {
  return (
    <ErrorBoundary onError={errorHandler} FallbackComponent={FallBack}>
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
