// Paso 1: importar React
import React, {Component} from "react";
import React, {useEffect, useState, useRef} from "react";

// ¿Qué debo hacer para convertir esta clase en componente?
class Car extends Component {
    // Paso 2: constructor
    // Paso 3: Definir los estados
}

// No necesita "Component"
function Car2 (props){
    const [start, setStart] = useState(false); // Vehículo apagado

    useEffect(()=>{
        if(!start){
            setStart(true); // Vehículo encendió
        }
    }, [start])

}


// Porqué causa error trabajar sin constructor
class Plane extends Component {
    constructor(props){
        super(props);
        this.state = {
            flighting: true
        }
    }

    // Mostrar el JSX en una clase: trabajar con método render
    render(){
        return (
            <div>
                TEST
            </div>
        )
    }
    
}


// Porqué causa error tener dos div en la misma jerarquía
class Cohete extends Component {
    constructor(props){
        super(props);
        this.state = {
            flighting: true
        }
    }

    render(){
        return (
            <section>
                Estado de vuelo:
                <List />
                <ul>
                    <li>Despegó</li>
                    <li>Para despegar</li>
                    <li>Puerta cerrada</li>
                    <li>Avión preparado para despegar</li>
                    <li>Llegó avión</li>
                </ul>
                <footer>
                    Para mas información llamar 555-555-5555
                </footer>
            </section>
        )
    }
}


export default Car;