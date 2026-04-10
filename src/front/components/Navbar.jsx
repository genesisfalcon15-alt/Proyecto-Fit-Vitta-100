import { Link } from "react-router-dom";

export const Navbar = () => {
<<<<<<< HEAD
=======
    return (
        <nav className="navbar navbar-light px-3"
            style={{
                backgroundColor: "transparent"

            }}>
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <i className="fas fa-bars fa-lg" style={{ color: "white", cursor: "pointer" }}> </i>
                <div className="d-flex flex-column align-items-center">
                    <h1 style={{
                        color: "white",
                        fontFamily: "'Trebuchet MS', 'Futura', 'Montserrat', sans-serif",
                        fontWeight: "bold",
                        margin: 0,
                        letterSpacing: "1px"
                    }}>
                        VITTA
                    </h1>
                </div>

                <div className="d-flex align-items-center gap-3">
                    <i className="fas fa-search fa-lg" style={{ color: "white", cursor: "pointer" }}></i>
                    <i className="fas fa-user-circle fa-2x" style={{ color: "white", cursor: "pointer" }}></i>
                </div>
            </div>
        </nav>
    );
};






>>>>>>> e9cebee (cambios en el diseño y nuevos componentes)

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};