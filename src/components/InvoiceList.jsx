import {ChevronRight} from "lucide-react";
import { useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getInvoices} from "../store/invoice.jsx";
import {format,parse} from "date-fns";
import InvoiceDetails from "./invoiceDetails.jsx";
import {selectInvoice,toggleShowDetails} from "../store/invoice.jsx";



const InvoiceList = () => {
   const {invoices,filter,selectedInvoice,isShowDetails} = useSelector(state => state.invoice);


    const dispatch = useDispatch();

     useEffect(() => {
         dispatch(getInvoices());
     },[dispatch]);
    const filteredInvoices = invoices.filter((invoice) => {
        if(filter === "all") {
            return true;
        }
        return invoice.status === filter;
    });
    if(filteredInvoices.length === 0) {
        return (
            <div className = "text-center py-12">
                <p className = "text-xl text-slate-400">
                    No Invoices Found
                </p>
            </div>
        )
    }

    const showDetails = (id) => {
        dispatch(toggleShowDetails());
            const selectedInvoice = filteredInvoices.find((item) => item.id === id);
            dispatch(selectInvoice(selectedInvoice));



    }
  console.log(isShowDetails);

    const displayInvoices = filteredInvoices.map((invoice) => {

        return (


                   <div className = "rounded-t-lg p-6 flex flex-col" key = {invoice.id}>
                       <div className = "flex justify-between items-center transition-colors duration-200 cursor-pointer bg-slate-800  hover:bg-slate-700 p-6 rounded-t-lg">
                           <div className = "flex items-center space-x-6">
                               <span className = "text-slate-400">{invoice.id}</span>
                               <span className = "text-slate-400">Due {format(invoice.dueDate,"d MMMM yyyy")}</span>
                               <span className = "text-slate-300">{invoice.billTo.clientName}</span>
                           </div>
                           <div className = "flex items-center space-x-6">
                               <span className = "text-2xl font-bold ">${invoice.amount?.toFixed(2) || "0.00"}</span>
                               <div className = {`px-4 py-2 rounded-lg flex items-center space-x-2 ${invoice.status === "paid" ? "bg-green-900/20 text-green-50 " : invoice.status === "pending" ? "bg-orange-900/20 text-orange-500 " : "bg-slate-700/50 text-slate-400"} `}>
                                   <div className = {`w-2 h-2 rounded-full ${invoice.status === "paid" ? "bg-green-500" : invoice.status === "pending" ? "bg-orange-500" : "bg-slate-400"}`}>

                                   </div>
                                   <span className = "capitalize ">{invoice.status}</span>
                               </div>
                               <ChevronRight className="text-violet-500" onClick = {() => showDetails(invoice.id)}/>

                           </div>
                       </div>
                       {isShowDetails && selectedInvoice && selectedInvoice.id === invoice.id && (
                             <InvoiceDetails selectedInvoice = {selectedInvoice} />
                       )}

                   </div >



        )
    })
   return (
       invoices.length > 0 ?<div className = "space-y-4" >{displayInvoices} </div> : null
   )
}
export default InvoiceList;