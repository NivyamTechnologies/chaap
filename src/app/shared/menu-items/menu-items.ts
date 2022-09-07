import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [


  {
    label: '',
    main: [
      {
        state: 'forms',
        short_label: 'P',
        main_state: 'forms',
        name: 'Master',
        type: 'sub',
        icon: 'ti-pencil-alt',
        children: [
          {
            state: 'item',
            name: 'Add Item',
          }, {
            state: 'school',
            name: 'Add Customer'
          }
        ],
        badge: [
          {
            type: 'warning',
            value: 'New'
          }
        ]
      },
      {
        state: 'forms',
        main_state: 'forms',
        name: 'Browser',
        type: 'sub',
        icon: 'ti-pencil-alt',
        children: [
          {
            state: 'itemreport',
            name: 'Item',
          }, {
            state: 'schoolbrowser',
            name: 'Customer'
          }
        ]
       
      },
      // {
      //   state: 'forms',
      //   main_state: 'forms',
      //   name: 'Purchase',
      //   type: 'sub',
      //   icon: 'ti-pencil-alt',
      //   children: [
      //     {
      //       state: 'purchase',
      //       name: 'Purchase Entry',
      //     }, {
      //       state: 'purchasereport',
      //       name: 'Purchase Browser'
      //     }
      //   ]
       
      // },
      {
        state: 'saleorder',
        short_label: 'FW',
        main_state: '',
        name: 'Sale Order ',
        type: 'link',
        icon: 'ti-crown'
      },{
        state: 'salebrowser',
        short_label: 'FW',
        main_state: '',
        name: 'Sale Browser',
        type: 'link',
        icon: 'ti-crown'
      },
      {
        state: 'taxreport',
        short_label: 'FW',
        main_state: 'reports',
        name: 'Sale Report',
        type: 'link',
        icon: 'ti-crown'
      }
    

    ]
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
