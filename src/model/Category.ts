import { v4 as uuidv4 } from "uuid";

/**
 * É boa prática criar arquivos de classe para definir as estruturas
 * de dados utilizadas no projeto, e importar essas classes nas rotas
 * designadas.
 */
class Category {
  id?: string;
  name: string;
  description: string;
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Category };
