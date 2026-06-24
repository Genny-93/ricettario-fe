export interface IngredienteOutputDto {
    id: number;
    nome: string;
    colore: string;
    stagioni: { nome: string }[];
}