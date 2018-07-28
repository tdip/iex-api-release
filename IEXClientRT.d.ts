/// <reference types="socket.io-client" />
import { Observable } from 'rxjs';
import { RealtimeQuoteResponse } from './apis/stocks';
export declare type SocketIOBuilder = (endpoint: string) => SocketIOClient.Socket;
/**
 * Client for observing realtime data streams
 * produced by IEX.
 */
export default class IEXClientRT {
    private isReady;
    private readonly socket;
    private readonly subscriptions;
    constructor(socketBuilder?: SocketIOBuilder);
    private onMessage;
    private onConnect;
    private subscribePending;
    private subscribeIfReady;
    private getOrCreateObservable;
    /**
     * Get an Observable that produces values whenever one of the
     * securities passed as parameter changes
     * @param topics The securities one wishes to subscribe
     */
    observe(...topics: string[]): Observable<RealtimeQuoteResponse>;
}
