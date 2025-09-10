import ReactIcon from '../../assets/react.svg'

// Composición de componentes
function Card({ title, children }) {
    let user = {};

    //if(user) return true;

    // props: title y children
    return (
        <article className="card">
            <h3>{title}</h3>
            <div>
                {children}
            </div>
        </article>
    )
}

export default function Perfil(){
    return (
        <Card title="Perfil del usuario">
            <p>Desarrollador de Talendig</p>
        </Card>
    )
}

