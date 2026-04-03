import { Link, useLocation } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";


export default function Breadcrumb({ customLast }) {

    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(Boolean);

    const formatText = (text) => {
        return text
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
        <nav className="text-sm text-gray-400 mb-6 flex items-center">

            <Link to="/" className="hover:text-white">
                Home
            </Link>

            {pathnames.map((value, index) => {

                const to = "/" + pathnames.slice(0, index + 1).join("/");
                const isLast = index === pathnames.length - 1;

                const displayText = customLast && isLast
                    ? customLast
                    : formatText(value);

                return (
                    <span key={to} className="flex items-center">

                        <span className="mx-2"><FiChevronRight /></span>

                        {isLast ? (
                            <span className="text-orange-400">
                                {displayText}
                            </span>
                        ) : (
                            <Link to={to} className="hover:text-white">
                                {displayText}
                            </Link>
                        )}

                    </span>
                );
            })}
        </nav>
    );
}