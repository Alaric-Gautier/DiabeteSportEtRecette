const FormError = ({error}) => {
    const {message, data} = error
    console.log("message dans customError ==",message);
    console.log("data dans customError ==",data);
    return(
        <div>
            <h2>Erreur</h2>
            <p>{message}</p>
            {data ? data.map((errorCode)=>{
                const className = null;
                switch (errorCode) {
                    case 1:
                        className = "majuscule"
                        break;
                        case 2:
                        className = "minuscule"
                        break;
                        case 3:
                        className = "symbole"
                        break;
                        case 4:
                        className = "chiffre"
                        break;
                        case 5:
                        className = "taille"
                        break;
                    default:
                        break;
                }
                return(
                    <ul>
                        <li>Au moins 8 caracttères</li>
                        <li>Au moins une majuscule</li>
                        <li>Au moins une minuscule</li>
                        <li>Au moins un chiffre</li>
                        <li>Au moins un symbole</li>
                    </ul>
                )
            }) : null}
        </div>
    )
}

export default FormError;