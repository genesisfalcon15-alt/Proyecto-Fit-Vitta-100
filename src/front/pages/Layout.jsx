import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    return (
<<<<<<< HEAD
        <ScrollToTop>
            <Navbar />
                <Outlet />
            <Footer />
        </ScrollToTop>
    )
}
=======
        <div id="app-container" style={{
            maxWidth: "450px",
            margin: "0 auto",
            height: "100vh",
            position: "relative",
            backgroundColor: "rgba(113, 121, 103, 1 )",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)"
        }}>
            <BrowserRouter>
                <Navbar />
                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        paddingBottom: "80px",
                        display: "flex",
                        flexDirection: "column",
                    }}>

                    <AppRoutes />
                </div>
                <Footer />
            </BrowserRouter>
        </div>
    );
}
export default Layout;





>>>>>>> e9cebee (cambios en el diseño y nuevos componentes)
