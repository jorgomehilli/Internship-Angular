import { Action } from '@ngrx/store';

export enum ECartActions {
    GetItems = '[Items] Get Items',
    GetItemsSuccess = '[Items] Get Items Success',
  }
  
  export class GetItems implements Action {
    public readonly type = ECartActions.GetItems;
  }
  
  export class GetItemsSuccess implements Action {
    public readonly type = ECartActions.GetItemsSuccess;
    constructor(public payload: any []) {}
  }

  export type CartActions = GetItems | GetItemsSuccess;