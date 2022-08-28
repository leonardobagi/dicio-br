# dicio-br
Um pacote para pegar definições do Dicio

# Funcionamneto
A usagem é bem simples, basta importar o módulo e usar a função para procurar um termo.

```js
const dicio = require("dicio-br");

const palavra = await dicio("alicerce");
```

Retorna 
```js
{
  status: 200,
  data: [
    {
      classe: "substantivo masculino",
      significados: [
        "Maciço de alvenaria sobre o qual se assenta a estrutura de uma construção, geralmente feito em cimento ou pedra; estrutura que sustenta uma construção: o primeiro passo é construir o alicerce.",
        "Processo de escavação através do qual os alicerces são colocados.",
        "[Figurado] Aquilo que fundamenta e sustenta; base, apoio, sustentáculo: o bom êxito se fundamenta nos alicerces do trabalho.",
      ],
    },
  ],
  etimologia: "Do árabe al-isas.",
  frases: [
    "Trabalhai, fazei alguma coisa: é o alicerce mais seguro.",
    "A virtude não é somente o alicerce da felicidade humana, mas também o dos Estados.",
  ],
  plural: "alicerces",
  separacaoSilabica: ["a", "li", "cer", "ce"],
  sinonimos: ["firmamento", "sustentáculo", "fundação", "base", "fundamento"],
};

```

***Atenção:*** se a palavra não for encontrada, o `status` será `404`, e todas as outras propriedades estarão vazias.

# Múltiplas classes
Palavras com múltiplas classes retornarão múltiplas definições.
```js
{
  status: 200,
  data: [
    { classe: 'preposição', significados: [Array] },
    { classe: 'advérbio', significados: [Array] }
  ],
  etimologia: 'De origem questionável.',
  frases: [
    'O segredo é não correr atrás das borboletas... É cuidar do jardim para que elas venham até você.',
    'Purifica o teu coração antes de permitires que o amor entre nele, pois até o mel mais doce azeda num recipiente sujo.'
  ],
  plural: null,
  separacaoSilabica: [ 'a', 'té' ],
  sinonimos: [ 'ainda', 'inclusive', 'também', 'mesmo' ]
}
```

# Typescript
O pacote também suporta Typescript, caso você prefira usá-lo
```ts
import dicio from "dicio-br";

const palavra = await dicio("alicerce");
```

