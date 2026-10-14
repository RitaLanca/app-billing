import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import { NotificationProvider } from './context/NotificationContext.tsx'

// Static demo builds (portfolio) serve the API from an in-browser mock instead of json-server
const enableMocks = async () => {
  if (import.meta.env.VITE_ENABLE_MOCKS !== 'true') return;

  const { worker } = await import('./demo/browser');
  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
  });
};

enableMocks().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <NotificationProvider>
          <App />
      </NotificationProvider>
    </StrictMode>,
  );
});
