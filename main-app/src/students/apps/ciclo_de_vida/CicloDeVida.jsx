import React, { 
    useEffect, useLayoutEffect, useMemo, useCallback, useRef, useReducer, useState, 
    useTransition, useDeferredValue
 } from 'react';

 /**
  * MINI APP REACT - DEMO DE CICLO DE VIDA (Clase + Función)
  * Javascript (NO Typescript)
  */

 // Utilidades de depuración
 const logStyle = (color) => {
    `color:${color}; font-weight: 600; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Courier New"; `
 }

 const log = {
    mount: (...a) => console.log("%c[MOUNT]", logStyle('green'), ...a),
    update: (...a) => console.log("%c[UPDATE]", logStyle('dodgerblue'), ...a),
    unmount: (...a) => console.log("%c[UNMOUNT]", logStyle('crimson'), ...a),
    error: (...a) => console.log("%c[ERROR]", logStyle("orangered"), ...a),
 }

 /**** Error Boundary (Clase) */
 class ErrorBoundary extends React.Component {

    // Fase inicial del ciclo de vida
    constructor(props){
        super(props);
        this.state = {
            hasError: false,
            message: ""
        }
    }

    // Captura errores en subárboles (solo en clases)
    static getDerivedStateFromError(error) {
        // Se ejecuta ANTES de render tras un error
        return {
            hasError: true,
            message: error?.message || String(error)
        }
    }

    componentDidCatch(error, info){
        // Se ejecuta DESPUÉS del render que falló, ideal para log a servidores
        log.error("componentDidCatch => ", error, info);
    }

    render(){
        if(this.state.hasError){
            return (
                <div style={StyleSheet.errorBox}>
                    <h3>Se capturó un error en un hijo</h3>
                    <p style={{whiteSpace: 'pre-wrap'}}>{this.state.message}</p>
                    <button onClick={() => this.setState({hasError: false, message: ''})}>
                        Recuperar
                    </button>
                </div>
            )
        }

        return this.props.children;
    }

 }


/** DEMO: Clase en TODO el ciclo de vida */
class ClassLifecycleDemo extends React.Component {
    
    // Es Estático y se invoca en mount y update
    static getDerivedStateFromError(nextProps, prevState){
        // Usarlo SOLO para derivar estado a partir de props, sin efectos secundarios.
        
        if(nextProps.demoProp !== prevState._latDemoProp){
            return {
                deliveredChanges: prevState.deliveredChanges + 1,
                _lastDemoProp: nextProps.demoProp
            }
        }
    }

    constructor(props){
        super(props);
        // Estado inicial
        this.state = {
            counter: 0,
            derivedChanges: 0, // lo actualiza getDerivedStateFromError
            _lastDemoProp: props.demoProp,
            text: "",
        }
        log.phase("Method: constructor");
    }

    // OBSOLETO: en versiones modernas se llama UNSAFE_componentWillMount()
    // Se invoca justo ANTES de mount (no recomendado para lógica)
    UNSAFE_componentWillMount(){
        log.phase("Method: UNSAFE_componentWillMount (OBSOLETO)")
    }

    // No está obsoleto
    componentDidMount(){
        // ideal para suscripciones, fetch (request | solicitudes), timers (limpiar en unmount)
        log.mount('Method: componentDidMount');
    }

    // Control fino de re-render. Rotorna true/false
    shouldComponentUpdate(nextProps, nextState){
        log.update('Method: shouldComponentUpdate', {nextProps, nextState});
        return true;
    }

    // Se ejecuta luego de actualizarse el estado
    componentDidUpdate(prevProps, prevState, snapshot){
        log.update('Method: componentDidUpdate', {prevProps, prevState, snapshot});
    }

    componentWillUnmount(){
        // Limpieza: cancelar cronómetro (timer), suscripciones, etc.
        clearInterval(this._timer);
        log.unmount("Method: componentWillUnmount");
    }

    forceError = () => {
        throw new Error('Error lanzado manualmente desde ClassLifecycleDemo');
    }

    render(){
        log.phase("Method: render");

        const { demoProp } = this.props;
        const { counter, derivedChanges, text } = this.state;

        return (
            <div style={styles.card}>
                <h3>Clase: ciclo de vida completo</h3>
                <p><b>demoProp:</b> {demoProp}</p>
                <p><b>counter (setInterval cada 3s):</b> {counter}</p>
                <p><b>getDerivedStateFromProps()</b>: {derivedChanges}</p>

                <label style={styles.row}>
                    <span>Texto controlado (para ver updates):</span>
                    <input value={text} onChange={(e)=> this.setState({text: e.target.value})} />
                </label>

                <div style={styles.row}>
                    <button onClick={()=>this.setState(
                        (s) => ({
                            counter: s.counter + 1
                        }))}
                    >
                        +1
                    </button>
                    <button onClick={()=>this.forceUpdate}>Forzar actualización</button>
                    <button onClick={()=>this.forceError}>Lanzar error</button>
                </div>

            </div>
        )
    }

}

