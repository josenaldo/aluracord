function Titulo(props) {
    return (
        <div>
            <h1>{props.children}</h1>
            <style jsx>{`
                h1 {
                    color: red;
                }
            `}</style>
        </div>
    );
}

// Componente React
function HomePage() {
    // JSX
    return (
        <div>
            <Titulo>Boas vindas de volta!</Titulo>
            <h2>Discord - Alura MAtrix</h2>

           
        </div>
    )   
}

export default HomePage