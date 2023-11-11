import axios from 'axios'
import {useState} from 'react'
export default function CadastroPlaca(){
    const [form, setForm] = useState({
      numero: '',
      cidade: ''
    })
    const handleSubmit = async(event) => {
      event.preventDefault()

      try {
        await axios.post('http://localhost:4000/cadastroPlaca', form)
        setForm({
          numero: '',
          cidade: ''
        })
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
        alert('Erro ao enviar dados. Consulte o console para obter mais detalhes.');
      }

    }

    const handleChange = (event) => {
      const {name, value} = event.target
      setForm({...form, [name]: value})
    }

    return (
    <div className='main' >
      <form className='form-cadastro-placa' action="http:localhost:4000/cadastroPlaca" method="POST" >
        <h2>Cadastro de placa</h2>
        <label>
          Imagem
          <input type="file" /> 
        </label>

        <label>
          Cidade
          <input type="text" placeholder='Cidade' /> 
        </label>

        <div className='btn-container' >
          <button>Enviar</button>
        </div>

      </form>
    </div>
    )
}