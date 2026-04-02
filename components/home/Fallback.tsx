
export const CoinOverviewFallback =() =>{
    return(
        <div id="coin-overview-fallback">  
            <div className="header pt-2">
                <div className="header-image skeleton">
                    <div className="info">
                        <div className="header-line-sm skeleton"/>
                        <div className="header-line-lg skeleton"/>
                    </div>
                </div>
                <div className="chart">
                    <div className="chart-skeleton skeleton"/>
                </div>
            </div>
        </div>
    )
}


export const TrendingCoinFallback = () => {
  return (
    <div className="trending-coins-fallback">
      <div className="name-link">
        <div className="name-image skeleton" />
        <div className="name-line skeleton" />
      </div>

      <div className="name-link">
        <div className="name-image skeleton" />
        <div className="name-line skeleton" />
      </div>

      <div className="name-link">
        <div className="name-image skeleton" />
        <div className="name-line skeleton" />
      </div>
    </div>
  );
};