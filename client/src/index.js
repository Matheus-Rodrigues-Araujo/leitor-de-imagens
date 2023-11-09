import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css'
// import App from './App';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CadastroPlaca from './routes/cadastroPlaca';
import RelatorioCidade from './routes/relatorioCidade';
import ConsultaPlaca from './routes/consultaPlaca';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <CadastroPlaca/>,

      },
      {
        path: "/relatorio/cidade/:cidade",
        element: <RelatorioCidade/>,
      },
      {
        path: "/consulta/:placa",
        element: <ConsultaPlaca/>,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);