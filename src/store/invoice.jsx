import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {addDays, format} from "date-fns";

export const addNewInvoice = createAsyncThunk("/invoice/addInvoice" ,async(data,thunkApi) => {
    try {
        const res = await fetch("https://invoiceapi-production-c9d8.up.railway.app/invoices",{
            method : "POST",
            body : JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        });
        const result = await res.json();
        console.log(result);
        return result;
    }catch(error) {
        return thunkApi.rejectWithValue(error.message);
    }
})
const calcAmount = (items) => {
    return items.reduce((acc,item) => {
        return acc + item.total;
    },0);
}
export const getInvoices = createAsyncThunk("/invoice/getInvoices" ,async(_,thunkApi) => {
    try {
        const res = await fetch("https://invoiceapi-production-c9d8.up.railway.app/invoices");
        const result = await res.json();
        console.log(result);
        return result;
    }catch(error) {
        return thunkApi.rejectWithValue(error.message);
    }
})
export const markAsPaid = createAsyncThunk("invoice/markAsPaid",async(id,thunkApi) => {
    try {
        let response = await fetch(`https://invoiceapi-production-c9d8.up.railway.app/invoices/${id}`,
            {
                method : "PATCH",
                headers : {
                    "content-type" : "application/json",
                },
                body : JSON.stringify({status : "paid"})
            }
        );
        let result = await response.json();
        return result;
    }catch(error) {
        return thunkApi.rejectWithValue(error.message);
    }
})
export const deleteInvoice = createAsyncThunk("invoice/deleteInvoice",async(id,thunkApi) => {
    try {
        let data = await fetch(`https://invoiceapi-production-c9d8.up.railway.app/invoices/${id}`,
            {
                method : "DELETE",
                headers : {
                    "content-type" : "application/json",
                }
            });
        return id;
    }catch(error) {
        return thunkApi.rejectWithValue(error.message);
    }
});
export const editInvoice  = createAsyncThunk("/invoice/editInvoice",async(invoice,thunkApi) => {
    try {
        let data = await fetch(`https://invoiceapi-production-c9d8.up.railway.app/invoices/${invoice.id}`,
            {
                method : "PUT",
                headers : {
                    "content-type" : "application/json",
                },
                body : JSON.stringify(invoice),

            });
        let result = await data.json();
        return result;
    }catch(error) {
     return thunkApi.rejectWithValue(error.message);
    }
})
const invoiceSlice  = createSlice({
    name : "invoice",
    initialState : {cancelForm : false,invoices : [],selectedInvoice : null,filter : "all",error : "", isLoading : false,isShowDetails : false,inEditMode : false,inCreateMode : false},
    reducers : {
        toggleCancelForm : (state,action) => {
            state.cancelForm = !state.cancelForm;
        },
        addFilter : (state,action) => {
            state.filter = action.payload;
        },
        selectInvoice : (state,action) => {
            state.selectedInvoice = action.payload;
        },
        toggleShowDetails : (state,action) => {
            state.isShowDetails = !state.isShowDetails;
        },
        editMode : (state,action) => {
            state.inEditMode =  true;
            state.inCreateMode = false;
        },
        createMode : (state,action) => {
            state.inCreateMode =  true;
            state.inEditMode =  false;
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(addNewInvoice.fulfilled, (state, action) => {
                console.log(action.payload.items);
                const newInvoice = {
                    ...action.payload,
                    status : action.payload.status || "pending",
                    invoiceDate : format(new Date(), "yyyy-MM-dd"),
                    dueDate : action.payload.dueDate || format(addDays(new Date(),30),"yyyy-MM-dd"),
                    amount : calcAmount(action.payload.items)
                };
                state.invoices.push(newInvoice);
                state.isLoading = false;
            })
            .addCase(addNewInvoice.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(addNewInvoice.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getInvoices.fulfilled, (state, action) => {
                state.invoices = action.payload.map((invoice) => ({
                    ...invoice,
                    amount : calcAmount(invoice.items),
                }));

            })
            .addCase(getInvoices.rejected, (state, action) => {
                state.error = action.payload;

            })
            .addCase(markAsPaid.fulfilled, (state, action) => {
                const updatedInvoice  = action.payload;
                state.invoices = state.invoices.map((invoice) => {
                   return ( invoice.id === updatedInvoice.id ? updatedInvoice : invoice);
                });
                state.selectedInvoice.status = "paid";
            })
            .addCase(deleteInvoice.fulfilled, (state, action) => {
                state.invoices = state.invoices.filter((invoice) => invoice.id !== action.payload);
                state.selectedInvoice = null;
            })
            .addCase(editInvoice.fulfilled, (state, action) => {
                const updatedInvoice = {
                    ...action.payload,
                    amount: calcAmount(action.payload.items),
                };
                state.invoices = state.invoices.map((invoice) => {
                    return invoice.id === updatedInvoice.id ? updatedInvoice : invoice;
                })
                state.selectedInvoice = updatedInvoice;
                state.inEditMode = false;
            })





    }
})

export default invoiceSlice.reducer;
export const {toggleCancelForm,addFilter,selectInvoice,toggleShowDetails,createMode,editMode} = invoiceSlice.actions;