import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className='flex sm:h-[480px] md:h-[590px] rounded-lg overflow-hidden  bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Home;
