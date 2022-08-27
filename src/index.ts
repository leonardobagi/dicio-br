import { load } from "cheerio";

import { type Dicio } from "../types";

export = async function buscar(termo: string): Promise<Dicio> {
    const req = await fetch(`https://dicio.com.br/${termo}`).then(e => e.text());
    const $ = load(req, { lowerCaseTags: true }, true);

    if ($("title").text() === "Ocorreu um Erro")
        return {
            status: 404,
            significados: [],
            etimologia: "",
            classe: "",
            frases: [],
            plural: "",
            separacaoSilabica: [],
            sinonimos: [],
        };
    else {
        const data: Dicio = {
            status: 200,
            significados: [],
            etimologia: "",
            classe: "",
            frases: [],
            plural: "",
            separacaoSilabica: [],
            sinonimos: [],
        };

        $("p[itemprop=description]")
            .children()
            .each((_, el) => {
                if ($(el).hasClass("cl")) data.classe = $(el).text();
                if ($(el).hasClass("etim")) data.etimologia = $(el).text().split(". ")[1];
                else data.significados.push($(el).text());
            });

        $(".adicional.sinonimos")
            .children()
            .each((_, el) => {
                // console.log(el);
                if (el.tagName === "a") data.sinonimos.push($(el).text());
            });

        data.separacaoSilabica = $(
            "#content > div.col-xs-12.col-sm-7.col-md-8.p0.mb20 > div.card.card-main.mb10 > div:nth-child(5) > p > b:nth-child(5)"
        )
            .text()
            .trim()
            .split("-");

        data.plural = $("#content b > a").text();

        $(".tit-frases + .frases > .frase").each((_, el) => {
            data.frases.push($(el).text().trim().split(/\n/g)[0]);
        });

        return data;
    }
};
