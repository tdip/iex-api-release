"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This class handles communication with the IEX API in a type-safe and flexible
 * way. It is usable in Browser, React Native, and NodeJS contexts.
 */
class IEXClient {
    /**
     * @param fetchFunction A function that is API compatible with the browser
     *  fetch function. In browsers and React Native contexts, the global fetch
     *  object can be passed in. In NodeJS, a library like fetch-ponyfill can be
     *  used to provide such a function.
     * @param httpsEndpoint An optional argument to override the IEX API endpoint.
     *  Unless you have a specific mock endpoint or the like in mind, it is
     *  recommended to omit this argument.
     */
    constructor(fetchFunction, httpsEndpoint = 'https://api.iextrading.com/1.0') {
        this.fetchFunction = fetchFunction;
        this.httpsEndpoint = httpsEndpoint;
        this.request = this.request.bind(this); // tslint:disable-line:no-unsafe-any
    }
    /**
     * This function does a straight pass-through request to the IEX api using the
     * path provided. It can be used to do any call to the service, including ones
     * that respond with content-type text/csv or application/json.
     *
     * @example
     *   request('/stock/aapl/price')
     *   request('/stock/aapl/quote?displayPercent=true')
     *
     * @see https://iextrading.com/developer/docs/#getting-started
     *
     * @param path The path to hit the IEX API endpoint at.
     */
    request(path) {
        return this.fetchFunction(`${this.httpsEndpoint}/${path}`)
            .then(res => {
            const contentType = res.headers.get('content-type');
            if (contentType === null) {
                return null;
            }
            else if (contentType.includes('application/json')) {
                return res.json();
            }
            else {
                return res.text();
            }
        });
    }
    /**
     * Gets the full list of stock symbols supported by IEX.
     *
     * @see https://iextrading.com/developer/docs/#symbols
     */
    symbols() {
        return this.request('/ref-data/symbols');
    }
    /**
     * Gets the quote information of a given stock.
     *
     * @see https://iextrading.com/developer/docs/#quote
     * @param stockSymbol The symbol of the stock to fetch data for.
     * @param [displayPercent=false] If set to true, all percentage values will be multiplied by a factor of 100.
     */
    stockQuote(stockSymbol, displayPercent) {
        const queryString = displayPercent ? '?displayPercent=true' : '';
        return this.request(`/stock/${stockSymbol}/quote${queryString}`);
    }
    /**
     * Gets charting data for a stock in a given range.
     *
     * @see https://iextrading.com/developer/docs/#chart
     * @param stockSymbol The symbol of the stock to fetch data for.
     * @param range The time range to load chart data for.
     */
    stockChart(stockSymbol, range) {
        return this.request(`/stock/${stockSymbol}/chart/${range}`);
    }
    /**
     * Gets the price and time for the open and close of a stock.
     *
     * @see https://iextrading.com/developer/docs/#open-close
     * @param stockSymbol The symbol of the stock to fetch data for.
     */
    stockOpenClose(stockSymbol) {
        return this.request(`/stock/${stockSymbol}/open-close`);
    }
    /**
     * Gets previous day adjusted price data for a single stock, or an object
     * keyed by symbol of price data for the whole market.
     *
     * @see https://iextrading.com/developer/docs/#previous
     * @param stockSymbol The symbol of the stock to fetch data for.
     */
    stockPrevious(stockSymbol) {
        return this.request(`/stock/${stockSymbol}/previous`);
    }
    /**
     * Gets information about the company associated with the stock symbol.
     *
     * @see https://iextrading.com/developer/docs/#company
     * @param stockSymbol The symbol of the stock to fetch data for.
     */
    stockCompany(stockSymbol) {
        return this.request(`/stock/${stockSymbol}/company`);
    }
    /**
     * Gets key stats for the given stock symbol.
     *
     * @see https://iextrading.com/developer/docs/#key-stats
     * @param stockSymbol The symbol of the stock to fetch data for.
     */
    stockKeyStats(stockSymbol) {
        return this.request(`/stock/${stockSymbol}/stats`);
    }
    /**
     * Gets a list of peer tickerss for the given symbols.
     *
     * @see https://iextrading.com/developer/docs/#peers
     * @param stockSymbol The symbol of the stock to fetch data for.
     */
    stockPeers(stockSymbol) {
        return this.request(`/stock/${stockSymbol}/peers`);
    }
    /**
     * Similar to the peers endpoint, except this will return most active market
     * symbols when peers are not available. If the symbols returned are not
     * peers, the peers key will be false. This is not intended to represent a
     * definitive or accurate list of peers, and is subject to change at any time.
     *
     * @see https://iextrading.com/developer/docs/#relevant
     * @param stockSymbol The symbol of the stock to fetch data for.
     */
    stockRelevant(stockSymbol) {
        return this.request(`/stock/${stockSymbol}/relevant`);
    }
    /**
     * Gets a list of news articles related to the given stock.
     *
     * @see https://iextrading.com/developer/docs/#news
     *
     * @param stockSymbol The symbol of the stock to fetch news for.
     * @param [range=10] The number of news articles to pull. Defaults to 10 if omitted.
     */
    stockNews(stockSymbol, range) {
        if (range) {
            return this.request(`/stock/${stockSymbol}/news/last/${range}`);
        }
        else {
            return this.request(`/stock/${stockSymbol}/news`);
        }
    }
    /**
     * Gets income statement, balance sheet, and cash flow data from the four most recent reported quarters.
     *
     * @see https://iextrading.com/developer/docs/#financials
     * @param stockSymbol The symbol of the stock to fetch data for.
     */
    stockFinancials(stockSymbol) {
        return this.request(`/stock/${stockSymbol}/financials`);
    }
    /**
     * Gets earnings data from the four most recent reported quarters.
     *
     * @see https://iextrading.com/developer/docs/#earnings
     * @param stockSymbol The symbol of the stock to fetch data for.
     */
    stockEarnings(stockSymbol) {
        return this.request(`/stock/${stockSymbol}/earnings`);
    }
    /**
     * Gets divdends paid by the company over the given range.
     *
     * @see https://iextrading.com/developer/docs/#dividends
     * @param stockSymbol The symbol of the stock to fetch data for.
     * @param range The date range to get dividends from.
     */
    stockDividends(stockSymbol, range) {
        return this.request(`/stock/${stockSymbol}/dividends/${range}`);
    }
    /**
     * Gets stock splits of the company over the given range.
     *
     * @see https://iextrading.com/developer/docs/#splits
     * @param stockSymbol The symbol of the stock to fetch data for.
     * @param range The date range to get splits from.
     */
    stockSplits(stockSymbol, range) {
        return this.request(`/stock/${stockSymbol}/splits/${range}`);
    }
    /**
     * Gets an object containing a URL to the company's logo.
     *
     * @see https://iextrading.com/developer/docs/#logo
     * @param stockSymbol The symbol of the stock to fetch data for.
     */
    stockLogo(stockSymbol) {
        return this.request(`/stock/${stockSymbol}/logo`);
    }
    /**
     * Fetches the price of a given stock.
     *
     * @see https://iextrading.com/developer/docs/#price
     * @param stockSymbol The symbol of the stock to fetch prices for.
     * @return A single number, being the IEX real time price, the 15 minute
     *  delayed market price, or the previous close price, is returned.
     */
    stockPrice(stockSymbol) {
        return this.request(`/stock/${stockSymbol}/price`);
    }
    /**
     * Gets the 15 minute delayed market quote.
     *
     * @see https://iextrading.com/developer/docs/#delayed-quote
     * @param stockSymbol The symbol of the stock to fetch data for.
     */
    stockDelayedQuote(stockSymbol) {
        return this.request(`/stock/${stockSymbol}/price`);
    }
    /**
     * Get a list of quotes for the top 10 symbols in a specified list.
     *
     * @see https://iextrading.com/developer/docs/#list
     * @param list The market list to fetch quotes from.
     * @param [displayPercent=false] If set to true, all percentage values will be multiplied by a factor of 100.
     */
    stockMarketListTopTen(list, displayPercent) {
        const queryString = displayPercent ? '?displayPercent=true' : '';
        return this.request(`/stock/market/list/${list}${queryString}`);
    }
    /**
     * Gets an array of effective spread, eligible volume, and price improvement
     * of a stock, by market. Unlike volume-by-venue, this will only return a
     * venue if effective spread is not ‘N/A’. Values are sorted in descending
     * order by effectiveSpread. Lower effectiveSpread and higher priceImprovement
     * values are generally considered optimal.
     *
     * @see https://iextrading.com/developer/docs/#effective-spread
     * @param stockSymbol The symbol of the stock to fetch data for.
     */
    stockEffectiveSpread(stockSymbol) {
        return this.request(`/stock/${stockSymbol}/effective-spread`);
    }
    /**
     * Gets 15 minute delayed and 30 day average consolidated volume percentage of
     * a stock, by market. This call will always return 13 values, and will be
     * sorted in ascending order by current day trading volume percentage.
     *
     * @see https://iextrading.com/developer/docs/#volume-by-venue
     * @param stockSymbol The symbol of the stock to fetch data for.
     */
    stockVolumeByVenue(stockSymbol) {
        return this.request(`/stock/${stockSymbol}/volume-by-venue`);
    }
}
exports.default = IEXClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBOzs7R0FHRztBQUNIO0lBSUU7Ozs7Ozs7O09BUUc7SUFDSCxZQUFtQixhQUEyQixFQUFFLGFBQWEsR0FBRyxnQ0FBZ0M7UUFDOUYsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUE7UUFDbEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUE7UUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLG9DQUFvQztJQUM3RSxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0ksT0FBTyxDQUFDLElBQVk7UUFDekIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLEVBQUUsQ0FBQzthQUN6RCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDVixNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtZQUNuRCxJQUFJLFdBQVcsS0FBSyxJQUFJLEVBQUU7Z0JBQ3hCLE9BQU8sSUFBSSxDQUFBO2FBQ1o7aUJBQU0sSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7Z0JBQ25ELE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBO2FBQ2xCO2lCQUFNO2dCQUNMLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBO2FBQ2xCO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE9BQU87UUFDWixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtJQUMxQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksVUFBVSxDQUFDLFdBQW1CLEVBQUUs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LFdBQW1CO1FBQzFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLFdBQVcsUUFBUSxDQUFDLENBQUE7SUFDcEQsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLHFCQUFxQixDQUFDLElBQTBCLEVBQUUsY0FBd0I7UUFDL0UsTUFBTSxXQUFXLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO1FBQ2hFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsSUFBSSxHQUFHLFdBQVcsRUFBRSxDQUFDLENBQUE7SUFDakUsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNJLG9CQUFvQixDQUFDLFdBQW1CO1FBQzdDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLFdBQVcsbUJBQW1CLENBQUMsQ0FBQTtJQUMvRCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLGtCQUFrQixDQUFDLFdBQW1CO1FBQzNDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLFdBQVcsa0JBQWtCLENBQUMsQ0FBQTtJQUM5RCxDQUFDO0NBQ0Y7QUE3UUQsNEJBNlFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVmZXJlbmNlRGF0YUFQSSBmcm9tICcuL2FwaXMvcmVmZXJlbmNlRGF0YSdcbmltcG9ydCAqIGFzIFN0b2Nrc0FQSSBmcm9tICcuL2FwaXMvc3RvY2tzJ1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgaGFuZGxlcyBjb21tdW5pY2F0aW9uIHdpdGggdGhlIElFWCBBUEkgaW4gYSB0eXBlLXNhZmUgYW5kIGZsZXhpYmxlXG4gKiB3YXkuIEl0IGlzIHVzYWJsZSBpbiBCcm93c2VyLCBSZWFjdCBOYXRpdmUsIGFuZCBOb2RlSlMgY29udGV4dHMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElFWENsaWVudCB7XG4gIHByaXZhdGUgZmV0Y2hGdW5jdGlvbjogdHlwZW9mIGZldGNoXG4gIHByaXZhdGUgaHR0cHNFbmRwb2ludDogc3RyaW5nXG5cbiAgLyoqXG4gICAqIEBwYXJhbSBmZXRjaEZ1bmN0aW9uIEEgZnVuY3Rpb24gdGhhdCBpcyBBUEkgY29tcGF0aWJsZSB3aXRoIHRoZSBicm93c2VyXG4gICAqICBmZXRjaCBmdW5jdGlvbi4gSW4gYnJvd3NlcnMgYW5kIFJlYWN0IE5hdGl2ZSBjb250ZXh0cywgdGhlIGdsb2JhbCBmZXRjaFxuICAgKiAgb2JqZWN0IGNhbiBiZSBwYXNzZWQgaW4uIEluIE5vZGVKUywgYSBsaWJyYXJ5IGxpa2UgZmV0Y2gtcG9ueWZpbGwgY2FuIGJlXG4gICAqICB1c2VkIHRvIHByb3ZpZGUgc3VjaCBhIGZ1bmN0aW9uLlxuICAgKiBAcGFyYW0gaHR0cHNFbmRwb2ludCBBbiBvcHRpb25hbCBhcmd1bWVudCB0byBvdmVycmlkZSB0aGUgSUVYIEFQSSBlbmRwb2ludC5cbiAgICogIFVubGVzcyB5b3UgaGF2ZSBhIHNwZWNpZmljIG1vY2sgZW5kcG9pbnQgb3IgdGhlIGxpa2UgaW4gbWluZCwgaXQgaXNcbiAgICogIHJlY29tbWVuZGVkIHRvIG9taXQgdGhpcyBhcmd1bWVudC5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihmZXRjaEZ1bmN0aW9uOiB0eXBlb2YgZmV0Y2gsIGh0dHBzRW5kcG9pbnQgPSAnaHR0cHM6Ly9hcGkuaWV4dHJhZGluZy5jb20vMS4wJykge1xuICAgIHRoaXMuZmV0Y2hGdW5jdGlvbiA9IGZldGNoRnVuY3Rpb25cbiAgICB0aGlzLmh0dHBzRW5kcG9pbnQgPSBodHRwc0VuZHBvaW50XG4gICAgdGhpcy5yZXF1ZXN0ID0gdGhpcy5yZXF1ZXN0LmJpbmQodGhpcykgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby11bnNhZmUtYW55XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBkb2VzIGEgc3RyYWlnaHQgcGFzcy10aHJvdWdoIHJlcXVlc3QgdG8gdGhlIElFWCBhcGkgdXNpbmcgdGhlXG4gICAqIHBhdGggcHJvdmlkZWQuIEl0IGNhbiBiZSB1c2VkIHRvIGRvIGFueSBjYWxsIHRvIHRoZSBzZXJ2aWNlLCBpbmNsdWRpbmcgb25lc1xuICAgKiB0aGF0IHJlc3BvbmQgd2l0aCBjb250ZW50LXR5cGUgdGV4dC9jc3Ygb3IgYXBwbGljYXRpb24vanNvbi5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogICByZXF1ZXN0KCcvc3RvY2svYWFwbC9wcmljZScpXG4gICAqICAgcmVxdWVzdCgnL3N0b2NrL2FhcGwvcXVvdGU/ZGlzcGxheVBlcmNlbnQ9dHJ1ZScpXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly9pZXh0cmFkaW5nLmNvbS9kZXZlbG9wZXIvZG9jcy8jZ2V0dGluZy1zdGFydGVkXG4gICAqXG4gICAqIEBwYXJhbSBwYXRoIFRoZSBwYXRoIHRvIGhpdCB0aGUgSUVYIEFQSSBlbmRwb2ludCBhdC5cbiAgICovXG4gIHB1YmxpYyByZXF1ZXN0KHBhdGg6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hGdW5jdGlvbihgJHt0aGlzLmh0dHBzRW5kcG9pbnR9LyR7cGF0aH1gKVxuICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICBjb25zdCBjb250ZW50VHlwZSA9IHJlcy5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJylcbiAgICAgIGlmIChjb250ZW50VHlwZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfSBlbHNlIGlmIChjb250ZW50VHlwZS5pbmNsdWRlcygnYXBwbGljYXRpb24vanNvbicpKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVzLnRleHQoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgZnVsbCBsaXN0IG9mIHN0b2NrIHN5bWJvbHMgc3VwcG9ydGVkIGJ5IElFWC5cbiAgICpcbiAgICogQHNlZSBodHRwczovL2lleHRyYWRpbmcuY29tL2RldmVsb3Blci9kb2NzLyNzeW1ib2xzXG4gICAqL1xuICBwdWJsaWMgc3ltYm9scygpOiBQcm9taXNlPFJlZmVyZW5jZURhdGFBUEkuU3RvY2tTeW1ib2xbXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJy9yZWYtZGF0YS9zeW1ib2xzJylcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBxdW90ZSBpbmZvcm1hdGlvbiBvZiBhIGdpdmVuIHN0b2NrLlxuICAgKlxuICAgKiBAc2VlIGh0dHBzOi8vaWV4dHJhZGluZy5jb20vZGV2ZWxvcGVyL2RvY3MvI3F1b3RlXG4gICAqIEBwYXJhbSBzdG9ja1N5bWJvbCBUaGUgc3ltYm9sIG9mIHRoZSBzdG9jayB0byBmZXRjaCBkYXRhIGZvci5cbiAgICogQHBhcmFtIFtkaXNwbGF5UGVyY2VudD1mYWxzZV0gSWYgc2V0IHRvIHRydWUsIGFsbCBwZXJjZW50YWdlIHZhbHVlcyB3aWxsIGJlIG11bHRpcGxpZWQgYnkgYSBmYWN0b3Igb2YgMTAwLlxuICAgKi9cbiAgcHVibGljIHN0b2NrUXVvdGUoc3RvY2tTeW1ib2w6IHN0cmluZywgZGlzcGxheVBlcmNlbnQ/OiBib29sZWFuKTogUHJvbWlzZTxTdG9ja3NBUEkuUXVvdGVSZXNwb25zZT4ge1xuICAgIGNvbnN0IHF1ZXJ5U3RyaW5nID0gZGlzcGxheVBlcmNlbnQgPyAnP2Rpc3BsYXlQZXJjZW50PXRydWUnIDogJydcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAvc3RvY2svJHtzdG9ja1N5bWJvbH0vcXVvdGUke3F1ZXJ5U3RyaW5nfWApXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBjaGFydGluZyBkYXRhIGZvciBhIHN0b2NrIGluIGEgZ2l2ZW4gcmFuZ2UuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly9pZXh0cmFkaW5nLmNvbS9kZXZlbG9wZXIvZG9jcy8jY2hhcnRcbiAgICogQHBhcmFtIHN0b2NrU3ltYm9sIFRoZSBzeW1ib2wgb2YgdGhlIHN0b2NrIHRvIGZldGNoIGRhdGEgZm9yLlxuICAgKiBAcGFyYW0gcmFuZ2UgVGhlIHRpbWUgcmFuZ2UgdG8gbG9hZCBjaGFydCBkYXRhIGZvci5cbiAgICovXG4gIHB1YmxpYyBzdG9ja0NoYXJ0KHN0b2NrU3ltYm9sOiBzdHJpbmcsIHJhbmdlOiBTdG9ja3NBUEkuQ2hhcnRSYW5nZU9wdGlvbik6IFByb21pc2U8U3RvY2tzQVBJLkNoYXJ0UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAvc3RvY2svJHtzdG9ja1N5bWJvbH0vY2hhcnQvJHtyYW5nZX1gKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHByaWNlIGFuZCB0aW1lIGZvciB0aGUgb3BlbiBhbmQgY2xvc2Ugb2YgYSBzdG9jay5cbiAgICpcbiAgICogQHNlZSBodHRwczovL2lleHRyYWRpbmcuY29tL2RldmVsb3Blci9kb2NzLyNvcGVuLWNsb3NlXG4gICAqIEBwYXJhbSBzdG9ja1N5bWJvbCBUaGUgc3ltYm9sIG9mIHRoZSBzdG9jayB0byBmZXRjaCBkYXRhIGZvci5cbiAgICovXG4gIHB1YmxpYyBzdG9ja09wZW5DbG9zZShzdG9ja1N5bWJvbDogc3RyaW5nKTogUHJvbWlzZTxTdG9ja3NBUEkuT3BlbkNsb3NlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAvc3RvY2svJHtzdG9ja1N5bWJvbH0vb3Blbi1jbG9zZWApXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBwcmV2aW91cyBkYXkgYWRqdXN0ZWQgcHJpY2UgZGF0YSBmb3IgYSBzaW5nbGUgc3RvY2ssIG9yIGFuIG9iamVjdFxuICAgKiBrZXllZCBieSBzeW1ib2wgb2YgcHJpY2UgZGF0YSBmb3IgdGhlIHdob2xlIG1hcmtldC5cbiAgICpcbiAgICogQHNlZSBodHRwczovL2lleHRyYWRpbmcuY29tL2RldmVsb3Blci9kb2NzLyNwcmV2aW91c1xuICAgKiBAcGFyYW0gc3RvY2tTeW1ib2wgVGhlIHN5bWJvbCBvZiB0aGUgc3RvY2sgdG8gZmV0Y2ggZGF0YSBmb3IuXG4gICAqL1xuICBwdWJsaWMgc3RvY2tQcmV2aW91cyhzdG9ja1N5bWJvbDogc3RyaW5nKTogUHJvbWlzZTxTdG9ja3NBUEkuUHJldmlvdXNSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYC9zdG9jay8ke3N0b2NrU3ltYm9sfS9wcmV2aW91c2ApXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY29tcGFueSBhc3NvY2lhdGVkIHdpdGggdGhlIHN0b2NrIHN5bWJvbC5cbiAgICpcbiAgICogQHNlZSBodHRwczovL2lleHRyYWRpbmcuY29tL2RldmVsb3Blci9kb2NzLyNjb21wYW55XG4gICAqIEBwYXJhbSBzdG9ja1N5bWJvbCBUaGUgc3ltYm9sIG9mIHRoZSBzdG9jayB0byBmZXRjaCBkYXRhIGZvci5cbiAgICovXG4gIHB1YmxpYyBzdG9ja0NvbXBhbnkoc3RvY2tTeW1ib2w6IHN0cmluZyk6IFByb21pc2U8U3RvY2tzQVBJLkNvbXBhbnlSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYC9zdG9jay8ke3N0b2NrU3ltYm9sfS9jb21wYW55YClcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGtleSBzdGF0cyBmb3IgdGhlIGdpdmVuIHN0b2NrIHN5bWJvbC5cbiAgICpcbiAgICogQHNlZSBodHRwczovL2lleHRyYWRpbmcuY29tL2RldmVsb3Blci9kb2NzLyNrZXktc3RhdHNcbiAgICogQHBhcmFtIHN0b2NrU3ltYm9sIFRoZSBzeW1ib2wgb2YgdGhlIHN0b2NrIHRvIGZldGNoIGRhdGEgZm9yLlxuICAgKi9cbiAgcHVibGljIHN0b2NrS2V5U3RhdHMoc3RvY2tTeW1ib2w6IHN0cmluZyk6IFByb21pc2U8U3RvY2tzQVBJLktleVN0YXRzUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAvc3RvY2svJHtzdG9ja1N5bWJvbH0vc3RhdHNgKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSBsaXN0IG9mIHBlZXIgdGlja2Vyc3MgZm9yIHRoZSBnaXZlbiBzeW1ib2xzLlxuICAgKlxuICAgKiBAc2VlIGh0dHBzOi8vaWV4dHJhZGluZy5jb20vZGV2ZWxvcGVyL2RvY3MvI3BlZXJzXG4gICAqIEBwYXJhbSBzdG9ja1N5bWJvbCBUaGUgc3ltYm9sIG9mIHRoZSBzdG9jayB0byBmZXRjaCBkYXRhIGZvci5cbiAgICovXG4gIHB1YmxpYyBzdG9ja1BlZXJzKHN0b2NrU3ltYm9sOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgL3N0b2NrLyR7c3RvY2tTeW1ib2x9L3BlZXJzYClcbiAgfVxuXG4gIC8qKlxuICAgKiBTaW1pbGFyIHRvIHRoZSBwZWVycyBlbmRwb2ludCwgZXhjZXB0IHRoaXMgd2lsbCByZXR1cm4gbW9zdCBhY3RpdmUgbWFya2V0XG4gICAqIHN5bWJvbHMgd2hlbiBwZWVycyBhcmUgbm90IGF2YWlsYWJsZS4gSWYgdGhlIHN5bWJvbHMgcmV0dXJuZWQgYXJlIG5vdFxuICAgKiBwZWVycywgdGhlIHBlZXJzIGtleSB3aWxsIGJlIGZhbHNlLiBUaGlzIGlzIG5vdCBpbnRlbmRlZCB0byByZXByZXNlbnQgYVxuICAgKiBkZWZpbml0aXZlIG9yIGFjY3VyYXRlIGxpc3Qgb2YgcGVlcnMsIGFuZCBpcyBzdWJqZWN0IHRvIGNoYW5nZSBhdCBhbnkgdGltZS5cbiAgICpcbiAgICogQHNlZSBodHRwczovL2lleHRyYWRpbmcuY29tL2RldmVsb3Blci9kb2NzLyNyZWxldmFudFxuICAgKiBAcGFyYW0gc3RvY2tTeW1ib2wgVGhlIHN5bWJvbCBvZiB0aGUgc3RvY2sgdG8gZmV0Y2ggZGF0YSBmb3IuXG4gICAqL1xuICBwdWJsaWMgc3RvY2tSZWxldmFudChzdG9ja1N5bWJvbDogc3RyaW5nKTogUHJvbWlzZTxTdG9ja3NBUEkuUmVsZXZhbnRSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYC9zdG9jay8ke3N0b2NrU3ltYm9sfS9yZWxldmFudGApXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIGxpc3Qgb2YgbmV3cyBhcnRpY2xlcyByZWxhdGVkIHRvIHRoZSBnaXZlbiBzdG9jay5cbiAgICpcbiAgICogQHNlZSBodHRwczovL2lleHRyYWRpbmcuY29tL2RldmVsb3Blci9kb2NzLyNuZXdzXG4gICAqXG4gICAqIEBwYXJhbSBzdG9ja1N5bWJvbCBUaGUgc3ltYm9sIG9mIHRoZSBzdG9jayB0byBmZXRjaCBuZXdzIGZvci5cbiAgICogQHBhcmFtIFtyYW5nZT0xMF0gVGhlIG51bWJlciBvZiBuZXdzIGFydGljbGVzIHRvIHB1bGwuIERlZmF1bHRzIHRvIDEwIGlmIG9taXR0ZWQuXG4gICAqL1xuICBwdWJsaWMgc3RvY2tOZXdzKHN0b2NrU3ltYm9sOiBzdHJpbmcsIHJhbmdlPzogU3RvY2tzQVBJLk5ld3NSYW5nZSk6IFByb21pc2U8U3RvY2tzQVBJLk5ld3NbXT4ge1xuICAgIGlmIChyYW5nZSkge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChgL3N0b2NrLyR7c3RvY2tTeW1ib2x9L25ld3MvbGFzdC8ke3JhbmdlfWApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYC9zdG9jay8ke3N0b2NrU3ltYm9sfS9uZXdzYClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBpbmNvbWUgc3RhdGVtZW50LCBiYWxhbmNlIHNoZWV0LCBhbmQgY2FzaCBmbG93IGRhdGEgZnJvbSB0aGUgZm91ciBtb3N0IHJlY2VudCByZXBvcnRlZCBxdWFydGVycy5cbiAgICpcbiAgICogQHNlZSBodHRwczovL2lleHRyYWRpbmcuY29tL2RldmVsb3Blci9kb2NzLyNmaW5hbmNpYWxzXG4gICAqIEBwYXJhbSBzdG9ja1N5bWJvbCBUaGUgc3ltYm9sIG9mIHRoZSBzdG9jayB0byBmZXRjaCBkYXRhIGZvci5cbiAgICovXG4gIHB1YmxpYyBzdG9ja0ZpbmFuY2lhbHMoc3RvY2tTeW1ib2w6IHN0cmluZyk6IFByb21pc2U8U3RvY2tzQVBJLkZpbmFuY2lhbHNSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYC9zdG9jay8ke3N0b2NrU3ltYm9sfS9maW5hbmNpYWxzYClcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGVhcm5pbmdzIGRhdGEgZnJvbSB0aGUgZm91ciBtb3N0IHJlY2VudCByZXBvcnRlZCBxdWFydGVycy5cbiAgICpcbiAgICogQHNlZSBodHRwczovL2lleHRyYWRpbmcuY29tL2RldmVsb3Blci9kb2NzLyNlYXJuaW5nc1xuICAgKiBAcGFyYW0gc3RvY2tTeW1ib2wgVGhlIHN5bWJvbCBvZiB0aGUgc3RvY2sgdG8gZmV0Y2ggZGF0YSBmb3IuXG4gICAqL1xuICBwdWJsaWMgc3RvY2tFYXJuaW5ncyhzdG9ja1N5bWJvbDogc3RyaW5nKTogUHJvbWlzZTxTdG9ja3NBUEkuRWFybmluZ3NSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYC9zdG9jay8ke3N0b2NrU3ltYm9sfS9lYXJuaW5nc2ApXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBkaXZkZW5kcyBwYWlkIGJ5IHRoZSBjb21wYW55IG92ZXIgdGhlIGdpdmVuIHJhbmdlLlxuICAgKlxuICAgKiBAc2VlIGh0dHBzOi8vaWV4dHJhZGluZy5jb20vZGV2ZWxvcGVyL2RvY3MvI2RpdmlkZW5kc1xuICAgKiBAcGFyYW0gc3RvY2tTeW1ib2wgVGhlIHN5bWJvbCBvZiB0aGUgc3RvY2sgdG8gZmV0Y2ggZGF0YSBmb3IuXG4gICAqIEBwYXJhbSByYW5nZSBUaGUgZGF0ZSByYW5nZSB0byBnZXQgZGl2aWRlbmRzIGZyb20uXG4gICAqL1xuICBwdWJsaWMgc3RvY2tEaXZpZGVuZHMoc3RvY2tTeW1ib2w6IHN0cmluZywgcmFuZ2U6IFN0b2Nrc0FQSS5EaXZpZGVuZFJhbmdlKTogUHJvbWlzZTxTdG9ja3NBUEkuRGl2aWRlbmRbXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYC9zdG9jay8ke3N0b2NrU3ltYm9sfS9kaXZpZGVuZHMvJHtyYW5nZX1gKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgc3RvY2sgc3BsaXRzIG9mIHRoZSBjb21wYW55IG92ZXIgdGhlIGdpdmVuIHJhbmdlLlxuICAgKlxuICAgKiBAc2VlIGh0dHBzOi8vaWV4dHJhZGluZy5jb20vZGV2ZWxvcGVyL2RvY3MvI3NwbGl0c1xuICAgKiBAcGFyYW0gc3RvY2tTeW1ib2wgVGhlIHN5bWJvbCBvZiB0aGUgc3RvY2sgdG8gZmV0Y2ggZGF0YSBmb3IuXG4gICAqIEBwYXJhbSByYW5nZSBUaGUgZGF0ZSByYW5nZSB0byBnZXQgc3BsaXRzIGZyb20uXG4gICAqL1xuICBwdWJsaWMgc3RvY2tTcGxpdHMoc3RvY2tTeW1ib2w6IHN0cmluZywgcmFuZ2U6IFN0b2Nrc0FQSS5TcGxpdFJhbmdlKTogUHJvbWlzZTxTdG9ja3NBUEkuU3BsaXRbXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYC9zdG9jay8ke3N0b2NrU3ltYm9sfS9zcGxpdHMvJHtyYW5nZX1gKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgYSBVUkwgdG8gdGhlIGNvbXBhbnkncyBsb2dvLlxuICAgKlxuICAgKiBAc2VlIGh0dHBzOi8vaWV4dHJhZGluZy5jb20vZGV2ZWxvcGVyL2RvY3MvI2xvZ29cbiAgICogQHBhcmFtIHN0b2NrU3ltYm9sIFRoZSBzeW1ib2wgb2YgdGhlIHN0b2NrIHRvIGZldGNoIGRhdGEgZm9yLlxuICAgKi9cbiAgcHVibGljIHN0b2NrTG9nbyhzdG9ja1N5bWJvbDogc3RyaW5nKTogUHJvbWlzZTxTdG9ja3NBUEkuTG9nb1Jlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgL3N0b2NrLyR7c3RvY2tTeW1ib2x9L2xvZ29gKVxuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoZXMgdGhlIHByaWNlIG9mIGEgZ2l2ZW4gc3RvY2suXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly9pZXh0cmFkaW5nLmNvbS9kZXZlbG9wZXIvZG9jcy8jcHJpY2VcbiAgICogQHBhcmFtIHN0b2NrU3ltYm9sIFRoZSBzeW1ib2wgb2YgdGhlIHN0b2NrIHRvIGZldGNoIHByaWNlcyBmb3IuXG4gICAqIEByZXR1cm4gQSBzaW5nbGUgbnVtYmVyLCBiZWluZyB0aGUgSUVYIHJlYWwgdGltZSBwcmljZSwgdGhlIDE1IG1pbnV0ZVxuICAgKiAgZGVsYXllZCBtYXJrZXQgcHJpY2UsIG9yIHRoZSBwcmV2aW91cyBjbG9zZSBwcmljZSwgaXMgcmV0dXJuZWQuXG4gICAqL1xuICBwdWJsaWMgc3RvY2tQcmljZShzdG9ja1N5bWJvbDogc3RyaW5nKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAvc3RvY2svJHtzdG9ja1N5bWJvbH0vcHJpY2VgKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIDE1IG1pbnV0ZSBkZWxheWVkIG1hcmtldCBxdW90ZS5cbiAgICpcbiAgICogQHNlZSBodHRwczovL2lleHRyYWRpbmcuY29tL2RldmVsb3Blci9kb2NzLyNkZWxheWVkLXF1b3RlXG4gICAqIEBwYXJhbSBzdG9ja1N5bWJvbCBUaGUgc3ltYm9sIG9mIHRoZSBzdG9jayB0byBmZXRjaCBkYXRhIGZvci5cbiAgICovXG4gIHB1YmxpYyBzdG9ja0RlbGF5ZWRRdW90ZShzdG9ja1N5bWJvbDogc3RyaW5nKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAvc3RvY2svJHtzdG9ja1N5bWJvbH0vcHJpY2VgKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGxpc3Qgb2YgcXVvdGVzIGZvciB0aGUgdG9wIDEwIHN5bWJvbHMgaW4gYSBzcGVjaWZpZWQgbGlzdC5cbiAgICpcbiAgICogQHNlZSBodHRwczovL2lleHRyYWRpbmcuY29tL2RldmVsb3Blci9kb2NzLyNsaXN0XG4gICAqIEBwYXJhbSBsaXN0IFRoZSBtYXJrZXQgbGlzdCB0byBmZXRjaCBxdW90ZXMgZnJvbS5cbiAgICogQHBhcmFtIFtkaXNwbGF5UGVyY2VudD1mYWxzZV0gSWYgc2V0IHRvIHRydWUsIGFsbCBwZXJjZW50YWdlIHZhbHVlcyB3aWxsIGJlIG11bHRpcGxpZWQgYnkgYSBmYWN0b3Igb2YgMTAwLlxuICAgKi9cbiAgcHVibGljIHN0b2NrTWFya2V0TGlzdFRvcFRlbihsaXN0OiBTdG9ja3NBUEkuTWFya2V0TGlzdCwgZGlzcGxheVBlcmNlbnQ/OiBib29sZWFuKTogUHJvbWlzZTxTdG9ja3NBUEkuUXVvdGVSZXNwb25zZVtdPiB7XG4gICAgY29uc3QgcXVlcnlTdHJpbmcgPSBkaXNwbGF5UGVyY2VudCA/ICc/ZGlzcGxheVBlcmNlbnQ9dHJ1ZScgOiAnJ1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoYC9zdG9jay9tYXJrZXQvbGlzdC8ke2xpc3R9JHtxdWVyeVN0cmluZ31gKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYW4gYXJyYXkgb2YgZWZmZWN0aXZlIHNwcmVhZCwgZWxpZ2libGUgdm9sdW1lLCBhbmQgcHJpY2UgaW1wcm92ZW1lbnRcbiAgICogb2YgYSBzdG9jaywgYnkgbWFya2V0LiBVbmxpa2Ugdm9sdW1lLWJ5LXZlbnVlLCB0aGlzIHdpbGwgb25seSByZXR1cm4gYVxuICAgKiB2ZW51ZSBpZiBlZmZlY3RpdmUgc3ByZWFkIGlzIG5vdCDigJhOL0HigJkuIFZhbHVlcyBhcmUgc29ydGVkIGluIGRlc2NlbmRpbmdcbiAgICogb3JkZXIgYnkgZWZmZWN0aXZlU3ByZWFkLiBMb3dlciBlZmZlY3RpdmVTcHJlYWQgYW5kIGhpZ2hlciBwcmljZUltcHJvdmVtZW50XG4gICAqIHZhbHVlcyBhcmUgZ2VuZXJhbGx5IGNvbnNpZGVyZWQgb3B0aW1hbC5cbiAgICpcbiAgICogQHNlZSBodHRwczovL2lleHRyYWRpbmcuY29tL2RldmVsb3Blci9kb2NzLyNlZmZlY3RpdmUtc3ByZWFkXG4gICAqIEBwYXJhbSBzdG9ja1N5bWJvbCBUaGUgc3ltYm9sIG9mIHRoZSBzdG9jayB0byBmZXRjaCBkYXRhIGZvci5cbiAgICovXG4gIHB1YmxpYyBzdG9ja0VmZmVjdGl2ZVNwcmVhZChzdG9ja1N5bWJvbDogc3RyaW5nKTogUHJvbWlzZTxTdG9ja3NBUEkuRWZmZWN0aXZlU3ByZWFkW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KGAvc3RvY2svJHtzdG9ja1N5bWJvbH0vZWZmZWN0aXZlLXNwcmVhZGApXG4gIH1cblxuICAvKipcbiAgICogR2V0cyAxNSBtaW51dGUgZGVsYXllZCBhbmQgMzAgZGF5IGF2ZXJhZ2UgY29uc29saWRhdGVkIHZvbHVtZSBwZXJjZW50YWdlIG9mXG4gICAqIGEgc3RvY2ssIGJ5IG1hcmtldC4gVGhpcyBjYWxsIHdpbGwgYWx3YXlzIHJldHVybiAxMyB2YWx1ZXMsIGFuZCB3aWxsIGJlXG4gICAqIHNvcnRlZCBpbiBhc2NlbmRpbmcgb3JkZXIgYnkgY3VycmVudCBkYXkgdHJhZGluZyB2b2x1bWUgcGVyY2VudGFnZS5cbiAgICpcbiAgICogQHNlZSBodHRwczovL2lleHRyYWRpbmcuY29tL2RldmVsb3Blci9kb2NzLyN2b2x1bWUtYnktdmVudWVcbiAgICogQHBhcmFtIHN0b2NrU3ltYm9sIFRoZSBzeW1ib2wgb2YgdGhlIHN0b2NrIHRvIGZldGNoIGRhdGEgZm9yLlxuICAgKi9cbiAgcHVibGljIHN0b2NrVm9sdW1lQnlWZW51ZShzdG9ja1N5bWJvbDogc3RyaW5nKTogUHJvbWlzZTxTdG9ja3NBUEkuVm9sdW1lQnlWZW51ZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChgL3N0b2NrLyR7c3RvY2tTeW1ib2x9L3ZvbHVtZS1ieS12ZW51ZWApXG4gIH1cbn1cbiJdfQ==