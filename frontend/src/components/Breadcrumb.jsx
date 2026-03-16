import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb({ customLast }) {

    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(Boolean);

    return (
        <nav className="text-sm text-gray-400 mb-6 flex items-center">

            <Link to="/" className="hover:text-white">
                Home
            </Link>

            {pathnames.map((value, index) => {

                const to = "/" + pathnames.slice(0, index + 1).join("/");
                const isLast = index === pathnames.length - 1;

                return (
                    <span key={to} className="flex items-center">

                        <span className="mx-2">{">"}</span>

                        {isLast ? (
                            <span className="text-orange-400">
                                {customLast || value}
                            </span>
                        ) : (
                            <Link to={to} className="hover:text-white capitalize">
                                {value}
                            </Link>
                        )}

                    </span>
                );
            })}
        </nav>
    );
}