
import { Menu, MenuButton, MenuItem, MenuItems,Button } from '@headlessui/react'
import {ArchiveXIcon,ChevronDownIcon,PencilIcon,SquareStackIcon,TrashIcon,Filter,Plus} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getInvoices} from "../store/invoice.jsx";
import {addFilter} from "../store/invoice.jsx";
const status = ["all","draft","pending","paid"];
const Header = ({handleCancel,filter}) => {
     const dispatch = useDispatch();
     useEffect(() => {
         dispatch(getInvoices());
     },[dispatch]);
     const {invoices} = useSelector((state) => state.invoice);

    return (
        <div className = "flex items-center justify-between mb-8">
             <div>
                <h1 className = "text-3xl font-bold text-white mb-2">Invoices</h1>
                 <p className = "text-slate-400">There are {invoices.length === 0 ? "No Invoices" : `${invoices.length} Invoices`}</p>
             </div>
            <div className = "flex items-center space-x-4">
                <Menu as="div" className = "relative">
                    <MenuButton className="flex items-center text-white space-x-2 cursor-pointer">
                        <Filter size = {20}/>
                        <span>Filter By Status</span>
                    </MenuButton>

                    <MenuItems as = "ul" className = {`absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg
                    shadow-lg p-2 z-10`}>
                        {status.map((item,index) => {
                            return (
                                <MenuItem as = "li" key = {index}>
                                    <Button as = "button" className = {`text-left w-full px-4 py-2 rounded-lg capitalize cursor-pointer hover:bg-slate-700 ${filter === item ? "text-violet-500" : "text-white"}`}
                                    onClick = {() => dispatch(addFilter(item))}>
                                        {item}
                                    </Button>
                                </MenuItem>
                            )
                        })}
                    </MenuItems>
                </Menu>
                <Button as = "button" className = "bg-violet-500 hover:bg-violet-600 text-white px-6 py-2
                rounded-full flex items-center space-x-2 cursor-pointer"
                onClick = {handleCancel}>
                    <div className = "flex items-center  bg-white rounded-full p-2 text-violet-500">
                       <Plus size = {16}/>
                    </div>
                        <span >New Invoice</span>
                </Button>
            </div>
        </div>

    )
}

export default Header;