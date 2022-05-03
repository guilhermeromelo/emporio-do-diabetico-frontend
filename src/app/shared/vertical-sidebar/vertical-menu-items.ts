import { RouteInfo } from './vertical-sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '',
        title: 'Categorias',
        icon: 'mdi mdi-filter-variant',
        class: '',
        extralink: true,
        label: '',
        labelClass: '',
        submenu: []
    },
    {
      path: 'produtos',
      title: 'Alimentos',
      icon: 'mdi mdi-food-fork-drink',
      class: '',
      extralink: false,
      label: '',
      labelClass: '',
      submenu: []
  },
  {
    path: 'produtos',
    title: 'Cosméticos',
    icon: 'mdi mdi-flower',
    class: '',
    extralink: false,
    label: '',
    labelClass: '',
    submenu: []
},
{
  path: 'editar-produto',
  title: 'Editar Produto',
  icon: 'shopping-cart',
  class: '',
  extralink: false,
  label: '',
  labelClass: '',
  submenu: [

  ]
},
];
