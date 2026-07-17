
import Navbar from '../../../../components/services/RentalServices/customerBar/Navbar'
const RentalServiceMainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="bg-gray-10">{children}</main>
    </>
  );
};

export default RentalServiceMainLayout;
