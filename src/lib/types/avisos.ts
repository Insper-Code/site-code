export type AvisoCategoria = 'urgente' | 'importante' | 'informativo';

export interface Aviso {
  id: string;
  titulo: string;
  conteudo: string;
  categoria: AvisoCategoria;
  autor: string;
  dataPublicacao: Date;
  anexos?: string[];
}

export interface AvisoComLeitura extends Aviso {
  lido: boolean;
}

