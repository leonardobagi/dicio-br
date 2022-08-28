declare namespace dicio {
    export interface Dicio {
        significados: string[];
        classe: string;
    }

    export interface DicioAPI {
        data: Dicio[];
        status: number;
        frases: string[];
        etimologia: string;
        plural: string | null;
        sinonimos: string[];
        separacaoSilabica: string[];
    }
}

declare function dicio(termo: string): Promise<dicio.DicioAPI>;

export = dicio;
