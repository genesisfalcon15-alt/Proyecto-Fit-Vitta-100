import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {

    const { pathname } = useLocation();

    useEffect(() => {
        // cada vez que cambio de página, fuerzo el scroll arriba
        window.scrollTo(0, 0);
    }, [pathname]);


    return null;
}