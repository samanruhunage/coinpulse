import Image from 'next/image'; 
import { fetcher } from '@/lib/coingecko.actions';
import DataTable from '../ui/DataTable';
import { cn, formatCurrency, formatPercentage } from '@/lib/utils';
import Link from 'next/link';
import CoinsPagination from '../ui/CoinsPagination';


const Coins = async ({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined }}) => {
   
    const pageParam  = searchParams?.page ;  
    const currentPage = Number(pageParam) || 1 ; 
    const perPage = 10 ; 
    
    const marketCoins = await fetcher<CoinMarketData[]>('/coins/markets', {
            vs_currency : 'usd', 
            order : 'market_cap_desc',
            per_page : perPage,
            page: currentPage,
            sparkline : 'false', 
            price_change_percentage : '24h' 
        }); 
       

    const columns : DataTableColumn<CoinMarketData>[] = [
        {
            header : "Rank", 
            cellClassName : "rank-cell",
            cell : (coin) => (
            <>
                #{coin.market_cap_rank}
                <Link href={`/coins/${coin.id}`} aria-label="View Coin"/> 
            </>
            )
        }, 
        {
            header : "Token", 
            cellClassName : "token-cell",
            cell : (coin) => {
            return (
                <div className="token-info">
                    <Image src={coin.image} alt={coin.name} width={36} height={36}/>
                    <p>{coin.name}{coin.symbol.toUpperCase()}</p>
                </div>

            )
            }
        },
        {
            header: "   Price", 
            cellClassName : "price-cell",
            cell : (coin) => formatCurrency(coin.current_price)
        }, 
        {
            header : "Market Cap", 
            cellClassName : "market-cap-cell",
            cell : (coin) => formatCurrency(coin.market_cap)
        }, 
        {
            header : "Market Cap Rank",
            cellClassName : "market-cap-rank-cell",
            cell : (coin) => coin.market_cap_rank
        }, 
        {
            header : "fully_diluted_valuation", 
            cellClassName : "fully-diluted-valuation-cell",
            cell : (coin) => formatCurrency(coin.fully_diluted_valuation)
        },
        {
            header : "total_volume", 
            cellClassName : "total-volume-cell",
            cell : (coin) => formatCurrency(coin.total_volume)
        }, 
        {
            header : "high_24h",
            cellClassName : "high-24h-cell",
            cell : (coin) => formatCurrency(coin.high_24h)
        }, 
        {
            header : "low_24h", 
            cellClassName : "low-24h-cell",
            cell : (coin) => formatCurrency(coin.low_24h)
        },
        {
            header : "24h Change", 
            cellClassName : "change-cell",
            cell : (coin) => {
                const isTrendingUp = coin.price_change_percentage_24h> 0; 
                return(
                    <span className={cn('change_value', {
                        'text-green-600' : isTrendingUp,
                        'text-red-500' : isTrendingUp})}
                        >
                            {isTrendingUp &&  '+' }
                        { formatPercentage(coin.price_change_percentage_24h)}
                    </span>
                )
            }
        }
        
    ]

    const hasMorePages = marketCoins.length === perPage ;   

    const estimatedTotalPages = currentPage >= 100 ? Math.ceil(currentPage / 100) * 100 + 100 : 100; 
 
  return (
    <main id="coins-page">
        <div className="content">
            <h4>All Coins</h4>
            <DataTable 
                tableClassName='coins-table'
                columns={columns}
                data={marketCoins} 
                rowKey={(coin)=>coin.id}
                headerCellClassName="py-3!"
                bodyCellClassName="py-2!"
                />
            
            <CoinsPagination currentPage={currentPage} totalPages={estimatedTotalPages} hasMorePages={hasMorePages}/>
        </div>
    </main>

  )
}

export default Coins