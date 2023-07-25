import Head from "next/head";
import { useAddress,useContract,useContractRead, useMetadata } from "@thirdweb-dev/react";
import Header from "./components/Header";
import Complaint from "./components/Complaint";
import Status from "./components/Status";
import Admin from "./components/Admin";
export default function Dashboard() {
  const address = useAddress();
  const { data: contract } = useContract('0xe5eB650BECF64598fF4cAcA79A497314eF9FdcD1');

  const { data:officer } = useContractRead(contract, "officer")

  return (
    <div className='styles.container'>
      <Head>
        <title>Complaint registration</title>
        <meta name='description' content='Complaint registration dapp'/>
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      <Header/>
      <Complaint/>
      <Status/>
      {
        officer === address &&(
            <Admin/>
        )
      }
      
    </div>
  )
}
