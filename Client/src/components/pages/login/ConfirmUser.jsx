import { useEffect, useState } from "react"
import factorizedFetch from "../../../utils/factorizedFetch"
import { NavLink, useParams } from "react-router-dom"
import { CreateInput } from "../../forms/formComponents";

const ConfirmUser = () => {
    const confirmationCode = useParams();
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [formData, setFormData] = useState({email:""})

    const sendConfirmationCode = async () => {
        const result = await factorizedFetch("GET", `confirmUser/${confirmationCode}`)
        if (result.status !== 200) {
            setIsConfirmed(false)
        } else {
            setIsConfirmed(true)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await factorizedFetch("POST", "/getNewConfirmationCode",{email:formData.email})
    }

    useEffect(()=>{
        sendConfirmationCode()
    },[])

    return(
        <div>
            { isConfirmed 
            ? <p>Votre compte a bien été confirmé</p>
            : <div>
                <p>Une erreur est survenue</p>
                <form onSubmit={handleSubmit}>
                    <CreateInput inputName={"email"} label={"Email"} inputType="email" formData={formData} setFormData={setFormData}/>
                    <button type="submit">Envoyer un nouveau lien</button>
                </form>
              </div>
            }
        </div>
    )
}

export default ConfirmUser;