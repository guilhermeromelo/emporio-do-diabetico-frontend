import Endereco from "./Endereco";
import Produto from "./produto";

export default class Pedido{
  id?:	number;
  itens?: Produto[];
  clienteId?:	number;
  clienteNome?: string;
  itensResume?: string;
  enderecoEntrega?:	Endereco;
  dataPedido?: string;
  dataPedidoDate?: Date;
  totalPrice?: number;
}
