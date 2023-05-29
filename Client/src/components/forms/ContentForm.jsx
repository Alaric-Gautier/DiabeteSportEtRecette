import React from "react";

const ContentForm = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
    // Pas avec les params
    const { action } = useParams();
    console.log(action);
    const [formAction, setFormAction] = useState(action);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        duration: "",
        difficulty: "",
        is_for_children: false,
        tag: "",
    });
    const [formError, setFormError] = useState(null);

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     setFormError(null);

    //     try {
    //         switch (formAction) {
    //             case 'create':
    //                 await createContent(formData);
    //                 break;
    //             case 'update':
    //                 await updateContent(formData);
    //                 break;
    //             case 'delete':
    //                 await deleteContent(formData);
    //                 break;
    //             default:
    //                 break;
    //         }
    //     } catch (error) {
    //         setFormError(error.message);
    //     }
    // };

    // useEffect(() => {
    //     setFormError(null);
    //     setFormData({
    //         title: "",
    //         description: "",
    //         image: "",
    //         duration: "",
    //         difficulty: "",
    //         is_for_children: false,
    //         tag: "",
    //     }); 
    // setFormAction(action);
    // }, [action]);

    const tags = [
        "Petit-déjeuner",
        "Brunch",
        "Entrée",
        "Plat principal",
        "Goûter",
        "Apéritif",
        "Dessert",
    ];

    return (
        <div className={`contentForm-container ${isMobile ? "mobile" : ""} `}>
            <form onSubmit={handleSubmit} className="content-form">

                {formError && <div className="form-error">{formError}</div>}

            </form>
        </div>
    );
}

export default ContentForm;