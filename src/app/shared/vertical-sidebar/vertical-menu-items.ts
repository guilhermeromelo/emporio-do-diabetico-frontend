import { RouteInfo } from './vertical-sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '',
        title: 'Acesso Rápido',
        icon: 'mdi mdi-filter-variant',
        class: '',
        extralink: true,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
      path: 'produtos',
      title: 'Produtos',
      icon: 'mdi mdi-food-fork-drink',
      class: '',
      extralink: false,
      label: '',
      labelClass: '',
      submenu: []
    },
    {
      path: 'carrinho',
      title: 'Carrinho',
      icon: 'shopping-cart',
      class: '',
      extralink: false,
      label: '',
      labelClass: '',
      submenu: [

      ]
    },
    {
      path: 'editar-produto',
      title: 'Cadastrar Produto',
      icon: 'edit',
      class: '',
      extralink: false,
      label: '',
      labelClass: '',
      submenu: [

      ]
    },
];
