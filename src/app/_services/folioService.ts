import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { FolioClass, Student, APIArrayResult, APIResult, APIClassArrayResult, APIClassResult } from '../_models';

@Injectable({ providedIn: 'root' })
export class FolioService {
    
    public folioClasses: Observable<FolioClass>;
    public students: Observable<Student>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        
    }

    //Service methods to handle Classes
    getAllClasses() {
        return this.http.get<APIClassArrayResult>(`${environment.apiUrl}/folioclasses`);
    }
    addClass(params) {
        return this.http.post<APIClassResult>(`${environment.apiUrl}/folioclasses/`, params);
    }
    editClass(id, params) {
        return this.http.put<APIClassResult>(`${environment.apiUrl}/folioclasses/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }

    deleteClass(id: string) {
        return this.http.delete<APIClassResult>(`${environment.apiUrl}/folioclasses/${id}`)
            .pipe(map(x => {
                
                return x;
            }));
    }

    ///////////////////////////////////////////////////////////////////////////////////////////
    //Service methods to handle students
    getStudentsForSelectedClass(id: number) {
        return this.http.get<APIArrayResult>(`${environment.apiUrl}/students/${id}`);
    }

    addStudent(params) {
        return this.http.post<APIResult>(`${environment.apiUrl}/students/`, params)
            .pipe(map(x => {
                return x;
            }));
    }
    editStudent(id, params) {
        return this.http.put<APIResult>(`${environment.apiUrl}/students/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }

    deleteStudent(id: string) {
        return this.http.delete<APIResult>(`${environment.apiUrl}/students/${id}`)
            .pipe(map(x => {
                return x;
            }));
    }
}