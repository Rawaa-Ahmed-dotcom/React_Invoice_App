
import {format} from "date-fns";
import {markAsPaid, deleteInvoice, editInvoice, toggleCancelForm,editMode} from "../store/invoice.jsx";
import {useDispatch, useSelector} from "react-redux";
import InvoiceForm from "./InvoiceForm.jsx";
const InvoiceDetails  = ({selectedInvoice}) => {
    const dispatch = useDispatch();
    const {cancelForm,inEditMode} = useSelector(state => state.invoice);
  const handleEditInvoice = () => {
      dispatch(editMode());
      dispatch(toggleCancelForm())

  }


  if(!cancelForm && inEditMode) {
      return <InvoiceForm  />
  }
    return (
        <div className= "bg-slate-800 rounded-b-lg p-8 transition-all duration-300">
           <div className = "flex justify-between items-center mb-8">
              <div className = "flex items-center space-x-4">
                  <span>{selectedInvoice.status}</span>
              </div>
               <div className = "flex  space-x-4 gap-4">
                   <button className = "px-6 py-3 rounded-full bg-slate-700 hover:bg-slate-600 cursor-pointer"
                   onClick={handleEditInvoice}>
                       Edit
                   </button>
                   <button className = "px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer"
                   onClick = {() => dispatch(deleteInvoice(selectedInvoice.id))}>
                       Delete
                   </button>
                   <button className = "px-6 py-3 rounded-full bg-violet-500 hover:bg-violet-600 cursor-pointer" onClick = {() => dispatch(markAsPaid(selectedInvoice.id))}>
                       Mark as Paid
                   </button>
               </div>
           </div>
            <div className = "bg-slate-900 rounded-lg p-8">
               <div className = "flex justify-between mb-8 text-center">
                   <div>
                       <h2 className = "font-bold text-xl mb-2">{selectedInvoice.id}</h2>
                       <p className = "text-slate-400">{selectedInvoice.projectDescription}</p>
                   </div>
                   <div className = "text-center text-slate-400">
                      <p>{selectedInvoice.billFrom.streetAddress}</p>
                      <p>{selectedInvoice.billFrom.city}</p>
                      <p>{selectedInvoice.billFrom.postCode}</p>
                      <p>{selectedInvoice.billFrom.country}</p>
                   </div>


               </div>
                <div className = "grid grid-cols-3 text-left gap-8 mb-8">
                    <div>
                        <p className = "text-slate-400 mb-2">Invoice Date</p>
                        <p className = "font-bold">{format(selectedInvoice.invoiceDate,"d MMMM yyyy")}</p>
                        <p className = "text-slate-400 mb-2">Payment Date</p>
                        <p className = "font-bold">{format(selectedInvoice.dueDate,"d MMMM yyyy")}</p>
                    </div>
                    <div>
                        <p className = "text-slate-400 mb-2">Bill To</p>
                        <p className = "text-slate-400">{selectedInvoice.billTo.clientName}</p>
                        <p className = "text-slate-400">{selectedInvoice.billTo.streetAddress}</p>
                        <p className = "text-slate-400">{selectedInvoice.billTo.city}</p>
                        <p className = "text-slate-400">{selectedInvoice.billTo.country}</p>
                        <p className = "text-slate-400">{selectedInvoice.billTo.postCode}</p>
                    </div>
                    <div>
                        <p className = "text-slate-400 mb-2">Sent To</p>
                        <p className = "font-bold">{selectedInvoice.billTo.clientEmail}</p>
                    </div>
                </div>
                <div className = "bg-slate-800 rounded-lg overflow-hidden">
                    <div className = "p-8">
                        <table className = "w-full">
                            <thead>

                                       <tr className = "text-slate-400">
                                           <th  className = "text-left">
                                               Item Name
                                           </th>
                                           <th className = "text-center">
                                               Quantity
                                           </th>
                                           <th className = "text-right">
                                               Price
                                           </th>
                                           <th className = "text-right">
                                               Total
                                           </th>
                                       </tr>




                            </thead>
                            <tbody>
                            {selectedInvoice.items.map((item,index) => (
                                <tr key = {index} className = "border-b border-slate-700 text-white">
                                    <td className = "text-left">{item.name}</td>
                                    <td className = "text-center">{item.quantity}</td>
                                    <td className = "text-right">{parseInt(item.price).toFixed(2)}</td>
                                    <td className = "text-right">{parseInt(item.total).toFixed(2)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className = "bg-slate-900 p-8 flex justify-between items-center">
                        <span className = "text-white">Amount Due</span>
                        <span className = "text-3xl font-bold">$ {parseInt(selectedInvoice.amount).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default InvoiceDetails;