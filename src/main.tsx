
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' for React 18
import App from './App';

// Create a root element using createRoot
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
