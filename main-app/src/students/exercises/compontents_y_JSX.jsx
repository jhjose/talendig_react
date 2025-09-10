// Objetivo: Crear un componente funcional que salude y que renderice "Hola mundo!!"

// JSX: MOTOR DE PLANTILLA DE REACT = Javascript con HTML

export default function Saludo() {
    return (
        <div className="card text-white"
            style={{
                backgroundColor: 'red',
                letterSpacing: 1
            }}>
            <h1>Hola mundo!!</h1>
        </div>
    )
}

// Objetivo: resultar 100 utilizando todas las variables
let num1 = 25;
let num2 = 100;
let num3 = 25;
let num4 = 50;

// Resultado 1
let result = (num2 - num1 - num3) + num4;

// Resultado 2
result = (num2 - num4) + (num1 + num3)

console.log(result);
// result = 100;
