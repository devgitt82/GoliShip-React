import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom"

export const Heros = () => {
    
    const {oktaAuth, authState} = useOktaAuth();

    return (
        <div>
            {/*Desktop version*/}
            <div className="d-none d-lg-block">
                <div className="row g-0 mt-5">
                    <div className="col-sm-6 col-md-6">
                        <div className="col-image-left"></div>
                    </div>
                    <div className="col-4 col-md-4 container d-flex justify-content-center allign-items-center">
                        <div className="ml-2">
                            <h1>MCPP or V.GRUU?</h1>
                            <p className="lead">
                                This mistery will be resolved soon. In the meanwhile please enjoy our swimming pool or racing simulator. All for free.
                            </p>
                            {authState?.isAuthenticated ? 
                                 <Link className="btn btn-primary btn-lg text-white" to="/search">See more</Link>: 
                                 <Link className="btn btn-primary btn-lg text-white" to="/login">Log in</Link>}
                        </div>
                    </div>
                </div>
                <div className="row g-0 mt-5">
                    <div className="col-4 col-md-4 container d-flex justify-content-center allign-items-center">
                        <div className="ml-2">
                            <h1>Know ShipSu already?</h1>
                            <p className="lead">
                                Not yet? Then start your OTG training right away. You have to achive 100% completion of your training before you go home. REMEBER - There might be no more chances in the future.
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6">
                        <div className="col-image-right"></div>
                    </div>
                </div>
            </div>
            {/*Mobile version*/}
            <div className="d-lg-none">
                <div className="container">
                    <div className="m-2">
                        <div className="col-image-left"></div>
                        <div className="mt-2">
                            <h1>MCPP or V.GRUU</h1>
                            <p className="lead">
                            Not yet? Then start your OTG training right away. You have to achive 100% completion of your traoining before you go home. REMEBER - There might be no more chances in the future.
                           </p>
                            {authState?.isAuthenticated ? 
                                 <Link className="btn btn-primary btn-lg text-white" to="/search">See more</Link>: 
                                 <Link className="btn btn-primary btn-lg text-white" to="/login">Log in</Link>}
                        </div>
                    </div>
                    <div className="m-2">
                        <div className="col-image-right"></div>
                        <div className="mt-2">
                            <h1>Know ShipSu already??
                            </h1>
                            <p className="lead">
                            Not yet? Then start your OTG training right away. You have to achive 100% completion of your training before you go home. REMEBER - There might be no more chances in the future.
                           </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}