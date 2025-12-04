import paymentContext from "./paymentContext";
import { useState, useEffect  } from "react";

const PaymentState=(props)=>{
  const host="http://localhost:5000"
  const paymentsInitial=[]

    const [payments,setPayments]=useState(paymentsInitial)

    const getPayments=async ()=>{
      const response=await fetch(`${host}/api/payment/fetchallpayments`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setPayments(json)
    }
    const addPayment=async (user,booking,amount,paymentMethod,transactionId,status,paymentDate)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/payment/addpayment`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({user,booking,amount,paymentMethod,transactionId,status,paymentDate})
      });
      const payment=await response.json();
      const normalizedData = Array.isArray(payment.savedPayment) ? payment.savedPayment : [payment.savedPayment];
      //setBuses(buses.concat(bus.savedBus));
      setPayments(prevPayments => [...prevPayments, normalizedData])
      return payment.success;
    }
    const deletePayment= async(id)=>{
      const response=await fetch(`${host}/api/payment/deletepayment/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newPayments=payments.filter((payment)=>{return payment._id!==id})
      setPayments(newPayments)
    }
    const editPayment=async(id,user,booking,amount,paymentMethod,transactionId,status,paymentDate)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/payment/updatepayment/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({user,booking,amount,paymentMethod,transactionId,status,paymentDate})
      });
      const json=await response.json();
      let newPayments=JSON.parse(JSON.stringify(payments));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newPayments.length; index++) {
        const element = newPayments[index];
        if(element._id===id)
        {
          newPayments[index].user=user;
          newPayments[index].booking=booking;
          newPayments[index].amount=amount;
          newPayments[index].paymentMethod=paymentMethod;
          newPayments[index].transactionId=transactionId;
          newPayments[index].status=status;
          newPayments[index].paymentDate=paymentDate;
          break;
        }
      }

      let a=0
      setPayments(newPayments);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <paymentContext.Provider value={{payments,addPayment,deletePayment,editPayment,getPayments}}>
            {props.children}
        </paymentContext.Provider>
    )
}
export default PaymentState;