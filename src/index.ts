import { load } from "cheerio";
import { type DicioAPI } from "../types";

// @ts-ignore 7016
import desacentuador from "desacentuador";

function camelCase(string: string): string {
    string = desacentuador(string);

    const parts = string.split(" ");
    if (!parts.length || parts.length === 1) return string.toLowerCase();
    let result: string = parts.shift()!.toLowerCase();

    for (const part of parts) result += part[0].toUpperCase() + part.slice(1).toLowerCase();

    return result;
}

function arrayToObject(arr: any[]): Record<string, string> {
    const obj = {};
    for (let i = 0; i < arr.length; i += 2) {
        Object.assign(obj, { [camelCase(arr[i])]: arr[i + 1] });
    }

    return obj;
}

const defaults = Object.freeze({
    etimologia: "",
    frases: [],
    plural: null,
    separacaoSilabica: [],
    sinonimos: [],
});

export = async function buscar(termo: string): Promise<DicioAPI> {
    const req = await fetch(`https://dicio.com.br/${desacentuador(termo)}`).then(e => e.text());
    const $ = load(req, { lowerCaseTags: true }, true);

    if ($("title").text() === "Ocorreu um Erro") return Object.assign({}, { status: 404, data: [] }, defaults);
    else {
        const result: DicioAPI = Object.assign({}, { status: 200, data: [] }, defaults);
        result.frases = [];
        result.data = [];
        result.sinonimos = [];

        $("p[itemprop=description]")
            .children()
            .each((_, el) => {
                if ($(el).hasClass("etim")) result.etimologia = $(el).text().split(". ")[1];
                else if ($(el).hasClass("cl")) result.data.unshift({ classe: $(el).text().trim(), significados: [] });
                else result.data[0].significados.push($(el).text());
            });
        result.data.reverse();

        $(".adicional.sinonimos")
            .children()
            .each((_, el) => {
                // console.log(el);
                if (el.tagName === "a") result.sinonimos.push($(el).text());
            });

        const defs = arrayToObject(
            $(".tit-section + p.adicional")
                .text()
                .trim()
                .replace(/ +/g, " ")
                .split(/[:\n]+/)
                .map(e => e.trim())
        );

        result.plural = defs.plural || null;

        result.separacaoSilabica = defs.separacaoSilabica.split("-");

        $(".tit-frases + .frases > .frase").each((_, el) => {
            result.frases.push($(el).text().trim().split(/\n/g)[0]);
        });

        return result;
    }
};
