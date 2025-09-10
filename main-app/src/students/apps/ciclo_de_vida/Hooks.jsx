// Hooks Súper Sencillo - Ciclo de Vida (función, JS)

import React, {
    useEffect, useRef, useState
} from "react";

/**
 * HOOKS + "CICLO DE VIDA"
 * Qué veremos aquí:
 * - useEffect([]): MOUNT + UNMOUNT (con cleanup)
 * - useEffect([variable1, variable2]): UPDATE cuando cambia una dependencia
 * - useEffect(): corre después de CADA render (mount + updates)
 * - useRef: valores mutables que NO re-renderizan y referencia a DOM
 * 
 * Objetivo: tener el ejemplo más corto posible para explicar este tipo de uso de Hooks
 */
export default function Hook(){
    const [open, setOpen] = useState(true); // motrar/ocultar el hijo
    const [name, setName] = useState(""); // prop que pasaremos al hijo

    return (
        <div style={StyleSheet.app}>
            <h2>Hooks + ciclo de vida (versión simple)</h2>
            
            {/* Controlamos una prop que forzará updates en el hijo */}
            <label style={styles.row}>
                <span>Nombre:</span>
                <input value={name} onChange={(e) => setName(e.target.value)} 
                    placeholder="Escribe y mira la consola" />
            </label>

            {/* Montar / Desmontar el hijo para observar mount/unmount */}
            <button style={styles.button} onClick={()=>setOpen((o)=>!o)}>
                {open ? 'Desmontar' : 'Montar'} Hijo
            </button>

            {open && <Child name={name} />}

            <p style={{opacity: 0.7}}>
                Abre la consola del navegador para ver el orden: MOUNT, UPDATE, UNMOUNT
            </p>

        </div>
    )
}

function Child({name}){
    // 1) useRef para:
    //----- contar renders (sin causar re-render)
    //----- tomar referencia a un input para darle foco al montar
    const renders = useRef(0);
    const inputRef = useRef(null);
    renders.current += 1; // mutación segura, no dispara render

    // 2) MOUNT + UNMOUNT (efecto con deps vacías)
    useEffect(()=>{
        console.log('[Child] MOUNT: se ejecuta una sola vez');

        // Ejemplo simple de side-effect: intervalo + limpieza
        const id = setInterval(()=>console.log('[Child] tick 2s'), 2000);

        // Dar foco al input cuando el componente se monta
        inputRef.current?.focus();

        // Cleanup => se ejecuta al DESMONTAR (y antes de volver a correr este efecto)
        return ()=>{
            clearInterval(id);
            console.log("[Child] UNMOUNT: limpieza hecha");
        }
    }, []);

    // 3) UPDATE por dependencia: corre cada vez que "name" CAMBIA
    useEffect(()=>{
        console.log('[Child] UPDATE: "name" cambió a =>', name);

        // efecto visible: cambiar el título del documento
        document.title = name ? `Hola, ${name}` : "Hooks demo";
    }, [name]);

    // 4) Después de CADA render (sin deps): útil para medir renders
    useEffect(()=>{
        console.log('[Child] post-render: renders acumulados =', renders.current);
    });

    return (
        <div style={styles.card}>
            <b>Hijo</b>
            <p>Renders: {renders.current}</p>
            <p>Prop name: {name || "(vacío)"}</p>
            <input ref={inputRef} placeholder="Foco al montar (useRef + useEffect)" />
        </div>
    )

}

/************** Estilos mínimos ****************************/
const styles = {
    app: {
        fontFamily: "system-ui, Sefoe UI, Ubuntu, Noto Sans",
        padding: 16,
        lineHeight: 1.35
    },
    row: {
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        margin: "8px 0",
    },
    card: {
        marginTop: 12,
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: 12,
        background: '#fff'
    },
    button: {
        padding: '6px 10px',
        borderRadius: 10,
        border: "1px solid #cbd5e1",
        background: '#f8fafc',
        cursor: "pointer",
    }
}