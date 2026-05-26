import type {
  VercelRequest,
  VercelResponse
} from '@vercel/node';

import {
  GoogleGenerativeAI
} from '@google/generative-ai';

const lashModelsForPrompt = [
  {
    name: "Volume Premium",
    description: "Volume intenso, criado com leques volumosos. Ideal para mulheres que desejam um olhar marcante, cheio e glamouroso."
  },
  {
    name: "Efeito Princesa",
    description: "Alongamento lateral e elevação estratégica para um olhar sedutor e sofisticado."
  },
  {
    name: "Volume Havilah",
    description: "Resultado natural, delicado e elegante."
  },
  {
    name: "Fox Eyes",
    description: "Alongamento nos cantos externos para um visual moderno."
  },
  {
    name: "Volume Divino",
    description: "Aspecto fresh e contemporâneo."
  },
  {
    name: "Capping",
    description: "Equilíbrio entre naturalidade e volume."
  },
  {
    name: "Combo Glamour",
    description: "Abre o olhar com leveza e elegância
