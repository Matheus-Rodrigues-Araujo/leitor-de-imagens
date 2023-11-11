import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [cidade, setCidade] = useState('');
  const [placa, setPlaca] = useState('');
  const [imagem, setImagem] = useState(null);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginSenha, setLoginSenha] = useState('');
  const [token, setToken] = useState('');

  const handleCadastroPlaca = async () => {
    try {
      const formData = new FormData();
      formData.append('imagem', imagem);
      formData.append('cidade', cidade);

      await axios.post('/cadastroPlaca', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Placa cadastrada com sucesso.');
    } catch (error) {
      console.error('Erro ao cadastrar placa:', error.message);
    }
  };

  const handleRelatorio = async () => {
    try {
      const response = await axios.get(`/relatorio/cidade/${cidade}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Relatório recebido:', response.data);
    } catch (error) {
      console.error('Erro ao obter relatório:', error.message);
    }
  };

  const handleConsultaPlaca = async () => {
    try {

      const response = await axios.get(`/consulta/${placa}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.existe) {
        console.log('Placa encontrada:', response.data.dados);
      } else {
        console.log('Placa não encontrada.');
      }
    } catch (error) {
      console.error('Erro ao consultar placa:', error.message);
    }
  };

  const handleCadastroUsuario = async () => {
    try {

      await axios.post('/cadastro', { email, senha });
      console.log('Usuário cadastrado com sucesso.');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error.message);
    }
  };

  const handleLogin = async () => {
    try {

      const response = await axios.post('/login', { email: loginEmail, senha: loginSenha });
      setToken(response.data.token);
      console.log('Login bem-sucedido. Token obtido.');
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
    }
  };

  const handleEmitirAlerta = async () => {
    try {
      await axios.post('/alerta', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Alerta emitido com sucesso.');
    } catch (error) {
      console.error('Erro ao emitir alerta:', error.message);
    }
  };

  return (
    <div>
      <h1>Frontend App</h1>
      <button onClick={handleCadastroPlaca}>Cadastrar Placa</button>
      <button onClick={handleRelatorio}>Gerar Relatório</button>
      <button onClick={handleConsultaPlaca}>Consultar Placa</button>
      <button onClick={handleCadastroUsuario}>Cadastrar Usuário</button>
      <button onClick={handleLogin}>Fazer Login</button>
      <button onClick={handleEmitirAlerta}>Emitir Alerta</button>
    </div>
  );
}

export default App;
