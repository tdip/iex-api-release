"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-magic-numbers */
/* tslint:disable:no-var-requires */
/* tslint:disable:no-require-imports */
/* tslint:disable:no-implicit-dependencies */
const client_1 = require("../client");
const realFetch = require('fetch-ponyfill')().fetch; // tslint:disable-line:no-unsafe-any
let fetchMock;
let resMock;
describe('IEXClient', () => {
    describe('unit tests', () => {
        beforeEach(() => {
            resMock = {
                headers: new Map([['content-type', null]]),
                json: () => 'mocked json',
                text: () => 'mocked text'
            };
            fetchMock = jest.fn(() => Promise.resolve(resMock));
        });
        it('instantiates with a default HTTPS endpoint', () => {
            expect.assertions(2);
            const client = new client_1.default(fetchMock);
            return client.request('testExample').then(res => {
                expect(res).toBe(null);
                expect(fetchMock).toHaveBeenCalledWith('https://api.iextrading.com/1.0/testExample');
            });
        });
        it('can be instantiated with a custom https endpoint', () => {
            expect.assertions(2);
            const client = new client_1.default(fetchMock, 'https://example.com');
            return client.request('testExample').then(res => {
                expect(res).toBe(null);
                expect(fetchMock).toHaveBeenCalledWith('https://example.com/testExample');
            });
        });
        it('supports handling of JSON responses', () => {
            expect.assertions(2);
            resMock.headers.set('content-type', 'application/json; charset=utf-8;');
            const client = new client_1.default(fetchMock, 'https://example.com');
            return client.request('testExample').then(res => {
                expect(res).toBe('mocked json');
                expect(fetchMock).toHaveBeenCalledWith('https://example.com/testExample');
            });
        });
        it('supports handling of text responses', () => {
            expect.assertions(2);
            resMock.headers.set('content-type', 'text/csv; charset=utf-8;');
            const client = new client_1.default(fetchMock, 'https://example.com');
            return client.request('testExample').then(res => {
                expect(res).toBe('mocked text');
                expect(fetchMock).toHaveBeenCalledWith('https://example.com/testExample');
            });
        });
    });
    describe('integration tests', () => {
        let iex;
        beforeEach(() => {
            iex = new client_1.default(realFetch);
            expect.hasAssertions();
        });
        it('can make arbitrary queries', () => __awaiter(this, void 0, void 0, function* () {
            const price = yield iex.request('/stock/aapl/price');
            expect(price).toEqual(expect.any(Number));
        }));
        it('can get a list of all stock symbols', () => __awaiter(this, void 0, void 0, function* () {
            const symbols = yield iex.symbols();
            symbols.forEach(stockSym => {
                expect(stockSym.date).toEqual(expect.any(String));
                expect(stockSym.iexId).toEqual(expect.any(String));
                expect(typeof stockSym.isEnabled).toEqual('boolean');
                expect(stockSym.name).toEqual(expect.any(String));
                expect(stockSym.symbol).toEqual(expect.any(String));
                expect(stockSym.type).toEqual(expect.any(String));
            });
        }));
        it('can get stockPrice', () => __awaiter(this, void 0, void 0, function* () {
            const price = yield iex.stockPrice('aapl');
            expect(price).toEqual(expect.any(Number));
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvX190ZXN0c19fL2NsaWVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQ0FBcUM7QUFDckMsb0NBQW9DO0FBQ3BDLHVDQUF1QztBQUN2Qyw2Q0FBNkM7QUFDN0Msc0NBQWlDO0FBRWpDLE1BQU0sU0FBUyxHQUFpQixPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLEtBQXFCLENBQUEsQ0FBQyxvQ0FBb0M7QUFDdEgsSUFBSSxTQUF1QixDQUFBO0FBQzNCLElBQUksT0FJSCxDQUFBO0FBRUQsUUFBUSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUU7SUFDekIsUUFBUSxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUU7UUFDMUIsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLE9BQU8sR0FBRztnQkFDUixPQUFPLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBYTtnQkFDekIsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQWE7YUFDMUIsQ0FBQTtZQUNELFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtRQUNyRCxDQUFDLENBQUMsQ0FBQTtRQUVGLEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxHQUFHLEVBQUU7WUFDcEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNwQixNQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFTLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDdkMsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtn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LENBQUMsQ0FBQSxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGU6bm8tbWFnaWMtbnVtYmVycyAqL1xuLyogdHNsaW50OmRpc2FibGU6bm8tdmFyLXJlcXVpcmVzICovXG4vKiB0c2xpbnQ6ZGlzYWJsZTpuby1yZXF1aXJlLWltcG9ydHMgKi9cbi8qIHRzbGludDpkaXNhYmxlOm5vLWltcGxpY2l0LWRlcGVuZGVuY2llcyAqL1xuaW1wb3J0IElFWENsaWVudCBmcm9tICcuLi9jbGllbnQnXG5cbmNvbnN0IHJlYWxGZXRjaDogdHlwZW9mIGZldGNoID0gcmVxdWlyZSgnZmV0Y2gtcG9ueWZpbGwnKSgpLmZldGNoIGFzIHR5cGVvZiBmZXRjaCAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLXVuc2FmZS1hbnlcbmxldCBmZXRjaE1vY2s6IHR5cGVvZiBmZXRjaFxubGV0IHJlc01vY2s6IHtcbiAgaGVhZGVyczogTWFwPHN0cmluZywgc3RyaW5nIHwgbnVsbD5cbiAganNvbigpOiBzdHJpbmdcbiAgdGV4dCgpOiBzdHJpbmdcbn1cblxuZGVzY3JpYmUoJ0lFWENsaWVudCcsICgpID0+IHtcbiAgZGVzY3JpYmUoJ3VuaXQgdGVzdHMnLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICByZXNNb2NrID0ge1xuICAgICAgICBoZWFkZXJzOiBuZXcgTWFwKFtbJ2NvbnRlbnQtdHlwZScsIG51bGxdXSksXG4gICAgICAgIGpzb246ICgpID0+ICdtb2NrZWQganNvbicsXG4gICAgICAgIHRleHQ6ICgpID0+ICdtb2NrZWQgdGV4dCdcbiAgICAgIH1cbiAgICAgIGZldGNoTW9jayA9IGplc3QuZm4oKCkgPT4gUHJvbWlzZS5yZXNvbHZlKHJlc01vY2spKVxuICAgIH0pXG5cbiAgICBpdCgnaW5zdGFudGlhdGVzIHdpdGggYSBkZWZhdWx0IEhUVFBTIGVuZHBvaW50JywgKCkgPT4ge1xuICAgICAgZXhwZWN0LmFzc2VydGlvbnMoMilcbiAgICAgIGNvbnN0IGNsaWVudCA9IG5ldyBJRVhDbGllbnQoZmV0Y2hNb2NrKVxuICAgICAgcmV0dXJuIGNsaWVudC5yZXF1ZXN0KCd0ZXN0RXhhbXBsZScpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgZXhwZWN0KHJlcykudG9CZShudWxsKVxuICAgICAgICBleHBlY3QoZmV0Y2hNb2NrKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnaHR0cHM6Ly9hcGkuaWV4dHJhZGluZy5jb20vMS4wL3Rlc3RFeGFtcGxlJylcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGl0KCdjYW4gYmUgaW5zdGFudGlhdGVkIHdpdGggYSBjdXN0b20gaHR0cHMgZW5kcG9pbnQnLCAoKSA9PiB7XG4gICAgICBleHBlY3QuYXNzZXJ0aW9ucygyKVxuICAgICAgY29uc3QgY2xpZW50ID0gbmV3IElFWENsaWVudChmZXRjaE1vY2ssICdodHRwczovL2V4YW1wbGUuY29tJylcbiAgICAgIHJldHVybiBjbGllbnQucmVxdWVzdCgndGVzdEV4YW1wbGUnKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvQmUobnVsbClcbiAgICAgICAgZXhwZWN0KGZldGNoTW9jaykudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ2h0dHBzOi8vZXhhbXBsZS5jb20vdGVzdEV4YW1wbGUnKVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgaXQoJ3N1cHBvcnRzIGhhbmRsaW5nIG9mIEpTT04gcmVzcG9uc2VzJywgKCkgPT4ge1xuICAgICAgZXhwZWN0LmFzc2VydGlvbnMoMilcbiAgICAgIHJlc01vY2suaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04OycpXG4gICAgICBjb25zdCBjbGllbnQgPSBuZXcgSUVYQ2xpZW50KGZldGNoTW9jaywgJ2h0dHBzOi8vZXhhbXBsZS5jb20nKVxuICAgICAgcmV0dXJuIGNsaWVudC5yZXF1ZXN0KCd0ZXN0RXhhbXBsZScpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgZXhwZWN0KHJlcykudG9CZSgnbW9ja2VkIGpzb24nKVxuICAgICAgICBleHBlY3QoZmV0Y2hNb2NrKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnaHR0cHM6Ly9leGFtcGxlLmNvbS90ZXN0RXhhbXBsZScpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBpdCgnc3VwcG9ydHMgaGFuZGxpbmcgb2YgdGV4dCByZXNwb25zZXMnLCAoKSA9PiB7XG4gICAgICBleHBlY3QuYXNzZXJ0aW9ucygyKVxuICAgICAgcmVzTW9jay5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ3RleHQvY3N2OyBjaGFyc2V0PXV0Zi04OycpXG4gICAgICBjb25zdCBjbGllbnQgPSBuZXcgSUVYQ2xpZW50KGZldGNoTW9jaywgJ2h0dHBzOi8vZXhhbXBsZS5jb20nKVxuICAgICAgcmV0dXJuIGNsaWVudC5yZXF1ZXN0KCd0ZXN0RXhhbXBsZScpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgZXhwZWN0KHJlcykudG9CZSgnbW9ja2VkIHRleHQnKVxuICAgICAgICBleHBlY3QoZmV0Y2hNb2NrKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnaHR0cHM6Ly9leGFtcGxlLmNvbS90ZXN0RXhhbXBsZScpXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG5cbiAgZGVzY3JpYmUoJ2ludGVncmF0aW9uIHRlc3RzJywgKCkgPT4ge1xuICAgIGxldCBpZXg6IElFWENsaWVudFxuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBpZXggPSBuZXcgSUVYQ2xpZW50KHJlYWxGZXRjaClcbiAgICAgIGV4cGVjdC5oYXNBc3NlcnRpb25zKClcbiAgICB9KVxuXG4gICAgaXQoJ2NhbiBtYWtlIGFyYml0cmFyeSBxdWVyaWVzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgcHJpY2UgPSBhd2FpdCBpZXgucmVxdWVzdCgnL3N0b2NrL2FhcGwvcHJpY2UnKVxuICAgICAgZXhwZWN0KHByaWNlKS50b0VxdWFsKGV4cGVjdC5hbnkoTnVtYmVyKSlcbiAgICB9KVxuXG4gICAgaXQoJ2NhbiBnZXQgYSBsaXN0IG9mIGFsbCBzdG9jayBzeW1ib2xzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3Qgc3ltYm9scyA9IGF3YWl0IGlleC5zeW1ib2xzKClcbiAgICAgIHN5bWJvbHMuZm9yRWFjaChzdG9ja1N5bSA9PiB7XG4gICAgICAgIGV4cGVjdChzdG9ja1N5bS5kYXRlKS50b0VxdWFsKGV4cGVjdC5hbnkoU3RyaW5nKSlcbiAgICAgICAgZXhwZWN0KHN0b2NrU3ltLmlleElkKS50b0VxdWFsKGV4cGVjdC5hbnkoU3RyaW5nKSlcbiAgICAgICAgZXhwZWN0KHR5cGVvZiBzdG9ja1N5bS5pc0VuYWJsZWQpLnRvRXF1YWwoJ2Jvb2xlYW4nKVxuICAgICAgICBleHBlY3Qoc3RvY2tTeW0ubmFtZSkudG9FcXVhbChleHBlY3QuYW55KFN0cmluZykpXG4gICAgICAgIGV4cGVjdChzdG9ja1N5bS5zeW1ib2wpLnRvRXF1YWwoZXhwZWN0LmFueShTdHJpbmcpKVxuICAgICAgICBleHBlY3Qoc3RvY2tTeW0udHlwZSkudG9FcXVhbChleHBlY3QuYW55KFN0cmluZykpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBpdCgnY2FuIGdldCBzdG9ja1ByaWNlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgcHJpY2UgPSBhd2FpdCBpZXguc3RvY2tQcmljZSgnYWFwbCcpXG4gICAgICBleHBlY3QocHJpY2UpLnRvRXF1YWwoZXhwZWN0LmFueShOdW1iZXIpKVxuICAgIH0pXG4gIH0pXG59KVxuIl19