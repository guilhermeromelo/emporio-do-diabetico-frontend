import Endereco from "./Endereco";
import Produto from "./produto";

export default class Pedido{
  id?:	number;
  itens?: Produto[];
  clienteId?:	number;
  enderecoEntrega?:	Endereco;
  dataPedido?: Date;
}
