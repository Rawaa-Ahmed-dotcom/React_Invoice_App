import {Trash2, X,Plus} from "lucide-react";
import {useEffect, useState} from "react";
import {addDays, format} from "date-fns";
import {useDispatch, useSelector} from "react-redux";
import {addNewInvoice, editInvoice, toggleCancelForm, toggleShowDetails} from "../store/invoice.jsx";
import { v4 as uuidv4 } from 'uuid';



const InvoiceForm = ({ handleCancel,cancelForm,handleSubmitOnEdit}) => {
    const {invoices,inEditMode,selectedInvoice} = useSelector(state => state.invoice);
    let [invoiceData,setInvoiceData] = useState(() => {
        return (
            {
                id :  "",
                status : "pending",
                billFrom : {
                    streetAddress : "",
                    city : "",
                    postCode : "",
                    country : ""
                },
                billTo : {
                    clientName : "",
                    clientEmail : "",
                    streetAddress : "",
                    city : "",
                    postCode : "",
                    country : ""
                },
                invoiceDate : format(new Date(), "yyyy-MM-dd"),
                dueDate : format(addDays(new Date(),30),"yyyy-MM-dd"),
                paymentTerms : "Net 30 Days",
                projectDescription : "",
                items : [],
                amount : 0
            }
        )
    });

     const dispatch = useDispatch();
    const addItems = () => {
        setInvoiceData({...invoiceData,items : [...invoiceData.items,{name : "",quantity :0,price : 0,total : 0}]});
    }
    const updateItem = (index,key,value) => {
        const items = [...invoiceData.items];
        items[index][key] = value;
        if(key === "quantity" || key === "price") {
            items[index].total  = items[index].quantity * items[index].price;

        }
        setInvoiceData({...invoiceData,items : items});
    }
    const removeItem = (removedIndex) => {
        let items = [...invoiceData.items];
        items = items.filter((item,index) => index !== removedIndex);
        setInvoiceData({...invoiceData,items : items});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inEditMode && selectedInvoice) {

            dispatch(editInvoice(invoiceData));
            dispatch(toggleShowDetails());
        } else {

            dispatch(addNewInvoice({ ...invoiceData, id: "INV" + Math.floor(Math.random() * 1000000) }));
        }

        dispatch(toggleCancelForm());
    }

    useEffect(() => {
        if(inEditMode && selectedInvoice) {
            setInvoiceData({...selectedInvoice});
        }
    },[inEditMode, selectedInvoice]);

    return(
        cancelForm && (
            <div className = "fixed inset-0 bg-black/50 items-start justify-center overflow-y-auto">
                <div className = "bg-slate-800 p-8 w-full max-w-2xl rounded-lg my-8 mx-auto">
                    <div className = "flex justify-between mb-6 items-center">
                        <h2 className= "font-bold text-2xl">New Invoice</h2>
                        <button className = "cursor-pointer" onClick = {handleCancel}>
                            <X size = {24} />
                        </button>
                    </div>
                    <form className = "space-y-6" onSubmit = {(e) => handleSubmit(e)}>
                        <div className = "space-y-4">
                            <h3 className = "text-violet-500 font-bold">Bill From</h3>
                            <input
                                type = "text"
                                placeholder= "Street Address"
                                value = {invoiceData.billFrom.streetAddress}
                                onChange = {(e) => setInvoiceData({...invoiceData,billFrom : {...invoiceData.billFrom,streetAddress: e.target.value} })}
                                required
                                className = "bg-slate-900 rounded-lg p-3 w-full"/>
                        </div>
                        <div className = "flex items-center justify-between">
                            <input
                                type = "text"
                                placeholder= "City"
                                value = {invoiceData.billFrom.city}
                                onChange = {(e) => setInvoiceData({...invoiceData,billFrom : {...invoiceData.billFrom,city: e.target.value} })}
                                required
                                className = "bg-slate-900 rounded-lg p-3 "/>
                            <input
                                type = "text"
                                placeholder= "Post Code"
                                value = {invoiceData.billFrom.postCode}
                                onChange = {(e) => setInvoiceData({...invoiceData,billFrom : {...invoiceData.billFrom,postCode: e.target.value} })}
                                required
                                className = "bg-slate-900 rounded-lg p-3 "/>
                            <input
                                type = "text"
                                placeholder= "Country"
                                value = {invoiceData.billFrom.country}
                                onChange = {(e) => setInvoiceData({...invoiceData,billFrom : {...invoiceData.billFrom,country: e.target.value} })}
                                required
                                className = "bg-slate-900 rounded-lg p-3 "/>
                        </div>
                        <div className = "space-y-6">
                            <div className = "space-y-4">
                                <h3 className = "text-violet-500 font-bold">Bill To</h3>
                                <input
                                    type = "text"
                                    placeholder= "Client's Name"
                                    value = {invoiceData.billTo.clientName}
                                    onChange = {(e) => setInvoiceData({...invoiceData,billTo : {...invoiceData.billTo,clientName: e.target.value} })}
                                    required
                                    className = "bg-slate-900 rounded-lg p-3 w-full !mb-3"/>
                                <input
                                    type = "email"
                                    placeholder= "Client's Email"
                                    value = {invoiceData.billTo.clientEmail}
                                    onChange = {(e) => setInvoiceData({...invoiceData,billTo : {...invoiceData.billTo,clientEmail: e.target.value} })}
                                    required
                                    className = "bg-slate-900 rounded-lg p-3 w-full !mb-3"/>
                                <input
                                    type = "text"
                                    placeholder= "Street Address"
                                    value = {invoiceData.billTo.streetAddress}
                                    onChange = {(e) => setInvoiceData({...invoiceData,billTo : {...invoiceData.billTo,streetAddress: e.target.value} })}
                                    required
                                    className = "bg-slate-900 rounded-lg p-3 w-full !mb-3"/>
                            </div>
                            <div className = "flex items-center justify-between">
                                <input
                                    type = "text"
                                    placeholder= "City"
                                    value = {invoiceData.billTo.city}
                                    onChange = {(e) => setInvoiceData({...invoiceData,billTo : {...invoiceData.billTo,city: e.target.value} })}
                                    required
                                    className = "bg-slate-900 rounded-lg p-3 "/>
                                <input
                                    type = "text"
                                    placeholder= "Post Code"
                                    value = {invoiceData.billTo.postCode}
                                    onChange = {(e) => setInvoiceData({...invoiceData,billTo : {...invoiceData.billTo,postCode: e.target.value} })}
                                    required
                                    className = "bg-slate-900 rounded-lg p-3 "/>
                                <input
                                    type = "text"
                                    placeholder= "Country"
                                    value = {invoiceData.billTo.country}
                                    onChange = {(e) => setInvoiceData({...invoiceData,billTo : {...invoiceData.billTo,country: e.target.value} })}
                                    required
                                    className = "bg-slate-900 rounded-lg p-3 "/>
                            </div>
                            <div className = "space-y-4">
                                <div className = "flex items-center justify-between">
                                    <input
                                        type = "date"
                                        className= "bg-slate-900 rounded-lg p-3 w-[48%]"
                                        value = {invoiceData.invoiceDate}
                                        onChange = {(e) => setInvoiceData({...invoiceData,invoiceDate: e.target.value })}
                                    />
                                    <select className= "bg-slate-900 rounded-lg p-3 w-[48%]" required
                                    value = {invoiceData.paymentTerms}
                                    onChange = {(e) => setInvoiceData({...invoiceData,paymentTerms: e.target.value})}
                                    >
                                        <option >Net 30 Days</option>
                                        <option>Net 60 Days</option>
                                    </select>
                                </div>
                                <input
                                    type = "text"
                                    placeholder = "Project Description"
                                    required
                                    value = {invoiceData.projectDescription}
                                    onChange = {(e) => setInvoiceData({...invoiceData,projectDescription: e.target.value })}
                                    className = "bg-slate-900 rounded-lg w-full p-3"
                                />
                            </div>
                            <div className = "space-y-4">
                                <h3>Item List</h3>
                                {invoiceData.items.map((item,index) => {
                                    return (
                                        <div className = "grid grid-cols-12 items-center gap-4" key = {index}>
                                            <input
                                                type ="text"
                                                placeholder = "Item Name"
                                                className = "bg-slate-900 rounded-lg p-3 col-span-4"
                                                value = {item.name}
                                                onChange = {(e) => updateItem(index,"name",e.target.value)}
                                            />


                                            <input
                                                type ="number"
                                                placeholder = "Quantity"
                                                className = "bg-slate-900 rounded-lg p-3 col-span-3"
                                                min = {0}
                                                value = {item.quantity}
                                                onChange = {(e) => updateItem(index,"quantity",e.target.value)}
                                            />
                                            <input
                                                type ="number"
                                                placeholder = "Price"
                                                className = "bg-slate-900 rounded-lg p-3 col-span-3"
                                                min = {0}
                                                value = {item.price}
                                                onChange = {(e) => updateItem(index,"price",e.target.value)}
                                            />
                                            <div className = "col-span-1 text-right">
                                                {item.total.toFixed(2)}
                                            </div>
                                            <button className = "cursor-pointer col-span-1 flex items-center justify-end text-slate-400 hover:text-red-500"

                                            onClick = {() => removeItem(index)}>
                                                <Trash2 size = {20}/>
                                            </button>
                                        </div>
                                    )
                                })}
                                <button className = "w-full bg-slate-700 hover:bg-slate-600 rounded-lg p-3 flex items-center justify-center
                            space-x-2 cursor-pointer" type = "button" onClick = {() => addItems()}>
                                    <Plus size = {20}/>
                                    <span>Add New Item</span>
                                </button>
                            </div>
                            <div className = "flex items-center justify-end gap-4">
                                <button className = "bg-violet-500 hover:bg-violet-600 w-full rounded-full px-6 py-3 text-white cursor-pointer"
                                        type = "button"
                                onClick = {handleCancel} >
                                    Cancel
                                </button>
                                <button className = "bg-violet-500 hover:bg-violet-600 w-full rounded-full px-6 py-3 text-white cursor-pointer"
                                      type = "submit" >
                                    {inEditMode ? "Save Changes" : "Create Invoice"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    )

}

export default InvoiceForm;