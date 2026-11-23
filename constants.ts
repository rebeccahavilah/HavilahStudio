import { LashModel, LashStyleId } from './types';

// Nome e subtítulo principais exibidos no sistema/site
export const APP_NAME = "HAVILAH LASH STUDIO";
export const APP_SUBTITLE = "por Rebecca Havilah";

// Lista de modelos/procedimentos de cílios.
// Ajuste 'price' (valor da aplicação) e 'maintenancePrice' (valor ou observação da manutenção) conforme necessário.
export const LASH_MODELS: LashModel[] = [
  {
    id: LashStyleId.VOLUME_PREMIUM,
    name: "Extensão c/ Led Uv",
    description:
      "Volume intenso, criado com leques volumosos. Ideal para mulheres que desejam um olhar marcante, cheio e glamouroso. Recomendado para quem gosta de destaque, maquiagem e presença forte.",
    imagePlaceholder:
      "https://images.unsplash.com/photo-1583121560115-980f2c2b0a2f?q=80&w=1000&auto=format&fit=crop",
    price: 200,
    maintenancePrice: 120,
  },
  {
    id: LashStyleId.PRINCESS_EFFECT,
    name: "Extensão Tradicional",
    description:
      "Traz alongamento lateral e elevação estratégica que criam um olhar sedutor, misterioso e levemente 'vertical'. Favorece quem tem olhos redondos ou pequenos.",
    imagePlaceholder:
      "https://images.unsplash.com/photo-1597223544658-15aa96d607c2?q=80&w=1000&auto=format&fit=crop",
    price: 180,
    maintenancePrice: 100,
  },
  {
    
    id: LashStyleId.VOLUME_DIVINE,
    name: "Alinhamento",
    description:
      "Leques mais fechados que criam um aspecto 'fresh', como se tivesse saído da água. Queridinho no Instagram. Perfeito para quem ama tendência e estética contemporânea.",
    imagePlaceholder:
      "https://images.unsplash.com/photo-1527799820374-608359781a07?q=80&w=1000&auto=format&fit=crop",
    price: 50,
    maintenancePrice: "Definido",
  },
  {
    id: LashStyleId.FINALIZACAO,
    name: "Alinhamento c/ Henna",
    description:
      "Combinação equilibrada de naturalidade com volume. Recomendado para quem quer um meio-termo: mais cheio que o clássico, mais leve que o volume russo.",
    imagePlaceholder:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1000&auto=format&fit=crop",
    price: 60,
    maintenancePrice: "Não especificada",
  },
  {
    id: LashStyleId.COMBO_GLAMOUR,
    name: "Combo Glamour",
    description:
      "Abre o olhar e cria sensação de leveza. Modela suavemente e dá um brilho elegante ao olhar. Ótimo para fotos e eventos.",
    imagePlaceholder:
      "https://images.unsplash.com/photo-1583001831049-4e063295d0a1?q=80&w=1000&auto=format&fit=crop",
    price: 280,
    maintenancePrice: "Inclusa no combo",
  },
  {
    id: LashStyleId.NATURAL_SOFT,
    name: "Brown Lamination",
    description:
      "Efeito extremamente suave, simulando cílios naturais porém mais longos e curvados. Ideal para clientes discretas e minimalistas.",
    imagePlaceholder:
      "https://images.unsplash.com/photo-1546855790478-4be209fbecef?q=80&w=1000&auto=format&fit=crop",
    price: 130,
    maintenancePrice: 0,
  },
];

// Dicas de cuidados pós-procedimento
export const CARE_TIPS = [
  {
    title: "Primeiras 24 Horas",
    text: "Evite molhar os cílios, vapor excessivo (sauna, banho muito quente) e não use maquiagem na região dos olhos.",
    icon: "clock",
  },
  {
    title: "Higienização Diária",
    text: "Lave os cílios diariamente com shampoo neutro (de bebê) ou espuma de limpeza específica, usando um pincel macio.",
    icon: "droplet",
  },
  {
    title: "O que Evitar",
    text: "Não use rímel à prova d'água, curvex ou demaquilantes à base de óleo. Evite esfregar os olhos com força.",
    icon: "shield",
  },
  {
    title: "Escovação",
    text: "Escove os cílios delicadamente todas as manhãs com a escovinha fornecida para mantê-los alinhados.",
    icon: "pen",
  },
];
