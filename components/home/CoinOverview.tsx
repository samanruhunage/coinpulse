import { fetcher } from "@/lib/coingecko.actions";
import Image from 'next/image'; 
import { formatcurrency } from "@/lib/utils";
import { CoinOverviewFallback } from "./Fallback";


const CoinOverview = async () => {
    let coin;
    try {
        coin = await fetcher<CoinDetailsData>('/coins/bitcoin', {
            dex_pair_format : 'symbol'
        }); 
    }catch(error) { 
        console.error('Error fetching coin overview:', error); 
        return <CoinOverviewFallback />
    }
     
    
  return (
    <div id="coin-overveiw" className="ml-7 w-3/4  bg-gray-800 p-4 rounded-lg">
        <div className="header pt-2!">
            <div>
                <Image src={coin?.image?.large} width={56} height={56} alt={coin.name} />
            </div>
            <div className="info">
                <p>{coin?.name} / {coin?.symbol.toUpperCase()}</p>
                <h1>{formatcurrency(coin.market_data.current_price.usd)}</h1>
            </div>
        </div>
    </div>
  )
}

export default CoinOverview