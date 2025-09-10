import React, {Component} from 'react';

// Métodos verdes: siguen siendo válidos
// Métodos rojos: obsoletos, reemplazados por Hooks (useEffect, useState, React.memo, etc)
// Hoy en día: se recomienda user Hooks para manejar estados y ciclos de vida.

class Ejemplo extends Component {

    // 1. componentWillMount() OBSOLETO
    componentWillMount() {
        console.log('El componente está por montarse');
        // Es equivalente al moderno: inicializar estados directamente en el constructor o usar useEffect con []
    }

    // 2. componentDidMount() Está activo
    // Es útil para peticiones a API's, suscripciones o librerías
    componentDidMount(){
        console.log('El componente ya se montó');
        // Es equivalente moderno: useEffect(() => { ... }, [variable])
    }

    // 3. componentWillReceiveProps(nextProps) // Obsoleto
    // Se ejecutaba cuando el componente recibía propiedades
    componentWillReceiveProps(nextProps){
        if(nextProps.valor !== this.props.valor){
            console.log('Las props han cambiado');
        }
    }

    // 4. shouldComponentUpdate(nextProps, nextState) // Activo
    // Se usa para optimización de rendimiento
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.valor !== this.props.valor;
    }

    // 5. componentWillUpdate(nextProps, nextState) // Obsoleto
    // Se ejecutaba justo antes de actualizarse
    componentWillUpdate(nextProps, nextState){
        console.log('El componente va a actualizarse');
        // Equivalente moderno: useEffect con dependencias
    }

    // 7. componentDidUpdate(prevProps, prevState)
    // Se ejecuta después de una actualización del componente.
    // últil para comparar valores previos y ejecutar lógica condicional
    componentDidUpdate(prevProps, prevState){
        if(prevProps.valor !== this.props.valor){
            console.log('El valor cambió')
        }
    }

    // 8. componentWillUnmount
    // Se ejecuta cuando el componente se va a eliminar del Documento Web (DOM)
    // Ideal para limpiar timers, subscripciones, listeners, etc.
    componentWillUnmount(){
        console.log('El componente será desmontado');
        clearInterval(this.timer);
    }

    // 6. Render
    // Método obligatorio en componentes de Clase
    // Debe ser puro, sin efectos secundarios
    render(){
        // En Hooks: simplemente retornamos JSX desde la función o método
        return <h1>Component montado</h1>
    }
    

}