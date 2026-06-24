export interface RecipeInputDto {
    titolo: string;
    tempoDiPreparazione: number;
    difficolta: number;
    procedimento: {
        testo: string;
        media: string;
    }[];
    descBreve: string;
    categorieRicetta: string[];
    imgPrincipale: string;
    composizioneRicetta: {
        ingrediente: string;
        quantita: number;
        unitaDiMisura: string;
    }[];
    
}