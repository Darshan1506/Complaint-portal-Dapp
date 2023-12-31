import React, { useState } from 'react'
import { useAddress,useContract,useContractRead } from "@thirdweb-dev/react";

const Status = () => {
    const [id, setId] = useState(0);
    const { data: contract } = useContract('0xe5eB650BECF64598fF4cAcA79A497314eF9FdcD1');
    const { data:Complaints } = useContractRead(contract, "Complaints",id);

  return (
    <div className='status-container md: mr-[290px] md:ml-[290px]'>
        <div className='status'>
            <p className='status-title'>Check Status of Your Complaint</p>
            <div className='flex items-center justify-center'>
                <p className='status-text'>Complaint Id:</p>
                <input type='number' className='status-input md:w-[300px]' placeholder='Enter Your Complaint Id' onChange={(e)=>{setId(e.target.value)}}/>
            </div>
        </div>
       {Complaints && Complaints.title && (
         <div className='status-render-container md:w-[600px]'>
         <p className='status-render-title'>Complaint Details:</p>
         <p className='status-render-text'>Complaint Id: {(Complaints.id).toString()}</p>
         <p className='status-render-text'>Complaint Registered by: {(Complaints.complaintRegiteredBy).toString()}</p>
         <p className='status-render-text'>Complaint Title: {Complaints.title}</p>
         <p className='status-render-text'>Approval Status: {Complaints.isApproved ? "Approved" : !Complaints.exists ? "Declined" : "Approval Pending"}</p>
         <p className='status-render-text'>Approval Remark: {Complaints.approvalRemark}</p>
         <p className='status-render-text'>Resolution Status: {Complaints.isResolved ? "Resolved" : "Resolution pending"}</p>
         <p className='status-render-text mb-2'>Resolution Remark: {Complaints.resolutionRemark}</p>
     </div>
       )}
    </div>
  )
}

export default Status