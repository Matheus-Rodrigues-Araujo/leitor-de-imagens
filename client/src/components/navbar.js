import { Link } from "react-router-dom"
export default function Navbar(){
    return (
        <nav>
            <Link to="/" className="brand" >Home</Link>
            <ul>
                <Link to='/relatorio/cidade/:cidade' >Relatório de cidade</Link>
                <Link to='/consulta/:placa' >Consulta de placa</Link>
            </ul>
        </nav>
    )
}