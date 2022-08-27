declare namespace dicio {
    export interface Dicio {
        status: number;
        significados: string[];
        etimologia: string;
        classe: string;
        sinonimos: string[];
        separacaoSilabica: string[];
        plural: string;
        frases: string[];
    }
}

declare function dicio(termo: string): Promise<dicio.Dicio>;

export = dicio;
