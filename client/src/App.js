import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [cidade, setCidade] = useState('');
  const [placa, setPlaca] = useState('');

  const cadastrarPlaca = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('cidade', cidade);
    formData.append('imagem', e.target.elements.imagem.files[0]);

    try {
      const response = await axios.post('/cadastroPlaca', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert(response.data);
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar placa');
    }
  };

  const gerarRelatorio = async () => {
    try {
      const response = await axios.get(`/relatorio/cidade/${cidade}`, { responseType: 'blob' });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'relatorio.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error(error);
      alert('Erro ao gerar relatório');
    }
  };

  const consultarPlaca = async () => {
    try {
      const response = await axios.get(`/consulta/${placa}`);
      alert(response.data.existe ? 'Placa encontrada!' : 'Placa não encontrada');
    } catch (error) {
      console.error(error);
      alert('Erro ao consultar placa');
    }
  };

  return (
    <div>
      <h1>Cadastro de Placa</h1>
      <form onSubmit={cadastrarPlaca}>
        <input type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
        <input type="file" name="imagem" />
        <button type="submit">Cadastrar Placa</button>
      </form>

      <h1>Gerar Relatório</h1>
      <input type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
      <button onClick={gerarRelatorio}>Gerar Relatório</button>

      <h1>Consultar Placa</h1>
      <input type="text" placeholder="Número da Placa" value={placa} onChange={(e) => setPlaca(e.target.value)} />
      <button onClick={consultarPlaca}>Consultar Placa</button>
    </div>
  );
}

export default App;
