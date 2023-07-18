import React,{useEffect, useState}from 'react'
import axios from "axios";

export default function MainPage() {


    //state from the from feilds

    const [date,setDate]=useState(null);
    const [sourceCurrency,setSourceCurrency]=useState("");
    const [targetCurrency,setTargetCurrency]=useState("");
    const [amountInSourceCurrency,setAmountInSourceCurrency]=useState(0);
    const [amountInTargetCurrency,setAmountInTargetCurrency]=useState(0);
    const [currencyName ,setCurrencyNames]=useState([])
    const [loading , setLoading]=useState(true);
    //handle submit methode
    const handleSubmit =async(e)=>{
        e.preventDefault();
       try{
        const responce =await axios.get("http://localhost:5000/convert",{
            params:{
                date,
                sourceCurrency,
                targetCurrency,
                amountInSourceCurrency,


            },
        });


        // callculation

        setAmountInTargetCurrency(responce.data);
        setLoading(false);

       }
       catch(err){
        console.error(err);
       }






        console.log(
            // date,
            // setSourceCurrency,
            // targetCurrency,
            // amountInSourceCurrency
            sourceCurrency


        )
    }
    // get all currency name

    useEffect(()=>{
        const getCurrencyName = async() =>{
            try{
                const responce = await axios.get("http://localhost:5000/getAllCurrencies");
                setCurrencyNames(responce.data);

            }
            catch(err){
                console.error(err);
            }
        };
        getCurrencyName ();

    }, []);




  return (
    <div>
        <h1 className='lg:mx-32 text-5xl font-bold text-green-500'>Convert your currency today</h1>
        <p className='lg:mx-32 opacity-40 py-6'>wellcome  our currency converting app </p>
    <div className='mt-5 flex items-center justify-center flex-col'>
        <section className='w-full lg:w-1/2'>
            <form onSubmit={handleSubmit}>

                <div className='mb-4'>
                <div className='mb-6'>
                     <label htmlFor={date} className="block mb-2 text-sm font-medium text-white
                     -900 dark:text-white">
                        Date
                        </label>
                     <input 
                     onChange={(e)=>setDate(e.target.value)}
                     type="Date" 
                     id={date}
                     name={date}
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                     placeholder="name@flowbite.com"
                     required/>
                    
                </div>
                </div>

                <div className='mb-4'>
                <div className='mb-6'>
                     <label htmlFor={sourceCurrency} className="block mb-2 text-sm font-medium text-white
                     -900 dark:text-white">
                        source currency
                        </label>
                        <select 
                        onChange={(e)=>setSourceCurrency(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-5"
                        
                         name={sourceCurrency}
                         id={sourceCurrency}
                         value={sourceCurrency}
                         >

                            <option value=""> Select source currency</option>

                            {Object.keys(currencyName).map((currency)=>(
                                <option className='p-1' key={currency}value={currency}>
                                    {currencyName[currency]}
                                </option>
                            ))}
                        </select>
                    
                    
                </div>
                </div>





                <div className='mb-4'>
                <div className='mb-6'>
                     <label htmlFor={targetCurrency} className="block mb-2 text-sm font-medium text-white
                     -900 dark:text-white">
                           Target currency
                        </label>
                        <select 
                        onChange={(e)=>setTargetCurrency(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-5"
                        
                         name={targetCurrency}
                         id={targetCurrency}
                         value={targetCurrency}
                         >

                            <option value=""> Select Target currency</option>

                            {Object.keys(currencyName).map((currency)=>(
                                <option className='p-1' key={currency}value={currency}>
                                    {currencyName[currency]}
                                </option>
                            ))}

                        </select>
                    
                    
                </div>
                </div>

                <div className='mb-4'>
                <div className='mb-6'>
                     <label htmlFor={amountInSourceCurrency} className="block mb-2 text-sm font-medium text-white
                     -900 dark:text-white">
                        Amount in source currency
                        </label>
                     <input 
                     onChange={(e)=>setAmountInSourceCurrency(e.target.value)}
                     type="number" 
                     id={amountInSourceCurrency}
                     name={amountInSourceCurrency}
                     value={amountInSourceCurrency}

                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                     placeholder="Amount in source currency"
                     required/>
                    
                </div>
                </div>
              
              <button  className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md'>
                    {""}
                Get the target currency</button>

            </form>
        </section>
    </div>

    {!loading?(

            <section className='lg:mx-75  font-bold' >
            {amountInSourceCurrency} {currencyName[sourceCurrency]}is equals to {""}
            
            <span className='text-green-500 font-bold'>
               {""}
               {amountInTargetCurrency}

            </span>{" "}
             in {currencyName[targetCurrency]} 


            </section>):null}

    
   
    
    
    </div>
    
  )
}
