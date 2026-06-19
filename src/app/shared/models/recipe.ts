
export interface RecipeModel {
    id: number;
    titolo: string;
    difficolta: number;
    imgPrincipale: string;
    votiTotali: number;
    valutazioneMedia: number;
    descBreve: string;
    categorie: {
        nomeCategoriaRicetta: string
    }[];
    composizioneRicetta: {
        ingrediente: {
            nome: string;
            colorePrincipale?: string; // opzionale
        };
        quantita: number;
        unitaDiMisura: string;
    }[];
    tempoDiPreparazione?: number;
}