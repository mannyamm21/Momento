import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import Loader from "./Loader";
import UserCard from "./UserCard";



export const TopCreator = () => {
    const { data: users, isLoading, isError } = useGetUsers(5); // Fetching 5 users for sidebar

    if (isLoading) return <Loader />; // Show loader while fetching data
    if (isError) return <div>Error fetching users</div>; // Handle error state

    return (
        <div className="hidden md:flex flex-col items-start w-72 2xl:w-72 px-6 py-10 gap-10  overflow-scroll custom-scrollbar">
            <h4 className="h4-bold md:h3-bold text-left w-full">Top Creators</h4>
            <div>
                {users?.documents.map((user) => (
                    <UserCard key={user.$id} user={user} />
                ))}
            </div>
        </div>
    );
};
