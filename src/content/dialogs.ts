export interface DialogLine {
  speaker: string;
  text: string;
}

export const NPC_DIALOGS: Record<string, DialogLine[]> = {
  intro_polar: [
    { speaker: 'Polar', text: '¡Hey! Bienvenido a mi villa.' },
    { speaker: 'Polar', text: 'Anda, explora. Encontrarás mi CV, mis proyectos, y un par de sorpresas.' },
  ],
  hobbies: [
    { speaker: 'Polar', text: 'Toco guitarra, bajo, piano. Y leo bastante.' },
    { speaker: 'Polar', text: 'Metal, kpop, jpop, jrock — me gusta casi todo.' },
  ],
  cert_michigan: [
    { speaker: 'Polar', text: 'Especialización de U. Michigan: 5 cursos de web, capstone incluido.' },
  ],
  cert_ai: [
    { speaker: 'Polar', text: 'Microsoft AI Classroom — fundamentos de IA y Azure OpenAI.' },
  ],
  contact: [
    { speaker: 'Polar', text: 'Lo más rápido: email o WhatsApp. También reviso LinkedIn.' },
  ],
};
