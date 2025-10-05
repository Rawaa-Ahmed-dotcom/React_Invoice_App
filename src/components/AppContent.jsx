import Header from "./Header.jsx";
import InvoiceList from "./InvoiceList.jsx";
import InvoiceForm from "./InvoiceForm.jsx";
import {useDispatch, useSelector} from "react-redux";
import {toggleCancelForm,createMode} from "../store/invoice.jsx";
const AppContent = () => {
    const {cancelForm,invoices ,filter}  = useSelector(state => state.invoice);
    const dispatch = useDispatch();
    const handleCancel = () => {
        dispatch(toggleCancelForm());
        dispatch(createMode());
    }
    return (
        <div className = "bg-slate-900 text-white min-h-screen">
          <div className = "max-w-5xl mx-auto py-12 px-4">
              <Header handleCancel = {handleCancel} invoices = { invoices } filter = {filter}/>
              <InvoiceList />
              <InvoiceForm handleCancel = {handleCancel} cancelForm = {cancelForm}/>
          </div>
        </div>
    )
}
export default AppContent;