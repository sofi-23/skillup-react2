export const Donate = () => {

    //rel="noreferrer" is used to prevent the browser from sending the referer header to the server (security).
    return (
        <div className="pageContainer">
            <div className="container">
                <h3>Donate to the project</h3>
                <a href="https://mpago.la/2xGwZCr" className="link" target="_blank" rel="noreferrer">Donate</a> 
            </div>
        </div>

    )
}