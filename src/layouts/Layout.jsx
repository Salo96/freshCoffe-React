import { Outlet } from "react-router-dom";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Resumen } from "../components/Resumen";
import { Sidebar } from "../components/Sidebar";
import { useQuiosco } from "../hooks/useQuiosco";
import { ModalProducto } from "../components/ModalProducto";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement('#root');

export const Layout = () => {

  const { modal, handleClickModel } = useQuiosco();

  //console.log(modal);

  return (

    <>
      <div className="md:flex">

        <Sidebar />

        <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
          <Outlet />
        </main>

        <Resumen />
      </div>

   
      <Modal 
        isOpen={modal} 
        style={customStyles} 
        //salir del modal en cualquier lado
        onRequestClose={ handleClickModel }
        overlayClassName="modal-fondo"
      >
        <ModalProducto/>
      </Modal>

      <ToastContainer 
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </>
  )
}
