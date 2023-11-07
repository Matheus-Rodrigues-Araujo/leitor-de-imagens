import { useParams } from "react-router-dom"
export default function ConsultaPlaca(){
    let {placa} = useParams()
    return (
    <div className='main' >
      <h2 style={{color: 'white'}} >Consulta de Placa</h2>
      <p style={{color: 'orange'}}>Placa requisitada: {placa}</p>
      <p style={{color:'red'}} >Resultado: Placa não encontrada</p>
    </div>
    )
}