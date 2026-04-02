import { useSearchParams } from 'next/navigation'  ;
import Coins from './Coins'; 

const Coinpg = () => {
    const searchParams = useSearchParams();
  return (
    <Coins searchParams={searchParams}/>
  )
}

export default Coinpg; 