import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { useSignOutAccountMutation } from "@/lib/react-query/queriesAndMutations";
import { INITIAL_USER, useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Button } from "../ui/button";
import Loader from "./Loader";

const LeftSidebar = () => {
    const { mutate: signOut } = useSignOutAccountMutation(); // Use the correct sign-out mutation
    const navigate = useNavigate();
    const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();
    const { pathname } = useLocation();

    const handleSignOut = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        signOut(undefined, { // Assuming signOut accepts an empty object or no arguments
            onSuccess: () => {
                setIsAuthenticated(false);
                setUser(INITIAL_USER);
                navigate("/sign-in");
            }
        });
    };

    return (
        <nav className="leftsidebar">
            <div className="flex flex-col gap-11">
                <Link to="/" className="flex gap-3 items-center">
                    <img src="/assets/images/logo.svg"
                        alt="logo"
                        width={170}
                        height={36} />
                </Link>
                {isLoading || !user.email ? (
                    <div className="h-14">
                        <Loader />
                    </div>
                ) : (
                    <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
                        <img src={user.imageUrl || '/assets/images/profile-placeholder.svg'}
                            alt="profile"
                            className="h-14 w-14 rounded-full" />
                        <div className="flex flex-col">
                            <p className="body-bold">{user.name}</p>
                            <p className="small-regular text-light-3">@{user.username}</p>
                        </div>
                    </Link>
                )}
                <ul className="flex flex-col gap-6">
                    {sidebarLinks.map((links: INavLink) => {
                        const isActive = pathname === links.route;
                        return (
                            <li key={links.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
                                <NavLink to={links.route} className="flex gap-4 items-center p-4">
                                    <img src={links.imgURL}
                                        alt={links.label}
                                        className={`group-hover:invert-white ${isActive && 'invert-white'}`} />
                                    {links.label}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <Button variant="ghost" className="shad-button_ghost"
                onClick={(e) => handleSignOut(e)}>
                <img src="/assets/icons/logout.svg" alt="logout" />
                <p className="small-medium lg:base-medium">Logout</p>
            </Button>
        </nav>
    );
}

export default LeftSidebar;
