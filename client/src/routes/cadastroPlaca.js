export default function CadastroPlaca(){
    return (
    <div className='main' >
      <form className='form-cadastro-placa' >
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