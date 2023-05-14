import { useEffect, useState } from "react"
import factorizedFetch from "../../../utils/factorizedFetch"
import { useParams } from "react-router-dom"

const ConfirmUser = () => {
    const confirmationCode = useParams();
    const [isConfirmed, setIsConfirmed] = useState(false)

    const sendConfirmationCode = async () => {
        const result = await factorizedFetch("GET", `confirmUser/${confirmationCode}`)
        if (result.status !== 200) {
            setIsConfirmed(false)
        } else {
            setIsConfirmed(true)
        }
    }

    useEffect(()=>{
        sendConfirmationCode()
    },[])

    return(
        <div>
            { isConfirmed 
            ? <p>Votre compte a bien été confirmé</p>
            : <p>Une erreur est survenue, veuillez réessayer</p>
            }
        </div>
    )
}

export default ConfirmUser;