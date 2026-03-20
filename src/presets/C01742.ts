import type { TransitLine } from "../types/App";

export const RER_A: TransitLine = {
  id: "RER_A",
  name: "RER A",
  layout: [
    {
      id: "ouest-fork",
      branches: [
        [
          {
            id: "nord-ouest-fork",
            branches: [
              [
                {
                  id: "cergy",
                  stations: [
                    { id: 478476, name: "Cergy le Haut" },
                    { id: 478477, name: "Cergy Saint-Christophe" },
                  ],
                },
              ],
              [
                {
                  id: "poissy",
                  stations: [
                    { id: 478482, name: "Poissy" },
                    { id: 478483, name: "Achères Grand Cormier" },
                  ],
                },
              ],
            ],
          },
          {
            id: "nord-ouest-commun",
            stations: [
              { id: 478484, name: "Maisons-Laffitte" },
              { id: 478485, name: "Sartrouville" },
            ],
          },
        ],
        [
          {
            id: "st-germain",
            stations: [
              { id: 478487, name: "Saint-Germain-en-Laye" },
              { id: 478488, name: "Le Vésinet - Le Pecq" },
            ],
          },
        ],
      ],
    },
    {
      id: "centre",
      stations: [
        { id: 58849, name: "Nanterre Préfecture" },
        { id: 58850, name: "La Défense (Grande Arche)" },
        { id: 58851, name: "Charles de Gaulle - Étoile" },
      ],
    },
    {
      id: "est-fork",
      branches: [
        [
          {
            id: "boissy",
            stations: [
              { id: 478494, name: "Fontenay-sous-Bois" },
              { id: 478502, name: "Boissy-Saint-Léger" },
            ],
          },
        ],
        [
          {
            id: "mlv",
            stations: [
              { id: 478503, name: "Val de Fontenay" },
              { id: 478513, name: "Marne-la-Vallée - Chessy" },
            ],
          },
        ],
      ],
    },
  ],
};
