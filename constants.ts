import { LashModel, LashStyleId } from './types';

export const APP_NAME = "HAVILAH LASH STUDIO";
export const APP_SUBTITLE = "by Rebecca Havilah";

export const LASH_MODELS: LashModel[] = [
  {
    id: LashStyleId.VOLUME_PREMIUM,
    name: "Volume Premium",
    description: "Volume intenso, criado com leques volumosos. Ideal para mulheres que desejam um olhar marcante, cheio e glamouroso. Recomendado para quem gosta de destaque, maquiagem e presença forte.",
    // Foto com cílios bem preenchidos e volumosos
    imagePlaceholder: "https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?q=80&w=1000&auto=format&fit=crop",
    price: 170,
    maintenancePrice: 90
  },
  {
    id: LashStyleId.PRINCESS_EFFECT,
    name: "Efeito Princesa",
    description: "Traz alongamento lateral e elevação estratégica que criam um olhar sedutor, misterioso e levemente “esticado”. Favorece quem tem olhos redondos ou pequenos.",
    // Foto com olhar alongado e elegante
    imagePlaceholder: "https://images.unsplash.com/photo-1597225244660-15a19b6b907c?q=80&w=1000&auto=format&fit=crop",
    price: 150,
    maintenancePrice: 90
  },
  {
    id: LashStyleId.VOLUME_HAVILAH,
    name: "Volume Havilah",
    description: "Resultado natural, delicado e elegante. Indicado para quem está aplicando cílios pela primeira vez ou busca um efeito discreto. Realça a beleza natural sem exageros.",
    // Foto com cílios bonitos mas naturais
    imagePlaceholder: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1000&auto=format&fit=crop",
    price: 170,
    maintenancePrice: 100
  },
  {
    id: LashStyleId.FOX_EYES,
    name: "Fox Eyes",
    description: "Efeito de olhar de raposa, com alongamento nos cantos externos. Deixa o rosto mais harmônico e sofisticado. Excelente para mulheres que gostam de um visual moderno e expressivo.",
    // Foto focada no canto externo e delineado
    imagePlaceholder: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1000&auto=format&fit=crop",
    price: 190,
    maintenancePrice: 100
  },
  {
    id: LashStyleId.VOLUME_DIVINE,
    name: "Volume Divino",
    description: "Leques mais fechados que criam um aspecto “fresh”, como se tivesse saído da água. Queridinho no Instagram. Perfeito para quem ama tendência e estética contemporânea.",
    // Foto estilo wet look / definido
    imagePlaceholder: "https://images.unsplash.com/photo-1587779782550-908359781b0f?q=80&w=1000&auto=format&fit=crop",
    price: 140,
    maintenancePrice: 90
  },
  {
    id: LashStyleId.CAPPING,
    name: "Capping",
    description: "Combinação equilibrada de naturalidade com volume. Recomendado para quem quer um meio-termo: mais cheio que o clássico, mais leve que o volume russo.",
    // Foto equilibrada
    imagePlaceholder: "https://images.unsplash.com/photo-1583001931096-959e9ad7b535?q=80&w=1000&auto=format&fit=crop",
    price: 190
    // Manutenção não especificada
  },
  {
    id: LashStyleId.COMBO_GLAMOUR,
    name: "Combo Glamour",
    description: "Abre o olhar e cria sensação de leveza. Modela suavemente e dá um brilho elegante ao olhar. Ótimo para fotos e eventos.",
    // Foto artística e glamurosa
    imagePlaceholder: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=1000&auto=format&fit=crop",
    price: 230
    // Manutenção inclusa no combo
  },
  {
    id: LashStyleId.NATURAL_SOFT,
    name: "Natural Soft",
    description: "Efeito extremamente suave, simulando cílios naturais porém mais longos e curvados. Ideal para clientes discretas e minimalistas.",
    // Foto bem clean e soft
    imagePlaceholder: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop",
    price: 180,
    maintenancePrice: 90
  }
];

export const CARE_TIPS = [
  {
    title: "Primeiras 24 Horas",
    text: "Evite molhar os cílios, vapor excessivo (sauna, banho muito quente) e não use maquiagem na região dos olhos.",
    icon: "clock"
  },
  {
    title: "Higienização Diária",
    text: "Lave os cílios diariamente com shampoo neutro (de bebê) ou espuma de limpeza específica, usando um pincel macio.",
    icon: "droplet"
  },
  {
    title: "O que Evitar",
    text: "Não use rímel à prova d'água, curvex ou demaquilantes à base de óleo. Evite esfregar os olhos com força.",
    icon: "shield"
  },
  {
    title: "Escovação",
    text: "Escove os cílios delicadamente todas as manhãs com a escovinha fornecida para mantê-los alinhados.",
    icon: "feather"
  }
];