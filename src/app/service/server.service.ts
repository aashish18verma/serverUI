import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Server } from '../interface/server';

import { Observable, Subscriber, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Status } from '../enum/status.enum';
import { CustomResponse } from '../interface/custom-response';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private readonly apiUrl= 'http://localhost:8080';
  
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
   console.log(error); 
    return throwError (`An error occurred - Error code : ${error.status}`);
  }

  servers$ = <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/server/list`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  

  save$ = (server: Server) => <Observable<CustomResponse>>
  this.http.post<CustomResponse>(`${this.apiUrl}/server/save`, server)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  ping$ = ( ipAddress: string) => <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/server/ping/${ipAddress}`, )
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  delete$ = ( serverId: number) => <Observable<CustomResponse>>
  this.http.delete<CustomResponse>(`${this.apiUrl}/server/delete/${serverId}`, )
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );
  
  filter$ = ( status: Status, response: CustomResponse) => <Observable<CustomResponse>>
     new Observable<CustomResponse>(
   Subscriber =>{
     console.log(response);
     Subscriber.next(
       status === Status.ALL? {...response, message: `Servers filtered by ${status} status`}: {
         ...response, message: response.data.servers?.filter(server => server.status).length > 0 ? `Servers filtered by ${ status === Status.SERVER_UP ? 'SERVER_UP' : 'SERVER_DOWN'} status` : `No servers of ${status} found`,
          data: { servers: response.data.servers.filter(server =>server.status == status)}       }
     );
     Subscriber.complete();
   }
 )
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  
}
