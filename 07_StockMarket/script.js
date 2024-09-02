document.addEventListener('DOMContentLoaded', () => {
    const ticker = document.querySelector('.ticker');
    const stockSelect = document.getElementById('stockSelect');
    const quantity = document.getElementById('quantity');
    const buyBtn = document.getElementById('buyBtn');
    const sellBtn = document.getElementById('sellBtn');
    const portfolioList = document.getElementById('portfolioList');
    const portfolioValue = document.getElementById('portfolioValue');


    let stocks = {
        AAPL: { price: 150, change: 0 },
        GOOGL: { price: 2800, change: 0 },
        MSFT: { price: 300, change: 0 },
        AMZN: { price: 3300, change: 0 }
    };

    let portfolio = {};

    const tradeMadeEvent = new CustomEvent('tradeMade', {
        bubbles: true,
        detail: {
            message: 'A trade was made'
        }
    })

    const stockPriceChangedEvent = new CustomEvent('stockPriceChanged', {
        bubbles: true,
        detail: { message: 'Stock price has changed' }
    });

    // Event listeners
    buyBtn.addEventListener('click', () => trade('buy'))
    sellBtn.addEventListener('click', () => trade('sell'))
    document.addEventListener('tradeMade', updatePortfolio);
    document.addEventListener('stockPriceChanged', updateStockTicker);

    function trade(action) {
        let symbol = stockSelect.value;
        let amount = parseInt(quantity.value, 10)
        if (action === 'buy') {
            if(!portfolio[symbol]) {
                portfolio[symbol] = 0;
            }
            portfolio[symbol] += amount;
        } else if (action === 'sell') { 
            if(!portfolio[symbol] || portfolio[symbol] < amount)  {
                alert('Not enough stocks to sell!');
                return; 
            }
            portfolio[symbol] -= amount;
        }
        document.dispatchEvent(tradeMadeEvent);
    }

    function updatePortfolio() {
        portfolioList.innerHTML = '';
        let totalValue = 0;

        for(let symbol in portfolio) {
            if (portfolio[symbol] > 0) {
                let value = portfolio[symbol] * stocks[symbol].price;
                totalValue += value;
                let changeClass = stocks[symbol].change >= 0 ? 'stock-up' : 'stock-down';
                let arrow = stocks[symbol].change >= 0 ? '▲' : '▼';
                let li = document.createElement('li');
                li.className = 'fade-in';
                li.innerHTML = `
                    <div class="portfolio-item-details">
                        <strong>${symbol}</strong>: ${portfolio[symbol]} shares
                        <span class="${changeClass}">$${value.toFixed(2)} ${arrow}</span>
                    </div>
                    <div class="portfolio-item-actions">
                        <button class="btn-buy" data-symbol="${symbol}">Buy</button>
                        <button class="btn-sell" data-symbol="${symbol}">Sell</button>
                    </div>
                `;

                portfolioList.appendChild(li);
            }
        }

        portfolioValue.textContent = totalValue.toFixed(2);

        document.querySelectorAll('.portfolio-item-actions button').forEach(button => {
            button.addEventListener('click', handlePortfolioAction)
        })
    }

    function handlePortfolioAction(event) {
        const action = event.target.classList.contains('btn-buy') ? 'buy' : 'sell';
        const symbol = event.target.getAttribute('data-symbol');
        stockSelect.value = symbol;
        quantity.value = 1;
        trade(action);
    }

    function updateStockTicker(event) {
        console.log('event', event)
        ticker.innerHTML = '';
        for (let symbol in stocks) {
            let stock = stocks[symbol];
            let changeClass = stock.change >= 0 ? 'stock-up' : 'stock-down';
            let arrow = stock.change >= 0 ? '▲' : '▼';
            ticker.innerHTML += `<span class="ticker-item ${changeClass}">${symbol}: $${stock.price.toFixed(2)} ${arrow}</span>`;
        }
    }

    function updateStockPrices() {
        for (let symbol in stocks) {
            let change = (Math.random() - 0.5) * 10;
            stocks[symbol].price += change;
            stocks[symbol].price = parseFloat(stocks[symbol].price.toFixed(2));
            stocks[symbol].change = change;
        }
        document.dispatchEvent(stockPriceChangedEvent);
        document.dispatchEvent(tradeMadeEvent);
    }

     // Start the simulation
     setInterval(updateStockPrices, 2000);
     updateStockPrices(); // Initial update
});