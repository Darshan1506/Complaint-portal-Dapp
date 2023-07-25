import React ,{useState} from 'react'
import { useAddress,useContract,useContractRead, useContractWrite } from "@thirdweb-dev/react";
import toast from 'react-hot-toast';
const Complaint = () => {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const { data: contract } = useContract('0xe5eB650BECF64598fF4cAcA79A497314eF9FdcD1');
    const { data: nextId  } = useContractRead(contract, "nextId")
    const { mutateAsync: fileComplaint } = useContractWrite(contract, "fileComplaint")
    const handleComplaint = async()=>{
        const notification = toast.loading("Filing Complaint")
        try {
            const data = await fileComplaint({ args:[title, description]});
            toast.success(`Complaint Filed Note Your Complaint Id: ${nextId}`,{
                id:notification
            })
            console.info("contract call successs", data);
            setTitle("");
            setDescription("");
          } catch (err) {
            toast.error("Sorry Something went wrong",{
                id:notification
            })
            console.error("contract call failure", err);
          }
    }
  return (
    <div className='complaint-container md: mr-[290px] md:ml-[290px]'>
        <p className='complaint-title-red'>File your complaint here:</p>
        <div className='md:flex items-center'>
            <p className='complaint-text-margin  mr-[75px]'>Title</p>
            <input type='text' className='container-input md:w-[500px] w-[300px]' placeholder='Enter title here' onChange={(e)=>{setTitle(e.target.value)}}/>
        </div>
        <div className='md:flex items-center'>
            <p className='complaint-text-margin'>Description</p>
            <input type='text' className='container-input md:w-[500px] w-[300px]' placeholder='Enter description here' onChange={(e)=>{setDescription(e.target.value)}}/>
        </div>
        <button onClick={handleComplaint} className='button-common hover:bg-blue-900'>File Complaint</button>
    </div>
  )
}

export default Complaint