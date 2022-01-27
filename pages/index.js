function Titulo(props) {

    const Tag = props.tag;
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: red;
                    font-size: 48px;
                    font-weight: 600;
                }
            `}</style>
        </>
    );
}

// Componente React
function HomePage() {
    // JSX
    return (
        <div>
            <Titulo tag="h1">Boas vindas de volta!</Titulo>
            <h2>Discord - Alura MAtrix</h2>

           
        </div>
    )   
}

export default HomePage