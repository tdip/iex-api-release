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
const operators_1 = require("rxjs/operators");
const IEXClientRT_1 = require("../IEXClientRT");
const mockOn = (event, fn) => {
    if (event === 'connect') {
        fn.apply(null);
    }
};
const mockSocketSpecBuilder = () => ({
    on: jest.fn(mockOn),
    emit: jest.fn(() => { })
});
describe('IEXClinetRT', () => {
    describe('unit tests', () => {
        let client;
        let mockSocket;
        let mockSocketSpec;
        beforeEach(() => {
            mockSocketSpec = mockSocketSpecBuilder();
            mockSocket = jest.fn(() => mockSocketSpec);
            client = new IEXClientRT_1.default(mockSocket);
        });
        it('Subscribes to IEX when observable is subscribed', () => {
            expect(mockSocketSpec.emit).toHaveBeenCalledTimes(0);
            client.observe('MSFT', 'TWLO').subscribe();
            expect(mockSocketSpec.emit).toHaveBeenCalledWith('subscribe', 'MSFT');
            expect(mockSocketSpec.emit).toHaveBeenCalledWith('subscribe', 'TWLO');
        });
        it('Unsubscribes from IEX when observables are unsubscribed', () => {
            var os = client.observe('MSFT', 'TWLO');
            var subs = [os.subscribe(), os.subscribe()];
            subs.forEach(sub => sub.unsubscribe());
            expect(mockSocketSpec.emit).toHaveBeenCalledWith('unsubscribe', 'MSFT');
            expect(mockSocketSpec.emit).toHaveBeenCalledWith('unsubscribe', 'TWLO');
        });
    });
    describe('integration tests', () => {
        let client;
        beforeEach(() => {
            client = new IEXClientRT_1.default();
        });
        it('Fetches realtime data', () => __awaiter(this, void 0, void 0, function* () {
            const data = yield client.observe('MSFT').pipe(operators_1.first()).toPromise();
            expect(data.symbol).toEqual('MSFT');
            expect(data.securityType).toEqual(expect.any(String));
            expect(data.lastSalePrice).toEqual(expect.any(Number));
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSUVYQ2xpZW50UlQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9fX3Rlc3RzX18vSUVYQ2xpZW50UlQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsOENBQXVDO0FBRXZDLGdEQUF5QztBQUd6QyxNQUFNLE1BQU0sR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFZLEVBQUUsRUFBRTtJQUUzQyxJQUFHLEtBQUssS0FBSyxTQUFTLEVBQUM7UUFDbkIsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNsQjtBQUNMLENBQUMsQ0FBQTtBQUVELE1BQU0scUJBQXFCLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNqQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0NBQzFCLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFO0lBRXpCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO1FBQ3hCLElBQUksTUFBbUIsQ0FBQztRQUN4QixJQUFJLFVBQTJCLENBQUM7UUFDaEMsSUFBSSxjQUF3RCxDQUFBO1FBRTVELFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixjQUFjLEdBQUcscUJBQXFCLEVBQUUsQ0FBQztZQUN6QyxVQUFVLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUMzQyxNQUFNLEdBQUcsSUFBSSxxQkFBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLGlEQUFpRCxFQUFFLEdBQUcsRUFBRTtZQUN2RCxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXJELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBRTNDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3RFLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFFLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHlEQUF5RCxFQUFFLEdBQUcsRUFBRTtZQUMvRCxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN4QyxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFFdkMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDeEUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUU7UUFDL0IsSUFBSSxNQUFtQixDQUFDO1FBRXhCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixNQUFNLEdBQUcsSUFBSSxxQkFBVyxFQUFFLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsdUJBQXVCLEVBQUUsR0FBUyxFQUFFO1lBQ25DLE1BQU0sSUFBSSxHQUFHLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQUssRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7WUFFcEUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3RELE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMzRCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZpcnN0IH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5cbmltcG9ydCBJRVhDbGllbnRSVCBmcm9tIFwiLi4vSUVYQ2xpZW50UlRcIjtcbmltcG9ydCB7IFNvY2tldElPQnVpbGRlciB9IGZyb20gXCIuLi9JRVhDbGllbnRSVFwiO1xuXG5jb25zdCBtb2NrT24gPSAoZXZlbnQ6IHN0cmluZywgZm46IEZ1bmN0aW9uKSA9PiB7XG5cbiAgICBpZihldmVudCA9PT0gJ2Nvbm5lY3QnKXtcbiAgICAgICAgZm4uYXBwbHkobnVsbCk7XG4gICAgfVxufVxuXG5jb25zdCBtb2NrU29ja2V0U3BlY0J1aWxkZXIgPSAoKSA9PiAoe1xuICAgIG9uOiBqZXN0LmZuKG1vY2tPbiksXG4gICAgZW1pdDogamVzdC5mbigoKSA9PiB7fSlcbn0pO1xuXG5kZXNjcmliZSgnSUVYQ2xpbmV0UlQnLCAoKSA9PiB7XG5cbiAgICBkZXNjcmliZSgndW5pdCB0ZXN0cycsICgpID0+IHtcbiAgICAgICAgbGV0IGNsaWVudDogSUVYQ2xpZW50UlQ7XG4gICAgICAgIGxldCBtb2NrU29ja2V0OiBTb2NrZXRJT0J1aWxkZXI7XG4gICAgICAgIGxldCBtb2NrU29ja2V0U3BlYzoge29uOiBqZXN0Lk1vY2s8e30+LCBlbWl0OiBqZXN0Lk1vY2s8e30+fVxuXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgbW9ja1NvY2tldFNwZWMgPSBtb2NrU29ja2V0U3BlY0J1aWxkZXIoKTtcbiAgICAgICAgICAgIG1vY2tTb2NrZXQgPSBqZXN0LmZuKCgpID0+IG1vY2tTb2NrZXRTcGVjKTtcbiAgICAgICAgICAgIGNsaWVudCA9IG5ldyBJRVhDbGllbnRSVChtb2NrU29ja2V0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ1N1YnNjcmliZXMgdG8gSUVYIHdoZW4gb2JzZXJ2YWJsZSBpcyBzdWJzY3JpYmVkJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KG1vY2tTb2NrZXRTcGVjLmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygwKTtcblxuICAgICAgICAgICAgY2xpZW50Lm9ic2VydmUoJ01TRlQnLCAnVFdMTycpLnN1YnNjcmliZSgpO1xuXG4gICAgICAgICAgICBleHBlY3QobW9ja1NvY2tldFNwZWMuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ3N1YnNjcmliZScsICdNU0ZUJyk7XG4gICAgICAgICAgICBleHBlY3QobW9ja1NvY2tldFNwZWMuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ3N1YnNjcmliZScsICdUV0xPJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdVbnN1YnNjcmliZXMgZnJvbSBJRVggd2hlbiBvYnNlcnZhYmxlcyBhcmUgdW5zdWJzY3JpYmVkJywgKCkgPT4ge1xuICAgICAgICAgICAgdmFyIG9zID0gY2xpZW50Lm9ic2VydmUoJ01TRlQnLCAnVFdMTycpO1xuICAgICAgICAgICAgdmFyIHN1YnMgPSBbb3Muc3Vic2NyaWJlKCksIG9zLnN1YnNjcmliZSgpXTtcbiAgICAgICAgICAgIHN1YnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuXG4gICAgICAgICAgICBleHBlY3QobW9ja1NvY2tldFNwZWMuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ3Vuc3Vic2NyaWJlJywgJ01TRlQnKTtcbiAgICAgICAgICAgIGV4cGVjdChtb2NrU29ja2V0U3BlYy5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgndW5zdWJzY3JpYmUnLCAnVFdMTycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpbnRlZ3JhdGlvbiB0ZXN0cycsICgpID0+IHtcbiAgICAgICAgbGV0IGNsaWVudDogSUVYQ2xpZW50UlQ7XG5cbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBjbGllbnQgPSBuZXcgSUVYQ2xpZW50UlQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ0ZldGNoZXMgcmVhbHRpbWUgZGF0YScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBjbGllbnQub2JzZXJ2ZSgnTVNGVCcpLnBpcGUoZmlyc3QoKSkudG9Qcm9taXNlKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChkYXRhLnN5bWJvbCkudG9FcXVhbCgnTVNGVCcpO1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEuc2VjdXJpdHlUeXBlKS50b0VxdWFsKGV4cGVjdC5hbnkoU3RyaW5nKSk7XG4gICAgICAgICAgICBleHBlY3QoZGF0YS5sYXN0U2FsZVByaWNlKS50b0VxdWFsKGV4cGVjdC5hbnkoTnVtYmVyKSk7XG4gICAgICAgIH0pO1xuICAgIH0pXG59KTsiXX0=