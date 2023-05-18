import { useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { CreateInput } from "../../forms/formComponents";
import { confirmUser, getNewConfirmationCode } from "../../../utils/fetchs/connectFetch";

const ConfirmUser = () => {
    const {confirmationKey} = useParams();
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [formData, setFormData] = useState({email:""})
    const [confirmationSend, setConfirmationSend] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        await getNewConfirmationCode(formData.email)
        Navigate("/")
    }

    const handleClick = async () => {
        setConfirmationSend(true)
        const result = await confirmUser(confirmationKey)
        if (result) {
            setIsConfirmed(true)
        }
    }

    return(
        
        <div>
            { !confirmationSend 
            ? <button onClick={handleClick}>Confirmer votre compte</button>
            : isConfirmed 
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