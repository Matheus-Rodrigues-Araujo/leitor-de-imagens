import { useParams } from "react-router-dom"
export default function RelatorioCidade(){
    
    // let [searchParams, setSearchParams] = useSearchParams()
    let {cidade} = useParams()
    // function handleSubmit(event) {
    //     event.preventDefault();
    //     let params = serializeFormQuery(event.target);
    //     setSearchParams(params);
    //   }


    return (
    <div className='main' >
      <ul style={{color: 'yellow'}} >
        <li>Param: {cidade}</li>
        <li>Nome: Crato</li>
        <li>País: Brasil</li>
        <li>Texto: Amo meu país</li>
        <li>Data: 23/11/23</li>
        <li>Hora: 23:12</li>
      </ul>
    </div>
    )
}