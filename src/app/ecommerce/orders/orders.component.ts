import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { LoggedUser } from 'src/app/loginController/loggedUserModel';
import LoginController from 'src/app/loginController/loginController';
import Cliente from 'src/app/models/cliente';
import Pedido from 'src/app/models/pedido';
@Component({
  templateUrl: 'orders.component.html'
})
export class OrderComponent implements OnInit{

  orders: Pedido[] = [];
  customers: Cliente[] = [];
  loggedUser: LoggedUser = {};

  constructor(private service: AppService, private router: Router, private toastr: ToastrService){
    let user = LoginController.getLoggedUser();
    if(user)
      this.loggedUser = user;
    else
      this.router.navigateByUrl("/");
  }

  async ngOnInit(): Promise<void> {
    try{
      this.orders = <Pedido[]> await this.service.getRequest(`/pedidos/cliente/${this.loggedUser.id}`);
      this.customers = <Cliente[]> await this.service.getRequest('/clientes');
      this.completeOrdersInformation();


    } catch(err){
      this.toastr.error("Ocorreu um erro ao recuperar os pedidos");
    }

  }

  completeOrdersInformation(){
    try{
      this.orders.map(order =>{
        let cliente = <Cliente> this.customers.filter(cliente => cliente.id == order.clienteId)[0];
        order.clienteNome = cliente.nome;

        let itensResume = "";
        let totalPrice = 0;
        order.itens?.map(item =>{
          itensResume += itensResume == "" ? item.nome : `, ${item.nome}`;
          totalPrice += item.preco!
        })
        order.itensResume = itensResume;

        order.dataPedidoDate = new Date(<string>order.dataPedido);
      });
    } catch(error) { console.log(error) }
  }

  goToOrderDetailPage(order: Pedido){
    this.router.navigateByUrl('/detalhar-pedido', {state: { order: order , isOrderDetail: true}})
  }
}
