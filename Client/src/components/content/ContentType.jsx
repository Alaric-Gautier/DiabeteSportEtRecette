import React, { Fragment, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import ContentStatus from "./ContentStatus";

const ContentType = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
    const { type } = useParams();
    const [contentType, setContentType] = useState(type);

    useEffect(() => {
        setContentType(type);
    }, [type]);

    return (
        <div className={`contentType-container ${isMobile ? "mobile" : ""} `}>

            <div className="userType-content">

                {contentType === "recipes" && (

                    <Fragment>

                        <section className="user-recipes">
                            <ContentStatus />
                        </section>

                    </Fragment>

                )}

                {contentType === "sport-exercises" && (

                    <Fragment>

                        <section className="user-sport-exercises">

                            <ContentStatus />

                        </section>

                    </Fragment>

                )}

            </div>
        </div>
    );

}

export default ContentType;