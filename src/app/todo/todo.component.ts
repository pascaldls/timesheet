import { Component, OnInit } from '@angular/core';
import { PouchDbService } from '../service/pouch-db.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {


  public todo: string ;
  public rows: [ object ] ;
  constructor( private db: PouchDbService ) {

  }

  ngOnInit() {
    this.getAll() ;
  }

  add(  ) {
    console.log( this.todo ) ;
    this.db.put( new Date().toISOString(), {
      title : this.todo ,
      completed : false ,
    } ).then( result => {
      console.log( 'success',  result ) ;
    }, err => {
      console.log( 'err', err ) ;
    }) ;
    this.getAll() ;
  }

  check ( row ) {
    row.doc.completed = ! row.doc.completed  ;
    this.db.put( row.id, row.doc ).then( ( result ) => {
      console.log( 'result', result ) ;
      this.getAll() ;
    }, ( err ) => {
      console.log( 'err', err ) ;
    } ) ;
  }

  remove ( row ) {
    this.db.delete ( row.doc ).then( result => {
      console.log( result ) ;
      this.getAll() ;
    }, err => {
      console.log( err ) ;
    }) ;
  }

  getAll() {
    const docs = this.db.fetch( ).then( result => {
      console.log( 'all.ok', result ) ;
      this.rows = result.rows ;
    }, err => {
      console.log ( 'all.err', err ) ;
    }) ;
    console.log( docs ) ;

  }

}
